# **Tabs**

&nbsp;

### **Adding Tab Navigation Elements**

&nbsp;

* Open the *aboutus.html* page and move to the second content row containing the details of the corporate leadership of 
the restaurant.
* Right after the Corporate Leadership heading, introduce the following code to set up the tabbed navigation:

```html
<ul class="nav nav-tabs">
    <li class="nav-item">
        <a class="nav-link active" href="#peter" role="tab" data-toggle="tab">Peter Pan, CEO</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#danny" role="tab" data-toggle="tab">Danny Witherspoon, CFO</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#agumbe"role="tab" data-toggle="tab">Agumbe Tang, CTO</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#alberto" role="tab" data-toggle="tab">Alberto Somayya, Exec. Chef</a>
    </li>
</ul>
```

Note the use of the `<ul>` tag with the nav and *nav-tabs* classes to set up the tab navigation. Each list item within 
the list acts as the tab element. Within each list item, note that we set up the `<a>` tags with the *href* pointing to 
the *id* of the tab pane of content to be introduced later. Also note that the `<a>` tag contains the *data-toggle=tab* 
attribute. The first list element's `<a>` tag contains the class active. This tab will be the open tab when we view the 
web page. We can switch to the other tabs using the tabbed navigation that we just set up.

&nbsp;

### **Adding Tab Content**

&nbsp;

* The details about the various corporate leaders should now be organized into various tab panes. To begin this, we 
will enclose the entire content into a div element with the class tab-content as specified below:

```html
<div class="tab-content">
    ...
</div>
```

* Then we take the name and description of the CEO of the company and enclose it within a tab-pane as follows

```html
<div role="tabpanel" class="tab-pane fade show active" id="peter">
    <h3>Peter Pan <small>Chief Epicurious Officer</small></h3>
    <p> ... </p>
</div>
```

Note the use of the *tab-pane*, *fade*, *show*, and *active* classes and with *peter* as the id. This is the same id 
used as the *href* in the `<a>` link in the navigation.

* The remaining content is also similarly enclosed inside appropriate divs with the correct ids and the classes 
specified as above. Only the first tab pane will have the *show* and *active* classes specified to indicate that the 
content should be visible on the web page by default.

&nbsp;

### **Modifying the tab-content CSS**

&nbsp;

* We now modify the CSS styles for the tab-content class in the mystyles.css file as follows:


```css
.tab-content {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px;
}
```
This modification adds a 1px border to the tab content which joins with the upper border introduced by the tab 
navigation element to give a clean tab like appearance.

&nbsp;

# **Converting Tabs to Accordion**

&nbsp;

* First delete the `<ul>` class that was introduced for the tabbed navigation.
* Then the turn the *tab-content* div into a *accordion div*. Use the code structure as shown below:

```html
<div id="accordion" role="tablist">
    . . .
</div>
```

* Then, convert the first tab-pane into a card such that the name appears as a card heading, and the `<p>` will be in 
the card body. Use the structure of the code as shown below:

```html
<div class="card">
    <div class="card-header" role="tab" id="peterhead">
        <h3 class="mb-0">
            <a data-toggle="collapse" data-parent="#accordion" href="#peter">
                Peter Pan <small>Chief Epicurious Officer</small>
            </a>
        </h3>
    </div>
    <div role="tabpanel" class="collapse show" id="peter">
        <div class="card-block">
            <p class="hidden-xs-down">. . .</p>
        </div>
    </div>
</div>
```

* For the remaining three leaders, use the same structure as above, with the appropriate ids set up for the cards, as 
shown in the code structure below:

```html
<div class="card">
    <div class="card-header" role="tab" id="dannyhead">
        <h3 class="mb-0">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#danny">
                Dhanasekaran Witherspoon <small>Chief Food Officer</small>
            </a>
        </h3>
    </div>
    <div role="tabpanel" class="collapse" id="danny">
        <div class="card-block">
            <p class="hidden-xs-down">. . .</em></p>
        </div>
    </div>
</div>
<div class="card">
    <div class="card-header" role="tab" id="agumbehead">
        <h3 class="mb-0">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#agumbe">
                Agumbe Tang <small>Chief Taste Officer</small>
            </a>
        </h3>
    </div>
    <div role="tabpanel" class="collapse" id="agumbe">
        <div class="card-block">
            <p class="hidden-xs-down">. . .</em></p>
        </div>
    </div>
</div>
<div class="card">
    <div class="card-header" role="tab" id="albertohead">
        <h3 class="mb-0">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#alberto">
                Alberto Somayya <small>Executive Chef</small>
            </a>
        </h3>
    </div>
    <div role="tabpanel" class="collapse" id="alberto">
        <div class="card-block">
            <p class="hidden-xs-down">. . .</em></p>
        </div>
    </div>
</div>
```

&nbsp;

# **Tooltips and Modals**

&nbsp;

### **Adding a Tooltip**

&nbsp;

* Let us now switch to the *index.html* page. We will now add a tooltip to this page. The tooltip will be added to the 
"Reserve Table" button that is in the jumbotron. We will update the `<a>` tag for the button as follows:

```html
<a type="button" class="btn btn-warning btn-sm btn-block" data-toggle="tooltip" data-html="true"  
   title="Or Call us at  <br><strong>+852 12345678</strong>" data-placement="bottom" href="#reserveform">
```

As you can see from the code, we add a **data-toggle**, **data-placement** and a **title** attribute to the `<a>` tag 
in order to introduce a tooltip.

* The tooltip needs to be activated by adding a small Javascript code to the bottom of the page as follows:

```html
<script>
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
</script>
```

This script is added right after the line that imports the bootstrap.min.js file.

&nbsp;

### **Adding a Modal**

&nbsp;

* In the next step we introduce the modal to the web page. To set up the modal, add the following code right after the 
navbar at the top of the page.

```html
<div id="loginModal" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg" role="content">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Login </h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="form-inline">
                    <div class="form-group">
                        <label class="sr-only" for="exampleInputEmail3">Email address</label>
                        <input type="email" class="form-control form-control-sm mr-1" 
                               id="exampleInputEmail3" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label class="sr-only" for="exampleInputPassword3">Password</label>
                        <input type="password" class="form-control form-control-sm mr-1" 
                               id="exampleInputPassword3" placeholder="Password">
                    </div>
                    <div class="form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox"> Remember me
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm">Sign in</button>
            </div>
        </div>
    </div>
</div>
```

* Next we introduce another link on the right side of the navbar in order to trigger the display of the modal. To do 
this, add the following code in the navbar after the `</ul>`:

```html
<span class="navbar-text">
    <a data-toggle="modal" data-target="#loginModal">
    <span class="fa fa-sign-in"></span> Login</a>
</span>
```

* In addition, add the *mr-auto* class to the `<ul>` in the navbar as follows:
]
```html
<ul class="navbar-nav mr-auto">`
```
We are introducing another link to the right of the navbar using the *navbar-text* and using the *mr-auto* class to the 
`<ul>` as shown above. This contains a link with an `<a>` tag with the *data-toggle="modal"* and 
*data-target="#loginModal"* attributes.

&nbsp;

# **Carousel**

&nbsp;

### **Adding a row for the carousel**

&nbsp;

* The carousel will be added to the *index.html* page. In this page, go to the top of the container div that contains 
the content of the page and add a new content row and an inner div spanning all the 12 columns as follows:

```html
<div class="row row-content">
    <div class="col">
    </div>
</div>
```

&nbsp;

### **Adding a Carousel**

&nbsp;

* Next, add the basic carousel div inside the content row that you just added as follows:

```html
<div id="mycarousel" class="carousel slide" data-ride="carousel">
</div>
```

&nbsp;

### **Adding Carousel Content**

&nbsp;

* Next add the content inside the carousel as follows:

```html
<div class="carousel-inner" role="listbox">
    <div class="carousel-item active">
        <img class="d-block img-fluid" src="img/uthappizza.png" alt="Uthappizza">
        <div class="carousel-caption d-none d-md-block">
            <h2>Uthappizza <span class="badge badge-danger">HOT</span>
              <span class="badge badge-pill badge-default">$4.99</span></h2>
            . . .
        </div>
    </div>
    <div class="carousel-item">
        . . .
    </div>
    <div class="carousel-item">
    . . .
    </div>
</div>
```

&nbsp;

### **Adding CSS Classes**

&nbsp;

* Add the following CSS classes to the *mystyles.css* file:

```css
.carousel {
    background:#512DA8;
}
.carousel-item {
    height: 300px;
}
.carousel-item img {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 300px;
}
```

&nbsp;

### **Adding Carousel Controls**

&nbsp;

* Next, we will add manual controls to the carousel so that we can manually move among the slides. Add the following 
code to the bottom after the carousel items in the div of the carousel to add slide indicators that enable us to select 
a specific slide:

```html
<ol class="carousel-indicators">
    <li data-target="#mycarousel" data-slide-to="0" class="active"></li>
    <li data-target="#mycarousel" data-slide-to="1"></li>
    <li data-target="#mycarousel" data-slide-to="2"></li>
</ol>
```

* Then, add the left and right controls to the carousel that enable us to move to the previous and next slide manually. 
Add this to the bottom of the carousel div:

```html
<a class="carousel-control-prev" href="#mycarousel" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
</a>
<a class="carousel-control-next" href="#mycarousel" role="button" data-slide="next">
    <span class="carousel-control-next-icon"></span>
</a>
```