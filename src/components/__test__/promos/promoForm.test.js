import 'jsdom-global/register'; // Without need of adding code in beforeEach and afterEach.
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // enzyme adapter for the use of 'mount'
import { BrowserRouter } from 'react-router-dom';
import { act } from '@testing-library/react';
import MutationObserver from 'mutation-observer';
import toJson from 'enzyme-to-json';
import reducers from '../../../reducers';
import PromoForm from '../../promos/PromoForm';
import WysiwygField from '../../WysiwygField';

Enzyme.configure({ adapter: new Adapter() });

global.MutationObserver = MutationObserver;
global.DOMParser = window.DOMParser;

describe('testing for creation of promos', () => {
    const store = createStore(reducers, applyMiddleware(thunk));
    const setup = () =>
        mount(
            <Provider store={store}>
                <BrowserRouter>
                    <PromoForm />
                </BrowserRouter>
            </Provider>
        );
    const findByTestID = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);
    const findByTestName = (wrapper, val) => wrapper.find(`input[name="${val}"]`);

    test('display Create promo Component', async () => {
        const wrapper = setup();
        const fullApp = findByTestID(wrapper, 'createPromosComponent').hostNodes();
        expect(fullApp.length).toBe(1);
    });

    test('change input promo name', async () => {
        const wrapper = setup();
        const promoName = findByTestName(wrapper, 'name').hostNodes();

        act(() => {
            promoName.simulate('change', { target: { value: 'Promo' } });
            promoName.simulate('blur', { target: { value: 'Promo' } });
        });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('quill description', () => {
        const wrapper = setup();
        act(() => {
            wrapper.find(WysiwygField).simulate('change');
        });
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('submit test form', () => {
        const wrapper = setup();
        const submitForm = findByTestID(wrapper, 'submitForm').hostNodes();

        act(() => {
            submitForm.simulate('click');
        });
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
