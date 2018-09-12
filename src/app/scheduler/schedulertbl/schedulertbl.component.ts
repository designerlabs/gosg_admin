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
  selector: 'app-schedulertbl',
  templateUrl: './schedulertbl.component.html',
  styleUrls: ['./schedulertbl.component.css']
})
export class SchedulertblComponent implements OnInit {

  schedulerData: Object;
  schedulerList = null;
  displayedColumns: any;
  pageSize = 10;
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
  filterTypeVal: any;
  public loading = false;
  recordTable = null;
  recordList = null;

  showNoData = false

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.schedulerList);

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService
  ) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              // this.getSchedulerData();
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      // this.getSchedulerData();
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();
    this.displayedColumns = ['no','moduleName', 'executionStatus', 'enabled', 'action'];
    this.getSchedulerData()
    this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get agencyType Data
  getSchedulerData() {
    this.loading = true;
    this.commonservice.readProtected('schedule').subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.schedulerList = data['schedules'];

          if(this.schedulerList.length > 0){

            this.dataSource.data = this.schedulerList;
            // this.seqPageNum = this.schedulerList.pageNumber;
            // this.seqPageSize = this.schedulerList.pageSize;
            // this.recordTable = this.schedulerList;
            // this.noNextData = this.schedulerList.pageNumber === this.schedulerList.totalPages;

            this.showNoData = false;
          }

          else{
            this.dataSource.data = [];
            this.showNoData = true;
          }
        }).bind(this));
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  // paginatorL(page) {
  //   this.getSchedulerData();
  //   this.noPrevData = page <= 2 ? true : false;
  //   this.noNextData = false;
  // }

  // paginatorR(page, totalPages) {
  //   this.noPrevData = page >= 1 ? false : true;
  //   let pageInc: any;
  //   pageInc = page + 1;
  //   // this.noNextData = pageInc === totalPages;
  //   this.getSchedulerData(page + 1, this.pageSize);
  // }

  // pageChange(event, totalPages) {
  //   this.getSchedulerData(this.pageCount, event.value);
  //   this.pageSize = event.value;
  //   this.noPrevData = true;
  // }

  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['scheduler', row]);
  }

  changePageMode(isEdit) {
    if (isEdit == false) {
      this.pageMode = "Add";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
  }
}
