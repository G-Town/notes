## Backend as a Service (BaaS)

&nbsp;

---

&nbsp;

### HTTPS and Secure Communication

&nbsp;

##### **Generating Private Key and Certificate**

* Go to the bin folder and then create the private key and certificate by typing the following at the prompt:

```
openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem
```

**Note for Windows Users**: If you are using a Windows machine, you may need to install openssl. You can find some 
openssl binary distributions here. Also, this article gives the steps for generating the certificates in Windows. 
Another article provides similar instructions. Here's an online service to generate self-signed certificates.

&nbsp;

##### **Configuring the HTTPS Server**

* Open the www file in the bin directory and update its contents as follows:

```js
. . .

var https = require('https');
var fs = require('fs');

. . .

app.set('secPort',port+443);

. . .

/**
 * Create HTTPS server.
 */

var options = {
  key: fs.readFileSync(__dirname+'/private.key'),
  cert: fs.readFileSync(__dirname+'/certificate.pem')
};

var secureServer = https.createServer(options,app);

/**
 * Listen on provided port, on all network interfaces.
 */

secureServer.listen(app.get('secPort'), () => {
   console.log('Server listening on port ',app.get('secPort'));
});
secureServer.on('error', onError);
secureServer.on('listening', onListening);

. . .
```

* Open *app.js* and add the following code to the file:

```js
. . .

// Secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

. . .
```

* Run the server and test.

&nbsp;

---

&nbsp;

### Uploading Files

&nbsp;

##### **Installing Multer**

* At the prompt in your conFusionServer project, type the following to install Multer:

`npm install multer@1.3.1 --save`

&nbsp;

##### **Setting up File Uploading**

* Add a new Express router named uploadRouter.js in the routes folder and add the following code to it:

```js
const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const imageFileFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('You can upload only image files!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  res.statusCode = 403;
  res.end('GET operation not supported on /imageUpload');
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(req.file);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /imageUpload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;
```

* Then update *app.js* to import the uploadRouter and configure the new route as follows:

```js
. . .

const uploadRouter = require('./routes/uploadRouter');


. . .

app.use('/imageUpload',uploadRouter);

. . .
```

* Save all the changes and test your server.

&nbsp;

---

&nbsp;

### Cross-Origin Resource Sharing

&nbsp;

##### **Installing cors Module**

* To install the cors module, type the following at the prompt:

`npm install cors@2.8.4 --save`

&nbsp;

##### **Configuring the Server for CORS**

* In the routes folder, add a new file named *cors.js* and add the following code to it:

```js
const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  console.log(req.header('Origin'));
  if(whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  }
  else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
```

* Then, open *dishRouter.js* and update it as follows:

```js
. . .

const cors = require('./cors');

. . .

dishRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, (req,res,next) => {
  
  . . .

  });

. . .

  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .

  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .

  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .

dishRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {

  . . .

  });
  
. . .

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .

dishRouter.route('/:dishId/comments')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {

  . . .

  });
  
. . .

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .

dishRouter.route('/:dishId/comments/:commentId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {

  . . .

  });
  
. . .

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

  . . .

  });

. . .
```

* Do similar updates to promoRouter.js, leaderRouter.js, uploadRouter.js and users.js.

* Save all the changes and test your server.

&nbsp;

---

&nbsp;

### Using OAuth with Passport and Facebook

&nbsp;

##### **Registering your app on Facebook**

* Go to https://developers.facebook.com/apps/ and register your app by following the instructions there and obtain your App ID and App Secret.

* Copy the *index.html* file provided and move it into the public folder to replace the *index.html* file if you already have one there.

* In the *index.html* file, replace the "YOUR CLIENT ID" with the Client App ID that you obtain above.

&nbsp;

##### **Installing passport-facebook-token Module**

* In the *conFusionServer* folder, install passport-facebook-token module by typing the following at the prompt:

`npm install passport-facebook-token@3.3.0 --save`

&nbsp;

##### **Updating config.js**

* Update *config.js* with the App ID and App Secret that you obtained earlier as follows:

```js
module.exports = {
  'secretKey': '12345-67890-09876-54321',
  'mongoUrl': 'mongodb://localhost:27017/conFusion',
  'facebook': {
    clientId: 'Your Client App ID',
    clientSecret: 'Your Client App Secret'
  }
}
```

&nbsp;

##### **Updating User Model**

* Open *user.js* from the models folder and update the User schema as follows:

```js
var User = new Schema({
. . .

  facebookId: String,

. . .
});
```

&nbsp;

##### **Setting up Facebook Authentication**

* Open *authenticate.js* and add in the following line to add Facebook strategy:

```js
. . .

var FacebookTokenStrategy = require('passport-facebook-token');

. . .

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (!err && user !== null) {
        return done(null, user);
      }
      else {
        user = new User({ username: profile.displayName });
        user.facebookId = profile.id;
        user.firstname = profile.name.givenName;
        user.lastname = profile.name.familyName;
        user.save((err, user) => {
          if (err)
            return done(err, false);
          else
            return done(null, user);
        })
      }
    });
  }
));
```

&nbsp;

##### **Updating users.js**

* Open *users.js* and add the following code to it:

```js
. . .

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});

. . .
```

* Start your server and test your application. 

* In a browser, open https://localhost:3443/index.html to open the *index.html* file. Then click on the Facebook Login 
button to log into Facebook. At the end of the login process, open your browser's JavaScript console and then obtain the 
Access Token from there.

* Then you can use the access token to contact the server at https://localhost:3443/users/facebook/token and pass in the 
token using the Authorization header with the value as Bearer <Access Token> to obtain the JWT token from the server.