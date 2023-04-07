import '../App.css';
import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Breadcrumb, BreadcrumbItem, Collapse, Button
} from 'reactstrap';
// import { FadeTransform } from 'react-animation-components';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom/dist';

function RenderNotebook({ notebook }) {
  return (
    <Card style={{ width: '15rem' }} className="bg-dark">
      <CardImg height='160' src={notebook.image} alt={notebook.module} />
      <CardBody className="text-light">
        <CardTitle>{notebook.title}</CardTitle>
        <CardSubtitle></CardSubtitle>
        <CardText></CardText>
        <NavLink to={`/MachineLearning-UWash/${notebook.id}`} className="stretched-link"></NavLink>
      </CardBody>
    </Card>
  );
}

function RenderDoc({ doc }) {
  return (
    <Card style={{ width: '15rem' }} className="bg-dark">
      <CardImg height='160' src={doc.image} />
      <CardBody className="text-light">
        <CardTitle>{doc.title}</CardTitle>
        <CardSubtitle></CardSubtitle>
        <CardText></CardText>
        <NavLink to={`/MachineLearning-UWash/document/${doc.title}`} className="stretched-link"></NavLink>
      </CardBody>
    </Card>
  )
}

function RenderMD({ doc }) {
  return (
    <Card style={{ width: '15rem' }} className="bg-dark">
      <CardImg height='160' src={doc.image} />
      <CardBody className="text-light">
        <CardTitle>{doc.title}</CardTitle>
        <CardSubtitle></CardSubtitle>
        <CardText></CardText>
        <NavLink to={`/MachineLearning-UWash/page/${doc.id}`} className="stretched-link"></NavLink>
      </CardBody>
    </Card>
  );
}

class MachineLearning extends Component {
  constructor(props) {
    super(props);

    this.toggleMod1 = this.toggleMod1.bind(this);
    this.toggleMod2 = this.toggleMod2.bind(this);
    this.toggleMod3 = this.toggleMod3.bind(this);
    this.toggleMod4 = this.toggleMod4.bind(this);

    this.state = {
      isMod1Open: false,
      isMod2Open: false,
      isMod3Open: false,
      isMod4Open: false
    };
  }
  toggleMod1() {
    this.setState({
      isMod1Open: !this.state.isMod1Open
    });
  }
  toggleMod2() {
    this.setState({
      isMod2Open: !this.state.isMod2Open
    });
  }
  toggleMod3() {
    this.setState({
      isMod3Open: !this.state.isMod3Open
    });
  }
  toggleMod4() {
    this.setState({
      isMod4Open: !this.state.isMod4Open
    });
  }
  render() {
    return (
      <div className="bg-home pb-5 ">
        <div className="container mb-4">
          <Breadcrumb className="">
            <BreadcrumbItem><NavLink to="/home" className="App-link">Home</NavLink></BreadcrumbItem>
            <BreadcrumbItem>MachineLearning</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="container-fluid text-white p-5 box">
          <h3>Machine Learning Specialization - University of Washington</h3>
          <br /><hr /><div className="row p-5">
            <div className="col px-5">
              <h4>Foundations: A Case Study Approach</h4><br />
              <p>In this course, you will get hands-on experience with machine learning from a series of practical
                case-studies. At the end of the first course you will have studied how to predict house prices based on
                house-level features, analyze sentiment from user reviews, retrieve documents of interest, recommend
                products, and search for images. Through hands-on practice with these use cases, you will be able to
                apply machine learning methods in a wide range of domains.<br />
                This first course treats the machine learning method as a black box. Using this abstraction, you will
                focus on understanding tasks of interest, matching these tasks to machine learning tools, and assessing
                the quality of the output. In subsequent courses, you will delve into the components of this black box by
                examining models and algorithms. Together, these pieces form the machine learning pipeline, which you
                will use in developing intelligent applications.</p>
            </div>
          </div>
          <Button className="mb-5" onClick={this.toggleMod1}>Modules</Button>
          <Collapse isOpen={this.state.isMod1Open}>
            <div className="row pb-5">
              <h4>Module 1 - Welcome</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Introduction")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => doc.id === 1)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => doc.id === 2)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 0)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 1)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Regression: Predicting House Prices</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Regression")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => doc.id === 4)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 2)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - Classification: Analyzing Sentiment</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Classification")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => doc.id === 6)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 3)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Clustering and Similarity: Retrieving Documents</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Clustering")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => doc.id === 8)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 4)} />
              </div>
            </div><div className="row pb-5">
              <h4>Module 5 - Recommender Systems: Recommending Products</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Recommenders")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => doc.id === 10)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 5)} />
              </div>
            </div><div className="row pb-5">
              <h4>Module 6 - Deep Learning: Searching for Images</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Deep Learning")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 6)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => doc.id === 12)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 7)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Machine Learning as a Service")} />
              </div>
            </div>
          </Collapse>
          <hr /><div className="row p-5">
            <div className="col-12 col-md px-5">
              <h4>Regression</h4><br />
              <p>In our first case study, predicting house prices, you will create models that predict a continuous value
                (price) from input features (square footage, number of bedrooms and bathrooms,...). This is just one of
                the many places where regression can be applied. Other applications range from predicting health
                outcomes in medicine, stock prices in finance, and power usage in high-performance computing, to
                analyzing which regulators are important for gene expression.<br />
                In this course, you will explore regularized linear regression models for the task of prediction and
                feature selection. You will be able to handle very large sets of features and select between models of
                various complexity. You will also analyze the impact of aspects of your data -- such as outliers -- on
                your selected models and predictions. To fit these models, you will implement optimization algorithms
                that scale to large datasets.</p>
            </div>
          </div>
          <Button className="mb-5" onClick={this.toggleMod2}>Modules</Button>
          <Collapse isOpen={this.state.isMod2Open}>
            <div className="row pb-5">
              <h4>Module 1 - Simple Linear Regression</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc =>
                  doc.title === "Lecture Slides: Introduction to Regression")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => doc.title === "Reading: Software Tools You'll Need")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc =>
                  doc.title === "Reading: Worked-Out Example for Closed-Form Solution")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc =>
                  doc.title === "Reading: Worked-Out Example for Gradient Descent")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 8)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 9)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Multiple Regression</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Multiple Regression")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => doc.title === "Reading: Review of Matrix ALgebra")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 10)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 11)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 12)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - Assessing Performance</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Assessing Performance")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 13)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Ridge Regression</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Ridge Regression")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 14)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 15)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 16)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 5 - Feature Selection & Lasso</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc =>
                  doc.title === "Lecture Slides: Lasso Regression")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 17)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 18)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 19)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 6 - Hierarchical Clustering</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc =>
                  doc.title === "Lecture Slides: Nearest Neighbor Kernel Regression")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 20)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Recap & Look Ahead")} />
              </div>
            </div>
          </Collapse>
          <hr /><div className="row p-5">
            <div className="col-12 col-md px-5">
              <h4>Classification</h4><br />
              <p>In our case study on analyzing sentiment, you will create models that predict a class (positive/negative
                sentiment) from input features (text of the reviews, user profile information,...). In our second case
                study for this course, loan default prediction, you will tackle financial data, and predict when a loan is
                likely to be risky or safe for the bank. These tasks are an examples of classification, one of the most
                widely used areas of machine learning, with a broad array of applications, including ad targeting, spam
                detection, medical diagnosis and image classification.<br />
                In this course, you will create classifiers that provide state-of-the-art performance on a variety of
                tasks. You will become familiar with the most successful techniques, which are most widely used in
                practice, including logistic regression, decision trees and boosting. In addition, you will be able to
                design and implement the underlying algorithms that can learn these models at scale, using stochastic
                gradient ascent. You will implement these technique on real-world, large-scale machine learning tasks.
                You will also address significant tasks you will face in real-world applications of ML, including handling
                missing data and measuring precision and recall to evaluate a classifier. This course is hands-on,
                action-packed, and full of visualizations and illustrations of how these techniques will behave on real
                data. We've also included optional content in every module, covering advanced topics for those who want
                to go even deeper! </p>
            </div>
          </div>
          <Button className="mb-5" onClick={this.toggleMod3}>Modules</Button>
          <Collapse isOpen={this.state.isMod3Open}>
            <div className="row pb-5">
              <h4>Module 1 - Welcome</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc =>
                  doc.title === "Lecture Slides: Introduction to Classification")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => doc.title === "Reading: Software Tools You'll Need II")} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Linear Classifiers & Logistic Regression</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc =>
                  doc.title === "Lecture Slides: Logistic Regression Model")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 21)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - Learning Linear Classifiers</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc =>
                  doc.title === "Lecture Slides: Logistic Regression Learning")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 22)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Overfitting & Regularization in Logistic Regression</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc =>
                  doc.title === "Lecture Slides: Logistic Regression Overfitting")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 23)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 5 - Decision Trees</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Decision Trees")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 24)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 25)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 6 - Decision Trees in Practice</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc =>
                  doc.title === "Lecture Slides: Decision Trees Overfitting")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 26)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 7 - Handling Missing Data</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc =>
                  doc.title === "Lecture Slides: Decision Trees with Missing Data")} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 8 - Boosting</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Boosting")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 27)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 28)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 9 - Precision-Recall</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Precision-Recall")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 29)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 10 - Scaling to Huge Datasets & Online Learnings</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Online Learning")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 30)} />
              </div>
            </div>
          </Collapse>
          <hr /><div className="row p-5">
            <div className="col-12 col-md px-5">
              <h4>Clustering & Retrieval</h4><br />
              <p>A reader is interested in a specific news article and you want to find similar articles to recommend.
                What is the right notion of similarity? Moreover, what if there are millions of other documents? Each
                time you want to a retrieve a new document, do you need to search through all other documents? How do
                you group similar documents together? How do you discover new, emerging topics that the documents cover?
                <br />In this third case study, finding similar documents, you will examine similarity-based algorithms
                for retrieval. In this course, you will also examine structured representations for describing the
                documents in the corpus, including clustering and mixed membership models, such as latent Dirichlet
                allocation (LDA). You will implement expectation maximization (EM) to learn the document clusterings,
                and see how to scale the methods using MapReduce.</p>
            </div>
          </div>
          <Button className="mb-5" onClick={this.toggleMod4}>Modules</Button>
          <Collapse isOpen={this.state.isMod4Open}>
            <div className="row pb-5">
              <h4>Module 1 - Welcome</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => 
                  doc.title === "Lecture Slides: Introduction to Clustering & Retrieval")} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Nearest Neighbor Search</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Retrieval")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 31)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => 
                  doc.title === "Reading: A Worked Out Example for KD-Trees")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 32)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - Clustering with K-Means</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: K-Means")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 33)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Mixture Models</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Mixture Models")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderMD doc={this.props.docs.find(doc => 
                  doc.title === "Reading: A Worked Out Example for Expectation Maximization")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 34)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 35)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 5 - Mixed Membership Modeling via Latent Dirichlet Allocation</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Latent Dirichlet Allocation")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 36)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 6 - Hierarchical Clustering & Closing Remarks</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderDoc doc={this.props.docs.find(doc => doc.title === "Lecture Slides: Closing")} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderNotebook notebook={this.props.notebooks.find(notebook => notebook.id === 37)} />
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}
export default MachineLearning;