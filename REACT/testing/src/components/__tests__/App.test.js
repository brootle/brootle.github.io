import React from 'react';
import { shallow } from 'enzyme'

import App from 'components/App';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

// we are using shallow to find components inside tested component

let wrapper;

beforeEach(() => {
    wrapper = shallow(<App />);
});

it('shows a comment box', () => {
    // see https://airbnb.io/enzyme/docs/api/ShallowWrapper/find.html
    expect(wrapper.find(CommentBox).length).toEqual(1); // we check there there is only 1 CommentBox inside App
});

it('shows a comment list', () => {
    expect(wrapper.find(CommentList).length).toEqual(1); // we check there there is only 1 CommentBox inside App
});