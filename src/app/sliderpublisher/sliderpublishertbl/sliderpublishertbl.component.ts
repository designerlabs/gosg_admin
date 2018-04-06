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
  selector: 'app-sliderpublishertbl',
  templateUrl: './sliderpublishertbl.component.html',
  styleUrls: ['./sliderpublishertbl.component.css']
})
export class SliderpublishertblComponent implements OnInit {

  sliderData: Object;
  sliderList = null;
  displayedColumns: any;
  displayedColumns2: any;
  sliderPageSize = 10;
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
  public loading = false;
  nameStatus=1;
  keywordVal="";
  recordTable = null;

  showNoData = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.sliderList);

  applyFilter(e) {
    
    if(e){
      this.getFilterList(this.pageCount, this.sliderPageSize, e, this.nameStatus);
    }
    else{
      this.getSlidersData(this.pageCount, this.sliderPageSize);
    }
  }

  resetSearch() {
    this.getSlidersData(this.pageCount, this.sliderPageSize);
  }

  filterStatus(e){
    console.log(e);
    this.getFilterList(this.pageCount, this.sliderPageSize, this.keywordVal, e);
  }
  
  constructor(private http: HttpClient, 
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
              this.getSlidersData(this.pageCount, this.sliderPageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getSlidersData(this.pageCount, this.sliderPageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = ['no','slideTitle', 'sliderDescription', 'slideActiveFlag', 'slideDraft', 'slideAction'];
    this.commonservice.getModuleId();
    this.getSlidersData(this.pageCount, this.sliderPageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get Slider Data 
  getSlidersData(page, size) {
    
    this.loading = true;
    this.commonservice.readProtected('slider/publisher/state/all',page, size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
        this.sliderList = data;
        console.log(this.sliderList);
        console.log(this.sliderList.list.length);               

        if(this.sliderList.list.length > 0){
          this.dataSource.data = this.sliderList.list;
          this.seqPageNum = this.sliderList.pageNumber;
          this.seqPageSize = this.sliderList.pageSize;
          this.recordTable = this.sliderList;
          this.noNextData = this.sliderList.pageNumber === this.sliderList.totalPages;

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
        console.log(error);  
        this.loading = false;
      });
  }

  getFilterList(page, size, keyword, valStatus) {
    this.sliderList = null;

    let generalUrl = "";

    if(this.nameStatus == 1){
      generalUrl = 'slider/publisher/search/state/all';
    }

    else if(this.nameStatus == 2){
      generalUrl = 'slider/publisher/search/state/nonapproved';
    }

    else if(this.nameStatus == 3){
      generalUrl = 'publisher/search/state/approved';
    }
    
    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.loading = true;
      this.commonservice.readProtected(generalUrl,page, size, keyword).subscribe(
        // this.http.get(this.dataUrl).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
          this.sliderList = data;
          console.log(this.sliderList);
          console.log(this.sliderList.list.length);               

          if(this.sliderList.list.length > 0){
            this.dataSource.data = this.sliderList.list;
            this.seqPageNum = this.sliderList.pageNumber;
            this.seqPageSize = this.sliderList.pageSize;
            this.recordTable = this.sliderList;
            this.noNextData = this.sliderList.pageNumber === this.sliderList.totalPages;

            this.showNoData = false;
          }

          else{
            this.dataSource.data = []; 
            this.showNoData = true;

            this.seqPageNum = this.sliderList.pageNumber;
            this.seqPageSize = this.sliderList.pageSize;
            this.recordTable = this.sliderList;
            this.noNextData = this.sliderList.pageNumber === this.sliderList.totalPages;
          }
            
        }).bind(this));
        this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
          console.log(error);  
          this.loading = false;
      });
    }
  }

  paginatorL(page) {
    this.getSlidersData(this.pageCount, this.sliderPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getSlidersData(page + 1, this.sliderPageSize);
  }

  pageChange(event, totalPages) {
    this.getSlidersData(this.pageCount, event.value);
    this.sliderPageSize = event.value;
    this.noPrevData = true;
  }

  
  updateRow(row) {
    this.commonservice.pageModeChange(true);
    this.router.navigate(['publisher/slider', row]);
  }

  deleteItem(refcode) {

    this.loading = true;
    this.commonservice.delete(refcode, 'slider/delete/').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getSlidersData(this.pageCount, this.sliderPageSize);

      }).bind(this)); 
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
        this.loading = false;
      });

  }

}