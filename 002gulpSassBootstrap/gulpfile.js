const   gulp        = require("gulp"),
        // uglify = require("gulp-uglify"),
        sass        = require("gulp-sass"),
        concat      = require("gulp-concat"),
        autoPrefix  = require("gulp-autoprefixer"),
        rename      = require("gulp-rename"),
        cleanCSS    = require("gulp-clean-css");

const sassFiles = [
    "./src/styles/_variables.scss",
    "./src/styles/custom.scss"
];

const vendorJsFiles = [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/popper.js/dist/umd/popper.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js"
];

//compile sass
gulp.task("sass", (done)=>{
    gulp
    .src(sassFiles)
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("main.css"))
    .pipe(gulp.dest("./public/css"))
    .pipe(
        autoPrefix()
        // autoPrefix({
        //   browsers: ["last 2 versions"],
        //   cascade: false
        // })
    )
    .pipe(cleanCSS())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest("./public/css/"));
    done();
})

//minify vender js
gulp.task("minifyVendorJs", (done)=>{
    gulp.src(vendorJsFiles)
    .pipe(concat("vendor.min.js"))
    .pipe(gulp.dest("./public/js"));
    done();
})

//watch
gulp.task("watch", ()=>{
    gulp.watch(sassFiles, gulp.series("sass"));
    gulp.watch(vendorJsFiles, gulp.series("minifyVendorJs"))
})

// build
gulp.task("build", gulp.parallel(["minifyVendorJs", "sass"]))

// default
gulp.task("default", gulp.series("build"))