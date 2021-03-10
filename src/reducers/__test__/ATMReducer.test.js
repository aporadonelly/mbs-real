import ATMReducer from '../ATMReducer';
import { atmActionType } from '../../actions/constants';
import { results } from '../constants';

describe(' ATM Reducer tests', () => {
    const INITIAL_STATE = {
        atmList: [],
        result: '',
        message: '',
        error: {},
        isCreateSuccess: false,
        isDeleteSuccess: false,
        totalATMItems: 0
    };

    it('Returns Initial State', () => {
        expect(ATMReducer(INITIAL_STATE, { type: '' })).toEqual(INITIAL_STATE);
    });

    it('Returns Initial State', () => {
        expect(ATMReducer(undefined, { type: '' })).toEqual(INITIAL_STATE);
    });

    it('Returns Update ATM Prop', () => {
        expect(
            ATMReducer(INITIAL_STATE, {
                type: atmActionType.UPDATE_ATM,
                payload: {
                    prop: 'isCreateSuccess',
                    value: true
                }
            })
        ).toEqual({
            ...INITIAL_STATE,
            isCreateSuccess: true
        });
    });

    it('Returns Create ATM', () => {
        expect(
            ATMReducer(INITIAL_STATE, {
                type: atmActionType.CREATE_ATM_SUCCESS,
                payload: {
                    atmName: 'atm'
                }
            })
        ).toEqual({
            ...INITIAL_STATE,
            isCreateSuccess: true,
            result: results.SUCCESS
        });
    });

    it('Returns Create ATM Fail', () => {
        expect(
            ATMReducer(INITIAL_STATE, {
                type: atmActionType.CREATE_ATM_FAIL,
                payload: { code: 'Bad Request' }
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: { code: 'Bad Request' },
            result: results.FAIL
        });
    });

    it('Returns Fetch ATMs Success', () => {
        const atms = {
            count: 20,
            results: [
                {
                    id: 1,
                    atmName: 'atm1',
                    locationStreet: 'Auir',
                    locationProvinceOrState: {
                        id: 1,
                        provinceName: 'Abra',
                        country: 1
                    },
                    locationCity: {
                        id: 1,
                        cityName: 'Caloocan City',
                        province: 82
                    },
                    locationPostalOrZipCode: 0,
                    latitude: '11.0000000000',
                    longitude: '11.0000000000',
                    landmark: 'Citadel of Adun'
                },
                {
                    id: 2,
                    atmName: 'atm2',
                    locationStreet: 'Earth',
                    locationProvinceOrState: {
                        id: 1,
                        provinceName: 'Abra',
                        country: 1
                    },
                    locationCity: {
                        id: 1,
                        cityName: 'Caloocan City',
                        province: 82
                    },
                    locationPostalOrZipCode: 0,
                    latitude: '12.0000000000',
                    longitude: '12.0000000000',
                    landmark: 'Engineering Bay'
                }
            ]
        };
        expect(
            ATMReducer(INITIAL_STATE, {
                type: atmActionType.FETCH_ATMS_SUCCESS,
                payload: atms
            })
        ).toEqual({
            ...INITIAL_STATE,
            atmList: atms.results,
            totalATMItems: 20,
            result: results.SUCCESS
        });
    });

    it('Returns Fetch ATMs Fail', () => {
        expect(
            ATMReducer(INITIAL_STATE, {
                type: atmActionType.FETCH_ATMS_FAIL,
                payload: { code: 'Forbidden' }
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: { code: 'Forbidden' },
            message: 'Failed to Retrieve ATMs',
            result: results.FAIL
        });
    });

    it('Returns Delete ATM', () => {
        expect(
            ATMReducer(INITIAL_STATE, {
                type: atmActionType.DELETE_ATM_SUCCESS
            })
        ).toEqual({
            ...INITIAL_STATE,
            isDeleteSuccess: true,
            result: results.SUCCESS
        });
    });

    it('Returns Delete ATM Fail', () => {
        expect(
            ATMReducer(INITIAL_STATE, {
                type: atmActionType.DELETE_ATM_FAIL,
                payload: { code: 'Not Found' }
            })
        ).toEqual({
            ...INITIAL_STATE,
            error: { code: 'Not Found' },
            result: results.FAIL
        });
    });
});
