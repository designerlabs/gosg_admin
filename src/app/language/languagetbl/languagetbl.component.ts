import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../dialogs/dialogs.service';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';

@Component({
  selector: 'app-languagetbl',
  templateUrl: './languagetbl.component.html',
  styleUrls: ['./languagetbl.component.css']
})
export class LanguagetblComponent implements OnInit, OnDestroy {

  languageData: Object;
  languageList = null;
  displayedColumns: any;
  languagePageSize = 10;
  languagePageCount = 1;
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
  languageId:any;
  lang:any;
  public loading = false;

  recordTable = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.languageList);
  
  private subscriptionLang: ISubscription;

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
        // alert(this.languageId + ',' + this.localeVal)
      }
        if(this.navservice.flagLang){
          this.getlanguagesData();
          this.commonservice.getModuleId();
        }

    });
    /* LANGUAGE FUNC */  
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.displayedColumns = ['no','languageCode', 'languageName', 'languageDescription', 'isDefault', 'languageAction'];
    this.getlanguagesData();
    this.commonservice.getModuleId();    
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get language Data 
  getlanguagesData() {
    
    this.loading = true;

    // this.http.get(this.appConfig.urlGetLanguage + '/all?language='+this.languageId).subscribe(
    this.commonservice.readPortal('language/all', '', '', '', this.languageId).subscribe(
  
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.languageList = data;
          
          this.dataSource.data = this.languageList.list;
          this.seqPageNum = 1;
          this.seqPageSize = 10;
          this.recordTable = this.languageList;
          this.noNextData = this.languageList.pageNumber === this.languageList.totalPages;
          
        }).bind(this));
        this.loading = false;
    },
    error => {

      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      
      this.loading = false;
      });
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['language', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    this.router.navigate(['language', row]);
  }

  // deleteRow(langId) {
  //   this.loading = true;
  //   this.commonservice.delLanguage(langId).subscribe(
  //     data => {

  //       this.commonservice.errorHandling(data, (function(){

  //         this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');     
  //         this.getlanguagesData()
  //         this.loading = false;
  //     }).bind(this)); 
  //     this.loading = false;
  //   },
  //   error => {

  //     this.toastr.error(JSON.parse(error._body).statusDesc, '');   
  //     
  //     this.loading = false;
  //   });
  // }

  changePageMode(isEdit) {
    if (isEdit == false) {
      this.pageMode = "Add";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
  }

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['language']);
  }

  back(){
    this.router.navigate(['language']);
  }

}
