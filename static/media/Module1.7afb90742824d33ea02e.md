## Introduction to Server-Side Development

&nbsp;

---

&nbsp;

### Understanding Node Modules

&nbsp;

##### **Starting a Node Application**

* Go to a convenient location on your computer and create a folder named *NodeJS*. Then move to this folder.

* Now create a folder named *node-examples* and then move into this folder.

* At the prompt, type the following to initialize a *package.json* file in the node-examples folder:

`npm init`

* Accept the standard defaults suggested and then update the *package.json* file until you end up with the file containing the following:

```json
{
  "name": "node-examples",
  "version": "1.0.0",
  "description": "Simple Node Examples",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index"
  },
  "author": "Jogesh Muppala",
  "license": "ISC"
}
```

* Create a file named *index.js* and add the following code to this file:

```js
var rect = {
	perimeter: (x, y) => (2*(x+y)),
	area: (x, y) => (x*y)
};

function solveRect(l,b) {
  console.log("Solving for rectangle with l = " + l + " and b = " + b);

  if (l <= 0 || b <= 0) {
    console.log("Rectangle dimensions should be greater than zero:  l = "
                + l + ",  and b = " + b);
  }
  else {
    console.log("The area of the rectangle is " + rect.area(l,b));
    console.log("The perimeter of the rectangle is " + rect.perimeter(l,b));
  }
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);
```

* To run the Node application, type the following at the prompt:

`npm start`

* To initialize a Git repository and add the current files in the folder to the repository, type the following at the prompt:

```
git init
git add .
```

&nbsp;

##### **A Simple Node Module**

* Now, create a file named *rectangle.js*, and add the following code to it:

```js
exports.perimeter =  (x, y) => (2*(x+y));

exports.area = (x, y) => (x*y);
```

* Then, update *index.js* as follows:

```js
var rect = require('./rectangle');

. . .
```

* Run the Node application like before and observe that the result will be the same.

&nbsp;

---

&nbsp;

### Node Modules: Callbacks and Error Handling

&nbsp;

##### **Using Callbacks and Error Handling**

* Update  *rectangle.js* as shown below:

```js
module.exports = (x,y,callback) => {
  if (x <= 0 || y <= 0)
    setTimeout(() => 
      callback(new Error("Rectangle dimensions should be greater than zero: l = "
                          + x + ", and b = " + y), 
      null),
      2000);
  else
      setTimeout(() => 
          callback(null, {
              perimeter: () => (2*(x+y)),
              area:() => (x*y)
          }), 
          2000);
}
```

* Then,  update *index.js* as shown below:

```js
. . .

function solveRect(l,b) {
  console.log("Solving for rectangle with l = "
              + l + " and b = " + b);
  rect(l,b, (err,rectangle) => {
    if (err) {
      console.log("ERROR: ", err.message);
    }
      else {
        console.log("The area of the rectangle of dimensions l = "
                    + l + " and b = " + b + " is " + rectangle.area());
        console.log("The perimeter of the rectangle of dimensions l = "
                    + l + " and b = " + b + " is " + rectangle.perimeter());
      }
  });
  console.log("This statement after the call to rect()");
};

. . .
```

* Run the Node application as before and see the result.

&nbsp;

---

&nbsp;

### Node and the HTTP Module

&nbsp;

##### **A Simple HTTP Server**

* Create a folder named *node-http* in the *NodeJS* folder and move into the folder.

* In the *node-http* folder, create a subfolder named *public*.

* At the prompt, type the following to initialize a package.json file in the node-examples folder:

`npm init`

* Accept the standard defaults suggested until you end up with a package.json file containing the following:

```json
{
  "name": "node-http",
  "version": "1.0.0",
  "description": "Node HTTP Module Example",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index"
  },
  "author": "Jogesh Muppala",
  "license": "ISC"
}
```

* Create a file named *index.js* and add the following code to it:

```js
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>Hello, World!</h1></body></html>');
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

* Start the server by typing the following at the prompt:

`npm start`

* Then you can type **http://localhost:3000** in your browser address bar and see the result.

* You can also use postman chrome extension to send requests to the server and see the response. Alternately, you can download the stand-alone Postman tool from **http://getpostman.com** and install it on your computer.

* Initialize a Git repository, check in the files and do a Git commit with the message "Node HTTP Example 1".

&nbsp;

---

&nbsp;

##### **Serving HTML Files**

* In the *public* folder, create a file named *index.html* and add the following code to it:

```html
<html>
<title>This is index.html</title>
<body>
<h1>Index.html</h1>
<p>This is the contents of this file</p>
</body>
</html>
```

* Similarly create an *aboutus.html* file and add the following code to it:

```html
<html>
<title>This is aboutus.html</title>
<body>
<h1>Aboutus.html</h1>
<p>This is the contents of the aboutus.html file</p>
</body>
</html>
```

* Then update *index.js* as follows:

```js
. . .

const fs = require('fs');
const path = require('path');

. . .

const server = http.createServer((req, res) => {
  console.log('Request for ' + req.url + ' by method ' + req.method);

  if (req.method == 'GET') {
    var fileUrl;
    if (req.url == '/') fileUrl = '/index.html';
    else fileUrl = req.url;

    var filePath = path.resolve('./public'+fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == '.html') {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + fileUrl + 
                  ' not found</h1></body></html>');
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
      });
    }
    else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + fileUrl + 
              ' not a HTML file</h1></body></html>');
    }
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Error 404: ' + req.method + 
            ' not supported</h1></body></html>');
  }
})

. . .
```

* Start the server, and send various requests to it and see the corresponding responses.

&nbsp;

---

&nbsp;

### Introduction to Express

&nbsp;

##### **A Simple Server using Express**

* Create a folder named *node-express* in the NodeJS folder and move to that folder.

* Copy the *public* folder from node-http to this folder.

* At the prompt, type the following to initialize a package.json file in the node-express folder:

`npm init`

* Accept the standard defaults suggested until you end up with a package.json file containing the following:

```json
{
  "name": "node-express",
  "version": "1.0.0",
  "description": "Node Express Examples",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index"
  },
  "author": "Jogesh Muppala",
  "license": "ISC"
}
```

* Then, install the Express framework in the folder by typing the following at the prompt:

`npm install express@4.16.3 --save`

* Create a file named *.gitignore* and add the following to it:

`node_modules`

* Create a file named *index.js* and add the following code to it:


```js
const express = require('express'),
      http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

* Start the server by typing the following at the prompt, and then interact with the server:

`npm start`

&nbsp;

##### **Serving Static Files**

* Install *morgan* by typing the following at the prompt. Morgan is used for logging purposes:

`npm install morgan@1.9.0 --save`

* Update *index.js* as follows:

```js
. . .

const morgan = require('morgan');

. . .

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

. . .
```

* Start the server and interact with it and observe the behavior.

&nbsp;

---

&nbsp;

### Express Router

&nbsp;

##### **Setting up a REST API**

* You will continue in the *node-express* folder and modify the server in this exercise.

* Install body-parser by typing the following at the command prompt:

`npm install body-parser@1.18.3 --save`

* Update *index.js* as shown below:

```js
. . .

const bodyParser = require('body-parser');

. . .

app.use(bodyParser.json());

app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.get('/dishes', (req,res,next) => {
  res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
 res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
});
 
app.delete('/dishes', (req, res, next) => {
  res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', (req,res,next) => {
  res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
          ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
  res.end('Deleting dish: ' + req.params.dishId);
});

. . .
```

* Start the server and interact with it from the browser/postman.

&nbsp;

##### **Using Express Router**

* Create a new folder named *routes* in the *node-express* folder.

* Create a new file named *dishRouter.js* in the *routes* folder and add the following code to it:

```js
const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
  .all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req,res,next) => {
    res.end('Will send all the dishes to you!');
  })
  .post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  })
  .delete((req, res, next) => {
    res.end('Deleting all dishes');
  });

module.exports = dishRouter;
```

* Update *index.js* as follows:

```js
. . .


const dishRouter = require('./routes/dishRouter');

app.use('/dishes', dishRouter);

. . .
```
* Start the server and interact with it and see the result.