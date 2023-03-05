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

        <div className="bg-home pb-5">
          <div className="container text-black pb-4">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><NavLink to="/home" className="App-link">Home</NavLink></BreadcrumbItem>
                <BreadcrumbItem>About</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
          <div className="container text-white p-5 box">
            <h2>About Me</h2>
            <div className="col-6 py-5">
              My name is Gerry Arriaga and this is my portfolio/notes website, for now.

              It is being hosted on Github Pages and all files are available on <a className="App-link" href="https://github.com/G-Town/notes">my Github profile</a> for downloading or cloning.

              I plan to use this as a
              framework to launch a more extensive site that will include a blog and showcase any future projects.<br />
              
              <br />I am a
              lifelong student of
              Engineering, Maths & Physics, Data Science & Machine Learning, and Web Development.
            </div>
            <hr />

            <div className="logList">
              <ol><h3>To Do Log:</h3>
                <li>Notes
                  <ul>
                    <li>
                      dynamic resize of iframe to fit each notebook length
                    </li>
                    <li>
                      more styling and format/navigation edits
                    </li>
                    <li> add page components for related content
                      <ul>
                        <li>
                          Math content: Analysis, Numerical Methods and other Matlab content
                        </li>
                        <li>
                          Database Management, Algorithms, Optimization
                        </li>
                        <li>
                          Engineering content: Risk Analysis, Fluids, Nuclear Reactor/Tech/Physics
                        </li>
                        <li>
                          capstone design project
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>Blog
                  <ul>
                    <li>
                      blog detail component: add view of single blog with comments available in addition to all detials
                    </li>
                    <li>
                      blog archive list: add functionality including working links to year, month, and blog detail view
                    </li>
                    <li>
                      add views of blogs displayed according to selected year and/or month from archive list
                    </li>
                    <li>
                      add button with form/modal to write new blog
                    </li>
                    <li>
                      have blogs render in reverse chronological order so most recent and new blogs are at the top
                    </li>
                  </ul>
                </li>
                <li>Archive List
                  <ul>
                    <li>
                      minimal detail archive of all notes and items on List page
                    </li>
                    <li>
                      searchable by name, description, or tags
                    </li>
                  </ul>
                </li>
                <li> General
                  <ul>
                    <li>
                      improve all styles in App.css file, add transitions for pages and other components
                    </li>
                    <li>
                      add useful tags to all Cards/items (topic, language, etc.)
                    </li>
                    <li>
                      separate into stylesheets for each page, with unique styles on each
                    </li>
                    <li>
                      try configuring nested Routes
                    </li>
                    <li>
                      login with credentials and auth
                    </li>
                    <li>
                      add what notes and work I am authorized to publish from Fluidized Bed project
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