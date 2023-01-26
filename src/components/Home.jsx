import '../App.css';
import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardGroup } from 'reactstrap';
// import { FadeTransform } from 'react-animation-components';
import { NavLink } from 'react-router-dom';
import { render } from "react-dom";


function RenderCard({ item, page }) {
  return (
    <Card style={{ width: '14rem' }} className="bg-dark">
      <CardImg height="200" src={item.image} alt={item.name} />
      <CardBody className="text-light">
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
        <CardText>{item.description}</CardText>
        <NavLink to={page} className="nav-link stretched-link"></NavLink>
      </CardBody>
    </Card>
  );
}

function Home(props) {
  return (
    <>
      <div className="bg-home p-5">
        <div className="container-fluid text-white box p-5">
          <h3>Welcome to Gerry Arriaga's Website</h3>
          <div className="row">
            <div className="col-12 col-md px-5">
              <p>
                <br />- profile<br />
                As a student of Data Science, Machine Learning, and Web Development I maintain this site as a
                repository for my organized projects, notes, and other educational resources in these subjects.

                <br />- what's to be included
                <br />- link contact, CV
                <br />Below are links to the catalogued meterial included so far.<br /><br />

                {/* Along with the increasing accessibility of powerful software tools and the impending rise of Web3 come 
                many opportunities.  */}

                <br /></p>
            </div>
          </div>
          <hr />
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-12 col-md-6 col-xxl-3 d-flex justify-content-center my-5">
              <RenderCard item={props.reditem} page="/MachineLearning-UWash" />
            </div>
            <div className="col col-8 col-md-6 col-xxl-8 d-flex justify-content-center my-5">
              <p>The courses in this University of Michigan specialization introduce learners to data science through
                the Python programming language. This skills-based specialization is intended for learners who have a
                basic Python or programming background, and want to apply statistical, machine learning, information
                visualization, text analysis, and social network analysis techniques through popular Python toolkits
                such as pandas, matplotlib, scikit-learn, nltk, and networkx to gain insight into their data.</p>
            </div>
          </div>
          <hr />
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col col-8 col-md-6 col-xxl-8 d-flex justify-content-center my-5">
              <p>This Specialization from leading researchers at the University of Washington introduces you to the
                exciting, high-demand field of Machine Learning. Through a series of practical case studies, you will
                gain applied experience in major areas of Machine Learning including Prediction, Classification,
                Clustering, and Information Retrieval. You will learn to analyze large and complex datasets, create
                systems that adapt and improve over time, and build intelligent applications that can make predictions
                from data.</p>
            </div>
            <div className="col-12 col-md-6 col-xxl-3 d-flex justify-content-center my-5">
              <RenderCard item={props.blueitem} page="/ApplDataSci-UMich" />
            </div>
          </div>
          <hr />
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-12 col-md-6 col-xxl-3 d-flex justify-content-center my-5">
              <RenderCard item={props.greenitem} page="/FSWebDev-HKST" />
            </div>
            <div className="col col-8 col-md-6 col-xxl-8 d-flex justify-content-center my-5">
              <p>Learn front-end and hybrid mobile development, with server-side support, for implementing a
                multi-platform solution. The first two courses in this Specialization cover front-end frameworks:
                Bootstrap 4 and React. On the server side, you’ll learn to implement NoSQL databases using MongoDB,
                work within a Node.js environment and Express framework, and communicate to the client side through a
                RESTful API. Learners enrolling in this Specialization are expected to have prior working knowledge of
                HTML, CSS and JavaScript.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;