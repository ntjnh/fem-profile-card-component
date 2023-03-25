const { dest, series, src, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

// Style task - compiles SCSS into minified CSS
const scss = () => {
    return src('main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: '*' }))
        .pipe(dest('./'))
        .pipe(browserSync.stream());
};

// Server task - auto-refreshes browser when files are changes
const serve = () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    watch('main.scss', scss);
    watch('index.html').on('change', browserSync.reload);
};

module.exports = {
    default: series(scss),
    sass: scss,
    serve: serve
};
