// get the function and immidiatelly run it
const routes = require('next-routes')();

// add routing rules that we use for dynamic routes
// :address is a wildcard and can be anything
// 1st argument is the route user wants to visit
// 2nd argument is a page that we show to user located in 'pages' folder
routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new');

// here we basically export helper function
module.exports = routes;