import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import ErrorMessage from '../ErrorMessage';

configure({ adapter: new Adapter() });

describe('renders Error Message', () => {
    it('initial view', () => {
        const wrapper = shallow(<ErrorMessage message="sample error message" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
