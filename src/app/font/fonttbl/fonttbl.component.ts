import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../../config/app.config.module';
import { CommonService } from './../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../dialogs/dialogs.service';

@Component({
  selector: 'app-fonttbl',
  templateUrl: './fonttbl.component.html',
  styleUrls: ['./fonttbl.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class FonttblComponent implements OnInit {

  public loading = false;
  recordList = null;
  displayedColumns = ['num','name', 'url', 'default_status', 'status', 'action'];
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
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private translate: TranslateService,
    private dialogsService: DialogsService) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
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
    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    //this.getRecordList(this.pageCount, this.pageSize);
    this.commonservice.getModuleId();
  }

  getRecordList(page, size) {  

    this.loading = true;
    this.commonservice.readPortal('font', page, size).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
  
          this.recordList = data;
          console.log("data");
          console.log(data);
          
          this.dataSource.data = this.recordList.list;
          this.seqPageNum = this.recordList.pageNumber;
          this.seqPageSize = this.recordList.pageSize;
          this.commonservice.recordTable = this.recordList;
          this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
        }).bind(this)); 
        this.loading = false;
      },
      error => {
  
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
      });

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
    this.router.navigate(['font/add']);
    this.commonservice.pageModeChange(false);
  }

  updateRow(row) {
    console.log(row);
    this.router.navigate(['font/', row]);
    this.commonservice.pageModeChange(true);
  }

  deleteRow(id) {

    console.log(id);
    this.loading = true;
    this.commonservice.delete(id,'font').subscribe(
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
