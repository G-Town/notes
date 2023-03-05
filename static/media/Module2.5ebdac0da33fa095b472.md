## React Router and Single Page Applications

&nbsp;

---

&nbsp;

### Presentational and Container Components

&nbsp;

##### **Add a Container Component**

* Add a new component named *MainComponent.js* in the components folder and update its contents as follows:

```jsx
import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
      </div>
    );
  }
}

export default Main;
```

* Update the *App.js* by removing the state related information, and make use of Main Component to render the UI:

```jsx
. . .
import Main from './components/MainComponent';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

. . .
```

&nbsp;

##### **Turn Menu Component into a Presentational Component**

* Open *MenuComponent.js* and update its contents by removing the state and removing the DishdetailComponent reference, 
and make use of the onClick supplied by MainComponent through the props to deal with the clicking of a menu item:

```jsx
. . .

          <Card key={dish.id}
            onClick={() => this.props.onClick(dish.id)}>
                        
. . .
```

* The **DishdetailComponent** is already structured as a presentational component and hence needs no further update, 
except wrapping the return value from render() within a \<div> with the className as container.

* To print out the date for a comment in a format more suitable for human readability, you can update your 
**renderComment** function with the code snippet shown below:

```jsx
{new Intl.DateTimeFormat('en-US',
                         {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
```

&nbsp;

---

&nbsp;

### Functional Components

&nbsp;

##### **Implementing Functional Components**

* Open *MenuComponent.js* and update it as follows:

```jsx
import React from 'react';
import { Card, CardImg, CardImgOverlay,
  CardTitle } from 'reactstrap';

  function RenderMenuItem ({dish, onClick}) {
    return (
      <Card onClick={() => onClick(dish.id)}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Card>
    );
  }

  const Menu = (props) => {

    const menu = props.dishes.map((dish) => {
      return (
        <div className="col-12 col-md-5 m-1"  key={dish.id}>
          <RenderMenuItem dish={dish} onClick={props.onClick} />
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
      </div>
    );
  }

export default Menu;
```

* Then open *DishdetailComponent.js* and update it as follows:

```jsx
import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle } from 'reactstrap';


  function RenderDish({dish}) {
    
    . . .

  }

  function RenderComments({comments}) {
      
    . . .
      
  }

  const  DishDetail = (props) => {

    . . .
      
  }

export default DishDetail;
```

&nbsp;

---

&nbsp;

### Header and Footer

&nbsp;

##### **Using Font Awesome Icons and Bootstrap-Social**

* First use yarn or npm to fetch **Font Awesome** and **Bootstrap Social** to the project by typing the following at 
the prompt:

```powershell
yarn add font-awesome@4.7.0
yarn add bootstrap-social@5.1.1
```

* Then, open *index.js* file and update it as follows to enable your application to use **Font Awesome** and 
**Bootstrap Social**:

```jsx
. . .

import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';

. . .
```

&nbsp;

##### **Adding a Header and a Footer**

* Create a new file named *HeaderComponent.js* and add the following to it:

```jsx
import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

class Header extends Component {
  render() {
    return(
    <React.Fragment>
      <Navbar dark>
        <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Ristorante con Fusion</h1>
              <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our 
              lipsmacking creations will tickle your culinary senses!</p>
            </div>
          </div>
        </div>
       </Jumbotron>
    </React.Fragment>
    );
  }
}

export default Header;
```

* Then, add another file named *FooterComponent.j*s and add the following to it:

```jsx
import React from 'react';

function Footer(props) {
  return(
  <div className="footer">
    <div className="container">
      <div className="row justify-content-center">             
        <div className="col-4 offset-1 col-sm-2">
          <h5>Links</h5>
          <ul className="list-unstyled">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="contactus.html">Contact</a></li>
          </ul>
        </div>
        <div className="col-7 col-sm-5">
          <h5>Our Address</h5>
          <address>
            121, Clear Water Bay Road<br />
            Clear Water Bay, Kowloon<br />
            HONG KONG<br />
            <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br />
            <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br />
            <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
          </address>
        </div>
        <div className="col-12 col-sm-4 align-self-center">
          <div className="text-center">
            <a className="btn btn-social-icon btn-google" href="http://google.com/+">
              <i className="fa fa-google-plus"></i>
            </a>
            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id=">
              <i className="fa fa-facebook"></i>
            </a>
            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/">
              <i className="fa fa-linkedin"></i>
            </a>
            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/">
              <i className="fa fa-twitter"></i>
            </a>
            <a className="btn btn-social-icon btn-google" href="http://youtube.com/">
              <i className="fa fa-youtube"></i>
            </a>
            <a className="btn btn-social-icon" href="mailto:">
              <i className="fa fa-envelope-o"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">             
        <div className="col-auto">
          <p>© Copyright 2018 Ristorante Con Fusion</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Footer;
```

&nbsp;

##### **Integrating Header and Footer into the React Application**

* Now we open *MainComponent.js* and update it to integrate the header and footer into our application:

```jsx
. . .

import Header from './HeaderComponent';
import Footer from './FooterComponent';

. . .

    <Header />
    <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
    <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
    <Footer />
        
. . .
```

* Then update *App.css* to add some new CSS classes for use in our application:

```js
.row-header{
  margin:0px auto;
  padding:0px auto;
}

.row-content {
  margin:0px auto;
  padding: 50px 0px 50px 0px;
  border-bottom: 1px ridge;
  min-height:400px;
}

.footer{
  background-color: #D1C4E9;
  margin:0px auto;
  padding: 20px 0px 20px 0px;
}
.jumbotron {
  padding:70px 30px 70px 30px;
  margin:0px auto;
  background: #9575CD ;
  color:floralwhite;
}

address{
  font-size:80%;
  margin:0px;
  color:#0f0f0f;
}

.navbar-dark {
  background-color: #512DA8;
}
```

&nbsp;

---

&nbsp;

### React Router

&nbsp;

##### **Installing and Configuring React Router**

* First install **React Router** into your project by typing the following at the prompt:

```powershell
yarn add react-router-dom@4.2.2
```

* Then, open *App.js* and update it as follows:

```jsx
. . .

import { BrowserRouter } from 'react-router-dom';

. . .

    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
    
. . .
```

&nbsp;

##### **Add a Home Component**

* Create a new file named *HomeComponent.js* in the components folder and add the following to it:

```jsx
import React from 'react';

function Home(props) {
  return(
    <div className="container">
      <h4>Home</h4>
    </div>
  );
}

export default Home;
```

&nbsp;

##### **Configuring the Router**

* Open *MainComponent.js* file and update it as follows:

```jsx
. . .

import Home from './HomeComponent';

. . .

import { Switch, Route, Redirect } from 'react-router-dom';

. . .

  render() {


    const HomePage = () => {
      return(
        <Home 
        />
      );
    }

. . .

          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
            <Redirect to="/home" />
          </Switch>

. . .
  }
```

* Open *HeaderComponent.js* and update its contents with the following:

```jsx
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  render() {
    return(
      <div>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/aboutus'>
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/contactus'>
                    <span className="fa fa-address-card fa-lg"></span> Contact Us
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our 
                lipsmacking creations will tickle your culinary senses!</p>
              </div>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
```

* Then, open *FooterComponent.js* and update it as follows:

```jsx
. . .

import { Link } from 'react-router-dom';

. . .

            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/aboutus'>About Us</Link></li>
            <li><Link to='/menu'>Menu</Link></li>
            <li><Link to='/contactus'>Contact Us</Link></li>
                        
. . .
```

* Open *MenuComponent.js* and remove the **onClick()** from the Card in the **RenderMenuItem()** function.

&nbsp;

---

&nbsp;

### Single Page Applications

&nbsp;

##### **Integrating the Contact Component**

* Add a new file named *ContactComponent.js* file and update its contents as follows:

```jsx
import React from 'react';

function Contact(props) {
  return(
    <div className="container">
      <div className="row row-content">
        <div className="col-12">
          <h3>Location Information</h3>
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Our Address</h5>
          <address>
            121, Clear Water Bay Road<br />
            Clear Water Bay, Kowloon<br />
            HONG KONG<br />
            <i className="fa fa-phone"></i>: +852 1234 5678<br />
            <i className="fa fa-fax"></i>: +852 8765 4321<br />
            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
          </address>
        </div>
        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Map of our Location</h5>
        </div>
        <div className="col-12 col-sm-11 offset-sm-1">
          <div className="btn-group" role="group">
            <a role="button" className="btn btn-primary" href="tel:+85212345678">
              <i className="fa fa-phone"></i> Call
            </a>
            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
            <a role="button" className="btn btn-success" href="mailto:confusion@food.net">
              <i className="fa fa-envelope-o"></i> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
```

* Update the *MainComponent.js* file to integrate the ContactComponent by adding in the following:

```jsx
. . .

import Contact from './ContactComponent';

. . .

        <Route exact path='/contactus' component={Contact} />} />
```

&nbsp;

##### **Updating the Home Component**

* First update *dishes.js* file in the shared folder to update the dishes as follows:

```js
export const DISHES =
  [
    {
    id: 0,
    name:'Uthappizza',
    image: '/assets/images/uthappizza.png',
    category: 'mains',
    label:'Hot',
    price:'4.99',
    featured: true,
    description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe \
                vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'                    
    },
    {
    id: 1,
    name:'Zucchipakoda',
    image: '/assets/images/zucchipakoda.png',
    category: 'appetizer',
    label:'',
    price:'1.99',
    featured: false,
    description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy \
                tamarind sauce'
    },
    {
    id: 2,
    name:'Vadonut',
    image: '/assets/images/vadonut.png',
    category: 'appetizer',
    label:'New',
    price:'1.99',
    featured: false,
    description:'A quintessential ConFusion experience, is it a vada or is it a donut?'
    },
    {
    id: 3,
    name:'ElaiCheese Cake',
    image: '/assets/images/elaicheesecake.png',
    category: 'dessert',
    label:'',
    price:'2.99',
    featured: false,
    description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian \
                cardamoms'
    }
  ];
```

* Now add a new file named *comments.js* to the shared folder and update it as follows. We are now moving the comments 
about the dishes into its own file:

```js
export const COMMENTS = 
[
  {
    id: 0,
    dishId: 0,
    rating: 5,
    comment: "Imagine all the eatables, living in conFusion!",
    author: "John Lemon",
    date: "2012-10-16T17:57:28.556094Z"
  },
  {
    id: 1,
    dishId: 0,
    rating: 4,
    comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
    author: "Paul McVites",
    date: "2014-09-05T17:57:28.556094Z"
  },
  {
    id: 2,
    dishId: 0,
    rating: 3,
    comment: "Eat it, just eat it!",
    author: "Michael Jaikishan",
    date: "2015-02-13T17:57:28.556094Z"
  },
  {
    id: 3,
    dishId: 0,
    rating: 4,
    comment: "Ultimate, Reaching for the stars!",
    author: "Ringo Starry",
    date: "2013-12-02T17:57:28.556094Z"
  },
  {
    id: 4,
    dishId: 0,
    rating: 2,
    comment: "It's your birthday, we're gonna party!",
    author: "25 Cent",
    date: "2011-12-02T17:57:28.556094Z"
  },
  {
    id: 5,
    dishId: 1,
    rating: 5,
    comment: "Imagine all the eatables, living in conFusion!",
    author: "John Lemon",
    date: "2012-10-16T17:57:28.556094Z"
  },
  {
    id: 6,
    dishId: 1,
    rating: 4,
    comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
    author: "Paul McVites",
    date: "2014-09-05T17:57:28.556094Z"
  },
  {
    id: 7,
    dishId: 1,
    rating: 3,
    comment: "Eat it, just eat it!",
    author: "Michael Jaikishan",
    date: "2015-02-13T17:57:28.556094Z"
  },
  {
    id: 8,
    dishId: 1,
    rating: 4,
    comment: "Ultimate, Reaching for the stars!",
    author: "Ringo Starry",
    date: "2013-12-02T17:57:28.556094Z"
  },
  {
    id: 9,
    dishId: 1,
    rating: 2,
    comment: "It's your birthday, we're gonna party!",
    author: "25 Cent",
    date: "2011-12-02T17:57:28.556094Z"
  },
  {
    id: 10,
    dishId: 2,
    rating: 5,
    comment: "Imagine all the eatables, living in conFusion!",
    author: "John Lemon",
    date: "2012-10-16T17:57:28.556094Z"
  },
  {
    id: 11,
    dishId: 2,
    rating: 4,
    comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
    author: "Paul McVites",
    date: "2014-09-05T17:57:28.556094Z"
  },
  {
    id: 12,
    dishId: 2,
    rating: 3,
    comment: "Eat it, just eat it!",
    author: "Michael Jaikishan",
    date: "2015-02-13T17:57:28.556094Z"
  },
  {
    id: 13,
    dishId: 2,
    rating: 4,
    comment: "Ultimate, Reaching for the stars!",
    author: "Ringo Starry",
    date: "2013-12-02T17:57:28.556094Z"
  },
  {
    id: 14,
    dishId: 2,
    rating: 2,
    comment: "It's your birthday, we're gonna party!",
    author: "25 Cent",
    date: "2011-12-02T17:57:28.556094Z"
  },
  {
    id: 15,
    dishId: 3,
    rating: 5,
    comment: "Imagine all the eatables, living in conFusion!",
    author: "John Lemon",
    date: "2012-10-16T17:57:28.556094Z"
  },
  {
    id: 16,
    dishId: 3,
    rating: 4,
    comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
    author: "Paul McVites",
    date: "2014-09-05T17:57:28.556094Z"
  },
  {
    id: 17,
    dishId: 3,
    rating: 3,
    comment: "Eat it, just eat it!",
    author: "Michael Jaikishan",
    date: "2015-02-13T17:57:28.556094Z"
  },
  {
    id: 18,
    dishId: 3,
    rating: 4,
    comment: "Ultimate, Reaching for the stars!",
    author: "Ringo Starry",
    date: "2013-12-02T17:57:28.556094Z"
  },
  {
    id: 19,
    dishId: 3,
    rating: 2,
    comment: "It's your birthday, we're gonna party!",
    author: "25 Cent",
    date: "2011-12-02T17:57:28.556094Z"
  }
];
```

* Next add a new file named *promotions.js* file to the shared folder and update its contents as follows:

```js
export const PROMOTIONS = [
  {
    id: 0,
    name: 'Weekend Grand Buffet',
    image: '/assets/images/buffet.png',
    label: 'New',
    price: '19.99',
    featured: true,
    description: 'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, \
                  six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 \
                  per person'
  }
  ];
```

* Next add a new file named *leaders.js* file to the shared folder and update its contents as follows:

```js
export const LEADERS = [
  {
    id: 0,
    name: 'Peter Pan',
    image: '/assets/images/alberto.png',
    designation: 'Chief Epicurious Officer',
    abbr: 'CEO',
    featured: false,
    description: 'Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous \
    journey to the shores of America with the intention of giving their children the best future. His mother\'s wizardy \
    in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was \
    his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal \
    for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections.'
  },
  {
    id: 1,
    name: 'Dhanasekaran Witherspoon',
    image: '/assets/images/alberto.png',
    designation: 'Chief Food Officer',
    abbr: 'CFO',
    featured: false,
    description: 'Our CFO, Danny, as he is affectionately referred to by his colleagues, comes from a long established \
    family tradition in farming and produce. His experiences growing up on a farm in the Australian outback gave him \
    great appreciation for varieties of food sources. As he puts it in his own words, Everything that runs, wins, and \
    everything that stays, pays!'
  },
  {
    id: 2,
    name: 'Agumbe Tang',
    image: '/assets/images/alberto.png',
    designation: 'Chief Taste Officer',
    abbr: 'CTO',
      featured: false,
    description: 'Blessed with the most discerning gustatory sense, Agumbe, our CFO, personally ensures that every \
    dish that we serve meets his exacting tastes. Our chefs dread the tongue lashing that ensues if their dish does \
    not meet his exacting standards. He lives by his motto, You click only if you survive my lick.'
  },
  {
    id: 3,
    name: 'Alberto Somayya',
    image: '/assets/images/alberto.png',
    designation: 'Executive Chef',
    abbr: 'EC',
    featured: true,
    description: 'Award winning three-star Michelin chef with wide International experience having worked closely with \
    whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, \
    Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!'
  }
];
```

* Now update the *HomeComponent.js* file to fetch and display the featured dish, promotion and leader as follows:

```jsx
import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';

function RenderCard({item}) {

  return(
    <Card>
      <CardImg src={item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );

}

function Home(props) {
  return(
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard item={props.dish} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.promotion} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader} />
        </div>
      </div>
    </div>
  );
}

export default Home;
```

* Next, update *MainComponent.js* as follows:

```jsx
. . .

import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

. . .

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }
  
  . . .

    const HomePage = () => {
      return(
        <Home 
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }
    
. . .
```

&nbsp;

##### **Updating to Use Parameters on Routes**

* Open *MenuComponent.js* and add the following changes to it to enable the information about the selected dish to be 
passed to the DishdetailComponent:

```jsx
. . .

import { Card, CardImg, CardImgOverlay,
  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

  function RenderMenuItem ({dish, onClick}) {
    return (
      <Card>
        <Link to={`/menu/${dish.id}`} >
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Link>
      </Card>
    );
  }
    
. . .

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
            <hr />
          </div>                
        </div>
        <div className="row">
          {menu}
        </div>
      </div>
    );
        
. . .
```

* Open *MainComponent.js* and update it as follows:

```jsx
. . .


  const DishWithId = ({match}) => {
    return(
      <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
    );
  };
    
. . .

          <Route path='/menu/:dishId' component={DishWithId} />

. . .
```

&nbsp;

##### **Updating DishDetail Component**

* Open *DishdetailComponent.js* and update it as follows:

```jsx
. . .

import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


. . .

      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
            </div>                
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderComments comments={props.comments} />
            </div>
          </div>
        </div>
      );
            
. . .
```

&nbsp;

##### **Adding Breadcrumbs to ContactComponent**

* Open *ContactComponent.js* and add Breadcrumbs to it as follows:

```jsx
. . .

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

. . .

      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Contact Us</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Contact Us</h3>
          <hr />
        </div>                
      </div>
. . .
```