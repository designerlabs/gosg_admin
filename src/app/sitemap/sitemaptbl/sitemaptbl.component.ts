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
  selector: 'app-sitemaptbl',
  templateUrl: './sitemaptbl.component.html',
  styleUrls: ['./sitemaptbl.component.css']
})
export class SitemaptblComponent implements OnInit {

  public loading = false;
  sitemaptblData: Object;
  sitemapList = null;
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
  showNoData = false;
  recordTable = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.sitemapList);

  applyFilter(e) {
    console.log(e);
    if(e){
      this.getFilterList(this.pageCount, this.pageSize, e);
    }
    else{
      this.getSiteMapData(this.pageCount, this.pageSize);
    }
  }

  resetSearch() {
    this.getSiteMapData(this.pageCount, this.pageSize);
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
    private router: Router,
    private dialogsService: DialogsService,
    private translate: TranslateService,
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
              this.getSiteMapData(this.pageCount, this.pageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getSiteMapData(this.pageCount, this.pageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = [
      'no', 
      'nameEn', 
      'nameBm', 
      'url', 
      'action'];
      this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get errMsg Data 
  getSiteMapData(page, size) {
    this.loading = true;   
    this.commonservice.readPortal('sitemap/code', page, size)
      .subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            // console.log(this.dataUrl+ '/code/?page=' + page + '&size=' + size)
            this.sitemapList = data;

            console.log(this.sitemapList.list)
            if(this.sitemapList.list.length > 0){
              this.dataSource.data = this.sitemapList.list;
              this.seqPageNum = this.sitemapList.pageNumber;
              this.seqPageSize = this.sitemapList.pageSize;
              this.recordTable = this.sitemapList;
              this.noNextData = this.sitemapList.pageNumber === this.sitemapList.totalPages;

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
        console.log(error);
      });
  }

  getFilterList(page, size, keyword) {

    this.sitemapList =  null;

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.loading = true;   
      this.commonservice.readPortal('sitemap/search', page, size, keyword)
      .subscribe(
          data => {

            this.commonservice.errorHandling(data, (function(){
              // console.log(this.dataUrl+ '/code/?page=' + page + '&size=' + size)
              this.sitemapList = data;

              if(this.sitemapList.list.length > 0){
                console.log(this.sitemapList)
                this.dataSource.data = this.sitemapList.list;
                this.seqPageNum = this.sitemapList.pageNumber;
                this.seqPageSize = this.sitemapList.pageSize;
                this.recordTable = this.sitemapList;
                this.noNextData = this.sitemapList.pageNumber === this.sitemapList.totalPages;

                this.showNoData = false;
            }

            else{
              this.dataSource.data = []; 
              this.showNoData = true;
              this.seqPageNum = this.sitemapList.pageNumber;
              this.seqPageSize = this.sitemapList.pageSize;
              this.recordTable = this.sitemapList;
              this.noNextData = this.sitemapList.pageNumber === this.sitemapList.totalPages;
            }

            }).bind(this)); 
            this.loading = false;          
          },
        error => {

          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
          console.log(error);
        });
    }
  }

  paginatorL(page) {
    this.getSiteMapData(this.pageCount, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getSiteMapData(page + 1, this.pageSize);
  }

  pageChange(event, totalPages) {
    this.getSiteMapData(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['sitemap', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    this.router.navigate(['sitemap', row]);
  }

  deleteItem(refCode) {

    console.log(refCode)

    this.loading = true;   
    this.commonservice.delete(refCode,'sitemap/').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');  
          this.getSiteMapData(this.pageCount, this.pageSize);
        }).bind(this)); 
        this.loading = false;          
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        console.log(error);
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
    this.router.navigate(['sitemap']);
  }

}
