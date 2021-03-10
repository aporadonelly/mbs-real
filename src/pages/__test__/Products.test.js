import 'jsdom-global/register'; // Without need of adding code in beforeEach and afterEach.
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // enzyme adapter for the use of 'mount'
import MutationObserver from 'mutation-observer';
import configureMockStore from 'redux-mock-store';
import { Tab } from '@material-ui/core';
import toJson from 'enzyme-to-json';
import { act } from '@testing-library/react';
import Product from '../ProductPage';

Enzyme.configure({ adapter: new Adapter() });

global.MutationObserver = MutationObserver;
global.DOMParser = window.DOMParser;

const mockStore = configureMockStore([thunk]);
let store;

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

beforeEach(() => {
    store = mockStore({
        products: {
            result: '',
            categories: [
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
            productList: []
        }
    });

    mockHistoryPush.mockClear();
});

const findByTest = (wrapper, tag, val) => wrapper.find(`${tag}[data-testid="${val}"]`);

describe('Renders Product List Page', () => {
    it('displays page', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Product />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(Tab).length).toEqual(3);
    });

    it('Goes to create products page', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Product />
            </Provider>
        );

        const createButton = findByTest(wrapper, 'button', 'page-create-item-button');

        act(() => {
            createButton.simulate('click');
        });

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(mockHistoryPush.mock.calls[0][0]).toBe('/products/create');
    });

    it('updates search query', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Product />
            </Provider>
        );

        const searchBox = findByTest(wrapper, 'div', 'search-query');
        const searchButton = findByTest(
            wrapper,
            'WithStyles(ForwardRef(IconButton))',
            'search-icon'
        );

        act(() => {
            searchBox.simulate('change', { target: { value: 'SEARCH PARAM' } });
            searchBox.simulate('keydown', { key: 'Enter' });
            searchButton.simulate('click');
        });

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(searchBox.exists()).toBeTruthy();
        expect(searchButton.exists()).toBeTruthy();
    });

    it('changes tab', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Product />
            </Provider>
        );

        const timeDepositTab = wrapper.find(`WithStyles(ForwardRef(Tab))[label="Time Deposit"]`);

        act(() => {
            timeDepositTab.simulate('click');
        });

        expect(timeDepositTab.exists()).toBeTruthy();
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
