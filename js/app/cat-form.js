require([
	'jquery',
	'cookie',
	'../activate'
],function($){
	'use strict';

	var fModule=window.fModule || {};

	function callback_cat(){

        //问号
        $(".btn_form i").click(function(){
            $(".btn_form .desc").toggle();
        });

        //清空控件清单
        formModule.clearCookie();

        //重载时被选中的默认.on + cookie控件数
        formModule.defaultOn();
        
	}

	/*================公有方法================*/
	fModule.callback_cat=callback_cat;//渲染cat后回调
	/*================/公有方法================*/

	window.fModule=fModule;

});