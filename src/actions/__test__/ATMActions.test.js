import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Amplify, { Auth } from 'aws-amplify';
import mockAxios from 'axios';
import { createATM, deleteATM, fetchATMs, updateATM } from '../ATMActions';
import { atmActionType } from '../constants';
import { awsAuthConfig } from '../../config';

jest.mock('axios');

const mockStore = configureMockStore([thunk]);

describe('ATM Actions Test', () => {
    Amplify.configure({
        Auth: awsAuthConfig
    });
    let store;
    beforeEach(() => {
        store = mockStore({
            atmList: [],
            totalATMItems: 0,
            result: '',
            message: '',
            error: {},
            isCreateSuccess: false
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

    describe('Create ATM Test', () => {
        const payload = {
            atmName: 'atm1',
            createdTimestamp: '2021-02-20T12:25:14.101212Z',
            id: 10,
            landmark: 'string',
            lastModifiedTimestamp: '2021-02-20T12:25:14.101225Z',
            latitude: '1.0000000000',
            locationCity: 905,
            locationPostalOrZipCode: 1111,
            locationProvinceOrState: 45,
            locationStreet: 'string',
            longitude: '1.0000000000'
        };

        it('should create atm', async () => {
            const mockResponse = {
                status: 201,
                data: {
                    atmName: 'atm2',
                    createdTimestamp: '2021-02-20T12:25:14.101212Z',
                    id: 10,
                    landmark: 'string',
                    lastModifiedTimestamp: '2021-02-20T12:25:14.101225Z',
                    latitude: '1.0000000000',
                    locationCity: 905,
                    locationPostalOrZipCode: 1111,
                    locationProvinceOrState: 45,
                    locationStreet: 'string',
                    longitude: '1.0000000000'
                }
            };

            mockAxios.post.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 201,
                    data: mockResponse
                })
            );

            const expectedActions = [
                { type: atmActionType.CREATE_ATM_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(createATM(payload));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should create atm error', async () => {
            const mockResponse = {
                status: 400,
                error: {
                    code: 'Bad Request'
                }
            };

            mockAxios.post.mockImplementationOnce(() =>
                Promise.reject({
                    status: 400,
                    error: {
                        code: 'Bad Request'
                    }
                })
            );

            const expectedActions = [
                { type: atmActionType.CREATE_ATM_FAIL, payload: mockResponse }
            ];

            await store.dispatch(createATM(payload));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should update atm prop', async () => {
        const prop = 'isCreateSuccess';
        const value = true;

        const mockResponse = {
            prop,
            value
        };

        const expectedActions = [{ type: atmActionType.UPDATE_ATM, payload: mockResponse }];

        await store.dispatch(updateATM(prop, value));
        expect(store.getActions()).toEqual(expectedActions);
    });

    describe('Fetch ATMs Test', () => {
        it('should retrieve list of atms ', async () => {
            const mockResponse = {
                status: 200,
                payload: {
                    count: 20,
                    results: [
                        {
                            id: 1,
                            atmName: 'atm1',
                            locationStreet: 'Auir',
                            locationProvinceOrState: {
                                id: 1,
                                provinceName: 'Abra',
                                country: 1
                            },
                            locationCity: {
                                id: 1,
                                cityName: 'Caloocan City',
                                province: 82
                            },
                            locationPostalOrZipCode: 0,
                            latitude: '11.0000000000',
                            longitude: '11.0000000000',
                            landmark: 'Citadel of Adun'
                        },
                        {
                            id: 2,
                            atmName: 'atm2',
                            locationStreet: 'Earth',
                            locationProvinceOrState: {
                                id: 1,
                                provinceName: 'Abra',
                                country: 1
                            },
                            locationCity: {
                                id: 1,
                                cityName: 'Caloocan City',
                                province: 82
                            },
                            locationPostalOrZipCode: 0,
                            latitude: '12.0000000000',
                            longitude: '12.0000000000',
                            landmark: 'Engineering Bay'
                        }
                    ]
                }
            };

            mockAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    data: mockResponse
                })
            );

            const expectedActions = [
                { type: atmActionType.FETCH_ATMS_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(fetchATMs(1));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should retrieve list of atms error ', async () => {
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
                { type: atmActionType.FETCH_ATMS_FAIL, payload: mockErrorResponse }
            ];

            await store.dispatch(fetchATMs(1));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Delete ATM Test', () => {
        it('should delete atm ', async () => {
            const mockResponse = {
                status: 200
            };

            mockAxios.delete.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    data: mockResponse
                })
            );

            const expectedActions = [
                { type: atmActionType.DELETE_ATM_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(deleteATM(1));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should delete atm error ', async () => {
            const mockErrorResponse = {
                response: {
                    status: 404,
                    errorMessage: 'Not Found'
                }
            };
            mockAxios.delete.mockImplementationOnce(() =>
                Promise.reject({
                    response: {
                        status: 404,
                        errorMessage: 'Not Found'
                    }
                })
            );

            const expectedActions = [
                { type: atmActionType.DELETE_ATM_FAIL, payload: mockErrorResponse }
            ];

            await store.dispatch(deleteATM(1));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
