```js
const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
  .all(function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
  })
  .get(function (req, res, next) {
    res.end('Will send all the promotions to you!');
  })
  .post(function (req, res, next) {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .delete(function (req, res, next) {
    res.end('Deleting all promotions');
  });

promoRouter.route('/:promoId')
  .all(function (req, res, next) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    next();
  })
  .get(function (req, res, next) {
    res.end('Well send details of the promotion ' + req.params.promoId + ' to you!');
  })
  .put(function (req, res, next) {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + ' with details');
  })
  .delete(function (req, res, next) {
    res.end('Deleting promotion: ' + req.params.promoId);
  });

module.exports = promoRouter;
```