const { src, dest } = require("gulp");
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const del = require("del");
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const group_media = require("gulp-group-css-media-queries");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const replace = require("gulp-replace");
const ghpages = require("gh-pages");

// Folders
let project_folder = "build";
let source_folder = "src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/scripts.js",
    img: source_folder + "/img/**/*.{png,jpg,jpeg,ico,svg,webp}",
    fonts: source_folder + "/fonts/*",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{png,jpg,jpeg,ico,svg,webp}",
    fonts: source_folder + "/fonts/*",
  },
  clean: "./" + project_folder + "/",
};

// Browser Sync
function browserSync() {
  browsersync.init({
    server: { baseDir: "./" + project_folder + "/" },
    port: 3000,
    notify: false,
  });
}

// HTML
function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(replace("../img/", "img/"))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

// Images
function images() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

// Fonts
function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream());
}

// Images compress
function img() {
  return src(path.src.img)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(path.build.img));
}

// JS
function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

// CSS
function css() {
  return src(path.src.css)
    .pipe(scss({ outputStyle: "expanded" }))
    .pipe(group_media())
    .pipe(
      autoprefixer({ cascade: true, overrideBrowserslist: ["last 5 versions"] })
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

// Watch
function watchFiles() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.css, css);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, images);
  gulp.watch(path.watch.fonts, fonts);
}

// Clean
function clean() {
  return del(path.clean);
}

// Build
let build = gulp.series(gulp.parallel(html, js, css, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

// Deploy  gh-pages
gulp.task("deploy", (done) => {
  console.log("Deploying to gh-pages...");
  ghpages.publish(
    "build",
    {
      branch: "gh-pages",
      repo: "git@github.com:go-doc-web/face-masks-test.git",
    },
    (err) => {
      if (err) {
        console.error("Deploy error:", err);
      } else {
        console.log("Deploy completed!");
      }
      done();
    }
  );
});

// Exsports
exports.img = img;
exports.images = images;
exports.js = js;
exports.html = html;
exports.css = css;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
