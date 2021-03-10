import 'jsdom-global/register'; // Without need of adding code in beforeEach and afterEach.
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // enzyme adapter for the use of 'mount'
import SuccessMessage from '../../auth/SuccessMessage';
import reducers from '../../../reducers';

Enzyme.configure({ adapter: new Adapter() });

test('display Success Message Component', () => {
    const store = createStore(reducers, applyMiddleware(thunk));
    const wrapper = mount(
        <Provider store={store}>
            <SuccessMessage renderLogo />
        </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
});
