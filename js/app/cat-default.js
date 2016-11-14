require([
	'jquery',
	'cookie',
	'../activate'
],function($){
	'use strict';

	var fModule=window.fModule || {};

	function callback_cat(){
		// ...
	}

	/*================公有方法================*/
	fModule.callback_cat=callback_cat;//渲染cat后回调
	/*================/公有方法================*/

	window.fModule=fModule;
	
});