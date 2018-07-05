import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-subscriptiontbl',
  templateUrl: './subscriptiontbl.component.html',
  styleUrls: ['./subscriptiontbl.component.css']
})
export class SubscriptiontblComponent implements OnInit {

  subsData: Object;
  subsList = null;
  displayedColumns: any;
  pageSize = 10;
  pageCount = 1;
  totalElems = 0;
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
  showNoData = false;
  multipleSel: any = [];

  recordTable = null;
  recordList = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.subsList);

  applyFilter(val) {



    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }
    else{
      this.getSubsData(this.pageCount, this.pageSize);
    }

  }

  resetSearch() {
    this.getSubsData(this.pageCount, this.pageSize);
  }

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService) {
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getSubsData(this.pageCount, this.pageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getSubsData(this.pageCount, this.pageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */ }

  ngOnInit() {
    this.displayedColumns = ['cb','no','email', 'categoryName', 'subsAction'];
    this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get agencyapp Data
  getSubsData(count, size) {
    this.loading = true;
    this.commonservice.readProtected('subscription',count, size)
    .subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.subsList = data;


          //
          if(this.subsList.subscriptionEntityList.length > 0){
            this.dataSource.data = this.subsList.subscriptionEntityList;
            this.seqPageNum = this.subsList.pageNumber;
            this.seqPageSize = this.subsList.pageSize;
            this.recordTable = this.subsList;
            this.noNextData = this.subsList.pageNumber === this.subsList.totalPages;
            this.totalElems = this.subsList.totalElements;

            if(this.totalElems <= 10) {
              this.noNextData = true;
            } else {
              this.noNextData = false;
            }
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

  getFilterList(count, size, keyword, filterkeyword) {

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.loading = true;
      this.commonservice.readProtected('subscription/search', count, size, keyword)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;


          if(this.recordList.subscriptionEntityList.length > 0){



            this.dataSource.data = this.recordList.subscriptionEntityList;
            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
            this.recordTable = this.recordList;
            this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
            this.totalElems = this.subsList.totalElements;

            this.showNoData = false;

            if(this.totalElems <= 10) {
              this.noNextData = true;
            } else {
              this.noNextData = false;
            }
          } else{
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
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;

      });
    }
  }

  paginatorL(page) {
    this.getSubsData(this.pageCount, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    this.getSubsData(page + 1, this.pageSize);
    // this.noNextData = pageInc === totalPages;
  }

  pageChange(event, totalPages) {
    this.getSubsData(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['subscription', "add"]);
  }

  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['subscription', row]);
  }

  deleteItem(refCode) {
    this.loading = true;
      this.commonservice.delete(refCode,'subscription/delete/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.getSubsData(this.pageCount, this.pageSize);
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), 'success');
          }).bind(this));
         this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
        });

  }

  deleteAll(){
    let archiveIds = this.multipleSel.join(',');
    this.commonservice.delete('', `subscription/delete/multiple/${archiveIds}`).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getSubsData(this.pageCount, this.pageSize);

      }).bind(this));
      this.multipleSel = [];
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');

        this.multipleSel = [];
        this.loading = false;
      });

  }

  changePageMode(isEdit) {
    if (isEdit == false) {
      this.pageMode = "Add";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
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

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['subscription']);
  }

  back(){
    this.router.navigate(['subscription']);
  }

}
