import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PromoModal from '../../promos/PromoModal';

Enzyme.configure({ adapter: new Adapter() });

const arrayRow = [
    { id: 'test1', test: 'test' },
    { id: 'test2', test: 'test' },
    { id: 'test3', test: 'test' },
    { id: 'test4', test: 'test' }
];
const setup = (props = { items: arrayRow, handleOpen: jest.fn(), onClose: jest.fn() }) =>
    shallow(<PromoModal {...props} />);

const findByTest = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);

test('renders promo modal', () => {
    const wrapper = setup();
    const fullApp = findByTest(wrapper, 'promoModal');
    expect(fullApp.length).toBe(1);
});
test(' trigger close button', () => {
    const wrapper = setup();
    const closeBtn = findByTest(wrapper, 'closeBtn');
    closeBtn.simulate('click');
    expect(closeBtn.length).toBe(1);
});
