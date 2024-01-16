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
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function zoomIn() {
    setScale((prevScale) => prevScale + 0.1);
  }

  function zoomOut() {
    setScale((prevScale) => prevScale - 0.1);
  }

  function download() {
    window.open(testPdf, "_blank");
  }

  return (
    <div>
      <Document file={testPdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>
      <div>
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut} disabled={scale <= 0.1}>
          Zoom Out
        </button>
        <button onClick={download}>Download</button>
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
