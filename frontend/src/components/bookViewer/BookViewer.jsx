
import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useSelector } from 'react-redux';
import path from 'path'
import { usePromptMutation } from '../../features/api/bookApiSlice';

export default function BookViewer() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
    const { userBooks } = useSelector(state => state.books);
    const books = Object.entries(userBooks);
    const i = books?.length ? books.length - 1 : 0;
    let path = books && books[i] && books[i][1]?.book; 
    let resolvedPath = path?.replace(/\\/g, "/");
    const pdf = `http://localhost:5000/${resolvedPath}`;

  
  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }



  return (
    <div >
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber}  renderAnnotationLayer={false} renderTextLayer={false}/>
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div>
        <button onClick={() => setPageNumber(prev => prev - 1)} disabled={pageNumber === 1}>Previous</button>
        <button onClick={() => setPageNumber(prev => prev + 1)} disabled={pageNumber === numPages}>Next</button>
      </div>
    </div>
  );
}