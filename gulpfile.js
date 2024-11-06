const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass"); // Import Sass compiler
const sourcemaps = require("gulp-sourcemaps");
const eslint = require("gulp-eslint"); // ESLint for JavaScript linting
const concat = require("gulp-concat"); // Concatenate files
const cleanCSS = require("gulp-clean-css"); // Minify CSS
const terser = require("gulp-terser"); // Minify JavaScript
const browserSync = require("browser-sync").create(); // Live reloading server
const path = require("path");

// Paths to files
const paths = {
	pug: {
		src: "./src/pug/**/*.pug",
		dist: "dist",
		pages: "./src/pug/pages/**/*.pug",
	},
	styles: {
		src: "./src/scss/**/*.scss",
		dist: "./dist/css",
		bootstrap: "./node_modules/bootstrap/scss/bootstrap.scss", // Bootstrap entry point
	},
	scripts: {
		src: "./src/js/**/*.js",
		dist: "./dist/js",
		bootstrap: "./node_modules/bootstrap/dist/js/bootstrap.bundle.js", // Bootstrap JS
	},
	fonts: {
		src: "./src/fonts/**/*",
		dist: "./dist/fonts",
	},
	images: {
		src: "./src/images/**/*",
		dist: "./dist/images",
	},
	pic: {
		src: "./src/pic/**/*",
		dist: "./dist/pic",
	},
};

// Task to compile Pug into HTML
function pugTask() {
	return gulp
		.src(paths.pug.pages)
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest(paths.pug.dist))
		.pipe(browserSync.stream());
}

// Task to compile SCSS into CSS with Bootstrap (separate Bootstrap and custom styles)
function sassTask() {
	return gulp
		.src(paths.styles.src) // Only include custom SCSS (Bootstrap подключим отдельно)
		.pipe(sourcemaps.init()) // Инициализируем sourcemaps
		.pipe(sass().on("error", sass.logError)) // Компиляция SCSS
		.pipe(cleanCSS()) // Минификация CSS
		.pipe(sourcemaps.write()) // Запись sourcemaps
		.pipe(gulp.dest(paths.styles.dist)) // Сохраняем в папку dist
		.pipe(browserSync.stream());
}

// Task to handle Bootstrap CSS separately
function bootstrapCSS() {
	return gulp
		.src(paths.styles.bootstrap)
		.pipe(sourcemaps.init()) // Инициализируем sourcemaps для Bootstrap
		.pipe(sass().on("error", sass.logError)) // Компиляция SCSS для Bootstrap
		.pipe(cleanCSS()) // Минификация CSS
		.pipe(sourcemaps.write()) // Запись sourcemaps
		.pipe(gulp.dest(paths.styles.dist)) // Сохраняем в папку dist
		.pipe(browserSync.stream());
}

// Task for linting and compiling JavaScript with Bootstrap (separate Bootstrap and custom JS)
function jsTask() {
	return gulp
		.src([paths.scripts.bootstrap, paths.scripts.src]) // Включаем Bootstrap и кастомный JS
		.pipe(sourcemaps.init()) // Инициализируем sourcemaps
		.pipe(eslint()) // Линтинг JavaScript
		.pipe(eslint.format()) // Форматирование выводов ESLint
		.pipe(terser()) // Минификация JavaScript
		.pipe(sourcemaps.write()) // Запись sourcemaps
		.pipe(gulp.dest(paths.scripts.dist)) // Сохраняем в папку dist
		.pipe(browserSync.stream());
}

// Remaining tasks as previously defined...
function fontsTask() {
	return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dist));
}

async function imagesTask() {
	const imagemin = (await import("gulp-imagemin")).default;
	const imageminGifsicle = (await import("imagemin-gifsicle")).default;
	const imageminMozjpeg = (await import("imagemin-mozjpeg")).default;
	const imageminOptipng = (await import("imagemin-optipng")).default;
	const imageminSvgo = (await import("imagemin-svgo")).default;

	return gulp
		.src(paths.images.src)
		.pipe(
			imagemin([
				imageminGifsicle({ interlaced: true }),
				imageminMozjpeg({ quality: 75, progressive: true }),
				imageminOptipng({ optimizationLevel: 5 }),
				imageminSvgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(gulp.dest(paths.images.dist));
}

async function picTask() {
	const imagemin = (await import("gulp-imagemin")).default;
	const imageminGifsicle = (await import("imagemin-gifsicle")).default;
	const imageminMozjpeg = (await import("imagemin-mozjpeg")).default;
	const imageminOptipng = (await import("imagemin-optipng")).default;
	const imageminSvgo = (await import("imagemin-svgo")).default;

	return gulp
		.src(paths.pic.src)
		.pipe(
			imagemin([
				imageminGifsicle({ interlaced: true }),
				imageminMozjpeg({ quality: 75, progressive: true }),
				imageminOptipng({ optimizationLevel: 5 }),
				imageminSvgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(gulp.dest(paths.pic.dist));
}

// Task to start the server and watch for changes
function watchTask() {
	browserSync.init({
		server: {
			baseDir: "./dist",
		},
	});

	gulp.watch(paths.styles.src, sassTask);
	gulp.watch(paths.pug.src, pugTask);
	gulp.watch(paths.scripts.src, jsTask);
	gulp.watch(paths.images.src, imagesTask);
	gulp.watch(paths.pic.src, picTask);
	gulp.watch(paths.fonts.src, fontsTask);
}

// Define the build task
function buildTask(cb) {
	// Run all the other tasks for the build process
	gulp.series(
		gulp.parallel(
			pugTask,
			bootstrapCSS,
			sassTask,
			jsTask,
			fontsTask,
			imagesTask,
			picTask
		)
	)(cb); // Signal async completion using the callback
}

exports.build = buildTask;

// Define the default tasks
exports.default = gulp.series(
	gulp.parallel(
		pugTask,
		bootstrapCSS,
		sassTask,
		jsTask,
		fontsTask,
		imagesTask,
		picTask
	),
	watchTask
);
