import '../App.css';
import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Breadcrumb, BreadcrumbItem, Collapse, Button
} from 'reactstrap';
// import { FadeTransform } from 'react-animation-components';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom/dist';

function RenderCard({ notebook }) {
  return (
    <Card style={{ width: '15rem' }} className="bg-dark">
      <CardImg height='180' src={process.env.PUBLIC_URL + "/images/1648273561855.jpg"} alt={notebook.module} />
      <CardBody className="text-light">
        <CardTitle>{notebook.title}</CardTitle>
        <CardSubtitle></CardSubtitle>
        <CardText></CardText>
        <NavLink to={`/ApplDataSci-UMich/${notebook.id}`} className="stretched-link"></NavLink>
      </CardBody>
    </Card>
  );
}

class DataSci extends Component {
  constructor(props) {
    super(props);
    this.toggleMod1 = this.toggleMod1.bind(this);
    this.toggleMod2 = this.toggleMod2.bind(this);
    this.toggleMod3 = this.toggleMod3.bind(this);
    this.toggleMod4 = this.toggleMod4.bind(this);
    this.toggleMod5 = this.toggleMod5.bind(this);
    this.state = {
      isMod1Open: false,
      isMod2Open: false,
      isMod3Open: false,
      isMod4Open: false,
      isMod5Open: false
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
  toggleMod5() {
    this.setState({
      isMod5Open: !this.state.isMod5Open
    });
  }

  render() {
    return (
      <div className="bg-home pb-5 ">
        <div className="container mb-4">
          <Breadcrumb className="mx-5">
            <BreadcrumbItem><NavLink to="/home" className="App-link">Home</NavLink></BreadcrumbItem>
            <BreadcrumbItem>DataSci</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="container-fluid text-white p-5 box">
          <h3>Applied Data Science Specialization - University of Michigan</h3>
          <br /><hr /><div className="row p-5">
            <div className="col px-5">
              <h4>Introduction to Data Science</h4><br />
              <p>This course will introduce the learner to the basics of the python programming environment, including
                fundamental python programming techniques such as lambdas, reading and manipulating csv files, and the
                numpy library. The course will introduce data manipulation and cleaning techniques using the popular
                python pandas data science library and introduce the abstraction of the Series and DataFrame as the
                central data structures for data analysis, along with tutorials on how to use functions such as
                groupby, merge, and pivot tables effectively. By the end of this course, students will be able to take
                tabular data, clean it, manipulate it, and run basic inferential statistical analyses.</p>
            </div>
          </div>
          <Button className="mb-5" onClick={this.toggleMod1}>Modules</Button>
          <Collapse isOpen={this.state.isMod1Open}>
            <div className="row pb-5">
              <h4>Module 1 - Fundmentals of Data Manipulation</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 0)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 1)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 2)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 3)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Basic Data Processing</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 4)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 5)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 6)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 7)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 8)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 9)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 10)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 11)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 12)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - More Data Processing</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 13)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 14)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 15)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 16)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 17)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 18)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 19)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Answering Questions with Messy Data</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 20)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 21)} />
              </div>
            </div>
          </Collapse>
          <hr /><div className="row p-5">
            <div className="col-12 col-md px-5">
              <h4>Applied Plotting, Charting & Data Representation</h4><br />
              <p>This course will introduce the learner to information visualization basics, with a focus on reporting
                and charting using the matplotlib library. The course will start with a design and information
                literacy perspective, touching on what makes a good and bad visualization, and what statistical
                measures translate into in terms of visualizations. The second week will focus on the technology used
                to make visualizations in python, matplotlib, and introduce users to best practices when creating basic
                charts and how to realize design decisions in the framework. The third week will be a tutorial of
                functionality available in matplotlib, and demonstrate a variety of basic statistical charts helping
                learners to identify when a particular method is good for a particular problem. The course will end
                with a discussion of other forms of structuring and visualizing data.</p>
            </div>
          </div><Button className="mb-5" onClick={this.toggleMod2}>Modules</Button>
          <Collapse isOpen={this.state.isMod2Open}>
            <div className="row pb-5">
              <h4>Module 1 - Principles of Information Visualization</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <p>placeholder for reading material and module pdf notes</p>
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Basic Charting</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 22)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 23)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 24)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - Charting Fundamentals</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 25)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 26)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 27)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Applied Visualizations</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 28)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 29)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 30)} />
              </div>
            </div>
          </Collapse>
          <hr /><div className="row p-5">
            <div className="col-12 col-md px-5">
              <h4>Applied Machine Learning</h4><br />
              <p>This course will introduce the learner to applied machine learning, focusing more on the techniques
                and methods than on the statistics behind these methods. The course will start with a discussion of how
                machine learning is different than descriptive statistics, and introduce the scikit learn toolkit
                through a tutorial. The issue of dimensionality of data will be discussed, and the task of clustering
                data, as well as evaluating those clusters, will be tackled. Supervised approaches for creating
                predictive models will be described, and learners will be able to apply the scikit learn predictive
                modelling methods while understanding process issues related to data generalizability (e.g. cross
                validation, overfitting). The course will end with a look at more advanced techniques, such as building
                ensembles, and practical limitations of predictive models. By the end of this course, students will be
                able to identify the difference between a supervised (classification) and unsupervised (clustering)
                technique, identify which technique they need to apply for a particular dataset and need, engineer
                features to meet that need, and write python code to carry out an analysis.</p>
            </div>
          </div>
          <Button className="mb-5" onClick={this.toggleMod3}>Modules</Button>
          <Collapse isOpen={this.state.isMod3Open}>
            <div className="row pb-5">
              <h4>Module 1 - Fundamentals of Machine Learning</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 31)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 32)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Supervised Machine Learning</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 33)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 34)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 35)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - Evaluation</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 36)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 37)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Supervised Machine Learning II</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 38)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 39)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 40)} />
              </div>
            </div>
          </Collapse>
          <hr /><div className="row p-5">
            <div className="col-12 col-md px-5">
              <h4>Applied Text Mining</h4><br />
              <p>This course will introduce the learner to text mining and text manipulation basics. The course begins
                with an understanding of how text is handled by python, the structure of text both to the machine and
                to humans, and an overview of the nltk framework for manipulating text. The second week focuses on
                common manipulation needs, including regular expressions (searching for text), cleaning text, and
                preparing text for use by machine learning processes. The third week will apply basic natural language
                processing methods to text, and demonstrate how text classification is accomplished. The final week
                will explore more advanced methods for detecting the topics in documents and grouping them by
                similarity (topic modelling).</p>
            </div>
          </div>
          <Button className="mb-5" onClick={this.toggleMod4}>Modules</Button>
          <Collapse isOpen={this.state.isMod4Open}>
            <div className="row pb-5">
              <h4>Module 1 - Working with Text</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 41)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 42)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 43)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Basic Natural Language Processing</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 44)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 45)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - Classification of Text</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 46)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 47)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Topic Modeling</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 48)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 49)} />
              </div>
            </div>
          </Collapse>
          <hr /><div className="row p-5">
            <div className="col-12 col-md px-5">
              <h4>Applied Social Network Analysis</h4><br />
              <p>This course will introduce the learner to network analysis through tutorials using the NetworkX
                library. The course begins with an understanding of what network analysis is and motivations for why we
                might model phenomena as networks. The second week introduces the concept of connectivity and network
                robustness. The third week will explore ways of measuring the importance or centrality of a node in a
                network. The final week will explore the evolution of networks over time and cover models of network
                generation and the link prediction problem.</p>
            </div>
          </div>
          <Button className="mb-5" onClick={this.toggleMod5}>Modules</Button>
          <Collapse isOpen={this.state.isMod5Open}>
            <div className="row pb-5">
              <h4>Module 1 - Why Study Networks and Basics on NetworkX</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 50)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 51)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 2 - Netork Connectivity</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 52)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 53)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 3 - Influence Measures and Network Centralization</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 54)} />
              </div>
            </div>
            <div className="row pb-5">
              <h4>Module 4 - Network Evolution</h4>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 55)} />
              </div>
              <div className="col-12 col-md my-3 d-flex justify-content-center">
                <RenderCard notebook={this.props.notebooks.find(notebook => notebook.id === 56)} />
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}
export default DataSci;