// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-gender',
//   templateUrl: './gender.component.html',
//   styleUrls: ['./gender.component.css']
// })
// export class GenderComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GenderComponent implements OnInit {

  // updateForm: FormGroup

  recordList = null;
  displayedColumns = ['no', 'genderEng', 'genderMy'];
  // displayedColumns = ['no', 'raceEng', 'raceMy', 'action'];
  // pageSize = 10;
  // pageCount = 1;
  noPrevData = true;
  noNextData = false;
  // rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  dataUrl: any;  

  public getRaceIdEng: any;
  public getRaceIdMy: any;
  public getRaceMy: any;
  public getRaceEng: any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);
  selection = new SelectionModel<Element>(true, []);

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, 
  private commonservice: CommonService, private router: Router) {
    this.getRecordList();
  }

  ngOnInit() {
    this.getRecordList();
  }

  getRecordList() {
  
    this.dataUrl = this.appConfig.urlGenderList;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log("data");
      console.log(data);

      // this.seqPageNum = this.recordList.pageNumber;
      // this.seqPageSize = this.recordList.pageSize;
      
      this.dataSource.data = this.recordList.list;
      this.commonservice.recordTable = this.recordList;
      this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

      //
      // this.getRaceIdMy = this.recordList.raceList[0].raceId;
      // this.getRaceIdEng = this.recordList.raceList[1].raceId;
      // this.getRaceMy = this.recordList.raceList[0].refCode;
      // this.getRaceEng = this.recordList.raceList[1].refCode;
    });
  }

  

  
}
