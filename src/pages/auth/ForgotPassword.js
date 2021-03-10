import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { triggerForgotPassword, updateAuth } from '../../actions';
import { ForgotPasswordForm } from '../../components';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (
            auth.isForgotPasswordFormSubmitted &&
            auth.forgotPasswordError.code !== 'LimitExceededException'
        ) {
            localStorage.setItem('email', auth.username);
            dispatch(updateAuth('isForgotPasswordFormSubmitted', false));
            history.push('set-password');
        }
    }, [auth.forgotPasswordError]);

    const handleUpdateField = event => {
        dispatch(updateAuth(event.target.name, event.target.value));
        dispatch(updateAuth('forgotPasswordError', {}));
        dispatch(updateAuth('isForgotPasswordFormSubmitted', false));
    };

    const handleForgotPassword = async e => {
        e.preventDefault();
        dispatch(updateAuth('isSetPasswordSuccess', false));
        dispatch(updateAuth('isForgotPasswordFormSubmitted', true));
        await dispatch(triggerForgotPassword(auth.username));
        // Reset Set Password form
        dispatch(updateAuth('code', ''));
        dispatch(updateAuth('newPassword', ''));
        dispatch(updateAuth('newPasswordCopy', ''));
    };

    return (
        <ForgotPasswordForm
            onForgotPassword={handleForgotPassword}
            onUpdateField={e => handleUpdateField(e)}
            onNavigateBack={() => {
                dispatch(updateAuth('isForgotPasswordFormSubmitted', false));
                dispatch(updateAuth('forgotPasswordError', {}));
                history.replace('login');
            }}
        />
    );
};

export default ForgotPassword;
