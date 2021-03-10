import 'jsdom-global/register'; // Without need of adding code in beforeEach and afterEach.
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // enzyme adapter for the use of 'mount'
import { BrowserRouter } from 'react-router-dom';
import MutationObserver from 'mutation-observer';
import reducers from '../../../reducers';
import CreateProduct from '../../products/CreateProduct';

Enzyme.configure({ adapter: new Adapter() });

global.MutationObserver = MutationObserver;
global.DOMParser = window.DOMParser;

test('display promos Component', async () => {
    const store = createStore(reducers, applyMiddleware(thunk));
    const wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <CreateProduct />
            </BrowserRouter>
        </Provider>
    );
    wrapper.find('[data-testid="reqInput"]').hostNodes();
});
