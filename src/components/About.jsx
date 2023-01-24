import '../App.css';
import React, { Component } from 'react';
import { Parallax, Background } from "react-parallax";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';

class About extends Component {

  render() {
    const insideStyles = {
      background: "rgba(0, 0, 0, 0.65)",
      borderRadius: 100,
      padding: 60,
      position: "absolute",
      top: "65%",
      left: "50%",
      transform: "translate(-50%,-150%)",
    };
    return (
      <>
        <Parallax
          blur={{ min: 0, max: 5 }}
          strength={150}
        // renderLayer={percentage => (
        //   <div>
        //     <div
        //       style={{
        //         position: "absolute",
        //         background: `white`,
        //         left: "50%",
        //         top: "50%",
        //         borderRadius: "50%",
        //         transform: "translate(-50%,-50%)",
        //         width: percentage * 500,
        //         height: percentage * 500,
        //       }}
        //     />
        //   </div>
        // )}
        >
          <Background className="bg-about-image text-white">
          <div className="container" style={insideStyles}>
            <div className="row">
              <h1>about</h1>
            </div>
            <div className="row mt-5">
              <p>This is a React v6 app built with routed components and reactstrap classes. It is hosted on Git Pages 
                as a static website which supports a read-only datastore. Thus, server-side data manipulation is not 
                included. (Details and workaround included here: https://stackoverflow.com/a/48025760/20226933)
                <br />Instead this React app serves as a testing ground for building components and customizing styles 
                that can be used in fully deployed apps.</p>
            </div>
          </div>
          </Background>

          <div style={{ height: 800 }} className="row align-items-center">
            {/* <div className="col">
              <h2>about</h2>
              <main>
                <p>This is a React v6 app built with routed components and reactstrap classes.</p>
              </main>
            </div> */}
          </div>

        </Parallax>
        <div className="bg-about pb-5">
          <div className="container text-black pb-4">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><NavLink to="/home" className="App-link">Home</NavLink></BreadcrumbItem>
                <BreadcrumbItem>Page 2</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
          <div className="container text-white p-5 box">
            <h2>To Do Log</h2>
            <div className="col justify-content-left logList">
              <ol>
                <li>
                  Blog
                  <ul>
                    <li>
                      blog detail component: add view of single blog with comments available in addition to all detials
                    </li>
                    <li>
                      archive list: add functionality including working links to working year, month, and blog detail view
                    </li>
                    <li>
                      add views of blogs displayed according to selected year and/or month from archive list
                    </li>
                    <li>
                      login with credentials and auth
                    </li>
                    <li>
                      add button with form/modal to write new blog
                    </li>
                    <li>
                      have blogs render in revers chronological order so most recent and new blogs are at the top 
                      (still without dynamic backend for saving new blogs)
                    </li>
                  </ul>
                </li>
                <li>
                  Menu
                  <ul >
                    <li>
                      better UI and transition between menu and dish detail components
                    </li>
                    <li>
                      clickable feature carousel that routes to dish detail
                    </li>
                    <li>
                      add form to submit new comments in dish detail component (static)
                    </li>
                  </ul>
                </li>
                <li>
                  Notes
                  <ul>
                    <li>
                      dynamic resize of iframe to fit each notebook length
                    </li>
                    <li>
                      more styling and edits to be done on seperate portfolio react app
                    </li>
                  </ul>
                </li>
                <li>
                  Other
                  <ul>
                    <li>
                      think of something to do with the List page
                    </li>
                    <li>
                      improve all styles in APP.css file
                    </li>
                    <li>
                      separate into stylesheets for each page
                    </li>
                    <li>
                      try configuring nested Routes
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default About;