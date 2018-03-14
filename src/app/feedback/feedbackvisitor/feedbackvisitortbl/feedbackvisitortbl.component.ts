import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-feedbackvisitortbl',
  templateUrl: './feedbackvisitortbl.component.html',
  styleUrls: ['./feedbackvisitortbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackvisitortblComponent implements OnInit {

  public loading = false;
  public recordList = null;
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
  languageId: any;
  filterTypeVal = 0;
  showNoData = false;

  recordTable = null;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);

  applyFilter(val) {   

    console.log(val  + "TEST VISITOR" + this.filterTypeVal);
    
    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }
    else{
      this.getRecordList(this.pageCount, this.pageSize);
    }
  
  }

  filterType(filterVal) {

    this.filterTypeVal = filterVal.value; 

    if(this.filterTypeVal == 1){
      this.getRecordList(this.pageCount, this.pageSize);
    }
 
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private translate: TranslateService) { 

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getRecordList(this.pageCount, this.pageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getRecordList(this.pageCount, this.pageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    //this.getRecordList(this.pageCount, this.pageSize);
    this.commonservice.getModuleId();
  }

  getRecordList(count, size) {

    this.recordList = null;
  
    this.loading = true;
    this.commonservice.readProtected('feedback/reply/0', count, size)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;
          if(this.recordList.feedbackList.length > 0){
            console.log("data");
            console.log(data);
            
            this.dataSource.data = this.recordList.feedbackList;
            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
            this.recordTable = this.recordList;
            this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

            this.showNoData = false;
          }

          else{
            this.dataSource.data = []; 
            this.showNoData = true;
          }

      }).bind(this)); 
      this.loading = false;
    },
    error => {

      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);
    });
  }

  getFilterList(count, size, val, filterVal) {
    
    this.recordList = null;

    if(filterVal == 2){  // by Email
      this.dataUrl = 'feedback/search/email/0/';
    }

    else if (filterVal == 3){ // by keywords
      this.dataUrl = 'feedback/search/0/';
    }

    if(val != "" && val != null && val.length != null && val.length >= 3) {
   
      this.loading = true;
      this.commonservice.readProtected(this.dataUrl, count, size, val)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){
          
          this.recordList = data;
          if(this.recordList.feedbackList.length > 0){

            console.log("data Filter");
            console.log(data);
            
            this.dataSource.data = this.recordList.feedbackList;
            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
            this.recordTable = this.recordList;
            this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

            this.showNoData = false;
          }

          else{
            this.dataSource.data = []; 
            this.showNoData = true;
            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
            this.recordTable = this.recordList;
            this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
          }

        }).bind(this)); 
        this.loading = false;
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
      });
    }
  }

  resetSearch() {
    this.getRecordList(this.pageCount, this.pageSize);
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

  updateRow(row) {
    console.log(row);
    this.router.navigate(['feedback/message/visitor/', row]);
    this.commonservice.pageModeChange(true);
  }

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
