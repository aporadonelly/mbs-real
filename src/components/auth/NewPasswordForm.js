import { TextValidator } from 'react-material-ui-form-validator';
import { IconButton, InputAdornment } from '@material-ui/core';
import { CheckCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import CustomErrorMessage from '../CustomErrorMessage';
import ErrorMessage from '../ErrorMessage';
import { FormStyles, SetPasswordFormStyles } from '../styles';

const NewPasswordForm = forwardRef(({ onPasswordChange }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const classes = { ...FormStyles(), ...SetPasswordFormStyles() };
    const [passwordError, setPasswordError] = useState({
        code: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const hasError = isSubmitted && passwordError.code === 'PasswordMismatchError';
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCopy, setNewPasswordCopy] = useState('');

    const limit = newPassword.length >= 8 && newPassword.length <= 16;
    const hasNumberLowerUpperCase = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword);
    const hasSpecialChars = /(?=.*[~!@#$%^&*()=_+-])/.test(newPassword);

    useEffect(() => {
        setIsSubmitted(false);
        onPasswordChange(newPassword, newPasswordCopy);
    }, [newPassword, newPasswordCopy]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    useImperativeHandle(ref, () => ({
        isNewPasswordValid() {
            return (
                limit && hasNumberLowerUpperCase && hasSpecialChars && newPasswordCopy.length > 0
            );
        },

        checkSubmittable() {
            setIsSubmitted(true);
            setPasswordError({ code: '', message: '' });
            if (newPassword !== newPasswordCopy) {
                setPasswordError({
                    code: 'PasswordMismatchError',
                    message: 'Password does not match. Please try again.'
                });
                return false;
            }

            return true;
        },

        getNewPassword() {
            return newPassword;
        }
    }));

    return (
        <>
            <div className={classes.fieldContainer}>
                <div className={classes.label}>New Password</div>
                <TextValidator
                    data-testid="new-password-field"
                    error={hasError}
                    fullWidth
                    variant="outlined"
                    onChange={e => setNewPassword(e.target.value)}
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter New Password"
                    validators={['required']}
                    errorMessages={[ErrorMessage('Password is required.')]}
                    value={newPassword}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    data-testid="show-new-password"
                                    className={classes.passwordIcon}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <div className={classes.fieldContainer}>
                <div className={classes.label}>Confirm New Password</div>
                <TextValidator
                    data-testid="new-password-copy-field"
                    required
                    error={hasError}
                    fullWidth
                    variant="outlined"
                    onChange={e => setNewPasswordCopy(e.target.value)}
                    name="newPasswordCopy"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    validators={['required']}
                    errorMessages={[ErrorMessage('Password is required.')]}
                    value={newPasswordCopy}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    data-testid="show-new-password-copy"
                                    className={classes.passwordIcon}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <CustomErrorMessage renderCondition={hasError} message={passwordError.message} />
            </div>
            <div className={classes.requirementContainer}>
                <div className={classes.requirement}>
                    <CheckCircle
                        className={limit ? classes.activeIcon : classes.icon}
                        fontSize="small"
                    />
                    Limit: 8 to 16 characters
                </div>
                <div className={classes.requirement}>
                    <CheckCircle
                        className={hasNumberLowerUpperCase ? classes.activeIcon : classes.icon}
                        fontSize="small"
                    />
                    Must contain a number, an uppercase (ABC) and lowercase letter (abc)
                </div>
                <div className={classes.requirement}>
                    <CheckCircle
                        className={hasSpecialChars ? classes.activeIcon : classes.icon}
                        fontSize="small"
                    />
                    Must contain include special characters: ~!@#$%^&*()_-+
                </div>
            </div>
        </>
    );
});

export default NewPasswordForm;
