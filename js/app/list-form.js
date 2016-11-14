require([
	'jquery',
	'cookie',
	'zclip',
	'fly',
	'../activate',
],function($){
	'use strict';

	var fModule=window.fModule || {};

	function callback_list(){

		//问号
		$(".btn_form i").click(function(){
			$(".btn_form .desc").toggle();
		});

		//清空控件清单
	    formModule.clearCookie();

		//代码复制
		fModule.copyCode("list");

		//效果展示
		fModule.display("list");

		//重载时被选中的默认.on + cookie控件数
		formModule.defaultOn();

		//被选中时
		$(".p-list").on("click","li .check",function(event){
			var that=$(this);
			var num=$(".btn_form a p").text();
			if(!$(this).parents("li").hasClass("on")){//点选前有.on
				$(this).parents("li").addClass("on");
				var offset = $(".btn_form").offset();
				var addcar = $(this);
				var img = addcar.parents("li").find('img').attr('src');
				var flyer = $('<img class="u-flyer" style="display: block;width: 50px;height: 50px;border-radius: 50px;position: fixed;z-index: 9999;" src="'+img+'">');
				flyer.fly({
					start: {
						left: event.pageX,
						top: event.pageY-$(window).scrollTop()-80
					},
					end: {
						left: offset.left+250,
						top: offset.top-$(window).scrollTop()+10,
						width: 0,
						height: 0
					},
					onEnd: function(){
						this.destory();
						var cur_num=$("#Top_cart .Num").text();
						num=parseInt(num)+1;
						$(".btn_form a p").text(num);
						//新数据添加到cookie
						var ttl=that.parents("li").find("h4 span").text();
						var img=that.parents("li").find("img").attr("src");
						var addArr=[];
						addArr[0]=ttl;
						addArr[1]=img;
						formModule.addToCookie(addArr);

					},
					speed:2.5
				});
			}else{//点选前无.on
				$(this).parents("li").removeClass("on");
				num=parseInt(num)-1;
				$(".btn_form a p").text(num);
				//cookie中去掉对应数据
				var ttl=that.parents("li").find("h4 span").text();
				formModule.subToCookie(ttl);
			}
		});

	}

	/*================公有方法================*/
	fModule.callback_list=callback_list;//渲染list后回调
	/*================/公有方法================*/

	window.fModule=fModule;

});