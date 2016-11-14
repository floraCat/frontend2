require([
	'jquery',
	'zclip',
	'../activate'
],function($){
	'use strict';

	//复制代码
    $(".MStyle .copy").zclip({
        path: "../../js/lib/zclip/ZeroClipboard.swf",
        copy: function(){
            return $(this).siblings(".code").text();
        },
        afterCopy:function(){
            $(this).append('<div class="mAlert3">已复制到剪切板</div>');
            $(".mAlert3").animate({'opacity':'1','bottom':'40px'},400).delay(1000).fadeOut(400,function(){
                $(this).remove();
            });
        }
    });

});