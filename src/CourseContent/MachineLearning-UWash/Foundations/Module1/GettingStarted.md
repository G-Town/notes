## Getting started with Python, Jupyter Notebook, & Turi Create

&nbsp;

It's important to emphasize that this specialization is **not** about providing training for a specific software 
package. The goal of the specialization is for your effort to be spent on learning the fundamental concepts and 
algorithms behind machine learning in a hands-on fashion. These concepts transcend any single package. What you learn 
here you can use whether you write code from scratch, use any existing ML packages out there, or any that may be 
developed in the future.

The learning approach in this specialization is to start from use cases and then dig into algorithms and methods, what 
we call a *case-studies approach*. We are very excited about this approach, since it has worked well in several other 
courses. The first course is focused on understanding how ML can be used in various cases studies, and the follow on 
courses will dig into the details of algorithms and methods for each of the main ML areas. In the first course, you will 
not be implementing algorithms from scratch, but rather building intelligent applications that use ML. In the subsequent 
course, we will be implementing and comparing a wide range of algorithms. To make it easy to implement the use cases we 
will be covering, we are recommending a particular set of software tools, but you can successfully complete the course 
with other tools out there.

&nbsp;

##### **Why Python**

In this course, we are going to use the Python programming language to build several intelligent applications that use 
machine learning. Python is a simple scripting language that makes it easy to interact with data. Furthermore, Python 
has a wide range of packages that make it easy to get started and build applications, from the simplest ones to the most 
complex. Python is widely used in industry, and is becoming the de facto language for data science in industry. (R is 
another alternative language. However, R tends to be significantly less scalable and has very few deployment tools, thus 
it is seldom used for production code in industry. It is possible, but highly discouraged to use R in this 
specialization.)

We will also encourage the use of Jupyter Notebook in our assignments. The Jupyter Notebook is a simple interactive 
environment for programming with Python, which makes it really easy to share your results. Think about it as a 
combination of a Python terminal and a wiki page. Thus, you can combine code, plots and text to explain what you did. 
(You are not required to use Jupyter Notebook in the assignments, and should have no problem using straight up Python if 
you prefer.)

&nbsp;

##### **Why SFrame & Turi Create**

There are many excellent machine learning libraries in Python. One of the most popular one today is 
<a href="https://scikit-learn.org/stable/">scikit-learn</a>. Similarly, there are many tools for data manipulations in 
Python; a popular example is <a href="https://pandas.pydata.org/">Pandas</a>. However, most of these tools do not scale 
to large datasets, including some we will tackle in this specialization. In addition, in this specialization, we will 
cover a wide range of ML models, feature engineering transformation, and evaluation metrics. With most existing 
packages, you will have to install a combination of packages to get the tools that we need to tackle the use cases in 
this course. This is possible, but requires advanced knowledge of Python, which we feel will slow down most people's 
learning of the core concepts.

The main goal of this course is to learn core ML concepts, not how to use a specific software package. Thus, in this 
course, we recommend you use Turi Create, a package we have been working on for many years now, and has seen an exciting 
adoption curve, especially in industry with folks building real applications. Turi Create is a highly scalable machine 
learning library for Python, which also includes the SFrame, a highly-scalable library for data manipulation. A huge 
advantage of SFrame over Pandas is that with SFrame, you are not limited to datasets that fit in memory, which allows 
you to deal with large datasets, even on a laptop.

The reason we suggest you use Turi Create is because we very strongly believe using this software will make it much 
easier for us to follow the "case-study approach" we are taking in this specialization. In particular, it will let you 
focus on exploring each case study in this first course, without having to implement your own algorithms from scratch, 
and benefiting from the performance advantages that Turi Create provides. **In subsequent courses in the specialization, 
you will be implementing many of these algorithms from scratch, having had the foundation of seeing them perform in 
practice on real applications.**

&nbsp;

##### **Licenses for SFrame & Turi Create**

<a href="https://github.com/apple/turicreate/">Turi Create</a> and the 
<a href="https://github.com/turi-code/SFrame">SFrame</a> package are available in open-source under a permissive BSD 
license. So, you will always be able to use Turi Create and SFrames for free.

We are happy, however, for you to use any tool(s) of your liking, by following the steps below. As you will notice, we 
are only grading the output of your programs, so the specific software tool is not the focus of the course.

It's important to emphasize that this specialization is **not** about providing training for a specific software 
package. The goal of the specialization is for your effort to be spent on learning the fundamental concepts and 
algorithms behind machine learning in a hands-on fashion. These concepts transcend any single package. What you learn 
here you can use whether you write code from scratch, use any existing ML packages out there, or any that may be 
developed in the future. We are happy to hear that so many of you are enjoying this approach so far!

&nbsp;

##### **Using other ML packages**

We strongly encourage you to use SFrame for this course.

You are welcome to use other ML packages, like scikit-learn, instead of Turi Create. However, we believe this will 
significantly slow down the your implementation tasks, especially for this first course.

The first course is focused on exploring the use cases we'll tackle throughout the specialization. A huge goal here is 
to familiarize ourselves with the core ML concepts that we will use the 5 follow-on courses. In those course, there 
will be much more implementation of ML algorithms, so the specific ML package becomes less important. But, in this 
first course, we want to move quickly through all the use cases, and Turi Create will help us do just that.

If you choose to use a different package, we will provide the data sets and the assignment questions will not depend 
specifically on Turi Create.

&nbsp;

##### **Learning outcomes**

This reading will walk you through the steps you will need to follow to install and get started with Python, Jupyter 
Notebook, and Turi Create.

* Installing Python, Jupyter Notebook, and Turi Create

* Starting Jupyter Notebook

* Writing variables, functions and loops in Python

* Doing basic data manipulations in Python with SFrames

&nbsp;

##### **Downloading and installing Python, Jupyter Notebook and Turi Create on your own machine**

1. If you do not already have Python installed, download and install Python 3.7 or the latest version (but be aware of 
inconpatible dependancies if you use a version newer than 3.7): https://www.python.org/downloads/

2. Download and install Jupyter Notebook: http://jupyter.org/install. Follow the instructions for "Installing Jupyter 
with pip", use the commands under the section for Python 3

3. Download and install Turi Create: https://github.com/apple/turicreate#installation. **Note:** it is not required that 
you use virtualenv, but it might be helpful, especially if you run into installation issues due to conflicting versions 
of software.

##### **Other resources**

* There are many Python resources available online.
<a href="https://docs.python.org/3/">Here is a good place for documentation</a>.

* For Turi Create, there is also a lot of information available online. Here are some starting points.

The User Guide: https://apple.github.io/turicreate/docs/userguide/

More Detailed API Docs: https://apple.github.io/turicreate/docs/api/

&nbsp;

##### **Familiarize yourself with the notebooks**

Make sure:

* You’ve downloaded and installed Python, Jupyter Notebook, and Turi Create.

* Started up Jupyter Notebook from the directory you downloaded the files above, by typing

```powershell
jupyter notebook
```

in your command line (for Mac/Linux) or Command Prompt (for Windows).

Now you are ready to get started!  Familiarize yourself with Python and SFrames, as well as writing code with the 
Jupyter Notebook.  From here, you will be ready to do all the assignments in the course, and build awesome intelligent 
applications that use machine learning.