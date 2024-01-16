import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfReact() {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState(1); // Set this to the page number you want to navigate to

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="https://americanenglish.state.gov/files/ae/resource_files/b_dialogues_everyday_conversations_english_lo_0.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <iframe
        className="w-full h-full min-h-screen"
        src="https://americanenglish.state.gov/files/ae/resource_files/b_dialogues_everyday_conversations_english_lo_0.pdf"
        title="Iframe Example"
      ></iframe>
    </div>
  );
}
// src="https://americanenglish.state.gov/files/ae/resource_files/b_dialogues_everyday_conversations_english_lo_0.pdf"
