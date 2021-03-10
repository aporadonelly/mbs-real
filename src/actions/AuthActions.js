import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';
import { authActionType, awsParameters, SERVER_ADDRESS, CMS_ENDPOINT } from './constants';
import { awsAuthConfig } from '../config';

Amplify.configure({
    Auth: awsAuthConfig
});
// Login User
export const login = (username, password) => async dispatch => {
    try {
        const user = await Auth.signIn(username, password);
        if (user.challengeName === awsParameters.NEW_PASSWORD_REQUIRED) {
            dispatch({
                type: authActionType.REQUEST_NEW_PASSWORD,
                payload: user
            });
        } else {
            const session = await Auth.currentSession();
            dispatch({
                type: authActionType.LOGIN_USER_SUCCESS,
                payload: {
                    user,
                    session
                }
            });
        }
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: authActionType.LOGIN_USER_FAIL,
            payload: error
        });
    }
};

// Set New Password for Initial User
export const setNewPassword = (user, newPassword) => async dispatch => {
    try {
        const data = await Auth.completeNewPassword(user, newPassword);
        const session = await Auth.currentSession();
        dispatch({
            type: authActionType.SET_NEW_PASSWORD_SUCCESS,
            payload: {
                userData: data,
                sessionData: session
            }
        });
    } catch (error) {
        console.log('error', error);
        await dispatch({
            type: authActionType.SET_NEW_PASSWORD_FAIL,
            payload: error
        });
    }
};

// Forgot Password
export const triggerForgotPassword = username => async dispatch => {
    try {
        const data = await Auth.forgotPassword(username);
        await dispatch({
            type: authActionType.FORGOT_PASSWORD_TRIGGER_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log('error', error);
        await dispatch({
            type: authActionType.FORGOT_PASSWORD_TRIGGER_FAIL,
            payload: error
        });
    }
};

// Forgot Password
export const verifyForgotPassword = (username, code, newPassword) => async dispatch => {
    try {
        const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
        dispatch({
            type: authActionType.VERIFY_FORGOT_PASSWORD_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: authActionType.VERIFY_FORGOT_PASSWORD_FAIL,
            payload: error
        });
    }
};

export const verifyAuth = () => async dispatch => {
    try {
        const session = await Auth.currentSession();
        const user = await Auth.currentAuthenticatedUser();
        dispatch({
            type: authActionType.LOGIN_USER_SUCCESS,
            payload: {
                user,
                session
            }
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: authActionType.LOGOUT_USER_SUCCESS,
            payload: 'Successfully Removed User'
        });
    }
};

// Logout User
export const logout = () => async dispatch => {
    try {
        await Auth.signOut();
        dispatch({
            type: authActionType.LOGOUT_USER_SUCCESS,
            payload: 'Successfully Removed User'
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: authActionType.LOGOUT_USER_FAIL
        });
    }
};

// Update Login Reducer
export const updateAuth = (prop, value) => ({
    type: authActionType.UPDATE_AUTH,
    payload: { prop, value }
});

// Get user role label
export const fetchRole = code => async dispatch => {
    try {
        const response = await axios.get(`${SERVER_ADDRESS}/${CMS_ENDPOINT}/user-roles/${code}/`);
        dispatch({
            type: authActionType.FETCH_USER_ROLE_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: authActionType.FETCH_USER_ROLE_FAIL
        });
    }
};

export const changePassword = (oldPassword, newPassword) => async dispatch => {
    const user = await Auth.currentAuthenticatedUser();
    try {
        await Auth.changePassword(user, oldPassword, newPassword);
        await Auth.signOut();
        dispatch({
            type: authActionType.CHANGE_PASSWORD_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: authActionType.CHANGE_PASSWORD_FAIL,
            payload: error
        });
    }
};
