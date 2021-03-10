import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Amplify, { Auth } from 'aws-amplify';
import mockAxios from 'axios';
import {
    createPromoAction,
    fetchPromos,
    fetchSpecificPromo,
    updatePromo,
    resetAction,
    deletePromo
} from '../PromosActions';
import { promosActionType } from '../constants';
import { awsAuthConfig } from '../../config';

const mockStore = configureMockStore([thunk]);

describe('promos Action Test', () => {
    Amplify.configure({
        Auth: awsAuthConfig
    });

    jest.mock('axios');
    let store;
    beforeEach(() => {
        store = mockStore({
            result: '',
            totalPromoItems: 1,
            items: [],
            specificPromo: '',
            message: ''
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
    describe('Promo Fetch Specific Promo Actions', () => {
        it('should handle view specific promo action', async () => {
            Auth.currentSession = jest.fn().mockImplementation(() =>
                Promise.resolve({
                    status: 200,
                    accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                    idToken: { jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ' },
                    refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
                })
            );
            mockAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200
                })
            );
            const id = 'sampleID';
            const expectedAction = [
                { type: promosActionType.FETCH_SPECIFIC_PROMO_SUCCESS, payload: undefined }
            ];
            await store.dispatch(fetchSpecificPromo(id));
            expect(store.getActions()).toEqual(expectedAction);
        });
        it('should handle specific promo failure', async () => {
            mockAxios.get.mockImplementationOnce(() =>
                Promise.reject({
                    status: 401
                })
            );
            const id = 'sampleID';
            const expectedAction = [
                {
                    type: promosActionType.FETCH_SPECIFIC_PROMO_FAIL,
                    payload: 'Failed to Retrieve Promo'
                }
            ];
            await store.dispatch(fetchSpecificPromo(id));
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    describe('fetch organization test', () => {
        const mockPayload = {
            page: '25'
        };
        it('should handle fetch promo action', async () => {
            mockAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    data: mockPayload
                })
            );

            const expectedAction = [
                { type: promosActionType.FETCH_PROMO_SUCCESS, payload: mockPayload }
            ];
            await store.dispatch(fetchPromos(mockPayload));
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    describe('Promo Creation Actions', () => {
        const mockPayload = {
            name: 'string',
            description: 'string',
            images: ['string'],
            validFrom: '2021-03-05',
            validTo: '2021-03-05'
        };
        it('should handle create promo action', async () => {
            const mockResponse = {
                id: 0,
                name: 'string',
                description: 'string',
                images: [],
                validFrom: '2021-02-19',
                validTo: '2021-02-19',
                status: 'string',
                createdTimestamp: '2021-02-19T02:23:45.793Z',
                lastModifiedTimestamp: '2021-02-19T02:23:45.793Z',
                postedTimestamp: '2021-02-19T02:23:45.793Z'
            };

            Auth.currentSession = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                    idToken: { jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ' },
                    refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
                })
            );

            mockAxios.post.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 201,
                    data: mockResponse
                })
            );

            const expectedAction = [
                { type: promosActionType.CREATE_PROMO_SUCCESS, payload: mockResponse }
            ];
            await store.dispatch(createPromoAction(mockPayload));
            expect(store.getActions()).toEqual(expectedAction);
        });
        it('should handle create promo failure', async () => {
            const mockPayloadError = {
                description: '<p>test</p>',
                images: [],
                name: 'test',
                validFrom: '2025-3-5',
                validTo: '2021-3-5'
            };
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

            const expectedAction = [
                { type: promosActionType.CREATE_PROMO_FAIL, payload: mockResponse }
            ];
            await store.dispatch(createPromoAction(mockPayloadError));
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    describe('Promo Update Actions', () => {
        const mockPayload = {
            description: '<p>string</p>',
            images: ['string'],
            name: 'string',
            validFrom: '2021-02-15',
            validTo: '2021-02-15'
        };
        it('should handle update promo action', async () => {
            const mockResponse = {
                id: 0,
                name: 'string',
                description: 'string',
                images: [],
                validFrom: '2021-02-19',
                validTo: '2021-02-19',
                status: 'string',
                createdTimestamp: '2021-02-19T02:23:45.793Z',
                lastModifiedTimestamp: '2021-02-19T02:23:45.793Z',
                postedTimestamp: '2021-02-19T02:23:45.793Z'
            };

            Auth.currentSession = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                    idToken: { jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ' },
                    refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
                })
            );

            mockAxios.put.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    data: mockResponse
                })
            );

            const expectedAction = [
                { type: promosActionType.UPDATE_PROMO_SUCCESS, payload: mockResponse }
            ];
            await store.dispatch(updatePromo(mockPayload));
            expect(store.getActions()).toEqual(expectedAction);
        });
        it('should handle update promo failure', async () => {
            const mockResponse = {
                status: 400
            };
            mockAxios.put.mockImplementationOnce(() =>
                Promise.reject({
                    status: 400
                })
            );

            const expectedAction = [
                { type: promosActionType.UPDATE_PROMO_FAIL, payload: mockResponse }
            ];
            await store.dispatch(updatePromo(mockPayload));
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    describe('Promo Delete Actions', () => {
        it('should handle update promo action', async () => {
            Auth.currentSession = jest.fn().mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                    idToken: { jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ' },
                    refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
                })
            );

            mockAxios.delete.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 204
                })
            );

            const expectedAction = [{ type: promosActionType.DELETE_PROMO_SUCCESS }];
            await store.dispatch(deletePromo(1));
            expect(store.getActions()).toEqual(expectedAction);
        });
        it('should handle update promo failure', async () => {
            mockAxios.delete.mockImplementationOnce(() =>
                Promise.reject({
                    status: 401
                })
            );

            const expectedAction = [
                { type: promosActionType.DELETE_PROMO_FAIL, payload: 'Failed to Delete Promo' }
            ];
            await store.dispatch(deletePromo(1));
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    describe('Promo Reset Actions', () => {
        it('should handle create promo action', async () => {
            const expectedAction = [{ type: promosActionType.RESET_PROMO }];
            await store.dispatch(resetAction());
            expect(store.getActions()).toEqual(expectedAction);
        });
    });
});
