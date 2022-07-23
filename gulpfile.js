import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import del from 'del';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-dart-sass';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import terser from 'gulp-terser';

// Styles

export const styles = () => gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
        autoprefixer(),
        csso(),
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());

// HTML

const html = () => gulp.src('source/*.html')
    .pipe(gulp.dest('build'));

// Scripts

const mainScript = () => gulp.src('source/js/main.js')
    // .pipe(terser())
    .pipe(rename('main.js'))
    .pipe(gulp.dest('build/js'));

const vendorScript = () => gulp.src('source/js/vendor.js')
    // .pipe(terser())
    .pipe(rename('vendor.js'))
    .pipe(gulp.dest('build/js'));

// Images

const optimizeImages = () => gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));

const copyImages = () => gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulp.dest('build/img'));

// WebP

const createWebp = () => gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh({
        webp: {},
    }))
    .pipe(gulp.dest('build/img'));

// SVG

const svg = () => gulp.src(['source/img/*.svg', '!source/img/icons/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));

const sprite = () => gulp.src('source/img/icons/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
        inlineSvg: true,
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));

// Copy

const copy = (done) => {
    gulp.src([
        'source/fonts/*.{woff2,woff}',
        'source/*.ico',
    ], {
        base: 'source',
    })
        .pipe(gulp.dest('build'));
    done();
};

// Clean

const clean = () => del('build');

// Server

const server = (done) => {
    browser.init({
        server: {
            baseDir: 'build',
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
};

// Reload

const reload = (done) => {
    browser.reload();
    done();
};

// Watcher

const watcher = () => {
    gulp.watch('source/sass/**/*.scss', gulp.series(styles));
    gulp.watch('source/js/main.js', gulp.series(mainScript));
    gulp.watch('source/js/vendor.js', gulp.series(vendorScript));
    gulp.watch('source/*.html', gulp.series(html, reload));
};

// Build

export const build = gulp.series(
    clean,
    copy,
    optimizeImages,
    gulp.parallel(
        styles,
        html,
        mainScript,
        vendorScript,
        svg,
        sprite,
        createWebp,
    ),
);

// Default

export default gulp.series(
    clean,
    copy,
    copyImages,
    gulp.parallel(
        styles,
        html,
        mainScript,
        vendorScript,
        svg,
        sprite,
        createWebp,
    ),
    gulp.series(
        server,
        watcher,
    ),
);
