import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Amplify, { Auth } from 'aws-amplify';
import mockAxios from 'axios';
import { fetchTheme, fetchThemeColors, updateTheme, updateThemeReducer } from '../ThemeActions';
import { themeActionType } from '../constants';
import { awsAuthConfig } from '../../config';

jest.mock('axios');

const mockStore = configureMockStore([thunk]);

describe('Theme Actions Test', () => {
    Amplify.configure({
        Auth: awsAuthConfig
    });
    let store;
    beforeEach(() => {
        store = mockStore({
            colorList: [],
            primaryColor: '',
            theme: {},
            result: '',
            error: {},
            message: '',
            isUpdateSuccess: false
        });

        Auth.currentSession = jest.fn().mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                idToken: { jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ' },
                refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
            })
        );
    });

    describe('Fetch Theme Colors Test', () => {
        it('should retrieve list of theme colors ', async () => {
            const mockResponse = {
                status: 200,
                payload: [
                    {
                        id: 1,
                        name: 'Default',
                        hexColor: '#00B0F0'
                    },
                    {
                        id: 2,
                        name: 'Blue',
                        hexColor: '#2E9BEA'
                    },
                    {
                        id: 3,
                        name: 'Gold',
                        hexColor: '#D4B500',
                        isDefault: false
                    },
                    {
                        id: 4,
                        name: 'Red',
                        hexColor: '#A42A25'
                    }
                ]
            };

            mockAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    data: mockResponse
                })
            );

            const expectedActions = [
                { type: themeActionType.FETCH_THEME_COLORS_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(fetchThemeColors());
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should retrieve list of theme colors error ', async () => {
            const mockErrorResponse = {
                response: {
                    status: 403,
                    errorMessage: 'Forbidden'
                }
            };
            mockAxios.get.mockImplementationOnce(() =>
                Promise.reject({
                    response: {
                        status: 403,
                        errorMessage: 'Forbidden'
                    }
                })
            );

            const expectedActions = [
                { type: themeActionType.FETCH_THEME_COLORS_FAIL, payload: mockErrorResponse }
            ];

            await store.dispatch(fetchThemeColors());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Fetch Theme Test', () => {
        it('should retrieve theme', async () => {
            const mockResponse = {
                status: 200,
                payload: {
                    id: 1,
                    primaryColor: '#00B0F0',
                    walletFeatures: []
                }
            };

            mockAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    data: mockResponse
                })
            );

            const expectedActions = [
                { type: themeActionType.FETCH_THEME_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(fetchTheme());
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should retrieve theme error ', async () => {
            const mockErrorResponse = {
                response: {
                    status: 403,
                    errorMessage: 'Forbidden'
                }
            };
            mockAxios.get.mockImplementationOnce(() =>
                Promise.reject({
                    response: {
                        status: 403,
                        errorMessage: 'Forbidden'
                    }
                })
            );

            const expectedActions = [
                { type: themeActionType.FETCH_THEME_FAIL, payload: mockErrorResponse }
            ];
            await store.dispatch(fetchTheme());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Update Theme Test', () => {
        const payload = {
            primaryColor: '#D4B500',
            walletFeatures: []
        };

        it('should update theme', async () => {
            const mockResponse = {
                status: 200,
                data: {
                    primaryColor: '#D4B500',
                    id: 1,
                    walletFeatures: []
                }
            };

            mockAxios.put.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    data: mockResponse
                })
            );

            const expectedActions = [
                { type: themeActionType.UPDATE_THEME_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(updateTheme(payload));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should update theme error ', async () => {
            const mockResponse = {
                status: 400,
                error: {
                    code: 'Bad Request'
                }
            };

            mockAxios.put.mockImplementationOnce(() =>
                Promise.reject({
                    status: 400,
                    error: {
                        code: 'Bad Request'
                    }
                })
            );

            const expectedActions = [
                { type: themeActionType.UPDATE_THEME_FAIL, payload: mockResponse }
            ];

            await store.dispatch(updateTheme(payload));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should update theme prop', async () => {
        const prop = 'isUpdateSuccess';
        const value = true;

        const mockResponse = {
            prop,
            value
        };

        const expectedActions = [
            { type: themeActionType.UPDATE_THEME_REDUCER, payload: mockResponse }
        ];

        await store.dispatch(updateThemeReducer(prop, value));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
