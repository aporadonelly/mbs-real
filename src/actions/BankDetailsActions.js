import axios from 'axios';
import { bankDetailsActionType, CMS_ENDPOINT, SERVER_ADDRESS } from './constants';
import getHeaders from './common';

const ROOT_URL = `${SERVER_ADDRESS}/${CMS_ENDPOINT}`;

export const fetchBankDetails = () => async dispatch => {
    try {
        const response = await axios.get(`${ROOT_URL}/bank/`);
        dispatch({
            type: bankDetailsActionType.FETCH_BANK_DETAILS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: bankDetailsActionType.FETCH_BANK_DETAILS_FAIL,
            payload: error
        });
    }
};

export const updateBankDetails = formData => async dispatch => {
    try {
        const response = await axios.put(`${ROOT_URL}/bank/`, formData, await getHeaders());
        dispatch({
            type: bankDetailsActionType.UPDATE_BANK_DETAILS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: bankDetailsActionType.UPDATE_BANK_DETAILS_FAIL,
            payload: error
        });
    }
};

export const updateBankDetailState = (prop, value) => ({
    type: bankDetailsActionType.UPDATE_STATE,
    payload: { prop, value }
});
