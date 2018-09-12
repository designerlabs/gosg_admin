import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';

@Component({
  selector: 'app-dservicetbl',
  templateUrl: './dservicetbl.component.html',
  styleUrls: ['./dservicetbl.component.css']
})
export class DServicetblComponent implements OnInit, OnDestroy {

  dsData: Object;
  dsList = null;
  displayedColumns: any;
  pageSize = 10;
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
  lang:any;
  languageId: any;
  filterTypeVal: any;
  public loading = false;
  showNoData = false;

  recordTable = null;
  recordList = null;

  kword: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.dsList);
  
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;
  private subscriptionLangAll: ISubscription;

  applyFilter(val) {   
    
    if(val){
      this.kword = val;
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    } else {
      this.resetSearch();
    }
  
  }

  resetSearch() {
    this.kword = '';
    this.getDigitalServicesData(this.pageCount, this.pageSize, this.languageId);
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
    private translate: TranslateService,
    private navservice: NavService,
    private router: Router,
    private toastr: ToastrService
  ) { 
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
        // alert(this.languageId + ',' + this.localeVal)
      }
        if(this.navservice.flagLang){
          this.getDigitalServicesData(this.pageCount, this.pageSize, this.languageId);
          this.commonservice.getModuleId();
        }

    });

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }
    this.displayedColumns = ['no','titleEn', 'titleBm', 'enabled', 'dsAction'];
    this.getDigitalServicesData(this.pageCount, this.pageSize, this.languageId);
    
    this.commonservice.getModuleId();
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get agencyapp Data 
  getDigitalServicesData(count, size, lng) {
    this.loading = true;
    this.commonservice.readProtected('dservice',count, size, '', lng)
    .subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.dsList = data;
          
          

          if(this.dsList.list.length > 0){
            this.dataSource.data = this.dsList.list;
            this.seqPageNum = this.dsList.pageNumber;
            this.seqPageSize = this.dsList.pageSize;
            this.recordTable = this.dsList;
            this.noNextData = this.dsList.pageNumber === this.dsList.totalPages;

            this.showNoData = false;
          }

          else{
            this.dataSource.data = []; 
            this.showNoData = true;
          }
        }).bind(this));
     
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  getFilterList(count, size, keyword, filterkeyword?) {    

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.kword = keyword;
      this.loading = true;
      this.commonservice.readProtected('digitalservice', count, size, keyword, this.languageId)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;

          if(this.recordList.list.length > 0){
            
            
            
            this.dataSource.data = this.recordList.list;
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
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        this.loading = false;
        
      });
    }
  }

  paginatorL(page) {
    
    if(this.kword)
      this.getFilterList(page - 1, this.pageSize, this.kword);
    else
      this.getDigitalServicesData(this.pageCount, this.pageSize, this.languageId);
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
      this.getDigitalServicesData(page + 1, this.pageSize, this.languageId);
  }

  pageChange(event, totalPages) {
      
    if(this.kword)
      this.getFilterList(this.pageCount, event.value, this.kword);
    else
      this.getDigitalServicesData(this.pageCount, event.value, this.languageId);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['dservice', "add"]);
  }

  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['dservice', row]);
  }

  deleteItem(refCode) {
    // alert(refCode)
    this.loading = true;
      this.commonservice.delete(refCode,'dservice/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.getDigitalServicesData(this.pageCount, this.pageSize, this.languageId);
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), 'success');
          }).bind(this));  
         this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        });

  }

  changePageMode(isEdit) {
    if (isEdit == false) {
      this.pageMode = "View";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
  }

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['dservice']);
  }

  back(){
    this.router.navigate(['dservice']);
  }

}