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
  selector: 'app-contenttbl',
  templateUrl: './contenttbl.component.html',
  styleUrls: ['./contenttbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContenttblComponent implements OnInit {

  recordList = null;
  displayedColumns = ['num','accEng', 'accMalay', 'status', 'action'];
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
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getRecordList(this.pageCount, this.pageSize);
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getRecordList(this.pageCount, this.pageSize);
    }
    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    this.getRecordList(this.pageCount, this.pageSize);
  }

  getRecordList(count, size) {
    this.commonservice.readProtected('accountstatus',count, size)
    .subscribe(data => {
      this.recordList = data;

      if(this.recordList.list.length > 0){

        console.log("data");
        console.log(data);
        
        this.dataSource.data = this.recordList.list;
        this.seqPageNum = this.recordList.pageNumber;
        this.seqPageSize = this.recordList.pageSize;
        this.commonservice.recordTable = this.recordList;
        this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

        this.showNoData = false;
      }

      else{
        this.dataSource.data = []; 
        this.showNoData = true;
      }
      
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
    this.router.navigate(['content/add']);
    this.commonservice.pageModeChange(false);
  }

  updateRow(row) {
    console.log(row);
    this.router.navigate(['content/', row]);
    this.commonservice.pageModeChange(true);
  }

  deleteRow(refcode) {
    let txt;
  
    console.log(refcode);
    this.commonservice.delete(refcode,'accountstatus').subscribe(
      data => {
        
        let errMsg = data.statusCode.toLowerCase();

        if(errMsg == "error"){
          this.commonservice.errorResponse(data);
        }
        else{

          txt = "Record deleted successfully!"
          this.toastr.success(txt, '');  
          this.getRecordList(this.pageCount, this.pageSize);
        } 
                  
      },
      error => {

        txt = "Server is down."
        this.toastr.error(txt, '');  
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
