import 'jsdom-global/register';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import configureMockStore from 'redux-mock-store';
import LoginForm from '../../auth/LoginForm';
import reducers from '../../../reducers';

Enzyme.configure({ adapter: new Adapter() });

const store = createStore(reducers, applyMiddleware(thunk));

describe('renders Login Form', () => {
    const onLoginClick = jest.fn();
    const onUpdateField = jest.fn();
    it('initial view', () => {
        const wrapper = mount(
            <Provider store={store}>
                <LoginForm onLogin={onLoginClick} onUpdateField={onUpdateField} />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('error view', () => {
        const mockStore = configureMockStore({ thunk });
        const errorStore = mockStore({
            auth: {
                username: 'sample@email.com',
                password: 'sample',
                isAuthInvalid: true,
                isFormSubmitted: true,
                error: {
                    code: 'NotAuthorizedException'
                }
            }
        });

        const wrapper = mount(
            <Provider store={errorStore}>
                <LoginForm onLogin={onLoginClick} onUpdateField={onUpdateField} />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
