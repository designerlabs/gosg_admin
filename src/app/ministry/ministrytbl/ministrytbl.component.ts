import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ministrytbl',
  templateUrl: './ministrytbl.component.html',
  styleUrls: ['./ministrytbl.component.css']
})
export class MinistrytblComponent implements OnInit {

  agencyData: Object;
  ministryList = null;
  displayedColumns: any;
  agencyPageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  dataUrl: any;
  date = new Date();
  pageMode: String;
  isEdit: boolean;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.ministryList);

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
    this.getMinistryData(this.pageCount, this.agencyPageSize);
  }

  ngOnInit() {
    this.displayedColumns = ['no','ministryNameEn', 'ministryNameBm', 'ministryAction'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get ministry Data 
  getMinistryData(count, size) {
    this.dataUrl = this.appConfig.urlMinistry;
    console.log(this.dataUrl + '/?page=' + count + '&size=' + size)

    this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.ministryList = data;
        console.log(this.ministryList)
        this.dataSource.data = this.ministryList.list;
        this.seqPageNum = this.ministryList.pageNumber;
        this.seqPageSize = this.ministryList.pageSize;
        this.commonservice.recordTable = this.ministryList;
        this.noNextData = this.ministryList.pageNumber === this.ministryList.totalPages;
      });
  }

  paginatorL(page) {
    this.getMinistryData(this.pageCount, this.agencyPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getMinistryData(page + 1, this.agencyPageSize);
  }

  pageChange(event, totalPages) {
    this.getMinistryData(this.pageCount, event.value);
    this.agencyPageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['ministry', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['ministry', row]);
  }

  deleteRow(refCode) {
    let txt;
    let r = confirm("Are you sure to delete " + refCode + "?");
    if (r == true) {

      this.commonservice.delMinistry(refCode).subscribe(
        data => {
          txt = "ministry deleted successfully!";
          // this.router.navigate(['ministry']);
          this.toastr.success(txt, '');   
          this.getMinistryData(this.pageCount, this.agencyPageSize);
        },
        error => {
          console.log("No Data")
        });

      // this.ministryForm.reset();
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

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['ministry']);
  }

  back(){
    this.router.navigate(['ministry']);
  }

}
