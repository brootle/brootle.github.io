'use strict';

// get the function and immidiatelly run it
var routes = require('next-routes')();

// add routing rules that we use for dynamic routes
// :address is a wildcard and can be anything
// 1st argument is the route user wants to visit
// 2nd argument is a page that we show to user located in 'pages' folder
routes.add('/campaigns/new', '/campaigns/new').add('/campaigns/:address', '/campaigns/show').add('/campaigns/:address/requests', '/campaigns/requests/index').add('/campaigns/:address/requests/new', '/campaigns/requests/new');

// here we basically export helper function
module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQU0sU0FBUyxBQUFmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FDSyxBQURMLElBQ1MsQUFEVCxrQkFDMkIsQUFEM0Isa0JBRUssQUFGTCxJQUVTLEFBRlQsdUJBRWdDLEFBRmhDLG1CQUdLLEFBSEwsSUFHUyxBQUhULGdDQUd5QyxBQUh6Qyw2QkFJSyxBQUpMLElBSVMsQUFKVCxvQ0FJNkMsQUFKN0M7O0FBTUE7QUFDQSxPQUFPLEFBQVAsVUFBaUIsQUFBakIiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2FsZXgvYnJvb3RsZS5naXRodWIuaW8vQkxPQ0tDSEFJTi9raWNrc3RhcnQifQ==