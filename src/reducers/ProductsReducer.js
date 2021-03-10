import { productsActionType } from '../actions/constants';
import { results } from './constants';

const initialState = {
    product: null,
    productList: [],
    totalProductCount: 0,
    loading: true,
    error: {},
    categories: [],
    result: ''
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case productsActionType.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                productList: payload.results,
                totalProductCount: payload.count,
                result: results.SUCCESS
            };
        case productsActionType.CREATE_PRODUCTS_SUCCESS:
            return {
                ...state,
                product: payload,
                loading: false,
                result: 'Success'
            };
        case productsActionType.FETCH_PRODUCTS_FAIL:
        case productsActionType.CREATE_PRODUCTS_FAIL:
        case productsActionType.FETCH_CATEGORY_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case productsActionType.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: payload,
                loading: false
            };
        case productsActionType.CREATE_RESET_PRODUCT:
            return {
                ...state,
                result: ''
            };
        case productsActionType.UPDATE_PRODUCT_STATE:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            };
        default:
            return state;
    }
}
