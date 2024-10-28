const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass')); // Import Sass compiler
const eslint = require('gulp-eslint'); // ESLint for JavaScript linting
const concat = require('gulp-concat'); // Concatenate files
const cleanCSS = require('gulp-clean-css'); // Minify CSS
const terser = require('gulp-terser'); // Minify JavaScript
const browserSync = require('browser-sync').create(); // Live reloading server

// Paths to files
const paths = {
	pug: {
		src: './src/pug/**/*.pug', // Source Pug files
		dist: 'dist', // Destination for compiled HTML
		pages: './src/pug/pages/**/*.pug', // Source for Pug pages
	},
	styles: {
		src: './src/scss/**/*.scss', // Source SCSS files
		dist: './dist/css', // Destination for compiled CSS
	},
	scripts: {
		src: './src/js/**/*.js', // Source JavaScript files
		dist: './dist/js', // Destination for compiled JavaScript
	},
	fonts: {
		src: './src/fonts/**/*', // Source font files
		dist: './dist/fonts', // Destination for fonts
	},
	images: {
		src: './src/images/**/*', // Source image files
		dist: './dist/images', // Destination for images
	},
	pic: {
		src: './src/pic/**/*', // Source additional image files
		dist: './dist/pic', // Destination for additional images
	},
};

// Task to compile Pug into HTML
function pugTask() {
	return gulp
		.src(paths.pug.pages) // Get Pug page files
		.pipe(pug({ pretty: true })) // Compile to HTML with pretty formatting
		.pipe(gulp.dest(paths.pug.dist)) // Save compiled HTML to destination
		.pipe(browserSync.stream()); // Inject changes into the browser
}

// Task to compile SCSS into CSS
function sassTask() {
	return gulp
		.src(paths.styles.src) // Get SCSS files
		.pipe(sass().on('error', sass.logError)) // Compile SCSS and handle errors
		.pipe(cleanCSS()) // Minify the compiled CSS
		.pipe(gulp.dest(paths.styles.dist)) // Save CSS to destination
		.pipe(browserSync.stream()); // Inject changes into the browser
}

// Task for linting and compiling JavaScript
function jsTask() {
	return gulp
		.src(paths.scripts.src) // Get JavaScript files
		.pipe(eslint()) // Lint the JavaScript files
		.pipe(eslint.format()) // Format the ESLint results
		.pipe(gulp.dest(paths.scripts.dist)) // Save compiled JS to destination
		.pipe(browserSync.stream()); // Inject changes into the browser
}

// Task to copy font files to the destination
function fontsTask() {
	return gulp.src(paths.fonts.src) // Get font files
		.pipe(gulp.dest(paths.fonts.dist)); // Save fonts to destination
}

// Task to optimize images
async function imagesTask() {
	const imagemin = (await import('gulp-imagemin')).default; // Import imagemin
	const imageminGifsicle = (await import('imagemin-gifsicle')).default; // Import Gifsicle plugin
	const imageminMozjpeg = (await import('imagemin-mozjpeg')).default; // Import Mozjpeg plugin
	const imageminOptipng = (await import('imagemin-optipng')).default; // Import OptiPNG plugin
	const imageminSvgo = (await import('imagemin-svgo')).default; // Import SVGO plugin

	return gulp.src(paths.images.src) // Get image files
		.pipe(imagemin([ // Optimize images with specified plugins
			imageminGifsicle({ interlaced: true }),
			imageminMozjpeg({ quality: 75, progressive: true }),
			imageminOptipng({ optimizationLevel: 5 }),
			imageminSvgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(gulp.dest(paths.images.dist)); // Save optimized images to destination
}

// Task to optimize additional images (in the 'pic' folder)
async function picTask() {
	const imagemin = (await import('gulp-imagemin')).default; // Import imagemin
	const imageminGifsicle = (await import('imagemin-gifsicle')).default; // Import Gifsicle plugin
	const imageminMozjpeg = (await import('imagemin-mozjpeg')).default; // Import Mozjpeg plugin
	const imageminOptipng = (await import('imagemin-optipng')).default; // Import OptiPNG plugin
	const imageminSvgo = (await import('imagemin-svgo')).default; // Import SVGO plugin

	return gulp.src(paths.pic.src) // Get additional image files
		.pipe(imagemin([ // Optimize images with specified plugins
			imageminGifsicle({ interlaced: true }),
			imageminMozjpeg({ quality: 75, progressive: true }),
			imageminOptipng({ optimizationLevel: 5 }),
			imageminSvgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(gulp.dest(paths.pic.dist)); // Save optimized additional images to destination
}

// Task to start the server and watch for changes
function watchTask() {
	browserSync.init({ // Initialize BrowserSync
		server: {
			baseDir: './dist', // Set base directory for the server
		},
	});

	// Watch for changes in the specified files and run the corresponding tasks
	gulp.watch(paths.styles.src, sassTask);
	gulp.watch(paths.pug.src, pugTask);
	gulp.watch(paths.scripts.src, jsTask);
	gulp.watch(paths.images.src, imagesTask);
	gulp.watch(paths.pic.src, picTask);
	gulp.watch(paths.fonts.src, fontsTask);
}

// Define the default tasks
exports.default = gulp.series( // Run tasks in series
	gulp.parallel(pugTask, sassTask, jsTask, fontsTask, imagesTask, picTask), // Run tasks in parallel
	watchTask // Start watching for changes
);
