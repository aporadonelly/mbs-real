import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Amplify, { Auth } from 'aws-amplify';
import mockAxios from 'axios';
import { fetchCities, fetchCountries, fetchProvinces } from '../AddressActions';
import { addressActionType } from '../constants';
import { awsAuthConfig } from '../../config';

jest.mock('axios');

const mockStore = configureMockStore([thunk]);

describe('Address Actions Test', () => {
    Amplify.configure({
        Auth: awsAuthConfig
    });
    let store;
    beforeEach(() => {
        store = mockStore({
            provinceList: [],
            cityList: [],
            countryList: [],
            result: '',
            message: '',
            error: {}
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

    describe('Fetch Provinces Test', () => {
        it('should retrieve list of provinces ', async () => {
            const mockResponse = {
                status: 200,
                payload: [
                    {
                        id: 1,
                        provinceName: 'Abra',
                        country: 1
                    },
                    {
                        id: 2,
                        provinceName: 'Agusan del Norte',
                        country: 1
                    },
                    {
                        id: 3,
                        provinceName: 'Agusan del Sur',
                        country: 1
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
                { type: addressActionType.FETCH_PROVINCES_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(fetchProvinces());
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should retrieve list of provinces error ', async () => {
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
                { type: addressActionType.FETCH_PROVINCES_FAIL, payload: mockErrorResponse }
            ];

            await store.dispatch(fetchProvinces());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    describe('Fetch Cities Test', () => {
        it('should retrieve list of cities ', async () => {
            const mockResponse = {
                status: 200,
                payload: [
                    {
                        id: 17,
                        cityName: 'Bengued',
                        province: 1
                    },
                    {
                        id: 18,
                        cityName: 'Boliney',
                        province: 1
                    },
                    {
                        id: 19,
                        cityName: 'Bucay',
                        province: 1
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
                { type: addressActionType.FETCH_CITIES_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(fetchCities(1));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should retrieve list of cities error ', async () => {
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
                { type: addressActionType.FETCH_CITIES_FAIL, payload: mockErrorResponse }
            ];

            await store.dispatch(fetchCities(1));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Fetch Countries Test', () => {
        it('should retrieve list of countries ', async () => {
            const mockResponse = {
                status: 200,
                payload: [
                    {
                        id: 2,
                        createdTimestamp: '2020-08-18T17:41:28Z',
                        lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                        countryName: 'Indonesia',
                        countryPhoneCode: '62',
                        isoAlpha2Code: 'ID',
                        isoAlpha3Code: 'IDN'
                    },
                    {
                        id: 1,
                        createdTimestamp: '2020-08-18T17:41:28Z',
                        lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                        countryName: 'Philippines',
                        countryPhoneCode: '63',
                        isoAlpha2Code: 'PH',
                        isoAlpha3Code: 'PHL'
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
                { type: addressActionType.FETCH_COUNTRIES_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(fetchCountries());
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should retrieve list of countries error ', async () => {
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
                { type: addressActionType.FETCH_COUNTRIES_FAIL, payload: mockErrorResponse }
            ];

            await store.dispatch(fetchCountries());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
