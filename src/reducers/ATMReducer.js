import { atmActionType } from '../actions/constants';
import { results } from './constants';

const INITIAL_STATE = {
    atmList: [],
    totalATMItems: 0,
    result: '',
    message: '',
    error: {},
    isCreateSuccess: false,
    isDeleteSuccess: false
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case atmActionType.UPDATE_ATM:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            };
        case atmActionType.CREATE_ATM_SUCCESS:
            return {
                ...state,
                isCreateSuccess: true,
                result: results.SUCCESS
            };
        case atmActionType.FETCH_ATMS_SUCCESS:
            return {
                ...state,
                atmList: action.payload.results,
                totalATMItems: action.payload.count,
                result: results.SUCCESS
            };
        case atmActionType.FETCH_ATMS_FAIL:
            return {
                ...state,
                error: action.payload,
                message: 'Failed to Retrieve ATMs',
                result: results.FAIL
            };
        case atmActionType.DELETE_ATM_SUCCESS:
            return {
                ...state,
                isDeleteSuccess: true,
                result: results.SUCCESS
            };
        case atmActionType.CREATE_ATM_FAIL:
        case atmActionType.DELETE_ATM_FAIL:
            return {
                ...state,
                result: results.FAIL,
                error: action.payload
            };
        default:
            return state;
    }
}
