import { bankDetailsActionType } from '../actions/constants';
import { results } from './constants';

const INITIAL_STATE = {
    bankDetails: null,
    result: '',
    message: '',
    updateSuccess: false,
    error: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case bankDetailsActionType.FETCH_BANK_DETAILS_SUCCESS:
            return {
                ...state,
                bankDetails: action.payload,
                result: results.SUCCESS
            };
        case bankDetailsActionType.UPDATE_BANK_DETAILS_SUCCESS:
            return {
                ...state,
                updateSuccess: true,
                bankDetails: action.payload,
                result: results.SUCCESS
            };
        case bankDetailsActionType.FETCH_BANK_DETAILS_FAIL:
        case bankDetailsActionType.UPDATE_BANK_DETAILS_FAIL:
            return {
                ...state,
                result: results.FAIL,
                error: action.payload
            };
        case bankDetailsActionType.UPDATE_STATE:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            };
        default:
            return state;
    }
}
