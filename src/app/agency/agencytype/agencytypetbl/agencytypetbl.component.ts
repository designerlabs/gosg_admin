import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agencytypetbl',
  templateUrl: './agencytypetbl.component.html',
  styleUrls: ['./agencytypetbl.component.css']
})
export class AgencytypetblComponent implements OnInit {

  agencyTypeData: Object;
  agencyTypeList = null;
  displayedColumns: any;
  agencyTypePageSize = 10;
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

  dataSource = new MatTableDataSource<object>(this.agencyTypeList);

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
    this.getAgencyTypesData(this.pageCount, this.agencyTypePageSize);
  }

  ngOnInit() {
    this.displayedColumns = ['no','agencyTypeNameEn', 'agencyTypeNameBm', 'agencyTypeAction'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get agencyType Data 
  getAgencyTypesData(count, size) {
    // console.log(this.appConfig.urlagencyTypeList + '/?page=' + count + '&size=' + size)
    this.dataUrl = this.appConfig.urlAgencyType;

    this.http.get(this.dataUrl + '/code/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.agencyTypeList = data;
        console.log(this.agencyTypeList)
        this.dataSource.data = this.agencyTypeList.list;
        this.seqPageNum = this.agencyTypeList.pageNumber;
        this.seqPageSize = this.agencyTypeList.pageSize;
        this.commonservice.recordTable = this.agencyTypeList;
        this.noNextData = this.agencyTypeList.pageNumber === this.agencyTypeList.totalPages;
      });
  }

  paginatorL(page) {
    this.getAgencyTypesData(this.pageCount, this.agencyTypePageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getAgencyTypesData(page + 1, this.agencyTypePageSize);
  }

  pageChange(event, totalPages) {
    this.getAgencyTypesData(this.pageCount, event.value);
    this.agencyTypePageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['agencytype', "add"]);
    // this.viewSeq = 2;
    // this.agencyTypeForm.reset();
    // this.agencyTypeForm.get('active').setValue(true)
    // console.log(this.viewSeq);
    // this.router.navigate(['agencyType', "add"]);
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

      this.commonservice.delAgencyType(refCode).subscribe(
        data => {
          txt = "agencyType deleted successfully!";
          // this.router.navigate(['agencyType']);
          this.toastr.success(txt, '');   
          window.location.reload();
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
    this.router.navigate(['agencytype']);
  }

  back(){
    this.router.navigate(['agencytype']);
  }

}
