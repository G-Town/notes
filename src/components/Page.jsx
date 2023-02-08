import '../App.css';
import React, { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import markdown from 'react-syntax-highlighter/dist/esm/languages/hljs/markdown';
import allydark from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import ReactMarkdown from 'react-markdown';

SyntaxHighlighter.registerLanguage('markdown', markdown);

function Page(props) {
  // const codeString=props.frames.find(page => page.id === props.id).url
  const file_name = props.frames.find(page => page.id === props.id).url;
  const [post, setPost] = useState('');
  useEffect(() => {
    import(`../${file_name}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setPost(res))
      })
      .catch(err => console.log(err));
  });

  return (
    <div className="bg-home pb-5 ">
      <div className="container mb-4">
        <Breadcrumb className="mx-2">
          <BreadcrumbItem><NavLink to="/home" className="App-link">Home</NavLink></BreadcrumbItem>
          <BreadcrumbItem><NavLink to={props.crumb[0]} className="App-link">{props.crumb[1]}</NavLink></BreadcrumbItem>
          <BreadcrumbItem>
            {props.frames.find(page => page.id === props.id).module + ': ' + props.frames.find(page => page.id === props.id).title}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      {/* <div className="container box text-white p-5">
        <Markdown>
          {post}
        </Markdown>
      </div> */}
      <div className="container box text-white text-start justify-items-start p-5">
        <div className="row">
          <ReactMarkdown
            children={post}
            components={{
              img: function ({ node, ...props }) {
                const fileName=node.properties.src.replace('./', '');
                props.src=`${process.env.PUBLIC_URL}/images/${fileName}`;
                props.alt=`${fileName}`
                return <img {...props} />;
              },
              code({ children, ...props }) {
                return (
                  <SyntaxHighlighter
                    language="markdown"
                    style={allydark}
                  >
                    {children}
                  </SyntaxHighlighter>
                );
              }
            }}>
          </ReactMarkdown>
        </div>
      </div>

    </div>
  );
}
export default Page;