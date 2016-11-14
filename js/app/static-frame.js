require([
	'jquery',
	'../activate'
],function($){
	'use strict';

	//文件目录收起展开
	$(".frameFile ol p a").click(function(){
		$(this).parent().siblings("div").toggle();
		$(this).parent().parent().toggleClass("open");
	});
	//说明显示层
	var addFixed=function(){
		var windowScroll=document.documentElement.scrollTop + document.body.scrollTop;
		if(windowScroll>200){
			$(".showOn").addClass("fixed");
		}else{
			$(".showOn").removeClass("fixed");
		}
	}
	$(".frameFile ol i").click(function(){
		var dir=$(this).parents(".dir0").attr("data-dir");
		var show=$(this).siblings("b").attr("data-role");
		$(".showDivs .showOn").hide().removeClass("showOn");
		$(".showDivs").find("."+dir+"_"+show).show().addClass("showOn");
		$(this).parents(".frameFile").find(".dir0 .on").removeClass("on");
		$(this).parent().addClass("on");
		addFixed();
	});
	$("[data-dir=dist] [data-role=appDir]").siblings("i").click();
	addFixed();
	$(document).on("scroll",function(){
		addFixed();
	});

	// $(document).on("scroll",function(){
	// 	var scroll_show=$(".showOn").offset().top;
	// 	var windowScroll=document.documentElement.scrollTop + document.body.scrollTop;
	// 	if(windowScroll>200){
	// 		$(".showOn").addClass("fixed");
	// 	}else{
	// 		$(".showOn").removeClass("fixed");
	// 	}
	// });

	//展开&收起
	$(".key_toggle").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on").text("以下展开");
			$(this).parents(".frameFile").find("ol .dir0 div").removeClass("open").children("div").hide();
		}else{
			$(this).addClass("on").text("以下收起");
			$(this).parents(".frameFile").find("ol .dir0 div").addClass("open").children("div").show();
		}
	});
	//$(".key_toggle").trigger("click");

	//切换
	// $(".p-tabs li").click(function(){
	// 	if($(this).hasClass("fr")){
	// 		$(".frame_1").animate({"left":"9999px"},200);
	// 		$(".frame_2").animate({"left":"50%"},200);
	// 	}
	// 	if($(this).hasClass("fl")){
	// 		$(".frame_1").animate({"left":"50%"},200);
	// 		$(".frame_2").animate({"left":"-9999px"},200);
	// 	}
	// 	$(this).addClass("on").siblings().removeClass("on");	
	// });

	//默认显示
	// var def_tab=$("#tab").val();
	// if(def_tab=="2"){
	// 	console.log(def_tab);
	// 	$(".p-tabs .fr").trigger("click");
	// }
	// if(def_tab=="index"){
	// 	$("[data-role='indexHtml']").siblings("i").trigger("click");
	// }

});