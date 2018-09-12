import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../../nav/nav.service';

@Component({
  selector: 'app-countrytbl',
  templateUrl: './countrytbl.component.html',
  styleUrls: ['./countrytbl.component.css']
})
export class CountrytblComponent implements OnInit {

  recordList = null;
  displayedColumns = ['num', 'countryName', 'countryCode', 'dialCode', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;
  isEdit: boolean;

  dataUrl: any;
  languageId: any;
  lang: any;
  public loading = false;

  showNoData = false;

  recordTable = null;

  kword: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.recordList);
  selection = new SelectionModel<Element>(true, []);
  
  private subscriptionLang: ISubscription;
  pageMode: string;

  applyFilter(e) {
    
    if(e){
      this.kword = e;
      this.getFilterList(this.pageCount, this.pageSize, e);
    } else {
      this.resetSearch();
    }
  }

  constructor(private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService, private router: Router,
    private translate: TranslateService,
    private navservice: NavService,
    private toastr: ToastrService) {

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
          // alert(this.languageId + ',' + this.localeVal)
        }
          if(this.navservice.flagLang){
            this.getRecordList(this.pageCount, this.pageSize, this.languageId);
            this.commonservice.getModuleId();
          }
  
      });
    }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.getRecordList(this.pageCount, this.pageSize, this.languageId);
    this.commonservice.getModuleId();
    this.isEdit = false;
    this.changePageMode(this.isEdit);
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  getRecordList(page, size, lng) {

    this.recordList = null;
    // this.dataUrl = this.appConfig.urlCountryList;

    this.loading = true;
    this.commonservice.readPortal('country', page, size, '', lng)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){
          this.recordList = data;

          
          
          if(this.recordList.countryList.length > 0){
            this.dataSource.data = this.recordList.countryList;
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
    // this.dataUrl = this.appConfig.urlCountryList;
    
    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.kword = keyword;
      this.loading = true;

      this.commonservice.readPortal('country', page, size, keyword, this.languageId)
        .subscribe(data => {

          this.commonservice.errorHandling(data, (function(){
            this.recordList = data;

            
            
            if(this.recordList.countryList.length > 0){
            // this.recordList.countryList.push(this.translate.instant('common.msg.notfound'));
            
              this.dataSource.data = this.recordList.countryList;
              this.recordTable = this.recordList;
              this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

              this.showNoData = false;
            }
    
            else{
              this.dataSource.data = []; 
              this.showNoData = true;

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

  
  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['reference/country', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['reference/country', row]);
  }

  deleteItem(refCode) {
    this.loading = true;
      this.commonservice.delete(refCode,'country/delete/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), 'success');
            this.getRecordList(this.pageCount, this.pageSize);
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
      this.pageMode = "Add";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
  }

  resetSearch() {
    this.kword = '';
    this.getRecordList(this.pageCount, this.pageSize, this.languageId);
  }

  paginatorL(page) {
    if(this.kword)
      this.getFilterList(page - 1, this.pageSize, this.kword);
    else
      this.getRecordList(page - 1, this.pageSize, this.languageId);
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
      this.getRecordList(page + 1, this.pageSize, this.languageId);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
      
    if(this.kword)
      this.getFilterList(this.pageCount, event.value, this.kword);
    else
      this.getRecordList(this.pageCount, event.value, this.languageId);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

}
