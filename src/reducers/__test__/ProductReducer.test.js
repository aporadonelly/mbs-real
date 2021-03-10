import ProductsReducer from '../ProductsReducer';
import { productsActionType } from '../../actions/constants';

describe(' Products Reducer tests', () => {
    const initialState = {
        product: null,
        productList: [],
        loading: true,
        error: {},
        categories: [],
        result: '',
        totalProductCount: 0
    };

    it('Returns Initial State', () => {
        expect(ProductsReducer(initialState, { type: '' })).toEqual({
            ...initialState
        });
    });

    it('Returns Initial State', () => {
        expect(ProductsReducer(undefined, { type: '' })).toEqual({
            ...initialState
        });
    });

    it('should handle CATEGORY_FETCH_SUCCESS', () => {
        expect(
            ProductsReducer([], {
                type: productsActionType.FETCH_CATEGORY_SUCCESS,
                payload: [
                    {
                        createdTimestamp: '2020-08-18T17:41:28Z',
                        enabled: true,
                        id: 1,
                        label: 'Loans',
                        lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                        slug: 'loans'
                    }
                ],
                loading: false
            })
        ).toEqual({
            categories: [
                {
                    createdTimestamp: '2020-08-18T17:41:28Z',
                    enabled: true,
                    id: 1,
                    label: 'Loans',
                    lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                    slug: 'loans'
                }
            ],
            loading: false
        });
    });

    it('should handle FETCH_PRODUCTS_SUCCESS', () => {
        const payload = {
            results: [
                {
                    id: 1,
                    createdTimestamp: '2020-08-18T17:41:28Z',
                    lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                    slug: 'loans',
                    label: 'Loans',
                    enabled: true
                },
                {
                    id: 2,
                    createdTimestamp: '2020-08-18T17:41:28Z',
                    lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                    slug: 'casa',
                    label: 'Savings & Checking',
                    enabled: true
                },
                {
                    id: 3,
                    createdTimestamp: '2020-08-18T17:41:28Z',
                    lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                    slug: 'time_deposit',
                    label: 'Time Deposit',
                    enabled: true
                }
            ],
            count: 3
        };

        expect(
            ProductsReducer([], {
                type: productsActionType.FETCH_PRODUCTS_SUCCESS,
                payload
            })
        ).toEqual({
            productList: payload.results,
            totalProductCount: payload.count,
            result: 'success'
        });
    });

    it('should handle PRODUCTS_CREATE_SUCCESS', () => {
        expect(
            ProductsReducer([], {
                type: productsActionType.CREATE_PRODUCTS_SUCCESS,
                payload: [
                    {
                        createdTimestamp: '2021-02-10T15:36:53.460850Z',
                        description: 'Visa visa.',
                        id: 214,
                        lastModifiedTimestamp: '2021-02-10T15:36:53.460859Z',
                        name: 'Visa',
                        productCategory: 3,
                        productRequirements: [
                            {
                                name: 'Visa Name',
                                description: '<p>Visa Re</p>'
                            }
                        ]
                    }
                ],
                loading: false,
                result: 'Success'
            })
        ).toEqual({
            product: [
                {
                    createdTimestamp: '2021-02-10T15:36:53.460850Z',
                    description: 'Visa visa.',
                    id: 214,
                    lastModifiedTimestamp: '2021-02-10T15:36:53.460859Z',
                    name: 'Visa',
                    productCategory: 3,
                    productRequirements: [
                        {
                            name: 'Visa Name',
                            description: '<p>Visa Re</p>'
                        }
                    ]
                }
            ],
            loading: false,
            result: 'Success'
        });
    });

    it('Returns Category fetch fail', () => {
        expect(
            ProductsReducer([], {
                type: productsActionType.FETCH_CATEGORY_FAIL,
                payload: {
                    status: undefined
                },
                loading: false
            })
        ).toEqual({
            error: {
                status: undefined
            },
            loading: false
        });
    });

    it('Returns products fetch fail', () => {
        expect(
            ProductsReducer([], {
                type: productsActionType.FETCH_PRODUCTS_FAIL,
                payload: {
                    status: undefined
                },
                loading: false
            })
        ).toEqual({
            error: {
                status: undefined
            },
            loading: false
        });
    });

    it('Returns Category create fail', () => {
        expect(
            ProductsReducer([], {
                type: productsActionType.CREATE_PRODUCTS_FAIL,
                payload: {
                    status: undefined
                },
                loading: false
            })
        ).toEqual({
            error: {
                status: undefined
            },
            loading: false
        });
    });

    it('Returns reset snackbar state', () => {
        expect(
            ProductsReducer([], {
                type: productsActionType.CREATE_RESET_PRODUCT,
                result: ''
            })
        ).toEqual({
            result: ''
        });
    });

    it('updates state', () => {
        expect(
            ProductsReducer(initialState, {
                type: productsActionType.UPDATE_PRODUCT_STATE,
                payload: {
                    prop: 'result',
                    value: 'success'
                }
            })
        ).toEqual({
            ...initialState,
            result: 'success'
        });
    });
});
