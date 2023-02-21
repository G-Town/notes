## User Authentication

&nbsp;

---

&nbsp;

### Basic Authentication

&nbsp;

##### **Setting up Basic Authentication**

* You will continue with the Express REST API server that you have been working on in the previous module in the *conFusionServer* folder.

* Open the *app.js* file and update its contents as follows:

```js
. . .

function auth (req, res, next) {
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if (!authHeader) {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    next(err);
    return;
  }

  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  if (user == 'admin' && pass == 'password') {
    next(); // authorized
  } else {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');      
    err.status = 401;
    next(err);
  }
}

app.use(auth);

. . .
```

* Save the changes and start the server. Access the server from a browser by opening an incognito window and see the result.

&nbsp;

---

&nbsp;

### Using Cookies

&nbsp;

##### **Using cookie-parser**

* The *cookie-parser* Express middleware is already included in the Express REST API application. If you need to add Cookie parser middleware then you can install the NPM module as follows:

`npm install cookie-parser@1.4.3 --save`

* Update *app.js* as follows:

```js
. . .

app.use(cookieParser('12345-67890-09876-54321'));

function auth (req, res, next) {

  if (!req.signedCookies.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');              
      err.status = 401;
      next(err);
      return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
      res.cookie('user','admin',{signed: true});
      next(); // authorized
    } else {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');              
      err.status = 401;
      next(err);
    }
  }
  else {
    if (req.signedCookies.user === 'admin') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
}

. . .
```

* Save the changes, run the server and test the behavior.

&nbsp;

---

&nbsp;

### Express Sessions

&nbsp;

##### **Installing express-session**

* Still in the conFusionServer folder, install *express-session* and *session-file-store* Node modules as follows:

`npm install express-session@1.15.6 session-file-store@1.2.0 --save`

&nbsp;

##### **Using express-session**

* Then, update *app.js* as follows to use Express session:

```js
. . .

var session = require('express-session');
var FileStore = require('session-file-store')(session);

. . .

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

function auth (req, res, next) {
    console.log(req.session);

  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');                        
      err.status = 401;
      next(err);
      return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
      req.session.user = 'admin';
      next(); // authorized
    } else {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  }
  else {
    if (req.session.user === 'admin') {
      console.log('req.session: ',req.session);
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
}

. . .
```

&nbsp;

##### **User Model and User Authentication**

* Add a new Mongoose model for *users* in the file named *user.js* in the *models* folder, and add the following to it:

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password:  {
    type: String,
    required: true
  },
  admin:   {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', User);
```

* Update *users.js* in the routes folder to support user registration, login and logout:

```js
. . .

const bodyParser = require('body-parser');
var User = require('../models/user');

router.use(bodyParser.json());

. . .

router.post('/signup', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then((user) => {
    if(user != null) {
      var err = new Error('User ' + req.body.username + ' already exists!');
      err.status = 403;
      next(err);
    }
    else {
      return User.create({
        username: req.body.username,
        password: req.body.password});
    }
  })
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'Registration Successful!', user: user});
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.post('/login', (req, res, next) => {

  if(!req.session.user) {
    var authHeader = req.headers.authorization;
    
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
  
    User.findOne({username: username})
    .then((user) => {
      if (user === null) {
        var err = new Error('User ' + username + ' does not exist!');
        err.status = 403;
        return next(err);
      }
      else if (user.password !== password) {
        var err = new Error('Your password is incorrect!');
        err.status = 403;
        return next(err);
      }
      else if (user.username === username && user.password === password) {
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are authenticated!')
      }
    })
    .catch((err) => next(err));
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

. . .
```

* Next, update *app.js* as follows to use the user authentication support:

```js
. . .

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth (req, res, next) {
  console.log(req.session);

  if(!req.session.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
  }
  else {
    if (req.session.user === 'authenticated') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }
}

. . .
```

* Save the changes and test the server.

&nbsp;

---

&nbsp;

### User Authentication with Passport

&nbsp;

##### **Installing Passport**

* You will continue working with the Express REST API Server in the *conFusionServer* folder. You will modify this project to set up user authentication support using Passport.

* Install the Passport and related Node modules as follows:

`npm install passport@0.4.0 passport-local@1.0.0 passport-local-mongoose@5.0.1 --save`

&nbsp;

##### **Updating User Schema and Model**

* In the models folder, update *user.js* by adding the following code to it:

```js
. . .

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  admin:   {
    type: Boolean,
    default: false
  }
});

User.plugin(passportLocalMongoose);

. . .
```

&nbsp;

##### **Adding Passport-based Authentication**

* Add a new file named *authenticate.js* to the project folder and initialize it as follows:

```js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

* Open *users.js* file in the *routes* folder and update the code as follows:

```js
. . .

var passport = require('passport');

. . .


router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are successfully logged in!'});
});

. . .
```

* Finally, update *app.js* as follows:

```js
. . .

var passport = require('passport');
var authenticate = require('./authenticate');

. . .

app.use(passport.initialize());
app.use(passport.session());

. . .

function auth (req, res, next) {
  console.log(req.user);

  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
  }
  else {
    next();
  }
}

. . .
```

* Save the changes and test the server by sending various requests.

&nbsp;

---

&nbsp;

### User Authentication with Passport and JSON Web Token

&nbsp;

##### **Installing passport-jwt and jsonwebtoken Node Modules**

* You will continue working with the Express REST API Server in the *conFusionServer* folder. You will modify this project to set up user authentication support using tokens and Passport.

* Install the *passport-jwt* and the *jsonwebtoken* modules as follows:

`npm install passport-jwt@4.0.0 jsonwebtoken@8.3.0 --save`

&nbsp;

##### **Updating the App to use JSON Web Tokens**

* Create a new file named *config.js* and add the following code to it:

```js
module.exports = {
  'secretKey': '12345-67890-09876-54321',
  'mongoUrl' : 'mongodb://localhost:27017/conFusion'
}
```

&nbsp;

##### **Supporting JSON Web Tokens and Verification**

* Update *authenticate.js* as follows:

```js
. . .

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');

. . .


exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
  (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user) => {
      if (err) {
        return done(err, false);
      }
      else if (user) {
        return done(null, user);
      }
      else {
        return done(null, false);
      }
    });
  }));

exports.verifyUser = passport.authenticate('jwt', {session: false});
```

* Open *users.js* file in the routes folder and update the code as follows:

```js
. . .

var authenticate = require('../authenticate');

. . .

router.post('/login', passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

. . .
```

* Update *app.js* to remove the auth function and the app.use(auth), and update as follows:

```js
. . .

var config = require('./config');


. . .

const url = config.mongoUrl;

. . .


```

&nbsp;

##### **Controlling Routes with Authentication**

* Open *dishRouter.js* and updated the code for the '/' route as follows:

```js
. . .

var authenticate = require('../authenticate');

. . .


dishRouter.route('/')


.post(authenticate.verifyUser, (req, res, next) => {

  . . .

})

.put(authenticate.verifyUser, (req, res, next) => {

  . . .

})

.delete(authenticate.verifyUser, (req, res, next) => {

  . . .

});


dishRouter.route('/:dishId')


.post(authenticate.verifyUser, (req, res, next) => {

  . . .

})

.put(authenticate.verifyUser, (req, res, next) => {

  . . .

})

.delete(authenticate.verifyUser, (req, res, next) => {

  . . .

});


dishRouter.route('/:dishId/comments')


.post(authenticate.verifyUser, (req, res, next) => {

  . . .

})

.put(authenticate.verifyUser, (req, res, next) => {

  . . .

})

.delete(authenticate.verifyUser, (req, res, next) => {

  . . .

});


dishRouter.route('/:dishId/comments/:commentId')


.post(authenticate.verifyUser, (req, res, next) => {

  . . .

})

.put(authenticate.verifyUser, (req, res, next) => {

  . . .

})

.delete(authenticate.verifyUser, (req, res, next) => {

  . . .

});


. . .
```

* Do similar updates to *promoRouter.js* and *leaderRouter.js*.

* Save the changes and test the server by sending various requests.

&nbsp;

---

&nbsp;

### Mongoose Population

&nbsp;

##### **Using Mongoose Population**

* Open *user.js* and update the code for the schema as follows:

```js
. . .

var User = new Schema({
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  admin:   {
    type: Boolean,
    default: false
  }
});

. . .
```

* Open *dishes.js* and update the comment schema as follows:

```js
. . .

var commentSchema = new Schema({
  rating:  {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment:  {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

. . .
```

* Open *dishRouter.js* and update the routers and the methods as shown below:

```js
. . .

dishRouter.route('/')
  .get((req,res,next) => {
    Dishes.find({})
      .populate('comments.author')
      .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
      }, (err) => next(err))
        .catch((err) => next(err));
  })

. . .

dishRouter.route('/:dishId')
  .get((req,res,next) => {
    Dishes.findById(req.params.dishId)
      .populate('comments.author')
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, (err) => next(err))
        .catch((err) => next(err));
  })

. . .

dishRouter.route('/:dishId/comments')
  .get((req,res,next) => {
    Dishes.findById(req.params.dishId)
      .populate('comments.author')
      .then((dish) => {
        if (dish != null) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(dish.comments);
        }
        else {
          err = new Error('Dish ' + req.params.dishId + ' not found');
          err.status = 404;
          return next(err);
        }
      }, (err) => next(err))
        .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then((dish) => {
        if (dish != null) {
          req.body.author = req.user._id;
          dish.comments.push(req.body);
          dish.save()
            .then((dish) => {
              Dishes.findById(dish._id)
                .populate('comments.author')
                .then((dish) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(dish);
                })            
            }, (err) => next(err));
        }
        else {
          err = new Error('Dish ' + req.params.dishId + ' not found');
          err.status = 404;
          return next(err);
        }
      }, (err) => next(err))
        .catch((err) => next(err));
  })

. . .

dishRouter.route('/:dishId/comments/:commentId')
  .get((req,res,next) => {
    Dishes.findById(req.params.dishId)
      .populate('comments.author')    
      .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null) {
          err = new Error('Dish ' + req.params.dishId + ' not found');
          err.status = 404;
          return next(err);
        }
        else {
          err = new Error('Comment ' + req.params.commentId + ' not found');
          err.status = 404;
          return next(err);            
        }
      }, (err) => next(err))
        .catch((err) => next(err));
  })

. . .

.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Dishes.findById(req.params.dishId)
    .then((dish) => {
      if (dish != null && dish.comments.id(req.params.commentId) != null) {
        if (req.body.rating) {
          dish.comments.id(req.params.commentId).rating = req.body.rating;
        }
        if (req.body.comment) {
          dish.comments.id(req.params.commentId).comment = req.body.comment;                
        }
          dish.save()
            .then((dish) => {
              Dishes.findById(dish._id)
                .populate('comments.author')
                .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);  
                })              
            }, (err) => next(err));
      }
      else if (dish == null) {
        err = new Error('Dish ' + req.params.dishId + ' not found');
        err.status = 404;
        return next(err);
      }
      else {
        err = new Error('Comment ' + req.params.commentId + ' not found');
        err.status = 404;
        return next(err);            
      }
    }, (err) => next(err))
      .catch((err) => next(err));
})
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {

          dish.comments.id(req.params.commentId).remove();
          dish.save()
            .then((dish) => {
              Dishes.findById(dish._id)
                .populate('comments.author')
                .then((dish) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(dish);  
                })               
            }, (err) => next(err));
        }
        else if (dish == null) {
          err = new Error('Dish ' + req.params.dishId + ' not found');
          err.status = 404;
          return next(err);
        }
        else {
          err = new Error('Comment ' + req.params.commentId + ' not found');
          err.status = 404;
          return next(err);            
        }
      }, (err) => next(err))
        .catch((err) => next(err));
  });

. . .
```

* Open *users.js* and update the register function as follows:

```js
. . .

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
      if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else {
        if (req.body.firstname)
          user.firstname = req.body.firstname;
        if (req.body.lastname)
          user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
            return ;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
          });
        });
      }
    }
  );
});

. . .
```

* Save all the changes and start the server and test.

* If you happen to have a registered user in your MongoDB, then use the Mongo REPL to delete the user.