import axios from 'axios';
import { productsActionType, SERVER_ADDRESS, CMS_ENDPOINT } from './constants';
import getHeaders from './common';

export const fetchProducts = (categoryId = null, page = 1, searchQuery = '') => async dispatch => {
    try {
        const params = {
            page,
            search: searchQuery,
            product_category: categoryId
        };

        const response = await axios.get(`${SERVER_ADDRESS}/${CMS_ENDPOINT}/products/`, {
            params
        });
        dispatch({
            type: productsActionType.FETCH_PRODUCTS_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: productsActionType.FETCH_PRODUCTS_FAIL,
            payload: e
        });
    }
};

export const createNewProduct = formData => async dispatch => {
    try {
        const response = await axios.post(
            `${SERVER_ADDRESS}/${CMS_ENDPOINT}/products/`,
            formData,
            await getHeaders()
        );
        if (response.status === 201) {
            dispatch({
                type: productsActionType.CREATE_PRODUCTS_SUCCESS,
                payload: response.data
            });
        }
    } catch (e) {
        dispatch({
            type: productsActionType.CREATE_PRODUCTS_FAIL,
            payload: e
        });
    }
};

export const getCategory = () => async dispatch => {
    try {
        const res = await axios.get(
            `${SERVER_ADDRESS}/${CMS_ENDPOINT}/product-categories/`,
            await getHeaders()
        );
        if (res.status === 200) {
            dispatch({
                type: productsActionType.FETCH_CATEGORY_SUCCESS,
                payload: res.data.results
            });
        }
    } catch (e) {
        dispatch({
            type: productsActionType.FETCH_CATEGORY_FAIL,
            payload: e
        });
    }
};

export const resetProductAction = () => dispatch => {
    dispatch({
        type: productsActionType.CREATE_RESET_PRODUCT
    });
};

export const updateProductState = (prop, value) => ({
    type: productsActionType.UPDATE_PRODUCT_STATE,
    payload: { prop, value }
});
