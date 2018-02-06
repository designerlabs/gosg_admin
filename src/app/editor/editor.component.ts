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

result = {
  "formattedHtml": "<h4>Info@Malaysia</h4><span><p><strong>Introduction</strong></p><p>Info@Malaysia is a major platform that connects all the major social media, namely Facebook and Twitter, of Government agencies to make it easy for the public to receive the latest information relating to the services and activities undertaken by government agencies. It is also a platform for members of the public looking for the official social media of Government agencies. To date, a total of 96 agencies’ social media has been collected and this number is expected to increase from time to time.</p><p><strong>Why was Info@Malaysia Developed?</strong></p><p>With recent development in social media activity, many users are often taken advantage of. Irresponsible users reproduce official social media of the Government to mislead consumers.</p><p><strong>What are the Objectives of developing Info@Malaysia?</strong></p><ul><li>To provide a platform that aggregates all the social media (Facebook/Twitter) of Government agencies.</li><li>To be the main platform for gathering and disseminating information to the people.</li><li>To be the primary reference and main source for the official social media of Government agencies.</li></ul><p><strong>&#xa0;</strong><strong>Key Features</strong></p><p>• &#xa0;A single local portal for all social media information on government agencies so that the people do not have to access a lot of social media (MOH, MOE, PMD, etc.)</p><p>• &#xa0;Unlimited accessibility even when agencies block access to Facebook and Twitter.</p><p>• Information from a trusted source as the information displayed is legitimate from the actual Government social media. This prevents users from referring to unauthorised Government social media sources.</p><p>• &#xa0;The filter function, which enables people to choose to receive news from selected agencies only.</p><p>• &#xa0;The search function, which makes it easier for people to search for the news they need.</p><p>• &#xa0;Not having unrelated posts and advertisements that current social media have.</p><p>• &#xa0;All activities related to agencies are taken from the agencies’ official Facebook pages.</p></span>",
  "type": "RESPONSE",
  "statusCode": "S001",
  "statusDesc": "Parsed/Formatted Raw HTML Content Successfully."
}
  constructor() { }

  ngOnInit() {
    this.htmlContent = this.result.formattedHtml;
  }

}
