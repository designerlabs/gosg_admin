import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usertbl',
  templateUrl: './usertbl.component.html',
  styleUrls: ['./usertbl.component.css']
})
export class UsertblComponent implements OnInit {

  userData: Object;
  userList = null;
  displayedColumns: any;
  displayedColumns2: any;
  userPageSize = 10;
  userPageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  dataUrl: any;
  date = new Date();
  pageMode: String;
  isEdit: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.userList);

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
    this.getUsersData(this.userPageCount, 
    this.userPageSize);
  }

  ngOnInit() {
    this.displayedColumns = ['slideTitleEn', 'slideTitleBm', 'slideActiveFlag', 'slideAction'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get Slider Data 
  getUsersData(count, size) {
    // console.log(this.appConfig.urlsliderList + '/?page=' + count + '&size=' + size)
    this.dataUrl = this.appConfig.urlSlides;

    this.http.get(this.dataUrl + '/code/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.userList = data;
        console.log(this.userList)
        this.dataSource.data = this.userList.list;
        this.commonservice.sliderTable = this.userList;
        this.noNextData = this.userList.pageNumber === this.userList.totalPages;
      });
  }

  paginatorL(page) {
    this.getUsersData(this.userPageCount, this.userPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getUsersData(page + 1, this.userPageSize);
  }

  pageChange(event, totalPages) {
    this.getUsersData(this.userPageCount, this.userPageSize);
    this.userPageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['slider', "add"]);
    // this.viewSeq = 2;
    // this.sliderForm.reset();
    // this.sliderForm.get('active').setValue(true)
    // console.log(this.viewSeq);
    // this.router.navigate(['slider', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['slider', row]);
  }

  deleteRow(enId,bmId) {
    let txt;
    let r = confirm("Are you sure to delete " + enId + " & " + bmId + "?");
    if (r == true) {

      this.commonservice.delSlider(enId,bmId).subscribe(
        data => {
          txt = "Slider deleted successfully!";
          // this.router.navigate(['slider']);
          this.toastr.success(txt, '');   
          window.location.reload();
        },
        error => {
          console.log("No Data")
        });

      // this.sliderForm.reset();
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
    this.router.navigate(['slider']);
  }

  back(){
    this.router.navigate(['slider']);
  }

}
