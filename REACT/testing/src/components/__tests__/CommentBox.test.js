import React from 'react';
import { mount } from 'enzyme'
import CommentBox from 'components/CommentBox';
import Root from 'Root'; // we use this Root component as wrapper to get redux Provide to our tests
                         // so components that use Redux Provider will get all imports needed

// we are using mount to find HTML elements inside tested component immitated it was mounted

let wrapper;

beforeEach(() => {
    wrapper = mount(
        <Root>
            <CommentBox />
        </Root>        
    );
});

afterEach(() => {
    wrapper.unmount();
});

it('has a text area and button', () => {
    expect(wrapper.find('textarea').length).toEqual(1);
    expect(wrapper.find('form button').length).toEqual(1);
});

// we use describe to group test to optimize duplicated code
describe('text area', () => {

    beforeEach(() => {
        wrapper.find('textarea').simulate('change', { target: { value: 'a' }});
        wrapper.update(); // force rerender because setState is async
    });    

    it('has a text area that users can type in', () => {
        expect(wrapper.find('textarea').prop('value')).toEqual('a');
    
    });
    
    it('clears text area when user submits the form', () => {
        wrapper.find('form').simulate('submit');
        wrapper.update(); 
        expect(wrapper.find('textarea').prop('value')).toEqual('');
    });
    
});
