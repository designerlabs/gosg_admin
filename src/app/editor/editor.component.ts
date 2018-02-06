import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  title = 'ngx-editor';
  latestRelease: any = {};
  private subscription: Subject<any> = new Subject();

  htmlContent = '';
  editorConfig = {
    "editable": true,
    "spellcheck": true,
    "height": "5rem",
    "minHeight": "2rem",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "toolbar": [
        ["bold", "italic"],        
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["orderedList", "unorderedList"],
        ["link", "unlink", "image"]
    ]
}
  constructor() { }

  ngOnInit() {
  }

}
