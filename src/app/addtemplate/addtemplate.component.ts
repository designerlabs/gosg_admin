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


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://10.1.70.148:8080/gosg-service-admin/menu/list?lang=1').subscribe(data => {
      // tslint:disable-next-line:no-debugger
      debugger;
      console.log(data);
    });
  }
}

