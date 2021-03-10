import axios from 'axios';
import { Auth } from 'aws-amplify';
import { CMS_ENDPOINT, SERVER_ADDRESS, themeActionType } from './constants';

const ROOT_URL = `${SERVER_ADDRESS}/${CMS_ENDPOINT}`;

const getHeaders = async () => {
    const session = await Auth.currentSession();
    const token = session.accessToken.jwtToken;
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
};

export const fetchTheme = () => async dispatch => {
    try {
        const response = await axios.get(`${ROOT_URL}/theme/`, await getHeaders());
        dispatch({
            type: themeActionType.FETCH_THEME_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: themeActionType.FETCH_THEME_FAIL,
            payload: error
        });
    }
};

export const fetchThemeColors = () => async dispatch => {
    try {
        const response = await axios.get(`${ROOT_URL}/theme/colors/`, await getHeaders());
        dispatch({
            type: themeActionType.FETCH_THEME_COLORS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: themeActionType.FETCH_THEME_COLORS_FAIL,
            payload: error
        });
    }
};

export const updateTheme = theme => async dispatch => {
    try {
        const response = await axios.put(`${ROOT_URL}/theme/`, theme, await getHeaders());
        dispatch({
            type: themeActionType.UPDATE_THEME_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.log('error', error);
        dispatch({
            type: themeActionType.UPDATE_THEME_FAIL,
            payload: error
        });
    }
};

export const updateThemeReducer = (prop, value) => ({
    type: themeActionType.UPDATE_THEME_REDUCER,
    payload: { prop, value }
});
