import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, MenuItem } from '@material-ui/core';
import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { colors } from '../../assets/styleGuide';
import ErrorMessage from '../ErrorMessage';
import { BankDetailFormStyles, FormStyles } from '../styles';
import { fetchBankDetails, fetchCountries } from '../../actions';
import UploadBase from '../UploadBase';
import WysiwygField from '../WysiwygField';
import CustomErrorMessage from '../CustomErrorMessage';

const BankDetailForm = ({ onFormSubmit }) => {
    const dispatch = useDispatch();
    const classes = {
        ...FormStyles(),
        ...BankDetailFormStyles()
    };
    const [logoFile, setLogoFile] = useState([]);
    const [logoFileExists, setLogoFileExists] = useState(false);
    const [logoUrl, setLogoUrl] = useState();
    const formRef = useRef(null);
    const { address, bankDetails } = useSelector(state => state);

    const initialState = {
        displayName: '',
        countryCode: '',
        userAgreement: '',
        privacyPolicy: '',
        termsAndConditions: '',
        userAgreementHasError: false,
        privacyPolicyHasError: false,
        termsAndConditionsHasError: false,
        logoHasError: false,
        displayNameHasError: false,
        isFormSubmitted: false
    };

    const componentReducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return {
                    ...state,
                    ...action.fields
                };
            default:
                throw new Error('Invalid action type');
        }
    };

    const [localState, localDispatch] = useReducer(componentReducer, initialState);

    const countries = address.countryList;

    useEffect(() => {
        dispatch(fetchCountries());
        dispatch(fetchBankDetails());
    }, []);

    useEffect(() => {
        if (bankDetails.bankDetails !== null && address.countryList.length > 0) {
            localDispatch({
                type: 'update',
                fields: {
                    displayName: bankDetails.bankDetails.displayName,
                    countryCode: bankDetails.bankDetails.countryCode.substring(1),
                    userAgreement: bankDetails.bankDetails.userAgreement,
                    privacyPolicy: bankDetails.bankDetails.privacyPolicy,
                    termsAndConditions: bankDetails.bankDetails.termsAndConditions
                }
            });
            setLogoUrl(bankDetails.bankDetails.logo);
        }
    }, [bankDetails.bankDetails, address.countryList]);

    const handleUpdateField = event => {
        const { name, value } = event.target;
        localDispatch({
            type: 'update',
            fields: {
                [name]: value
            }
        });
    };

    const onCancel = e => {
        e.preventDefault();
        setLogoUrl('');
        dispatch(fetchCountries());
        dispatch(fetchBankDetails());
        localDispatch({
            type: 'update',
            fields: { displayNameHasError: false }
        });
        window.scrollTo(0, 0);
    };

    const checkWysiwygFields = () => {
        let errorFlag = false;

        if (localState.userAgreement.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
            localDispatch({
                type: 'update',
                fields: {
                    userAgreementHasError: true
                }
            });
            errorFlag = true;
        }

        if (localState.privacyPolicy.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
            localDispatch({
                type: 'update',
                fields: {
                    privacyPolicyHasError: true
                }
            });
            errorFlag = true;
        }

        if (localState.termsAndConditions.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
            localDispatch({
                type: 'update',
                fields: {
                    termsAndConditionsHasError: true
                }
            });
            errorFlag = true;
        }

        return errorFlag;
    };

    const handleSubmitForm = async event => {
        event.preventDefault();
        localDispatch({
            type: 'update',
            fields: {
                userAgreementHasError: false,
                privacyPolicyHasError: false,
                termsAndConditionsHasError: false,
                logoHasError: false
            }
        });

        let errorFlag = checkWysiwygFields();

        if (localState.displayName.trim().length === 0) {
            localDispatch({
                type: 'update',
                fields: { displayNameHasError: true }
            });
            errorFlag = true;
        }

        if (!logoFileExists) {
            localDispatch({
                type: 'update',
                fields: { logoHasError: true }
            });
            errorFlag = true;
        }

        if (!errorFlag) {
            const formValid = await formRef.current.isFormValid();
            if (formValid) {
                onFormSubmit({
                    displayName: localState.displayName,
                    logo: logoFile[0][0].data,
                    countryCode: `+${localState.countryCode}`,
                    userAgreement: localState.userAgreement,
                    privacyPolicy: localState.privacyPolicy,
                    termsAndConditions: localState.termsAndConditions
                });
            }
        }
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <ValidatorForm
                        data-testid="bank-details-form"
                        noValidate
                        onSubmit={e => handleSubmitForm(e)}
                        instantValidate={false}
                        ref={formRef}>
                        <Grid container item xs={12} sm={10}>
                            <Grid item sm={6} xs={12} className={classes.fieldSpacing}>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.label}>
                                        Bank Name
                                        <span style={{ color: colors.error }}> *</span>
                                    </div>
                                    <TextValidator
                                        data-testid="display-name"
                                        fullWidth
                                        variant="outlined"
                                        onChange={e => {
                                            localDispatch({
                                                type: 'update',
                                                fields: { displayNameHasError: false }
                                            });
                                            handleUpdateField(e);
                                        }}
                                        name="displayName"
                                        type="text"
                                        placeholder="Enter your Bank Name here..."
                                        value={localState.displayName}
                                        error={localState.displayNameHasError}
                                    />
                                    <CustomErrorMessage
                                        renderCondition={localState.displayNameHasError}
                                        message={'This field is required.'}
                                    />
                                </div>
                            </Grid>
                            <Grid item sm={6} xs={12} className={classes.fieldSpacing}>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.label}>
                                        Country Code
                                        <span style={{ color: colors.error }}> *</span>
                                    </div>

                                    <SelectValidator
                                        data-testid="country-code"
                                        name="countryCode"
                                        onChange={handleUpdateField}
                                        fullWidth
                                        variant="outlined"
                                        validators={['required']}
                                        value={localState.countryCode}
                                        placeholder="Select a country code"
                                        errorMessages={[ErrorMessage('This field is required.')]}
                                        className={classes.selectValidator}>
                                        <MenuItem value="" disabled>
                                            Select a country code
                                        </MenuItem>
                                        {countries.map(country => (
                                            <MenuItem
                                                key={country.id}
                                                value={country.countryPhoneCode}>
                                                {country.countryName} (+{country.countryPhoneCode})
                                            </MenuItem>
                                        ))}
                                    </SelectValidator>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={10}
                            className={classes.fieldSpacing}
                            style={{ marginBottom: '2rem' }}>
                            <Grid item lg={10}>
                                <UploadBase
                                    testId={'logoUpload'}
                                    headerText={'Bank Logo (You can only upload 1 image)'}
                                    filesLimit={1}
                                    classProps={{ icon: classes.grid }}
                                    fileData={data => {
                                        setLogoFile([data]);
                                    }}
                                    fileExist={exist => {
                                        if (exist) {
                                            localDispatch({
                                                type: 'update',
                                                fields: {
                                                    logoHasError: false
                                                }
                                            });
                                        }
                                        setLogoFileExists(exist);
                                    }}
                                    initialUrl={logoUrl}
                                    hasExternalError={localState.logoHasError}
                                />
                            </Grid>
                            {localState.logoHasError ? (
                                <Grid item lg={10} style={{ marginTop: '-3rem' }}>
                                    <CustomErrorMessage
                                        renderCondition={localState.logoHasError}
                                        message={'This field is required'}
                                    />
                                </Grid>
                            ) : (
                                ''
                            )}
                        </Grid>

                        <Grid item container lg={10} xs={12}>
                            <Grid item xs={12}>
                                <div className={classes.label}>
                                    User Agreement
                                    <span className={classes.asteriskStyle}>*</span>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <WysiwygField
                                    data-testid="userAgreement"
                                    name="userAgreement"
                                    onChange={values => {
                                        localDispatch({
                                            type: 'update',
                                            fields: {
                                                userAgreement: values,
                                                userAgreementHasError: false
                                            }
                                        });
                                    }}
                                    className={classes.quillStyle}
                                    value={localState.userAgreement}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.wysiwygErrorGrid}>
                                <CustomErrorMessage
                                    renderCondition={localState.userAgreementHasError}
                                    message={'This field is required'}
                                />
                            </Grid>
                        </Grid>

                        <Grid item container lg={10} xs={12}>
                            <Grid item xs={12}>
                                <div className={classes.label}>
                                    Privacy Policy
                                    <span className={classes.asteriskStyle}>*</span>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <WysiwygField
                                    data-testid="privacyPolicy"
                                    name="privacyPolicy"
                                    onChange={values => {
                                        localDispatch({
                                            type: 'update',
                                            fields: {
                                                privacyPolicy: values,
                                                privacyPolicyHasError: false
                                            }
                                        });
                                    }}
                                    className={classes.quillStyle}
                                    value={localState.privacyPolicy}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.wysiwygErrorGrid}>
                                <CustomErrorMessage
                                    renderCondition={localState.privacyPolicyHasError}
                                    message={'This field is required'}
                                />
                            </Grid>
                        </Grid>

                        <Grid item container lg={10} xs={12}>
                            <Grid item xs={12}>
                                <div className={classes.label}>
                                    Terms and Conditions
                                    <span className={classes.asteriskStyle}>*</span>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <WysiwygField
                                    data-testid="termsAndConditions"
                                    name="termsAndConditions"
                                    onChange={values => {
                                        localDispatch({
                                            type: 'update',
                                            fields: {
                                                termsAndConditions: values,
                                                termsAndConditionsHasError: false
                                            }
                                        });
                                    }}
                                    className={classes.quillStyle}
                                    value={localState.termsAndConditions}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.wysiwygErrorGrid}>
                                <CustomErrorMessage
                                    renderCondition={localState.termsAndConditionsHasError}
                                    message={'This field is required'}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            item
                            xs={12}
                            sm={10}
                            justify="flex-end"
                            className={classes.fieldSpacing}>
                            <div className={classes.formBtnContainer}>
                                <Button
                                    data-testid="submit-btn"
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    type="submit"
                                    disableRipple
                                    onClick={() => {
                                        localDispatch({
                                            type: 'update',
                                            fields: {
                                                isFormSubmitted: true
                                            }
                                        });
                                    }}
                                    style={{ marginRight: '1.5rem' }}
                                    className={classes.formBtn}>
                                    Save
                                </Button>
                                <Button
                                    data-testid="cancel-btn"
                                    variant="outlined"
                                    size="large"
                                    color="secondary"
                                    type="submit"
                                    disableRipple
                                    className={classes.cancelBtn}
                                    onClick={e => onCancel(e)}>
                                    Cancel
                                </Button>
                            </div>
                        </Grid>
                    </ValidatorForm>
                </Grid>
            </Grid>
        </>
    );
};

export default BankDetailForm;
