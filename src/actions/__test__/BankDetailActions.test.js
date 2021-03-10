import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Amplify, { Auth } from 'aws-amplify';
import mockAxios from 'axios';
import { bankDetailsActionType } from '../constants';
import { awsAuthConfig } from '../../config';
import { fetchBankDetails, updateBankDetails, updateBankDetailState } from '../BankDetailsActions';

jest.mock('axios');

const mockStore = configureMockStore([thunk]);

describe('Address Actions Test', () => {
    Amplify.configure({
        Auth: awsAuthConfig
    });
    let store;
    beforeEach(() => {
        store = mockStore({
            bankDetails: null,
            result: '',
            message: '',
            updateSuccess: false,
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

    describe('Fetch Bank details Test', () => {
        it('should fetch bank details', async () => {
            const mockResponse = {
                status: 200,
                payload: {
                    id: 1,
                    displayName: 'string',
                    countryCode: '+63',
                    logo:
                        'https://ewalletbackendcmsdevelopment-bucket-hgxv1prif2i1.s3-ap-southeast-1.amazonaws.com/aqQJHb96VnzqO2MH2af39.png',
                    userAgreement: 'string',
                    privacyPolicy: 'string',
                    termsAndConditions: 'string',
                    createdTimestamp: '2020-08-18T17:41:28Z',
                    lastModifiedTimestamp: '2021-03-02T04:12:19.384998Z',
                    bankName: 'Bank'
                }
            };

            mockAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    data: mockResponse
                })
            );

            const expectedActions = [
                { type: bankDetailsActionType.FETCH_BANK_DETAILS_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(fetchBankDetails());
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
                { type: bankDetailsActionType.FETCH_BANK_DETAILS_FAIL, payload: mockErrorResponse }
            ];

            await store.dispatch(fetchBankDetails());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('Update Bank details Test', () => {
        it('should update bank details', async () => {
            const payload = {
                id: 1,
                displayName: 'string',
                countryCode: '+63',
                logo:
                    'https://ewalletbackendcmsdevelopment-bucket-hgxv1prif2i1.s3-ap-southeast-1.amazonaws.com/aqQJHb96VnzqO2MH2af39.png',
                userAgreement: 'string',
                privacyPolicy: 'string',
                termsAndConditions: 'string',
                createdTimestamp: '2020-08-18T17:41:28Z',
                lastModifiedTimestamp: '2021-03-02T04:12:19.384998Z',
                bankName: 'Bank'
            };
            const mockResponse = {
                status: 200,
                payload
            };

            mockAxios.put.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    data: mockResponse
                })
            );

            const expectedActions = [
                { type: bankDetailsActionType.UPDATE_BANK_DETAILS_SUCCESS, payload: mockResponse }
            ];

            await store.dispatch(updateBankDetails(payload));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should update bank details error ', async () => {
            const mockErrorResponse = {
                response: {
                    status: 403,
                    errorMessage: 'Forbidden'
                }
            };
            mockAxios.put.mockImplementationOnce(() =>
                Promise.reject({
                    response: {
                        status: 403,
                        errorMessage: 'Forbidden'
                    }
                })
            );

            const expectedActions = [
                { type: bankDetailsActionType.UPDATE_BANK_DETAILS_FAIL, payload: mockErrorResponse }
            ];

            await store.dispatch(updateBankDetails({}));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should update state', async () => {
        const prop = 'username';
        const value = 'sample@email.com';

        const mockResponse = {
            prop,
            value
        };

        const expectedActions = [
            { type: bankDetailsActionType.UPDATE_STATE, payload: mockResponse }
        ];

        await store.dispatch(updateBankDetailState(prop, value));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
