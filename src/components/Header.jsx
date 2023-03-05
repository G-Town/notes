import React, { Component } from 'react';
import { FaHome, FaInfo, FaList, FaDatabase, FaCode } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs';
import {
  Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,
} from 'reactstrap';
import { Parallax, Background } from "react-parallax";
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
    };
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }
  render() {
    const insideStyles = {
      background: "rgba(0, 0, 0, 0.2)",
      borderRadius: 150,
      padding: 35,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    };
    return (
      <Parallax strength={200}>
        <Background className="bg-home-image">
        </Background>
        <div style={{ height: 400 }}>
          <div className="container text-white">
            <div className="row" style={insideStyles}>
              <h2>G-Town.github.io</h2>
              <div className="row mt-3">
                <p>Repository of Projects & Learning in Data Science & Web Dev.<br />
                  *Work In Progress*</p>
              </div>
            </div>
          </div>
        </div>

        <Navbar dark expand="md" className="">
          <div className="container justify-items-center">
            {/* <NavbarBrand className="col-1">
              <img src={process.env.PUBLIC_URL + '/logo192.png'} height="40" width="40" alt='Logo Here' />
            </NavbarBrand> */}
            <NavbarToggler className="" onClick={this.toggleNav} />
            <Collapse className="row px-5" isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <IconContext.Provider value={{ className: "shared-icon" }}>
                  <NavItem>
                    <NavLink className="nav-link text-white" to='/home'>
                      <FaHome /> Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link text-white" to='/ApplDataSci-UMich'>
                      <FaDatabase /> DataSci
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link text-white" to='/MachineLearning-UWash'>
                      <BsGearFill /> MachineLearning
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link text-white" to='/FSWebDev-HKST'>
                      <FaCode /> WebDev
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link text-white" to='/about'>
                      <FaInfo /> About
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                      <NavLink className="nav-link text-white" to='/list'>
                        <FaList /> List
                      </NavLink>
                    </NavItem> */}
                  {/* <NavItem>
                  <NavLink className="nav-link" to='/contactus'>
                    <span className="fa fa-address-card fa-lg"></span> Contact
                  </NavLink>
                </NavItem> */}
                </IconContext.Provider>
              </Nav>
            </Collapse>
            </div>
        </Navbar>
      </Parallax>
    );
  }
}

export default Header;