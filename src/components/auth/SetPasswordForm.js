/**
 * @Name: SetPasswordForm
 * @Description: component for Set Password Form
 * @Props:
 *      onSetPassword: function to trigger set password
 *      onUpdateField: function for updating text fields
 *      hasNoCode: boolean to display code field
 * @Return: View
 * @Author: Frances
 * @Last Update By: Frances
 */
import React, { useRef, useEffect, useState } from 'react';
import { CardHeader, CardContent, Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { FormStyles, SetPasswordFormStyles } from '../styles';
import AuthLogo from './AuthLogo';
import ErrorMessage from '../ErrorMessage';
import CustomErrorMessage from '../CustomErrorMessage';
import NewPasswordForm from './NewPasswordForm';
import { updateAuth } from '../../actions';

const SetPasswordForm = ({ onUpdateField, onSetPassword, hasNoCode }) => {
    const dispatch = useDispatch();
    const classes = { ...FormStyles(), ...SetPasswordFormStyles() };
    const auth = useSelector(state => state.auth);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCopy, setNewPasswordCopy] = useState('');
    const formRef = useRef(null);
    const newPasswordForm = useRef();

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(async () => {
        const formValidity = await formRef.current.isFormValid();
        setIsFormValid(formValidity && newPasswordForm.current.isNewPasswordValid());
    }, [auth.code, newPassword, newPasswordCopy]);

    const onPasswordChange = (childNewPassword, childNewPasswordCopy) => {
        dispatch(updateAuth('codeError', {}));
        setNewPassword(childNewPassword);
        setNewPasswordCopy(childNewPasswordCopy);
    };

    const hasCodeError = auth.isSetPasswordFormSubmitted && auth.codeError.code !== undefined;

    const validateAndSubmit = e => {
        e.preventDefault();
        dispatch(updateAuth('isSetPasswordFormSubmitted', true));
        if (newPasswordForm.current.checkSubmittable()) {
            const params = {
                code: auth.code,
                newPassword: newPasswordForm.current.getNewPassword()
            };
            onSetPassword(params);
        }
    };

    return (
        <div className={classes.pageContainer}>
            <ValidatorForm
                ref={formRef}
                onSubmit={e => validateAndSubmit(e)}
                className={classes.container}
                autoComplete="off">
                <div className={classes.card}>
                    <CardHeader className={classes.header} component={AuthLogo} />
                    <CardContent>
                        {hasNoCode ? (
                            ''
                        ) : (
                            <div className={classes.fieldContainer}>
                                <div className={classes.label}>Code</div>
                                <TextValidator
                                    error={hasCodeError}
                                    fullWidth
                                    variant="outlined"
                                    onChange={onUpdateField}
                                    name="code"
                                    type="text"
                                    placeholder="Enter Code"
                                    validators={['required']}
                                    errorMessages={[ErrorMessage('Code is required.')]}
                                    value={auth.code}
                                />
                                <CustomErrorMessage
                                    renderCondition={hasCodeError}
                                    message={
                                        auth.codeError.code === 'LimitExceededException'
                                            ? 'Attempt limit exceeded, please try after some time'
                                            : 'Incorrect code. Please try again'
                                    }
                                />
                            </div>
                        )}

                        <NewPasswordForm
                            onPasswordChange={onPasswordChange}
                            ref={newPasswordForm}
                        />
                        <Button
                            disabled={!isFormValid}
                            variant="contained"
                            size="large"
                            color="primary"
                            type="submit"
                            className={classes.btn}
                            classes={{ disabled: classes.disabledBtn }}
                            data-testid="change-password-button">
                            Confirm
                        </Button>
                    </CardContent>
                </div>
            </ValidatorForm>
        </div>
    );
};
export default SetPasswordForm;
