import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
//import * as pdfjs from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-document-preview',
  templateUrl: './pdf-document-preview.component.html',
  styleUrls: ['./pdf-document-preview.component.css']
})
export class PdfDocumentPreviewComponent implements OnInit {
  @Input() fileURL: string;
  iFrameUrl: SafeUrl;
  //pdfDoc: pdfjs.PDFDocumentProxy;
  //pdfDoc: any;
  // canvasElement: HTMLCanvasElement;
  // pageIsRendering: boolean;
  // scale: number = 1.5;
  // numberOfPages: number;
  // selectedPage: number;
  // totalPageRatio: string;

  // @ViewChild("pdfRenderContentContainer", { read: ElementRef }) canvasContainerElement: ElementRef;
  // @ViewChild("pageNumberSelector", { read: ElementRef }) pageNumberSelectorElement: ElementRef;

  constructor(private readonly sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://drive.google.com/viewerng/viewer?url=${this.fileURL}?pid=explorer&efh=false&a=v&chrome=false&embedded=true`);
    //this.canvasElement = (document.createElement("canvas") as HTMLCanvasElement);
    //this.selectedPage = 1;
  }

  // async ngAfterViewInit(): Promise<void> {
  //   this.pageIsRendering = false;

  //   try {
  //     if(this.fileURL) {
  //       pdfjs.GlobalWorkerOptions.workerSrc = 'https://npmcdn.com/pdfjs-dist@2.3.200/build/pdf.worker.js';
  //       const loadingTask = pdfjs.getDocument(this.fileURL);
  //       this.pdfDoc = await loadingTask.promise;

  //       //Get the total number of pages for this PDF file
  //       this.numberOfPages = await this.pdfDoc.numPages;

  //       this.totalPageRatio = `${this.selectedPage}/${this.numberOfPages}`;

  //       await this.renderPage(this.selectedPage);
  //     }
  //   }
  //   catch(ex) {
  //     console.error(ex);
  //   }
  // }

  // async renderPage(num: number): Promise<void> {
  //   this.pageIsRendering = true;//tell the app that a page is rendering

  //   const pdfDocPage: pdfjs.PDFPageProxy = await this.pdfDoc.getPage(num);

  //   //Recreate a new Canvas element
  //   this.canvasElement = (document.createElement("canvas") as HTMLCanvasElement);

  //   //set the scale of the pdf
  //   const viewport = pdfDocPage.getViewport({ scale: this.scale });
  //   this.canvasElement.height = viewport.height;
  //   this.canvasElement.width = viewport.width;
  //   const ctx = this.canvasElement.getContext("2d")

  //   const renderCtx: pdfjs.PDFRenderParams = {
  //     canvasContext: ctx,
  //     viewport
  //   };

  //   const loadRenderPage = pdfDocPage.render(renderCtx);
  //   await loadRenderPage.promise;
  //   this.pageIsRendering = false;

  //   //Add the newly created canvas to the DOM
  //   this.canvasContainerElement.nativeElement.innerHTML = "";
  //   this.canvasContainerElement.nativeElement.appendChild(this.canvasElement);
  // }

  // async previousPage(currentPage: any): Promise<void> {
  //   currentPage = parseInt(currentPage);
  //   this.selectedPage = this.selectedPage > 1 ? currentPage -= 1 : this.selectedPage;
  //   await this.renderPage(this.selectedPage);
  //   this.totalPageRatio = `${this.selectedPage}/${this.numberOfPages}`;
  // }

  // async nextPage(currentPage: any): Promise<void> {
  //   currentPage = parseInt(currentPage);
  //   this.selectedPage = this.selectedPage < this.numberOfPages ? currentPage += 1 : this.selectedPage;
  //   await this.renderPage(this.selectedPage);
  //   this.totalPageRatio = `${this.selectedPage}/${this.numberOfPages}`;
  // }

  // async selectNewPageNumber(): Promise<void> {
  //   const userPage = this.pageNumberSelectorElement.nativeElement.value;
  //   const convertedPageNumber = (userPage && parseInt(userPage) > 0 ? parseInt(userPage) : 1);
  //   await this.renderPage(convertedPageNumber);
  //   this.totalPageRatio = `${this.selectedPage}/${this.numberOfPages}`;
  //   this.selectedPage = convertedPageNumber;
  // }
}
