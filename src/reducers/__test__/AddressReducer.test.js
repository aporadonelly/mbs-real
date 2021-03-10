import AddressReducer from '../AddressReducer';
import { addressActionType } from '../../actions/constants';
import { results } from '../constants';

describe(' Promos Reducer tests', () => {
    const INITIAL_STATE = {
        result: '',
        message: '',
        error: {},
        countryList: [],
        provinceList: [],
        cityList: []
    };

    it('Returns Initial State', () => {
        expect(AddressReducer(INITIAL_STATE, { type: '' })).toEqual(INITIAL_STATE);
    });

    it('Returns Initial State', () => {
        expect(AddressReducer(undefined, { type: '' })).toEqual(INITIAL_STATE);
    });

    it('Returns Fetch Provinces Success', () => {
        const provinces = [
            {
                id: 1,
                provinceName: 'Abra',
                country: 1
            },
            {
                id: 2,
                provinceName: 'Agusan del Norte',
                country: 1
            },
            {
                id: 3,
                provinceName: 'Agusan del Sur',
                country: 1
            }
        ];
        expect(
            AddressReducer(INITIAL_STATE, {
                type: addressActionType.FETCH_PROVINCES_SUCCESS,
                payload: provinces
            })
        ).toEqual({
            ...INITIAL_STATE,
            provinceList: provinces,
            result: results.SUCCESS
        });
    });

    it('Returns Fetch Provinces Fail', () => {
        expect(
            AddressReducer(INITIAL_STATE, {
                type: addressActionType.FETCH_PROVINCES_FAIL,
                payload: { code: 'Forbidden' }
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: { code: 'Forbidden' },
            result: results.FAIL
        });
    });

    it('Returns Fetch Cities Success', () => {
        const cities = [
            {
                id: 17,
                cityName: 'Bengued',
                province: 1
            },
            {
                id: 18,
                cityName: 'Boliney',
                province: 1
            },
            {
                id: 19,
                cityName: 'Bucay',
                province: 1
            }
        ];
        expect(
            AddressReducer(INITIAL_STATE, {
                type: addressActionType.FETCH_CITIES_SUCCESS,
                payload: cities
            })
        ).toEqual({
            ...INITIAL_STATE,
            cityList: cities,
            result: results.SUCCESS
        });
    });

    it('Returns Fetch Cities Fail', () => {
        expect(
            AddressReducer(INITIAL_STATE, {
                type: addressActionType.FETCH_CITIES_FAIL,
                payload: { code: 'Forbidden' }
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: { code: 'Forbidden' },
            result: results.FAIL
        });
    });

    it('Returns Fetch Countries Success', () => {
        const countries = [
            {
                id: 2,
                createdTimestamp: '2020-08-18T17:41:28Z',
                lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                countryName: 'Indonesia',
                countryPhoneCode: '62',
                isoAlpha2Code: 'ID',
                isoAlpha3Code: 'IDN'
            },
            {
                id: 1,
                createdTimestamp: '2020-08-18T17:41:28Z',
                lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                countryName: 'Philippines',
                countryPhoneCode: '63',
                isoAlpha2Code: 'PH',
                isoAlpha3Code: 'PHL'
            }
        ];
        expect(
            AddressReducer(INITIAL_STATE, {
                type: addressActionType.FETCH_COUNTRIES_SUCCESS,
                payload: countries
            })
        ).toEqual({
            ...INITIAL_STATE,
            countryList: countries,
            result: results.SUCCESS
        });
    });

    it('Returns Fetch Countries Fail', () => {
        expect(
            AddressReducer(INITIAL_STATE, {
                type: addressActionType.FETCH_COUNTRIES_FAIL,
                payload: { code: 'Forbidden' }
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: { code: 'Forbidden' },
            result: results.FAIL
        });
    });
});
