import { themeActionType } from '../actions/constants';
import { results } from './constants';

const INITIAL_STATE = {
    colorList: [],
    primaryColor: '',
    theme: {},
    result: '',
    error: {},
    message: '',
    isUpdateSuccess: false
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case themeActionType.UPDATE_THEME_REDUCER:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            };
        case themeActionType.FETCH_THEME_COLORS_SUCCESS:
            return {
                ...state,
                colorList: action.payload,
                result: results.SUCCESS
            };
        case themeActionType.FETCH_THEME_SUCCESS:
            return {
                ...state,
                primaryColor: action.payload.primaryColor,
                result: results.SUCCESS
            };
        case themeActionType.UPDATE_THEME_SUCCESS:
            return {
                ...state,
                isUpdateSuccess: true,
                result: results.SUCCESS
            };
        case themeActionType.FETCH_THEME_COLORS_FAIL:
        case themeActionType.FETCH_THEME_FAIL:
        case themeActionType.UPDATE_THEME_FAIL:
            return {
                ...state,
                result: results.FAIL,
                error: action.payload
            };
        default:
            return state;
    }
}
