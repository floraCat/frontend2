/*初始化__模板渲染*/
(function(){

	'use strict';
	var fModule=window.fModule || {};
	
	function init_render(){
		view_head_foot();
		view_nav();
		view_cat();
		view_list();
		view_article();
		view_sidebar();
	}

	//显示header & footer
	function view_head_foot(){
		if($("[data-render=head-foot]").length>0){
			if($("[data-render=head-foot]").attr("class")=="p-index"){
				var url_level="";
			}else{ var url_level="../../";}
			//header
			$("body").prepend(
				'<div class="g-header"></div>'
				+'<script data-tpl="tpl-head" type="text/x-jsrender">'
				    +'{{:_header_._content_}}'
				+'</script>'
			);
			fModule.render(url_level+"xmls/global/header.xml","","[data-tpl=tpl-head]",".g-header",function(){
				var col=fModule.urlOpts()["col"];
				if(col && col.indexOf("/")>=0){
					$("body").find(".p-nav .others").addClass("on").siblings().removeClass("on");
				}else{
					$("body").find(".p-nav ."+col).addClass("on").siblings().removeClass("on");
				}
			});
			//footer
			$("body").append(
				'<div class="g-footer"></div>'
				+'<script data-tpl="tpl-foot" type="text/x-jsrender">'
				    +'{{:_footer_._content_}}'
				+'</script>'
			);
			fModule.render(url_level+"xmls/global/footer.xml","","[data-tpl=tpl-foot]",".g-footer");
		}
	}

	//显示nav
	function view_nav(){
		if($("body").find("[data-tpl=tpl-nav]").length>0){
			var col=fModule.urlOpts()["col"];
			fModule.render("../../xmls/"+col+"/nav.xml","","[data-tpl=tpl-nav]","[data-rs=rs-nav]",fModule.callback_nav);
		}
	}

	//显示cat
	function view_cat(){
		if($("body").find("[data-tpl=tpl-cat]").length>0){
			var col=fModule.urlOpts()["col"];
			fModule.render("../../xmls/"+col+"/cat.xml","","[data-tpl=tpl-cat]","[data-rs=rs-cat]",fModule.callback_cat);
		}
	}

	//显示list
	function view_list(){
		if($("body").find("[data-tpl=tpl-list]").length>0 || $("body").find("[data-tpls=tpl-list]").length>0){
			var search_key=fModule.urlOpts()["opt"];
			var col=fModule.urlOpts()["col"];
			if($("[data-tpls=tpl-list]").length>0){//嵌套数据xml
				var render_tpl="[data-tpls=tpl-list]";
			}else{
				var render_tpl="[data-tpl=tpl-list]";
			}
			fModule.render("../../xmls/"+col+"/list.xml",search_key,render_tpl,"[data-rs=rs-list]",fModule.callback_list);
		}
	}

	//显示article
	function view_article(){
		if($("body").find("[data-tpl=tpl-article]").length>0){
			var search_key=fModule.urlOpts()["opt"];
			var col=fModule.urlOpts()["col"];
			if(col=="plugins"){
				var url="../../xmls/"+col+"/articles/"+search_key+"/index.xml";
			}else{ var url="../../xmls/"+col+"/articles/"+search_key+".xml";}
			fModule.render(url,"","[data-tpl=tpl-article]","[data-rs=rs-article]",fModule.callback_article);
		}
	}

	//others显示侧栏
	function view_sidebar(){
		var col=fModule.urlOpts()["col"];
		if(col && col.indexOf("others")>=0){
			var cat=fModule.urlOpts()["cat"];
			if(cat || col!="others"){
				$("body").prepend(
					'<div class="p-sidebar"></div>'
					+'<script data-tpl="tpl-sidebar" type="text/x-jsrender">'
					    +'{{:_sidebar_._content_}}'
					+'</script>'
				);
				fModule.render("../../xmls/global/sidebar.xml","","[data-tpl=tpl-sidebar]",".p-sidebar",function(){
					if(col.indexOf("/widget")>=0){//widget分类下
						var obj=$(".p-sidebar a[data-col=widget]");
					}else if(col.indexOf("/bs")>=0){//bs分类下
						var obj=$(".p-sidebar a[data-col=bs]");
					}else{
						var obj=$(".p-sidebar a[data-col="+cat+"]");
					}
					obj.addClass("on").siblings().removeClass("on");
				});
			}
		}
	}


	/*================公有方法================*/
	fModule.init_render=init_render;
	/*================/公有方法================*/
	
	window.fModule=fModule;

})();


