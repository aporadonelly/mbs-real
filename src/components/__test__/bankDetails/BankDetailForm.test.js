import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import { act } from '@testing-library/react';
import MutationObserver from 'mutation-observer';
import BankDetailForm from '../../bankDetails/BankDetailForm';

global.MutationObserver = MutationObserver;
global.DOMParser = window.DOMParser;

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
        bankDetails: {
            bankDetails: {
                id: 1,
                displayName: 'Bank display name',
                countryCode: '+63',
                logo:
                    'https://ewalletbackendcmsdevelopment-bucket-hgxv1prif2i1.s3-ap-southeast-1.amazonaws.com/aqQJHb96VnzqO2MH2af39.png',
                userAgreement: 'USER AGREEMENT',
                privacyPolicy: 'PRIVACY POLICY',
                termsAndConditions: 'TERMS AND CONDITIONS',
                createdTimestamp: '2020-08-18T17:41:28Z',
                lastModifiedTimestamp: '2021-03-02T04:12:19.384998Z',
                bankName: 'Bank'
            }
        },
        address: {
            countryList: [
                {
                    id: 2,
                    createdTimestamp: '2020-08-18T17:41:28Z',
                    lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                    countryName: 'Indonesia',
                    countryPhoneCode: '62',
                    isoAlpha2Code: 'ID',
                    isoAlpha3Code: 'IDN'
                },
                {
                    id: 1,
                    createdTimestamp: '2020-08-18T17:41:28Z',
                    lastModifiedTimestamp: '2020-08-18T17:41:28Z',
                    countryName: 'Philippines',
                    countryPhoneCode: '63',
                    isoAlpha2Code: 'PH',
                    isoAlpha3Code: 'PHL'
                }
            ]
        }
    });
    store.dispatch = jest.fn();
});

const findByTest = (wrapper, tag, val) => wrapper.find(`${tag}[data-testid="${val}"]`);

describe('renders Bank detail Form', () => {
    it('initial display of bank detail form component', () => {
        const formSubmitFunc = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <BankDetailForm onFormSubmit={formSubmitFunc} />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();

        const displayNameField = wrapper.find(`input[name="displayName"]`);
        expect(displayNameField.exists()).toBeTruthy();
        expect(displayNameField.prop('value')).toEqual('Bank display name');

        const countryCodeField = wrapper.find(`input[name="countryCode"]`);
        expect(countryCodeField.exists()).toBeTruthy();
        expect(countryCodeField.prop('value')).toEqual('63');

        const logoUploadField = findByTest(wrapper, 'DropzoneAreaBase', 'logoUpload');
        expect(logoUploadField.exists()).toBeTruthy();

        const userAgreementField = findByTest(wrapper, 'WysiwygField', 'userAgreement');
        expect(userAgreementField.exists()).toBeTruthy();

        const privacyPolicyField = findByTest(wrapper, 'WysiwygField', 'privacyPolicy');
        expect(privacyPolicyField.exists()).toBeTruthy();

        const termsAndConditionsField = findByTest(wrapper, 'WysiwygField', 'termsAndConditions');
        expect(termsAndConditionsField.exists()).toBeTruthy();
    });
    it('submit of bank detail form component', () => {
        const formSubmitFunc = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <BankDetailForm onFormSubmit={formSubmitFunc} />
            </Provider>
        );

        const submitButton = findByTest(wrapper, 'button', 'submit-btn');
        act(() => {
            submitButton.simulate('click');
        });

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
