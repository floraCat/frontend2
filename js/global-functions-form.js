/*公共函数[针对表单]*/
(function(){

	'use strict';

	var formModule=window.formModule || {};


    
    function arrToCookie(arr){
        var temp1=[];
        for(var i in arr){
            var str_unit=arr[i].join(",");
            temp1.push(str_unit);
        }
        var str_cookie=temp1.join("#");
        $.cookie("form",str_cookie,{path:'/'});
    }


    function cookieToArr(){
        var cookie=$.cookie("form") || "";
        if(cookie!=""){
            var arr=cookie.split("#");
            for(var i in arr){
                arr[i]=arr[i].split(",")
            }
        }else{ var arr=[];}
        return arr;
    }


    function addToCookie(addArr){
        var arr=cookieToArr();
        arr.push(addArr);
        var str_cookie=arrToCookie(arr);
        $.cookie("form",str_cookie,{path:'/'});
    }


    function subToCookie(ttl){
        var arr=cookieToArr();
        var rsArr=[];
        for(var i in arr){
            if(arr[i][0]!=ttl){
                rsArr.push(arr[i]);
            }
        }
        var str_cookie=arrToCookie(arr);
        $.cookie("form",str_cookie,{path:'/'});
    }


    function clearCookie(){
        $("[data-j-clearCookie]").on("click",function(){
            $.cookie("form","",{path:'/'});
            window.location.reload();
        });
    }


    function defaultOn(){
        var arr=cookieToArr();
        for(var i in arr){
            $("[data-trans="+arr[i][0]+"]").addClass("on");
        }
        var length=arr.length;
        $("[data-j-cartNum]").text(length);
    }


    function formCode(cookie){
        var arr=cookieToArr();
        var arr_style=[];
        var arr_html=[];
        var arr_script=[];
        for(var i in arr){
            var url='../../xmls/form/articles/'+arr[i][0]+'.xml';
            $.ajax({
                url:url,
                async:false,
                success:function(rs){
                    var data=fModule.xmlToObj($(rs).children(0));
                    arr_style.push(data._style_);
                    arr_html.push(data._html_);
                    arr_script.push(data._script_);
                }
            });
        }
        var rs_style=unique(arr_style.join("\n").split("}"));//style去重
        var rs_js=unique(arr_script);//js去重
        var rsStr='<style>'
                  +"\n"+'form{ width:500px; margin:10px auto; }'
                  +"\n"+rs_style.join("}")
                  +'</style>'
                  +"\n"+'<form class="p-form">'+"\n"+arr_html.join("\n")+'</form>'
                  +"\n"+'<script>'+rs_js.join("\n")+'</script>';
        return rsStr;
    }


    //数组去重
    var unique=function(arr){
        var rs=[];
        var obj={};
        if(arr.length>1){
            for(var i=0; i<arr.length; i++){
                var arr2=arr[i].replace(/\s/g, "");//去掉所有空格
                if(!obj[arr2]){
                    rs.push(arr[i]);
                    obj[arr2]=1;
                }
            }
        }
        return rs;
    }


	/*================公有方法================*/
    formModule.arrToCookie=arrToCookie;//指定数组转cookie字符串
    formModule.cookieToArr=cookieToArr;//cookie字符串转数组
    formModule.clearCookie=clearCookie;//清空cookie
    formModule.addToCookie=addToCookie;//增加到cookie记录
    formModule.subToCookie=subToCookie;//cookie去掉有指定ttl的记录
    formModule.defaultOn=defaultOn;//cookie有记录的条目+.on及及cookie控件数
	formModule.formCode=formCode;//cookie调取xml数据拼接html
	/*================/公有方法================*/

	window.formModule=formModule;
	
})();



