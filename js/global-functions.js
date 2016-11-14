/*公共函数*/
(function(){

	'use strict';

	var fModule=window.fModule || {};


	//把xml转成对象
	function xmlToObj(xmlObj){
		var data=[];
		var tempObj={};
		var tempArr=[];
		xmlObj.children().each(function(){
			if($(this).children().length<=0){
				if(xmlObj.children().prop("tagName")==xmlObj.children().eq(1).prop("tagName")||$(this).prop("tagName")=="_item_"){//tag相同或为'_item_'时为数组
					tempArr[$(this).index()]=$(this).text();
					data.push(tempArr);
				}else{//否则为对象
					tempObj[$(this).prop("tagName")]=$(this).text();
					data.push(tempObj);	
				}
			}else{
				if(xmlObj.children().eq(0).prop("tagName")==xmlObj.children().eq(1).prop("tagName")||$(this).prop("tagName")=="_item_"){
					tempArr[$(this).index()]=xmlToObj($(this));
					data.push(tempArr);
				}else{
					tempObj[$(this).prop("tagName")]=xmlToObj($(this));	
					data.push(tempObj);	
				}
			}
		});
		return data[0];		
	}


	/*
	把xml数据渲染到html
	-----------------------
	*xml_url - xml文件路径
	*search_key - 要获取的_FIELD_节点key属性值(为空时获取全部)
	*render_tpl - jsRender模板选择器
	*render_rs - jsRender渲染选择器
	*callback - 回调
	*/
	function render(xml_url,search_key,render_tpl,render_rs,callback){
		$.ajax({
			url:xml_url,
			success:function(rs){
				var rsData={};
				if(search_key!=""){//指定了字段key时
					var data=xmlToObj($(rs).find("_"+search_key+"_"));
					rsData["_searchKey_"]=data;
					rsData["col"]=urlOpts()["col"];//分栏
					rsData["nav"]=urlOpts()["col"]=="plugins"?urlOpts()["nav"]:"";//导航
					if(render_tpl.indexOf("data-tpls")>=0){
						render_add(render_tpl,render_rs,rsData,xmlToObj,callback);//嵌套数据xml
					}else{
						$(render_rs).html($.templates(render_tpl).render(rsData));
						if(callback){callback();}
					}
				}else{
					var key=$(rs).children(0).prop("tagName");
					var data=xmlToObj($(rs).children(0));
					rsData[key]=data;
					rsData[key]["_tab_script_right_"]="</script>";
					rsData["col"]=urlOpts()["col"];//分栏
					rsData["nav"]=urlOpts()["col"]=="plugins"?urlOpts()["nav"]:"";//导航
					$(render_rs).html($.templates(render_tpl).render(rsData));
					if(callback){callback();}
				}
				//console.log(rsData);
			}
		});			
	}


	var render_add=function(render_tpl,render_rs,rsData,xmlToObj,callback){
		var data=rsData["_searchKey_"];
		for(var p in data){
			var col=urlOpts()["col"];
			var title=data[p]._title_;
			$.ajax({
				url:"../../xmls/"+col+"/articles/"+title+".xml",
				async:false,
				success:function(rs2){
					var data2=xmlToObj($(rs2).children(0));
					data[p]._desc_=data2._desc_;
					data[p]._style_=data2._style_;
					data[p]._html_=data2._html_;
					data[p]._script_=data2._script_;
					data[p]._rely_=data2._rely_;
					data[p]._tab_script_right_="</script>";
				}
			});
		}
		//console.log(rsData);
		$(render_rs).html($.templates(render_tpl).render(rsData));
		if(callback){callback();}
	}


	function urlOpts(){
		var href=window.location.href;
		var str_opts=href.substr(href.indexOf("?")+1);
		var obj_opts={};
		if(str_opts!=""){
			var arr_opts=[];
			if(str_opts.indexOf("&")>=0){
				arr_opts=str_opts.split("&");
			}else{
				arr_opts[0]=str_opts;
			}
			for(var i in arr_opts){
				var arr=arr_opts[i].split("=");
				obj_opts[arr[0]]=arr[1];
			}
		}else{ obj_opts='';}
		return obj_opts;
	}
    

	function copyCode(page){
		$("[data-j-copy]").each(function(i){
			$(this).zclip({
				path: "../../js/lib/zclip/ZeroClipboard.swf",
				copy: function(){
					if(page=="list"){//列表页
						return $(this).parents("li").find(".code").text();
					}else{//详情页
						return $(".dataTrans").text();
					}
				},
				afterCopy:function(){
					$(".g-mask").show().delay(1000).fadeOut();
					$(".g-pop-copy").css("top",$(window).height()/2-30+"px").show().delay(1000).fadeOut();
				}
			});
		});
	}


	function display(page){
		$("[data-j-display]").on("click",function(){
			if(page=="list"){//列表页
				$("xmp.dataTrans").text($(this).parents("ol").siblings(".code").html());
			}
			window.open("../../tpls/extra/display.html#"+urlOpts()["opt"]);
		});
	}


	/*================公有方法================*/
	fModule.xmlToObj=xmlToObj;//把xml转成对象
	fModule.render=render;//把xml数据渲染到html
	fModule.urlOpts=urlOpts;//获取url参数值
	fModule.copyCode=copyCode;//复制源码
	fModule.display=display;//效果展示
	/*================/公有方法================*/

	window.fModule=fModule;
	
})();



