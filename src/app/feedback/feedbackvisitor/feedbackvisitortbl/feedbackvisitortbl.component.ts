import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../../nav/nav.service';
import { DialogResultExampleDialog } from '../../../lifeevent/lifeevent.component';
import { DialogsService } from '../../../dialogs/dialogs.service';

@Component({
  selector: 'app-feedbackvisitortbl',
  templateUrl: './feedbackvisitortbl.component.html',
  styleUrls: ['./feedbackvisitortbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackvisitortblComponent implements OnInit, OnDestroy {

  public loading = false;
  public recordList = null;
  displayedColumns = ['num','type', 'name','email', 'status', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  dataUrl: any;  
  lang: any;
  languageId: any;
  filterTypeVal = 0;
  showNoData = false;

  recordTable = null;
  kword: any;
  listHistory = null;

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);
  dataSourceH = new MatTableDataSource<object>(this.listHistory);

  applyFilter(val) {   

    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }
    else{
      this.resetSearch();
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
    public commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private dialogsService: DialogsService,
    private navservice: NavService,
    public dialog: MatDialog,
    private translate: TranslateService) { 

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
      if (this.navservice.flagLang) {
        
        this.getRecordList(this.pageCount, this.pageSize);
        this.commonservice.getModuleId();
      }

    });
    /* LANGUAGE FUNC */
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    // this.subscriptionContentCreator.unsubscribe();
    // this.subscriptionCategoryC.unsubscribe();
    // this.subscriptionRecordListC.unsubscribe();
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
    } else {
      this.languageId = 1;
    }

    this.getRecordList(this.pageCount, this.pageSize);
    this.commonservice.getModuleId();
  }

  getRecordList(count, size) {

    this.recordList = null;
  
    this.loading = true;
    this.commonservice.readProtected('feedback/reply/0', count, size, '', this.languageId)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;
          if(this.recordList.feedbackList.length > 0){
            
            this.dataSource.data = this.recordList.feedbackList;
            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
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
      
    });
  }

  getFilterList(count, size, val, filterVal) {
    
    this.recordList = null;

    if(filterVal == 2){  // by Email
      this.dataUrl = 'feedback/search/email/0/';
    }

    else if (filterVal == 3){ // by keywords
      this.dataUrl = 'feedback/search/0/';
    }

    if(val != "" && val != null && val.length != null && val.length >= 3) {
      this.kword = val;
      this.loading = true;
      this.commonservice.readProtected(this.dataUrl, count, size, val, this.languageId)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){
          
          this.recordList = data;
          if(this.recordList.feedbackList.length > 0){

            this.dataSource.data = this.recordList.feedbackList;
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

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        
      });
    }
  }

  resetSearch() {
    this.kword = '';
    this.getRecordList(this.pageCount, this.pageSize);
  }

  paginatorL(page) {
    if(this.kword){
      this.getFilterList(page - 1, this.pageSize, this.kword, this.filterTypeVal);
    }else{
      this.getRecordList(page - 1, this.pageSize);
    }
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    if(this.kword){
      this.getFilterList(page + 1, this.pageSize, this.kword, this.filterTypeVal);
    }else{
      this.getRecordList(page + 1, this.pageSize);
    }
  }

  updateRow(row) {
    
    this.router.navigate(['feedback/message/visitor/', row]);
    this.commonservice.pageModeChange(true);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
    if(this.kword){
      this.getFilterList(this.pageCount, event.value, this.kword, this.filterTypeVal);
    }else{
      this.getRecordList(this.pageCount, event.value);
    }
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  detailHistory(id) {

    this.loading = true;
    this.commonservice.readProtected('feedback/history/' + id,'','','',this.languageId).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function () {

          this.listHistory = data;
          let config = new MatDialogConfig();
          config.width = '800px';
          config.height = '600px';
          let dialogRef = this.dialog.open(DialogResultExampleDialog, config);

          let displayTilte = "";
          if (this.languageId == 1) {
            displayTilte = "<h3>HISTORY</h3>"
            displayTilte += '<table class="table"><tr class="tableHistory"><td width="40%">Name</td>';
            displayTilte += '<td width="20%">Activity</td>';
            displayTilte += '<td width="40%">Time</td></tr>';
          } else {
            displayTilte = "<h3>SEJARAH</h3>";
            displayTilte += '<table class="table"><tr class="tableHistory"><td width="40%">Nama</td>';
            displayTilte += '<td width="20%">Aktiviti</td>';
            displayTilte += '<td width="40%">Masa</td></tr>';
          }
          let display: any;

          for (let i = 0; i < this.listHistory.list.length; i++) {

            let newDate = new Date(this.listHistory.list[i].revisionDate);
            displayTilte += '<tr><td>' + this.listHistory.list[i].user.firstName;
            displayTilte += '<br>(' + this.listHistory.list[i].user.email + ')</td>';
            displayTilte += '<td>' + this.listHistory.list[i].type + '</td>';
            displayTilte += '<td>' + newDate + '</td></tr>';
          }
          displayTilte += '</table>';
        
          dialogRef.componentInstance.content = `${displayTilte}`;
          display = dialogRef.componentInstance.content;

          if (this.listHistory.list.length > 0) {
            this.dataSourceH.data = this.listHistory.list;
            this.loading = false;
          }
          

        }).bind(this));
        this.loading = false;
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });

  }

}
