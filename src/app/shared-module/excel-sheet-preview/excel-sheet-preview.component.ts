import {
  Component,
  OnInit,
  Input,
  DoCheck,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-excel-sheet-preview',
  templateUrl: './excel-sheet-preview.component.html',
  styleUrls: ['./excel-sheet-preview.component.css']
})
export class ExcelSheetPreviewComponent
implements
OnInit,
DoCheck,
AfterViewInit {

  @ViewChild("displayContent", { read: ElementRef }) parentDiv: ElementRef;
  @Input() fileSelector: File;
  table: HTMLTableElement;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.table = (document.createElement("table") as HTMLTableElement);
    this.clearOutCurrentTable();
  }

  /**
   * Use this lifecycle hook to update When a file is uploaded
   * Internal logic for previewing excel file remains here
   */
  ngDoCheck(): void {
    if(this.fileSelector && typeof this.fileSelector !== "undefined") {
      this.table = (document.createElement("table") as HTMLTableElement);

      const fileArray: string[] = this.fileSelector.name.split(".");
      const fileExtension: string = fileArray[1]?.toLowerCase();

      if(fileExtension === "xlsx" || fileExtension === "xls") {
        this.previewExcelSheet(this.fileSelector);

        if(this.parentDiv) {
          //this.clearOutCurrentTable();
        }
      }
    }
  }

  private previewExcelSheet(file: File): void {
    const fileReader = new FileReader();
    //For Browsers other than IE.
    if (fileReader.readAsBinaryString) {
      fileReader.onload = (e) => {
          this.processExcel(e.target.result);
      };
      fileReader.readAsBinaryString(file);
    }
  }

  private processExcel(data): void {
    //Read the Excel File data.
    let workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    let firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    let excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);

    //Style the table
    this.table.style.width = "100%";

    //Set the Border For the table cells
    this.table.border = "1";

    //Add the header row.
    let row = this.table.insertRow(-1);

    const rows = excelRows[0];
    //Add the header cells.
    for (const key of Object.keys(rows)) {
        let headerCell = document.createElement("TH");
        headerCell.innerHTML = key;
        row.appendChild(headerCell);

        //Style the <tr> component
        headerCell.style.padding = "5px";
    }

    for(let i = 0; i < excelRows.length; i++){
        //Add the data row.
        let row = this.table.insertRow(-1);

        for (let [key, value] of Object.entries(excelRows[i])) {
            //Add the data cells.
            let cell = row.insertCell(-1);
            cell.innerHTML = value;

            //Style the <td> components
            cell.style.padding = "5px";
            cell.style.textAlign = "center";
        }
    }
  }

  private clearOutCurrentTable(){
    this.parentDiv.nativeElement.innerHTML = "";
    this.parentDiv.nativeElement.appendChild(this.table);
  }

}
