import '../App.css';
import React, { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';

import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import powershell from 'react-syntax-highlighter/dist/esm/languages/prism/powershell';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'

import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css';

// SyntaxHighlighter.registerLanguage('markdown', markdown);
// SyntaxHighlighter.registerLanguage('javascript', javascript);
// SyntaxHighlighter.registerLanguage('html', html);

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('powershell', powershell);
SyntaxHighlighter.registerLanguage('python', python);

function Markdown(props) {
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
            // children={post}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            remarkPlugins={[remarkGfm, remarkMath]}
            // components={codeBlock}
            components={{
              img: function ({ node, ...props }) {
                const fileName=node.properties.src.replace('./', '');
                props.src=`${process.env.PUBLIC_URL}/images/${fileName}`;
                props.alt=`${fileName}`
                return <img {...props} />;
              },
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                      language={match[1]}

                      style={a11yDark}

                      PreTag="div"
                      {...props}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}>
              {post}
          </ReactMarkdown>
        </div>
      </div>

    </div>
  );
}
export default Markdown;