import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-languagetbl',
  templateUrl: './languagetbl.component.html',
  styleUrls: ['./languagetbl.component.css']
})
export class LanguagetblComponent implements OnInit {

  languageData: Object;
  languageList = null;
  displayedColumns: any;
  languagePageSize = 10;
  languagePageCount = 1;
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

  dataSource = new MatTableDataSource<object>(this.languageList);

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
    this.getlanguagesData();
  }

  ngOnInit() {
    this.displayedColumns = ['no','languageCode', 'languageName', 'languageDescription', 'languageAction'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get language Data 
  getlanguagesData() {
    // console.log(this.appConfig.urllanguageList + '/?page=' + count + '&size=' + size)
    this.dataUrl = this.appConfig.urlLanguage;

    this.http.get(this.dataUrl + '/all').subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.languageList = data;
        console.log(this.languageList)
        this.dataSource.data = this.languageList.list;
        this.seqPageNum = 1;
        this.seqPageSize = 10;
        this.commonservice.recordTable = this.languageList;
        this.noNextData = this.languageList.pageNumber === this.languageList.totalPages;
      });
  }

  // paginatorL(page) {
  //   this.getlanguagesData(this.languagePageCount, this.languagePageSize);
  //   this.noPrevData = page <= 2 ? true : false;
  //   this.noNextData = false;
  // }

  // paginatorR(page, totalPages) {
  //   this.noPrevData = page >= 1 ? false : true;
  //   let pageInc: any;
  //   pageInc = page + 1;
  //   // this.noNextData = pageInc === totalPages;
  //   this.getlanguagesData(page + 1, this.languagePageSize);
  // }

  // pageChange(event, totalPages) {
  //   this.getlanguagesData(this.languagePageCount, this.languagePageSize);
  //   this.languagePageSize = event.value;
  //   this.noPrevData = true;
  // }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['language', "add"]);
    // this.viewSeq = 2;
    // this.languageForm.reset();
    // this.languageForm.get('active').setValue(true)
    // console.log(this.viewSeq);
    // this.router.navigate(['language', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['language', row]);
  }

  deleteRow(langId) {
    let txt;
    let r = confirm("Are you sure to delete " + langId + "?");
    if (r == true) {

      this.commonservice.delLanguage(langId).subscribe(
        data => {
          txt = "Language deleted successfully!";
          // this.router.navigate(['language']);
          this.toastr.success(txt, '');   
          this.getlanguagesData();
        },
        error => {
          console.log("No Data")
        });

      // this.languageForm.reset();
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
    this.router.navigate(['language']);
  }

  back(){
    this.router.navigate(['language']);
  }

}
