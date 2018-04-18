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
  selector: 'app-participationpublishertbl',
  templateUrl: './participationpublishertbl.component.html',
  styleUrls: ['./participationpublishertbl.component.css']
})
export class ParticipationpublishertblComponent implements OnInit {

  archiveId= [];

  participantData: Object;
  participantList = null;
  displayedColumns: any;
  displayedColumns2: any;
  participantPageSize = 10;
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

  dataSource = new MatTableDataSource<object>(this.participantList);

  applyFilter(e) {
    
    if(e){
      this.getFilterList(this.pageCount, this.participantPageSize, e, this.nameStatus);
    }
    else{
      this.getParticipantsData(this.pageCount, this.participantPageSize);
    }
  }

  resetSearch() {
    this.getParticipantsData(this.pageCount, this.participantPageSize);
  }

  filterStatus(e){
    console.log(e);
    if(this.keywordVal != ""){
      this.getFilterList(this.pageCount, this.participantPageSize, this.keywordVal, e.value);
    }

    else{
      this.getParticipantsData(this.pageCount, this.participantPageSize);
    }
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
              this.getParticipantsData(this.pageCount, this.participantPageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getParticipantsData(this.pageCount, this.participantPageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = ['no','slideTitle', 'sliderDescription', 'slideActiveFlag', 'slideDraft', 'slideAction'];
    this.commonservice.getModuleId();
    this.getParticipantsData(this.pageCount, this.participantPageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get e-participation Data 
  getParticipantsData(page, size) {

    let generalUrl = ""

    if(this.nameStatus == 1){
      generalUrl = 'e-participation/publisher/state/all';
    }

    else if(this.nameStatus == 2){
      generalUrl = 'e-participation/publisher/state/draft';
    }

    else if(this.nameStatus == 3){
      generalUrl = 'e-participation/publisher/state/pending';
    }

    else if(this.nameStatus == 4){
      generalUrl = 'e-participation/publisher/state/approved';
    }
    
    this.loading = true;
    this.commonservice.readProtected(generalUrl,page, size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
        this.participantList = data;
        console.log(this.participantList);
        console.log(this.participantList.list.length);               

        if(this.participantList.list.length > 0){
          this.dataSource.data = this.participantList.list;
          this.seqPageNum = this.participantList.pageNumber;
          this.seqPageSize = this.participantList.pageSize;
          this.recordTable = this.participantList;
          this.noNextData = this.participantList.pageNumber === this.participantList.totalPages;

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
    this.participantList = null;

    let generalUrl = "";

    if(valStatus == 1){
      generalUrl = 'e-participation/publisher/search/state/all';
    }

    else if(valStatus == 2){
      generalUrl = 'e-participation/publisher/search/state/draft';
    }

    else if(valStatus == 3){
      generalUrl = 'e-participation/publisher/search/state/pending';
    }

    else if(valStatus == 4){
      generalUrl = 'e-participation/publisher/search/state/approved';
    }
    
    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.loading = true;
      this.commonservice.readProtected(generalUrl,page, size, keyword).subscribe(
        // this.http.get(this.dataUrl).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
          this.participantList = data;
          console.log(this.participantList);
          console.log(this.participantList.list.length);               

          if(this.participantList.list.length > 0){
            this.dataSource.data = this.participantList.list;
            this.seqPageNum = this.participantList.pageNumber;
            this.seqPageSize = this.participantList.pageSize;
            this.recordTable = this.participantList;
            this.noNextData = this.participantList.pageNumber === this.participantList.totalPages;

            this.showNoData = false;
          }

          else{
            this.dataSource.data = []; 
            this.showNoData = true;

            this.seqPageNum = this.participantList.pageNumber;
            this.seqPageSize = this.participantList.pageSize;
            this.recordTable = this.participantList;
            this.noNextData = this.participantList.pageNumber === this.participantList.totalPages;
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
    this.getParticipantsData(this.pageCount, this.participantPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getParticipantsData(page + 1, this.participantPageSize);
  }

  pageChange(event, totalPages) {
    this.getParticipantsData(this.pageCount, event.value);
    this.participantPageSize = event.value;
    this.noPrevData = true;
  }

  updateRow(row) {
    this.commonservice.pageModeChange(true);
    this.router.navigate(['publisher/eparticipation', row]);
  }

  deleteItem(refcode) {

    this.loading = true;
    this.commonservice.delete(refcode, 'e-participation/publisher/delete/').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getParticipantsData(this.pageCount, this.participantPageSize);

      }).bind(this)); 
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
        this.loading = false;
      });

  }

  resetAllMethod(){
    this.archiveAll();
  }

  archiveAll(){
    let archiveIds = this.archiveId.join(',');
    this.commonservice.update('', `archive/update/multiple/${archiveIds}`).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getParticipantsData(this.pageCount, this.participantPageSize);

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
    this.commonservice.update('', `archive/update/${refcode}`).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getParticipantsData(this.pageCount, this.participantPageSize);

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
