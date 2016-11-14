require([
	'jquery',
	'cookie',
	'zclip',
	'../activate',
	'globalFunForm'
],function($){
	'use strict';

		//源码存.dataTrans
		var cookie=$.cookie("form")
        var rsStr=formModule.formCode(cookie);
        $(".dataTrans").text(rsStr);

        //列举每个控件名称
        var arr_cookie=formModule.cookieToArr();
        var ttls=[];
        for(var i in arr_cookie){
        	var ttl=arr_cookie[i][0];
        	ttls.push(ttl);
        };
        var str_ttl=ttls.join(" / ");
        $(".p-name .cont").text(str_ttl);

        //查看效果
        fModule.display();

        setTimeout(function(){
        	//源码复制
        	fModule.copyCode();
        },100);

});