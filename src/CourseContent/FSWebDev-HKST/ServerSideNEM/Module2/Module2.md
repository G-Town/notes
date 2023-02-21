## MongoDB

&nbsp;

---

&nbsp;

### Express Generator

&nbsp;

##### **Installing express-generator**

* Install *express-generator* by typing the following at the prompt:

`npm install express-generator@4.16.0 -g`

Use sudo if you are using an OSX or Linux machine.

**Note**: You may need to restart your terminal/cmd window in order for the express command to be available at the prompt.

&nbsp;

##### **Scaffolding an Express Application**

* To scaffold out an Express application, type the following at the prompt:

`express conFusionServer`

* Next, move to the *conFusionServer* folder. Type the following at the command prompt to install all the Node modules

`npm install`

* You can start the Express server by typing the following at the prompt:

`npm start`

* Add a file named *.gitignore* to the project folder and type the following into the file:

`node_modules`

&nbsp;

---

&nbsp;

##### **Implementing a REST API**

* Now, copy the *dishRouter.js*, *promoRouter.js*, and *leaderRouter.js* from your first assignment (*node-express/routes* folder) to the routes folder within the Express application that you just scaffolded out.

* Furthermore, copy the *index.html* and *aboutus.html* file from the *node-express/public* folder to the *public* folder in your new project.

* Then, open the *app.js* file and then update the code in there as follows:

```js
. . .

var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

. . .

app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

. . .
```

* Save the changes and run the server. You can then test the server by sending requests and observing the behavior.

&nbsp;

---

&nbsp;

### Introduction to MongoDB

&nbsp;

##### **Downloading and Installing MongoDB**

* Go to http://www.mongodb.org, then download and install MongoDB as per the instructions given there.

* Create a folder named *mongodb* on your computer and create a subfolder under it named *data*.

* Move to the *mongodb* folder and then start the MongoDB server by typing the following at the prompt:

`mongod --dbpath=data --bind_ip 127.0.0.1`

* Open another command window and then type the following at the command prompt to start the mongo REPL shell:

`mongo`

* The Mongo REPL shell will start running and give you a prompt to issue commands to the MongoDB server. At the Mongo REPL prompt, type the following commands one by one and see the resulting behavior:

```
db
use conFusion
db
db.help()
```

* You will now create a collection named dishes, and insert a new dish document in the collection:

`db.dishes.insert({ name: "Uthappizza", description: "Test" });`

* Then to print out the dishes in the collection, type:

`db.dishes.find().pretty();`

**Note the "_id" assigned to the dish.**

* Next, we will learn the information encoded into the ObjectId by typing the following at the prompt:

```
var id = new ObjectId();
id.getTimestamp();
```

* Type "exit" at the REPL prompt to exit the Mongo REPL.

&nbsp;

---

&nbsp;

### Node and MongoDB

&nbsp;

##### **Installing the Node MongoDB Driver Module**

* Create a new folder named **node-mongo** and move into the folder.

* At the prompt, type the following to initialize a package.json file in the node-mongo folder:

`npm init`

* Accept the standard defaults suggested until you end up with a package.json file containing the following:

```json
{
  "name": "node-mongo",
  "version": "1.0.0",
  "description": "Node MongoDB Example",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index"
  },
  "author": "Jogesh Muppala",
  "license": "ISC"
}
```

* Install the Node MongoDB driver and the Assert module by typing the following at the prompt:

```
npm install mongodb@3.0.10 --save
npm install assert@1.4.1 --save
```

&nbsp;

##### **A Simple Node-MongoDB Application**

* Create a new file named *index.js* and add the following code to it:

```js
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

  assert.equal(err,null);

  console.log('Connected correctly to server');

  const db = client.db(dbname);
  const collection = db.collection("dishes");
  collection.insertOne({"name": "Uthappizza", "description": "test"},
  (err, result) => {
    assert.equal(err,null);

    console.log("After Insert:\n");
    console.log(result.ops);

    collection.find({}).toArray((err, docs) => {
      assert.equal(err,null);
      
      console.log("Found:\n");
      console.log(docs);

      db.dropCollection("dishes", (err, result) => {
        assert.equal(err,null);

        client.close();
      });
    });
  });

});
```

* Make sure that your MongoDB server is up and running

* Type the following at the prompt to start the server and see the result.

`npm start`

* Add a .gitignore file with the contents "node_modules" in the project folder.

&nbsp;

##### **Implementing a Node Module of Database Operations**

* Create a new file named *operations.js* that contains a few MongoDB operations and add the following code:

```js
const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.insert(document, (err, result) => {
    assert.equal(err, null);
    console.log("Inserted " + result.result.n +
                " documents into the collection " + collection);
    callback(result);
  });
};

exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);        
  });
};

exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteOne(document, (err, result) => {
    assert.equal(err, null);
    console.log("Removed the document ", document);
    callback(result);        
  });
};

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  coll.updateOne(document, { $set: update }, null, (err, result) => {
    assert.equal(err, null);
    console.log("Updated the document with ", update);
    callback(result);        
  });
};

```

&nbsp;

##### **Using the Node Module for Database Operations**

* Update the file named *index.js* as follows:

```js
. . .

const dboper = require('./operations');

. . .

  dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
  "dishes", (result) => {
    console.log("Insert Document:\n", result.ops);

    dboper.findDocuments(db, "dishes", (docs) => {
      console.log("Found Documents:\n", docs);

      dboper.updateDocument(db, { name: "Vadonut" },
          { description: "Updated Test" }, "dishes",
              (result) => {
                console.log("Updated Document:\n", result.result);

                dboper.findDocuments(db, "dishes", (docs) => {
                  console.log("Found Updated Documents:\n", docs);
                  
                  db.dropCollection("dishes", (result) => {
                    console.log("Dropped Collection: ", result);

                    client.close();
                  });
                });
          });
    });
  });
    
. . .
```

* Run the server by typing the following at the prompt and observe the results:

`npm start`

&nbsp;

---

&nbsp;

### Callback Hell and Promises

&nbsp;

##### **Using Promises**

* Update *operations.js* as follows:

```js
const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.insert(document);
};

exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};

```

* Next open *index.js* and update it as follows:

```js
. . .

MongoClient.connect(url).then((client) => {

  console.log('Connected correctly to server');
  const db = client.db(dbname);

  dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
      "dishes")
        .then((result) => {
          console.log("Insert Document:\n", result.ops);

          return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
          console.log("Found Documents:\n", docs);

          return dboper.updateDocument(db, { name: "Vadonut" },
              { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
          console.log("Updated Document:\n", result.result);

          return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
          console.log("Found Updated Documents:\n", docs);
                            
          return db.dropCollection("dishes");
        })
        .then((result) => {
          console.log("Dropped Collection: ", result);

          return client.close();
        })
        .catch((err) => console.log(err));

})
  .catch((err) => console.log(err));
```

* Run the node application and see the result

&nbsp;

---

&nbsp;

### Mongoose ODM

&nbsp;

##### **Installing Mongoose**

* Create a folder named *node-mongoose* and move into the folder.

* At the prompt, type the following to initialize a package.json file in the node-mongoose folder:

`npm init`

Accept the standard defaults suggested until you end up with a package.json file containing the following:

```json
{
  "name": "node-mongoose",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index"
  },
  "author": "Jogesh Muppala",
  "license": "ISC"
}
```

* In this folder, install Mongoose by typing the following at the prompt:

`npm install mongoose@5.1.7 --save`

&nbsp;

##### **Implementing a Node Application**

* Create a sub-folder named *models* in the *node-mongoose* folder. Move to this folder.

* Create a file named *dishes.js* and add the following code to create a Mongoose schema:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
```

* Move to the *node-mongoose* folder and create a file named *index.js* and add the following code:

```js
const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {

  console.log('Connected correctly to server');

  var newDish = Dishes({
    name: 'Uthappizza',
    description: 'test'
  });

  newDish.save()
    .then((dish) => {
      console.log(dish);

      return Dishes.find({});
    })
    .then((dishes) => {
      console.log(dishes);

      return Dishes.remove({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });

});
```

* Make sure that your MongoDB server is up and running. Then at the terminal prompt type the following to start the server and see the result:

`npm start`

* Create a .gitignore file with the contents "node_modules"

&nbsp;

##### **Mongoose Operations**

* Now, update *index.js* as follows:

```js
. . .
    
  Dishes.create({
    name: 'Uthapizza',
    description: 'Test'
  })
  .then((dish) => {
    console.log(dish);
    
    return Dishes.find({}).exec();
  })
  .then((dishes) => {
    console.log(dishes);

    return Dishes.remove({});
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
    
. . .
```

* Run this server on the console and see the result.

&nbsp;

##### **Adding Sub-documents to a Document**

* Update *dishes.js* in the models folder as follows:

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
  author:  {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  comments:[commentSchema]
}, {
  timestamps: true
});

. . .
```

* Update *index.js* as follows:

```js
. . .

  Dishes.create({
    name: 'Uthappizza',
    description: 'test'
  })
  .then((dish) => {
    console.log(dish);

    return Dishes.findByIdAndUpdate(dish._id, {
      $set: { description: 'Updated test'}
    },{ 
      new: true 
    })
    .exec();
  })
  .then((dish) => {
    console.log(dish);

    dish.comments.push({
      rating: 5,
      comment: 'I\'m getting a sinking feeling!',
      author: 'Leonardo di Carpaccio'
    });

    return dish.save();
  })
  .then((dish) => {
    console.log(dish);

    return Dishes.remove({});
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
    
. . .
```

* Run the server and observe the result.

&nbsp;

---

&nbsp;

### REST API with Express, MongoDB and Mongoose

&nbsp;

##### **Update the Express Application**

* Go to the *conFusionServer* folder where you had developed the REST API server using Express generator.

* Copy the *models* folder from the *node-mongoose* folder to the *conFusionServer* folder.

* Then install bluebird, mongoose and mongoose-currency Node modules by typing the following at the prompt:

`npm install mongoose@5.1.7 mongoose-currency@0.2.0 --save`

* Open *app.js* file and add in the code to connect to the MongoDB server as follows:

```js
. . .

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

. . .
```

* Next open *dishes.js* in the *models* folder and update it as follows:

```js
. . .

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

. . .

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  price: {
    type: Currency,
    required: true,
    min: 0
  },
  featured: {
    type: Boolean,
    default:false      
  },
  comments:[commentSchema]
}, {
  timestamps: true
});

. . .
```

* Now open *dishRouter.js* and update its code as follows:

```js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req,res,next) => {
  Dishes.find({})
    .then((dishes) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dishes);
  }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  Dishes.create(req.body)
    .then((dish) => {
      console.log('Dish Created ', dish);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
  Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

dishRouter.route('/:dishId')
.get((req,res,next) => {
  Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req, res, next) => {
  Dishes.findByIdAndUpdate(req.params.dishId, {
    $set: req.body
  }, { new: true })
    .then((dish) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
  Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = dishRouter;
```

* Save the changes and start the server. Make sure your MongoDB server is up and running.

* You can now fire up postman and then perform several operations on the REST API. You can use the data for all the dishes provided in the *db.json* file to test your server.

&nbsp;

##### **Handling Comments**

* Add the following code to *dishRouter.js* to handle comments:

```js
. . .

dishRouter.route('/:dishId/comments')
  .get((req,res,next) => {
    Dishes.findById(req.params.dishId)
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
  .post((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then((dish) => {
        if (dish != null) {
          dish.comments.push(req.body);
          dish.save()
            .then((dish) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(dish);                
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
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/'
            + req.params.dishId + '/comments');
  })
  .delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then((dish) => {
        if (dish != null) {
          for (var i = (dish.comments.length -1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
          }
          dish.save()
            .then((dish) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(dish);                
            }, (err) => next(err));
        }
        else {
          err = new Error('Dish ' + req.params.dishId + ' not found');
          err.status = 404;
          return next(err);
        }
      }, (err) => next(err))
        .catch((err) => next(err));    
  });

dishRouter.route('/:dishId/comments/:commentId')
  .get((req,res,next) => {
    Dishes.findById(req.params.dishId)
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
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId
            + '/comments/' + req.params.commentId);
  })
  .put((req, res, next) => {
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
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(dish);                
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
  .delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
          dish.comments.id(req.params.commentId).remove();
          dish.save()
            .then((dish) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(dish);                
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

* Save the changes and start the server. Make sure your MongoDB server is up and running.

* You can now fire up postman and then perform several operations on the REST API. You can use the data for all the dishes provided in the *db.json* file to test your server