import '../App.css';
import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { FadeTransform } from 'react-animation-components';
import { NavLink } from 'react-router-dom';
import { Parallax, Background } from "react-parallax";
import IFrame from './IFrame';
import { Outlet } from 'react-router-dom/dist';

function Notebook(props) {
  const insideStyles = {
    background: "rgba(0, 0, 0, 0.45)",
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
        <div className="col-2 bar">
          <Breadcrumb className="mx-2">
            <BreadcrumbItem><NavLink to="/home" className="App-link">Home</NavLink></BreadcrumbItem>
            <BreadcrumbItem><NavLink to={props.crumb[0]} className="App-link">{props.crumb[1]}</NavLink></BreadcrumbItem>
            <BreadcrumbItem>Notebook</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="container text-white p-5">
          <IFrame url={props.frames.find(notebook => notebook.id === props.id).url} />
        </div>
      </div>
    </>
  );
}

export default Notebook;