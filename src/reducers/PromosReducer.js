import { promosActionType } from '../actions/constants';

const INITIAL_STATE = {
    result: '',
    totalPromoItems: 0,
    items: [],
    specificPromo: '',
    message: '',
    errorCodes: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case promosActionType.FETCH_PROMO_SUCCESS:
            return {
                ...state,
                totalPromoItems: action.payload.count,
                items: action.payload.results
            };
        case promosActionType.FETCH_PROMO_FAIL:
            return { ...state, message: 'Failed to Retrieve Promos' };
        case promosActionType.FETCH_SPECIFIC_PROMO_SUCCESS:
            return {
                ...state,
                specificPromo: action.payload
            };
        case promosActionType.FETCH_SPECIFIC_PROMO_FAIL:
            return { ...state, result: 'FAIL', message: action.payload };
        case promosActionType.CREATE_PROMO_SUCCESS:
            return {
                ...state,
                result: 'CREATE SUCCESS'
            };
        case promosActionType.CREATE_PROMO_FAIL:
            return {
                ...state,
                result: 'CREATE FAIL',
                errorCodes: action.payload
            };
        case promosActionType.DELETE_PROMO_SUCCESS:
            return {
                ...state,
                result: 'DELETE SUCCESS'
            };
        case promosActionType.DELETE_PROMO_FAIL:
            return {
                ...state,
                result: 'DELETE FAIL'
            };
        case promosActionType.UPDATE_PROMO_SUCCESS:
            return {
                ...state,
                result: 'UPDATE SUCCESS'
            };
        case promosActionType.UPDATE_PROMO_FAIL:
            return {
                ...state,
                result: 'UPDATE FAIL',
                errorCodes: action.payload
            };
        case promosActionType.RESET_PROMO:
            return {
                ...state,
                result: ''
            };
        default:
            return state;
    }
}
