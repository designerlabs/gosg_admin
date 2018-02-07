import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-errormessagetbl',
  templateUrl: './errormessagetbl.component.html',
  styleUrls: ['./errormessagetbl.component.css']
})
export class ErrormessagetblComponent implements OnInit {

  errMsgData: Object;
  errMsgList = null;
  displayedColumns: any;
  errMsgPageSize = 10;
  errMsgPageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  dataUrl: any;
  date = new Date();
  pageMode: String;
  isEdit: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.errMsgList);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.getErrMsgsData(this.errMsgPageCount, 
    this.errMsgPageSize);
  }

  ngOnInit() {
    this.displayedColumns = [
      'errMsgCodeEn', 
      'messagesDescriptionEn', 
      'messagesDescriptionBm', 
      'errMsgAction'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get errMsg Data 
  getErrMsgsData(count, size) {
    // console.log(this.appConfig.urlerrMsgList + '/?page=' + count + '&size=' + size)
    this.dataUrl = this.appConfig.urlSlides;

    this.http.get(this.dataUrl + '/code/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.errMsgList = data;
        console.log(this.errMsgList)
        this.dataSource.data = this.errMsgList.list;
        this.commonservice.getErrorMsg = this.errMsgList;
        this.noNextData = this.errMsgList.pageNumber === this.errMsgList.totalPages;
      });
  }

  paginatorL(page) {
    this.getErrMsgsData(this.errMsgPageCount, this.errMsgPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getErrMsgsData(page + 1, this.errMsgPageSize);
  }

  pageChange(event, totalPages) {
    this.getErrMsgsData(this.errMsgPageCount, this.errMsgPageSize);
    this.errMsgPageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['errormessage', "add"]);
    // this.viewSeq = 2;
    // this.errMsgForm.reset();
    // this.errMsgForm.get('active').setValue(true)
    // console.log(this.viewSeq);
    // this.router.navigate(['errMsg', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['errormessage', row]);
  }

  deleteRow(enId,bmId) {
    let txt;
    let r = confirm("Are you sure to delete " + enId + " & " + bmId + "?");
    if (r == true) {

      this.commonservice.delErrorMsg(enId,bmId).subscribe(
        data => {
          txt = "errMsg deleted successfully!";
          // this.router.navigate(['errMsg']);
          this.toastr.success(txt, '');   
          window.location.reload();
        },
        error => {
          console.log("No Data")
        });

      // this.errMsgForm.reset();
    } else {
      txt = "Delete Cancelled!";
      // alert(txt)
    }
  }

  changePageMode(isEdit) {
    if (isEdit == false) {
      this.pageMode = "Add";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
  }

  back(){
    this.router.navigate(['errormessagetbl']);
  }

}
