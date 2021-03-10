import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import ATMs from '../../atms/ATMs';
import { Snackbar, PageHeader, ATMTable, DeleteModal } from '../../../components';
import { results } from '../../../reducers/constants';

configure({ adapter: new Adapter() });
jest.unmock('react-redux');

const mockStore = configureMockStore({ thunk });

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

const findByTest = (wrapper, tag, val) => wrapper.find(`${tag}[data-testid="${val}"]`);

describe('renders ATMs Page', () => {
    it('initial view', () => {
        const store = mockStore({
            atm: {
                atmList: [],
                totalATMItems: 0,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <ATMs />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader).exists()).toBeTruthy();
        expect(wrapper.find('[data-testid="empty-item-placeholder"]').exists()).toBeTruthy();
    });

    it('table view', () => {
        const store = mockStore({
            atm: {
                atmList: [
                    {
                        id: 1,
                        atmName: 'atm1',
                        locationStreet: 'Auir',
                        locationProvinceOrState: {
                            id: 1,
                            provinceName: 'Abra',
                            country: 1
                        },
                        locationCity: {
                            id: 1,
                            cityName: 'Caloocan City',
                            province: 82
                        },
                        locationPostalOrZipCode: 1470,
                        latitude: '11.0000000000',
                        longitude: '11.0000000000',
                        landmark: 'Citadel of Adun'
                    },
                    {
                        id: 2,
                        atmName: 'atm2',
                        locationStreet: 'Earth',
                        locationProvinceOrState: {
                            id: 1,
                            provinceName: 'Abra',
                            country: 1
                        },
                        locationCity: {
                            id: 1,
                            cityName: 'Caloocan City',
                            province: 82
                        },
                        locationPostalOrZipCode: 1550,
                        latitude: '12.0000000000',
                        longitude: '12.0000000000',
                        landmark: 'Engineering Bay'
                    }
                ],
                totalATMItems: 10,
                result: results.SUCCESS,
                message: '',
                error: {},
                isCreateSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <ATMs />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader).exists()).toBeTruthy();
        expect(wrapper.find(ATMTable).exists()).toBeTruthy();
    });

    it('trigger create atm', () => {
        const store = mockStore({
            atm: {
                atmList: [],
                totalATMItems: 0,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <ATMs />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader).exists()).toMatchSnapshot();
        expect(wrapper.find(PageHeader).exists()).toBeTruthy();

        const createBtn = findByTest(wrapper, 'button', 'page-create-item-button');
        createBtn.simulate('click');
        expect(mockHistoryPush.mock.calls.length).toBe(1);
        expect(mockHistoryPush.mock.calls[0][0]).toBe('/atms/create');
    });

    it('renders Snackbar Component', () => {
        const store = mockStore({
            atm: {
                atmList: [],
                totalATMItems: 0,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: true
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <ATMs />
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

    it('renders Snackbar Component for delete', () => {
        const store = mockStore({
            atm: {
                atmList: [],
                totalATMItems: 0,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: false,
                isDeleteSuccess: true
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <ATMs />
            </Provider>
        );

        const closeBtn = findByTest(wrapper, 'button', 'close-btn');
        act(() => {
            closeBtn.simulate('click');
        });

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toBeTruthy();
        expect(wrapper.find(Snackbar)).toMatchSnapshot();
        expect(wrapper.find(Snackbar)).toBeTruthy();
        expect(wrapper.find(ATMTable)).toBeTruthy();
    });

    it('trigger delete atm', () => {
        const store = mockStore({
            atm: {
                atmList: [
                    {
                        id: 1,
                        atmName: 'atm1',
                        locationStreet: 'Auir',
                        locationProvinceOrState: {
                            id: 1,
                            provinceName: 'Abra',
                            country: 1
                        },
                        locationCity: {
                            id: 1,
                            cityName: 'Caloocan City',
                            province: 82
                        },
                        locationPostalOrZipCode: 0,
                        latitude: '11.0000000000',
                        longitude: '11.0000000000',
                        landmark: 'Citadel of Adun'
                    },
                    {
                        id: 2,
                        atmName: 'atm2',
                        locationStreet: 'Mar Sara',
                        locationProvinceOrState: {
                            id: 1,
                            provinceName: 'Abra',
                            country: 1
                        },
                        locationCity: {
                            id: 1,
                            cityName: 'Caloocan City',
                            province: 82
                        },
                        locationPostalOrZipCode: 0,
                        latitude: '12.0000000000',
                        longitude: '12.0000000000',
                        landmark: 'Engineering Bay'
                    }
                ],
                totalATMItems: 10,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: false,
                isDeleteSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <ATMs />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toBeTruthy();
        expect(wrapper.find(ATMTable)).toBeTruthy();

        const itemRow = findByTest(wrapper, 'tr', 'atm-item-1');
        itemRow.simulate('mouseOver');

        const itemMore = findByTest(wrapper, 'svg', 'atm-item-more-1');
        itemMore.simulate('click');

        expect(wrapper.find(DeleteModal)).toBeTruthy();
    });
});
