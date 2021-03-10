import { authActionType } from '../actions/constants';
import { userStatus, results } from './constants';

const INITIAL_STATE = {
    username: '',
    password: '',
    user: {
        email: null,
        jwtToken: null,
        idToken: null,
        refreshToken: null,
        roleCode: null,
        role: '',
        firstName: '',
        lastName: ''
    },
    status: userStatus.LOGGED_OUT,
    result: '',
    message: '',
    error: {},
    isFormSubmitted: false,
    isAuthInvalid: false,
    // reset password
    code: '',
    newPassword: '',
    newPasswordCopy: '',
    isSetPasswordSuccess: false,
    forgotPasswordError: {},
    isForgotPasswordFormSubmitted: false,
    passwordError: {},
    isSetPasswordFormSubmitted: false,
    codeError: {},
    // force change password
    userInfo: {},
    isChangePasswordSuccess: false,
    changePasswordError: {
        code: '',
        message: ''
    },
    renderChangePassword: false
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case authActionType.UPDATE_AUTH:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            };
        case authActionType.REQUEST_NEW_PASSWORD:
            return {
                ...state,
                status: userStatus.PASSWORD_CHANGE_NEEDED,
                password: '',
                userInfo: action.payload,
                result: results.SUCCESS
            };
        case authActionType.SET_NEW_PASSWORD_SUCCESS:
            const { userData, sessionData } = action.payload;
            return {
                ...state,
                status: userStatus.LOGGED_IN,
                user: {
                    email: userData.challengeParam.userAttributes.email,
                    jwtToken: sessionData.accessToken.jwtToken,
                    idToken: sessionData.idToken.jwtToken,
                    refreshToken: sessionData.refreshToken.token,
                    firstName: userData.challengeParam.userAttributes.given_name,
                    lastName: userData.challengeParam.userAttributes.family_name,
                    roleCode: userData.challengeParam.userAttributes[`custom:role`],
                    role: ''
                },
                result: results.SUCCESS
            };
        case authActionType.LOGIN_USER_SUCCESS: {
            const { user, session } = action.payload;
            return {
                ...state,
                status: userStatus.LOGGED_IN,
                user: {
                    email: user.attributes.email,
                    jwtToken: session.accessToken.jwtToken,
                    idToken: session.idToken.jwtToken,
                    refreshToken: session.refreshToken.token,
                    roleCode: session.idToken.payload[`custom:role`],
                    role: '',
                    firstName: user.attributes.given_name,
                    lastName: user.attributes.family_name
                },
                result: results.SUCCESS
            };
        }
        case authActionType.LOGIN_USER_FAIL: {
            return {
                ...state,
                status: userStatus.UNAUTHORIZED,
                result: results.FAIL,
                error: action.payload,
                isAuthInvalid: true
            };
        }
        case authActionType.LOGOUT_USER_SUCCESS: {
            return {
                ...INITIAL_STATE,
                result: results.SUCCESS
            };
        }
        case authActionType.FORGOT_PASSWORD_TRIGGER_SUCCESS: {
            return {
                ...state,
                forgotPasswordError: {},
                result: results.SUCCESS
            };
        }
        case authActionType.FORGOT_PASSWORD_TRIGGER_FAIL: {
            return {
                ...state,
                forgotPasswordError: action.payload,
                result: results.FAIL
            };
        }
        case authActionType.VERIFY_FORGOT_PASSWORD_SUCCESS: {
            return {
                ...INITIAL_STATE,
                isSetPasswordSuccess: true,
                result: results.SUCCESS
            };
        }
        case authActionType.VERIFY_FORGOT_PASSWORD_FAIL: {
            return {
                ...state,
                codeError: action.payload,
                result: results.FAIL
            };
        }
        case authActionType.FETCH_USER_ROLE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    role: action.payload.label
                },
                result: results.SUCCESS
            };
        case authActionType.SET_NEW_PASSWORD_FAIL:
        case authActionType.FETCH_USER_ROLE_FAIL:
            return {
                ...state,
                result: results.FAIL
            };
        case authActionType.LOGOUT_USER_FAIL:
            return { ...state, result: results.FAIL, message: 'Failed to Logout User' };
        case authActionType.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                result: results.SUCCESS,
                isChangePasswordSuccess: true
            };
        case authActionType.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                result: results.FAIL,
                isChangePasswordSuccess: false,
                changePasswordError: {
                    ...action.payload,
                    message:
                        action.payload.code === 'NotAuthorizedException'
                            ? 'Incorrect old password.'
                            : action.payload.message
                }
            };
        default:
            return state;
    }
}
