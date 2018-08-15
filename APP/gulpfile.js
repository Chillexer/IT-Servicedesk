var gulp         = require( 'gulp' );

// CSS related plugins
var sass         = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );
var minifycss    = require( 'gulp-uglifycss' );

// JS related plugins
var concat       = require( 'gulp-concat' );
var uglify       = require( 'gulp-uglify' );
var babelify     = require( 'babelify' );
var browserify   = require( 'browserify' );
var source       = require( 'vinyl-source-stream' );
var buffer       = require( 'vinyl-buffer' );
var stripDebug   = require( 'gulp-strip-debug' );

// Utility plugins
var rename       = require( 'gulp-rename' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var notify       = require( 'gulp-notify' );
var plumber      = require( 'gulp-plumber' );
var options      = require( 'gulp-options' );
var gulpif       = require( 'gulp-if' );
var concat = require('gulp-concat');

// Browers related plugins
var browserSync  = require( 'browser-sync' ).create();
var reload       = browserSync.reload;

// Project related variables
var projectURL   = 'https://test.dev';

var styleSRC     = './public/css/ServiceDesk/mystyle.scss';
var styleURL     = './public/css/ServiceDesk/compiled/';
var mapURL       = './';

var jsSRC        = './public/js/ServiceDesk/all.js';
var jsURL        = './public/js/ServiceDesk/';

var styleWatch   = './public/css/ServiceDesk/**/*.scss';
var jsWatch      = './public/js/ServiceDesk/modules/*.js';

// Tasks
gulp.task( 'browser-sync', function() {
	browserSync.init({
		proxy: projectURL,
		injectChanges: true,
		open: false
	});
});

gulp.task( 'styles', function() {
	gulp.src( styleSRC )
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe( autoprefixer({ browsers: [ 'last 2 versions', '> 5%', 'Firefox ESR' ] }) )
		.pipe( sourcemaps.write( mapURL ) )
		.pipe( gulp.dest( styleURL ) )
		.pipe( browserSync.stream() );
});

gulp.task( 'js', function() {
	return browserify({
		entries: [jsSRC]
	})
	.transform( babelify, { presets: [ 'env' ] } )
	.bundle()
	.pipe( source( 'ServiceDesk.js' ) )
	.pipe( buffer() )
	.pipe( gulpif( options.has( 'production' ), stripDebug() ) )
	.pipe( sourcemaps.init({ loadMaps: true }) )
	.pipe( uglify() )
	.pipe( sourcemaps.write( '.' ) )
	.pipe( gulp.dest( jsURL ) )
	.pipe( browserSync.stream() );
 });

function triggerPlumber( src, url ) {
	return gulp.src( src )
	.pipe( plumber() )
	.pipe( gulp.dest( url ) );
}

 gulp.task( 'default', ['styles', 'js'], function() {
	gulp.src( jsURL + 'myscript.min.js' )
		.pipe( notify({ message: 'Assets Compiled!' }) );
 });

 gulp.task( 'watch', ['default', 'browser-sync'], function() {
	gulp.watch( styleWatch, [ 'styles' ] );
	gulp.watch( jsWatch, [ 'scripts', reload ] );
	gulp.src( jsURL + 'myscript.min.js' )
		.pipe( notify({ message: 'Gulp is Watching, Happy Coding!' }) );
 });

  
gulp.task('scripts', function() {
    var path = "./public/js/ServiceDesk/modules/"
    gulp.src([path +'Sockets.js', path +'Variables.js',path + 'EventListeners.js', path +'ServiceDesk.js'])
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./public/js/ServiceDesk/')).on("end",function(){
          console.log("finished scripts");
          gulp.start("js").on("end",function(){
              console.log("finished js");
            });
        });
  });