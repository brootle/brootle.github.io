import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root'; 
import App from 'components/App';
import moxios from 'moxios';

beforeEach(() => {
    moxios.install();
    
    // we intersept real http request and specify which one
    // and second aurgument is response that we give to that request 
    moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [ { body: 'comment 1' }, { body: 'comment 2' } ]        
    });
});

afterEach(() => {
    moxios.uninstall();
})

// add callback function 'done' so jest will wait till we invoke this function
// and only after that Jest will thing that the test is finished
it('can fetch a list of comments and display them', (done) => {
    const wrapper = mount(
        <Root>
            <App />
        </Root>        
    );    

    wrapper.find('button#fetchComments').simulate('click');

    // we must give some time for moxios request to send back response data
    // native way
    moxios.wait(() => {
        wrapper.update();
        expect(wrapper.find('li').length).toEqual(2);

        done(); // we call this callback function to indicate to Jest that the test is done
        wrapper.unmount();
    });    

    // old way
    // setTimeout(() => {
    //     wrapper.update();
    //     expect(wrapper.find('li').length).toEqual(2);

    //     done(); // we call this callback function to indicate to Jest that the test is done
    //     wrapper.unmount();
    // }, 100);

});