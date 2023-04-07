import '../App.css';
import React, { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import { SizeMe } from 'react-sizeme';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

function Doc(props) {

  const doc = props.docs.find(doc => doc.title === props.title)
  const file_url = doc.url;
  const [post, setPost] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  function previousPage() {
    changePage(-1);
  }
  function nextPage() {
    changePage(1);
  }

  // useEffect(() => {
  //   import(`${file_url}`)
  //     .then(res => {
  //       fetch(res.default)
  //         .then(res => res.text())
  //         .then(res => setPost(res))
  //     })
  //     .catch(err => console.log(err));
  // });

  useEffect(() => {
    const fetchPdf = async () => {
      let data;
      try {
        // Try to fetch the file from the public folder
        const response = await fetch(`${file_url}`);
        data = await response.blob();
      } catch {
        // If the file is not found in the src folder, try to fetch it from the src folder
        // const response = await fetch(`${}`);
        // data = await response.blob();
      }
      setPost(data);
    };
    fetchPdf();
  }, [props.id]);

  return (
    <div className="bg-home pb-5">
      <div className="container mb-4">
        <Breadcrumb className="mx-2">
          <BreadcrumbItem><NavLink to="/home" className="App-link">Home</NavLink></BreadcrumbItem>
          <BreadcrumbItem><NavLink to={props.crumb[0]} className="App-link">{props.crumb[1]}</NavLink></BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="container box text-white text-start justify-items-center p-5">
        <h2>{doc.title}</h2>
        <br />
        <Document file={post} onLoadSuccess={onDocumentLoadSuccess} className="">
          <Page pageNumber={pageNumber} scale={props.scale}
            renderTextLayer={false} renderAnnotationLayer={false}
            className=""
          // height={document.getElementsByClassName('PdfDiv')[0]?.clientHeight*0.8 ?? 150}
          />
        </Document>
        <div className="row mt-3">
          <div className="col-2">
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
          <div className="col-2 offset-8">
            <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Doc;