import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MaincontentComponent implements OnInit {
  side = true;
  constructor() { }

  ngOnInit() {
  }

}
