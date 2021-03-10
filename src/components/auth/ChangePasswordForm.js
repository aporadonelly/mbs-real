import React, { useEffect, useRef, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Button, CardContent, IconButton, InputAdornment } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import ErrorMessage from '../ErrorMessage';
import CustomErrorMessage from '../CustomErrorMessage';
import { colors } from '../../assets/styleGuide';
import { FormStyles, ChangePasswordFormStyles } from '../styles';
import { updateAuth } from '../../actions';
import { userStatus } from '../../reducers/constants';
import NewPasswordForm from './NewPasswordForm';

const ChangePasswordForm = ({ onSubmit }) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCopy, setNewPasswordCopy] = useState('');
    const [isSubmitted, setSubmitted] = useState(true);
    const newPasswordForm = useRef();

    const formRef = useRef(null);
    const classes = { ...FormStyles(), ...ChangePasswordFormStyles() };
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const history = useHistory();

    useEffect(
        () => () => {
            if (!auth.isChangePasswordSuccess) {
                dispatch(updateAuth('status', userStatus.LOGGED_IN));
            }
        },
        [auth.isChangePasswordSuccess]
    );

    useEffect(() => {
        const formValidity = formRef.current.isFormValid();
        setIsFormValid(formValidity && newPasswordForm.current.isNewPasswordValid());
    }, [oldPassword, newPassword, newPasswordCopy]);

    useEffect(() => {
        dispatch(updateAuth('changePasswordError', { code: '', message: '' }));
    }, [oldPassword]);

    const hasOldPasswordError = isSubmitted && auth.changePasswordError.code !== '';

    const operationCancelled = () => {
        dispatch(updateAuth('status', userStatus.LOGGED_IN));
        dispatch(updateAuth('isChangePasswordSuccess', false));
        dispatch(updateAuth('renderChangePassword', false));
        history.goBack();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const validateAndSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
        dispatch(
            updateAuth('changePasswordError', {
                code: '',
                message: ''
            })
        );
        if (newPasswordForm.current.checkSubmittable()) {
            onSubmit(oldPassword, newPasswordForm.current.getNewPassword());
        }
    };

    const onPasswordChange = (childNewPassword, childNewPasswordCopy) => {
        setNewPassword(childNewPassword);
        setNewPasswordCopy(childNewPasswordCopy);
    };

    return (
        <div className={classes.pageContainer}>
            <ValidatorForm
                data-testid="change-password-form"
                ref={formRef}
                onSubmit={e => validateAndSubmit(e)}
                className={classes.changePasswordForm}
                autoComplete="off">
                <div>
                    <IconButton
                        data-testid="backButton"
                        disableRipple
                        onClick={operationCancelled}
                        color="inherit">
                        <ArrowBackIcon />
                    </IconButton>
                </div>
                <div className={classes.container} style={{ width: 410 }}>
                    <div className={classes.card}>
                        <CardContent>
                            <div className={classes.fieldContainer}>
                                <h3>Change Password</h3>
                            </div>
                            <div
                                className={classes.fieldContainer}
                                style={{ color: colors.pageDescription }}>
                                Enter the following information to change your password.
                            </div>
                        </CardContent>
                        <CardContent>
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>Old Password</div>
                                <TextValidator
                                    data-testid="old-password-field"
                                    error={hasOldPasswordError}
                                    fullWidth
                                    variant="outlined"
                                    onChange={e => setOldPassword(e.target.value)}
                                    name="oldPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your Old Password"
                                    validators={['required']}
                                    errorMessages={[ErrorMessage('Old password is required.')]}
                                    value={oldPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    data-testid="show-old-password"
                                                    className={classes.passwordIcon}
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}>
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <CustomErrorMessage
                                    renderCondition={hasOldPasswordError}
                                    message={auth.changePasswordError.message}
                                />
                            </div>
                            <NewPasswordForm
                                onPasswordChange={onPasswordChange}
                                ref={newPasswordForm}
                            />
                        </CardContent>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Button
                        disabled={!isFormValid}
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        className={classes.changePasswordButton}
                        classes={{ disabled: classes.disabledBtn }}
                        disableRipple
                        data-testid="change-password-submit-button">
                        Submit
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        color="default"
                        type="button"
                        onClick={operationCancelled}
                        className={classes.changePasswordButton}
                        disableRipple
                        data-testid="change-password-cancel-button">
                        Cancel
                    </Button>
                </div>
            </ValidatorForm>
        </div>
    );
};

export default ChangePasswordForm;
