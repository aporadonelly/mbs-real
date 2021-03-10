import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import Branches from '../../branches/Branches';
import { Snackbar, PageHeader, BranchTable, DeleteModal, ViewModal } from '../../../components';
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

describe('renders Branches Page', () => {
    it('initial view', () => {
        const store = mockStore({
            branch: {
                branchList: [],
                totalBranchItems: 0,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <Branches />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toBeTruthy();
        expect(wrapper.find('[data-testid="empty-branch-placeholder"]')).toBeTruthy();
    });

    it('table view', () => {
        const store = mockStore({
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
                totalBranchItems: 10,
                result: results.SUCCESS,
                message: '',
                error: {},
                isCreateSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <Branches />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toBeTruthy();
        expect(wrapper.find(BranchTable)).toBeTruthy();
    });

    it('trigger create branch', () => {
        const store = mockStore({
            branch: {
                branchList: [],
                totalBranchItems: 0,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <Branches />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toBeTruthy();
        expect(wrapper.find(BranchTable)).toBeTruthy();

        const createBtn = findByTest(wrapper, 'button', 'page-create-item-button');
        createBtn.simulate('click');
        expect(mockHistoryPush.mock.calls.length).toBe(1);
        expect(mockHistoryPush.mock.calls[0][0]).toBe('/branches/create');
    });

    it('renders Snackbar Component', () => {
        const store = mockStore({
            branch: {
                branchList: [],
                totalBranchItems: 0,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: true
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <Branches />
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
        expect(wrapper.find(BranchTable)).toBeTruthy();
    });

    it('renders Snackbar Component for delete', () => {
        const store = mockStore({
            branch: {
                branchList: [],
                totalBranchItems: 0,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: false,
                isDeleteSuccess: true
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <Branches />
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
        expect(wrapper.find(BranchTable)).toBeTruthy();
    });

    it('trigger delete branch', () => {
        const store = mockStore({
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
                totalBranchItems: 10,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: false,
                isDeleteSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <Branches />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toBeTruthy();
        expect(wrapper.find(BranchTable)).toBeTruthy();

        const itemRow = findByTest(wrapper, 'tr', 'branch-item-1');
        itemRow.simulate('mouseOver');

        const itemMore = findByTest(wrapper, 'svg', 'branch-item-more-1');
        itemMore.simulate('click');

        expect(wrapper.find(DeleteModal)).toBeTruthy();

        const itemDelete = findByTest(wrapper, 'button', 'delete-branch-button-1');
        itemDelete.simulate('click');
    });
    it('trigger view branch one', () => {
        const store = mockStore({
            branch: {
                branchList: [
                    {
                        id: 1,
                        schedules: [
                            {
                                bankingDays: ['Monday', 'Tuesday', 'Wednesday'],
                                bankingHoursFrom: '8:00',
                                bankingHoursTo: '9:00'
                            },
                            {
                                bankingDays: ['Monday'],
                                bankingHoursFrom: '8:00',
                                bankingHoursTo: '10:00'
                            },
                            {
                                bankingDays: ['Saturday', 'Sunday'],
                                bankingHoursFrom: '8:00',
                                bankingHoursTo: '10:00'
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
                        phone: '(123)12123, (123)123123',
                        mobile: '+639175240823',
                        latitude: '11.0000000000',
                        longitude: '11.0000000000',
                        landmark: 'jkhkjh'
                    }
                ],
                totalBranchItems: 10,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: false,
                isDeleteSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <Branches />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toBeTruthy();
        expect(wrapper.find(BranchTable)).toBeTruthy();

        const itemRow = findByTest(wrapper, 'tr', 'branch-item-1');
        itemRow.simulate('mouseOver');

        const itemMore = findByTest(wrapper, 'svg', 'branch-item-more-1');
        itemMore.simulate('click');

        const itemView = findByTest(wrapper, 'button', 'view-branch-button-1');
        itemView.simulate('click');

        expect(wrapper.find(ViewModal)).toBeTruthy();
    });
    it('trigger view branch two', () => {
        const store = mockStore({
            branch: {
                branchList: [
                    {
                        id: 2,
                        schedules: [
                            {
                                bankingDays: [
                                    'Monday',
                                    'Tuesday',
                                    'Wednesday',
                                    'Thursday',
                                    'Friday',
                                    'Saturday',
                                    'Sunday'
                                ],
                                bankingHoursFrom: '8:00',
                                bankingHoursTo: '9:00'
                            },
                            {
                                bankingDays: ['Wednesday', 'Saturday', 'Sunday'],
                                bankingHoursFrom: '8:00',
                                bankingHoursTo: '10:00'
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
                        phone: '(123)12123',
                        mobile: '09175240823',
                        latitude: '11.0000000000',
                        longitude: '11.0000000000',
                        landmark: ''
                    }
                ],
                totalBranchItems: 10,
                result: '',
                message: '',
                error: {},
                isCreateSuccess: false,
                isDeleteSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <Branches />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toMatchSnapshot();
        expect(wrapper.find(PageHeader)).toBeTruthy();
        expect(wrapper.find(BranchTable)).toBeTruthy();

        const itemRow = findByTest(wrapper, 'tr', 'branch-item-2');
        itemRow.simulate('mouseOver');

        const itemMore = findByTest(wrapper, 'svg', 'branch-item-more-2');
        itemMore.simulate('click');

        const itemView = findByTest(wrapper, 'button', 'view-branch-button-2');
        itemView.simulate('click');

        expect(wrapper.find(ViewModal)).toBeTruthy();
    });
});
