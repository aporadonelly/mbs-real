import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import BranchTable from '../../branches/BranchTable';

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
        branch: {
            branchList: [
                {
                    id: 1,
                    schedules: [
                        {
                            bankingDays: ['Monday'],
                            bankingHoursFrom: '8:00',
                            bankingHoursTo: '9:00'
                        }
                    ],
                    branchName: 'branch',
                    locationStreet: 'khgjhgjhg',
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
                    email: 'asd@asd.com',
                    phone: '+639175240823',
                    mobile: '+639175240823',
                    latitude: '11.0000000000',
                    longitude: '11.0000000000',
                    landmark: 'jkhkjh'
                },
                {
                    id: 2,
                    schedules: [
                        {
                            bankingDays: ['Monday', 'Friday'],
                            bankingHoursFrom: '9:00',
                            bankingHoursTo: '10:00'
                        }
                    ],
                    branchName: 'asdasd',
                    locationStreet: 'qweqwe',
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
                    email: 'asd@asd.com',
                    phone: '+639175240823',
                    mobile: '+639175240823',
                    latitude: '12.0000000000',
                    longitude: '12.0000000000',
                    landmark: 'asdasd'
                }
            ],
            result: '',
            message: '',
            error: {},
            isCreateSuccess: false,
            totalBranchItems: 20,
            isDeleteSuccess: false
        }
    });
    store.dispatch = jest.fn();
});

const findByTest = (wrapper, tag, val) => wrapper.find(`${tag}[data-testid="${val}"]`);

describe('renders Branch Table', () => {
    it('initial display of branch table component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <BranchTable />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('simulate events', () => {
        const wrapper = mount(
            <Provider store={store}>
                <BranchTable />
            </Provider>
        );

        const itemRow = findByTest(wrapper, 'tr', 'branch-item-1');
        itemRow.simulate('mouseOver');

        const itemMore = findByTest(wrapper, 'svg', 'branch-item-more-1');
        itemMore.simulate('click');

        const itemRowLeave = findByTest(wrapper, 'tr', 'branch-item-1');
        itemRowLeave.simulate('mouseLeave');
    });

    it('simulate delete item', () => {
        const onDeleteFn = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <BranchTable onMenuActions={onDeleteFn} />
            </Provider>
        );

        const itemRow = findByTest(wrapper, 'tr', 'branch-item-1');
        itemRow.simulate('mouseOver');

        const itemMore = findByTest(wrapper, 'svg', 'branch-item-more-1');
        itemMore.simulate('click');

        const itemDelete = findByTest(wrapper, 'button', 'delete-branch-button-1');
        itemDelete.simulate('click');

        expect(onDeleteFn.mock.calls.length).toBe(1);
    });

    it('simulate delete item', () => {
        const onViewFn = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <BranchTable onMenuActions={onViewFn} />
            </Provider>
        );

        const itemRow = findByTest(wrapper, 'tr', 'branch-item-1');
        itemRow.simulate('mouseOver');

        const itemMore = findByTest(wrapper, 'svg', 'branch-item-more-1');
        itemMore.simulate('click');

        const itemDelete = findByTest(wrapper, 'button', 'view-branch-button-1');
        itemDelete.simulate('click');

        expect(onViewFn.mock.calls.length).toBe(1);
    });
});
