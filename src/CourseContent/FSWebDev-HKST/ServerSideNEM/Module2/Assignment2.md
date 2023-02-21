## Assignment 2: MongoDB

&nbsp;

#### **Assignment Requirements**

This assignment consists of the following two tasks:

&nbsp;

#### **Task 1**

You are given the following example of a promotion document. You will now create the Promotions schema and model to support the document:

```json
{
  "name": "Weekend Grand Buffet",
  "image": "images/buffet.png",
  "label": "New",
  "price": "19.99",
  "description": "Featuring . . .",
  "featured": false
}
```

Note in particular that the label and price fields should be implemented the same way as you did for the Dishes schema and model. The Promotions schema and model should be defined in a file named *promotions.js*.

Next, extend the *promoRouter.js* to enable the interaction with the MongoDB database to fetch, insert, update and delete information.

&nbsp;

#### **Task 2**

You are given the following example of a leadership document. You will now create the Leaders schema and model to support the document:

```json
{
  "name": "Peter Pan",
  "image": "images/alberto.png",
  "designation": "Chief Epicurious Officer",
  "abbr": "CEO",
  "description": "Our CEO, Peter, . . .",
  "featured": false
}
```

The Leaders schema and model should be defined in a file named *leaders.js*.

Next, extend the *leaderRouter.js* to enable the interaction with the MongoDB database to fetch, insert, update and delete information.