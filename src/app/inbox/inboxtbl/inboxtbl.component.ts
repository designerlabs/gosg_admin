// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-inboxtbl',
//   templateUrl: './inboxtbl.component.html',
//   styleUrls: ['./inboxtbl.component.css']
// })
// export class InboxtblComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from './../../dialogs/dialogs.service';

@Component({
  selector: 'app-inboxtbl',
  templateUrl: './inboxtbl.component.html',
  styleUrls: ['./inboxtbl.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class InboxtblComponent implements OnInit {

  public loading = false;
  updateForm: FormGroup

  recordList = null;
  displayedColumns = ['no', 'subject', 'content', 'sender', 'insertDate', 'action'];
  // displayedColumns = ['no', 'subject', 'content', 'sender', 'to', 'insertDate', 'status', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  dataUrl: any;  
  public languageId: any;
  showNoData = false;
  recordTable = null;

  // public getIdentificationTypeIdEng: any;
  // public getIdentificationTypeIdMy: any;
  // public getIdentificationTypeMy: any;
  // public getIdentificationTypeEng: any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);
  selection = new SelectionModel<Element>(true, []);

  applyFilter(e) {
    console.log(e);
    if(e){
      this.getFilterList(this.pageCount, this.pageSize, e);
    }
    else{
      this.getRecordList(this.pageCount, this.pageSize);
    }
  }
  
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, 
  private commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService,
  private dialogsService: DialogsService) {
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
    
  }

  ngOnInit() {
    //this.getRecordList(this.pageCount, this.pageSize);
    this.commonservice.getModuleId();
  }

  

  getRecordList(count, size) {

    this.recordList = null;

    this.loading = true;
    this.commonservice.readProtected('inbox', count, size)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
        this.recordList = data;
        if(this.recordList.list.length > 0){

          this.seqPageNum = this.recordList.pageNumber;
          this.seqPageSize = this.recordList.pageSize;
          
          this.dataSource.data = this.recordList.list;
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

  getFilterList(count, size, val) {

    this.recordList = null;
  
    if(val != "" && val != null && val.length != null && val.length >= 3) {
      this.loading = true;
      this.commonservice.readPortal('inbox', count, size, val)
      .subscribe(data => {
        this.commonservice.errorHandling(data, (function(){
          this.recordList = data;

          if(this.recordList.list.length > 0){

            console.log("data");
            console.log(data);

            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;            
            this.dataSource.data = this.recordList.list;
            this.recordTable = this.recordList;
            this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

            this.showNoData = false;
          }

          else{
            this.dataSource.data = []; 
            this.showNoData = true;
            this.seqPageSize = this.recordList.pageSize;            
            this.dataSource.data = this.recordList.list;
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

  add() {

    this.router.navigate(['inbox/add']);
    this.commonservice.pageModeChange(false);
  }

  updateRow(row) {
    console.log(row);
    this.router.navigate(['inbox', row]);
    this.commonservice.pageModeChange(true);
  }

  
  deleteRow(refCode) {

    this.loading = true;
    console.log(refCode);
    this.commonservice.delete(refCode,'inbox/').subscribe(
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
        console.log(error);
    });
    
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

