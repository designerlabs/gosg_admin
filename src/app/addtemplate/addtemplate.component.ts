import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-addtemplate',
  templateUrl: './addtemplate.component.html',
  styleUrls: ['./addtemplate.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AddtemplateComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
}

