import axios from 'axios';
import { CMS_ENDPOINT, SERVER_ADDRESS, COUNTRY, addressActionType } from './constants';
import getHeaders from './common';

const ROOT_URL = `${SERVER_ADDRESS}/${CMS_ENDPOINT}`;

export const fetchProvinces = () => async dispatch => {
    try {
        const response = await axios.get(
            `${ROOT_URL}/countries/${COUNTRY}/provinces/`,
            await getHeaders()
        );
        dispatch({
            type: addressActionType.FETCH_PROVINCES_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: addressActionType.FETCH_PROVINCES_FAIL,
            payload: error
        });
    }
};

export const fetchCities = provinceId => async dispatch => {
    try {
        const response = await axios.get(
            `${ROOT_URL}/provinces/${provinceId}/cities/`,
            await getHeaders()
        );
        dispatch({
            type: addressActionType.FETCH_CITIES_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: addressActionType.FETCH_CITIES_FAIL,
            payload: error
        });
    }
};

export const fetchCountries = () => async dispatch => {
    try {
        const response = await axios.get(`${ROOT_URL}/countries/`, await getHeaders());
        dispatch({
            type: addressActionType.FETCH_COUNTRIES_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: addressActionType.FETCH_COUNTRIES_FAIL,
            payload: error
        });
    }
};
