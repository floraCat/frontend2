
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


//文件路径
var Path={
    src:{
        baseUrl:'dev/',
          image:'dev/images/',
           less:'dev/less/',
             js:'dev/js/',
            lib:'dev/lib/',
         plugin:'dev/plugin/'
    },
    dest:{
        baseUrl:'dest/',
          image:'dest/images/',
            css:'dest/css/',
             js:'dest/js/',
            lib:'dest/lib/',
         plugin:'dest/plugin/'
    }
}


//压缩图片
gulp.task('images', function() {
    return gulp.src(Path.src.image+'*.{png,jpg,gif}')
    .pipe($.imagemin())
    .pipe(gulp.dest(Path.dest.image))
});


//压缩背景图
gulp.task('imgs', function() {
    return gulp.src(Path.src.less+'imgs/*.{png,jpg,gif}')
    .pipe($.imagemin())
    .pipe(gulp.dest(Path.dest.css+'imgs'))
});


//less解析为css
gulp.task('less', function() {
    return gulp.src([
        Path.src.less+'*.less',
        '!'+Path.src.less+'pre-var.less',
        '!'+Path.src.less+'pre-mix.less'
        ])
    .pipe($.less())
    .pipe($.minifyCss())
    .pipe(gulp.dest(Path.dest.css))
});


//按依赖合并压缩js
gulp.task('js', function () {
    return gulp.src(Path.src.js+'p-*.js')
        .pipe($.requirejsOptimize(function(file) {
            return {
                mainConfigFile:Path.src.js+'rconfig.js',
                       exclude: [
                           'jq',
                           'common',
                           'header'
                       ]
            };
        }))
        .pipe(gulp.dest(Path.dest.js));
});


//合并压缩
gulp.task('concat_js', function() {
    return gulp.src([
            Path.src.js+"g-functions.js",
            Path.src.js+"g_header.js"
        ])
    .pipe($.uglify())
    .pipe($.concat('g-common.js'))
    .pipe(gulp.dest(Path.dest.js))
});


//压缩其他js
gulp.task('trans_js', function() {
    return gulp.src([
            Path.src.js+"iconfig.js",
            Path.src.js+"rconfig.js",
            Path.src.js+"require.js",
        ])
    .pipe($.uglify())
    .pipe(gulp.dest(Path.dest.js))
});


//压缩/lib
gulp.task('compress_lib', function() {
    return gulp.src([,Path.src.lib+"jquery-1.10.2.js"])
    .pipe($.uglify())
    .pipe(gulp.dest(Path.dest.lib))
});


//压缩/plugin
gulp.task('compress_plugin', function() {
    return gulp.src([,Path.src.plugin+"*.js"])
    .pipe($.uglify())
    .pipe(gulp.dest(Path.dest.plugin))
});


//html文件处理
gulp.task('htmlHandle',function(){
    var src=Path.src.baseUrl;
    var dest=Path.dest.baseUrl;
    var rf=require("fs");
    rf.exists(dest,function(exists){
        if(exists===false){ rf.mkdir(dest); }//dest目录不存在时新建
        //遍历出.html文件
        files=rf.readdirSync(src);
        var fileList=[];
        files.forEach(function(self){
            if(/.html/.test(self)){
                fileList.push(self);
            }
        });
        fileList.forEach(function(file){
            var data=rf.readFileSync(src+file,"utf-8");
            //html替换#include
            var rgExp=/\<\!--#include\s*(\"|\')(.+?)(\"|\')\s*#--\>/g;
            data.replace(rgExp,function($0,$1,$2){
                var data2=rf.readFileSync(src+$2,'utf-8');
                data=data.replace($0,data2);
            });
            rf.writeFile(dest+file,data);
        });
    });

});




//监听整项目文件变动
gulp.task("watch",function(){
    //监听images
    gulp.watch(Path.src.image+'*.{png,jpg,gif}',['images']);
    //监听imgs
    gulp.watch(Path.src.less+'imgs/*.{png,jpg,gif}',['imgs']);
    //监听less
    gulp.watch(Path.src.less+'*.less',['less']);
    //监听js
    gulp.watch(Path.src.js+'*.js',['js','concat_js']);
    //监听其他js
    gulp.watch([
        Path.src.lib+'*.js',
        Path.src.plugin+'*.js'
        ],['trans_js','compress_lib','compress_plugin']);
    //监听html
    gulp.watch(Path.src.baseUrl+'*.html',['htmlHandle']);
});



//项目一
gulp.task("dev",['images','imgs','less','js','concat_js','trans_js','compress_lib','compress_plugin','htmlHandle'],function(){});


//task执行顺序
gulp.task('default', ['dev'],function(){});
