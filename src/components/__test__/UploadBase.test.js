import React from 'react';
import 'jsdom-global/register'; // Without need of adding code in beforeEach and afterEach.
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; // enzyme adapter for the use of 'mount'
import toJson from 'enzyme-to-json';
import { act } from '@testing-library/react';
import UploadBase from '../UploadBase';

Enzyme.configure({ adapter: new Adapter() });
const mockFunction = jest.fn();
const setup = () => mount(<UploadBase fileData={mockFunction} fileExist={mockFunction} />);

// const findByTestName = (wrapper, val) => wrapper.find(`input[name="${val}"]`);
const findByTestID = (wrapper, val) => wrapper.find(`[data-testid="${val}"]`);

test('renders component', () => {
    const wrapper = setup();
    const remove = findByTestID(wrapper, 'remove').hostNodes();
    act(() => {
        remove.simulate('click');
    });
    expect(toJson(wrapper)).toMatchSnapshot();
});
