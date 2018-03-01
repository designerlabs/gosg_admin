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
  }

  getMediaList(count, size) {
    this.dataUrl = this.appConfig.urlMediaFileUpload + '/?page=' + count + '&size=' + size;
    return this.http.get(this.dataUrl)
       .subscribe(resData => {
        this.commonservice.errorHandling(resData, (function(){
          this.resultData = resData;
        this.seqPageNum = this.resultData.pageNumber;
        this.seqPageSize = this.resultData.pageSize;
        // this.noNextData = this.resultData.pageSize >= this.resultData.totalElements;
        this.mediaPage = resData;
          this.mediaList = resData['list'];  
          this.dataSource.data = this.mediaList; 
        }).bind(this));     
        },
        Error => {
        //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
        console.log('Error in State');
       });
  }

  add(){    
      this.router.navigate(['media/' , 'add']);
  }

  
  paginatorL(page) {
    this.getMediaList(page - 2, this.PageSize);
    this.noPrevData = page <= 0 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 0 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    this.noNextData = pageInc === totalPages;
    this.getMediaList(page, this.PageSize);
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
    let txt;
    // this.commonservice.delMediaFileUpload(id).subscribe(
    //   data => {
    //     txt = "Media Type deleted successfully!";
    //     this.toastr.success(txt, '');   
    //     this.getMediaList(this.PageCount, this.PageSize);
    //   },
    //   error => {
    //     console.log("No Data")
    //   });

    let r = confirm("Are you sure to delete " + id + "?");
    if (r == true) {
       this.commonservice.delMediaFileUpload(id).subscribe(
        data => {
          txt = "Media Type deleted successfully!";
          this.toastr.success(txt, '');   
          this.getMediaList(this.PageCount, this.PageSize);
        },
      error => {
        console.log("No Data")
      });
    } else {
      txt = "Delete Cancelled!";
      // alert(txt)
    }
  }

  searchByCate(evnt){

  }
}
