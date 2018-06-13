import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
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
  selector: 'app-colortbl',
  templateUrl: './colortbl.component.html',
  styleUrls: ['./colortbl.component.css']
})
export class ColortblComponent implements OnInit, OnDestroy {

  translateLoader = false;
  colorData: Object;
  colorList = null;
  displayedColumns: any;
  colorPageSize = 10;
  colorPageCount = 1;
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
  seqPageSize = 0;
  lang:any;
  languageId: any;
  public loading = false;
  private subscriptionLang: ISubscription;
  private subscription: ISubscription;
  
  recordTable =  null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.colorList);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService) {

    let currUrl = this.router.url.split('/')[1];
    /* LANGUAGE FUNC */
    
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {        
        
        console.log(currUrl);
        this.getcolorData(this.pageCount, this.colorPageSize);
        this.commonservice.getModuleId();
          //this.translateLoader = false;
        

        // this.loading = true;
        // this.commonservice.readPortal('language/all').subscribe((data:any) => {
        //   let getLang = data.list;
        //   let myLangData =  getLang.filter(function(val) {
        //     if(val.languageCode == translate.currentLang){
        //       this.lang = val.languageCode;
        //       this.languageId = val.languageId;
        //       this.getcolorData(this.pageCount, this.colorPageSize);
        //       this.commonservice.getModuleId();
        //     }
        //   }.bind(this));
        //   this.loading = false;
        // }, err => {
        //   this.loading = false;
        // })
      });
    });
    
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      // this.getcolorData(this.pageCount, this.colorPageSize);
      // this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */ 
  }

  ngOnDestroy(): void {
    this.subscriptionLang.unsubscribe();
    //this.subscription.unsubscribe();
  }

  ngOnInit() {

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // this.sharedService.errorHandling(event, (function(){
        const myLang = this.translate.currentLang;
        if (myLang === 'en') {
           this.lang = 'en';
           this.languageId = 1;
           //this.getcolorData(this.pageCount, this.colorPageSize);
           console.log('lang is ENGLISH');
           
        }
        if (myLang === 'ms') {
          this.lang = 'ms';
          this.languageId = 2;
          //this.getcolorData(this.pageCount, this.colorPageSize);
          console.log('lang is MALAY');
        }
        console.log("Translate");
        this.getcolorData(this.pageCount, this.colorPageSize);
      // }).bind(this));
    });
    this.displayedColumns = ['no','colorName', 'colorCode', 'colorActiveStatus', 'colorDefaultFlag', 'colorAction'];
    console.log("AFTER Trans");
    this.getcolorData(this.pageCount, this.colorPageSize);
    this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get color Data
  getcolorData(count, size) {
    this.loading = true;
    this.commonservice.readPortal('color',count,size).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.colorList = data;
          console.log(this.colorList)
          this.dataSource.data = this.colorList['list'];
          this.seqPageNum = this.colorList.pageNumber;
          this.seqPageSize = this.colorList.pageSize;
          this.recordTable = this.colorList;
          this.noNextData = this.colorList.pageNumber === this.colorList.totalPages;
        }).bind(this));
        this.loading = false;
      }, err => {
        this.loading = false;
      });

  }

  paginatorL(page) {
    this.getcolorData(this.pageCount, this.colorPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    this.getcolorData(page + 1, this.colorPageSize);
  }

  pageChange(event, totalPages) {
    this.getcolorData(this.pageCount, event.value);
    this.colorPageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['color', "add"]);
  }

  updateRow(row) {
    this.isEdit = true;
    this.router.navigate(['color', row]);
  }

  deleteItem(colorId) {
      this.loading = true;
      this.commonservice.delete(colorId,'color/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), 'success');
            this.getcolorData(this.pageCount, this.colorPageSize);
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

  back(){
    this.router.navigate(['color']);
  }

}
