## More Redux and Client-Server Communication

&nbsp;

---

&nbsp;

### Combining Reducers

&nbsp;

##### **Splitting the Reducer**

* In the redux folder, create a new file named *dishes.js* and add the following to it:

```js
import { DISHES } from '../shared/dishes';

export const Dishes = (state = DISHES, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

* Then, create a file named *comments.js* and add the following to it:

```js
import { COMMENTS } from '../shared/comments';

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {

    default:
      return state;
  }
};
```

* Similarly, create a new file named *promotions.js* and add the following to it:

```js
import { PROMOTIONS } from '../shared/promotions';

export const Promotions = (state = PROMOTIONS, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

* And finally, create a new file named *leaders.js* and add the following to it:

```js
import { LEADERS } from '../shared/leaders';

export const Leaders = (state = LEADERS, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

* Now that we have split the management of state into different reducers that manage partial state, we need to combine them together. Open *configureStore.js* and update it as follows:

```js
import {createStore, combineReducers} from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders
    })
  );

  return store;
}
```

* Now we can safely delete the *reducer.js* file from the project.

&nbsp;

---

&nbsp;

### Redux Actions

&nbsp;

##### **Creating Actions**

* In the *redux* folder create a new file named *ActionTypes.js* and add the following to it:

```js
export const ADD_COMMENT = 'ADD_COMMENT';
```

* Then, create a file named *ActionCreators.js* and add the following to it:

```js
import * as ActionTypes from './ActionTypes';

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
});
```

* Next, update *comments.js* to initiate action when the action is dispatched by the ActionCreator as follows:

```js
import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      console.log("Comment: ", comment);
      return state.concat(comment);

    default:
      return state;
  }
};
```

* Now update *MainComponent.js* to make the action available for use within the DishdetailComponent as follows:

```jsx
. . .

import { addComment } from '../redux/ActionCreators';

. . .

  const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
  
  });

. . .

      <DishDetail
          dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          addComment={this.props.addComment} />

. . .

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
```

* Finally, update *DishdetailComponent.js* as follows to initiate the action upon the user submitting the comment form:

```jsx
. . .

  function RenderComments({comments, addComment, dishId}) {



. . .

      <CommentForm dishId={dishId} addComment={addComment} />


. . .

        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);



. . .

      <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />

. . .
```

&nbsp;

---

&nbsp;

### Redux Thunk

&nbsp;

##### **Installing Redux Thunk and Logger**

* Install Redux Thunk and Logger as shown below:

```powershell
yarn add redux-thunk@2.2.0
yarn add redux-logger@3.0.6
```

* Then open *configureStore.js* and update it to use the Thunk and Logger as follows:

```js
import {createStore, combineReducers, applyMiddleware } from 'redux';

. . .

import thunk from 'redux-thunk';
import logger from 'redux-logger';
 
. . .

    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders
    }),
    applyMiddleware(thunk, logger)
        
. . .
```

* Next, open *ActionTypes.js* and add new action types as follows:

```js
. . .

export const DISHES_LOADING = 'DISHES_LOADING';
export const DISHES_FAILED = 'DISHES_FAILED';
export const ADD_DISHES = 'ADD_DISHES';
```

* Then open *ActionCreators.js* and add new actions:

```js
. . .

import { DISHES } from '../shared/dishes';

. . .


export const fetchDishes = () => (dispatch) => {

  dispatch(dishesLoading(true));

  setTimeout(() => {
    dispatch(addDishes(DISHES));
  }, 2000);
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});
```

* Next, open *dishes.js* and add the code to respond to actions as follows:

```js
import * as ActionTypes from './ActionTypes';

export const Dishes = (state = { isLoading: true,
  errMess: null,
  dishes:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {...state, isLoading: false, errMess: null, dishes: action.payload};

    case ActionTypes.DISHES_LOADING:
      return {...state, isLoading: true, errMess: null, dishes: []}

    case ActionTypes.DISHES_FAILED:
      return {...state, isLoading: false, errMess: action.payload};

    default:
      return state;
  }
};
```

* Add a new component named *LoadingComponent.js* to display a loading message as follows:

```jsx
import React from 'react';

export const Loading = () => {
  return(
    <div className="col-12">
      <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
      <p>Loading . . .</p>
    </div>
  );
};
```

* Now we will update the remaining components to use the actions. First, open *MainComponent.js* and update it as follows:

```jsx
. . .

import { addComment, fetchDishes } from '../redux/ActionCreators';

. . .

  fetchDishes: () => { dispatch(fetchDishes())}
  
. . .

  componentDidMount() {
    this.props.fetchDishes();
  }
  
. . .

    const HomePage = () => {
      return(
        <Home 
            dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail
            dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment} />
      );
    };
    
. . .
```

* Open *DishdetailComponent.js* and update it as follows:

```jsx
. . .

import { Loading } from './LoadingComponent';

. . .

            
    if (props.isLoading) {
      return(
        <div className="container">
          <div className="row">            
            <Loading />
          </div>
        </div>
      );
    }
    else if (props.errMess) {
      return(
        <div className="container">
          <div className="row">            
            <h4>{props.errMess}</h4>
          </div>
        </div>
      );
    }
    else if (props.dish != null) 
        
. . .
```

* Open *HomeComponent.js* and update it as follows:

```jsx
. . .

import { Loading } from './LoadingComponent';

. . .


function RenderCard({item, isLoading, errMess}) {
    
  if (isLoading) {
    return(
      <Loading />
    );
  }
  else if (errMess) {
    return(
      <h4>{errMess}</h4>
    );
  }
  else 
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

. . .

          <RenderCard item={props.dish} isLoading={props.dishesLoading} errMess={props.dishesErrMess}  />

. . .
```

* Finally, update *MenuComponent.js* as follows:

```jsx
. . .

import { Loading } from './LoadingComponent';

. . .

    const menu = props.dishes.dishes.map((dish) => {
          
. . .


    if (props.dishes.isLoading) {
      return(
        <div className="container">
          <div className="row">            
            <Loading />
          </div>
        </div>
      );
    }
    else if (props.dishes.errMess) {
      return(
        <div className="container">
          <div className="row"> 
            <div className="col-12">
              <h4>{props.dishes.errMess}</h4>
            </div>
          </div>
        </div>
      );
    }
    else
        
. . .
```

&nbsp;

---

&nbsp;

### React-Redux-Form Revisited

&nbsp;

##### **Updating the Feedback Form**

* Add a new file named *forms.js* in the redux folder and add the following to it:

```js
export const InitialFeedback = {
  firstname: '',
  lastname: '',
  telnum: '',
  email: '',
  agree: false,
  contactType: 'Tel.',
  message: ''
};
```

* Then, open *configureStore.js* and update it to add the form to the reducers:

```js
. . .

import { createForms } from 'react-redux-form';

. . .

import { InitialFeedback } from './forms';

. . .

    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      ...createForms({
        feedback: InitialFeedback
      })
    }),
        
. . .
```

* Next, open *MainComponent.js* and update it as follows:

```jsx
. . .

import { actions } from 'react-redux-form';

. . .

  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
  
. . .

              <Route exact path='/contactus'
                  component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              
. . .
```

* Open *CommentComponent.js* and update it as follows:

```jsx
. . .

import { Control, Form, Errors, actions } from 'react-redux-form';

. . .

  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    this.props.resetFeedbackForm();
    // event.preventDefault();
  }

. . .

            <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                          
              . . .
                          

            </Form>

. . .
```

&nbsp;

---

&nbsp;

### Setting up a Server using json-server

&nbsp;

##### **Installing json-server**

* json-server is a node module, and hence can be installed globally by typing the following at the command prompt:

```powershell
npm install json-server -g
```

If you are using OSX or Linux, use sudo at the front of the command. This will install json-server that can be started from the command line from any folder on your computer.

&nbsp;

##### **Configuring the Server**

* At any convenient location on your computer, create a new folder named **json-server**, and move to this folder.

* Download the db.json file provided above to this folder.

* Move to this folder in your terminal window, and type the following at the command prompt to start the server:

```powershell
json-server --watch db.json -p 3001 -d 2000
```

* This should start up a server at port number 3001 on your machine. The data from this server can be accessed by typing the following addresses into your **browser address bar**:

```powershell
http://localhost:3001/dishes
http://localhost:3001/promotions
http://localhost:3001/leaders
http://localhost:3001/feedback
```

* Type these addresses into the browser address and see the JSON data being served up by the server. This data is obtained from the db.json file

* The json-server also provides a static web server. Any resources that you put in a folder named **public** in the **json-server** folder above, will be served by the server at the following address:

```powershell
http://localhost:3001/
```

* Shut down the server by typing ctrl-C in the terminal window.

&nbsp;

##### **Serving up the Images**

* Create a public folder in your json-server folder.

* Download the images.zip file that we provide above, unzip it and move the images folder containing the images to the public folder.

* Restart the json-server as we did before. Now your server will serve up the images for our React app. You can view these images by typing the following into your browser address bar:

```powershell
http://localhost:3001/images/<image name>.png
```

&nbsp;

---

&nbsp;

### Fetch from Server

&nbsp;

##### **Fetch**

* As a first step, let us install Fetch into our project as follows:

```powershell
yarn add cross-fetch@2.1.0
```

* Now that we have installed Fetch, let us configure your application to connect to the server. First, create a file named *baseUrl.js* in the *shared* folder and add the following to it:

```powershell
export const baseUrl = 'http://localhost:3001/';
```

* Make sure that the json-server is running and serving up the data as illustrated in the previous exercise

* Next, open *ActionTypes.js* and add the following:

```js
. . .

export const ADD_COMMENTS = 'ADD_COMMENTS';
export const COMMENTS_FAILED = 'COMMENTS_FAILED';
export const PROMOS_LOADING = 'PROMOS_LOADING';
export const ADD_PROMOS = 'ADD_PROMOS';
export const PROMOS_FAILED = 'PROMOS_FAILED';
```

* Then, open *ActionCreators.js* and update it as follows:

```js
. . .

import { baseUrl } from '../shared/baseUrl';

. . .

  return fetch(baseUrl + 'dishes')
  .then(response => response.json())
  .then(dishes => dispatch(addDishes(dishes)));
    
. . .


export const fetchComments = () => (dispatch) => {    
  return fetch(baseUrl + 'comments')
  .then(response => response.json())
  .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
  .then(response => response.json())
  .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
```

* Next, open *comments.js* and update it as follows:

```js
import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMMENT:
        var comment = action.payload;
        comment.id = state.comments.length;
        comment.date = new Date().toISOString();
        return { ...state, comments: state.comments.concat(comment)};

    default:
      return state;
  }
};
```

* Similarly, open *promotions.js* and update it as follows:

```js
import * as ActionTypes from './ActionTypes';

export const Promotions = (state  = { isLoading: true,
                                      errMess: null,
                                      promotions:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
    return {...state, isLoading: false, errMess: null, promotions: action.payload};

    case ActionTypes.PROMOS_LOADING:
      return {...state, isLoading: true, errMess: null, promotions: []}

    case ActionTypes.PROMOS_FAILED:
      return {...state, isLoading: false, errMess: action.payload};

    default:
      return state;
  }
};
```

* Now that the Redux actions are all updated, it's time to update the components.

* Open *MainComponent.js* and update it as follows:

```jsx
. . .

import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

. . .


const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});

. . .

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  
. . .

          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
          
. . .

          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            addComment={this.props.addComment}
          />
          
. . .
```

* Then, open *MenuComponent.js* and update it as follows:

```jsx
. . .

import { baseUrl } from '../shared/baseUrl';

. . .

          <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    
. . .
```

* Then, open *HomeComponent.js* and update it as follows:

```jsx
. . .

import { baseUrl } from '../shared/baseUrl';

. . .

        <CardImg src={baseUrl + item.image} alt={item.name} />
                
. . .

          <RenderCard item={props.promotion} isLoading={props.promoLoading} errMess={props.promoErrMess} />
                    
. . .
```

* Then, open *DishdetailComponent.js* and update it as follows:

```jsx
. . .

import { baseUrl } from '../shared/baseUrl';

. . .

        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                
. . .
```

&nbsp;

---

&nbsp;

### Fetch Handling Errors

&nbsp;

##### **Handling Errors**

* Open *ActionCreators.js* and update it as follows:

```js
. . .

export const fetchDishes = () => (dispatch) => {

  dispatch(dishesLoading(true));

  return fetch(baseUrl + 'dishes')
    .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
    var errmess = new Error(error.message);
    throw errmess;
  })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

. . .

export const fetchComments = () => (dispatch) => {    
  return fetch(baseUrl + 'comments')
    .then( response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
    var errmess = new Error(error.message);
    throw errmess;
  })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

. . .

export const fetchPromos = () => (dispatch) => {
    
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
    .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
    var errmess = new Error(error.message);
    throw errmess;
  })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

. . .
```

&nbsp;

---

&nbsp;

### Fetch Post Comment

&nbsp;

##### **Posting a Comment**

* Open *ActionCreators.js* and update it as follows:

```js
. . .

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  };
  newComment.date = new Date().toISOString();
    
  return fetch(baseUrl + 'comments', {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
    throw error;
  })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

. . .
```

Open *comment.js* and **remove** the following two lines from it:

```js
. . .

    comment.id = state.comments.length;
    comment.date = new Date().toISOString();
 
 . . .
```

* Open *MainComponent.js* and update it as follows:

```jsx
. . .

import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

. . .

  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))

. . .

          postComment={this.props.postComment}
            
. . .
```

* Finally, open *DishdetailComponent.js* and update it as follows:

```jsx
. . .

  function RenderComments({comments, postComment, dishId}) {
      
. . .

          <CommentForm dishId={dishId} postComment={postComment} />
                    
. . .

      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
            
. . .

              postComment={props.postComment}
                            
. . .
```

&nbsp;

---

&nbsp;

### React Animations

&nbsp;

##### **Installing React-Transition-Group**

* Install react-transition-group in your React project as follows:

```powershell
yarn add react-transition-group@2.3.0
```

* Configure CSS classes for use in animation. Open *App.css* and add the following classes:

```css
. . .

.page-enter {
  opacity: 0.01;
  transform: translateX(-100%);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0%);
  transition: all 300ms ease-in;
}

.page-exit {
  opacity: 1;
  transform: translateX(0%);
}

.page-exit-active {
  opacity: 0.01;
  transform: translateX(100%);
  transition: all 300ms ease-out;
}

```

Then, open *MainComponent.js* and add in the following to configure the animation:

```jsx
. . .

import { TransitionGroup, CSSTransition } from 'react-transition-group';

. . .

          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                <Route path='/home' component={HomePage} />
                <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />} />
                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/contactus' component={() =>
                  <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                />} />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          
. . .
```

&nbsp;

---

&nbsp;

### React Animation Components

&nbsp;

##### **Installing React-Animation-Components**

* Install react-animation-components into your React app as follows:

```powershell
yarn add react-animation-components@3.0.0
yarn add prop-types@15.6.0
```

&nbsp;

##### **Adding Animations**

* Open *HomeComponents.js* and update as follows:

```jsx
. . .

import { FadeTransform } from 'react-animation-components';

. . .

      <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
            
. . .
```

* Open *DishdetailComponents.js* and update it as follows:

```jsx
. . .

import { FadeTransform, Fade, Stagger } from 'react-animation-components';

. . .

      <FadeTransform
          in
          transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
        <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
            
. . .

          <Stagger in>
            {comments.map((comment) => {
              return (
                <Fade in>
                  <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US',
                                                { year: 'numeric', month: 'short', day: '2-digit'})
                                                  .format(new Date(Date.parse(comment.date)))}
                    </p>
                  </li>
                </Fade>
              );
            })}
          </Stagger>
                        
. . .
```