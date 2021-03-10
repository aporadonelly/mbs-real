import 'jsdom-global/register'; // Without need of adding code in beforeEach and afterEach.
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // enzyme adapter for the use of 'mount'
import { BrowserRouter } from 'react-router-dom';
import reducers from '../../../reducers';
import Promos from '../../promo/Promos';

Enzyme.configure({ adapter: new Adapter() });

test('display promos Component', () => {
    const store = createStore(reducers, applyMiddleware(thunk));
    const wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <Promos />
            </BrowserRouter>
        </Provider>
    );
    wrapper.find('[data-testid="promosComponent"]').hostNodes();
    expect(toJson(wrapper)).toMatchSnapshot();
});
