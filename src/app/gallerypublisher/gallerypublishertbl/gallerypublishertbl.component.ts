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
  selector: 'app-gallerypublishertbl',
  templateUrl: './gallerypublishertbl.component.html',
  styleUrls: ['./gallerypublishertbl.component.css']
})
export class GallerypublishertblComponent implements OnInit {

  archiveId= [];

  galleryData: Object;
  galleryList = null;
  displayedColumns: any;
  displayedColumns2: any;
  galleryPageSize = 10;
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
  
  public loading = false;

  nameStatus=1;
  keywordVal="";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.galleryList);

  applyFilter(e) {
    console.log(e);
    if(e){
      this.getFilterList(this.pageCount, this.galleryPageSize, e, this.nameStatus);
    }
    else{
      this.getGalleryData(this.pageCount, this.galleryPageSize);
    }
  }

  resetSearch() {
    this.getGalleryData(this.pageCount, this.galleryPageSize);
  }

  filterStatus(e){
    console.log(e);
    if(this.keywordVal != ""){
      this.getFilterList(this.pageCount, this.galleryPageSize, this.keywordVal, e.value);
    }

    else{
      this.getGalleryData(this.pageCount, this.galleryPageSize);
    }
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
              this.getGalleryData(this.pageCount, this.galleryPageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getGalleryData(this.pageCount, this.galleryPageSize);
      this.commonservice.getModuleId();
    }
    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = ['no','galleryTitleEn', 'galleryTitleBm', 'galleryActiveFlag', 'galleryDraft', 'galleryAction'];
    this.commonservice.getModuleId();
    this.getGalleryData(this.pageCount, this.galleryPageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get gallery Data 
  getGalleryData(page, size) {
    // console.log(this.appConfig.urlgalleryList + '/?page=' + count + '&size=' + size)

    let generalUrl = ""

    if(this.nameStatus == 1){
      generalUrl = 'gallery/publisher/state/all';
    }

    else if(this.nameStatus == 2){
      generalUrl = 'gallery/publisher/state/draft';
    }

    else if(this.nameStatus == 3){
      generalUrl = 'gallery/publisher/state/pending';
    }

    else if(this.nameStatus == 4){
      generalUrl = 'gallery/publisher/state/approved';
    }
    this.dataUrl = this.appConfig.urlSlides;
    this.loading = true;

    // gallery/39
    // this.http.get(this.dataUrl + '/code/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
    this.commonservice.readProtected(generalUrl,page, size).subscribe(
      data => {
        
          this.commonservice.errorHandling(data, (function(){
          this.galleryList = data;

          if(this.galleryList.list.length > 0){
            
            this.dataSource.data = this.galleryList.list;
            this.seqPageNum = this.galleryList.pageNumber;
            this.seqPageSize = this.galleryList.pageSize;
            this.recordTable = this.galleryList;
            this.noNextData = this.galleryList.pageNumber === this.galleryList.totalPages;

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

  getFilterList(page, size, keyword, valStatus) {

    this.galleryList = null;

    let generalUrl = "";

    if(valStatus == 1){
      generalUrl = 'gallery/publisher/search/state/all';
    }

    else if(valStatus == 2){
      generalUrl = 'gallery/publisher/search/state/draft';
    }

    else if(valStatus == 3){
      generalUrl = 'gallery/publisher/search/state/pending';
    }

    else if(valStatus == 4){
      generalUrl = 'gallery/publisher/search/state/approved';
    }

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {

      this.loading = true;

      this.commonservice.readProtected(generalUrl,page, size, keyword).subscribe(
        data => {
          
            this.commonservice.errorHandling(data, (function(){
            this.galleryList = data;

            if(this.galleryList.list.length > 0){
              
              this.dataSource.data = this.galleryList.list;
              this.seqPageNum = this.galleryList.pageNumber;
              this.seqPageSize = this.galleryList.pageSize;
              this.recordTable = this.galleryList;
              this.noNextData = this.galleryList.pageNumber === this.galleryList.totalPages;

              this.showNoData = false;
            }

            else{
              this.dataSource.data = []; 
              this.showNoData = true;

              this.seqPageNum = this.galleryList.pageNumber;
              this.seqPageSize = this.galleryList.pageSize;
              this.recordTable = this.galleryList;
              this.noNextData = this.galleryList.pageNumber === this.galleryList.totalPages;
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
    this.getGalleryData(this.pageCount, this.galleryPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getGalleryData(page + 1, this.galleryPageSize);
  }

  pageChange(event, totalPages) {
    this.getGalleryData(this.pageCount, event.value);
    this.galleryPageSize = event.value;
    this.noPrevData = true;
  }
  
  updateRow(row) {
    this.isEdit = true;
    this.router.navigate(['publisher/gallery', row]);
  }

  deleteItem(refcode) {

    this.loading = true;      
    this.commonservice.delete(refcode, 'gallery/creator/delete/').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getGalleryData(this.pageCount, this.galleryPageSize);

      }).bind(this)); 
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
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

  resetAllMethod(){
    this.archiveAll();
  }

  archiveAll(){
    let archiveIds = this.archiveId.join(',');
    this.commonservice.create('', `archive/multiple/${archiveIds}`).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getSlidersData(this.pageCount, this.sliderPageSize);

      }).bind(this)); 
      this.archiveId = [];
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
        this.archiveId = [];
        this.loading = false;
      });

  }

  isChecked(event) {
    if(event.checked){
      this.archiveId.push(event.source.value);
    }else{
      let index = this.archiveId.indexOf(event.source.value);
      this.archiveId.splice(index, 1);
    }
    return false;
  }

  archiveItem(refcode) {
    this.loading = true;
    this.commonservice.create('', `archive/${refcode}`).subscribe(
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
