import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
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
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';

@Component({
  selector: 'app-systemsettingstbl',
  templateUrl: './systemsettingstbl.component.html',
  styleUrls: ['./systemsettingstbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SystemsettingstblComponent implements OnInit, OnDestroy {

  public loading = false;
  recordList = null;
  displayedColumns = ['num','entities', 'key', 'value', 'status', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  public languageId: any;
  lang: any;

  showNoData = false;

  recordTable = null;

  kword: any;

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.recordList);

  applyFilter(e) {

    if(e){
      this.kword = e;
      this.getFilterList(this.pageCount, this.pageSize, e);
    } else {
      this.resetSearch();
    }
  }

  resetSearch() {
    this.kword = '';
    this.getRecordList(this.pageCount, this.pageSize);
  }

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private navservice: NavService,
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
    this.commonservice.readProtected('systemsettings', page, size, '', this.languageId)
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.recordList = data;
        if(this.recordList.list.length > 0){



          this.dataSource.data = this.recordList.list;
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

  getFilterList(page, size, keyword) {

    this.recordList = null;

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.kword = keyword;
      this.loading = true;
      this.commonservice.readProtected('systemsettings', page, size, keyword, this.languageId)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;

          if(this.recordList.list.length > 0){



            this.dataSource.data = this.recordList.list;
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

  paginatorL(page) {

    if(this.kword)
      this.getFilterList(page - 1, this.pageSize, this.kword);
    else
      this.getRecordList(page - 1, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;

    if(this.kword)
      this.getFilterList(page + 1, this.pageSize, this.kword);
    else
      this.getRecordList(page + 1, this.pageSize);
  }

  add() {
    this.router.navigate(['systemsettings/add']);
    this.commonservice.pageModeChange(false);
  }

  updateRow(row) {

    this.router.navigate(['systemsettings/', row]);
    this.commonservice.pageModeChange(true);
  }

  deleteRow(id) {


    this.loading = true;
    this.commonservice.delete(id, 'systemsettings/').subscribe(
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

    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {

    if(this.kword)
      this.getFilterList(this.pageCount, event.value, this.kword);
    else
      this.getRecordList(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

}
