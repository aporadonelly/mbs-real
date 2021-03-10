import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import { act } from '@testing-library/react';
import Snackbar from '../Snackbar';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

let store;
beforeEach(() => {
    store = mockStore({
        branch: {
            isCreateSuccess: true
        }
    });
    store.dispatch = jest.fn();
});

const findByTest = (wrapper, tag, val) => wrapper.find(`${tag}[data-testid="${val}"]`);

describe('renders Snackbar', () => {
    it('Open snackbar', () => {
        const resetTriggerFunc = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <Snackbar
                    showSnackbar
                    message="Successfully created"
                    resetTrigger={resetTriggerFunc}
                />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('[data-testid="snackbar-message"]').text()).toEqual(
            'Successfully created'
        );
        const closeBtn = findByTest(wrapper, 'button', 'close-btn');
        act(() => {
            closeBtn.simulate('click');
        });
        expect(resetTriggerFunc.mock.calls.length).toBe(1);
    });
});
