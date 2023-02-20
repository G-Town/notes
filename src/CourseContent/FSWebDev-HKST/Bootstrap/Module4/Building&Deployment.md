## Building and Deployment

&nbsp;

---

&nbsp;

### NPM Scripts

&nbsp;

##### **Watching for Changes and Parallelshell**

* First, we install two NPM packages *onchange* and *parallelshell* as follows:

`npm install --save-dev onchange@3.3.0 parallelshell@3.0.2`

* Then, add the following two script items to *package.json* if you are doing the exercise on a MacOS computer or a 
Linux computer:

```js
  "watch:scss": "onchange 'css/*.scss' -- npm run scss",
  "watch:all": "parallelshell 'npm run watch:scss' 'npm run lite'"
```

* **NOTE:** If you are doing the exercise on a Windows computer, please use the following two script items instead of 
the above:

```js
  "watch:scss": "onchange \"css/*.scss\" -- npm run scss",
  "watch:all": "parallelshell \"npm run watch:scss\" \"npm run lite\""
```

* You will also update the start script as follows:

`"start": "npm run watch:all",`

* Then, type the following at the prompt to start watching for changes to the SCSS file, compile it to CSS, and run the 
server:

`npm start`

* Now, whenever you make any changes to styles.scss file, it will automatically be compiled to the corresponding css 
file.

&nbsp;

##### **Cleaning up a Distribution Folder** 

* Install the *rimraf* npm module by typing the following at the prompt:

`npm install --save-dev rimraf@2.6.2`

* Then, set up the following script:

`  "clean": "rimraf dist",`

&nbsp;

##### **Copying Fonts**

* Your project uses font-awesome fonts. These need to be copied to the distribution folder. To help us do this, install 
the *copyfiles* NPM module globally as follows:

`npm -g install copyfiles@2.0.0`

Remember to use *sudo* on mac and Linux.

* Then set up the following script:

`  "copyfonts": "copyfiles -f node_modules/font-awesome/fonts/* dist/fonts",`

&nbsp;

##### **Compressing and Minifying Images**

* We use the *imagemin-cli* NPM module to help us to compress our images to reduce the size of the images being used in 
our project. Install the *imagemin-cli* module as follows:

`npm -g install imagemin-cli@3.0.0`

Remember to use *sudo* on mac and Linux. **NOTE:** Some students have encountered issues with imagemin-cli not 
installing its plugins due to issues with global permissions on Mac. In that case try

`sudo npm install -g imagemin-cli@3.0.0 --unsafe-perm=true --allow-root`

* Then set up the following script:

`  "imagemin": "imagemin img/* --out-dir='dist/img'",`

&nbsp;

##### **Preparing the Distribution Folder**

* Open *.gitignore* and update it as follows. We do not want the dist folder to be checked into the git repository.

```
node_modules
dist
```

* Then, install the *usemin-cli*, *cssmin*, *uglifyjs* and *htmlmin* NPM packages as follows:

`npm install --save-dev usemin-cli@0.5.1 cssmin@0.4.3 uglifyjs@2.4.11 htmlmin@0.0.7`

* Add the following two scripts to the package.json file:

```json
  "usemin": "usemin contactus.html -d dist --htmlmin -o dist/contactus.html && usemin aboutus.html -d dist --htmlmin 
            -o dist/aboutus.html && usemin index.html -d dist --htmlmin -o dist/index.html",
  "build": "npm run clean && npm run imagemin && npm run copyfonts && npm run usemin"
```

* Open index.html and surround the css links inclusion code as follows:

```html
  <!-- build:css css/main.css -->
  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="node_modules/bootstrap-social/bootstrap-social.css">
  <link href="css/styles.css" rel="stylesheet">
  <!-- endbuild -->
```

* Do the same change in *aboutus.html* and *contactus.html*

* Similarly, open *index.html* and surround the js script inclusion code as follows:

```html
<!-- build:js js/main.js -->
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/tether/dist/js/tether.min.js"></script>
<script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="js/scripts.js"></script>
<!-- endbuild --> 
```

* Do the same change in *aboutus.html* and *contactus.html*

* To build the distribution folder, you can type the following at the prompt:

`npm run build`

* This will build the dist folder containing the files that are a self-contained version of your project. You can now 
copy the contents of this folder to a web server that hosts your website.

&nbsp;

---

&nbsp;

### Grunt

&nbsp;

##### **Installing Grunt**

* At the command prompt, type the following to install Grunt command-line interface (CLI):

`npm install -g grunt-cli@1.2.0`

This will install the Grunt CLI globally so that you can use them in all projects.

* Next install Grunt to use within your project. To do this, go to the *conFusion* folder and type the following at the 
prompt:

`npm install grunt@1.0.2 --save-dev`

This will install local per-project Grunt to use within your project.

&nbsp;

##### **Creating a Grunt File**

* Next you need to create a Grunt file containing the configuration for all the tasks to be run when you use Grunt. To 
do this, create a file named *Gruntfile.js* in the *conFusion* folder.

* Next, add the following code to Gruntfile.js to set up the file to configure Grunt tasks:

```js
'use strict';

module.exports = function (grunt) {
  // Define the configuration for all the tasks
  grunt.initConfig({

  });
};
```

This sets up the Grunt module ready for including the grunt tasks inside the function above.

&nbsp;

##### **Compiling SCSS to CSS**

* Next, we are going to set up our first Grunt task. The SASS task converts the SCSS code to CSS. To do this, you need 
to include some Grunt modules that help us with the tasks. Install the following modules by typing the following at the 
prompt:

```
npm install grunt-sass@2.1.0 --save-dev
npm install time-grunt@1.4.0 --save-dev
npm install jit-grunt@0.10.0 --save-dev
```

The first one installs the Grunt module for SCSS to CSS conversion. The time-grunt module generates time statistics 
about how much time each task consumes, and jit-grunt enables us to include the necessary downloaded Grunt modules when 
needed for the tasks.

* Now, configure the SASS task in the Gruntfile as follows, by including the code inside the function in *Gruntfile.js*:

```js
'use strict';

module.exports = function (grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'css/styles.css': 'css/styles.scss'
        }
      }
    }
  });

  grunt.registerTask('css', ['sass']);

};
```

* Now you can run the grunt SASS task by typing the following at the prompt:

`grunt css`

&nbsp;

##### **Watch and Serve Tasks**

* The final step is to use the Grunt modules watch and browser-sync to spin up a web server and keep a watch on the 
files and automatically reload the browser when any of the watched files are updated. To do this, install the following 
grunt modules:

```
npm install grunt-contrib-watch@1.0.0 --save-dev
npm install grunt-browser-sync@2.2.0 --save-dev
```

* After this, we will configure the browser-sync and watch tasks by adding the following code to the Grunt file:

```js
,
    watch: {
      files: 'css/*.scss',
      tasks: ['sass']
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'css/*.css',
            '*.html',
            'js/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./"
          }
        }
      }
    }
```

* Then add the following task to the Grunt file:

`  grunt.registerTask('default', ['browserSync', 'watch']);`

* Now if you type the following at the command prompt, it will start the server, and open the web page in your default 
browser. It will also keep a watch on the files in the css folder, and if you update any of them, it will compile the 
scss file into css file and load the updated page into the browser (livereload)

`grunt`

&nbsp;

##### **Copying the Files and Cleaning Up the Dist Folder**

* Next you will install the Grunt modules to copy over files to a distribution folder named dist, and clean up the dist 
folder when needed. To do this, install the following Grunt modules:

```
npm install grunt-contrib-copy@1.0.0 --save-dev
npm install grunt-contrib-clean@1.1.0 --save-dev
```

* You will now add the code to perform the copying of files to the dist folder, and cleaning up the dist folder. To do 
this, add the following code to *Gruntfile.js*. This should be added right after the configuration of the SASS task.:

```js
,

    copy: {
      html: {
        files: [
          {
          //for html
          expand: true,
          dot: true,
          cwd: './',
          src: ['*.html'],
          dest: 'dist'
        }]                
      },
      fonts: {
        files: [
        {
          //for font-awesome
          expand: true,
          dot: true,
          cwd: 'node_modules/font-awesome',
          src: ['fonts/*.*'],
          dest: 'dist'
        }]
      }
    },

    clean: {
      build: {
        src: [ 'dist/']
      }
    }
```

* Remember to add the comma after the end of the SASS task.

&nbsp;

##### **Compressing and Minifying Image**

* Next we install the grunt-contrib-imagemin module and use it to process the images. To install this module type at the 
prompt:

`npm install grunt-contrib-imagemin@2.0.1 --save-dev`

* Then, configure the imagemin task as shown below in the Gruntfile:

```js
,
  imagemin: {
    dynamic: {
      files: [{
        expand: true,                  // Enable dynamic expansion
        cwd: './',                   // Src matches are relative to this path
        src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
        dest: 'dist/'                  // Destination path prefix
      }]
    }
  }
```

&nbsp;

##### **Preparing the Distribution Folder and Files**

We are now going to use the Grunt *usemin* module together with concat, *cssmin*, *uglify* and *filerev* to prepare the 
distribution folder. To do this, install the following Grunt modules:

```
npm install grunt-contrib-concat@1.0.1 --save-dev
npm install grunt-contrib-cssmin@2.2.1 --save-dev
npm install grunt-contrib-htmlmin@2.4.0 --save-dev
npm install grunt-contrib-uglify@3.3.0 --save-dev
npm install grunt-filerev@2.3.1 --save-dev
npm install grunt-usemin@3.1.1 --save-dev
```

* Next, update the task configuration within the Gruntfile.js with the following additional code to introduce the new 
tasks:

```js
,

    useminPrepare: {
      foo: {
        dest: 'dist',
        src: ['contactus.html','aboutus.html','index.html']
      },
      options: {
        flow: {
          steps: {
            css: ['cssmin'],
            js:['uglify']
          },
          post: {
            css: [{
              name: 'cssmin',
              createConfig: function (context, block) {
                var generated = context.options.generated;
                generated.options = {
                  keepSpecialComments: 0, rebase: false
                };
              }       
            }]
          }
        }
      }
    },

    // Concat
    concat: {
      options: {
        separator: ';'
      },
  
      // dist configuration is provided by useminPrepare
      dist: {}
    },

    // Uglify
    uglify: {
      // dist configuration is provided by useminPrepare
      dist: {}
    },

    cssmin: {
      dist: {}
    },

    // Filerev
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },
  
      release: {
        // filerev:release hashes(md5) all assets (images, js and css )
        // in dist directory
        files: [{
          src: [
            'dist/js/*.js',
            'dist/css/*.css',
          ]
        }]
      }
    },
  
    // Usemin
    // Replaces all assets with their revved version in html and css files.
    // options.assetDirs contains the directories for finding the assets
    // according to their relative paths
    usemin: {
      html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
      options: {
        assetsDirs: ['dist', 'dist/css','dist/js']
      }
    },

    htmlmin: {                                         // Task
      dist: {                                        // Target
        options: {                                 // Target options
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dist/index.html': 'dist/index.html',  // 'destination': 'source'
          'dist/contactus.html': 'dist/contactus.html',
          'dist/aboutus.html': 'dist/aboutus.html',
        }
      }
    }
```

* Next, update the jit-grunt configuration as follows, to inform it that useminPrepare task depends on the usemin 
package:

```js
require('jit-grunt')(grunt, {
  useminPrepare: 'grunt-usemin'
});
```

* Next, update the Grunt build task as follows:

```js
  grunt.registerTask('build', [
    'clean',
    'copy',
    'imagemin',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);
```

* Now if you run Grunt, it will create a dist folder with the files structured correctly to be distributed to a server 
to host your website. To do this, type the following at the prompt:

`grunt build`

&nbsp;

---

&nbsp;

### Gulp

&nbsp;

##### **Installing Gulp**

* At the command prompt, type the following to install Gulp command-line interface (CLI) globally:

`npm install -g gulp-cli@2.0.1`

This will install the Gulp globally so that you can use it in all projects.

* Next install Gulp to use within your project. To do this, go to the *conFusion* folder and type the following at the 
prompt:

`npm install gulp@3.9.1 --save-dev`

This will install local per-project Gulp to use within your project.

&nbsp;

##### **Install Gulp Plugins for SASS and Browser-Sync**

* Install all the Gulp plugins that you will need for this exercise. To do this, type the following at the command 
prompt:

`npm install gulp-sass@3.1.0  browser-sync@2.23.6 --save-dev`

&nbsp;

##### **Creating a Gulp File**

* Next you need to create a Gulp file containing the tasks to be run when you use Gulp. To do this, create a file named 
*gulpfile.js* in the *conFusion* folder.

&nbsp;

##### **Loading Gulp Plugins**

* Load in all the Gulp plugins by including the following code in the Gulp file:

```js
'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');
```

&nbsp;

##### **Adding Gulp Tasks for SASS and Browser-Sync**

* Next, we will add the code for the SASS task, the Browser-Sync task and the default task as follows:

```js
gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', function () {
  var files = [
    './*.html',
    './css/*.css',
    './img/*.{png,jpg,gif}',
    './js/*.js'
  ];

  browserSync.init(files, {
    server: {
      baseDir: "./"
    }
  });

});

// Default task
gulp.task('default', ['browser-sync'], function() {
  gulp.start('sass:watch');
});
```

* Save the Gulp file

&nbsp;

##### **Running the Gulp Tasks**

* At the command prompt, if you type gulp it will run the default task:

`gulp`

&nbsp;

##### **Copying the Files and Cleaning up the Dist Folder**

* We will now create the tasks for copying the font files and cleaning up the distribution folder. To do this we will 
first install the *del* Node module and require it in the Gulp file as follows:

`npm install del@3.0.0 --save-dev`

```js
var ...
  del = require('del'),
  ...
```

* Next, we will add the code for the Clean task and the copyfonts task as follows:

```js
// Clean
gulp.task('clean', function() {
  return del(['dist']);
});
gulp.task('copyfonts', function() {
  gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./dist/fonts'));
});
```

&nbsp;

##### **Compressing and Minifying Images**

* We will now install the *gulp-imagemin* plugin and configure the *imagemin* task. To do this we install the plugin and 
require it as follows:

`npm install gulp-imagemin@4.1.0 --save-dev`

```js
var ...
  imagemin = require('gulp-imagemin'),
  ...
```

* Next, we create the *imagemin* task as follows:

```js
// Images
gulp.task('imagemin', function() {
  return gulp.src('img/*.{png,jpg,gif}')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'));
});
```

&nbsp;

##### **Preparing the Distribution Folder and Files**

* We now install the gulp-usemin and other related Gulp plugins and require them as follows:

`npm install gulp-uglify gulp-usemin gulp-rev gulp-clean-css gulp-flatmap gulp-htmlmin --save-dev`

```js
var ...
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev'),
  cleanCss = require('gulp-clean-css'),
  flatmap = require('gulp-flatmap'),
  htmlmin = require('gulp-htmlmin');
```

* We configure the usemin and the build task as follows:

```js
gulp.task('usemin', function() {
  return gulp.src('./*.html')
  .pipe(flatmap(function(stream, file){
    return stream
      .pipe(usemin({
        css: [ rev() ],
        html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
        js: [ uglify(), rev() ],
        inlinejs: [ uglify() ],
        inlinecss: [ cleanCss(), 'concat' ]
      }))
  }))
  .pipe(gulp.dest('dist/'));
});
gulp.task('build',['clean'], function() {
  gulp.start('copyfonts','imagemin','usemin');
});
```

* Save the Gulp file

&nbsp;

##### **Running the Gulp Tasks**

* At the command prompt, if you type *gulp build* it will run the build task:

`gulp build`