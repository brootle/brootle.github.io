import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers'; 
import reduxPromise from 'redux-promise';

// props.initialState - for some test we need to initialize state with some comments
// otherwise we just pass empty object as 2nd argument to createStore function
// see CommentList.test.js

// it's better to use destructuring as we can set default value, in this case empty object
// so if we don't pass initialState, there will be empty object and not undefined
export default ({ children, initialState={} }) => {

    const store = createStore(
        reducers, 
        initialState,
        applyMiddleware(reduxPromise)
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

// old
// export default props => {
//     return (
//         <Provider store={createStore(reducers, props.initialState)}>
//             {props.children}
//         </Provider>
//     )
// }

