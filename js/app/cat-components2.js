require([
	'jquery',
	'../activate'
],function($){
	'use strict';

	var fModule=window.fModule || {};

	function callback_nav(){
		$(".p-tabs li").eq(1).addClass("on");
		$(".p-tabs li").on("click",function(){
			$(this).addClass("on").siblings("li").removeClass("on");
			$(".p-cats-wraper ul").eq($(this).index()).fadeIn().siblings("ul").hide();
		});
	}

	function callback_cat(){
		$(".p-cats-wraper ul").eq(1).show();
	}

	/*================公有方法================*/
	fModule.callback_nav=callback_nav;//渲染nav后回调
	fModule.callback_cat=callback_cat;//渲染cat后回调
	/*================/公有方法================*/

	window.fModule=fModule;

});