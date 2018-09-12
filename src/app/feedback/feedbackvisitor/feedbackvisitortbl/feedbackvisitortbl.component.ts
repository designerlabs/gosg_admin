import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../../nav/nav.service';

@Component({
  selector: 'app-feedbackvisitortbl',
  templateUrl: './feedbackvisitortbl.component.html',
  styleUrls: ['./feedbackvisitortbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackvisitortblComponent implements OnInit, OnDestroy {

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
  lang: any;
  languageId: any;
  filterTypeVal = 0;
  showNoData = false;

  recordTable = null;
  kword: any;

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);

  applyFilter(val) {   

    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }
    else{
      this.resetSearch();
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
    public commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private navservice: NavService,
    private translate: TranslateService) { 

    /* LANGUAGE FUNC */
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.languageId = 1;
        });
      }

      if (myLang == 'ms') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.languageId = 2;
        });
      }
      if (this.navservice.flagLang) {
        
        this.getRecordList(this.pageCount, this.pageSize);
        this.commonservice.getModuleId();
      }

    });
    /* LANGUAGE FUNC */
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    // this.subscriptionContentCreator.unsubscribe();
    // this.subscriptionCategoryC.unsubscribe();
    // this.subscriptionRecordListC.unsubscribe();
  }

  ngOnInit() {

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
    } else {
      this.languageId = 1;
    }

    this.getRecordList(this.pageCount, this.pageSize);
    this.commonservice.getModuleId();
  }

  getRecordList(count, size) {

    this.recordList = null;
  
    this.loading = true;
    this.commonservice.readProtected('feedback/reply/0', count, size, '', this.languageId)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;
          if(this.recordList.feedbackList.length > 0){
            
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
      this.kword = val;
      this.loading = true;
      this.commonservice.readProtected(this.dataUrl, count, size, val, this.languageId)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){
          
          this.recordList = data;
          if(this.recordList.feedbackList.length > 0){

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
        
      });
    }
  }

  resetSearch() {
    this.kword = '';
    this.getRecordList(this.pageCount, this.pageSize);
  }

  paginatorL(page) {
    if(this.kword){
      this.getFilterList(page - 1, this.pageSize, this.kword, this.filterTypeVal);
    }else{
      this.getRecordList(page - 1, this.pageSize);
    }
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    if(this.kword){
      this.getFilterList(page + 1, this.pageSize, this.kword, this.filterTypeVal);
    }else{
      this.getRecordList(page + 1, this.pageSize);
    }
  }

  updateRow(row) {
    
    this.router.navigate(['feedback/message/visitor/', row]);
    this.commonservice.pageModeChange(true);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
    if(this.kword){
      this.getFilterList(this.pageCount, event.value, this.kword, this.filterTypeVal);
    }else{
      this.getRecordList(this.pageCount, event.value);
    }
    this.pageSize = event.value;
    this.noPrevData = true;
  }

}
