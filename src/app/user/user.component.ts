import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { debug } from 'util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
// import { ToastrService } from "ngx-toastr";
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit, AfterViewInit {

  userList = null;
  displayedColumns :any;
  userPageSize = 10;
  userPageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  viewSeq = 1; /* View Page Sequence Based on Discussion */
  dataUrl:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.userList);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, private commonservice: CommonService, private router: Router) {
    this.getUserList(this.userPageCount, this.userPageSize);
  }

  ngOnInit() {
    this.viewSeq = 2;
    if(this.viewSeq == 1) {
      this.displayedColumns = ['userId','fullName', 'userTypeId', 'accountStatusId' ];
    } else if(this.viewSeq == 2) {
      this.displayedColumns = ['userId','fullName', 'pid', 'userTypeId', 'isStaff', 'accountStatusId'  ];
    }
    this.getUserList(this.userPageCount, this.userPageSize);
    // console.log(this.dataSource)
  }

  getUserList(count, size) { //'?page=1&size=10'
  // console.log(this.appConfig.urlUserList + '/?page=' + count + '&size=' + size)
  // if(this.viewSeq == 1)
    this.dataUrl = this.appConfig.urlUserList;
  // else if(this.viewSeq == 2)
    // this.dataUrl = this.appConfig.urlUsers;

    this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size).subscribe(data => {
      
      this.userList = data;
      console.log(this.userList)
      this.dataSource.data = this.userList.userList;
      this.commonservice.userTable = this.userList;
     // this.noNextData = this.userList.pageNumber === this.userList.totalPages;
    });
  }

  paginatorL(page) {
    this.getUserList(page - 1, this.userPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getUserList(page + 1, this.userPageSize);
  }

  getRow(row) {
    console.log(row);
    this.commonservice.GetUser(row.userId);
  }

  add() {
    // console.log();
    alert("Add Admin User");
    // this.commonservice.GetUser(row.userId);
  }

  updateRow(row) {
    this.viewSeq = 2;
    console.log(this.viewSeq);
    console.log(row);
    alert("Update user id: "+row);
    // this.commonservice.GetUser(row.userId);
  }

  deleteRow(row) {
    console.log(row);
    alert("Delete user id: "+row);
    // this.commonservice.GetUser(row.userId);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }
   pageChange(event, totalPages) {
    this.getUserList(this.userPageCount, event.value);
    this.userPageSize = event.value;
    this.noPrevData = true;
  }

   onPaginateChange(event) {
    // alert(JSON.stringify(event));
    //  const startIndex = event.pageIndex * event.pageSize;
    // this.drugmap.getDrugDataForClient(startIndex, event.pageSize);
      // this.dataSource = new ExampleDataSource(this.exampleDatabase,this.paginator);
  }
}
