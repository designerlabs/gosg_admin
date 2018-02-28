import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../../dialogs/dialogs.service';

@Component({
  selector: 'app-feedbackadmintbl',
  templateUrl: './feedbackadmintbl.component.html',
  styleUrls: ['./feedbackadmintbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackadmintblComponent implements OnInit {
  
  recordList = null;
  displayedColumns = ['num','feedbackEng', 'feedbackMalay','email', 'status', 'action'];
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
  filterTypeVal: any;
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);

  applyFilter(val) {   

    console.log(val  + "TEST" + this.filterTypeVal);
    
    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }
    else{
      this.getRecordList(this.pageCount, this.pageSize);
    }
  
  }

  filterType(filterVal) {

    this.filterTypeVal = filterVal.value;  
    
    if(this.filterTypeVal == 1){
      this.getRecordList(this.pageCount, this.pageSize);
    }
  }
  
  constructor(
    private http: HttpClient, 
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

    this.getRecordList(this.pageCount, this.pageSize);
    this.commonservice.getModuleId();
  }

  getRecordList(count, size) {
  
    this.dataUrl = this.appConfig.urlFeedback + '/reply/1?page=' + count + '&size=' + size + '&language='+this.languageId;

    this.http.get(this.dataUrl)
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.recordList = data;
        console.log("data");
        console.log(data);
        
        this.dataSource.data = this.recordList.feedbackList;
        this.seqPageNum = this.recordList.pageNumber;
        this.seqPageSize = this.recordList.pageSize;
        this.commonservice.recordTable = this.recordList;
        this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

      }).bind(this)); 
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);
    });
  }

  getFilterList(count, size, val, filterVal) {

    if(filterVal == 2){  // by Email
      this.dataUrl = this.appConfig.urlFeedback + '/search/email/1/'+ val +'?page=' + count + '&size=' + size + '&language='+this.languageId;
    }

    else if (filterVal == 3){ // by keywords
      this.dataUrl = this.appConfig.urlFeedback + '/search/1/'+ val +'?page=' + count + '&size=' + size + '&language='+this.languageId;
    }

    this.http.get(this.dataUrl)
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.recordList = data;
        console.log("data");
        console.log(data);
        
        this.dataSource.data = this.recordList.feedbackList;
        this.seqPageNum = this.recordList.pageNumber;
        this.seqPageSize = this.recordList.pageSize;
        this.commonservice.recordTable = this.recordList;
        this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

      }).bind(this)); 
    },
    error => {
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

  updateRow(row) {
    console.log(row);
    this.router.navigate(['feedback/message/admin/', row]);
  }

  deleteRow(getId) {
    
    console.log(getId);
    this.commonservice.delRecordFeedback(getId).subscribe(
      data => {
        
        this.commonservice.errorHandling(data, (function(){

          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getRecordList(this.pageCount, this.pageSize);
        }).bind(this)); 
      },
      error => {
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
