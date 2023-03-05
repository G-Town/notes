## Web Tools

&nbsp;

---

&nbsp;

### Bootstrap and JQuery

&nbsp;

##### **Adding the Carousel Control Buttons**

* We will introduce two new buttons into the carousel component that we already included in the *index.html* page. 
To add the two buttons to the carousel, add the following code to the end of the carousel:

```html
        <div class="btn-group" id="carouselButton">
          <button class="btn btn-danger btn-sm" id="carousel-pause">
            <span class="fa fa-pause"></span>
          </button>
          <button class="btn btn-danger btn-sm" id="carousel-play">
            <span class="fa fa-play"></span>
          </button>
        </div>
```

We are adding the two buttons inside a button group with the ID carouselButtons. The two buttons contain the pause and 
play glyphicons to indicate their corresponding actions.

&nbsp;

##### **Adding CSS Class for the Buttons**

* Next, we add the following CSS class to *styles.css* file to position the buttons at the bottom-right corner of the 
carousel:

```css
#carouselButton {
  right:0px;
  position: absolute;
  bottom: 0px;
  z-index: 1;
}
```

&nbsp;

##### **Adding JavaScript Code**

* Finally we add the following JavaScript code to activate the buttons:

```html
  <script>
    $(document).ready(function(){
      $("#mycarousel").carousel( { interval: 2000 } );
      $("#carousel-pause").click(function(){
        $("#mycarousel").carousel('pause');
      });
      $("#carousel-play").click(function(){
        $("#mycarousel").carousel('cycle');
      });
    });
  </script>
```

&nbsp;

---

&nbsp;

### More Bootstrap and JQuery

&nbsp;

##### **Modifying the Carousel Control Buttons**

* We will modify the carousel control buttons in the carousel component that we already included in the *index.html* 
page. Instead of two buttons, we will use a single button that will indicate if the carousel is currently cycling or 
paused. Furthermore we can use the button to toggle the carousel cycling behavior:

```html
          <button class="btn btn-danger btn-sm" id="carouselButton">
            <span id="carousel-button-icon" class="fa fa-pause"></span>
          </button>
```

We are adding a single button inside a button group with the ID carouselButton. The buttons will show either as a pause 
or play button based on the current behavior of the carousel.

&nbsp;

##### **Modifying JavaScript Code**

* Finally we modify the JavaScript code to control the behavior of the carousel and also show the appropriate button:

```js
      $("#carouselButton").click(function(){
        if ($("#carouselButton").children("span").hasClass('fa-pause')) {
          $("#mycarousel").carousel('pause');
          $("#carouselButton").children("span").removeClass('fa-pause');
          $("#carouselButton").children("span").addClass('fa-play');
        }
        else if ($("#carouselButton").children("span").hasClass('fa-play')){
          $("#mycarousel").carousel('cycle');
          $("#carouselButton").children("span").removeClass('fa-play');
          $("#carouselButton").children("span").addClass('fa-pause');                    
        }
      });
```

&nbsp;

---

&nbsp;

### Less

&nbsp;

##### **Adding Less Variables**

* Open the *conFusion* project in a text editor of your choice. In the css folder, create a file named *styles.less*. 
We will add the Less code into this file.

* Add the following Less variables into the file:

```css
@lt-gray: #ddd;
@background-dark: #512DA8;
@background-light: #9575CD;
@background-pale: #D1C4E9;

// Height variables
@carousel-item-height: 300px;
```
We have just added a few color and a height variable. We will make use of these variables while defining the classes.

&nbsp;

##### **Less Mixins**

* Next we add a mixin into the file as follows:

```css
.zero-margin (@pad-up-dn: 0px, @pad-left-right: 0px) {
	margin:0px auto;
	padding: @pad-up-dn @pad-left-right;
}
```

We will make use of this to define several row classes next.

* Using the variables and Mixin class that we defined earlier, add the following row classes to the file:

```css
.row-header{
  .zero-margin();
}

.row-content {
  .zero-margin(50px,0px);
  border-bottom: 1px ridge;
  min-height:400px;
}

.footer{
  background-color: @background-pale;
  .zero-margin(20px, 0px);
}

.jumbotron {
  .zero-margin(70px,30px);
  background: @background-light ;
  color:floralwhite;
}

address{
  font-size:80%;
  margin:0px;
  color:#0f0f0f;
}

body{
  padding:50px 0px 0px 0px;
  z-index:0;
}

.navbar-dark {
  background-color: @background-dark;
}

.tab-content {
  border-left: 1px solid @lt-gray;
  border-right: 1px solid @lt-gray;
  border-bottom: 1px solid @lt-gray;
  padding: 10px;
}
```

Note the use of the variables and the mixin with various parameters in defining the classes.

&nbsp;

##### **Nesting Selectors**

* Next we add a carousel class to illustrate the use of nesting of classes in Less, as follows:

```css
.carousel {
  background:@background-dark;

  .carousel-item {
    height: @carousel-item-height;
    img {
      position: absolute;
      top: 0;
      left: 0;
      min-height: 300px;
    }
  }
}

#carouselButton {
  right:0px;
  position: absolute;
  bottom: 0px;
  z-index: 1;
}
```

&nbsp;

##### **Installing and using the lessc Compiler**

* Now we install the node module to support the compilation of the Less file. To do this, type the following at the 
command prompt:

```powershell
npm install -g less@2.7.2
```

This will install the *less* NPM module globally so that it can be used by any project. **Note: if you are executing 
this on a Mac or Linux machine, you may need to add "sudo" to the beginning of this command**. This will make available 
the *lessc* compiler for us so that we can compile Less files.

* Next, go to the CSS folder on your machine and rename the *styles.css* file that you have there as *styles-old.css*. 
This is to save the CSS file that we have been using so far. We will be creating a new *styles.css* file by compiling 
the Less file.

* Next type the following at the command prompt to compile the Less file into a CSS file:

```powershell
lessc styles.less styles.css
```

&nbsp;

---

&nbsp;

### Scss

&nbsp;

##### **Adding Scss Variables**

* Open the *conFusion* project in a text editor of your choice. In the css folder, create a file named styles.scss. We 
will add the Scss code into this file.

* Add the following Scss variables into the file:

```css
$lt-gray: #ddd;
$background-dark: #512DA8;
$background-light: #9575CD;
$background-pale: #D1C4E9;

// Height variables
$carousel-item-height: 300px;
```

We have just added a few color and a height variable. We will make use of these variables while defining the classes.

&nbsp;

##### **Scss Mixins**

* Next we add a mixin into the file as follows:

```css
@mixin zero-margin($pad-up-dn, $pad-left-right) {
	margin:0px auto;
	padding: $pad-up-dn $pad-left-right;
}
```

We will make use of this to define several row classes next.

* Using the variables and Mixin class that we defined earlier, add the following row classes to the file:

```css
.row-header{
  @include zero-margin(0px,0px);
}

.row-content {
  @include zero-margin(50px,0px);
  border-bottom: 1px ridge;
  min-height:400px;
}

.footer{
  background-color: $background-pale;
  @include zero-margin(20px, 0px);
}

.jumbotron {
  @include zero-margin(70px,30px);
  background: $background-light ;
  color:floralwhite;
}

address{
  font-size:80%;
  margin:0px;
  color:#0f0f0f;
}

body{
  padding:50px 0px 0px 0px;
  z-index:0;
}

.navbar-dark {
  background-color: $background-dark;
}

.tab-content {
  border-left: 1px solid $lt-gray;
  border-right: 1px solid $lt-gray;
  border-bottom: 1px solid $lt-gray;
  padding: 10px;
}
```

Note the use of the variables and the mixin with various parameters in defining the classes.

&nbsp;

##### **Nesting Selectors**

* Next we add a carousel class to illustrate the use of nesting of classes in Scss, as follows:

```css
.carousel {
  background:$background-dark;

  .carousel-item {
    height: $carousel-item-height;
    img {
      position: absolute;
      top: 0;
      left: 0;
      min-height: 300px;
    }
  }
}

#carouselButton {
  right:0px;
  position: absolute;
  bottom: 0px;
  z-index: 1;
}
```

&nbsp;

##### **Installing and using the node-sass module**

* Now we install the node module to support the compilation of the Scss file to a CSS file. To do this, type the 
following at the command prompt:

```powershell
npm install --save-dev node-sass@4.7.2
```

This will install the *node-sass* NPM module into your project and also add it as a development dependency in your 
*package.json* file.

* Next open your package.json file and add the following line into the scripts object there. This adds a script to 
enable the compilation of the Scss file into a CSS file:

```css
    "scss": "node-sass -o css/ css/"
```

* In order to transform the Scss file to a CSS file, type the following at the prompt:

```powershell
npm run scss
```