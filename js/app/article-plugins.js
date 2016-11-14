require([
	'jquery',
	'zclip',
	'../activate'
],function($){
	'use strict';

	var fModule=window.fModule || {};

	function callback_article(){
		
		//demo切换
		$(".demos-wraper .tabs a").on("click",function(){
			$(this).addClass("on").siblings().removeClass("on");
			var col=fModule.urlOpts()["col"];
			var nav=fModule.urlOpts()["nav"];
			var opt=fModule.urlOpts()["opt"];
			var title=$(this).attr("data-ttl");
			var url="/xmls/"+col+"/articles/"+opt+"/"+title+".xml";
			$.ajax({
				url:url,
				success:function(rs){
					var data=fModule.xmlToObj($(rs).find("_article_"));
					$(".p-pic2 img").attr("src","../../images/sketch/plugins/"+nav+"/"+title+".png");
					var rely="";
					var relyData=$("[data-rely]").data("rely");
					var relyArr=relyData.substr(0,relyData.length-1).split(",");
					for(var i in relyArr){
						rely+='<script src="'+relyArr[i]+'"></script>';
					}
					$(".dataTrans").text(
						rely+"\n"+
						'<style>'+"\n"+data._style_+"\n"+'</style>'
						+"\n"+'<html>'+"\n"+data._html_+"\n"+'</html>'
						+"\n"+'<script>'+"\n"+data._script_+"\n"+'</script>');
				}
			});
		});
		$(".demos-wraper .tabs a").eq(0).click();

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