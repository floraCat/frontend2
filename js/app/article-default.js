require([
	'jquery',
	'zclip',
	'../activate'
],function($){
	'use strict';

	var fModule=window.fModule || {};

	function callback_article(){

		//代码复制
		fModule.copyCode();

		//效果展示
		fModule.display();
	}

	/*================公有方法================*/
	fModule.callback_article=callback_article;//渲染article后回调
	/*================/公有方法================*/

	window.fModule=fModule;


});