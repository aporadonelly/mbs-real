import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import { act } from '@testing-library/react';
import ProductTable from '../../products/ProductTable';

const productList = [
    {
        id: 1,
        name: 'Pangkabuhayan Loan',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua.',
        productCategory: 1,
        productRequirements: [
            {
                name: 'Requirements Eligibility Criteria',
                description:
                    '21 – 65 years old <br> Filipino or Foreign-based Filipino <br> Employed or Self-Employed'
            }
        ],
        createdTimestamp: '2021-02-08T09:27:30.684772Z',
        lastModifiedTimestamp: '2021-02-08T09:27:30.684780Z'
    },
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
    },
    {
        id: 4,
        name: 'Salary Loan',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua.',
        productCategory: 1,
        productRequirements: [],
        createdTimestamp: '2021-02-08T09:27:30.684772Z',
        lastModifiedTimestamp: '2021-02-08T09:27:30.684780Z'
    },
    {
        id: 5,
        name: 'Car Loan',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua.',
        productCategory: 1,
        productRequirements: [],
        createdTimestamp: '2021-02-08T09:27:30.684772Z',
        lastModifiedTimestamp: '2021-02-08T09:27:30.684780Z'
    },
    {
        id: 6,
        name: 'Home Loan',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua.',
        productCategory: 1,
        productRequirements: [],
        createdTimestamp: '2021-02-08T09:27:30.684772Z',
        lastModifiedTimestamp: '2021-02-08T09:27:30.684780Z'
    },
    {
        id: 7,
        name: 'Short-Term Loan',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua.',
        productCategory: 1,
        productRequirements: [],
        createdTimestamp: '2021-02-08T09:27:30.684772Z',
        lastModifiedTimestamp: '2021-02-08T09:27:30.684780Z'
    },
    {
        id: 491,
        name: 'asdasd',
        description: 'asdasd',
        productCategory: 1,
        productRequirements: [
            {
                name: 'asdasd',
                description: '<p>asdas</p>'
            }
        ],
        createdTimestamp: '2021-03-08T02:41:12.469703Z',
        lastModifiedTimestamp: '2021-03-08T02:41:12.469712Z'
    },
    {
        id: 492,
        name: 'Pangkabuhayan Loan',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua.',
        productCategory: 1,
        productRequirements: [
            {
                name: 'Requirements Eligibility Criteria',
                description:
                    '21 – 65 years old <br> Filipino or Foreign-based Filipino <br> Employed or Self-Employed'
            }
        ],
        createdTimestamp: '2021-03-08T22:14:00.346559Z',
        lastModifiedTimestamp: '2021-03-08T22:14:00.346570Z'
    },
    {
        id: 493,
        name: 'Pangkabuhayan Loan',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua.',
        productCategory: 1,
        productRequirements: [
            {
                name: 'Requirements Eligibility Criteria',
                description:
                    '21 – 65 years old <br> Filipino or Foreign-based Filipino <br> Employed or Self-Employed'
            }
        ],
        createdTimestamp: '2021-03-08T22:14:01.630299Z',
        lastModifiedTimestamp: '2021-03-08T22:14:01.630311Z'
    }
];

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

let store;
beforeEach(() => {
    mockHistoryPush.mockClear();
});

const findByTest = (wrapper, tag, val) => wrapper.find(`${tag}[data-testid="${val}"]`);

describe('renders product table', () => {
    it('empty list result', () => {
        store = mockStore({
            products: {
                productList: [],
                totalProductCount: 0
            }
        });
        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <ProductTable categoryId={1} searchQuery={''} />
            </Provider>
        );

        const emptyMessageGrid = findByTest(wrapper, 'div', 'empty-products-placeholder');

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(emptyMessageGrid.exists()).toBeTruthy();
        expect(emptyMessageGrid.text()).toContain('No Products available at this time.');
    });

    it('empty search result', () => {
        store = mockStore({
            products: {
                productList: [],
                totalProductCount: 0
            }
        });
        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <ProductTable categoryId={1} searchQuery={'NOT EMPTY'} />
            </Provider>
        );

        const emptyMessageGrid = findByTest(wrapper, 'div', 'empty-products-placeholder');

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(emptyMessageGrid.exists()).toBeTruthy();
        expect(emptyMessageGrid.text()).toContain(
            `Your search 'NOT EMPTY' did not return any results.`
        );
    });

    it('table has results', () => {
        store = mockStore({
            products: {
                productList,
                totalProductCount: 45
            }
        });
        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <ProductTable categoryId={1} searchQuery={''} />
            </Provider>
        );

        const emptyMessageGrid = findByTest(wrapper, 'div', 'empty-products-placeholder');

        const menuPopupIcon = findByTest(
            wrapper,
            'ForwardRef(MoreHorizIcon)',
            'product-item-more-1'
        );

        act(() => {
            menuPopupIcon.simulate('click');
        });

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(emptyMessageGrid.exists()).toBeFalsy();

        // +1 since the header is also a table row
        expect(wrapper.find('ForwardRef(TableRow)').length).toEqual(productList.length + 1);

        expect(wrapper.text()).toContain('Showing 1 to 10 of 45 entries');
    });

    it('handles pagination', () => {
        store = mockStore({
            products: {
                productList,
                totalProductCount: 45
            }
        });
        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <ProductTable categoryId={1} searchQuery={''} />
            </Provider>
        );

        const pageTwoButton = wrapper.find(
            `WithStyles(ForwardRef(PaginationItem))[aria-label="Go to page 2"]`
        );

        act(() => {
            pageTwoButton.simulate('click');
        });

        expect(pageTwoButton.exists()).toBeTruthy();
    });
});
