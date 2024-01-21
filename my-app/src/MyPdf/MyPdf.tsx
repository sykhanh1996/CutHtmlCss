import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import dichvu from "../Dichvu.pdf";
import testPdf from "../assets/HANOI_DANH SACH XE 22SEP.pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import DropdownSelect from "../DropdownList/DropdownSelect";
import { PDFDocumentProxy } from "pdfjs-dist";
import ReactToPrint from "react-to-print";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
export function Mypdf() {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const onDocumentLoadSuccess = async (pdfObject: PDFDocumentProxy) => {
    setNumPages(pdfObject.numPages);
  };

  function zoomIn() {
    setScale((prevScale) => prevScale + 0.1);
  }

  function zoomOut() {
    setScale((prevScale) => prevScale - 0.1);
  }

  function download() {
    window.open(testPdf, "_blank");
  }

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offsetTop = rect.top;
      ref.current.style.height = `calc(100vh - ${offsetTop}px)`;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Fix scroll bug
  useEffect(() => {
    if (ref.current) {
      const docElement = ref.current.querySelector(".react-pdf__Document");
      const pageElement = ref.current.querySelector(".react-pdf__Page");
      if (
        docElement instanceof HTMLDivElement &&
        pageElement instanceof HTMLDivElement
      ) {
        if (pageElement.offsetWidth > ref.current.offsetWidth) {
          docElement.style.overflow = "scroll";
        } else {
          docElement.style.overflow = "initial";
        }

        if (
          pageElement.offsetHeight > ref.current.offsetHeight &&
          pageElement.offsetWidth < ref.current.offsetWidth
        ) {
          ref.current.style.overflowY = "scroll";
        } else {
          ref.current.style.overflowY = "initial";
        }
      }
    }
  }, [scale]);

  const handlePrint = () => {
    if (ref.current) {
      const pageElement = ref.current.querySelector(".react-pdf__Page");

      return pageElement;
    }
    return ref.current;
  };

  return (
    <div>
      <header className="w-full p-4  bg-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="mr-1 cursor-pointer px-1.5 py-1 rounded hover:bg-gray-300"
              onClick={() => {
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
              }}
              disabled={pageNumber > numPages - 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            <div className="text-xl">
              <input
                type="text"
                value={pageNumber}
                className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-300 focus:border-blue-300 block w-12 h-7 px-1 text-lg text-right outline-none"
                onChange={(e) => {}}
                disabled
              />
            </div>
            <div className="ml-1 space-x-1 text-xl">
              <span className="font-bold">/</span>
              <span>{numPages}</span>
            </div>
            <button
              className="ml-1 cursor-pointer px-1.5 py-1 rounded hover:bg-gray-300"
              onClick={() => {
                setPageNumber((prevPageNumber) => prevPageNumber - 1);
              }}
              disabled={pageNumber < 2}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
          <div className="flex space-x-3">
            <button
              className="mr-1 cursor-pointer px-1.5 py-1 rounded hover:bg-gray-300"
              onClick={zoomIn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </button>
            <div>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 outline-none"
                defaultValue={4}
              >
                <option value="0.5">50%</option>
                <option value="0.75">75%</option>
                <option value="1">100%</option>
                <option value="1.25">125%</option>
                <option value="1.5">150%</option>
                <option value="2">200%</option>
                <option value="3">300%</option>
                <option value="4" hidden>
                  400%
                </option>
              </select>
            </div>
            <button
              className="mr-1 cursor-pointer px-1.5 py-1 rounded hover:bg-gray-300"
              onClick={zoomOut}
              disabled={scale <= 0.1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
                />
              </svg>
            </button>
          </div>
          <div className="flex space-x-1">
            <button className="px-1.5 py-1 rounded cursor-pointer hover:bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>
            <ReactToPrint
              trigger={() => (
                <button className="px-1.5 py-1 rounded cursor-pointer hover:bg-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                    />
                  </svg>
                </button>
              )}
              content={handlePrint}
            />
          </div>
        </div>
      </header>

      <div ref={ref} className="flex justify-center bg-gray-300">
        <Document
          file={testPdf}
          onLoadSuccess={onDocumentLoadSuccess}
          // className="overflow-x-auto overflow-y-hidden"
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>
    </div>
  );
}
