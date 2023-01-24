import React from 'react';
import {
  FaHome, FaInfo, FaList, FaLinkedinIn,
  FaEnvelope, FaGithub,FaCodepen
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Footer(props) {
  return (
    <div className="bg-dark text-white">
      <div className="container p-3">
        <div className="row justify-content-center">
          <div className="col-4 col-sm-2">
            <NavLink className="nav-link p-1" to='/home'>
              <FaHome />
            </NavLink>
            <NavLink className="nav-link p-1" to='/list'>
              <FaList />
            </NavLink>
            <NavLink className="nav-link p-1" to='/about'>
              <FaInfo />
            </NavLink>
            {/* <ul className="list-unstyled">
              <li><Link to='/home'>
                <span className="fa fa-home fa-lg"></span>
              </Link></li>
              <li><Link to='/aboutus'>About Us</Link></li>
              <li><Link to='/menu'>Menu</Link></li>
              <li><Link to='/contactus'>Contact Us</Link></li>
            </ul> */}
          </div>
          <div className="col-7 col-sm-5">
            <h5>Contact</h5>
            <address>
              <FaEnvelope /> : <a href="mailto:gerryarriagajr@gmail.com" className="App-link">gerryarriagajr@gmail</a>
            </address>
            © 2023
          </div>
          <div className="col-12 col-sm-4 align-self-center">
            <h5>Links</h5>
            <div className="text-center">
              <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/">
                <FaLinkedinIn style={{ color: "white" }} />
              </a>
              <a className="btn btn-social-icon" href="https://github.com/G-Town">
                <FaGithub style={{ color: "white" }} />
              </a>
              <a className="btn btn-social-icon" href="https://codepen.io/g-town">
                <FaCodepen style={{ color: "white" }} />
              </a>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;