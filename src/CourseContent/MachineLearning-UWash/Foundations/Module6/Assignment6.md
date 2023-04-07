## Deep Features for Image Retrieval

&nbsp;

This assignment focuses on using deep learning to create nonlinear features to improve the performance of machine 
learning. You will see how transfer learning techniques are applied to use deep features learned with one dataset to 
get great performance on a different dataset. You will build models for image retrieval and image classification tasks.

Follow the rest of the instructions on this page to complete your program. When you are done, instead of uploading your code, you will answer a series of quiz questions (see the quiz after this reading) to document your completion of this assignment. The instructions will indicate what data to collect for answering the quiz.

&nbsp;

##### **Learning outcomes**

* Load and transform real image data

* Use the Sketch method to view statistics of data

* Build image retrieval models using nearest neighbor search and deep features

* Compare the results of various image retrieval models

* Use the apply and sum methods to compute functions of the data

&nbsp;

##### **What You Will Do**

There are four tasks in this assignment. There are several results you need to gather for the quiz that accompanies this 
module.

&nbsp;

1. **Compute summary statistics of the data:** Sketch summaries are techniques for computing summary statistics of data 
very quickly. In Turi Create, SArrays include a method:

```py
.summary()
```

which computes summary statistics. Using the training data, compute the summary of the 'label' column and interpret the 
results. What's the least common category in the training data?

&nbsp;

2. **Create category-specific image retrieval models:** In most retrieval tasks, the data are unlabeled, thus you call 
these unsupervised learning problems. This image dataset has labels, so you will use them to create one model for each 
of the four image categories dog, cat, automobile, and bird.

Follow these steps:

i. Split the training data into 4 different SFrame data structures. Each will contain data for one of the four 
categories image categories. (Hint: If you use a logical filter to select the rows where the label column equals 'dog', 
you can create an SFrame that contains only the data for images labeled 'dog'.)

ii. Similarly to the image retrieval notebook you downloaded, you will create a nearest neighbor model using deep 
features. You will create one such model for each category, using the corresponding subset of the training data. Call 
the model with the dog images *dog_model*, the one with the cat images *cat_model*, as so on.

You now have a nearest neighbors model that can find the nearest 'dog' to any image you give it, the *dog_model*; one 
that can find the nearest 'cat', the *cat_model*; and so on. 

The following cat image is the first in the test data (image_test[0:1]):

![Cat](MachineLearning-UWash/cat.png)

Using these models, answer the following questions.

* What is the nearest cat-labeled image in the training data to the cat image that is the first image in the test data?

* What is the nearest dog-labeled image in the training data to the cat image that is the first image in the test data?

Hint: When you query your nearest neighbors model, it will return a result that looks something like this:

![Query Format Table](MachineLearning-UWash/QueryFormatTable.png)

To understand each column in this table, see this 
<a href="https://github.com/apple/turicreate/blob/main/userguide/nearest_neighbors/nearest_neighbors.md">documentation
</a>. For this question, the 'reference_label' column will be important, since it provides the index of the nearest 
neighbors in the dataset used to train it. (In this case, the subset of the training data labeled 'cat'.)

&nbsp;

3. **Try a simple example of nearest-neighbors classification:** When you queried the nearest neighbors model, the 
distance column in the Task 2 showed the computed distance between the input and each of the retrieved neighbors. In 
this task, you will use these distances for classification, using a nearest-neighbors classifier.

* For the first image in the test data (image_test[0:1]), compute the mean distance between this image at its five 
nearest neighbors that are labeled 'cat' in the training data (similar to what you did in the previous question).

* For the first image in the test data (image_test[0:1]), compute the mean distance between this image at its five 
nearest neighbors that are labeled 'dog' in the training data (similar to what you did in the previous question).

On average, is the first image in the test data closer to its five nearest neighbors in the 'cat' data or in the 'dog' 
data? (In a later course, we will see that this is an example of what is called a k-nearest neighbors classifier, where 
we use the label of neighboring points to predict the label of a test point.)

&nbsp;

4. **Compute nearest neighbors accuracy:** A nearest neighbor classifier predicts the label of a point as the most 
common label of its nearest neighbors. In this task, you will measure the accuracy of a 1-nearest-neighbor classifier, 
i.e., predict the output as the label of the nearest neighbor in the training data. Although there are simpler ways of 
computing this result, this way introduces you to additional concepts in nearest neighbors and SFrames, which will be 
useful in your future machine learning education.

* **Training models:** For this question, you will need the nearest neighbors models you learned above on the training 
data, i.e., the dog_model, cat_model, automobile_model and bird_model.

* **Spliting test data by label:** Above, you split the train data SFrame into one SFrame for images labeled 'dog', 
another for those labeled 'cat', etc. Now, do the same for the test data. You can call the resulting SFrames 
*image_test_cat*, *image_test_dog*, *image_test_bird*, and *image_test_automobile*.

* **Finding nearest neighbors in the training set for each part of the test set:** Thus far, we have queried our 
nearest neighbors models with a single image as the input (*dog_model.query()* ), but you can actually query with a 
whole set of data, and it will find the nearest neighbors for each data point. Note that the input index will be stored 
in the 'query_label' column of the output SFrame.

Using this knowledge find the closest neighbor to the dog test data using each of the trained models. For example, this 
code:

```py
dog_cat_neighbors = cat_model.query(image_test_dog, k=1)
```

finds one neighbor (i.e., k=1) to the dog test images (image_test_dog) in the cat portion of the training data.

Next, follow the same procedure for the other dog combinations: dog-automobile, dog-bird, and dog-dog.

**Create an SFrame with the distances from the dog test examples to the respective nearest neighbors in each class in 
the training data:** The 'distance' column in *dog_cat_neighbors* contains the distance between each dog-labeled image 
in the test set and its nearest cat-labeled image in the training set. The question to answer is: How many of the test 
set dog images are closer to a dog in the training set than to a cat, automobile, or bird?

Next you will create an SFrame containing just these distances per data point. The goal is to create an SFrame called 
*dog_distances* with 4 columns:

i. dog_distances['dog-dog'] ---- storing dog_dog_neighbors['distance']

ii. dog_distances['dog-cat'] ---- storing dog_cat_neighbors['distance']

iii. dog_distances['dog-automobile'] ---- storing dog_automobile_neighbors['distance']

iv. dog_distances['dog-bird'] ---- storing dog_bird_neighbors['distance']

**Hint**: You can create a new SFrame from the columns of other SFrame structures by creating a dictionary with the new 
columns, as shown in this example:

```py
news_frame = turicreate.SFrame({'foo': others_frame['foo'],'bar': some_others_frame['bar']})
```

The resulting SFrame will look similar to this:

![SFrame Table](MachineLearning-UWash/SFrameTable.png)

**Compute the number of correct predictions using 1-nearest neighbors for the dog class:** Now that you have created 
*dog_distances*, you will use the *apply()* method on this SFrame to iterate through each row and compute the number of 
dog test examples where the distance to the nearest dog image was lower than that to the other image classes.

You will perform three steps:

i. Consider one row of dog_distances and call this variable row. You can access each distance by calling, for example, 

```py
row['dog-cat']
```

which, in the previous table, will have value equal to 36.4196077068 for the first row. Create a 
function 

```py
def is_dog_correct(row):
``` 

that returns 1 if the value for *row['dog-dog']* is lower than that of the other columns, and 0 otherwise. That is, 
returns 1 if this row is correctly classified by 1-nearest neighbors, and 0 if it is not.

ii. Using the function *is_dog_correct(row)*, you can check if one row is correctly classified. Next, you need to count 
how many rows are correctly classified. You could use a for loop to iterate through each row and apply the function 
is_dog_correct(row), but this method is extremely slow. An SFrame is not optimized for this type of operation. Instead, 
use the *.apply()* method to iterate the function *is_dog_correct* for each row.

Read about using the *.apply()* method 
<a href="https://apple.github.io/turicreate/docs/api/generated/turicreate.SFrame.apply.html?highlight=apply#turicreate.SFrame.apply">
here</a>

iii. Compute the number of correct predictions for dog. You can now call the function:

```py
dog_distances.apply(is_dog_correct)
```

which returns an SArray structure (a column of data) with a value 1 for every correct row and a value 0 for every 
incorrect one. You can call the *.sum()* method on the result to get the total number of correctly classified dog images 
in the test set.

Using the work you did in this task, what is the accuracy of the 1-nearest neighbor classifier at classifying dog images 
from the test set?

**NOTE:** If you are uncertain that your code is working correctly, you can perform steps 1 and 2 to count the number of 
correctly classified **cat** images in the test data. Your result should be 548. This verification will take you some 
time, so you might do it only if you get the wrong answer on the quiz and can't figure out why.

&nbsp;

* **Accuracy of predicting dog in the test data:** Using the work you did in this question, what is the accuracy of the 
1-nearest neighbor classifier at classifying 'dog' images from the test set?