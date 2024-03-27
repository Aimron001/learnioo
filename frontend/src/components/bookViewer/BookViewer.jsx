
import { useState } from 'react';
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
    const pdf = `http://localhost:6000/${resolvedPath}`;
    console.log(pdf);

    const { data, error, isLoading} = usePromptMutation({filepath:pdf})
    console.log("data",data);

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }

  const onRenderSuccess = async (page) => {
    // Access internal PDF.js page instance
    const pdfPage = page?.pdfPage;
    if (!pdfPage) {
      return;
    }

    try {
      const textContent = await pdfPage.getTextContent();
      const texts = textContent.items.map(item => item.str).join(' ');
      console.log(texts);
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  };


  return (
    <div >
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber}  onRenderSuccess={() => onRenderSuccess(page)}/>
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