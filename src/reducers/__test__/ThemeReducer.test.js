import ThemeReducer from '../ThemeReducer';
import { themeActionType } from '../../actions/constants';
import { results } from '../constants';

describe(' Promos Reducer tests', () => {
    const INITIAL_STATE = {
        colorList: [],
        primaryColor: '',
        theme: {},
        result: '',
        error: {},
        message: '',
        isUpdateSuccess: false
    };

    it('Returns Initial State', () => {
        expect(ThemeReducer(INITIAL_STATE, { type: '' })).toEqual(INITIAL_STATE);
    });

    it('Returns Initial State', () => {
        expect(ThemeReducer(undefined, { type: '' })).toEqual(INITIAL_STATE);
    });

    it('Returns Fetch Colors Success', () => {
        const colors = [
            {
                id: 1,
                name: 'Default',
                hexColor: '#00B0F0'
            },
            {
                id: 2,
                name: 'Blue',
                hexColor: '#2E9BEA'
            },
            {
                id: 3,
                name: 'Gold',
                hexColor: '#D4B500',
                isDefault: false
            },
            {
                id: 4,
                name: 'Red',
                hexColor: '#A42A25'
            }
        ];
        expect(
            ThemeReducer(INITIAL_STATE, {
                type: themeActionType.FETCH_THEME_COLORS_SUCCESS,
                payload: colors
            })
        ).toEqual({
            ...INITIAL_STATE,
            colorList: colors,
            result: results.SUCCESS
        });
    });

    it('Returns Fetch Colors Fail', () => {
        expect(
            ThemeReducer(INITIAL_STATE, {
                type: themeActionType.FETCH_THEME_COLORS_FAIL,
                payload: { code: 'Forbidden' }
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: { code: 'Forbidden' },
            result: results.FAIL
        });
    });

    it('Returns Fetch Theme Success', () => {
        const theme = {
            primaryColor: '#D4B500'
        };

        expect(
            ThemeReducer(INITIAL_STATE, {
                type: themeActionType.FETCH_THEME_SUCCESS,
                payload: theme
            })
        ).toEqual({
            ...INITIAL_STATE,
            primaryColor: theme.primaryColor,
            result: results.SUCCESS
        });
    });

    it('Returns Fetch Theme Fail', () => {
        expect(
            ThemeReducer(INITIAL_STATE, {
                type: themeActionType.FETCH_THEME_FAIL,
                payload: { code: 'Forbidden' }
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: { code: 'Forbidden' },
            result: results.FAIL
        });
    });

    it('Returns Update Theme Prop', () => {
        expect(
            ThemeReducer(INITIAL_STATE, {
                type: themeActionType.UPDATE_THEME_REDUCER,
                payload: {
                    prop: 'isUpdateSuccess',
                    value: true
                }
            })
        ).toEqual({
            ...INITIAL_STATE,
            isUpdateSuccess: true
        });
    });

    it('Returns Update Theme', () => {
        expect(
            ThemeReducer(INITIAL_STATE, {
                type: themeActionType.UPDATE_THEME_SUCCESS,
                payload: {
                    primaryColor: '#D4B500'
                }
            })
        ).toEqual({
            ...INITIAL_STATE,
            isUpdateSuccess: true,
            result: results.SUCCESS
        });
    });

    it('Returns Update Theme Fail', () => {
        expect(
            ThemeReducer(INITIAL_STATE, {
                type: themeActionType.UPDATE_THEME_FAIL,
                payload: { code: 'Bad Request' }
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: { code: 'Bad Request' },
            result: results.FAIL
        });
    });
});
