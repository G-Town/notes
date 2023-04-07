## Assignment: Retrieving Wikipedia Articles

&nbsp;

In this module, we focused on using nearest neighbors and clustering to retrieve documents that interest users, by 
analyzing their text. We explored two document representations: word counts and TF-IDF. We also built an Jupyter 
notebook for retrieving articles from Wikipedia about famous people.

In this assignment, we are going to dig deeper into this application, explore the retrieval results for various 
famous people, and familiarize ourselves with the code needed to build a retrieval system. These techniques will be key 
to building the intelligent application in your capstone project.

&nbsp;

##### **Learning outcomes**

* Execute document retrieval code with the Jupyter notebook

* Load and transform real, text data

* Compare results with word counts and TF-IDF

* Set the distance function in the retrieval

* Build a document retrieval model using nearest neighbor search

&nbsp;

##### **What you will do**

We are going do three tasks in this assignment:

&nbsp;

1. **Compare top words according to word counts to TF-IDF:** In the notebook we covered in the module, we explored two 
document representations: word counts and TF-IDF. Now, take a particular famous person, 'Elton John'. What are the 3 
words in his articles with highest word counts? What are the 3 words in his articles with highest TF-IDF? These results 
illustrate why TF-IDF is useful for finding important words.

&nbsp;

2. **Measuring distance:** Elton John is a famous singer; let's compute the distance between his article and those of 
two other famous singers. In this assignment, you will use the <a href=
"https://apple.github.io/turicreate/docs/api/generated/turicreate.toolkits.distances.cosine.html?highlight=cosine#turicreate.toolkits.distances.cosine">
cosine distance</a>, which one measure of similarity between vectors, similar to the one discussed in the lectures. You 
can compute this distance using the *turicreate.distances.cosine* function. What's the cosine distance between the 
articles on 'Elton John' and 'Victoria Beckham'? What's the cosine distance between the articles on 'Elton John' and 
Paul McCartney'? Which one of the two is closest to Elton John? Does this result make sense to you?

3. **Building nearest neighbors models with different input features and setting the distance metric:** In the sample 
notebook, we built a nearest neighbors model for retrieving articles using TF-IDF as features and using the default 
setting in the construction of the nearest neighbors model. Now, you will build two nearest neighbors models:

* Using word counts as features

* Using TF-IDF as features

In both of these models, we are going to set the distance function to cosine similarity. Here is how: when you call the 
function

```py
turicreate.nearest_neighbors.create
```

add the parameter:

```py
distance='cosine'
```

Now we are ready to use our model to retrieve documents. Use these two models to collect the following results:

* **What's the most similar article, other than itself, to the one on 'Elton John' using word count features?**

* **What's the most similar article, other than itself, to the one on 'Elton John' using TF-IDF features?**

* **What's the most similar article, other than itself, to the one on 'Victoria Beckham' using word count features?**

* **What's the most similar article, other than itself, to the one on 'Victoria Beckham' using TF-IDF features?**