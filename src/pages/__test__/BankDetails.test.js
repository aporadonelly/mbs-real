import 'jsdom-global/register';
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import * as reactRedux from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MutationObserver from 'mutation-observer';
import { BankDetailForm, SuccessMessage } from '../../components';
import BankDetails from '../BankDetails';

global.MutationObserver = MutationObserver;
global.DOMParser = window.DOMParser;

configure({ adapter: new Adapter() });

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

beforeEach(() => {
    useSelectorMock.mockClear();
});

const mockStore = configureMockStore({ thunk });

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useRouteMatch: jest.fn().mockReturnValue({
        location: '/'
    }),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

beforeEach(() => {
    mockHistoryPush.mockClear();
});

describe('renders Bank details Page', () => {
    it('Shows bank details form', () => {
        const store = mockStore({
            bankDetails: {
                updateSuccess: false
            },
            address: {
                countryList: []
            }
        });
        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <BankDetails />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(BankDetailForm).exists()).toBeTruthy();
        expect(wrapper.find(SuccessMessage).exists()).toBeFalsy();
    });
});
