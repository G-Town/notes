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
import Markdown from './Markdown';
import Doc from './Document';
import IFrame from './IFrame';
import { BsMarkdown } from 'react-icons/bs';

const mapStateToProps = state => {
  return {
    DSUMnotebooks: state.DSUMnotebooks,
    DSUMdocs: state.DSUMdocs,
    MLUWnotebooks: state.MLUWnotebooks,
    MLUWdocs: state.MLUWdocs,
    WDHKmarkdown: state.WDHKmarkdown,
    WDHKdocs: state.WDHKdocs
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

  const DSUM_Notebook = () => {
    return (
      <Notebook
        frames={props.DSUMnotebooks}
        id={parseInt(useParams().notebookId, 10)}
        crumb={["/ApplDataSci-UMich", "DataSci"]}
      />);
  }
  const DSUM_Doc = () => {
    return (
      <Doc
        docs={props.DSUMdocs}
        title={useParams().docTitle}
        crumb={["/ApplDataSci-UMich", "DataSci"]}
      />);
  }
  const DSUM_Markdown = () => {
    return (
      <Markdown
        frames={props.DSUMdocs}
        id={parseInt(useParams().docId, 10)}
        crumb={["/ApplDataSci-UMich", "DataSci"]}
      />);
  }
  const MLUW_Notebook = () => {
    return (
      <Notebook
        frames={props.MLUWnotebooks}
        id={parseInt(useParams().notebookId, 10)}
        crumb={["/MachineLearning-UWash", "MachineLearning"]}
      />);
  }
  const MLUW_Doc = () => {
    return (
      <Doc
        docs={props.MLUWdocs}
        title={useParams().docTitle}
      />);
  }
  const WDHK_Markdown = () => {
    return (
      <Markdown
        frames={props.WDHKmarkdown}
        id={parseInt(useParams().pageId, 10)}
        crumb={["/FSWebDev-HKST", "WebDev"]}
      />);
  }
  const WDHK_Notebook = () => {
    return (
      <Notebook
        frames={props.WDHKmarkdown}
        id={parseInt(useParams().pageId, 10)}
        crumb={["/FSWebDev-HKST", "WebDev"]}
      />
    );
  }
  const WDHK_Doc = () => {
    return (
      <Doc
        docs={props.WDHKdocs}
        id={parseInt(useParams().docId, 10)}
      />);
  }

  return (
    <div className="font-link">
      <Header />
      {/* <Sidebar /> */}
      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        {/* <Route path="/list" element={<List />} /> */}
        <Route path="/about" element={<About />} />

        <Route path="/ApplDataSci-UMich"
          element={<DataSci notebooks={props.DSUMnotebooks} docs={props.DSUMdocs} />} />
        <Route path="ApplDataSci-UMich/notebook/:notebookId" element={<DSUM_Notebook />} />
        <Route path="ApplDataSci-UMich/document/:docTitle" element={<DSUM_Doc />} />
        <Route path="ApplDataSci-UMich/page/:docId" element={<DSUM_Markdown />} />

        {/* <Route path="" element ={} /> */}

        <Route path="/MachineLearning-UWash"
          element={<MachineLearning notebooks={props.MLUWnotebooks} docs={props.MLUWdocs} />} />
        <Route path="MachineLearning-UWash/:notebookId" element={<MLUW_Notebook />} />

        <Route path="/FSWebDev-HKST"
          element={<WebDev pages={props.WDHKmarkdown} docs={props.WDHKdocs} />}
        />
        <Route path="FSWebDev-HKST/:pageId" element={<WDHK_Markdown />} />
        <Route path="FSWebDev-HKST/file/:pageId" element={<WDHK_Notebook />} />


        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
      <Footer />
    </div>
  )
}
export default connect(mapStateToProps)(Main);