require([
	'jquery',
	'../activate'
],function($){
	'use strict';

	//滚动时左栏固定
	$(window).scroll(function(){
		var scrollTop=document.documentElement.scrollTop + document.body.scrollTop;
		if(scrollTop>200){
			$(".mLeft").css({"position":"fixed","top":"0"});
		}else{
			$(".mLeft").css({"position":"absolute","top":"30px"});
		}
	});

	//全部收起 & 全部打开
	$(".mainTtl .switch").click(function(){
		if(!$(this).hasClass("close")){
			$(this).addClass("close").text("全部展开");
			$(".mRight ol").removeClass("drop");
			$(".mRight .unit").removeClass("open");
		}else{
			$(this).removeClass("close").text("全部收起");
			$(".mRight ol").addClass("drop");
			$(".mRight .unit").addClass("open");
		}
	});

	//单个收起 & 打开
	$(".mRight .key").on("click",function(){
		if($(this).parent().hasClass("drop")){
			$(this).parent().removeClass("drop");
			$(this).siblings(".unit").removeClass("open");
		}else{
			$(this).parent().addClass("drop");
			$(this).siblings(".unit").addClass("open");
		}
	});
	$(".mRight .key2").on("click",function(){
		if($(this).parent().hasClass("open")){
			$(this).parent().removeClass("open");
		}else{
			$(this).parent().addClass("open");
		}
	});
	$(".mRight .key0").on("click",function(){
		if(!$(this).hasClass("close2")){
			$(this).addClass("close2").find("span").text("全部展开");
			$(this).parents(".section").find("ol").removeClass("drop");
			$(this).parents(".section").find(".unit").removeClass("open");
		}else{
			$(this).removeClass("close2").find("span").text("全部收起");
			$(this).parents(".section").find("ol").addClass("drop");
			$(this).parents(".section").find(".unit").addClass("open");
		}
	});

	//返回顶部
	$(".gotop").click(function(){
		$("html,body").animate({scrollTop:0},200);
	});
	
});