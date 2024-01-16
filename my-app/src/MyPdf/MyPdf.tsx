import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import dichvu from "../Dichvu.pdf";
import testPdf from "../assets/HANOI_DANH SACH XE 22SEP.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
export function Mypdf() {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1); // Set this to the page number you want to navigate to

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }
  return (
    <div>
      <Document file={testPdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
          Previous
        </button>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          Next
        </button>
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
