import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedbackvisitortbl',
  templateUrl: './feedbackvisitortbl.component.html',
  styleUrls: ['./feedbackvisitortbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackvisitortblComponent implements OnInit {

  recordList = null;
  displayedColumns = ['num','type', 'name','email', 'status', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  dataUrl: any;  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);

  applyFilter(val) {
    console.log(val)
    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val);
    }
    else{
      this.getRecordList(this.pageCount, this.pageSize);
    }
  }

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, 
  private commonservice: CommonService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.getRecordList(this.pageCount, this.pageSize);
  }

  getRecordList(count, size) {
  
    this.dataUrl = this.appConfig.urlFeedback + '/reply/0?page=' + count + '&size=' + size;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log("data");
      console.log(data);
      
      this.dataSource.data = this.recordList.feedbackList;
      this.seqPageNum = this.recordList.pageNumber;
      this.seqPageSize = this.recordList.pageSize;
      this.commonservice.recordTable = this.recordList;
      this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
    });
  }

  getFilterList(count, size, val) {
  
    this.dataUrl = this.appConfig.urlFeedback + '/search/'+ val +'?page=' + count + '&size=' + size + "&language=1";

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log("data");
      console.log(data);
      
      this.dataSource.data = this.recordList.feedbackList;
      this.seqPageNum = this.recordList.pageNumber;
      this.seqPageSize = this.recordList.pageSize;
      this.commonservice.recordTable = this.recordList;
      this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
    });
  }

  paginatorL(page) {
    this.getRecordList(page - 1, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getRecordList(page + 1, this.pageSize);
  }

  // add() {
  //   this.router.navigate(['feedback/message/visitor/add']);
  //   this.commonservice.pageModeChange(false);
  // }

  updateRow(row) {
    console.log(row);
    this.router.navigate(['feedback/message/visitor/', row]);
    this.commonservice.pageModeChange(true);
  }

  // deleteRow(refcode) {
  //   let txt;
  //   let r = confirm("Are you sure to delete?");
  //   if (r == true) {

  //     console.log(refcode);
  //     this.commonservice.delRecordAccStatus(refcode).subscribe(
  //       data => {
          
  //         txt = "Record deleted successfully!";

  //         this.toastr.success(txt, '');  
  //         this.getRecordList(this.pageCount, this.pageSize);
  //       },
  //       error => {
  //         console.log("No Data")
  //     });
  //   }

  //   else{
  //     txt = "Delete Cancelled!";
  //   }
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
    this.getRecordList(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

}
