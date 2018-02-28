import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-agencyapptbl',
  templateUrl: './agencyapptbl.component.html',
  styleUrls: ['./agencyapptbl.component.css']
})
export class AgencyapptblComponent implements OnInit {

  agencyAppData: Object;
  agencyAppList = null;
  displayedColumns: any;
  agencyAppPageSize = 10;
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.agencyAppList);

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
              this.getAgencyAppData(this.pageCount, this.agencyAppPageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getAgencyAppData(this.pageCount, this.agencyAppPageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = ['no','agencyAppNameEn', 'agencyAppNameBm', 'agencyAppAction'];
    this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get agencyapp Data 
  getAgencyAppData(count, size) {

    this.http.get(this.appConfig.urlGetAgencyApp + '/code/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.agencyAppList = data;
        console.log(this.agencyAppList)
        this.dataSource.data = this.agencyAppList.list;
        this.seqPageNum = this.agencyAppList.pageNumber;
        this.seqPageSize = this.agencyAppList.pageSize;
        this.commonservice.recordTable = this.agencyAppList;
        this.noNextData = this.agencyAppList.pageNumber === this.agencyAppList.totalPages;
      });
  }

  paginatorL(page) {
    this.getAgencyAppData(this.pageCount, this.agencyAppPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getAgencyAppData(page + 1, this.agencyAppPageSize);
  }

  pageChange(event, totalPages) {
    this.getAgencyAppData(this.pageCount, event.value);
    this.agencyAppPageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['agencyapp', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['agencyapp', row]);
  }

  deleteItem(refCode) {

      this.commonservice.delAgencyApp(refCode).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), 'success');
          }).bind(this));  
          this.getAgencyAppData(this.pageCount, this.agencyAppPageSize);
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
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
    this.router.navigate(['agencyapp']);
  }

  back(){
    this.router.navigate(['agencyapp']);
  }

}
