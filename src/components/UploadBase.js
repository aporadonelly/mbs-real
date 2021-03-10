/**
 * @Name UploadBase
 * @Description Reusable Upload Photo Component
 * @Props
 * classprops: receives custom style for the component props.
 * filesLimit: sets the limit of the files it can receive.
 * fileData: passes and receives the file object.
 * fileExist: passes and receives if the file exist.
 * @Returns uploadBase component
 * @Author RJ
 * @UpdatedBy RJ
 */
import { Button, Grid, Icon } from '@material-ui/core';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import React, { useEffect, useReducer, useRef } from 'react';
import { colors } from '../assets/styleGuide';
import CustomErrorMessage from './CustomErrorMessage';
import { FormStyles, UploadBaseStyle } from './styles';

const imageReducer = (state, action) => {
    switch (action.type) {
        case 'inputField':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'imageErrorType':
            return {
                ...state,
                imageHasError: true,
                imageErrorMessage: 'Please check the file format before uploading.'
            };
        case 'imageErrorSize':
            return {
                ...state,
                imageHasError: true,
                imageErrorMessage: 'File size limit exceeded.'
            };
        case 'resetImageError':
            return {
                ...state,
                imageHasError: false
            };
        case 'fileExist':
            return {
                ...state,
                fileExist: true,
                dropZoneText: ''
            };
        case 'removeImage':
            return {
                ...state,
                fileObjects: [],
                fileExist: false,
                dropZoneText: 'Drop a file here or click to upload.'
            };
        default:
            break;
    }
    return state;
};

const initialState = {
    fileExist: false,
    fileObjects: [],
    imageHasError: false,
    imageErrorMessage: '',
    rejectedFileUpload: '',
    dropZoneText: 'Drop a file here or click to upload.'
};

const UploadBase = ({
    headerText,
    classProps,
    filesLimit,
    fileData,
    fileExist,
    testId,
    initialUrl,
    hasExternalError,
    customStyle
}) => {
    const [states, dispatch] = useReducer(imageReducer, initialState);

    useEffect(() => {
        if (initialUrl) {
            fetch(initialUrl).then(r =>
                r.blob().then(b => {
                    const reader = new FileReader();
                    reader.readAsDataURL(b);
                    reader.onloadend = () => {
                        const dataUrlHeader = reader.result.split(',')[0];
                        const mimeType = dataUrlHeader.substring(5, dataUrlHeader.indexOf(';'));
                        const value = {
                            file: new File([], 'temp_file', {
                                type: mimeType
                            }),
                            data: reader.result
                        };
                        dispatch({ type: 'fileExist' });
                        dispatch({
                            type: 'inputField',
                            field: 'fileObjects',
                            value: [value]
                        });
                    };
                })
            );
        } else {
            dispatch({ type: 'removeImage' });
        }
    }, [initialUrl]);

    useEffect(() => {
        const imageErr = () => {
            if (
                states.rejectedFileUpload.type !== 'image/png' &&
                states.rejectedFileUpload.type !== 'image/jpeg'
            ) {
                dispatch({ type: 'imageErrorType' });
            } else if (states.rejectedFileUpload.size > 2000000) {
                dispatch({ type: 'imageErrorSize' });
            }
        };
        states.rejectedFileUpload !== '' && imageErr();
    }, [states.rejectedFileUpload]);

    useEffect(() => {
        dispatch({ type: 'resetImageError' });
        fileData(states.fileObjects);
        fileExist(states.fileExist);
    }, [states.fileObjects]);

    const dropRef = useRef(null);
    const classes = { ...FormStyles(), ...UploadBaseStyle() };

    const handlePreviewIcon = fileObject => {
        const { type } = fileObject.file;
        const iconProps = {
            className: classes.image
        };
        switch (type) {
            case 'image/jpeg':
                return (
                    <img
                        src={fileObject.data}
                        alt="uploaded file"
                        style={customStyle}
                        {...iconProps}
                    />
                );
            case 'image/png':
                return (
                    <img
                        src={fileObject.data}
                        alt="uploaded file"
                        style={customStyle}
                        {...iconProps}
                    />
                );
            default:
                break;
        }
    };
    return (
        <div>
            <Grid item xs={12}>
                <div className={classes.label}>
                    {headerText}{' '}
                    <span style={{ color: colors.placeholderText }}>
                        File supported: .png, .jpeg (maximum 2MB)
                    </span>
                </div>
            </Grid>
            <DropzoneAreaBase
                data-testid={testId}
                name="fileUpload"
                Icon={Icon}
                dropzoneText={states.dropZoneText}
                disableRejectionFeedback
                classes={classProps}
                filesLimit={filesLimit}
                acceptedFiles={['.jpeg,.jpg,.png']}
                fileObjects={states.fileObjects}
                onAdd={newFileObjs => {
                    dispatch({ type: 'fileExist' });
                    dispatch({
                        type: 'inputField',
                        field: 'fileObjects',
                        value: newFileObjs
                    });
                }}
                maxFileSize={2000000}
                getPreviewIcon={handlePreviewIcon}
                dropzoneClass={
                    states.imageHasError || hasExternalError
                        ? classes.dropZoneStyleError
                        : classes.dropZoneStyle
                }
                dropzoneParagraphClass={classes.dropZoneTextStyle}
                showAlerts={false}
                dropzoneProps={{ ref: dropRef }}
                getDropRejectMessage={rejectedFile => {
                    dispatch({
                        type: 'inputField',
                        field: 'rejectedFileUpload',
                        value: rejectedFile
                    });
                }}
            />
            <Grid item xs={12}>
                <CustomErrorMessage
                    renderCondition={states.imageHasError}
                    message={states.imageErrorMessage}
                />
            </Grid>
            <Button
                variant="outlined"
                style={{
                    marginTop: '1.25rem',
                    visibility: !states.fileExist && 'hidden'
                }}
                onClick={() => {
                    dropRef.current.open();
                }}>
                Change
            </Button>
            <Button
                data-testid="remove"
                variant="text"
                style={{
                    margin: '1.25rem 0.625rem 0',
                    visibility: !states.fileExist && 'hidden',
                    color: colors.error
                }}
                onClick={() => {
                    dispatch({ type: 'removeImage' });
                }}>
                Remove
            </Button>
        </div>
    );
};

export default UploadBase;
