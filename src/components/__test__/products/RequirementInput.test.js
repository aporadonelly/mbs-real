import 'jsdom-global/register';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { shallow, configure } from 'enzyme';
import { RequirementInput } from '../../products/RequirementInput';

configure({ adapter: new Adapter() });

describe('renders Error Message', () => {
    it('initial view', () => {
        const wrapper = shallow(<RequirementInput />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
