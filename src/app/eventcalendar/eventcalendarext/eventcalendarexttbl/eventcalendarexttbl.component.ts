import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../../../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../../nav/nav.service';

@Component({
  selector: 'app-eventcalendarexttbl',
  templateUrl: './eventcalendarexttbl.component.html',
  styleUrls: ['./eventcalendarexttbl.component.css']
})
export class EventcalendarexttblComponent implements OnInit, OnDestroy {

  displayedExtColumns: string[];
  calendarData: Object;
  calendarList = null;
  calendarExtList = null;
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
  isExternal: boolean;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;
  lang:any;
  languageId: any;
  filterTypeVal: any;
  public loading = false;
  recordTable = null;
  recordList = null;

  showNoData = false

  kword: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.calendarList);
  dataSourceExt = new MatTableDataSource<object>(this.calendarExtList);
  
  private subscriptionLang: ISubscription;

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
    this.getEventData(this.pageCount, this.pageSize, this.languageId);
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
    private navservice: NavService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
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
          this.getEventData(this.pageCount, this.pageSize, this.languageId);
          this.commonservice.getModuleId();
        }

    });
    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }
    
    this.displayedColumns = ['no','eventName','enabled', 'calendarAction'];
    this.getEventData(this.pageCount, this.pageSize, this.languageId);
    this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  // get agencyType Data 
  getEventData(count, size, lng) {
    this.loading = true;
    this.commonservice.readProtected('calendar/external', count, size, '', lng).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.calendarList = data;

          if(this.calendarList.list.length > 0){
            this.dataSource.data = this.calendarList.list;
            
            this.seqPageNum = this.calendarList.pageNumber;
            this.seqPageSize = this.calendarList.pageSize;
            this.recordTable = this.calendarList;
            this.noNextData = this.calendarList.pageNumber === this.calendarList.totalPages;

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
      this.commonservice.readProtected('calendar/external',count, size, keyword)
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
      this.getEventData(this.pageCount, this.pageSize, this.languageId);
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
      this.getEventData(page + 1, this.pageSize, this.languageId);
  }

  pageChange(event, totalPages) {
      
    if(this.kword)
      this.getFilterList(this.pageCount, event.value, this.kword);
    else
      this.getEventData(this.pageCount, event.value, this.languageId);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  showCalendar(type) {
    
    if(type == 1)
      this.router.navigate(['calendar']);
  }

  back(){
    this.router.navigate(['calendar']);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['calendarext', row]);
  }

}
