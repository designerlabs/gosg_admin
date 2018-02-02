import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debug } from 'util';

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.css']
})
export class ReligionComponent implements OnInit {

  recordList = null;
  displayedColumns = ['num', 'Enreligion', 'Bmreligion', 'status', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  dataUrl: any;

  dataSource = new MatTableDataSource<object>(this.recordList);

  constructor(private http: HttpClient,) { }

  ngOnInit() {
    this.getRecordList();
  }

  getRecordList() {
  debugger;
    this.dataUrl = './app/apidata/religion.json';

    //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;
      console.log(data);
      this.dataSource.data = this.recordList.religionList;      
      this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
    });
  }

}
