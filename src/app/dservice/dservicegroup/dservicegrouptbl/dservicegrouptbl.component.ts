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
  selector: 'app-dservicegrouptbl',
  templateUrl: './dservicegrouptbl.component.html',
  styleUrls: ['./dservicegrouptbl.component.css']
})
export class DServicegrouptblComponent implements OnInit, OnDestroy {

  dsGroupData: Object;
  dsGroupList = null;
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

  dataSource = new MatTableDataSource<object>(this.dsGroupList);
  
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;
  private subscriptionLangAll: ISubscription;

  applyFilter(val) {   

    console.log(val);
    
    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }
    else{
      this.getDigitalServicesGroupData(this.pageCount, this.pageSize, this.languageId);
    }
  
  }

  resetSearch() {
    this.getDigitalServicesGroupData(this.pageCount, this.pageSize, this.languageId);
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
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
      }

      if(this.navservice.flagLang){
        this.getDigitalServicesGroupData(this.pageCount, this.pageSize, this.languageId);
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
    
    this.displayedColumns = ['no','descEn', 'descBm', 'action'];
    this.getDigitalServicesGroupData(this.pageCount, this.pageSize, this.languageId);
    this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  // get agencyapp Data 
  getDigitalServicesGroupData(count, size, lng) {
    this.loading = true;
    this.commonservice.readProtected('dservice/group',count, size, '', lng)
    .subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.dsGroupList = data;
          console.log(this.dsGroupList)
          console.log(this.dsGroupList.list)

          if(this.dsGroupList.list.length > 0){
            this.dataSource.data = this.dsGroupList.list;
            this.seqPageNum = this.dsGroupList.pageNumber;
            this.seqPageSize = this.dsGroupList.pageSize;
            this.recordTable = this.dsGroupList;
            this.noNextData = this.dsGroupList.pageNumber === this.dsGroupList.totalPages;

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
      this.commonservice.readProtected('dservice/group', count, size, keyword)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;

          if(this.recordList.list.length > 0){
            console.log("data");
            console.log(data);
            
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
        console.log(error);
      });
    }
  }

  paginatorL(page) {
    this.getDigitalServicesGroupData(this.pageCount, this.pageSize, this.languageId);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getDigitalServicesGroupData(page + 1, this.pageSize, this.languageId);
  }

  pageChange(event, totalPages) {
    this.getDigitalServicesGroupData(this.pageCount, event.value, this.languageId);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['dservicegroup', "add"]);
  }

  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['dservicegroup', row]);
  }

  deleteItem(refCode) {
    // alert(refCode)
    this.loading = true;
      this.commonservice.delete(refCode,'dservice/group/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.getDigitalServicesGroupData(this.pageCount, this.pageSize);
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
    this.router.navigate(['dservicegroup']);
  }

  back(){
    this.router.navigate(['dservicegroup']);
  }

}