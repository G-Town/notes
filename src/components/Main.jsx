import '../App.css';
import React, { Component } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
// import { actions } from 'react-redux-form';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './Header'
import Home from './Home';
// import List from './List';
import About from './About';
import MachineLearning from './MachineLearning'
import DataSci from './DataSci';
import WebDev from './WebDev'
import Footer from './Footer';
// import Sidebar from './Sidebar';
import Notebook from './Notebook';
import Page from './Page'
import IFrame from './IFrame';
import { BsMarkdown } from 'react-icons/bs';

const mapStateToProps = state => {
  return {
    DSUMnotebooks: state.DSUMnotebooks,
    MLUWnotebooks: state.MLUWnotebooks,
    WDHKpages: state.WDHKpages
  }
}

function Main(props) {
  const HomePage = () => {
    return (
      <Home
        reditem={{
          name: 'Applied Data Science Specialization',
          image: process.env.PUBLIC_URL + '/images/red.avif',
          description: ''
        }}
        blueitem={{
          name: 'Machine Learning Specialization',
          image: process.env.PUBLIC_URL + '/images/gears.jpg',
          description: ''
        }}
        greenitem={{
          name: 'Full-Stack Web Development Specialization',
          image: process.env.PUBLIC_URL + '/images/mern3.jpg',
          description: ''
        }}
      />
    );
  }

  const DataSciNotes = () => {
    return (
      <DataSci notebooks={props.DSUMnotebooks} />
    );
  }
  const MachineLearningNotes = () => {
    return (
      <MachineLearning notebooks={props.MLUWnotebooks} />
    );
  }
  const WebDevNotes = () => {
    return (
      <WebDev pages={props.WDHKpages} />
    );
  }

  const DSUMNotebook = () => {
    return (
      <Notebook
        frames={props.DSUMnotebooks}
        id={parseInt(useParams().notebookId, 10)}
        crumb={["/ApplDataSci-UMich", "DataSci"]}
      />);
  }
  const MLUWNotebook = () => {
    return (
      <Notebook
        frames={props.MLUWnotebooks}
        id={parseInt(useParams().notebookId, 10)}
        crumb={["/MachineLearning-UWash", "MachineLearning"]}
      />);
  }
  const WDHKPage = () => {
    return (
      <Page
        frames={props.WDHKpages}
        id={parseInt(useParams().pageId, 10)}
        crumb={["/FSWebDev-HKST", "WebDev"]}
      />);
  }
  const WDHKNotebook = () => {
    return (
      <Notebook
        frames={props.WDHKpages}
        id={parseInt(useParams().pageId, 10)}
        crumb={["/FSWebDev-HKST", "WebDev"]}
      />
    );
  }

  return (
    <div className="font-link">
      <Header />
      {/* <Sidebar /> */}
      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        {/* <Route path="/list" element={<List />} /> */}
        <Route path="/about" element={<About />} />

        <Route path="/ApplDataSci-UMich" element={<DataSciNotes />} />
        <Route path="ApplDataSci-UMich/:notebookId" element={<DSUMNotebook />} />

        {/* <Route path="" element ={} /> */}

        <Route path="/MachineLearning-UWash" element={<MachineLearningNotes />} />
        <Route path="MachineLearning-UWash/:notebookId" element={<MLUWNotebook />} />

        <Route path="/FSWebDev-HKST" element={<WebDevNotes />} />
        <Route path="FSWebDev-HKST/:pageId" element={<WDHKPage />} />
        <Route path="FSWebDev-HKST/file/:pageId" element={<WDHKNotebook />} />
        

        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
      <Footer />
    </div>
  )
}
export default connect(mapStateToProps)(Main);