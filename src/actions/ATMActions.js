import axios from 'axios';
import { atmActionType, CMS_ENDPOINT, SERVER_ADDRESS } from './constants';
import getHeaders from './common';

const ROOT_URL = `${SERVER_ADDRESS}/${CMS_ENDPOINT}/atms/`;

export const createATM = atm => async dispatch => {
    try {
        const response = await axios.post(`${ROOT_URL}`, atm, await getHeaders());
        dispatch({
            type: atmActionType.CREATE_ATM_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: atmActionType.CREATE_ATM_FAIL,
            payload: error
        });
    }
};

export const updateATM = (prop, value) => ({
    type: atmActionType.UPDATE_ATM,
    payload: { prop, value }
});

export const fetchATMs = page => async dispatch => {
    try {
        const response = await axios.get(
            `${ROOT_URL}?page=${page}&sort=-created_timestamp`,
            await getHeaders()
        );
        dispatch({
            type: atmActionType.FETCH_ATMS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: atmActionType.FETCH_ATMS_FAIL,
            payload: error
        });
    }
};

export const deleteATM = id => async dispatch => {
    try {
        const response = await axios.delete(`${ROOT_URL}${id}/`, await getHeaders());
        dispatch({
            type: atmActionType.DELETE_ATM_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: atmActionType.DELETE_ATM_FAIL,
            payload: error
        });
    }
};
