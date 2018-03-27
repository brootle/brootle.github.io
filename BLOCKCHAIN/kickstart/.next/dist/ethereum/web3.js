'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Web3 = require('web3');

// create instance of Web3 and use Metamask Provider
// if we have Metamask install as Google Chrome extention
// local web3 with it's own Provider is already there
// so we just grab Provider from there

// THE PROBLEM - NextJS will render everything on server side,
// by window object doesn't exist on server side yet

// const web3 = new Web3(window.web3.currentProvider);

// SOLUTION

var keys = require('../config/keys');

var web3 = void 0;

// check if we are running in a browser
// and check if user is running Metamask
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
} else {
    // we are on the server or the user is not running Metamask
    // in this case we use our own Provider
    // we create provide via https://rinkeby.infura.io
    var provider = new Web3.providers.HttpProvider(keys.networknodeurl);

    web3 = new Web3(provider);
}

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsInJlcXVpcmUiLCJrZXlzIiwid2ViMyIsIndpbmRvdyIsImN1cnJlbnRQcm92aWRlciIsInByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwibmV0d29ya25vZGV1cmwiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTSxPQUFPLEFBQVAsQUFBTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLElBQU0sT0FBTyxRQUFRLEFBQVIsQUFBYjs7QUFFQSxJQUFJLFlBQUo7O0FBRUE7QUFDQTtBQUNBLElBQUksT0FBTyxBQUFQLFdBQWtCLEFBQWxCLGVBQWlDLE9BQU8sT0FBTyxBQUFkLFNBQXVCLEFBQTVELGFBQXdFLEFBQ3BFO1dBQU8sSUFBSSxBQUFKLEtBQVMsT0FBTyxBQUFQLEtBQVksQUFBckIsQUFBUCxBQUNIO0FBRkQsT0FFTyxBQUNIO0FBQ0E7QUFDQTtBQUNBO1FBQU0sV0FBVyxJQUFJLEtBQUssQUFBTCxVQUFlLEFBQW5CLGFBQ2IsS0FBSyxBQURRLEFBQWpCLEFBSUE7O1dBQU8sSUFBSSxBQUFKLEtBQVMsQUFBVCxBQUFQLEFBQ0g7QUFFRDs7a0JBQWUsQUFBZiIsImZpbGUiOiJ3ZWIzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2FsZXgvYnJvb3RsZS5naXRodWIuaW8vQkxPQ0tDSEFJTi9raWNrc3RhcnQifQ==