import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';

@Component({
  selector: 'app-errormessagetbl',
  templateUrl: './errormessagetbl.component.html',
  styleUrls: ['./errormessagetbl.component.css']
})
export class ErrormessagetblComponent implements OnInit, OnDestroy {

  public loading = false;
  errMsgData: Object;
  errMsgList = null;
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
  showNoData = false;
  recordTable = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.errMsgList);
  
  private subscriptionLang: ISubscription;

  applyFilter(e) {
    console.log(e);
    if(e){
      this.getFilterList(this.pageCount, this.pageSize, e);
    }
    else{
      this.getErrMsgsData(this.pageCount, this.pageSize, this.languageId);
    }
  }

  resetSearch() {
    this.getErrMsgsData(this.pageCount, this.pageSize, this.languageId);
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
    private router: Router,
    private navservice: NavService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
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
          this.getErrMsgsData(this.pageCount, this.pageSize, this.languageId);
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

    this.displayedColumns = [
      'no', 
      'errMsgCodeEn', 
      'messagesDescriptionEn', 
      'messagesDescriptionBm', 
      'errMsgAction'];
      this.getErrMsgsData(this.pageCount, this.pageSize, this.languageId);
      this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  // get errMsg Data 
  getErrMsgsData(page, size, lng) {
    this.loading = true;   
    this.commonservice.readProtected('errormessage/code', page, size, '', lng)
      .subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            // console.log(this.dataUrl+ '/code/?page=' + page + '&size=' + size)
            this.errMsgList = data;

            if(this.errMsgList.list.length > 0){
              console.log(this.errMsgList)
              this.dataSource.data = this.errMsgList.list;
              this.seqPageNum = this.errMsgList.pageNumber;
              this.seqPageSize = this.errMsgList.pageSize;
              this.recordTable = this.errMsgList;
              this.noNextData = this.errMsgList.pageNumber === this.errMsgList.totalPages;

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

  getFilterList(page, size, keyword) {

    this.errMsgList =  null;

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.loading = true;   
      this.commonservice.readProtected('errormessage/code', page, size, keyword, this.languageId)
      .subscribe(
          data => {

            this.commonservice.errorHandling(data, (function(){
              // console.log(this.dataUrl+ '/code/?page=' + page + '&size=' + size)
              this.errMsgList = data;

              if(this.errMsgList.list.length > 0){
                console.log(this.errMsgList)
                this.dataSource.data = this.errMsgList.list;
                this.seqPageNum = this.errMsgList.pageNumber;
                this.seqPageSize = this.errMsgList.pageSize;
                this.recordTable = this.errMsgList;
                this.noNextData = this.errMsgList.pageNumber === this.errMsgList.totalPages;

                this.showNoData = false;
            }

            else{
              this.dataSource.data = []; 
              this.showNoData = true;
              this.seqPageNum = this.errMsgList.pageNumber;
              this.seqPageSize = this.errMsgList.pageSize;
              this.recordTable = this.errMsgList;
              this.noNextData = this.errMsgList.pageNumber === this.errMsgList.totalPages;
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

  paginatorL(page) {
    this.getErrMsgsData(this.pageCount, this.pageSize, this.languageId);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getErrMsgsData(page + 1, this.pageSize, this.languageId);
  }

  pageChange(event, totalPages) {
    this.getErrMsgsData(this.pageCount, event.value, this.languageId);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['errormessage', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    this.router.navigate(['errormessage', row]);
  }

  deleteItem(refCode) {

    this.loading = true;   
    this.commonservice.delete(refCode,'errormessage/delete/').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');  
          this.getErrMsgsData(this.pageCount, this.pageSize);
        }).bind(this)); 
        this.loading = false;          
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        console.log(error);
    });
  }

  changePageMode(isEdit) {
    if (isEdit == false) {
      this.pageMode = "Add";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
  }

  back(){
    this.router.navigate(['errormessage']);
  }

}
