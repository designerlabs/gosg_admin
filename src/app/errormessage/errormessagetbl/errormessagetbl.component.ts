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

  errMsgData: Object;
  errMsgList = null;
  displayedColumns: any;
  errMsgPageSize = 10;
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.errMsgList);

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
              this.getErrMsgsData(this.pageCount, this.errMsgPageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getErrMsgsData(this.pageCount, this.errMsgPageSize);
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
    // console.log(this.appConfig.urlerrMsgList + '/?page=' + count + '&size=' + size)
    this.dataUrl = this.appConfig.urlErrorMsg;
    
    this.http.get(this.dataUrl + '/code/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
        data => {
          console.log(this.dataUrl+ '/code/?page=' + count + '&size=' + size)
        this.errMsgList = data;
        console.log(this.errMsgList)
        this.dataSource.data = this.errMsgList.list;
        this.seqPageNum = this.errMsgList.pageNumber;
        this.seqPageSize = this.errMsgList.pageSize;
        this.commonservice.recordTable = this.errMsgList;
        this.noNextData = this.errMsgList.pageNumber === this.errMsgList.totalPages;
      });
  }

  paginatorL(page) {
    this.getErrMsgsData(this.pageCount, this.errMsgPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getErrMsgsData(page + 1, this.errMsgPageSize);
  }

  pageChange(event, totalPages) {
    this.getErrMsgsData(this.pageCount, event.value);
    this.errMsgPageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['errormessage', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['errormessage', row]);
  }

  deleteItem(refCode) {

    let txt;

      this.commonservice.delErrorMsg(refCode).subscribe(
        data => {
          txt = "Error Message deleted successfully!";
          this.toastr.success(txt, '');   
          this.getErrMsgsData(this.pageCount, this.errMsgPageSize);
        },
        error => {
          console.log("No Data")
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
