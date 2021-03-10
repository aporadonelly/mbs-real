import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PromoTable from '../../promos/PromoTable';

Enzyme.configure({ adapter: new Adapter() });

const arrayRow = [
    { id: 'test1', test: 'test' },
    { id: 'test2', test: 'test' },
    { id: 'test3', test: 'test' },
    { id: 'test4', test: 'test' }
];
const setup = (props = { rows: arrayRow }) => shallow(<PromoTable {...props} />);

const findByTest = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);

test('renders promo table', () => {
    const wrapper = setup();
    const fullApp = findByTest(wrapper, 'promoTable');
    const moreBtn = findByTest(wrapper, 'menuIcon');
    const fullRow = findByTest(wrapper, 'fullRow');
    moreBtn.at(1).simulate('click', { target: { name: 'menuIcon' } });
    fullRow.at(1).simulate('mouseover');
    fullRow.at(1).simulate('mouseleave');
    expect(fullApp.length).toBe(1);
});
