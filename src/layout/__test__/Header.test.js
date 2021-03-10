import 'jsdom-global/register';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { act } from '@testing-library/react';
import { userStatus } from '../../reducers/constants';

import Header from '../Header';

Enzyme.configure({ adapter: new Adapter() });
const mockUseSelector = jest.spyOn(reactRedux, 'useSelector');
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

let store;
const mockStore = configureMockStore([thunk]);

beforeEach(() => {
    mockUseSelector.mockClear();
    mockHistoryPush.mockClear();

    store = mockStore({
        auth: {
            username: '',
            password: '',
            status: userStatus.LOGGED_IN,
            user: {
                roleCode: 'admin',
                role: 'Admin',
                firstName: 'Sample',
                lastName: 'User'
            }
        }
    });
    store.dispatch = jest.fn();
});

const findByTest = (wrapper, tag, val) => wrapper.find(`${tag}[data-testid="${val}"]`);

describe('Header', () => {
    it('displays header component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('div#userInitials').text()).toEqual('SU');
        expect(wrapper.find('#userFullName').text()).toEqual('Sample User');
        expect(wrapper.find('#userRole').text()).toEqual('Admin');

        // Only fetchRole is called
        expect(store.dispatch.mock.calls.length).toBe(1);
    });

    it('role code is null', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();

        // Only fetchRole is called
        expect(store.dispatch.mock.calls.length).toBe(1);
    });

    it('handles menu popup close', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        // click menu
        const menuBtn = findByTest(wrapper, 'button', 'menuBtn');
        menuBtn.simulate('click');

        expect(wrapper.find('#menu-appbar').exists()).toBe(true);

        // trigger modal on close
        act(() => {
            wrapper.find('ForwardRef(Modal)#menu-appbar').prop('onClose')();
        });

        expect(toJson(wrapper)).toMatchSnapshot();

        // Only fetchRole is called
        expect(store.dispatch.mock.calls.length).toBe(1);
    });

    it('handles change password', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        // click menu
        const menuBtn = findByTest(wrapper, 'button', 'menuBtn');
        menuBtn.simulate('click');

        // click logout link
        act(() => {
            const changePasswordMenuLink = findByTest(wrapper, 'li', 'changePassword');
            changePasswordMenuLink.simulate('click');
        });

        expect(toJson(wrapper)).toMatchSnapshot();

        // assert browser path moved to index
        expect(mockHistoryPush.mock.calls.length).toBe(1);
        expect(mockHistoryPush.mock.calls[0][0]).toBe('/change-password');
    });

    it('handles account close', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        // click menu
        const menuBtn = findByTest(wrapper, 'button', 'menuBtn');
        menuBtn.simulate('click');

        // click logout link
        act(() => {
            const accountSettingsMenuLink = findByTest(wrapper, 'li', 'accountSettings');
            accountSettingsMenuLink.simulate('click');
        });

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(store.dispatch.mock.calls.length).toBe(1);

        // assert browser path moved to index
        expect(mockHistoryPush.mock.calls.length).toBe(1);
        expect(mockHistoryPush.mock.calls[0][0]).toBe('/');
    });

    it('handles logout', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        // click menu
        const menuBtn = findByTest(wrapper, 'button', 'menuBtn');
        menuBtn.simulate('click');

        // click logout link
        const logoutMenuLink = findByTest(wrapper, 'li', 'logoutMenu');
        logoutMenuLink.simulate('click');

        // click logout button in modal confirmation
        const modalLogoutButton = findByTest(wrapper, 'button', 'logoutBtn');
        modalLogoutButton.simulate('click');

        expect(toJson(wrapper)).toMatchSnapshot();

        // Called functions:
        // 1. fetchRole
        // 2. logout
        // how to assert logout was called?
        expect(store.dispatch.mock.calls.length).toBe(2);

        // assert browser path moved to index
        expect(mockHistoryPush.mock.calls.length).toBe(1);
        expect(mockHistoryPush.mock.calls[0][0]).toBe('/');
    });

    it('handle logout modal closed', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        // click menu
        const menuBtn = findByTest(wrapper, 'button', 'menuBtn');
        menuBtn.simulate('click');

        // click logout link
        const logoutMenuLink = findByTest(wrapper, 'li', 'logoutMenu');
        logoutMenuLink.simulate('click');

        // click logout button in modal confirmation
        const dialogBoxCancelButton = findByTest(wrapper, 'button', 'dialogBoxCancel');
        dialogBoxCancelButton.simulate('click');

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(store.dispatch.mock.calls.length).toBe(1);

        // assert browser path moved to index
        expect(mockHistoryPush.mock.calls.length).toBe(0);
    });
});
