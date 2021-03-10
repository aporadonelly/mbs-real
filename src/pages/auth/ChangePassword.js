import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ChangePasswordForm, SuccessMessage } from '../../components';
import { changePassword } from '../../actions';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const history = useHistory();

    useEffect(() => {
        // used to handle refresh on success
        if (!auth.isChangePasswordSuccess && !auth.renderChangePassword) {
            history.push('/');
        }
    }, []);

    const handleSubmit = (oldPassword, newPassword) => {
        dispatch(changePassword(oldPassword, newPassword));
    };

    if (auth.isChangePasswordSuccess && auth.renderChangePassword) {
        return (
            <SuccessMessage
                message={
                    'You may now login using your new password. You will be automatically logged out.'
                }
            />
        );
    }

    return <ChangePasswordForm onSubmit={handleSubmit} />;
};

export default ChangePassword;
