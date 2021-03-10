/**
 * @Name: CreateProductForm
 * @Description: component for adding new product
 * @Props:
 *      onChange/onNameChange/handleAdd: to update text fields and to add fields.
 * @Return: Form
 * @Author: Nelly
 * @Last Update By: Nelly
 */

import React, { useState } from 'react';
import { Grid, FormControl, FormHelperText } from '@material-ui/core';
import { TextValidator } from 'react-material-ui-form-validator';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import { Info } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactQuill from '../WysiwygField';
import { colors } from '../../assets/styleGuide';
import { FormStyles, RequirementInputStyles } from '../styles';
import ProductFormOverrideStyles from '../styles/ProductFormOverride';

export const RequirementInput = props => {
    const classes = { ...RequirementInputStyles(), ...FormStyles() };
    const [quillValue, setQuillValue] = useState(props.quillValue);
    const [name, setName] = useState(props.name);
    const onChange = newHTML => {
        setQuillValue(newHTML);
        if (props.onUpdate) {
            props.onUpdate(props.index, {
                name,
                description: quillValue
            });
        }
    };

    const onNameChange = e => {
        setName(e.target.value);
        if (props.onEdit) {
            props.onEdit(props.index, {
                name,
                description: quillValue
            });
        }
    };

    const handleAdd = () => {
        const newRequirement = {
            name,
            description: quillValue
        };

        props.onAdd(newRequirement);

        setName('');
        setQuillValue('');
    };

    return (
        <div>
            {props.canDelete && (
                <CloseIcon
                    type="button"
                    onClick={() => props.onDelete(props.index)}
                    className={classes.deleteIcon}
                />
            )}
            <Grid container spacing={3} item xs={12}>
                <div className={classes.root} style={{ display: 'flex', paddingTop: '2.5em' }}>
                    <Grid item xs={12} sm={6} style={{ padding: '10px' }}>
                        <div className={classes.div}>
                            Requirement Name <span style={{ color: colors.error }}>*</span>
                        </div>
                        <FormControl className={classes.margin} style={{ display: 'flex' }}>
                            <ThemeProvider theme={ProductFormOverrideStyles}>
                                <TextValidator
                                    variant="outlined"
                                    placeholder="Write requirement name here..."
                                    value={name}
                                    name="name"
                                    fullWidth
                                    onChange={onNameChange}
                                    type="text"
                                    error={props.error}
                                />
                                {props.error && (
                                    <div className={classes.div} style={{ margin: '0em 0.3em' }}>
                                        <span className={classes.errorContainer}>
                                            <Info color="error" fontSize="small" />{' '}
                                            <FormHelperText
                                                style={{
                                                    color: '#EB5B5B',
                                                    marginTop: '0em',
                                                    marginLeft: '0.3em'
                                                }}>
                                                {props.validateReqName}
                                            </FormHelperText>
                                        </span>
                                    </div>
                                )}
                            </ThemeProvider>
                        </FormControl>
                    </Grid>
                </div>
            </Grid>

            <div className={classes.div} style={{ marginTop: '1.5em' }}>
                Requirement Description <span style={{ color: colors.error }}>*</span>
            </div>
            <ReactQuill
                style={{ height: '100%' }}
                value={quillValue}
                onChange={onChange}
                defaultValue={props.quillValue}
                error={props.error2}
            />
            {props.error2 && (
                <div className={classes.div} style={{ marginTop: '1em' }}>
                    <span className={classes.errorContainer}>
                        <Info
                            color="error"
                            fontSize="small"
                            style={{ marginTop: '1.2em', marginLeft: '0.5em' }}
                        />{' '}
                        <FormHelperText
                            style={{ color: '#EB5B5B', marginLeft: '0.5em', marginTop: '2.5em' }}>
                            {props.validateReqDesc}
                        </FormHelperText>
                    </span>
                </div>
            )}

            <div className={classes.div} style={{ marginTop: '1em' }}>
                {props.onAdd && (
                    <div style={{ display: 'flex' }}>
                        <AddCircleOutlineIcon
                            style={{
                                cursor: 'pointer',
                                fontSize: '20px',
                                margin: '1.5em -.4em'
                            }}
                            type="submit"
                            onClick={() => handleAdd()}
                        />
                        <div className={classes.div} style={{ margin: '1.7em 0.5em' }}>
                            {' '}
                            Add another requirement
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequirementInput;
