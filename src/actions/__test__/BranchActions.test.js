import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Amplify, { Auth } from 'aws-amplify';
import mockAxios from 'axios';
import { createBranch, deleteBranch, fetchBranches, updateBranch } from '../BranchActions';
import { branchActionType } from '../constants';
import { awsAuthConfig } from '../../config';

jest.mock('axios');

const mockStore = configureMockStore([thunk]);

describe('Branch Actions Test', () => {
    Amplify.configure({
        Auth: awsAuthConfig
    });
    let store;
    beforeEach(() => {
        store = mockStore({
            branchList: [],
            totalBranchItems: 0,
            result: '',
            message: '',
            error: {},
            isCreateSuccess: false,
            isDeleteSuccess: false
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

    describe('Create Branch Test', () => {
        const payload = {
            branchName: 'asdasd',
            createdTimestamp: '2021-02-20T12:25:14.101212Z',
            email: 'sample@gmail.com',
            id: 10,
            landmark: 'string',
            lastModifiedTimestamp: '2021-02-20T12:25:14.101225Z',
            latitude: '1.0000000000',
            locationCity: 905,
            locationPostalOrZipCode: 1111,
            locationProvinceOrState: 45,
            locationStreet: 'string',
            longitude: '1.0000000000',
            mobile: '9123456789',
            phone: '1234567',
            schedules: [
                {
                    bankingDays: ['Tuesday', 'Wednesday', 'Friday'],
                    bankingHoursFrom: '08:00',
                    bankingHoursTo: '08:00'
                }
            ]
        };

        it('should create branch', async () => {
            const mockResponse = {
                status: 201,
                data: {
                    branchName: 'asdasd',
                    createdTimestamp: '2021-02-20T12:25:14.101212Z',
                    email: 'sample@gmail.com',
                    id: 10,
                    landmark: 'string',
                    lastModifiedTimestamp: '2021-02-20T12:25:14.101225Z',
                    latitude: '1.0000000000',
                    locationCity: 905,
                    locationPostalOrZipCode: 1111,
                    locationProvinceOrState: 45,
                    locationStreet: 'string',
                    longitude: '1.0000000000',
                    mobile: '9123456789',
                    phone: '1234567',
                    schedules: [
                        {
                            bankingDays: ['Tuesday', 'Wednesday', 'Friday'],
                            bankingHoursFrom: '08:00',
                            bankingHoursTo: '08:00'
                        }
                    ]
                }
            };

            mockAxios.post.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 201,
                    data: mockResponse
                })
            );

            const expectedActions = [
                { type: branchActionType.CREATE_BRANCH_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(createBranch(payload));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should create branch error', async () => {
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
                { type: branchActionType.CREATE_BRANCH_FAIL, payload: mockResponse }
            ];

            await store.dispatch(createBranch(payload));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should update branch prop', async () => {
        const prop = 'isCreateSuccess';
        const value = true;

        const mockResponse = {
            prop,
            value
        };

        const expectedActions = [{ type: branchActionType.UPDATE_BRANCH, payload: mockResponse }];

        await store.dispatch(updateBranch(prop, value));
        expect(store.getActions()).toEqual(expectedActions);
    });

    describe('Fetch Branches Test', () => {
        it('should retrieve list of branches ', async () => {
            const mockResponse = {
                status: 200,
                payload: {
                    count: 20,
                    results: [
                        {
                            id: 1,
                            schedules: [
                                {
                                    bankingDays: ['Monday'],
                                    bankingHoursFrom: '8:00',
                                    bankingHoursTo: '9:00'
                                }
                            ],
                            branchName: 'branch',
                            locationStreet: 'khgjhgjhg',
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
                            email: 'asd@asd.com',
                            phone: '+639175240823',
                            mobile: '+639175240823',
                            latitude: '11.0000000000',
                            longitude: '11.0000000000',
                            landmark: 'jkhkjh'
                        },
                        {
                            id: 2,
                            schedules: [
                                {
                                    bankingDays: ['Monday', 'Friday'],
                                    bankingHoursFrom: '9:00',
                                    bankingHoursTo: '10:00'
                                }
                            ],
                            branchName: 'asdasd',
                            locationStreet: 'qweqwe',
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
                            email: 'asd@asd.com',
                            phone: '+639175240823',
                            mobile: '+639175240823',
                            latitude: '12.0000000000',
                            longitude: '12.0000000000',
                            landmark: 'asdasd'
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
                { type: branchActionType.FETCH_BRANCHES_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(fetchBranches(1));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should retrieve list of branches error ', async () => {
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
                { type: branchActionType.FETCH_BRANCHES_FAIL, payload: mockErrorResponse }
            ];

            await store.dispatch(fetchBranches(1));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Delete Branches Test', () => {
        it('should delete branch ', async () => {
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
                { type: branchActionType.DELETE_BRANCH_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(deleteBranch(1));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should delete branch error ', async () => {
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
                { type: branchActionType.DELETE_BRANCH_FAIL, payload: mockErrorResponse }
            ];

            await store.dispatch(deleteBranch(1));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
