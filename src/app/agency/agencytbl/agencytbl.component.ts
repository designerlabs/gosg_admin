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
  selector: 'app-agencytbl',
  templateUrl: './agencytbl.component.html',
  styleUrls: ['./agencytbl.component.css']
})
export class AgencytblComponent implements OnInit {

  agencyTypeData: Object;
  agencyTypeList = null;
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

  dataSource = new MatTableDataSource<object>(this.agencyTypeList);

  applyFilter(val) {   

    console.log(val);
    
    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }
    else{
      this.getAgencyTypesData(this.pageCount, this.pageSize);
    }
  
  }

  resetSearch() {
    this.getAgencyTypesData(this.pageCount, this.pageSize);
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
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
              this.getAgencyTypesData(this.pageCount, this.pageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getAgencyTypesData(this.pageCount, this.pageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = ['no','agencyTypeNameEn', 'agencyTypeNameBm', 'agencyTypeAction'];
    this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get agencyType Data 
  getAgencyTypesData(count, size) {
    this.loading = true;
    this.commonservice.readPortal('agency/type/code', count, size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.agencyTypeList = data;

          if(this.agencyTypeList.list.length > 0){
            console.log(this.agencyTypeList)
            this.dataSource.data = this.agencyTypeList.list;
            this.seqPageNum = this.agencyTypeList.pageNumber;
            this.seqPageSize = this.agencyTypeList.pageSize;
            this.recordTable = this.agencyTypeList;
            this.noNextData = this.agencyTypeList.pageNumber === this.agencyTypeList.totalPages;

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

  getFilterList(count, size, keyword, filterkeyword) {


    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.loading = true;
      this.commonservice.readPortal('agency/type/code',count, size, keyword)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;

          if(this.recordList.list.length > 0){
          console.log("data");
          console.log(data);
          
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
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        this.loading = false;
        console.log(error);
      });
    }
  }

  paginatorL(page) {
    this.getAgencyTypesData(this.pageCount, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getAgencyTypesData(page + 1, this.pageSize);
  }

  pageChange(event, totalPages) {
    this.getAgencyTypesData(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['agency', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['agency', row]);
  }

  deleteItem(refCode) {

    console.log(refCode)
    let txt;
      this.loading = true;
      this.commonservice.delete(refCode, 'agency/type/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.getAgencyTypesData(this.pageCount, this.pageSize);
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), 'success');
          }).bind(this));  
          this.loading = false;
          
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
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

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['agency']);
  }

  back(){
    this.router.navigate(['agency']);
  }

}
