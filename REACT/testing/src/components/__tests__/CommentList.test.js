import React from 'react';
import { mount } from 'enzyme'
import CommentList from 'components/CommentList';
import Root from 'Root'; // we use this Root component as wrapper to get redux Provide to our tests
                         // so components that use Redux Provider will get all imports needed

// we are using mount to find HTML elements inside tested component immitated it was mounted

let wrapper;
let initialState = {
    comments: []
};

beforeEach(() => {

    // we will pass it as props to Root component to initiate state with some comments
    // this way we immitate there are some commets in the state already
    initialState.comments = ['Comment 1', 'Comment 2', 'Comment 3'];
    
    wrapper = mount(
        <Root initialState={initialState}>
            <CommentList />
        </Root>        
    );
});

afterEach(() => {
    wrapper.unmount();
});

it('creates one list item per comment', () => {
    expect(wrapper.find('li').length).toEqual(initialState.comments.length);
});

it('shows text for each comment', () => {    
    initialState.comments.map(comment => {
        expect(wrapper.render().text()).toContain(comment);
    })
});

