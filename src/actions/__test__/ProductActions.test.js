import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Amplify, { Auth } from 'aws-amplify';
import mockAxios from 'axios';
import {
    createNewProduct,
    fetchProducts,
    getCategory,
    resetProductAction,
    updateProductState
} from '../ProductActions';
import { productsActionType } from '../constants';
import { awsAuthConfig } from '../../config';

const mockStore = configureMockStore([thunk]);

describe('Product Action Test', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            product: null,
            products: [],
            loading: true,
            error: {},
            category: null,
            result: ''
        });
    });

    describe('Products Actions Test', () => {
        Auth.currentSession = jest.fn().mockImplementation(() =>
            Promise.resolve({
                status: 200,
                accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
                idToken: { jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ' },
                refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
            })
        );

        const mockData = {
            description: 'zbzbzb',
            name: 'vvzbzb',
            productCategory: 3,
            productRequirements: [{ name: 'zbzbz', description: '<p>zbzbzbzbz</p>' }]
        };
        const mockResponse = {
            id: 447,
            description: 'zbzbzb',
            name: 'vvzbzb',
            productCategory: 3,
            productRequirements: [{ name: 'zbzbz', description: '<p>zbzbzbzbz</p>' }],
            createdTimestamp: '2021-02-18T04:17:19.863771Z',
            lastModifiedTimestamp: '2021-02-18T04:17:19.863781Z'
        };

        it('Handles CREATE_PRODUCTS_FAIL action', async () => {
            mockAxios.post.mockImplementationOnce(() =>
                Promise.reject({
                    status: 400,
                    data: mockResponse
                })
            );
            await store.dispatch(createNewProduct(mockData));
        });

        it('Handles FETCH_CATEGORY_FAIL', async () => {
            const mockResult = {
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
                ]
            };

            mockAxios.get.mockImplementationOnce(() =>
                Promise.reject({
                    status: 200,
                    data: mockResult
                })
            );
            await store.dispatch(getCategory());
        });
    });
});

describe('products Action Test', () => {
    Amplify.configure({
        Auth: awsAuthConfig
    });

    jest.mock('axios');
    let store;
    beforeEach(() => {
        store = mockStore({
            product: null,
            products: [],
            loading: true,
            error: {},
            category: null,
            result: ''
        });
    });

    const mockData = {
        name: 'sssssssss',
        description: 'ssssssssss',
        productCategory: 3,
        productRequirements: [{ name: 'sssssssssssss', description: '<p>sssssssssssssss</p>' }]
    };
    const mockResponse = {
        id: 447,
        name: 'sssssssss',
        description: 'ssssssssss',
        productCategory: 3,
        productRequirements: [{ name: 'sssssssssssss', description: '<p>sssssssssssssss</p>' }],
        createdTimestamp: '2021-02-18T04:17:19.863771Z',
        lastModifiedTimestamp: '2021-02-18T04:17:19.863781Z'
    };

    const mockResult = {
        data: {
            count: 3,
            next: null,
            previous: null,
            results: [
                {
                    createdTimestamp: '2020-08-18T17:41:28Z',
                    enabled: true,
                    id: 1,
                    label: 'Loans',
                    lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                    slug: 'loans'
                },
                {
                    createdTimestamp: '2020-08-18T17:41:28Z',
                    enabled: true,
                    id: 2,
                    label: 'Savings & Checking',
                    lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                    slug: 'casa'
                },
                {
                    createdTimestamp: '2020-08-18T17:41:28Z',
                    enabled: true,
                    id: 3,
                    label: 'Time Deposit',
                    lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                    slug: 'time_deposit'
                }
            ]
        }
    };

    Auth.currentSession = jest.fn().mockImplementation(() =>
        Promise.resolve({
            status: 200,
            accessToken: { jwtToken: 'eyJraWQiOiJsbm1Mb1hxOXJHS3hhZ241TzMzOE40a' },
            idToken: { jwtToken: 'eyJraWQiOiJUa2JDWWpsUVFzQUtyWTRjQ' },
            refreshToken: { token: 'eyJjdHkiOiJKV1QiLCJlbm' }
        })
    );
    it('Handles CREATE_RESET_PRODUCT', async () => {
        const expectedAction = [
            {
                type: productsActionType.CREATE_RESET_PRODUCT
            }
        ];

        await store.dispatch(resetProductAction());
        expect(store.getActions()).toEqual(expectedAction);
    });

    it('Handles FETCH_CATEGORY_SUCCESS', async () => {
        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                data: mockResult
            })
        );

        const expectedAction = [
            { type: productsActionType.FETCH_CATEGORY_SUCCESS, payload: mockResult.results }
        ];
        await store.dispatch(getCategory(mockResult));
        expect(store.getActions()).toEqual(expectedAction);
    });

    it('Handles CREATE_PRODUCTS_SUCCESS', async () => {
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                status: 201,
                data: mockResponse
            })
        );

        const expectedAction = [
            { type: productsActionType.CREATE_PRODUCTS_SUCCESS, payload: mockResponse }
        ];
        await store.dispatch(createNewProduct(mockData));
        expect(store.getActions()).toEqual(expectedAction);
    });
});

describe('Fetch products test', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            product: null,
            productList: [],
            loading: true,
            error: {},
            categories: null,
            result: ''
        });
    });

    it('fetch success', async () => {
        const payload = [
            {
                id: 2,
                name: 'Head Office Basic Loan',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua.',
                productCategory: 1,
                productRequirements: [],
                createdTimestamp: '2021-02-08T09:27:30.684772Z',
                lastModifiedTimestamp: '2021-02-08T09:27:30.684780Z'
            },
            {
                id: 3,
                name: 'Rural Bank Basic Loan',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua.',
                productCategory: 1,
                productRequirements: [],
                createdTimestamp: '2021-02-08T09:27:30.684772Z',
                lastModifiedTimestamp: '2021-02-08T09:27:30.684780Z'
            }
        ];
        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                data: payload
            })
        );

        const expectedAction = [{ type: productsActionType.FETCH_PRODUCTS_SUCCESS, payload }];

        await store.dispatch(fetchProducts());
        expect(store.getActions()).toEqual(expectedAction);
    });

    it('fetch failed', async () => {
        const mockErrorResponse = {
            response: {
                status: 403,
                errorMessage: 'Forbidden'
            }
        };
        mockAxios.get.mockImplementationOnce(() =>
            Promise.reject({
                response: {
                    status: 403,
                    errorMessage: 'Forbidden'
                }
            })
        );

        const expectedAction = [
            { type: productsActionType.FETCH_PRODUCTS_FAIL, payload: mockErrorResponse }
        ];

        await store.dispatch(fetchProducts());
        expect(store.getActions()).toEqual(expectedAction);
    });
});

describe('update product state', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            product: null,
            productList: [],
            loading: true,
            error: {},
            categories: null,
            result: ''
        });
    });

    it('should update state', async () => {
        const prop = 'username';
        const value = 'sample@email.com';

        const mockResponse = {
            prop,
            value
        };

        const expectedActions = [
            { type: productsActionType.UPDATE_PRODUCT_STATE, payload: mockResponse }
        ];

        await store.dispatch(updateProductState(prop, value));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
