'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _Campaign = require('./build/Campaign.json');

var _Campaign2 = _interopRequireDefault(_Campaign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// we will get address from 'pages/campaigns/show.js'
exports.default = function (address) {
    return new _web2.default.eth.Contract(JSON.parse(_Campaign2.default.interface), address);
};
// we get interface from compiled contract
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2NhbXBhaWduLmpzIl0sIm5hbWVzIjpbIndlYjMiLCJDYW1wYWlnbiIsImFkZHJlc3MiLCJldGgiLCJDb250cmFjdCIsIkpTT04iLCJwYXJzZSIsImludGVyZmFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFVOzs7O0FBRWpCLEFBQU8sQUFBYzs7Ozs7O0FBRXJCLEFBQ0E7a0JBQWUsVUFBQSxBQUFDLFNBQVksQUFDeEI7V0FBTyxJQUFJLGNBQUEsQUFBSyxJQUFULEFBQWEsU0FDaEIsS0FBQSxBQUFLLE1BQU0sbUJBRFIsQUFDSCxBQUFvQixZQUR4QixBQUFPLEFBRUgsQUFFUDtBQUxEO0FBSkEiLCJmaWxlIjoiY2FtcGFpZ24uanMiLCJzb3VyY2VSb290IjoiL2hvbWUvYWxleC9icm9vdGxlLmdpdGh1Yi5pby9CTE9DS0NIQUlOL2tpY2tzdGFydCJ9