import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import DeleteModal from '../DeleteModal';

configure({ adapter: new Adapter() });

describe('renders Delete Modal', () => {
    it('display delete modal', () => {
        const openModal = true;
        const closeModal = jest.fn();
        const deleteItemFn = jest.fn();

        const wrapper = shallow(
            <DeleteModal
                open={openModal}
                onClose={closeModal}
                onDeleteItem={deleteItemFn}
                item="Branch"
                itemName="Branch Name"
            />
        );
        expect(wrapper.find('[data-testid="item-delete-question"]').text()).toEqual(
            'Delete Branch?'
        );
        expect(wrapper.find('[data-testid="item-name-delete-question"]').text()).toEqual(
            'Are you sure you want to delete Branch Name?'
        );

        const deleteBtn = wrapper.find('[data-testid="delete-btn"]');
        deleteBtn.simulate('click');
        expect(deleteItemFn.mock.calls.length).toBe(1);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
    describe('trigger close modal', () => {
        const openModal = true;
        const closeModal = jest.fn();
        const deleteItemFn = jest.fn();

        const wrapper = shallow(
            <DeleteModal
                open={openModal}
                onClose={closeModal}
                onDeleteItem={deleteItemFn}
                item="Branch"
                itemName="Branch Name"
            />
        );
        it('click close icon', () => {
            const closeBtn = wrapper.find('[data-testid="close-icon-btn"]');
            closeBtn.simulate('click');
            expect(closeModal.mock.calls.length).toBe(1);
        });

        it('click cancel button', () => {
            const cancelBtn = wrapper.find('[data-testid="cancel-btn"]');
            cancelBtn.simulate('click');
            expect(closeModal.mock.calls.length).toBe(2);
        });
    });
});
