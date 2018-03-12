import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../../dialogs/dialogs.service';

@Component({
  selector: 'app-footercontenttbl',
  templateUrl: './footercontenttbl.component.html',
  styleUrls: ['./footercontenttbl.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FootercontenttblComponent implements OnInit {

  public loading = false;

  updateForm: FormGroup

  recordList = null;
  // displayedColumns = ['no', 'raceEng', 'raceMy', 'status', 'action'];
  displayedColumns = ['no', 'catEng', 'nameEng', 'nameMy', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  dataUrl: any;  
  languageId: any;
  showNoData = false;

  public getIdentificationTypeIdEng: any;
  public getIdentificationTypeIdMy: any;
  public getIdentificationTypeMy: any;
  public getIdentificationTypeEng: any;
  
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
    this.getRecordList(this.pageCount, this.pageSize);
    this.commonservice.getModuleId();
  }

  getRecordList(page, size) {
  
    this.dataUrl = 'footercontent';
    this.loading = true;
    this.commonservice.readProtected('footercontent', page, size)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
        this.recordList = data;

        if(this.recordList.list.length > 0){
          console.log("data");
          console.log(data);

          this.seqPageNum = this.recordList.pageNumber;
          this.seqPageSize = this.recordList.pageSize;
          
          this.dataSource.data = this.recordList.list;
          this.commonservice.recordTable = this.recordList;
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

      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);
      this.loading = false;
    });
  }

  getFilterList(page, size, keyword) {
  
    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.loading = true;
      this.commonservice.readProtected('footercontent', page, size, keyword)
      .subscribe(data => {
        this.commonservice.errorHandling(data, (function(){
          this.recordList = data;

          if(this.recordList.list.length > 0){

            console.log("data");
            console.log(data);

            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
            
            this.dataSource.data = this.recordList.list;
            this.commonservice.recordTable = this.recordList;
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

        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
        this.loading = false;
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

    this.router.navigate(['footer/footercontent/add']);
    this.commonservice.pageModeChange(false);
  }

  updateRow(row) {
    console.log(row);
    this.router.navigate(['footer/footercontent', row]);
    this.commonservice.pageModeChange(true);
  }

  
  deleteRow(refCode) {

    this.loading = true;

    console.log(refCode);
    this.commonservice.delete(refCode,'footer/footercontent').subscribe(
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

