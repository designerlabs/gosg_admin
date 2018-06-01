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
  selector: 'app-dservicetbl',
  templateUrl: './dservicetbl.component.html',
  styleUrls: ['./dservicetbl.component.css']
})
export class DServicetblComponent implements OnInit {

  dsData: Object;
  dsList = null;
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
  showNoData = false;

  recordTable = null;
  recordList = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.dsList);

  applyFilter(val) {   

    console.log(val);
    
    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }
    else{
      this.getDigitalServicesData(this.pageCount, this.pageSize);
    }
  
  }

  resetSearch() {
    this.getDigitalServicesData(this.pageCount, this.pageSize);
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
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
              this.getDigitalServicesData(this.pageCount, this.pageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getDigitalServicesData(this.pageCount, this.pageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = ['no','titleEn', 'titleBm', 'enabled', 'dsAction'];
    this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get agencyapp Data 
  getDigitalServicesData(count, size) {
    this.loading = true;
    this.commonservice.readProtected('digitalservice',count, size)
    .subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.dsList = data;
          console.log(this.dsList)
          console.log(this.dsList.list)

          if(this.dsList.list.length > 0){
            this.dataSource.data = this.dsList.list;
            this.seqPageNum = this.dsList.pageNumber;
            this.seqPageSize = this.dsList.pageSize;
            this.recordTable = this.dsList;
            this.noNextData = this.dsList.pageNumber === this.dsList.totalPages;

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
      this.commonservice.readProtected('digitalservice', count, size, keyword)
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
    this.getDigitalServicesData(this.pageCount, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getDigitalServicesData(page + 1, this.pageSize);
  }

  pageChange(event, totalPages) {
    this.getDigitalServicesData(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['dservice', "add"]);
  }

  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['dservice', row]);
  }

  deleteItem(refCode) {
    // alert(refCode)
    this.loading = true;
      this.commonservice.delete(refCode,'digitalservice/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.getDigitalServicesData(this.pageCount, this.pageSize);
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), 'success');
          }).bind(this));  
         this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        });

  }

  changePageMode(isEdit) {
    if (isEdit == false) {
      this.pageMode = "View";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
  }

  // isChecked(e) {
  //   // console.log(val)
  //   if(e.checked){
  //     this.multipleSel.push(e.source.value)
  //   } else{
  //     let index = this.multipleSel.indexOf(e.source.value);
  //     this.multipleSel.splice(index, 1);
  //   }
  //   return false;
  // }
  
  // checkAll(ev) {
  //   this.cb.forEach(x => x.state = ev.target.checked)
  // }

  // isAllChecked() {
  //   console.log('fired');
  //   return this.sizes.every(_ => _.state);
  // }

  // resetAllMethod(){
  //   this.revertAll();
  // }

  // revertAll(){
  //   let archiveIds = this.multipleSel.join(',');
  //   this.commonservice.update('', `archive/revert/multiple/${archiveIds}`).subscribe(
  //     data => {

  //       this.commonservice.errorHandling(data, (function(){
  //         this.toastr.success(this.translate.instant('common.success.updatesuccess'), '');
  //         this.getDigitalServicesData(this.pageCount, this.pageSize);

  //     }).bind(this)); 
  //     this.multipleSel = [];
  //     this.loading = false;
  //     },
  //     error => {
  //       this.toastr.error(JSON.parse(error._body).statusDesc, '');  
  //       console.log(error);
  //       this.multipleSel = [];
  //       this.loading = false;
  //     });

  // }

  // deleteAllMethod(){
  //   this.deleteAll();
  // }

  // deleteAll(){
  //   let archiveIds = this.multipleSel.join(',');
  //   this.commonservice.delete('', `archive/delete/multiple/${archiveIds}`).subscribe(
  //     data => {

  //       this.commonservice.errorHandling(data, (function(){
  //         this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
  //         this.getDigitalServicesData(this.pageCount, this.pageSize);

  //     }).bind(this)); 
  //     this.multipleSel = [];
  //     this.loading = false;
  //     },
  //     error => {
  //       this.toastr.error(JSON.parse(error._body).statusDesc, '');  
  //       console.log(error);
  //       this.multipleSel = [];
  //       this.loading = false;
  //     });

  // }

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['dservice']);
  }

  back(){
    this.router.navigate(['dservice']);
  }

}