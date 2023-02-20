## React Forms, Flow Architecture, and Introduction to Redux

&nbsp;

---

&nbsp;

### Controlled Forms

&nbsp;

##### **Importing the Necessary Components**

* You will start out by importing the necessary components from reactstrap into *ContactComponent.js* as follows:

```js
. . .

import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,
      Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
  
  . . .
```

* You will then change the *ContactComponent* to a class-based component as follows:

```js
. . .

class Contact extends Component {
  
  render() {
    
    . . .
    
  }

}
```

&nbsp;

##### **Creating the Controlled Form**

* Update the *ContactComponent.js* file as follows to set up the Controlled Form:

```js
. . .

  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contactType: 'Tel.',
      message: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
      
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log('Current State is: ' + JSON.stringify(this.state));
    alert('Current State is: ' + JSON.stringify(this.state));
    event.preventDefault();
  }

. . .

```

* Then add the controlled form to it as follows:

```js
. . .

        <div className="row row-content">
          <div className="col-12">
            <h3>Send us your Feedback</h3>
          </div>
          <div className="col-12 col-md-9">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="firstname" md={2}>First Name</Label>
                <Col md={10}>
                  <Input type="text" id="firstname" name="firstname"
                      placeholder="First Name"
                      value={this.state.firstname}
                      onChange={this.handleInputChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="lastname" md={2}>Last Name</Label>
                <Col md={10}>
                  <Input type="text" id="lastname" name="lastname"
                      placeholder="Last Name"
                      value={this.state.lastname}
                      onChange={this.handleInputChange} />
                </Col>                        
              </FormGroup>
              <FormGroup row>
              <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                <Col md={10}>
                  <Input type="tel" id="telnum" name="telnum"
                      placeholder="Tel. number"
                      value={this.state.telnum}
                      onChange={this.handleInputChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="email" md={2}>Email</Label>
                <Col md={10}>
                  <Input type="email" id="email" name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleInputChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{size: 6, offset: 2}}>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox"
                          name="agree"
                          checked={this.state.agree}
                          onChange={this.handleInputChange} /> {' '}
                      <strong>May we contact you?</strong>
                    </Label>
                  </FormGroup>
                </Col>
                  <Col md={{size: 3, offset: 1}}>
                    <Input type="select" name="contactType"
                        value={this.state.contactType}
                        onChange={this.handleInputChange}>
                      <option>Tel.</option>
                      <option>Email</option>
                    </Input>
                  </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="message" md={2}>Your Feedback</Label>
                <Col md={10}>
                  <Input type="textarea" id="message" name="message"
                      rows="12"
                      value={this.state.message}
                      onChange={this.handleInputChange}></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{size: 10, offset: 2}}>
                  <Button type="submit" color="primary">
                    Send Feedback
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>

. . .
```

&nbsp;

---

&nbsp;

### Controlled Form Validation

&nbsp;

##### **Simple Form Validation**

* Open *ContactComponent.js* and update it as follows to introduce the support to track form errors and perform validation:

```js
. . .
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback } from 'reactstrap';
. . .

class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contactType: 'Tel.',
      message: '',
      touched: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
    
  . . .
  
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  }

  validate(firstname, lastname, telnum, email) {
    const errors = {
      firstname: '',
      lastname: '',
      telnum: '',
      email: ''
    };

    if (this.state.touched.firstname && firstname.length < 3)
      errors.firstname = 'First Name should be >= 3 characters';
    else if (this.state.touched.firstname && firstname.length > 10)
      errors.firstname = 'First Name should be <= 10 characters';

    if (this.state.touched.lastname && lastname.length < 3)
      errors.lastname = 'Last Name should be >= 3 characters';
    else if (this.state.touched.lastname && lastname.length > 10)
      errors.lastname = 'Last Name should be <= 10 characters';

    const reg = /^\d+$/;
    if (this.state.touched.telnum && !reg.test(telnum))
      errors.telnum = 'Tel. Number should contain only numbers';

    if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
      errors.email = 'Email should contain a @';

    return errors;
  }
  
  . . .
  
  render() {
    const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
    
    . . .
  }
}
```

* Now that we have introduced some functions that can be used for form validation, let us update the form itself to make use of these as follows:

```js
. . .

              <FormGroup row>
                <Label htmlFor="firstname" md={2}>First Name</Label>
                <Col md={10}>
                  <Input type="text" id="firstname" name="firstname"
                      placeholder="First Name"
                      value={this.state.firstname}
                      valid={errors.firstname === ''}
                      invalid={errors.firstname !== ''}
                      onBlur={this.handleBlur('firstname')}
                      onChange={this.handleInputChange} />
                  <FormFeedback>{errors.firstname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="lastname" md={2}>Last Name</Label>
                <Col md={10}>
                  <Input type="text" id="lastname" name="lastname"
                      placeholder="Last Name"
                      value={this.state.lastname}
                      valid={errors.lastname === ''}
                      invalid={errors.lastname !== ''}
                      onBlur={this.handleBlur('lastname')}
                      onChange={this.handleInputChange} />
                  <FormFeedback>{errors.lastname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                <Col md={10}>
                  <Input type="tel" id="telnum" name="telnum"
                      placeholder="Tel. Number"
                      value={this.state.telnum}
                      valid={errors.telnum === ''}
                      invalid={errors.telnum !== ''}
                      onBlur={this.handleBlur('telnum')}
                      onChange={this.handleInputChange} />
                  <FormFeedback>{errors.telnum}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="email" md={2}>Email</Label>
                <Col md={10}>
                  <Input type="email" id="email" name="email"
                      placeholder="Email"
                      value={this.state.email}
                      valid={errors.email === ''}
                      invalid={errors.email !== ''}
                      onBlur={this.handleBlur('email')}
                      onChange={this.handleInputChange} />
                  <FormFeedback>{errors.email}</FormFeedback>
                </Col>
              </FormGroup>
                            
. . .
```

* You can now test your form by typing in invalid input and check how the form validation works.

&nbsp;

---

&nbsp;

### Uncontrolled Forms

&nbsp;

##### **Adding a Modal to Host the Form**

* Update *HeaderComponent.js* as follows to add a new Modal to the application to host the form:

```js
. . .

import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label } from 'reactstrap';
            
. . .

    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
        
. . .

    this.toggleModal = this.toggleModal.bind(this);

. . .


  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
      
. . .

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
          
          </ModalBody>
        </Modal>
                
. . .
```

* Then, add a button to the Navbar to enable toggling the modal:

```js
. . .

              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                </NavItem>
              </Nav>
                            
. . .
```

&nbsp;

##### **Adding the Uncontrolled Form**

* Add the form to the modal body as shown below:

```js
. . .

            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                    innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                    innerRef={(input) => this.password = input}  />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="remember"
                      innerRef={(input) => this.remember = input}  />
                    Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
                        
. . .
```

* Then, add the following function to the class to handle the form submission:

```js
. . .

    this.handleLogin = this.handleLogin.bind(this);
. . .

  handleLogin(event) {
    this.toggleModal();
    alert("Username: " + this.username.value + " Password: " + this.password.value
      + " Remember: " + this.remember.checked);
    event.preventDefault();

  }
      
. . .
```

&nbsp;

---

&nbsp;

### Introduction to Redux

&nbsp;

##### **Installing and Configuring Redux**

* As a first step you will install Redux and React-Redux into your application as follows:

```
yarn add redux@3.7.2
yarn add react-redux@5.0.7
```

* Next, create a folder named *redux* in the *src* folder and then add a file named *reducer.js* with the code below:

```js
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const initialState = {
  dishes: DISHES,
  comments: COMMENTS,
  promotions: PROMOTIONS,
  leaders: LEADERS
};

export const Reducer = (state = initialState, action) => {
  return state;
};
```

* Then, add a file named *configureStore.js* in the *redux* folder and add the following code to it:

```js
import {createStore} from 'redux';
import { Reducer, initialState } from './reducer'

export const ConfigureStore = () => {
  const store = createStore(
    Reducer, // reducer
    initialState, // our initialState
  );

  return store;
}
```

* Next, open *App.js* and update it as follows:

```js
. . .


import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();


. . .

      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>

. . .
```

* Finally, update *MainComponent.js* to connect it to Redux store and use it:

```js
. . .

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

. . .

    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    return (
      <div>
        <Header />
        <div>
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={Contact} />} />
              <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );

. . .

export default withRouter(connect(mapStateToProps)(Main));
```

&nbsp;

---

&nbsp;

### React Redux Form

&nbsp;

##### **Installing and Using react-redux-form**

* We first install the *react-redux-form* into our project as follows:

`yarn add react-redux-form@1.16.8`

* Then open *ContactComponent.js* and update the Feedback Form to use react-redux-form:

```js
. . .

import { Breadcrumb, BreadcrumbItem,
          Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

. . .


  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    // event.preventDefault();
  }
    
. . .

            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="firstname" md={2}>First Name</Label>
                <Col md={10}>
                  <Control.text model=".firstname" id="firstname" name="firstname"
                      placeholder="First Name"
                      className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="lastname" md={2}>Last Name</Label>
                <Col md={10}>
                  <Control.text model=".lastname" id="lastname" name="lastname"
                      placeholder="Last Name"
                      className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                <Col md={10}>
                  <Control.text model=".telnum" id="telnum" name="telnum"
                      placeholder="Tel. Number"
                      className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="email" md={2}>Email</Label>
                <Col md={10}>
                  <Control.text model=".email" id="email" name="email"
                      placeholder="Email"
                      className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size: 6, offset: 2}}>
                  <div className="form-check">
                    <Label check>
                      <Control.checkbox model=".agree" name="agree"
                          className="form-check-input" /> {' '}
                      <strong>May we contact you?</strong>
                    </Label>
                  </div>
                </Col>
                <Col md={{size: 3, offset: 1}}>
                    <Control.select model=".contactType" name="contactType"
                        className="form-control">
                        <option>Tel.</option>
                        <option>Email</option>
                    </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="message" md={2}>Your Feedback</Label>
                <Col md={10}>
                  <Control.textarea model=".message" id="message" name="message"
                      rows="12"
                      className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size:10, offset: 2}}>
                  <Button type="submit" color="primary">
                    Send Feedback
                  </Button>
                </Col>
              </Row>
            </LocalForm>
                        
. . .
```

&nbsp;

---

&nbsp;

### React Redux Form Validation

&nbsp;

##### **Implementing Simple Form Validation**

* Open *ContactComponent.js* and update it as follows to implement form validation:

```js
. . . 


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9.__%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

. . .

              <Row className="form-group">
                <Label htmlFor="firstname" md={2}>First Name</Label>
                <Col md={10}>
                  <Control.text model=".firstname" id="firstname" name="firstname"
                      placeholder="First Name"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                      }} />
                  <Errors
                      className="text-danger"
                      model=".firstname"
                      show="touched"
                      messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                      }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="lastname" md={2}>Last Name</Label>
                <Col md={10}>
                  <Control.text model=".lastname" id="lastname" name="lastname"
                      placeholder="Last Name"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                      }} />
                  <Errors
                      className="text-danger"
                      model=".lastname"
                      show="touched"
                      messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                      }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                <Col md={10}>
                  <Control.text model=".telnum" id="telnum" name="telnum"
                      placeholder="Tel. Number"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                      }} />
                  <Errors
                      className="text-danger"
                      model=".telnum"
                      show="touched"
                      messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 numbers',
                        maxLength: 'Must be 15 numbers or less',
                        isNumber: 'Must be a number'
                      }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="email" md={2}>Email</Label>
                <Col md={10}>
                  <Control.text model=".email" id="email" name="email"
                      placeholder="Email"
                      className="form-control"
                      validators={{
                        required, validEmail
                      }} />
                  <Errors
                      className="text-danger"
                      model=".email"
                      show="touched"
                      messages={{
                        required: 'Required',
                        validEmail: 'Invalid Email Address'
                      }} />
                </Col>
              </Row>
                            
. . .
```