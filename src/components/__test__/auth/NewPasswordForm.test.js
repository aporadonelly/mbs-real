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

import { ValidatorForm } from 'react-material-ui-form-validator';
import NewPasswordForm from '../../auth/NewPasswordForm';

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

const mockRef = jest.fn();
const mockOnPasswordChange = jest.fn();
const mockOnSubmit = jest.fn();

beforeEach(() => {
    mockUseSelector.mockClear();
    mockHistoryGoBack.mockClear();
    mockRef.mockClear();
    mockOnPasswordChange.mockClear();
    mockOnSubmit.mockClear();

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
    it('displays new password component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ValidatorForm onSubmit={mockOnSubmit}>
                    <NewPasswordForm ref={mockRef} onPasswordChange={mockOnPasswordChange} />
                </ValidatorForm>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('type on fields', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ValidatorForm onSubmit={mockOnSubmit}>
                    <NewPasswordForm ref={mockRef} onPasswordChange={mockOnPasswordChange} />
                </ValidatorForm>
            </Provider>
        );

        const newPasswordField = wrapper.find(`input[name="newPassword"]`);
        const newPasswordCopyField = wrapper.find(`input[name="newPasswordCopy"]`);

        act(() => {
            newPasswordField.simulate('change', { target: { value: 'P@ssw0rd1' } });
            newPasswordCopyField.simulate('change', { target: { value: 'P@ssw0rd1' } });
        });

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('toggle show password', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ValidatorForm onSubmit={mockOnSubmit}>
                    <NewPasswordForm ref={mockRef} onPasswordChange={mockOnPasswordChange} />
                </ValidatorForm>
            </Provider>
        );

        const showNewIconButton = findByTest(
            wrapper,
            'WithStyles(ForwardRef(IconButton))',
            'show-new-password'
        );

        showNewIconButton.simulate('click');

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('show old password mouse down', () => {
        const testRef = React.createRef();
        const wrapper = mount(
            <Provider store={store}>
                <ValidatorForm onSubmit={mockOnSubmit}>
                    <NewPasswordForm ref={testRef} onPasswordChange={mockOnPasswordChange} />
                </ValidatorForm>
            </Provider>
        );

        const showOldIconButton = findByTest(
            wrapper,
            'WithStyles(ForwardRef(IconButton))',
            'show-new-password'
        );

        showOldIconButton.simulate('mouseDown');

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
