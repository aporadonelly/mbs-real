import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Amplify, { Auth } from 'aws-amplify';
import mockAxios from 'axios';
import {
    login,
    logout,
    verifyAuth,
    updateAuth,
    triggerForgotPassword,
    verifyForgotPassword,
    setNewPassword,
    fetchRole,
    changePassword
} from '../AuthActions';
import { authActionType } from '../constants';
import { userStatus } from '../../reducers/constants';
import { awsAuthConfig } from '../../config';

Amplify.configure({
    Auth: awsAuthConfig
});

jest.mock('axios');

const mockStore = configureMockStore([thunk]);

describe('Auth Action Test', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            username: '',
            password: '',
            user: {
                email: '',
                jwtToken: null,
                idToken: null,
                refreshToken: null
            },
            status: userStatus.LOGGED_OUT,
            result: '',
            message: ''
        });
    });

    describe('Auth Actions Login Test', () => {
        it('should handle user login', async () => {
            // MockData
            const mockData = {
                username: 'sample@email.com',
                password: 'P@ssw0rd1'
            };
            // mockResponse
            const mockResponse = {
                user: {
                    status: 200,
                    attributes: {
                        email: 'sample@email.com'
                    },
                    username: 'sampleUser'
                },
                session: {
                    status: 200,
                    accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                    idToken: {
                        jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ'
                    },
                    refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
                }
            };
            Auth.signIn = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    attributes: {
                        email: 'sample@email.com'
                    },
                    username: 'sampleUser'
                })
            );

            Auth.currentSession = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                    idToken: {
                        jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ'
                    },
                    refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
                })
            );

            const expectedActions = [
                { type: authActionType.LOGIN_USER_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(login(mockData.username, mockData.password));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should handle user login of new user', async () => {
            // MockData
            const mockData = {
                username: 'sample@email.com',
                password: 'tempPass'
            };
            // mockResponse
            const mockResponse = {
                status: 200,
                challengeName: 'NEW_PASSWORD_REQUIRED',
                Session: 'AYABeKssXNDYUjcEWRvanQsSoP'
            };
            Auth.signIn = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    challengeName: 'NEW_PASSWORD_REQUIRED',
                    Session: 'AYABeKssXNDYUjcEWRvanQsSoP'
                })
            );

            const expectedActions = [
                { type: authActionType.REQUEST_NEW_PASSWORD, payload: mockResponse }
            ];

            await store.dispatch(login(mockData.username, mockData.password));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('User Login Error', async () => {
            // MockData
            const mockData = {
                username: 'sampleUser',
                password: 'P@ssw0rd1'
            };
            // mockResponse
            const mockResponse = {
                status: 400,
                code: 'NotAuthorizedException',
                message: 'Incorrect username or password.'
            };

            Auth.signIn = jest.fn().mockImplementationOnce(() =>
                Promise.reject({
                    status: 400,
                    code: 'NotAuthorizedException',
                    message: 'Incorrect username or password.'
                })
            );

            const expectedActions = [
                { type: authActionType.LOGIN_USER_FAIL, payload: mockResponse }
            ];

            await store.dispatch(login(mockData.username, mockData.password));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Auth Actions Verify Auth Test', () => {
        it('should handle user verification', async () => {
            // mockResponse
            const mockResponse = {
                user: {
                    status: 200,
                    attributes: {
                        email: 'sample@email.com'
                    },
                    username: 'sampleUser'
                },
                session: {
                    status: 200,
                    accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                    idToken: {
                        jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ'
                    },
                    refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
                }
            };

            Auth.currentSession = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                    idToken: {
                        jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ'
                    },
                    refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
                })
            );

            Auth.currentAuthenticatedUser = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    attributes: {
                        email: 'sample@email.com'
                    },
                    username: 'sampleUser'
                })
            );

            const expectedActions = [
                { type: authActionType.LOGIN_USER_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(verifyAuth());
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should handle user no current user', async () => {
            Auth.currentSession = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                    idToken: {
                        jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ'
                    },
                    refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
                })
            );

            Auth.currentAuthenticatedUser = jest.fn().mockImplementationOnce(() =>
                Promise.reject({
                    status: 400,
                    code: 'No user',
                    message: 'No current user'
                })
            );

            const expectedActions = [
                {
                    type: authActionType.LOGOUT_USER_SUCCESS,
                    payload: 'Successfully Removed User'
                }
            ];

            await store.dispatch(verifyAuth());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Auth Actions Logout Test', () => {
        it('should handle user logout', async () => {
            Auth.signOut = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 204
                })
            );

            const expectedActions = [
                { type: authActionType.LOGOUT_USER_SUCCESS, payload: 'Successfully Removed User' }
            ];

            await store.dispatch(logout());
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('user logout error', async () => {
            Auth.signOut = jest.fn().mockImplementationOnce(() =>
                Promise.reject({
                    status: 400
                })
            );

            const expectedActions = [{ type: authActionType.LOGOUT_USER_FAIL }];

            await store.dispatch(logout());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should update username', async () => {
        const prop = 'username';
        const value = 'sample@email.com';

        const mockResponse = {
            prop,
            value
        };

        const expectedActions = [{ type: authActionType.UPDATE_AUTH, payload: mockResponse }];

        await store.dispatch(updateAuth(prop, value));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should update password', async () => {
        const prop = 'password';
        const value = 'Asdfgh1!';

        const mockResponse = {
            prop,
            value
        };

        const expectedActions = [{ type: authActionType.UPDATE_AUTH, payload: mockResponse }];

        await store.dispatch(updateAuth(prop, value));
        expect(store.getActions()).toEqual(expectedActions);
    });

    describe('Auth Actions Forgot Password Trigger Test', () => {
        it('should handle forgot password trigger', async () => {
            // MockData
            const mockData = {
                username: 'sample@email.com'
            };
            // mockResponse
            const mockResponse = {
                status: 200
            };
            Auth.forgotPassword = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200
                })
            );

            const expectedActions = [
                { type: authActionType.FORGOT_PASSWORD_TRIGGER_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(triggerForgotPassword(mockData.username));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should handle forgot password trigger error', async () => {
            // MockData
            const mockData = {
                username: 'sample@email.com'
            };
            // mockResponse
            const mockResponse = {
                status: 400,
                code: 'UserNotFoundException',
                message: 'User not found.'
            };
            Auth.forgotPassword = jest.fn().mockImplementationOnce(() =>
                Promise.reject({
                    status: 400,
                    code: 'UserNotFoundException',
                    message: 'User not found.'
                })
            );

            const expectedActions = [
                { type: authActionType.FORGOT_PASSWORD_TRIGGER_FAIL, payload: mockResponse }
            ];

            await store.dispatch(triggerForgotPassword(mockData.username));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Auth Actions Verify Forgot Password Test', () => {
        it('should handle verify forgot password ', async () => {
            // MockData
            const mockData = {
                username: 'sample@email.com',
                code: '123456',
                newPassword: 'P@ssw0rd'
            };
            // mockResponse
            const mockResponse = {
                status: 200
            };
            Auth.forgotPasswordSubmit = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200
                })
            );

            const expectedActions = [
                { type: authActionType.VERIFY_FORGOT_PASSWORD_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(
                verifyForgotPassword(mockData.username, mockData.code, mockData.newPassword)
            );
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should handle verify forgot password error', async () => {
            // MockData
            const mockData = {
                username: 'sample@email.com',
                code: '123456',
                newPassword: 'P@ssw0rd'
            };
            // mockResponse
            const mockResponse = {
                status: 400,
                code: 'CodeMismatchException',
                message: 'Code is invalid'
            };
            Auth.forgotPasswordSubmit = jest.fn().mockImplementationOnce(() =>
                Promise.reject({
                    status: 400,
                    code: 'CodeMismatchException',
                    message: 'Code is invalid'
                })
            );

            const expectedActions = [
                { type: authActionType.VERIFY_FORGOT_PASSWORD_FAIL, payload: mockResponse }
            ];

            await store.dispatch(
                verifyForgotPassword(mockData.username, mockData.code, mockData.newPassword)
            );
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Auth Actions Set New Password Test', () => {
        it('should handle user set new password', async () => {
            // MockData
            const mockData = {
                userInfo: {
                    challengeName: 'NEW_PASSWORD_REQUIRED',
                    Session: 'AYABeKssXNDYUjcEWRvanQsSoP'
                },
                password: 'P@ssw0rd1'
            };
            // mockResponse
            const mockResponse = {
                userData: {
                    status: 200,
                    challengeParam: {
                        userAttributes: {
                            email: 'sample@email.com',
                            given_name: 'Sample',
                            family_name: 'User',
                            'custom:role': 'staff'
                        }
                    }
                },
                sessionData: {
                    status: 200,
                    accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                    idToken: {
                        jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ'
                    },
                    refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
                }
            };
            Auth.completeNewPassword = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    challengeParam: {
                        userAttributes: {
                            email: 'sample@email.com',
                            given_name: 'Sample',
                            family_name: 'User',
                            'custom:role': 'staff'
                        }
                    }
                })
            );

            Auth.currentSession = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                    idToken: {
                        jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ'
                    },
                    refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
                })
            );

            const expectedActions = [
                { type: authActionType.SET_NEW_PASSWORD_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(setNewPassword(mockData.userInfo, mockData.password));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('User set new password Error', async () => {
            // MockData
            const mockData = {
                userInfo: {
                    challengeName: 'NEW_PASSWORD_REQUIRED',
                    Session: 'AYABeKssXNDYUjcEWRvanQsSoP'
                },
                password: 'P@ssw0rd1'
            };
            // mockResponse
            const mockResponse = {
                status: 400,
                code: 'Error',
                message: 'An Error Occurred'
            };

            Auth.completeNewPassword = jest.fn().mockImplementationOnce(() =>
                Promise.reject({
                    status: 400,
                    code: 'Error',
                    message: 'An Error Occurred'
                })
            );

            const expectedActions = [
                { type: authActionType.SET_NEW_PASSWORD_FAIL, payload: mockResponse }
            ];

            await store.dispatch(setNewPassword(mockData.username, mockData.password));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Auth Actions Fetch Role Test', () => {
        it('should retrieve user role ', async () => {
            const mockResponse = {
                status: 200,
                payload: {
                    code: 'admin',
                    label: 'Admin'
                }
            };

            mockAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    data: mockResponse
                })
            );

            const expectedActions = [
                { type: authActionType.FETCH_USER_ROLE_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(fetchRole('admin'));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should retrieve user role error ', async () => {
            mockAxios.get.mockImplementationOnce(() =>
                Promise.reject({
                    response: {
                        status: 404,
                        errorCode: 'CodeNotFound'
                    }
                })
            );

            const expectedActions = [{ type: authActionType.FETCH_USER_ROLE_FAIL }];

            await store.dispatch(fetchRole('manager'));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Auth Actions Change Password Test', () => {
        it('successfully change password ', async () => {
            Auth.changePassword = jest.fn();
            Auth.signOut = jest.fn();

            const expectedActions = [{ type: authActionType.CHANGE_PASSWORD_SUCCESS }];

            await store.dispatch(changePassword('oldPassword', 'newPassword'));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('detect invalid change password ', async () => {
            const responsePayload = {
                status: 400,
                code: 'Error',
                message: 'An Error Occurred'
            };
            Auth.changePassword = jest
                .fn()
                .mockImplementationOnce(() => Promise.reject(responsePayload));

            Auth.signOut = jest.fn();

            const expectedActions = [
                { type: authActionType.CHANGE_PASSWORD_FAIL, payload: responsePayload }
            ];

            await store.dispatch(changePassword('oldPassword', 'newPassword'));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
