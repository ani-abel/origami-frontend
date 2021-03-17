import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatRadioModule } from "@angular/material/radio";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatTabsModule } from "@angular/material/tabs";
import { RelativeTimePipe } from './relative-time.pipe';
import { ProgressComponent } from './progress/progress.component';
import { DndDirective } from './dnd.directive';
import { FileUploadDropzoneComponent } from './file-upload-dropzone/file-upload-dropzone.component';
import { CkEditorComponent } from './ck-editor/ck-editor.component';
import { ImagePreviewDialogComponent } from './image-preview-dialog/image-preview-dialog.component';
import { ExcelSheetPreviewComponent } from './excel-sheet-preview/excel-sheet-preview.component';
import { PdfDocumentPreviewComponent } from './pdf-document-preview/pdf-document-preview.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MeesageDialogComponent } from './meesage-dialog/meesage-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { NoContentFoundComponent } from './no-content-found/no-content-found.component';
import { NoInputSelectedComponent } from './no-input-selected/no-input-selected.component';
import { UpcomingEventDateComponent } from './upcoming-event-date/upcoming-event-date.component';

@NgModule({
  declarations: [
    RelativeTimePipe,
    ProgressComponent,
    DndDirective,
    FileUploadDropzoneComponent,
    CkEditorComponent,
    ImagePreviewDialogComponent,
    ExcelSheetPreviewComponent,
    PdfDocumentPreviewComponent,
    ErrorDialogComponent,
    MeesageDialogComponent,
    NoContentFoundComponent,
    NoInputSelectedComponent,
    UpcomingEventDateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatRadioModule,
    MatCardModule,
    FlexLayoutModule,
    CKEditorModule,
    MatTabsModule,
    HttpClientModule
  ],
  exports: [
    DndDirective,
    FileUploadDropzoneComponent,
    CkEditorComponent,
    ProgressComponent,
    ExcelSheetPreviewComponent,
    PdfDocumentPreviewComponent,
    RelativeTimePipe,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    MatRadioModule,
    FlexLayoutModule,
    CKEditorModule,
    MatTabsModule,
    ImagePreviewDialogComponent,
    ErrorDialogComponent,
    MeesageDialogComponent,
    NoContentFoundComponent,
    NoInputSelectedComponent,
    UpcomingEventDateComponent
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class SharedModuleModule { }
