'use strict'; 

var gulp = require('gulp'), 
	rename = require('gulp-rename'), 
	gutil = require('gulp-util'), 
	livereload = require('gulp-livereload'), 
	changed = require('gulp-changed'), 
	cache = require('gulp-cache'), 
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'), 
	imagemin = require('gulp-imagemin'), 
	pngquant = require('imagemin-pngquant'),
	newer = require('gulp-newer'),
	debug = require('gulp-debug'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	pug = require('gulp-pug'),
	babel = require('gulp-babel');

var autoprefixer = require('autoprefixer');

var postcss = require('gulp-postcss'), 
	postcssImport = require("postcss-import"), 
	postcssNested = require("postcss-nested"), 
	postcssVars = require("postcss-simple-vars"), 
	postcssMixins = require('postcss-mixins'),
	postcssAssets = require('postcss-assets'), 
	postcssUrl = require('postcss-url'), 
	postcssCalc = require('postcss-calc'),
	postcssStrip = require('postcss-strip-units'),
	postcssData = require('postcss-data-packer');

var srcPath = { 
	assets: 'src/assets',
	css: 'src/css/', 
	img: 'src/img/', 
	js: 'src/js/' 
}

var publicPath = {
	assets: 'public/assets',
	css: 'public/css/', 
	img: 'public/img/', 
	js: 'public/js/' 
} 


var browserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] 


/* Build Assets
----------------------------------------------------------------*/ 
gulp.task('assets', function () {
	return gulp.src(srcPath.assets + '/**/*.pug', {since: gulp.lastRun('assets')})
	.pipe(newer(srcPath.assets + '/**/*.pug'))
	.pipe(debug({'title':' assets'}))
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'Assets',
			   message: err.message
			}
		})
	}))
	.pipe(cache(pug({
		pretty: true
	})))
	.pipe(gulp.dest(publicPath.assets))
	.pipe(livereload());
});


/* Build Image 
----------------------------------------------------------------*/ 
gulp.task('img', function() { 
	return gulp.src(srcPath.img + '/**/*.{jpg,jpeg,png,gif}')
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'Image',
			   message: err.message
			}
		})
	}))
	.pipe(changed(publicPath.img)) 
	.pipe(cache(imagemin({ 
		progressive: true,
		interlaced: true, 
		svgoPlugins: [{removeViewBox: false}], 
		use: [pngquant()]
	}))) 
	.pipe(gulp.dest(publicPath.img))
	.pipe(livereload());
}); 

/* Build Styles
----------------------------------------------------------------*/ 
gulp.task('css', function () { 
	var processors = [ 
		postcssImport({ 
			from: srcPath.css + '_main.css', 
			path: srcPath.css + '/**/*.css', 
			glob: true 
		}),
		postcssAssets({ 
			loadPaths: [ publicPath.img ] 
		}),
		postcssUrl({ 
			url: 'inline', 
			maxSize: 7, 
			basePath: process.cwd() 
		}),
		postcssMixins, 
		postcssVars, 
		postcssNested,
		postcssCalc,
		postcssStrip,
		autoprefixer({browsers: browserList}),
		postcssData({ 
			dest: { 
				path: publicPath.css + '/main_data.css', 
				map: { 
					inline: false, 
					annotation: 'maps/main_data.css.map' 
				}
			} 
		})
	];

	return gulp.src(srcPath.css + '_main.css')
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'Styles',
			   message: err.message
			}
		})
	}))
	.pipe(postcss(processors))
	.pipe(rename('main.css'))
	.pipe(gulp.dest(publicPath.css))
	.pipe(cleanCSS())
	.pipe(sourcemaps.init())
	.pipe(rename('main.min.css'))
	.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest(publicPath.css))
	.pipe(livereload()); 
}); 

/* Build Java Script
----------------------------------------------------------------*/ 
 gulp.task('js', function () { 
	return gulp.src(srcPath.js + '/**/*.js')
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'JavaScript',
			   message: err.message
			}
		})
	}))
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(concat('main.js'))
	.pipe(gulp.dest(publicPath.js))
	.pipe(rename('main.min.js')) 
	.pipe(uglify()) 
	.pipe(gulp.dest(publicPath.js))
	.pipe(livereload());
});

/* Watch
----------------------------------------------------------------*/ 
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(srcPath.assets + '/**/*.pug', gulp.series('assets')); // Отслеживание файлов .html
	gulp.watch(srcPath.img + '/**/*.{jpg,jpeg,png,gif}', gulp.series('img')); // Отслеживание файлов изображений
	gulp.watch(srcPath.css + '/**/*.css', gulp.series('css')); // Отслеживание файлов .css
	gulp.watch(srcPath.js + '/**/*.js', gulp.series('js')); // Отслеживание файлов .js
});
gulp.task('default', gulp.parallel('assets', 'css', 'js', 'watch'));