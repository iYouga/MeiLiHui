var gulp = require('gulp');
var minifyHtml = require('gulp-htmlmin');
var sass = require('gulp-ruby-sass');
var minifyJs = require('gulp-uglify');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

// 压缩html
gulp.task('minifyHtml',function(){
    var options = {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeEmptyAttributes: true
    };
    return gulp.src('./src/html/*.html').pipe(minifyHtml(options)).pipe(gulp.dest('./html/'));
});
//压缩sass
gulp.task('sass',function(){
    return sass('./src/sass/*.scss',{
        sourcemap:false,
        style:'compressed'
    }).pipe(gulp.dest('./dist/css/'));
});
//压缩js
gulp.task('minifyJs',function(){
    return gulp.src('./src/js/*.js').pipe(minifyJs()).pipe(gulp.dest('./dist/js'));
});
//监听html
gulp.task('html', ['minifyHtml','sass','minifyJs'],function(){
    return gulp.src('./html/*.html').pipe(connect.reload());
});
//监听文件更改
gulp.task('default', ['minifyHtml','sass','minifyJs'],function(){
    connect.server({
        port:9001,
        livereload:true
    });
    gulp.watch('./src/html/*.html',['html']);
    gulp.watch('./src/sass/*.scss',['html']);
    gulp.watch('./src/js/*.js',['html']);
});
