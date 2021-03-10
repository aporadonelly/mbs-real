import PromosReducer from '../PromosReducer';
import { promosActionType } from '../../actions/constants';

describe(' Promos Reducer tests', () => {
    const INITIAL_STATE = {
        result: '',
        totalPromoItems: 0,
        items: [],
        specificPromo: '',
        message: '',
        errorCodes: ''
    };

    it('Returns Initial State', () => {
        expect(PromosReducer(INITIAL_STATE, { type: '' })).toEqual({
            ...INITIAL_STATE
        });
    });

    it('Returns Success Create promo', () => {
        expect(
            PromosReducer(INITIAL_STATE, { type: promosActionType.CREATE_PROMO_SUCCESS })
        ).toEqual({
            ...INITIAL_STATE,
            result: 'CREATE SUCCESS'
        });
    });

    it('Returns Fail create promo', () => {
        expect(
            PromosReducer(INITIAL_STATE, {
                type: promosActionType.CREATE_PROMO_FAIL,
                payload: { errorCodes: 'Bad Request' }
            })
        ).toEqual({
            ...INITIAL_STATE,
            result: 'CREATE FAIL',
            errorCodes: { errorCodes: 'Bad Request' }
        });
    });

    it('Returns Success Delete promo', () => {
        expect(
            PromosReducer(INITIAL_STATE, { type: promosActionType.DELETE_PROMO_SUCCESS })
        ).toEqual({
            ...INITIAL_STATE,
            result: 'DELETE SUCCESS'
        });
    });

    it('Returns Fail Delete promo', () => {
        expect(PromosReducer(INITIAL_STATE, { type: promosActionType.DELETE_PROMO_FAIL })).toEqual({
            ...INITIAL_STATE,
            result: 'DELETE FAIL'
        });
    });

    it('Returns Success update promo', () => {
        expect(
            PromosReducer(INITIAL_STATE, { type: promosActionType.UPDATE_PROMO_SUCCESS })
        ).toEqual({
            ...INITIAL_STATE,
            result: 'UPDATE SUCCESS'
        });
    });

    it('Returns Fail update promo', () => {
        expect(
            PromosReducer(INITIAL_STATE, {
                type: promosActionType.UPDATE_PROMO_FAIL,
                payload: { errorCodes: 'Bad Request' }
            })
        ).toEqual({
            ...INITIAL_STATE,
            result: 'UPDATE FAIL',
            errorCodes: { errorCodes: 'Bad Request' }
        });
    });

    it('Returns Success for specific promo', () => {
        expect(
            PromosReducer(INITIAL_STATE, { type: promosActionType.FETCH_SPECIFIC_PROMO_SUCCESS })
        ).toEqual({
            ...INITIAL_STATE,
            result: '',
            specificPromo: undefined
        });
    });

    it('Returns Fail specific promo', () => {
        expect(
            PromosReducer(INITIAL_STATE, { type: promosActionType.FETCH_SPECIFIC_PROMO_FAIL })
        ).toEqual({
            ...INITIAL_STATE,
            message: undefined,
            result: 'FAIL'
        });
    });

    it('Returns Success Fetch State', () => {
        expect(
            PromosReducer(INITIAL_STATE, {
                type: promosActionType.FETCH_PROMO_SUCCESS,
                payload: 'results'
            })
        ).toBeTruthy();
    });

    it('Returns Fail Fetch State', () => {
        expect(PromosReducer(INITIAL_STATE, { type: promosActionType.FETCH_PROMO_FAIL })).toEqual({
            ...INITIAL_STATE,
            message: 'Failed to Retrieve Promos'
        });
    });

    it('Returns reset State', () => {
        expect(PromosReducer(INITIAL_STATE, { type: promosActionType.RESET_PROMO })).toEqual({
            ...INITIAL_STATE,
            result: ''
        });
    });
});
