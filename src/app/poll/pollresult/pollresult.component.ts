import { Component, OnInit, ViewEncapsulation, Inject, ViewChild , OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../../config/app.config.module';
import { CommonService } from './../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';

@Component({
  selector: 'app-pollresult',
  templateUrl: './pollresult.component.html',
  styleUrls: ['./pollresult.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PollresultComponent implements OnInit, OnDestroy {

  recordList = null;
  displayedColumns = ['cb','num','question', 'opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'del', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;
  languageId: any;
  lang: any;
  public loading = false;

  recordTable = null;
  multipleSel: any = [];

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.recordList);
  selection = new SelectionModel<Element>(true, []);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
    private router: Router,
    private toastr: ToastrService,
    private navservice: NavService,
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

  getRecordList(page, size) {

    this.recordList = null;

    this.loading = true;
    this.commonservice.readProtected('polls/question/lists', page, size, '', this.languageId)
    .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;
          
          this.dataSource.data = this.recordList.pollQuestionFormatList;
          this.seqPageNum = this.recordList.pageNumber;
          this.seqPageSize = this.recordList.pageSize;
          this.recordTable = this.recordList;
          this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
        }).bind(this)); 
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        
    });
  }

  clearSelection() {
    this.multipleSel = [];
    this.getRecordList(this.pageCount, this.pageSize);
  }

  deleteAll() {
    let pollIds = this.multipleSel.join(',');

    this.loading = true;
      this.commonservice.delete('', `polls/question/delete/ref/${pollIds}`).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), 'success');
          }).bind(this));  
          this.loading = false;
          this.getRecordList(this.pageCount, this.pageSize);
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');  
          this.loading = false;  
        });

  }

  deleteRow(refNo) {
  
    this.commonservice.delete('', 'polls/question/delete/ref/'+refNo).subscribe(
      data => {
        
        this.commonservice.errorHandling(data, (function(){
          
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getRecordList(this.pageCount, this.pageSize);
        }).bind(this)); 
      },
      error => {

        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
    this.getRecordList(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  clickView(refNo){
    this.router.navigate(['poll/results', refNo]);
  }

  isChecked(e) {
    // 
    if(e.checked){
      this.multipleSel.push(e.source.value)
    } else{
      let index = this.multipleSel.indexOf(e.source.value);
      this.multipleSel.splice(index, 1);
    }
    return false;
  }

}
