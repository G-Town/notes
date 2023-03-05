## Introduction to React

&nbsp;

---

&nbsp;

### Getting Started with React

&nbsp;

##### **Installing Yarn**

* Yarn is another package manager like NPM, but is better suited and faster to work with for React applications. So let 
us install yarn and use it for building our React applications.

* To install Yarn, you can find the instructions for your specific platform at **https://yarnpkg.com/en/docs/install**.

* If you choose not to install Yarn, you can continue to use npm in place of yarn without any problem.

&nbsp;

##### **Installing *create-react-app***

From the React documentation we learn that the create-react-app CLI makes it easy to create an application that already 
works, right out of the box. It already follows the best practices suggested by the React community!

* To install create-react-app globally, type the following at the prompt:

```powershell
yarn global add create-react-app@1.5.2
```

Use sudo on a Mac and Linux. Alternately you can use npm, by typing "npm install -g create-react-app@1.5.2".

* This will make the command line tool for creating React applications. To learn more about the various commands that 
this CLI provides, type at the prompt:

```powershell
create-react-app --help
```

&nbsp;

##### **Generating and Serving a React Project Using *create-react-app***

* At a convenient location on your computer, create a folder named React and move into that folder.

* Then type the following at the prompt to create a new React application named confusion:

```powershell
create-react-app confusion
```

* This should create a new folder named confusion within your React folder and create the React application in that 
folder.

* Move to the confusion folder and type the following at the prompt:

```powershell
yarn start
```

* This will compile the project and then open a tab in your default browser at the address 
*http://<Your Computer's Name>:3000.*

* You can initialize your project to be a Git repository by typing the following commands at the prompt:

```powershell
git init
git add .
git commit -m "Initial Setup"
```

Thereafter you can set up an online Git repository and synchronize your project to the online repository. Make sure that 
the online Git repository is a private repository.

&nbsp;

---

&nbsp;

### Configuring your React Application

&nbsp;

##### **Configure your React Project to use Reactstrap**

* To configure your project to use reactstrap, type the following at the prompt to install reactstrap, and Bootstrap 4:

```powershell
yarn add bootstrap@4.0.0
yarn add reactstrap@5.0.0
yarn add react-popper@0.9.2
```

Note: You can also install the same using npm using the "npm install <package> --save" option if you are using npm 
instead of yarn.

&nbsp;

##### **Configure to use Bootstrap 4**

* Next, open *index.js* file in the src folder and add the following line into the imports:

```jsx
. . .
import 'bootstrap/dist/css/bootstrap.min.css';
. . .
```

&nbsp;

##### **Adding a Navigation Bar**

* Open *App.js* in the src folder and update it as follows:

```jsx
. . .

import { Navbar, NavbarBrand } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
      </div>
    );
  }
}

. . .
```

&nbsp;

---

&nbsp;

### React Components

&nbsp;

##### **Adding a Menu Component**

* First, download the images.zip file provided above and then unzip the file. Create a folder named assets in the public 
folder. Move the resulting images folder containing some PNG files to the React project's public/assets folder. These 
image files will be useful for our exercises.

* Next, add a new folder named components in the src folder, and create a new file named *MenuComponent.js* in this 
folder.

* Add the following code to *MenuComponent.js*:

```jsx
import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [
        {
          id: 0,
          name:'Uthappizza',
          image: 'assets/images/uthappizza.png',
          category: 'mains',
          label:'Hot',
          price:'4.99',
          description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with \
          Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'
        },
        {
          id: 1,
          name:'Zucchipakoda',
          image: 'assets/images/zucchipakoda.png',
          category: 'appetizer',
          label:'',
          price:'1.99',
          description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a \
          sweet-tangy tamarind sauce'
        },
        {
          id: 2,
          name:'Vadonut',
          image: 'assets/images/vadonut.png',
          category: 'appetizer',
          label:'New',
          price:'1.99',
          description:'A quintessential ConFusion experience, is it a vada or is it a donut?'
        },
        {
          id: 3,
          name:'ElaiCheese Cake',
          image: 'assets/images/elaicheesecake.png',
          category: 'dessert',
          label:'',
          price:'2.99',
          description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and \
          spiced with Indian cardamoms'
        }
      ],
    };
  }

  render() {
    const menu = this.state.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 mt-5">
          <Media tag="li">
            <Media left middle>
              <Media object src={dish.image} alt={dish.name} />
            </Media>
            <Media body className="ml-5">
              <Media heading>{dish.name}</Media>
              <p>{dish.description}</p>
            </Media>
          </Media>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <Media list>
            {menu}
          </Media>
        </div>
      </div>
    );
  }
}

export default Menu;
```

* Next, open *App.js* file and update it as follows:

```html
. . .

import Menu from './components/MenuComponent';

. . .

    <Menu />
    
    . . .
```

* Open *App.css* file and delete all its contents.

&nbsp;

##### **Updating the Menu Component**

* Open *MenuComponent.js* and update its contents as follows. Note that we have removed the dishes variable from the state 
of the component, and updated it to use the Card:

```jsx
 . . .
 
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedDish: null
    }
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish});
  }

  renderDish(dish) {
    if (dish != null) return(
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
    else return(
      <div></div>
    );
  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card key={dish.id}
              onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
        <div className="row">
          <div  className="col-12 col-md-5 m-1">
            {this.renderDish(this.state.selectedDish)}
          </div>
        </div>
      </div>
    );
  }
}

 . . .
```

* Add a folder named shared under the src folder.

* In the shared folder, create a new file named *dishes.js* and add the following content to it (Note: Alternately you can 
download the *dishes.js* file given above in the Exercise Resources and move it to the shared folder. Make sure the file 
is named *dishes.js*):

```jsx
export const DISHES = [
  {
    id: 0,
    name:'Uthappizza',
    image: 'assets/images/uthappizza.png',
    category: 'mains',
    label:'Hot',
    price:'4.99',
    description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, 
                ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
    comments: [
      {
      id: 0,
      rating: 5,
      comment: "Imagine all the eatables, living in conFusion!",
      author: "John Lemon",
      date: "2012-10-16T17:57:28.556094Z"
      },
      {
      id: 1,
      rating: 4,
      comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
      author: "Paul McVites",
      date: "2014-09-05T17:57:28.556094Z"
      },
      {
      id: 2,
      rating: 3,
      comment: "Eat it, just eat it!",
      author: "Michael Jaikishan",
      date: "2015-02-13T17:57:28.556094Z"
      },
      {
      id: 3,
      rating: 4,
      comment: "Ultimate, Reaching for the stars!",
      author: "Ringo Starry",
      date: "2013-12-02T17:57:28.556094Z"
      },
      {
      id: 4,
      rating: 2,
      comment: "It's your birthday, we're gonna party!",
      author: "25 Cent",
      date: "2011-12-02T17:57:28.556094Z"
      }
    ]                        },
  {
    id: 1,
    name:'Zucchipakoda',
    image: 'assets/images/zucchipakoda.png',
    category: 'appetizer',
    label:'',
    price:'1.99',
    description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy 
                tamarind sauce',
    comments: [
      {
      id: 0,
      rating: 5,
      comment: "Imagine all the eatables, living in conFusion!",
      author: "John Lemon",
      date: "2012-10-16T17:57:28.556094Z"
      },
      {
      id: 1,
      rating: 4,
      comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
      author: "Paul McVites",
      date: "2014-09-05T17:57:28.556094Z"
      },
      {
      id: 2,
      rating: 3,
      comment: "Eat it, just eat it!",
      author: "Michael Jaikishan",
      date: "2015-02-13T17:57:28.556094Z"
      },
      {
      id: 3,
      rating: 4,
      comment: "Ultimate, Reaching for the stars!",
      author: "Ringo Starry",
      date: "2013-12-02T17:57:28.556094Z"
      },
      {
      id: 4,
      rating: 2,
      comment: "It's your birthday, we're gonna party!",
      author: "25 Cent",
      date: "2011-12-02T17:57:28.556094Z"
      }
    ]
  },
  {
    id: 2,
    name:'Vadonut',
    image: 'assets/images/vadonut.png',
    category: 'appetizer',
    label:'New',
    price:'1.99',
    description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
    comments: [
      {
      id: 0,
      rating: 5,
      comment: "Imagine all the eatables, living in conFusion!",
      author: "John Lemon",
      date: "2012-10-16T17:57:28.556094Z"
      },
      {
      id: 1,
      rating: 4,
      comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
      author: "Paul McVites",
      date: "2014-09-05T17:57:28.556094Z"
      },
      {
      id: 2,
      rating: 3,
      comment: "Eat it, just eat it!",
      author: "Michael Jaikishan",
      date: "2015-02-13T17:57:28.556094Z"
      },
      {
      id: 3,
      rating: 4,
      comment: "Ultimate, Reaching for the stars!",
      author: "Ringo Starry",
      date: "2013-12-02T17:57:28.556094Z"
      },
      {
      id: 4,
      rating: 2,
      comment: "It's your birthday, we're gonna party!",
      author: "25 Cent",
      date: "2011-12-02T17:57:28.556094Z"
      }
    ]
  },
  {
    id: 3,
    name:'ElaiCheese Cake',
    image: 'assets/images/elaicheesecake.png',
    category: 'dessert',
    label:'',
    price:'2.99',
    description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with 
                Indian cardamoms',
    comments: [
      {
      id: 0,
      rating: 5,
      comment: "Imagine all the eatables, living in conFusion!",
      author: "John Lemon",
      date: "2012-10-16T17:57:28.556094Z"
      },
      {
      id: 1,
      rating: 4,
      comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
      author: "Paul McVites",
      date: "2014-09-05T17:57:28.556094Z"
      },
      {
      id: 2,
      rating: 3,
      comment: "Eat it, just eat it!",
      author: "Michael Jaikishan",
      date: "2015-02-13T17:57:28.556094Z"
      },
      {
      id: 3,
      rating: 4,
      comment: "Ultimate, Reaching for the stars!",
      author: "Ringo Starry",
      date: "2013-12-02T17:57:28.556094Z"
      },
      {
      id: 4,
      rating: 2,
      comment: "It's your birthday, we're gonna party!",
      author: "25 Cent",
      date: "2011-12-02T17:57:28.556094Z"
      }
    ]
  }
];
```

* Open *App.js* and update it as follows:

```jsx
. . .

import { DISHES } from './shared/dishes';

. . .

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

. . .

  <Menu dishes={this.state.dishes} />

. . .
}
```