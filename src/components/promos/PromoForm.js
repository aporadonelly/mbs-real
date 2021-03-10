/**
 * @Name Create Promo Page
 * @Description This is the create promo page where the user places the information for their promo to be created.
 * @Returns The Create Promo Page Component
 * @Author RJ
 * @UpdatedBy RJ
 */

import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { ArrowBack, CalendarTodayOutlined } from '@material-ui/icons';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { NavLink, useHistory } from 'react-router-dom';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { createPromoAction, updatePromo } from '../../actions/PromosActions';
import { colors } from '../../assets/styleGuide';
import { FormStyles } from '../styles';
import { CustomErrorMessage, ErrorMessage, UploadBase, WysiwygField } from '..';
import PromoSubPageStyles from '../../pages/promo/styles/PromoSubPageStyles';

const submitReducer = (state, action) => {
    switch (action.type) {
        case 'type':
            return {
                ...state,
                ...action.fields
            };
        default:
            break;
    }
    return state;
};

const initialState = {
    text: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    fileObjects: [],
    quillState: '',
    quillHasError: false,
    errorMessage: 'This field is required.',
    nameError: false,
    fromDateChanged: false,
    toDateChanged: false,
    dateError: false,
    dateErrorMessage: '',
    dateFromErrorNull: false,
    dateToErrorNull: false
};

const PromoForm = ({ title, name, imageUrl, from, to, description, id }) => {
    const [states, dispatches] = useReducer(submitReducer, initialState);
    const [file, setFile] = useState([]);
    const [fileExist, setFileExist] = useState(false);
    const classes = { ...FormStyles(), ...PromoSubPageStyles() };
    const nameRef = useRef(null);
    const promo = useSelector(state => state.promo);
    const { specificPromo } = promo;
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        (promo.result === 'CREATE SUCCESS' || promo.result === 'UPDATE SUCCESS') &&
            history.push('/promos');
    }, [promo]);

    useEffect(() => {
        title === 'Edit' &&
            dispatches({
                type: 'type',
                fields: {
                    text: name,
                    dateFrom: from,
                    dateTo: to,
                    quillState: description,
                    quillHasError: false,
                    nameError: false
                }
            });
    }, [specificPromo]);

    // Runs whenever the quill has invalid formats from submit then returns the error handler
    useEffect(() => {
        const quillError = () => {
            dispatches({
                type: 'type',
                fields: {
                    quillHasError: true
                }
            });
        };
        states.quillHasError && quillError();
    }, [states.quillHasError]);

    const onSubmit = e => {
        e.preventDefault();

        try {
            // Sets date format from MM/dd/yyyy to yyyy-MM-dd
            const frmdate =
                states.fromDateChanged || title === 'Create New'
                    ? `${states.dateFrom.getFullYear()}-${
                          states.dateFrom.getMonth() + 1
                      }-${states.dateFrom.getDate()}`
                    : states.dateFrom;

            const tdate =
                states.toDateChanged || title === 'Create New'
                    ? `${states.dateTo.getFullYear()}-${
                          states.dateTo.getMonth() + 1
                      }-${states.dateTo.getDate()}`
                    : states.dateTo;

            // Checks date value if it is a valid range
            frmdate > tdate &&
                dispatches({
                    type: 'type',
                    fields: { dateError: true, dateErrorMessage: 'Invalid Date Range' }
                });
            // Checks name input if it has a value
            !states.text && dispatches({ type: 'type', fields: { nameError: true } });
            const promoPayload = {
                name: states.text,
                images: fileExist
                    ? [title === 'Edit' ? { imageUrl: file[0][0].data } : file[0][0].data]
                    : [],
                description:
                    // handles the error for having an empty value for quill
                    states.quillState.replace(/<(.|\n)*?>/g, '').trim().length === 0
                        ? dispatches({
                              type: 'type',
                              fields: {
                                  quillState: '',
                                  quillHasError: true
                              }
                          })
                        : states.quillState,
                validFrom: frmdate,
                validTo: tdate
            };
            // Handles the dispatch for create or edit promo.
            title === 'Create New'
                ? dispatch(createPromoAction(promoPayload))
                : dispatch(updatePromo(promoPayload, id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div data-testid="createPromosComponent">
            <ValidatorForm data-testid="submit" onSubmit={onSubmit} instantValidate={false}>
                <Grid container>
                    <Grid item xs={12}>
                        <div style={{ marginTop: '.7rem' }}>
                            <NavLink
                                style={{
                                    color: colors.text
                                }}
                                to="/promos">
                                <ArrowBack />
                            </NavLink>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ marginTop: '2rem' }}>
                            <h3>{title} Promo</h3>
                        </div>
                    </Grid>
                    {/* Promo Name Input */}
                    <Grid item container lg={10}>
                        <Grid item lg={6} xs={12}>
                            <div className={classes.label}>
                                Name
                                <span className={classes.asteriskStyle}>*</span>
                            </div>
                            <TextValidator
                                data-testid="promoName"
                                className={classes.promoNameInput}
                                ref={nameRef}
                                placeholder="Enter Name Promo"
                                onBlur={e => {
                                    nameRef.current.validate(e.target.value);
                                    dispatches({
                                        type: 'type',
                                        fields: {
                                            nameError: false
                                        }
                                    });
                                }}
                                onChange={e => {
                                    dispatches({
                                        type: 'type',
                                        fields: {
                                            text: e.currentTarget.value,
                                            nameError: false
                                        }
                                    });
                                }}
                                name="name"
                                value={states.text}
                                error={states.nameError}
                                variant="outlined"
                            />
                            <CustomErrorMessage
                                renderCondition={states.nameError}
                                message={'This field is required.'}
                            />
                        </Grid>
                        {/* Date Input */}
                        <Grid item container lg={6} sm={10} xs={12} spacing={2}>
                            <Grid item lg={6} md={4} sm={6} xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <div className={classes.label}>
                                        Valid From
                                        <span className={classes.asteriskStyle}>*</span>
                                    </div>
                                    <KeyboardDatePicker
                                        name="from"
                                        className={classes.dateFromStyle}
                                        inputVariant="outlined"
                                        format="MM/dd/yyyy"
                                        value={states.dateFrom}
                                        error={states.dateError || states.dateFromErrorNull}
                                        onChange={(date, value) => {
                                            dispatches({
                                                type: 'type',
                                                fields: {
                                                    dateFrom: date,
                                                    fromDateChanged: true,
                                                    dateError: false
                                                }
                                            });
                                            value.includes('_')
                                                ? dispatches({
                                                      type: 'type',
                                                      fields: {
                                                          dateFromErrorNull: true,
                                                          dateError: false,
                                                          dateErrorMessage:
                                                              'This field is required.'
                                                      }
                                                  })
                                                : dispatches({
                                                      type: 'type',
                                                      fields: {
                                                          dateError: false,
                                                          dateFromErrorNull: false
                                                      }
                                                  });
                                        }}
                                        initialFocusedDate={states.dateFrom}
                                        invalidDateMessage={''}
                                        keyboardIcon={<CalendarTodayOutlined />}
                                    />
                                </MuiPickersUtilsProvider>
                                <CustomErrorMessage
                                    renderCondition={states.dateError || states.dateFromErrorNull}
                                    message={states.dateErrorMessage}
                                />
                            </Grid>
                            <Grid item lg={6} md={4} sm={6} xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <div className={classes.label}>
                                        Valid Until
                                        <span className={classes.asteriskStyle}>*</span>
                                    </div>
                                    <KeyboardDatePicker
                                        name="to"
                                        className={classes.dateToStyle}
                                        inputVariant="outlined"
                                        format="MM/dd/yyyy"
                                        value={states.dateTo}
                                        error={states.dateError || states.dateToErrorNull}
                                        InputAdornmentProps={{ position: 'end' }}
                                        onChange={(date, value) => {
                                            dispatches({
                                                type: 'type',
                                                fields: {
                                                    dateTo: date,
                                                    toDateChanged: true,
                                                    dateError: false
                                                }
                                            });
                                            value.includes('_')
                                                ? dispatches({
                                                      type: 'type',
                                                      fields: {
                                                          dateError: false,
                                                          dateToErrorNull: true
                                                      }
                                                  })
                                                : dispatches({
                                                      type: 'type',
                                                      fields: { dateToErrorNull: false }
                                                  });
                                        }}
                                        keyboardIcon={<CalendarTodayOutlined />}
                                        invalidDateMessage={[ErrorMessage(states.errorMessage)]}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Upload Input */}
                    <Grid item container lg={10} style={{ marginBottom: '5rem' }}>
                        <UploadBase
                            filesLimit={1}
                            classProps={{ icon: classes.grid }}
                            fileData={data => {
                                setFile([data]);
                            }}
                            fileExist={exist => {
                                setFileExist(exist);
                            }}
                            initialUrl={imageUrl}
                            headerText={'Upload (You can only upload 1 image)'}
                            customStyle={{ bottom: '26%' }}
                        />
                    </Grid>

                    {/* Quill Editior */}
                    <Grid item container lg={10} xs={12}>
                        <Grid item xs={12}>
                            <div className={classes.label}>
                                Description
                                <span className={classes.asteriskStyle}>*</span>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <WysiwygField
                                data-testid="quill"
                                name="quill"
                                onChange={values => {
                                    dispatches({
                                        type: 'type',
                                        fields: {
                                            quillState: values,
                                            quillHasError: false
                                        }
                                    });
                                }}
                                className={classes.quillStyle}
                                value={states.quillState || ''}
                            />
                        </Grid>
                        <Grid item container xs={12} className={classes.groupBtn}>
                            <CustomErrorMessage
                                renderCondition={states.quillHasError}
                                message={'This field is required'}
                            />
                            <Grid item container xs={12} justify="flex-end">
                                <Grid item style={{ marginTop: '2rem' }}>
                                    <Button
                                        data-testid="submitForm"
                                        style={{ marginRight: '1.5rem' }}
                                        className={classes.formBtn}
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        disabled={states.isLoading && true}>
                                        Save
                                    </Button>
                                    <Button
                                        data-testid="cancel-btn"
                                        variant="outlined"
                                        size="large"
                                        color="secondary"
                                        type="button"
                                        className={classes.cancelBtn}
                                        onClick={() => {
                                            history.push('/promos');
                                        }}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ValidatorForm>
        </div>
    );
};
export default PromoForm;
