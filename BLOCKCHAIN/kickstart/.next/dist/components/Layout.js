'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _semanticUiReact = require('semantic-ui-react');

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/alex/brootle.github.io/BLOCKCHAIN/kickstart/components/Layout.js';

// this is NextJS component, everything inside it will be moved to html head tag

// functional components run with props
// everything inside this component will be passed to it in props.children
exports.default = function (props) {
    return _react2.default.createElement(_semanticUiReact.Container, {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 12
        }
    }, _react2.default.createElement(_head2.default, {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 14
        }
    }, _react2.default.createElement('link', { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css', __source: {
            fileName: _jsxFileName,
            lineNumber: 15
        }
    })), _react2.default.createElement(_Header2.default, {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 18
        }
    }), props.children);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTGF5b3V0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiSGVhZGVyIiwiQ29udGFpbmVyIiwiSGVhZCIsInByb3BzIiwiY2hpbGRyZW4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBUzs7QUFHVCxBQUFPOzs7Ozs7OztBQURQOztBQUdBO0FBQ0EsQUFDQTtrQkFBZSxVQUFBLEFBQUMsT0FBVSxBQUN0QjsyQkFDSSxBQUFDOztzQkFBRDt3QkFBQSxBQUVJO0FBRko7QUFBQSxLQUFBLGtCQUVJLEFBQUM7O3NCQUFEO3dCQUFBLEFBQ0k7QUFESjtBQUFBLCtDQUNVLEtBQU4sQUFBVSxjQUFhLE1BQXZCLEFBQTRCO3NCQUE1Qjt3QkFIUixBQUVJLEFBQ0ksQUFHSjtBQUhJO3lCQUdKLEFBQUM7O3NCQUFEO3dCQU5KLEFBTUksQUFFQztBQUZEO0FBQUEsY0FQUixBQUNJLEFBUVcsQUFJbEI7QUFkRCIsImZpbGUiOiJMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvYWxleC9icm9vdGxlLmdpdGh1Yi5pby9CTE9DS0NIQUlOL2tpY2tzdGFydCJ9