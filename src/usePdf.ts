import { useState } from 'react';
import pdfjsLib from 'pdfjs-dist';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';


export const usePdf = () => {
  const [pdfImgs, setPdfImgs] = useState<string[]>([]);

  const [isLoading, setLoading] = useState(true);

  const [isError, setError] = useState(false);

  // eslint-disable-next-line no-async-promise-executor
  const createTask = (page:number, pdf:any):Promise<string> => new Promise(async(resolve) => {
    const scale = 2;
    const pdfPage = await pdf.getPage(page);
    const container = document.createElement('div');
    // @ts-ignore
    const pageView = new pdfjsViewer.PDFPageView({
      container,
      id: page + 1,
      scale,
      defaultViewport: pdfPage.getViewport({ scale }),
    });
    pageView.setPdfPage(pdfPage);
    await pageView.draw();
    const data = pageView.canvas?.toDataURL('image/png', scale) as string;
    pageView.destroy();
    resolve(data);
  });

  const renderPng = async(pdf:any) => {
    try {
      const task = [];
      for(let i = 1;i <= pdf.numPages;i++){
        task.push(createTask(i, pdf));
      }
      Promise.all(task).then((imgs:string[]) => {
        setPdfImgs(imgs);
      }).catch((error) => {
        throw(error);
      });
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const getPdfImg = async(url:string) => {
    try {
      setLoading(true);
      const pdf = await pdfjsLib.getDocument(url).promise;
      await renderPng(pdf);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return { pdfImgs, isLoading, isError, getPdfImg };
};
