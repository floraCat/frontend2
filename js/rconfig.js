(function(window){
	"use strict";

	var require = {
		paths:{
			//依赖包
			'jquery':'../lib/jquery/jquery-1.10.2',
			'jsRender':'../lib/jsrender/jsrender',
			//插件
			'zclip':'../lib/zclip/jquery.zclip.min',
			'cookie':'../lib/cookie/jquery.cookie',
			'fly':'../lib/fly/jquery.fly.min',
			//共用脚本
			'globalFuns':'../global-functions',
			'initRender':'../init-render',
			'globalFunForm':'../global-functions-form'
		},
		shim:{
			'globalFuns':['jquery'],
			'jsRender':['jquery'],
			'zclip':['jquery'],
			'cookie':['jquery'],
			'fly':['jquery'],
			'globalFunForm':['globalFuns']
		}
	}

	window.require = require;

})(window);