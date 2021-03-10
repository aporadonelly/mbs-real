import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BranchForm, PageHeader } from '../../../components';
import CreateBranch from '../../branches/CreateBranch';

configure({ adapter: new Adapter() });
jest.unmock('react-redux');

const mockStore = configureMockStore({ thunk });

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

describe('renders Branches Page', () => {
    it('initial view', () => {
        const store = mockStore({
            address: {
                result: '',
                message: '',
                error: {},
                provinceList: [],
                cityList: []
            },
            branch: {
                branchList: [],
                result: '',
                message: '',
                error: {},
                isCreateSuccess: false
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <CreateBranch />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader).exists()).toMatchSnapshot();
        expect(wrapper.find(PageHeader).exists()).toBeTruthy();
        expect(wrapper.find(BranchForm).exists()).toMatchSnapshot();
        expect(wrapper.find(BranchForm).exists()).toBeTruthy();
    });

    it('successful creation', () => {
        const store = mockStore({
            address: {
                result: '',
                message: '',
                error: {},
                provinceList: [],
                cityList: []
            },
            branch: {
                branchList: [],
                result: '',
                message: '',
                error: {},
                isCreateSuccess: true
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <CreateBranch />
            </Provider>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(PageHeader).exists()).toMatchSnapshot();
        expect(wrapper.find(PageHeader).exists()).toBeTruthy();
        expect(wrapper.find(BranchForm).exists()).toMatchSnapshot();
        expect(wrapper.find(BranchForm).exists()).toBeTruthy();
        expect(mockHistoryPush.mock.calls.length).toBe(1);
        expect(mockHistoryPush.mock.calls[0][0]).toBe('/branches');
    });
});
