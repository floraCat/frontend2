require([
	'jquery',
	'cookie',
	'../activate',
    'globalFunForm'
],function($){
	'use strict';

        //清空控件清单
        formModule.clearCookie();

        //重载时被选中的默认.on + cookie控件数
        formModule.defaultOn();
        
        //购物车列表
        function cookieList(){
            $(".listCart .tr").remove();
            var arr=formModule.cookieToArr();
            for(var i in arr){
                var html=
                    '<tr class="tr">'
                        +'<td class="sort">'+(i+1)+'</td>'
                        +'<td class="img"><a target="_blank" href="col_handle.php?page=form&col=form&folder=base&_temp='+arr[i][0]+'"><img src="'+arr[i][1]+'" /></a></td>'
                        +'<td class="ttl">'+arr[i][0]+'</td>'
                        +'<td><a class="first">最前</a><a class="last">最后</a><a class="up">向上一级</a></td>'
                        +'<td><a class="del">删除</a></td>'
                    +'</tr>';
                    $(".listCart").append(html);
            }
        }
        cookieList();

        //最前
        $(".listCart").on("click",".first",function(){
            var index=$(this).parents(".tr").index()-1;
            var arr=$.cookie("form").split("#");
            var rsStr="";
            for(var i in arr){
                if(i!=index){ rsStr+="#"+arr[i];}
            }
            rsStr=arr[index]+rsStr;
            $.cookie("form",rsStr,{path:'/'});
            cookieList();
        });

        //最后
        $(".listCart").on("click",".last",function(){
            var index=$(this).parents(".tr").index()-1;
            var arr=$.cookie("form").split("#");
            var rsStr="";
            for(var i in arr){
                if(i!=index){ rsStr+=arr[i]+"#";}
            }
            rsStr=rsStr+arr[index];
            $.cookie("form",rsStr,{path:'/'});
            cookieList();
        });

        //向上一级
        $(".listCart").on("click",".up",function(){
            var index=$(this).parents(".tr").index()-1;
            var arr=$.cookie("form").split("#");
            var rsArr=[];
            for(var i in arr){
                if(i==index && i!=0){
                    rsArr[i]=arr[parseInt(i)-1];
                    rsArr[parseInt(i)-1]=arr[i];
                }else{
                    rsArr[i]=arr[i];
                }
            }
            var rsStr=rsArr.join("#");
            $.cookie("form",rsStr,{path:'/'});
            cookieList();
        });

        //删除
        $(".listCart").on("click",".del",function(){
            if(confirm("确定要删掉此条目吗？")){
                var index=$(this).parents(".tr").index()-1;
                var arr=$.cookie("form").split("#");
                var rsStr="";
                for(var i in arr){
                    if(i!=index){ rsStr+=arr[i]+"#";}
                }
                rsStr=rsStr.substr(0,rsStr.length-1);
                $.cookie("form",rsStr,{path:'/'});
                $(this).parents(".tr").remove();
            }
        });

        //查看效果
        $(".viewForm").click(function(){
            var cookie=$.cookie("form")
            var rsStr=formModule.formCode(cookie);
            $(".dataTrans").html(rsStr);
            window.open("../../tpls/extra/display.html");

        });


});