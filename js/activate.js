require([
	'jquery',
	'jsRender',
	'globalFuns',
	'globalFunForm',
	'initRender'
],function($){
	'use strict';

	//模板渲染
	fModule.init_render();
	
	//链接跳转传参
	$(".p-container").on("click","a.A,a.img",function(){
		var col=fModule.urlOpts()["col"];
		if(col=="plugins" || col=="components2"){
			var nav=fModule.urlOpts()["nav"]?fModule.urlOpts()["nav"]:$(this).parents("ul").attr("data-nav");
			var opt_nav='&nav='+nav;
		}else{ var opt_nav="";}
		var data=$(this).closest("[data-trans]").attr("data-trans");//链接最近的'data-trans'[如li属性]
		var linkTo=$(this).closest("[data-link]").attr("data-link")+"?col="+col+opt_nav+"&opt="+data;//链接最近的'data-link'[如ul属性]
		if(linkTo.indexOf("articles-")>=0){
			var target="_blank";
		}else{ var target="_self";}
		window.open(linkTo,target);
	});

})



