import { addressActionType } from '../actions/constants';
import { results } from './constants';

const INITIAL_STATE = {
    provinceList: [],
    cityList: [],
    countryList: [],
    result: '',
    message: '',
    error: {}
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case addressActionType.FETCH_PROVINCES_SUCCESS:
            return {
                ...state,
                provinceList: action.payload,
                result: results.SUCCESS
            };
        case addressActionType.FETCH_CITIES_SUCCESS:
            return {
                ...state,
                cityList: action.payload,
                result: results.SUCCESS
            };
        case addressActionType.FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                countryList: action.payload,
                result: results.SUCCESS
            };
        case addressActionType.FETCH_COUNTRIES_FAIL:
        case addressActionType.FETCH_PROVINCES_FAIL:
        case addressActionType.FETCH_CITIES_FAIL:
            return {
                ...state,
                result: results.FAIL,
                error: action.payload
            };
        default:
            return state;
    }
}
