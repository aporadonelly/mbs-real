import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import PageHeader from '../PageHeader';

configure({ adapter: new Adapter() });

describe('renders Page Header', () => {
    it('displays create button', () => {
        const createItemFn = jest.fn();
        const wrapper = shallow(
            <PageHeader
                title="Sample page"
                description="page description"
                buttonText="Create item"
                onItemCreate={createItemFn}
            />
        );

        expect(wrapper.find('[data-testid="page-header-title"]').text()).toEqual('Sample page');
        expect(wrapper.find('[data-testid="page-header-description"]').text()).toEqual(
            'page description'
        );
        expect(wrapper.find('[data-testid="page-create-item-button"]').text()).toEqual(
            'Create item'
        );
        expect(wrapper.find('[data-testid="create-button-container"]')).toBeTruthy();

        const createBtn = wrapper.find('[data-testid="page-create-item-button"]');
        createBtn.simulate('click');
        expect(createItemFn.mock.calls.length).toBe(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('hide create button', () => {
        const wrapper = shallow(
            <PageHeader title="Sample page" description="page description" hideCreateButton />
        );
        expect(wrapper.find('[data-testid="page-header-title"]').text()).toEqual('Sample page');
        expect(wrapper.find('[data-testid="page-header-description"]').text()).toEqual(
            'page description'
        );
        expect(wrapper.find('[data-testid="page-create-item-button"]')).toEqual({});
        expect(wrapper.find('[data-testid="create-button-container"]')).toEqual({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
