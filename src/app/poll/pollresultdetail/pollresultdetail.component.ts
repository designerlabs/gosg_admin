import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../../config/app.config.module';
import { CommonService } from './../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../dialogs/dialogs.service';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-pollresultdetail',
  templateUrl: './pollresultdetail.component.html',
  styleUrls: ['./pollresultdetail.component.css']
})
export class PollresultdetailComponent implements OnInit, OnDestroy {

  updateForm: FormGroup

  recordList = null;
  displayedColumns = ['num','pq_en', 'pq_bm', 'status'];
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
  lang: any;
  public loading = false;
  showNoData = false;

  recordTable = null;

  kword: any;

  private subscriptionLang: ISubscription;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);
  selection = new SelectionModel<Element>(true, []);
  
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private navservice: NavService,
    private translate: TranslateService,
    private dialogsService: DialogsService) {

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

  getRecordList(page, size) {
    
    this.recordList = null;
    // this.dataUrl = this.appConfig.urlPoll + '/question?page=' + page + '&size=' + size + '&language=' +this.languageId;
    this.loading = true;
    this.commonservice.readProtected('polls/question/lists', page, size, '', this.languageId)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;
        
          if(this.recordList.pollQuestionFormatList.length > 0){           
            
            this.dataSource.data = this.recordList.pollQuestionFormatList;
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

      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      
      this.loading = false;
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

  back(){
    this.router.navigate(['poll/results']);
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
