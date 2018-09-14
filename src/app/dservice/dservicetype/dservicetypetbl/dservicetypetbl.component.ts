import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../../nav/nav.service';

@Component({
  selector: 'app-dservicetypetbl',
  templateUrl: './dservicetypetbl.component.html',
  styleUrls: ['./dservicetypetbl.component.css']
})
export class DServicetypetblComponent implements OnInit, OnDestroy {

  dsTypeData: Object;
  dsTypeList = null;
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.dsTypeList);
  
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;
  private subscriptionLangAll: ISubscription;

  applyFilter(val) {   

    
    
    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    } else {
      this.resetSearch();
    }
  
  }

  resetSearch() {
    this.getDigitalServicesTypeData(this.pageCount, this.pageSize, this.languageId);
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
          this.getDigitalServicesTypeData(this.pageCount, this.pageSize, this.languageId);
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
    
    this.displayedColumns = ['no','nameEn', 'nameBm', 'action'];
    this.getDigitalServicesTypeData(this.pageCount, this.pageSize, this.languageId);
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
  getDigitalServicesTypeData(count, size, lng) {
    this.loading = true;
    this.commonservice.readProtected('dservice/type',count, size, '', lng)
    .subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.dsTypeList = data;
          
          

          if(this.dsTypeList.list.length > 0){
            this.dataSource.data = this.dsTypeList.list;
            this.seqPageNum = this.dsTypeList.pageNumber;
            this.seqPageSize = this.dsTypeList.pageSize;
            this.recordTable = this.dsTypeList;
            this.noNextData = this.dsTypeList.pageNumber === this.dsTypeList.totalPages;

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

  getFilterList(count, size, keyword, filterkeyword) {    

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.loading = true;
      this.commonservice.readProtected('dservice/type', count, size, keyword)
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
    this.getDigitalServicesTypeData(this.pageCount, this.pageSize, this.languageId);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getDigitalServicesTypeData(page + 1, this.pageSize, this.languageId);
  }

  pageChange(event, totalPages) {
    this.getDigitalServicesTypeData(this.pageCount, event.value, this.languageId);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['dservicetype', "add"]);
  }

  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['dservicetype', row]);
  }

  deleteItem(refCode) {
    // alert(refCode)
    this.loading = true;
      this.commonservice.delete(refCode,'dservice/type/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.getDigitalServicesTypeData(this.pageCount, this.pageSize);
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
    this.router.navigate(['dservicetype']);
  }

  back(){
    this.router.navigate(['dservicetype']);
  }

}