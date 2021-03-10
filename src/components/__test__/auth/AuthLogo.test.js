import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import AuthLogo from '../../auth/AuthLogo';

configure({ adapter: new Adapter() });

describe('renders Auth Logo', () => {
    it('initial view', () => {
        const wrapper = shallow(<AuthLogo />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
