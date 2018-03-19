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
  objCategory: any[];
  PageCount = 1;
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
  moduleName;
  resultData = null;
  dataSource = new MatTableDataSource<object>(this.mediaList);
  showNoData = false;
  fileName:string;
  cateSelect;
  public loading = false;

  constructor(private commonservice: CommonService, private router: Router, @Inject(APP_CONFIG) private appConfig: AppConfig, private toastr: ToastrService,private http: HttpClient, private dialogsService: DialogsService, private translate: TranslateService ) { 
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
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
    // if(this.firstTimeLoad){
    //   this.firstTimeLoad = false;
    //   let objCate: Object;            
    //   this.objCategory = [];
    //   for (let reqData of rdata) {
    //     objCate = new Object;
    //     objCate = {
    //       categoryName:reqData.list[0].mediaCategories[0].categoryName,
    //       categoryId:reqData.list[0].mediaCategories[0].categoryId
    //     };
    //     let duplicateData = this.objCategory.filter(fData=>fData.categoryId === reqData.list[0].mediaCategories[0].categoryId);
    //     if(duplicateData.length === 0){
    //       this.objCategory.push(objCate);
    //     } 
    //   }                 
    // }
   
    
      this.loading = true;          
    // Get Categories
    let dUrl = this.appConfig.urlMediaFileUpload + '?page=0&size=999999&language=' + this.languageId;
    // this.http.get(dUrl)
    this.commonservice.readProtected('media','1','99999999')
      .subscribe(resStateData => {
          this.commonservice.errorHandling(resStateData, (function () {
            let objCate: Object;            
            this.objCategory = [];
            for (let reqData of resStateData['list']) {
              if(reqData.list[0].mediaCategories.length > 0){              
                objCate = new Object;
                let duplicateData;
                if(this.languageId.toString() === "1"){
                  objCate = {
                    categoryName:reqData.list[0].mediaCategories[0].categoryName,
                    categoryId:reqData.list[0].mediaCategories[0].categoryId
                  };
                  duplicateData = this.objCategory.filter(fData=>fData.categoryId === reqData.list[0].mediaCategories[0].categoryId);
                }else{
                  objCate = {
                    categoryName:reqData.list[1].mediaCategories[0].categoryName,
                    categoryId:reqData.list[1].mediaCategories[0].categoryId
                  };
                  duplicateData = this.objCategory.filter(fData=>fData.categoryId === reqData.list[1].mediaCategories[0].categoryId);
                } 
                if(duplicateData.length === 0){
                  this.objCategory.push(objCate);
                } 
              }
            }              
        }).bind(this));
        this.loading = false;
      },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });

  }  
  // readProtected(moduleName, page?, size?, keyword?): Observable<any[]> {
  getMediaList(count, size, dataBy?: string, val?: string) {
    this.loading = true;
    if (dataBy === undefined){
      // this.moduleName = this.appConfig.urlMediaFileUpload + '?page=' + count + '&size=' + size + '&language=' + this.languageId;
      this.moduleName = 'media';
    }else if(dataBy === "byCateId"){
      // this.moduleName = this.appConfig.urlMediaFileUpload +  "/category/id/" + val +'?page=' + count + '&size=' + size + '&language=' + this.languageId;
      this.moduleName = 'media/category/id/'+ val;
    }else if(dataBy === "byFileName"){
      // this.moduleName = this.appConfig.urlMediaFileUpload +  "/file/name/" + val +'?page=' + count + '&size=' + size + '&language=' + this.languageId;
      this.moduleName = 'media/file/name/'+ val;
    }
    
    // return this.http.get(this.dataUrl)
    this.commonservice.readProtected(this.moduleName, count, size)
       .subscribe(resData => {
        this.commonservice.errorHandling(resData, (function(){
        this.resultData = resData;
        // this.mediaPage = resData;
          if(this.resultData.list.length > 0){
            this.seqPageNum = this.resultData.pageNumber;
            this.seqPageSize = this.resultData.pageSize;
            this.noNextData = this.resultData.pageNumber === this.resultData.totalPages;
            this.mediaPage = resData;
            // if(dataBy === "byFileName"){
            // this.mediaList = resData; 
            // }else {
              this.mediaList = resData['list']; 
            // } 
            this.showNoData = false;
            this.dataSource.data = this.mediaList; 
          }else{
            this.dataSource.data = []; 
            this.showNoData = true;
            this.seqPageNum = this.resultData.pageNumber;
            this.seqPageSize = this.resultData.pageSize;
            this.noNextData = this.resultData.pageNumber === this.resultData.totalPages;
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
    this.PageCount = 1;
    this.PageSize = 10; 
    this.cateSelect = 0;   //Reset Category search
    if(val.length>0){
      this.getMediaList(this.PageCount, this.PageSize, "byFileName", val); 
    }        
  }

  selCateType(val){
    this.PageCount = 1;
    this.PageSize = 10;
    this.fileName = ""; // Reset File name Search
    if(val.value === "0" ){
      this.getMediaList(this.PageCount, this.PageSize);
    } else{
      this.getMediaList(this.PageCount, this.PageSize, "byCateId", val.value); 
    }   
  }

  reset(){
    this.PageCount = 1;
    this.PageSize = 10;
    this.fileName = "";
    this.cateSelect = 0;
    this.getMediaList(this.PageCount, this.PageSize);
  }

  add(){    
      this.router.navigate(['media/upload' , 'add']);
  }
  
  paginatorL(page) {
    this.getMediaList(page - 1, this.PageSize);
    this.noPrevData = page <= 2 ? true : false; 
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getMediaList(pageInc , this.PageSize);
  }

  pageChange(event, totalPages) {
    this.getMediaList(this.PageCount, event.value);
    this.PageSize = event.value;
    this.noPrevData = true;
  }
  editGroup(mtId) {
    console.log(mtId);
    this.router.navigate(['media/upload', mtId]);
  }

  deleteRow(id) {    
      //  this.commonservice.delMediaFileUpload(id)
      this.commonservice.delete(id,'media/id/')
       .subscribe(data => {           
        this.commonservice.errorHandling(data, (function(){          
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.reset()
          // this.getMediaList(this.PageCount, this.PageSize);
        }).bind(this)); 
        },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
      });    
  }
}
