import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-ck-editor',
  templateUrl: './ck-editor.component.html',
  styleUrls: ['./ck-editor.component.css']
})
export class CkEditorComponent implements OnInit {
  @Output() textareaInputEvent: EventEmitter<string> = new EventEmitter<string>();
  textarea: string;
  public Editor = ClassicEditor;//attribute used for ckEditor

  public onChange( { editor }: ChangeEvent ) {
    this.textareaInputEvent.emit(editor.getData());
  }
  constructor() { }

  ngOnInit(): void {
  }

}
