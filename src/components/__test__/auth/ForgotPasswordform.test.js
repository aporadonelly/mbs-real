import 'jsdom-global/register'; // Without need of adding code in beforeEach and afterEach.
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // enzyme adapter for the use of 'mount'
import configureMockStore from 'redux-mock-store';
import ForgotPasswordForm from '../../auth/ForgotPasswordForm';
import reducers from '../../../reducers';

Enzyme.configure({ adapter: new Adapter() });

const onForgotPassword = jest.fn();
const onUpdateField = jest.fn();
const onNavigateBack = jest.fn();

test('display Forgot Password form Component', () => {
    const store = createStore(reducers, applyMiddleware(thunk));
    const wrapper = mount(
        <Provider store={store}>
            <ForgotPasswordForm
                onUpdateField={onUpdateField}
                onForgotPassword={onForgotPassword}
                onNavigateBack={onNavigateBack}
            />
        </Provider>
    );
    wrapper.find('[data-testid="forgot-password-button"]').hostNodes().simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
});

test('Forgot Password form Component error view', () => {
    const mockStore = configureMockStore({ thunk });
    const errorStore = mockStore({
        auth: {
            forgotPasswordError: {
                code: 'LimitExceededException'
            }
        }
    });

    const wrapper = mount(
        <Provider store={errorStore}>
            <ForgotPasswordForm
                onUpdateField={onUpdateField}
                onForgotPassword={onForgotPassword}
                onNavigateBack={onNavigateBack}
            />
        </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
});
