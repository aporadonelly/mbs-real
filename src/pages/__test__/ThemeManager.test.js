import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import ThemeManager from '../ThemeManager';
import { ReactComponent as LoginPagePreview } from '../assets/images/page_1.svg';
import { ReactComponent as DashBoardPreview } from '../assets/images/page_2.svg';
import { ReactComponent as DiscoverPreview } from '../assets/images/page_3.svg';
import { Snackbar, PageHeader } from '../../components';

configure({ adapter: new Adapter() });
jest.unmock('react-redux');

const mockStore = configureMockStore({ thunk });

const findByTest = (wrapper, tag, val) => wrapper.find(`${tag}[data-testid="${val}"]`);

describe('renders Theme Manager Page', () => {
    it('initial view', () => {
        const store = mockStore({
            theme: {
                colorList: [
                    {
                        id: 1,
                        name: 'Default',
                        hexColor: '#00B0F0'
                    },
                    {
                        id: 2,
                        name: 'Blue',
                        hexColor: '#2E9BEA'
                    },
                    {
                        id: 3,
                        name: 'Gold',
                        hexColor: '#D4B500',
                        isDefault: false
                    },
                    {
                        id: 4,
                        name: 'Red',
                        hexColor: '#A42A25'
                    }
                ],
                primaryColor: '#00B0F0',
                theme: {},
                result: '',
                error: {},
                message: '',
                isUpdateSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <ThemeManager />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(LoginPagePreview).exists()).toBeTruthy();
        expect(wrapper.find(DashBoardPreview).exists()).toBeTruthy();
        expect(wrapper.find(DiscoverPreview).exists()).toBeTruthy();
        expect(wrapper.find(PageHeader).exists()).toBeTruthy();
    });
    //
    it('trigger change color', () => {
        const store = mockStore({
            theme: {
                colorList: [
                    {
                        id: 1,
                        name: 'Default',
                        hexColor: '#00B0F0'
                    },
                    {
                        id: 2,
                        name: 'Blue',
                        hexColor: '#2E9BEA'
                    },
                    {
                        id: 3,
                        name: 'Gold',
                        hexColor: '#D4B500',
                        isDefault: false
                    },
                    {
                        id: 4,
                        name: 'Red',
                        hexColor: '#A42A25'
                    }
                ],
                primaryColor: '#00B0F0',
                theme: {},
                result: '',
                error: {},
                message: '',
                isUpdateSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <ThemeManager />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader).exists()).toBeTruthy();
        const colorBtn = findByTest(wrapper, 'button', 'color-button-Red');
        act(() => {
            colorBtn.simulate('click');
        });
    });

    it('renders Snackbar Component', () => {
        const store = mockStore({
            theme: {
                colorList: [
                    {
                        id: 1,
                        name: 'Default',
                        hexColor: '#00B0F0'
                    },
                    {
                        id: 2,
                        name: 'Blue',
                        hexColor: '#2E9BEA'
                    },
                    {
                        id: 3,
                        name: 'Gold',
                        hexColor: '#D4B500',
                        isDefault: false
                    },
                    {
                        id: 4,
                        name: 'Red',
                        hexColor: '#A42A25'
                    }
                ],
                primaryColor: '#00B0F0',
                theme: {},
                result: '',
                error: {},
                message: '',
                isUpdateSuccess: true
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <ThemeManager />
            </Provider>
        );

        const closeBtn = findByTest(wrapper, 'button', 'close-btn');
        act(() => {
            closeBtn.simulate('click');
        });

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader).exists()).toMatchSnapshot();
        expect(wrapper.find(PageHeader).exists()).toBeTruthy();
        expect(wrapper.find(Snackbar).exists()).toMatchSnapshot();
        expect(wrapper.find(Snackbar).exists()).toBeTruthy();
    });
});
