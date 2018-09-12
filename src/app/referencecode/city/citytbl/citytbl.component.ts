import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../../nav/nav.service';

@Component({
  selector: 'app-citytbl',
  templateUrl: './citytbl.component.html',
  styleUrls: ['./citytbl.component.css']
})

export class CitytblComponent implements OnInit, OnDestroy {

  recordList = null;
  displayedColumns = ['no', 'cityName', 'cityId', 'cityCode', 'stateName', 'stateId','action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  lang: any;
  
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  languageId: any;
  public loading = false;
  private subscriptionLang: ISubscription;

  showNoData = false;
  recordTable = null;

  kword: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.recordList);
  selection = new SelectionModel<Element>(true, []);

  applyFilter(e) {
    
    if(e){
      this.kword = e;
      this.getFilterList(this.pageCount, this.pageSize, e);
    } else {
      this.resetSearch();
    }
  }

  constructor(
      private http: HttpClient, 
      @Inject(APP_CONFIG) private appConfig: AppConfig,
      public commonservice: CommonService, private router: Router,
      private translate: TranslateService,
      private navservice: NavService,
      private toastr: ToastrService) {

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
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.getRecordList(this.pageCount, this.pageSize);
    this.commonservice.getModuleId(); 
  }

  getRecordList(page, size) {

    this.recordList = null;
    this.loading = true;

    this.commonservice.readPortal('city', page, size, '', this.languageId)
      .subscribe(data => {
        this.commonservice.errorHandling(data, (function(){
        this.recordList = data;
      
        if(this.recordList.cityList.length > 0){

          this.dataSource.data = this.recordList.cityList;
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

  getFilterList(page, size, keyword) {

    this.recordList = null;

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.kword = keyword;
      this.loading = true;
      
      this.commonservice.readPortal('city', page, size, keyword, this.languageId)
        .subscribe(data => {
          this.commonservice.errorHandling(data, (function(){
          this.recordList = data;

          if(this.recordList.cityList.length > 0){

            this.dataSource.data = this.recordList.cityList;
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
    if(this.kword)
      this.getFilterList(page - 1, this.pageSize, this.kword);
    else
      this.getRecordList(page - 1, this.pageSize);

    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    if(this.kword)
      this.getFilterList(page + 1, this.pageSize, this.kword);
    else
      this.getRecordList(page + 1, this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
      
    if(this.kword)
      this.getFilterList(this.pageCount, event.value, this.kword);
    else
      this.getRecordList(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() { 
    this.router.navigate(['reference/city/', "add"]);
  }

  updateRow(row) {
    
    this.router.navigate(['reference/city/', row]);
    this.commonservice.pageModeChange(true);
  }

  deleteRow(refcode) {

    this.loading = true;

    this.commonservice.delete(refcode, 'city/delete/').subscribe(
    data => {
      
      this.commonservice.errorHandling(data, (function(){
        
        this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
        this.getRecordList(this.pageCount, this.pageSize);
      }).bind(this));  
      this.loading = false;
    },
    error => {

      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
        
    });  
  }

}
