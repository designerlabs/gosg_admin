import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

@Component({
  selector: 'app-articletbl',
  templateUrl: './articletbl.component.html',
  styleUrls: ['./articletbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticletblComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    debugger;
  }

}
