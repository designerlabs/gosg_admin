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
  selector: 'app-ministrytbl',
  templateUrl: './ministrytbl.component.html',
  styleUrls: ['./ministrytbl.component.css']
})
export class MinistrytblComponent implements OnInit {
  userID: any;
  getDataT: any;
  refModuleId: any;

  agencyData: Object;
  ministryList = null;
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
  collectModules:any;
  filterTypeVal: any;
  public loading = false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.ministryList);

  applyFilter(val) {   

    console.log(val);
    
    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }
    else{
      this.getMinistryData(this.pageCount, this.pageSize);
    }
  
  }

  constructor(
    private http: HttpClient, 
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
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getMinistryData(this.pageCount, this.pageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getMinistryData(this.pageCount, this.pageSize);
      this.commonservice.getModuleId();
    }
    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = ['no','ministryNameEn', 'ministryNameBm', 'ministryAction'];
    this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get ministry Data 
  getMinistryData(count, size) {
    this.dataUrl = this.appConfig.urlGetMinistry;

    this.loading = true;
    this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
        this.ministryList = data;
        console.log(this.ministryList)
        this.dataSource.data = this.ministryList.list;
        this.seqPageNum = this.ministryList.pageNumber;
        this.seqPageSize = this.ministryList.pageSize;
        this.commonservice.recordTable = this.ministryList;
        this.noNextData = this.ministryList.pageNumber === this.ministryList.totalPages;
          
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        console.log(error);  
        this.loading = false;
        });
  }

  getFilterList(count, size, keyword, filterkeyword) {

    this.dataUrl = this.appConfig.urlGetMinistry+'?keyword='+keyword+'&language='+this.languageId;
    // this.dataUrl = this.appConfig.urlSearchbyMinistry+'?keyword='+keyword +'&page=' + count + '&size=' + size + '&language='+this.languageId;

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {

      this.loading = true;
      this.http.get(this.dataUrl).subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;
          console.log("data");
          console.log(data);
          
          this.dataSource.data = this.recordList.list;
          this.seqPageNum = this.recordList.pageNumber;
          this.seqPageSize = this.recordList.pageSize;
          this.commonservice.recordTable = this.recordList;
          this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

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
    this.getMinistryData(this.pageCount, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getMinistryData(page + 1, this.pageSize);
  }

  pageChange(event, totalPages) {
    this.getMinistryData(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['ministry', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['ministry', row]);
  }
    
  deleteItem(refCode) {
    let txt;
    this.loading = true;

      this.commonservice.delMinistry(refCode).subscribe(
        data => {
            this.commonservice.errorHandling(data, (function(){
            console.log(data)
            txt = "Ministry deleted successfully!";
            this.toastr.success(txt, '');   
            this.getMinistryData(this.pageCount, this.pageSize);
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

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['ministry']);
  }

  back(){
    this.router.navigate(['ministry']);
  }

}
