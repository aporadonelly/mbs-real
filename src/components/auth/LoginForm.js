/**
 * @Name: LoginForm
 * @Description: component for login form
 * @Props:
 *      onLogin: function when login button is clicked
 *      onUpdateField: function for updating text fields
 *      onRenderForgotPasswordForm: function to navigate to ForgotPassword Page
 * @Return: View
 * @Author: Frances
 * @Last Update By: Frances
 */
import React from 'react';
import { CardContent, CardHeader, Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useSelector } from 'react-redux';
import { LoginFormStyles, FormStyles } from '../styles';
import AuthLogo from './AuthLogo';
import ErrorMessage from '../ErrorMessage';
import CustomErrorMessage from '../CustomErrorMessage';

const LoginForm = ({ onLogin, onUpdateField, onRenderForgotPasswordForm }) => {
    const classes = { ...FormStyles(), ...LoginFormStyles() };
    const auth = useSelector(state => state.auth);
    const hasError = auth.isFormSubmitted && auth.isAuthInvalid;

    return (
        <div className={classes.pageContainer}>
            <ValidatorForm onSubmit={onLogin} className={classes.container} autoComplete="off">
                <div className={classes.card}>
                    <CardHeader className={classes.header} component={AuthLogo} />
                    <CardContent>
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
                        </div>
                        <div className={classes.fieldContainer}>
                            <div className={classes.label}>Password</div>
                            <TextValidator
                                error={hasError}
                                fullWidth
                                variant="outlined"
                                onChange={onUpdateField}
                                name="password"
                                type="password"
                                placeholder="Enter your Password"
                                validators={['required']}
                                errorMessages={[ErrorMessage('Password is required.')]}
                                value={auth.password}
                            />
                            <CustomErrorMessage
                                renderCondition={auth.isFormSubmitted && auth.isAuthInvalid}
                                message={
                                    auth.error.code === 'NotAuthorizedException' ||
                                    auth.error.code === 'UserNotFoundException'
                                        ? 'Invalid email address and/or password.'
                                        : auth.error.message
                                }
                            />
                        </div>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            type="submit"
                            className={(classes.btn, classes.loginBtn)}
                            data-testid="login-button">
                            Login
                        </Button>
                    </CardContent>
                    <div className={classes.subText}>
                        Forgot Password?
                        <Button
                            onClick={onRenderForgotPasswordForm}
                            variant="text"
                            size="small"
                            color="default"
                            type="button"
                            disableRipple
                            className={classes.linkText}
                            data-testid="forgot-password-button">
                            Click Here
                        </Button>
                    </div>
                </div>
            </ValidatorForm>
        </div>
    );
};
export default LoginForm;
