import { Component, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../../service/common.service';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../../../dialogs/dialogs.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-mediafileuploadtbl',
  templateUrl: './mediafileuploadtbl.component.html',
  styleUrls: ['./mediafileuploadtbl.component.css']
})
export class MediafileuploadtblComponent implements OnInit {
  PageCount = 0;
  PageSize = 10;
  mediaList = null;
  mediaPage = null;
  noPrevData = true;
  noNextData = false;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;
  languageId: any;
  displayedColumns = ['no', 'mediaFile', 'catName',  'status', 'action'];
  dataUrl;
  resultData = null;
  dataSource = new MatTableDataSource<object>(this.mediaList);
  showNoData = false;
  public loading = false;

  constructor(private commonservice: CommonService, private router: Router, @Inject(APP_CONFIG) private appConfig: AppConfig, private toastr: ToastrService,private http: HttpClient, private dialogsService: DialogsService, private translate: TranslateService ) { 
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getMediaList(this.PageCount, this.PageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getMediaList(this.PageCount, this.PageSize);
      this.commonservice.getModuleId();
    }

    
  }

  ngOnInit() {
    this.getMediaList(this.PageCount, this.PageSize);
    this.commonservice.getModuleId();
    this.fnLoadCateMediaType();
  }

  fnLoadCateMediaType() {
      this.loading = true;          
    // Get Categories
    this.commonservice.getCategoryData()
      .subscribe(resStateData => {
          this.commonservice.errorHandling(resStateData, (function () {
          this.objCategory = resStateData['list'];
        }).bind(this));
        this.loading = false;
      },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });
  }  

  getMediaList(count, size, dataBy?: string, val?: string) {
    this.loading = true;
    if (dataBy === undefined){
      this.dataUrl = this.appConfig.urlMediaFileUpload + '/?page=' + count + '&size=' + size + '&language=' + this.languageId;
    }else if(dataBy === "byCateId"){
      this.dataUrl = this.appConfig.urlMediaFileUpload +  "/category/id/" + val +'/?page=' + count + '&size=' + size + '&language=' + this.languageId;
    }else if(dataBy === "byFileName"){
      this.dataUrl = this.appConfig.urlMediaFileUpload +  "/file/name/" + val +'/?page=' + count + '&size=' + size + '&language=' + this.languageId;
    }
    
    return this.http.get(this.dataUrl)
       .subscribe(resData => {
        this.commonservice.errorHandling(resData, (function(){
        this.resultData = resData;
          if(this.resultData.list.length > 0){
            this.seqPageNum = this.resultData.pageNumber;
            this.seqPageSize = this.resultData.pageSize;
            this.noNextData = this.resultData.pageNumber === this.resultData.totalPages;
            this.mediaPage = resData;
            if(dataBy === "byFileName"){
            this.mediaList = resData; 
            }else {
              this.mediaList = resData['list']; 
            } 
            this.showNoData = false;
            this.dataSource.data = this.mediaList; 
          }else{
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

  searchByFileName(val){
    debugger;
    this.PageCount = 0;
    this.PageSize = 10;
    this.getMediaList(this.PageCount, this.PageSize, "byFileName", val); 
    
  }

  selCateType(val){
    this.PageCount = 0;
    this.PageSize = 10;
    if(val.value === "0" ){
      this.getMediaList(this.PageCount, this.PageSize);
    } else{
      this.getMediaList(this.PageCount, this.PageSize, "byCateId", val.value); 
    }   
  }

  reset(){
    this.PageCount = 0;
    this.PageSize = 10;
    this.getMediaList(this.PageCount, this.PageSize);
  }


  add(){    
      this.router.navigate(['media/' , 'add']);
  }

  
  paginatorL(page) {
    this.getMediaList(page - 2, this.PageSize);
    this.noPrevData = page <= 3 ? true : false; // page count is zero based so use 3. (page-2 = 0 first page)
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 0 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getMediaList(page , this.PageSize);
  }

  pageChange(event, totalPages) {
    this.getMediaList(this.PageCount, event.value);
    this.PageSize = event.value;
    this.noPrevData = true;
  }
  editGroup(mtId) {
    console.log(mtId);
    this.router.navigate(['media/', mtId]);
  }

  deleteRow(id) {    
       this.commonservice.delMediaFileUpload(id).subscribe(
        data => {
           
        this.commonservice.errorHandling(data, (function(){          
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getMediaList(this.PageCount, this.PageSize);
        }).bind(this)); 
        },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
      });    
  }

  searchByCate(evnt){

  }
}
