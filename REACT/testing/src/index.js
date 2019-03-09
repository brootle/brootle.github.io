import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'Root';

import App from 'components/App';

ReactDOM.render(
    <Root>
        <App />
    </Root>,
    document.querySelector('#root')
);

// <App /> will be passed to <Root> as a child