import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
//import { addCharacterById } from './actions';

const store = createStore(rootReducer);
console.log(store.getState()); // print all characters in the list
store.subscribe(() => console.log('store', store.getState()));
//store.dispatch(addCharacterById(2)); // remove one character by ID

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root")
);