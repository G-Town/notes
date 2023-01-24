import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Breadcrumb, BreadcrumbItem, Collapse, Button
} from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import { NavLink } from 'react-router-dom';

function RenderCard({ notebook }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
      <Card style={{ width: '15rem' }} className="bg-dark">
        <CardImg height='180' src={process.env.PUBLIC_URL + "/images/1648273561855.jpg"} alt={notebook.module} />
        <CardBody className="text-light">
          <CardTitle>{notebook.title}</CardTitle>
          <CardSubtitle></CardSubtitle>
          <CardText></CardText>
          <NavLink to={`/ApplDataSci-UMich/${notebook.id}`} className="stretched-link"></NavLink>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}

class WebDev extends Component {
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
      <div className="bg-home pb-5">
        <div className="col-2 bar mb-4">
          <Breadcrumb className="mx-4">
            <BreadcrumbItem><NavLink to="/home" className="App-link">Home</NavLink></BreadcrumbItem>
            <BreadcrumbItem>MachineLearning</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="container-fluid text-white p-5 box">
          <h2>Full-Stack Web Development - Hong Kong University of Science and Tech</h2>
          <br /><hr /><div className="row p-5">
            <div className="col px-5">
              <h3>Front-End Web UI Frameworks and Tools: Bootstrap 4</h3><br />
              <p>In this course, you will get hands-on experience with machine learning from a series of practical
                case-studies.  At the end of the first course you will have studied how to predict house prices based on
                house-level features, analyze sentiment from user reviews, retrieve documents of interest, recommend
                products, and search for images.  Through hands-on practice with these use cases, you will be able to
                apply machine learning methods in a wide range of domains.<br />
                This first course treats the machine learning method as a black box.  Using this abstraction, you will
                focus on understanding tasks of interest, matching these tasks to machine learning tools, and assessing
                the quality of the output. In subsequent courses, you will delve into the components of this black box by
                examining models and algorithms.  Together, these pieces form the machine learning pipeline, which you
                will use in developing intelligent applications.</p>
            </div>
          </div>
          <Button className="mb-5" onClick={this.toggleMod1}>Modules</Button>
          <Collapse isOpen={this.state.isMod1Open}>
            <div className="row pb-5">
              <h4>Module 1 - Welcome</h4>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Regression: Predicting House Prices</h4>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - Classification: Analyzing Sentiment</h4>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Clustering and Similarity: Retrieving Documents</h4>
            </div>
          </Collapse>
          <hr /><div className="row p-5">
            <div className="col-12 col-md px-5">
              <h3>Front-End Web Development with React</h3><br />
              <p>In our first case study, predicting house prices, you will create models that predict a continuous value
                (price) from input features (square footage, number of bedrooms and bathrooms,...).  This is just one of
                the many places where regression can be applied.  Other applications range from predicting health
                outcomes in medicine, stock prices in finance, and power usage in high-performance computing, to
                analyzing which regulators are important for gene expression.<br />
                In this course, you will explore regularized linear regression models for the task of prediction and
                feature selection.  You will be able to handle very large sets of features and select between models of
                various complexity.  You will also analyze the impact of aspects of your data -- such as outliers -- on
                your selected models and predictions.  To fit these models, you will implement optimization algorithms
                that scale to large datasets.</p>
            </div>
          </div>
          <Button className="mb-5" onClick={this.toggleMod2}>Modules</Button>
          <Collapse isOpen={this.state.isMod2Open}>
            <div className="row pb-5">
              <h4>Module 1 - Simple Linear Regression</h4>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Multiple Regressio</h4>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - Assessing Performance</h4>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Ridge Regression</h4>
            </div>
          </Collapse>
          <hr /><div className="row p-5">
            <div className="col-12 col-md px-5">
              <h3>Server-side Development with NodeJS, Express and MongoDB</h3><br />
              <p>In our case study on analyzing sentiment, you will create models that predict a class (positive/negative
                sentiment) from input features (text of the reviews, user profile information,...).  In our second case
                study for this course, loan default prediction, you will tackle financial data, and predict when a loan is
                likely to be risky or safe for the bank. These tasks are an examples of classification, one of the most
                widely used areas of machine learning, with a broad array of applications, including ad targeting, spam
                detection, medical diagnosis and image classification.<br />
                In this course, you will create classifiers that provide state-of-the-art performance on a variety of
                tasks.  You will become familiar with  the most successful techniques, which are most widely used in
                practice, including logistic regression, decision trees and boosting.  In addition, you will be able to
                design and implement the underlying algorithms that can learn these models at scale, using stochastic
                gradient ascent.  You will implement these technique on real-world, large-scale machine learning tasks.
                You will also address significant tasks you will face in real-world applications of ML, including handling
                missing data and measuring precision and recall to evaluate a classifier.  This course is hands-on,
                action-packed, and full of visualizations and illustrations of how these techniques will behave on real
                data.  We've also included optional content in every module, covering advanced topics for those who want
                to go even deeper! </p>
            </div>
          </div>
          <Button className="mb-5" onClick={this.toggleMod3}>Modules</Button>
          <Collapse isOpen={this.state.isMod3Open}>
            <div className="row pb-5">
              <h4>Module 1 - Welcome</h4>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Linear Classifiers & Logistic Regression</h4>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - Learning Linear Classifiers</h4>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Overfitting & Regularization in Logistic Regression</h4>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}
export default WebDev;