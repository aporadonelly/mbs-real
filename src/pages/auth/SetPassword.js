import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetPasswordForm, SuccessMessage } from '../../components';
import { verifyForgotPassword, updateAuth, setNewPassword } from '../../actions';
import { userStatus } from '../../reducers/constants';

const SetPassword = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const handleUpdateField = event => {
        dispatch(updateAuth('isSetPasswordFormSubmitted', false));
        dispatch(updateAuth('codeError', {}));
        dispatch(updateAuth(event.target.name, event.target.value));
    };

    const handleSetPassword = params => {
        const email = auth.username ? auth.username : localStorage.getItem('email');
        dispatch(verifyForgotPassword(email, params.code, params.newPassword));
    };

    const handleSetNewPassword = params => {
        dispatch(setNewPassword(auth.userInfo, params.newPassword));
    };

    if (auth.isSetPasswordSuccess) {
        return <SuccessMessage renderLogo message={'You may now login using your new password.'} />;
    }
    if (auth.status === userStatus.PASSWORD_CHANGE_NEEDED) {
        return (
            <SetPasswordForm
                onUpdateField={e => handleUpdateField(e)}
                onSetPassword={handleSetNewPassword}
                hasNoCode
            />
        );
    }

    return (
        <SetPasswordForm
            onUpdateField={e => handleUpdateField(e)}
            onSetPassword={handleSetPassword}
        />
    );
};

export default SetPassword;
