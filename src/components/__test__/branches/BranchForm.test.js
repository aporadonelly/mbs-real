import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import { act } from '@testing-library/react';
import BranchForm from '../../branches/BranchForm';

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
        address: {
            result: '',
            message: '',
            error: {},
            provinceList: [],
            cityList: []
        }
    });
    store.dispatch = jest.fn();
});

const findByTest = (wrapper, tag, val) => wrapper.find(`${tag}[data-testid="${val}"]`);

describe('renders Branch Form', () => {
    it('initial display of branch form component', () => {
        const formSubmitFunc = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <BranchForm onFormSubmit={formSubmitFunc} />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('[data-testid="address-text-preview"]').text()).toEqual(
            'No available preview yet.'
        );
    });
    describe('display branch form component with province and city', () => {
        const formSubmitFunc = jest.fn();
        store = mockStore({
            address: {
                result: '',
                message: '',
                error: {},
                provinceList: [
                    {
                        id: 1,
                        provinceName: 'Abra',
                        country: 1
                    },
                    {
                        id: 2,
                        provinceName: 'Agusan del Norte',
                        country: 1
                    },
                    {
                        id: 3,
                        provinceName: 'Agusan del Sur',
                        country: 1
                    }
                ],
                cityList: [
                    {
                        id: 17,
                        cityName: 'Bengued',
                        province: 1
                    },
                    {
                        id: 2,
                        cityName: 'Boliney',
                        province: 1
                    },
                    {
                        id: 19,
                        cityName: 'Bucay',
                        province: 1
                    }
                ]
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <BranchForm onFormSubmit={formSubmitFunc} />
            </Provider>
        );

        it('type on fields', () => {
            const branchName = wrapper.find(`input[name="branchName"]`);
            const locationStreet = wrapper.find(`input[name="locationStreet"]`);
            const locationProvinceOrState = wrapper.find(`input[name="locationProvinceOrState"]`);
            const locationCity = wrapper.find(`input[name="locationCity"]`);
            const locationPostalOrZipCode = wrapper.find(`input[name="locationPostalOrZipCode"]`);
            const landmark = wrapper.find(`input[name="landmark"]`);
            const email = wrapper.find(`input[name="email"]`);
            const phone = wrapper.find(`input[name="phone"]`);
            const mobile = wrapper.find(`input[name="mobile"]`);
            const bankingDays = wrapper.find(`input[name="bankingDays"]`);
            const bankingHoursFrom = wrapper.find(`input[name="bankingHoursFrom"]`);
            const bankingHoursTo = wrapper.find(`input[name="bankingHoursTo"]`);
            const longitude = wrapper.find(`input[name="longitude"]`);
            const latitude = wrapper.find(`input[name="latitude"]`);

            act(() => {
                branchName.simulate('change', { target: { value: 'Branch' } });
                locationStreet.simulate('change', { target: { value: 'Street' } });
                locationProvinceOrState.simulate('change', { target: { value: 2 } });
                locationCity.simulate('change', { target: { value: 2 } });
                locationPostalOrZipCode.simulate('change', { target: { value: '1122' } });
                landmark.simulate('change', { target: { value: 'Sample landmark' } });
                email.simulate('change', { target: { value: 'sample@email.com' } });
                phone.simulate('change', { target: { value: '(123) 123 12 12' } });
                mobile.simulate('change', { target: { value: '09123456789' } });
                bankingDays.simulate('change', { target: { value: `['Monday']` } });
                bankingHoursFrom.simulate('change', { target: { value: '7:00' } });
                bankingHoursTo.simulate('change', { target: { value: '9:00' } });
                longitude.simulate('change', { target: { value: 12 } });
                latitude.simulate('change', { target: { value: 12 } });
            });

            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('simulate back button', () => {
            const backBtn = findByTest(wrapper, 'button', 'back-btn');
            backBtn.simulate('click');

            expect(mockHistoryPush.mock.calls.length).toBe(1);
            expect(mockHistoryPush.mock.calls[0][0]).toBe('/branches');
        });

        it('simulate cancel button', () => {
            const cancelBtn = findByTest(wrapper, 'button', 'cancel-btn');
            cancelBtn.simulate('click');

            expect(mockHistoryPush.mock.calls.length).toBe(1);
            expect(mockHistoryPush.mock.calls[0][0]).toBe('/branches');
        });

        it('simulate add sched button', () => {
            const addSchedBtn = findByTest(wrapper, 'button', 'add-sched-btn');
            addSchedBtn.simulate('click');
        });

        it('simulate remove sched button', () => {
            const removeSchedBtn = findByTest(wrapper, 'button', 'remove-sched-btn-1');
            removeSchedBtn.simulate('click');
        });

        it('simulate submit form', () => {
            const submitForm = findByTest(wrapper, 'form', 'branch-form');
            submitForm.simulate('submit');
        });
    });
});
