var Dispatcher = require("flux").Dispatcher;
Dispatcher = new Dispatcher();

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var request = require("superagent");
const constants = {};

var ThemeBuilderStore = assign({}, EventEmitter.prototype, {
	initialize: function () {
		//initialize whatever you want.
	}
});

var Actions = {

};

// wait for FSBL to be ready before initializing.
const  FSBLReady = () => { 
	ThemeBuilderStore.initialize();
}

if (window.FSBL && FSBL.addEventListener) {
	FSBL.addEventListener("onReady", FSBLReady);
} else {
	window.addEventListener("FSBLReady", FSBLReady);
}

module.exports.Store = ThemeBuilderStore;
module.exports.Actions = Actions;