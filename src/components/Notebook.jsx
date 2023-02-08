import '../App.css';
import React, { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { FadeTransform } from 'react-animation-components';
import { NavLink } from 'react-router-dom';
import IFrame from './IFrame';
import { Outlet } from 'react-router-dom/dist';

function Notebook(props) {
  // const file_name = props.frames.find(notebook => notebook.id === props.id).url;
  // const [post, setPost] = useState('');
  // useEffect(() => {
  //   import(`${file_name}`)
  //     .then(res => {
  //       fetch(res.default)
  //         .then(res => res.text())
  //         .then(res => setPost(res))
  //     })
  //     .catch(err => console.log(err));
  // });
  return (
    <div className="bg-home pb-5 ">
      <div className="container mb-4">
        <Breadcrumb className="mx-2">
          <BreadcrumbItem><NavLink to="/home" className="App-link">Home</NavLink></BreadcrumbItem>
          <BreadcrumbItem><NavLink to={props.crumb[0]} className="App-link">{props.crumb[1]}</NavLink></BreadcrumbItem>
          <BreadcrumbItem>
            {props.frames.find(notebook => notebook.id === props.id).module + ': ' + props.frames.find(notebook => notebook.id === props.id).title}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="container text-white p-5">
        <IFrame url={props.frames.find(notebook => notebook.id === props.id).url} />
      </div>
    </div>
  );
}

export default Notebook;