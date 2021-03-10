/**
 * @Name: ForgotPasswordForm
 * @Description: component for Forgot Password Form
 * @Props:
 *      onForgotPassword: function to trigger forgot password
 *      onUpdateField: function for updating text fields
 *      onNavigateBack: function to navigate back to login
 * @Return: View
 * @Author: Frances
 * @Last Update By: Frances
 */
import React from 'react';
import { CardHeader, CardContent, Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useSelector } from 'react-redux';
import { Info } from '@material-ui/icons';
import { FormStyles } from '../styles';
import AuthLogo from './AuthLogo';
import ErrorMessage from '../ErrorMessage';

const ForgotPasswordForm = ({ onForgotPassword, onUpdateField, onNavigateBack }) => {
    const classes = FormStyles();
    const auth = useSelector(state => state.auth);
    const hasError = auth.forgotPasswordError.code === 'LimitExceededException';

    return (
        <div className={classes.pageContainer}>
            <ValidatorForm
                onSubmit={onForgotPassword}
                className={classes.container}
                autoComplete="off">
                <div className={classes.card}>
                    <CardHeader className={classes.header} component={AuthLogo} />
                    <CardContent>
                        <div>
                            <h2 className={classes.title}>Reset your Password </h2>
                            <p className={classes.subTitleContainer}>
                                Enter your email and we&apos;ll send you a code to reset your
                                password
                            </p>
                        </div>
                        <div className={classes.fieldContainer}>
                            <div className={classes.label}>Email</div>
                            <TextValidator
                                error={hasError}
                                fullWidth
                                variant="outlined"
                                onChange={onUpdateField}
                                name="username"
                                type="text"
                                placeholder="Enter Email Address"
                                validators={['required', 'isEmail']}
                                errorMessages={[
                                    ErrorMessage('Email Address is required.'),
                                    ErrorMessage('Invalid Email Address format.')
                                ]}
                                value={auth.username}
                            />
                            {auth.forgotPasswordError.code === 'LimitExceededException' ? (
                                <div className={classes.customErrorContainer}>
                                    <Info
                                        color="error"
                                        style={{ marginRight: '0.25em' }}
                                        fontSize="small"
                                    />
                                    {auth.forgotPasswordError.message}
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            type="submit"
                            className={classes.btn}
                            data-testid="forgot-password-button">
                            Send Verification Code
                        </Button>
                    </CardContent>
                    <div>
                        <Button
                            onClick={onNavigateBack}
                            variant="text"
                            size="small"
                            color="default"
                            type="button"
                            disableRipple
                            className={classes.linkText}
                            data-testid="back-to-login-button">
                            Back to Login
                        </Button>
                    </div>
                </div>
            </ValidatorForm>
        </div>
    );
};
export default ForgotPasswordForm;
