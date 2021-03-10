import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import ATMTable from '../../atms/ATMTable';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

let store;
beforeEach(() => {
    mockHistoryPush.mockClear();
    store = mockStore({
        atm: {
            atmList: [
                {
                    id: 1,
                    atmName: 'atm',
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
                    locationPostalOrZipCode: 1550,
                    latitude: '12.0000000000',
                    longitude: '12.0000000000',
                    landmark: 'Engineering Bay'
                }
            ],
            result: '',
            message: '',
            error: {},
            isCreateSuccess: false,
            totalATMItems: 20
        }
    });
    store.dispatch = jest.fn();
});

const findByTest = (wrapper, tag, val) => wrapper.find(`${tag}[data-testid="${val}"]`);

describe('renders ATM Table', () => {
    it('initial display of atm table component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ATMTable />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('simulate events', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ATMTable />
            </Provider>
        );

        const itemRow = findByTest(wrapper, 'tr', 'atm-item-1');
        itemRow.simulate('mouseOver');

        const itemMore = findByTest(wrapper, 'svg', 'atm-item-more-1');
        itemMore.simulate('click');

        const itemRowLeave = findByTest(wrapper, 'tr', 'atm-item-1');
        itemRowLeave.simulate('mouseLeave');
    });

    it('simulate delete item', () => {
        const onDeleteFn = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <ATMTable onDeleteItem={onDeleteFn} />
            </Provider>
        );

        const itemRow = findByTest(wrapper, 'tr', 'atm-item-1');
        itemRow.simulate('mouseOver');

        const itemMore = findByTest(wrapper, 'svg', 'atm-item-more-1');
        itemMore.simulate('click');

        const itemDelete = findByTest(wrapper, 'button', 'delete-atm-button-1');
        itemDelete.simulate('click');

        expect(onDeleteFn.mock.calls.length).toBe(1);
    });
});
