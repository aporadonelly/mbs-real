import 'jsdom-global/register'; // Without need of adding code in beforeEach and afterEach.
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // enzyme adapter for the use of 'mount'
import { BrowserRouter } from 'react-router-dom';
import MutationObserver from 'mutation-observer';
import toJson from 'enzyme-to-json';
import reducers from '../../../reducers';
import EditPromo from '../../promo/EditPromo';

Enzyme.configure({ adapter: new Adapter() });

global.MutationObserver = MutationObserver;
global.DOMParser = window.DOMParser;

describe('testing for creation of promos', () => {
    const store = createStore(reducers, applyMiddleware(thunk));
    const setup = () =>
        mount(
            <Provider store={store}>
                <BrowserRouter>
                    <EditPromo />
                </BrowserRouter>
            </Provider>
        );
    const findByTestID = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);

    test('display Edit promo Component', async () => {
        const wrapper = setup();
        const fullApp = findByTestID(wrapper, 'EditPromosComponent').hostNodes();
        expect(fullApp.length).toBe(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
