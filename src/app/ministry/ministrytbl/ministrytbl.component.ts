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
  agencyList = null;
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

  dataSource = new MatTableDataSource<object>(this.agencyList);

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
    this.getAgencyData(this.pageCount, this.agencyPageSize);
  }

  ngOnInit() {
    this.displayedColumns = ['no','agencyTypeNameEn', 'agencyTypeNameBm', 'agencyTypeAction'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get agencyType Data 
  getAgencyData(count, size) {
    this.dataUrl = this.appConfig.urlAgency;
    console.log(this.dataUrl + '/code/?page=' + count + '&size=' + size)

    this.http.get(this.dataUrl + '/code/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.agencyList = data;
        console.log(this.agencyList)
        this.dataSource.data = this.agencyList.list;
        this.seqPageNum = this.agencyList.pageNumber;
        this.seqPageSize = this.agencyList.pageSize;
        this.commonservice.recordTable = this.agencyList;
        this.noNextData = this.agencyList.pageNumber === this.agencyList.totalPages;
      });
  }

  paginatorL(page) {
    this.getAgencyData(this.pageCount, this.agencyPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getAgencyData(page + 1, this.agencyPageSize);
  }

  pageChange(event, totalPages) {
    this.getAgencyData(this.pageCount, event.value);
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
    this.router.navigate(['agencytype', row]);
  }

  deleteRow(refCode) {
    let txt;
    let r = confirm("Are you sure to delete " + refCode + "?");
    if (r == true) {

      this.commonservice.delAgency(refCode).subscribe(
        data => {
          txt = "agencyType deleted successfully!";
          // this.router.navigate(['agencyType']);
          this.toastr.success(txt, '');   
          this.getAgencyData(this.pageCount, this.agencyPageSize);
        },
        error => {
          console.log("No Data")
        });

      // this.agencyTypeForm.reset();
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
