import 'jsdom-global/register'; // Without need of adding code in beforeEach and afterEach.
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // enzyme adapter for the use of 'mount'
import ReactQuill from 'react-quill-2';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

test('renders quill page', () => {
    setTimeout(() => {
        const setup = () => mount(<ReactQuill />);
        expect(setup()).toBeTruthy();
        expect(toJson(setup)).toMatchSnapshot();
    }, 2000);
});
