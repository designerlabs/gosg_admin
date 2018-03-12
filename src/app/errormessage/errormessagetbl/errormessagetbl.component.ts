import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-errormessagetbl',
  templateUrl: './errormessagetbl.component.html',
  styleUrls: ['./errormessagetbl.component.css']
})
export class ErrormessagetblComponent implements OnInit {

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.errMsgList);

  applyFilter(e) {
    console.log(e);
    if(e){
      this.getFilterList(this.pageCount, this.pageSize, e);
    }
    else{
      this.getErrMsgsData(this.pageCount, this.pageSize);
    }
  }

  resetSearch() {
    this.getErrMsgsData(this.pageCount, this.pageSize);
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private toastr: ToastrService
  ) { 
    
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getErrMsgsData(this.pageCount, this.pageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getErrMsgsData(this.pageCount, this.pageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = [
      'no', 
      'errMsgCodeEn', 
      'messagesDescriptionEn', 
      'messagesDescriptionBm', 
      'errMsgAction'];
      this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get errMsg Data 
  getErrMsgsData(count, size) {
    this.loading = true;   
    this.commonservice.readProtected('errormessage/code', count, size)
      .subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            console.log(this.dataUrl+ '/code/?page=' + count + '&size=' + size)
            this.errMsgList = data;

            if(this.errMsgList.list.length > 0){
              console.log(this.errMsgList)
              this.dataSource.data = this.errMsgList.list;
              this.seqPageNum = this.errMsgList.pageNumber;
              this.seqPageSize = this.errMsgList.pageSize;
              this.commonservice.recordTable = this.errMsgList;
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

  getFilterList(count, size, val) {
    if(val != "" && val != null && val.length != null && val.length >= 3) {
      this.loading = true;   
      this.commonservice.readProtected('errormessage', count, size, val)
      .subscribe(
          data => {

            this.commonservice.errorHandling(data, (function(){
              console.log(this.dataUrl+ '/code/?page=' + count + '&size=' + size)
              this.errMsgList = data;

              if(this.errMsgList.list.length > 0){
                console.log(this.errMsgList)
                this.dataSource.data = this.errMsgList.list;
                this.seqPageNum = this.errMsgList.pageNumber;
                this.seqPageSize = this.errMsgList.pageSize;
                this.commonservice.recordTable = this.errMsgList;
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
  }

  paginatorL(page) {
    this.getErrMsgsData(this.pageCount, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getErrMsgsData(page + 1, this.pageSize);
  }

  pageChange(event, totalPages) {
    this.getErrMsgsData(this.pageCount, event.value);
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
    this.commonservice.delete(refCode,'errormessage/delete').subscribe(
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
