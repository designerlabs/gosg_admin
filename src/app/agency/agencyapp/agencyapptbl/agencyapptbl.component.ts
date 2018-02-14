import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agencyapptbl',
  templateUrl: './agencyapptbl.component.html',
  styleUrls: ['./agencyapptbl.component.css']
})
export class AgencyapptblComponent implements OnInit {

  agencyAppData: Object;
  agencyAppList = null;
  displayedColumns: any;
  agencyAppPageSize = 10;
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

  dataSource = new MatTableDataSource<object>(this.agencyAppList);

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
    this.getAgencyAppData(this.pageCount, this.agencyAppPageSize);
  }

  ngOnInit() {
    this.displayedColumns = ['no','agencyAppNameEn', 'agencyAppNameBm', 'agencyAppAction'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get agencyapp Data 
  getAgencyAppData(count, size) {
    this.dataUrl = this.appConfig.urlAgencyApp;
    console.log(this.dataUrl + '/code/?page=' + count + '&size=' + size)

    this.http.get(this.dataUrl + '/code/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.agencyAppList = data;
        console.log(this.agencyAppList)
        this.dataSource.data = this.agencyAppList.list;
        this.seqPageNum = this.agencyAppList.pageNumber;
        this.seqPageSize = this.agencyAppList.pageSize;
        this.commonservice.recordTable = this.agencyAppList;
        this.noNextData = this.agencyAppList.pageNumber === this.agencyAppList.totalPages;
      });
  }

  paginatorL(page) {
    this.getAgencyAppData(this.pageCount, this.agencyAppPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getAgencyAppData(page + 1, this.agencyAppPageSize);
  }

  pageChange(event, totalPages) {
    this.getAgencyAppData(this.pageCount, event.value);
    this.agencyAppPageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['agencyapp', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['agencyapp', row]);
  }

  deleteRow(refCode) {
    let txt;
    let r = confirm("Are you sure to delete " + refCode + "?");
    if (r == true) {

      this.commonservice.delAgencyApp(refCode).subscribe(
        data => {
          txt = "agencyapp deleted successfully!";
          // this.router.navigate(['agencyapp']);
          this.toastr.success(txt, '');   
          this.getAgencyAppData(this.pageCount, this.agencyAppPageSize);
        },
        error => {
          console.log("No Data")
        });

      // this.agencyappForm.reset();
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
    this.router.navigate(['agencyapp']);
  }

  back(){
    this.router.navigate(['agencyapp']);
  }

}
