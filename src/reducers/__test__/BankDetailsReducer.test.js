import { bankDetailsActionType } from '../../actions/constants';
import { results } from '../constants';
import BankDetailsReducer from '../BankDetailsReducer';

describe('Bank details Reducer tests', () => {
    const INITIAL_STATE = {
        bankDetails: null,
        result: '',
        message: '',
        updateSuccess: false,
        error: {}
    };

    it('Returns Initial State', () => {
        expect(BankDetailsReducer(INITIAL_STATE, { type: '' })).toEqual(INITIAL_STATE);
    });

    it('Returns Initial State', () => {
        expect(BankDetailsReducer(undefined, { type: '' })).toEqual(INITIAL_STATE);
    });

    const bankDetails = {
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

    it('Returns Fetch Bank details Success', () => {
        expect(
            BankDetailsReducer(INITIAL_STATE, {
                type: bankDetailsActionType.FETCH_BANK_DETAILS_SUCCESS,
                payload: bankDetails
            })
        ).toEqual({
            ...INITIAL_STATE,
            bankDetails,
            result: results.SUCCESS
        });
    });

    it('Returns update Bank details Success', () => {
        expect(
            BankDetailsReducer(INITIAL_STATE, {
                type: bankDetailsActionType.UPDATE_BANK_DETAILS_SUCCESS,
                payload: bankDetails
            })
        ).toEqual({
            ...INITIAL_STATE,
            bankDetails,
            updateSuccess: true,
            result: results.SUCCESS
        });
    });

    it('Returns Fetch Bank details fail', () => {
        const payload = { code: 'Forbidden' };
        expect(
            BankDetailsReducer(INITIAL_STATE, {
                type: bankDetailsActionType.FETCH_BANK_DETAILS_FAIL,
                payload
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: payload,
            result: results.FAIL
        });
    });

    it('Returns Update Bank details fail', () => {
        const payload = { code: 'Forbidden' };
        expect(
            BankDetailsReducer(INITIAL_STATE, {
                type: bankDetailsActionType.UPDATE_BANK_DETAILS_FAIL,
                payload
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: payload,
            result: results.FAIL
        });
    });

    it('updates state', () => {
        expect(
            BankDetailsReducer(INITIAL_STATE, {
                type: bankDetailsActionType.UPDATE_STATE,
                payload: {
                    prop: 'username',
                    value: 'sample@email.com'
                }
            })
        ).toEqual({
            ...INITIAL_STATE,
            username: 'sample@email.com'
        });
    });
});
