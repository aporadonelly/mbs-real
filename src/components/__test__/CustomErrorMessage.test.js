import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import CustomErrorMessage from '../CustomErrorMessage';

configure({ adapter: new Adapter() });

describe('renders Custom Error Message', () => {
    it('error view', () => {
        const wrapper = shallow(
            <CustomErrorMessage renderCondition message="sample error message" />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('initial view', () => {
        const wrapper = shallow(
            <CustomErrorMessage renderCondition={false} message="sample error message" />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
