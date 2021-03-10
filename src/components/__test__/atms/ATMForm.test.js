import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import { act } from '@testing-library/react';
import ATMForm from '../../atms/ATMForm';

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

describe('renders ATM Form', () => {
    it('initial display of atm form component', () => {
        const formSubmitFunc = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <ATMForm onFormSubmit={formSubmitFunc} />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('[data-testid="address-text-preview"]').text()).toEqual(
            'No available preview yet.'
        );
    });
    describe('display atm form component with province and city', () => {
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
                <ATMForm onFormSubmit={formSubmitFunc} />
            </Provider>
        );

        it('type on fields', () => {
            const atmName = wrapper.find(`input[name="atmName"]`);
            const locationStreet = wrapper.find(`input[name="locationStreet"]`);
            const locationProvinceOrState = wrapper.find(`input[name="locationProvinceOrState"]`);
            const locationCity = wrapper.find(`input[name="locationCity"]`);
            const locationPostalOrZipCode = wrapper.find(`input[name="locationPostalOrZipCode"]`);
            const landmark = wrapper.find(`input[name="landmark"]`);
            const longitude = wrapper.find(`input[name="longitude"]`);
            const latitude = wrapper.find(`input[name="latitude"]`);

            act(() => {
                atmName.simulate('change', { target: { value: 'ATM' } });
                locationStreet.simulate('change', { target: { value: 'Street' } });
                locationProvinceOrState.simulate('change', { target: { value: 2 } });
                locationCity.simulate('change', { target: { value: 2 } });
                locationPostalOrZipCode.simulate('change', { target: { value: '1122' } });
                landmark.simulate('change', { target: { value: 'Sample landmark' } });
                longitude.simulate('change', { target: { value: 12 } });
                latitude.simulate('change', { target: { value: 12 } });
            });

            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('simulate back button', () => {
            const backBtn = findByTest(wrapper, 'button', 'back-btn');
            backBtn.simulate('click');

            expect(mockHistoryPush.mock.calls.length).toBe(1);
            expect(mockHistoryPush.mock.calls[0][0]).toBe('/atms');
        });

        it('simulate cancel button', () => {
            const cancelBtn = findByTest(wrapper, 'button', 'cancel-btn');
            cancelBtn.simulate('click');

            expect(mockHistoryPush.mock.calls.length).toBe(1);
            expect(mockHistoryPush.mock.calls[0][0]).toBe('/atms');
        });

        it('simulate submit form', () => {
            const submitForm = findByTest(wrapper, 'form', 'atm-form');
            submitForm.simulate('submit');
        });
    });
});
