# **Navbar and Breadcrumbs**

&nbsp;

### **Create a basic navigation bar**

&nbsp;

* We will now add a simple navigation bar to the web page so that it provides links to the other pages on the website. 
Start by adding the following code to the body just above the header jumbotron.

```html
<nav class="navbar navbar-dark navbar-expand-sm bg-primary fixed-top">
    <div class="container">
        <a class="navbar-brand" href="#">Ristorante Con Fusion</a>
        <ul class="navbar-nav">
            <li class="nav-item active"><a class="nav-link" href="#">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="./aboutus.html">About</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Menu</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
        </ul>
    </div>
</nav>
```

In the above code, we can see the use of the nav element to specify the navigation information for the website. This nav 
element is styled by the *navbar* that declares it as a navigation bar, and the *navbar-inverse* class to specify that 
the page should use the dark navigation bar. You will now notice the addition of a link with the name of the restaurant. 
This is the brand name for the website. You can replace this with the logo for the website. This is created by the 
**<a class="navbar-brand">** tag. In addition the inner ul is used to specify the items to be put in the navigation bar. 
This *ul* is styled with *navbar-nav* class to specify that the items should be displayed inline inside the navigation 
bar. We also use the container class inside the navigation bar.

&nbsp;

### **Creating a responsive navigation bar**

&nbsp;

* We would like the navigation bar elements to collapse for shorter screens, to be replaced by a toggle button so that 
the items can be toggled on or off when required on small and extra small screens. This can be achieved by adding the 
following code to the navigation bar, just below the container div.

```html
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
    <span class="navbar-toggler-icon"></span>
</button>
```

This creates a button with three horizontal lines. For medium to extra large screens, this button is hidden. For small 
and extra small screens, this button becomes visible. This button will act as the toggle for the navbar items.

* To hide the items from the navigation bar for the small screens, we need to enclose the *ul* within another div as 
follows:

```html
<div class="collapse navbar-collapse" id="Navbar">
    <ul class="navbar-nav"> ... </ul>
</div>
```

By doing this, we are specifying that this div with *collapse* and *navbar-collapse* classes and with the id *Navbar* 
will be collapsed on small and xs screens, but can be toggled on or off when the toggle button is clicked. Note the use 
of `data-toggle="collapse" data-target="#Navbar"` within the button above. This specifies that the menu items are 
collapsed on small and xs screens when the toggle button is visible. They can be displayed or hidden by clicking the 
toggle button.

* Copy and paste the entire navbar code also into *aboutus.html* to add the navigation also to that page. Make sure to 
change the `<li>` corresponding to "About" to *active*, and remove the active class from the Home link. Also, update the 
home link to take you back to *index.html*. Update the navbar-brand tag also to take you back to *index.html*.

&nbsp;

### **Modifications to the CSS styles**

&nbsp;

* We would like to have the navigation bar displayed in darker purple color, instead of the current color. In addition, 
when we use the fixed navigation bar, we should give the body of the page an upper margin of 50px, so that the top 50px 
of the page does not get hidden under the navigation bar. We accomplish these by adding these CSS customisations to the 
*styles.css* file

```css
body{
    padding:50px 0px 0px 0px;
    z-index:0;
}
.navbar-dark {
     background-color: #512DA8;
}
```

* Remember to delete the *bg-primary* class from the `<nav>` element in both *index.html* and *aboutus.html*.

&nbsp;

### **Adding Breadcrumbs**

&nbsp;

* To add breadcrumbs to our pages, we take the help of the breadcrumb and breadcrumb-item classes to add the following 
to the row containing the About Us title in *aboutus.html*.

```html
<ol class="col-12 breadcrumb">
    <li class="breadcrumb-item"><a href="./index.html">Home</a></li>
    <li class="breadcrumb-item active">About Us</li>
</ol>
```

&nbsp;

# **Icon Fonts**

&nbsp;

### **Using Icon Fonts and Other CSS classes**

* One of the most popular icon font toolkit is Font Awesome. Go to its website http://fontawesome.io/ to check out more 
details about this icon font. You can get Font Awesome using npm by typing the following at the prompt:

`npm install font-awesome --save`

* Another module that we install is Bootstrap Social that enables the addition of Social buttons to our site. You can 
find more information about it at https://lipis.github.io/bootstrap-social/. To install it using npm, type the following 
at the prompt:

`npm i bootstrap-social --save`

* We now need to include the CSS files for font awesome and bootstrap-social in the index.html file. Add the following 
code to the head of the file after the links for importing Bootstrap CSS classes. Do the same change to aboutus.html 
file:

```html
<link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="node_modules/bootstrap-social/bootstrap-social.css">
```

* Let us now use some font icons in our web page and decorate it. Update the navbar's ul list items as follows in 
index.html:

```html
 <li class="nav-item active">
     <a class="nav-link" href="#"><span class="fa fa-home fa-lg"></span> Home</a>
 </li>
<li class="nav-item">
    <a class="nav-link" href="./aboutus.html"><span class="fa fa-info fa-lg"></span> About</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="#"><span class="fa fa-list fa-lg"></span> Menu</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="#"><span class="fa fa-address-card fa-lg"></span> Contact</a>
</li>
```
* Similarly update the navbar's ul list items as follows in aboutus.html:

```html
<li class="nav-item">
    <a class="nav-link" href="./index.html"><span class="fa fa-home fa-lg"></span> Home</a>
</li>
<li class="nav-item active">
    <a class="nav-link" href="#"><span class="fa fa-info fa-lg"></span> About</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="#"><span class="fa fa-list fa-lg"></span> Menu</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="#"><span class="fa fa-address-card fa-lg"></span> Contact</a>
</li>
```
* Next, in both index.html and aboutus.html, go down to the address in the footer of the page and replace the "Tel.", 
"Fax" and "Email" with the corresponding font awesome based icons as follows:

```html
<i class="fa fa-phone fa-lg"></i>: +852 1234 5678<br>
<i class="fa fa-fax fa-lg"></i>: +852 8765 4321<br>
<i class="fa fa-envelope fa-lg"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
```
* Finally, let us use the bootstrap-social CSS classes to create the social buttons in the footer in both index.html and 
aboutus.html, by replacing the social sites' links with the following code:

```html
 <div style="text-align:center">
    <a class="btn btn-social-icon btn-google-plus" href="http://google.com/+">
        <i class="fa fa-google-plus"></i>
    </a>
    <a class="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id=">
        <i class="fa fa-facebook"></i>
    </a>
    <a class="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/">
        <i class="fa fa-linkedin"></i>
    </a>
    <a class="btn btn-social-icon btn-twitter" href="http://twitter.com/">
        <i class="fa fa-twitter"></i>
    </a>
    <a class="btn btn-social-icon btn-youtube" href="http://youtube.com/">
        <i class="fa fa-youtube"></i>
    </a>
    <a class="btn btn-social-icon" href="mailto:">
        <i class="fa fa-envelope-o"></i>
    </a>
</div>
```

&nbsp;

# **Buttons**

&nbsp;

### **Adding a Button Bar**

&nbsp;

* We are now going to add content to *contactus.html* file to learn more about buttons and button bars. Go to the div 
where we specify "Button group goes here", and replace it with the following code to create a button bar containing 
three buttons:

```html
 <div class="btn-group" role="group">
    <a role="button" class="btn btn-primary" href="tel:+85212345678"><i class="fa fa-phone"></i> Call</a>
    <a role="button" class="btn btn-info"><i class="fa fa-skype"></i> Skype</a>
    <a role="button" class="btn btn-success" href="mailto:confusion@food.net"><i class="fa fa-envelope-o"></i> Email</a>
</div>
```

Note how we define the button bar using the *btn-group* class, and then add the three buttons using the `<a>` tag. In 
this case, the three buttons are hyperlinks that cause an action and have an href associated with them. So we decided 
to use the `<a>` tag instead of the `<button>` tag. Note how the `<a>` tags have been styled using the *btn* class.

&nbsp;

# **Forms**

&nbsp;

### **Adding a Basic Form**

&nbsp;

Add the following code to page to create a simple horizontal form with two fields:

```html
<form>
    <div class="form-group row">
        <label for="firstname" class="col-md-2 col-form-label">First Name</label>
        <div class="col-md-10">
            <input type="text" class="form-control" id="firstname" name="firstname" placeholder="First Name">
        </div>
    </div>
    <div class="form-group row">
        <label for="lastname" class="col-md-2 col-form-label">Last Name</label>
        <div class="col-md-10">
            <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Last Name">
        </div>
    </div>
</form>
```

This creates a form with two elements in the form. Note that the class *row* in the form enables us to use the Bootstrap 
grid system. Hence we can style the contents using the column classes as appropriate.

&nbsp;

### **Adding a Input Group with addons**

&nbsp;

* We now see the use of an input-group together with input-group-addons. Let us add fields to seek user's telephone 
number and email:

```html
<div class="form-group row">
    <label for="telnum" class="col-12 col-md-2 col-form-label">Contact Tel.</label>
    <div class="col-5 col-sm-4 col-md-3">
        <div class="input-group">
            <div class="input-group-addon">(</div>
            <input type="tel" class="form-control" id="areacode" name="areacode" placeholder="Area code">
            <div class="input-group-addon">)</div>
        </div>
    </div>
    <div class="col-7 col-sm-6 col-md-7">
        <input type="tel" class="form-control" id="telnum" name="telnum" placeholder="Tel. number">
    </div>
</div>
<div class="form-group row">
    <label for="emailid" class="col-md-2 col-form-label">Email</label>
    <div class="col-md-10">
        <input type="email" class="form-control" id="emailid" name="emailid" placeholder="Email">
    </div>
</div>
```
Note the use of the *input-group* and *input-group-addon* classes.

&nbsp;

### **Adding a Checkbox and Select**

&nbsp;

* We now see the addition of a checkbox and a select element to the form. Note the styling of these elements using 
Bootstrap classes:

```html
<div class="form-group row">
    <div class="form-check col-md-6 offset-md-2">
        <label class="form-check-label">
            <input type="checkbox" class="form-check-input" name="approve" value="">
            <strong>May we contact you?</strong>
        </label>
    </div>
    <div class="col-md-3 offset-md-1">
        <select class="form-control">
            <option>Tel.</option>
            <option>Email</option>
        </select>
    </div>
</div>
```

&nbsp;

### **Adding a textarea**

&nbsp;

* Next we add a textarea for the users to submit their feedback comments as follows:
* 
```html
<div class="form-group row">
    <label for="feedback" class="col-md-2 col-form-label">Your Feedback</label>
    <div class="col-md-10">
        <textarea class="form-control" id="feedback" name="feedback" rows="12"></textarea>
    </div>
</div>
```

&nbsp;

### **Adding the Submit Button**

&nbsp;

* Finally, we add the submit button to the form as follows:

```html
<div class="form-group row">
    <div class="offset-md-2 col-md-10">
        <button type="submit" class="btn btn-primary">Send Feedback</button>
    </div>
</div>
```

&nbsp;

# **Displaying Content: Tables and Cards**

&nbsp;

### **Bootstrap Tables**

&nbsp;

* In this part, we will add a new row of content after the Corparate Leadership row in the page. We first start by 
adding a row and columns to the page as follows:

```html
<div class="row row-content">
    <div class="col-12 col-sm-9">
        <h2>Facts &amp; Figures</h2>
    </div>
    <div class="col-12 col-sm-3">
    </div>
</div> 
```
* Inside the first column of this row, insert the table as follows:

```html
<div class="table-responsive">
    <table class="table table-striped">
        <thead class="thead-inverse">
            <tr>
                <th>&nbsp;</th>
                <th>2013</th>
                <th>2014</th>
                <th>2015</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Employees</th>
                <td>15</td>
                <td>30</td>
                <td>40</td>
            </tr>
            <tr>
                <th>Guests Served</th>
                <td>15000</td>
                <td>45000</td>
                <td>100,000</td>
            </tr>
            <tr>
                <th>Special Events</th>
                <td>3</td>
                <td>20</td>
                <td>45</td>
            </tr>
            <tr>
                <th>Annual Turnover</th>
                <td>$251,325</td>
                <td>$1,250,375</td>
                <td>~$3,000,000</td>
            </tr>
        </tbody>
    </table>
</div>
```
Note the use of *table-responsive* class to create a responsive table, and the *table-striped* and *thead-inverse* 
classes for styling the table.

&nbsp;

### **Bootstrap Cards**

&nbsp;

* Next we add a card to the second div in the first content row as follows, updating the div first by adding the classes 
col-12 col-sm-6 to it and then adding the card:

```html
<div class="col-12 col-sm-6">
    <div class="card">
        <h3 class="card-header bg-primary text-white">Facts At a Glance</h3>
        <div class="card-block">
            <dl class="row">
                <dt class="col-6">Started</dt>
                <dd class="col-6">3 Feb. 2013</dd>
                <dt class="col-6">Major Stake Holder</dt>
                <dd class="col-6">HK Fine Foods Inc.</dd>
                <dt class="col-6">Last Year's Turnover</dt>
                <dd class="col-6">$1,250,375</dd>
                <dt class="col-6">Employees</dt>
                <dd class="col-6">40</dd>
            </dl>
        </div>
    </div>
</div>
```
* Next, we add a Bootstrap card and include a quotation in the card using the blockquote typography style:

```html
 <div class="col-12">
    <div class="card card-block bg-faded">
        <blockquote class="blockquote">
            <p class="mb-0">You better cut the pizza in four pieces because
                            I'm not hungry enough to eat six.</p>
            <footer class="blockquote-footer">Yogi Berra,
                <cite title="Source Title">
                    The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion Books, 2014
                </cite>
            </footer>
        </blockquote>
    </div>
</div>
```

Note the use of the `<blockquote>` tag to create a block quote in the card. We can use a `<footer>` inside the block 
quote to specify the attribution of the quote to its origin.

&nbsp;

# **Images and Media**

&nbsp;

### **Adding the Restaurant Logo**

&nbsp;

* We will now add the restaurant logo to the Jumbotron. In index.html go to the header row inside the jumbotron and 
replace the second `<div>` column with the following code:

```html
<div class="col col-sm align-self-center">
    <img src="img/logo.png" class="img-fluid">
</div>
```

* Next, we will add the logo to the navbar where we display the restaurant brand. Go to the navbar and replace the code 
there for the `<a>` tag with the "navbar-brand" class with the following code:

```html
<a class="navbar-brand" href="#"><img src="img/logo.png" height="30" width="41"></a>
```
* Repeat the above two steps for the *aboutus.html* and the *contactus.html* page also to update their navbars and 
jumbotrons.

&nbsp;

### **Adding Media Objects**

&nbsp;

* Next we will work with the content on the web page and use the media object classes to style the content in the 
content rows.

* Go to the first content row, and replace the content in the second column containing the description of Uthappizza 
with the following code:

```html
<div class="media">
    <img class="d-flex mr-3 img-thumbnail align-self-center" src="img/uthappizza.png" alt="Uthappizza">
    <div class="media-body">
        <h2 class="mt-0">Uthappizza</h2>
        <p class="hidden-xs-down">A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with 
          Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and      Buffalo Paneer.
        </p>
    </div>
</div>
```

* Next, we will go to the third row and replace the contents of the second column containing the description about 
Alberto with the following content:

```html
 <div class="media">
    <img class="d-flex mr-3 img-thumbnail align-self-center" src="img/alberto.png" alt="Alberto Somayya">
    <div class="media-body">
        <h2 class="mt-0">Alberto Somayya</h2>
        <h4>Executive Chef</h4>
        <p class="hidden-xs-down">Award winning three-star Michelin chef with wide International experience having 
          worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian 
          fusion experiences.
        </p>
    </div>
</div>
```

&nbsp;

# **Alerting Users**

&nbsp;

### **Adding Badges**

&nbsp;

* We will continue to edit the *index.html* file. In this file, we will add a badge *HOT* next to the name of the dish 
Uthappizza in the first content row. To do this, add the following code inside the `<h2>` containing the name of the 
dish:

```html
<span class="badge badge-danger">HOT</span>
```

* Next we will add a badge as a badge-pill right next to the earlier tag in the web page. Add the following code to the 
`<h2>` tag:

```html
<span class="badge badge-pill badge-default">$4.99</span>
```