import axios from 'axios';
import { promosActionType, SERVER_ADDRESS, CMS_ENDPOINT } from './constants';
import getHeaders from './common';

const ROOT_URL = `${SERVER_ADDRESS}/${CMS_ENDPOINT}/promos/`;

// Fetch Promo
export const fetchPromos = page => async dispatch => {
    const response = await axios.get(`${ROOT_URL}?page=${page}`, await getHeaders());
    try {
        dispatch({
            type: promosActionType.FETCH_PROMO_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: promosActionType.FETCH_PROMO_FAIL,
            payload: 'Failed to Retrieve Promos'
        });
    }
};

// Retrieve Specific Promo
export const fetchSpecificPromo = id => async dispatch => {
    try {
        const response = await axios.get(`${ROOT_URL}${id}/`, await getHeaders());
        dispatch({
            type: promosActionType.FETCH_SPECIFIC_PROMO_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: promosActionType.FETCH_SPECIFIC_PROMO_FAIL,
            payload: 'Failed to Retrieve Promo'
        });
    }
};

// Create Promo
export const createPromoAction = promo => async dispatch => {
    try {
        const response = await axios.post(ROOT_URL, promo, await getHeaders());
        dispatch({
            type: promosActionType.CREATE_PROMO_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: promosActionType.CREATE_PROMO_FAIL,
            payload: error
        });
    }
};

// Update Promo
export const updatePromo = (promo, id) => async dispatch => {
    try {
        const response = await axios.put(`${ROOT_URL}${id}/`, promo, await getHeaders());
        dispatch({
            type: promosActionType.UPDATE_PROMO_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: promosActionType.UPDATE_PROMO_FAIL,
            payload: error
        });
    }
};

// Delete Promo
export const deletePromo = id => async dispatch => {
    try {
        const response = await axios.delete(`${ROOT_URL}${id}/`, await getHeaders());
        dispatch({
            type: promosActionType.DELETE_PROMO_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: promosActionType.DELETE_PROMO_FAIL,
            payload: 'Failed to Delete Promo'
        });
    }
};

export const resetAction = () => dispatch => {
    dispatch({
        type: promosActionType.RESET_PROMO
    });
};
