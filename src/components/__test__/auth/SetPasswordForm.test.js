import 'jsdom-global/register';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import configureMockStore from 'redux-mock-store';
import SetPasswordForm from '../../auth/SetPasswordForm';
import reducers from '../../../reducers';

Enzyme.configure({ adapter: new Adapter() });

const store = createStore(reducers, applyMiddleware(thunk));

describe('renders Set Password Form', () => {
    const onSetPassword = jest.fn();
    const onUpdateField = jest.fn();
    it('initial view', () => {
        const wrapper = mount(
            <Provider store={store}>
                <SetPasswordForm onUpdateField={onUpdateField} onSetPassword={onSetPassword} />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Password Mismatch error view', () => {
        const mockStore = configureMockStore({ thunk });
        const errorStore = mockStore({
            auth: {
                username: 'sample@email.com',
                newPassword: 'Asdfgh1!',
                newPasswordCopy: 'Sample1!@',
                isSetPasswordFormSubmitted: true,
                code: '123456',
                passwordError: {
                    code: 'PasswordMismatchError'
                },
                codeError: {
                    code: ''
                }
            }
        });

        const wrapper = mount(
            <Provider store={errorStore}>
                <SetPasswordForm onUpdateField={onUpdateField} onSetPassword={onSetPassword} />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('view of set new password', () => {
        const wrapper = mount(
            <Provider store={store}>
                <SetPasswordForm
                    onUpdateField={onUpdateField}
                    onSetPassword={onSetPassword}
                    hasNoCode
                />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
