require([
	'jquery',
	'zclip',
	'../activate'
],function($){
	'use strict';

	var fModule=window.fModule || {};

	function callback_list(){

		//代码复制
		fModule.copyCode("list");

		//效果展示
		fModule.display("list");

	}

	/*================公有方法================*/
	fModule.callback_list=callback_list;//渲染list后回调
	/*================/公有方法================*/

	window.fModule=fModule;

});