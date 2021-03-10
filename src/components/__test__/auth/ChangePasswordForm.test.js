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

import ChangePasswordForm from '../../auth/ChangePasswordForm';

Enzyme.configure({ adapter: new Adapter() });
const mockUseSelector = jest.spyOn(reactRedux, 'useSelector');
const mockHistoryGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        goBack: mockHistoryGoBack
    })
}));

let store;
const mockStore = configureMockStore([thunk]);

beforeEach(() => {
    mockUseSelector.mockClear();
    mockHistoryGoBack.mockClear();

    store = mockStore({
        auth: {
            changePasswordError: {
                code: '',
                message: ''
            }
        }
    });
    store.dispatch = jest.fn();
});

const findByTest = (wrapper, tag, val) => wrapper.find(`${tag}[data-testid="${val}"]`);

describe('Change Password Form', () => {
    it('displays change password component', () => {
        const mockOnSubmit = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <ChangePasswordForm onSubmit={mockOnSubmit} />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('type on fields', () => {
        const mockOnSubmit = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <ChangePasswordForm onSubmit={mockOnSubmit} />
            </Provider>
        );

        const oldPasswordField = wrapper.find(`input[name="oldPassword"]`);
        const newPasswordField = wrapper.find(`input[name="newPassword"]`);
        const newPasswordCopyField = wrapper.find(`input[name="newPasswordCopy"]`);

        act(() => {
            oldPasswordField.simulate('change', { target: { value: 'OLD_PASSWORD' } });
            newPasswordField.simulate('change', { target: { value: 'NEW_PASSWORD' } });
            newPasswordCopyField.simulate('change', { target: { value: 'NEW_PASSWORD' } });

            const submitButton = findByTest(wrapper, 'button', 'change-password-submit-button');

            submitButton.simulate('submit');
        });

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('toggle old password', () => {
        const mockOnSubmit = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <ChangePasswordForm onSubmit={mockOnSubmit} />
            </Provider>
        );

        const showOldIconButton = findByTest(
            wrapper,
            'WithStyles(ForwardRef(IconButton))',
            'show-old-password'
        );

        showOldIconButton.simulate('click');

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('show old password mouse down', () => {
        const mockOnSubmit = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <ChangePasswordForm onSubmit={mockOnSubmit} />
            </Provider>
        );

        const showOldIconButton = findByTest(
            wrapper,
            'WithStyles(ForwardRef(IconButton))',
            'show-old-password'
        );

        showOldIconButton.simulate('mouseDown');

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('goes back when back button is pressed', () => {
        const mockOnSubmit = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <ChangePasswordForm onSubmit={mockOnSubmit} />
            </Provider>
        );

        const backButton = findByTest(wrapper, 'button', 'backButton');

        act(() => {
            backButton.simulate('click');
        });

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(mockHistoryGoBack.mock.calls.length).toBe(1);
    });

    it('goes back when cancel button is pressed', () => {
        const mockOnSubmit = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <ChangePasswordForm onSubmit={mockOnSubmit} />
            </Provider>
        );

        const cancelButton = findByTest(wrapper, 'button', 'change-password-cancel-button');

        act(() => {
            cancelButton.simulate('click');
        });

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(mockHistoryGoBack.mock.calls.length).toBe(1);
    });
});
