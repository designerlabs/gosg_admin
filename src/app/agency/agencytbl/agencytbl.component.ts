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
  selector: 'app-agencytbl',
  templateUrl: './agencytbl.component.html',
  styleUrls: ['./agencytbl.component.css']
})
export class AgencytblComponent implements OnInit {

  agencyTypeData: Object;
  agencyTypeList = null;
  displayedColumns: any;
  agencyTypePageSize = 10;
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

  dataSource = new MatTableDataSource<object>(this.agencyTypeList);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
              this.getAgencyTypesData(this.pageCount, this.agencyTypePageSize);
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getAgencyTypesData(this.pageCount, this.agencyTypePageSize);
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = ['no','agencyTypeNameEn', 'agencyTypeNameBm', 'agencyTypeAction'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get agencyType Data 
  getAgencyTypesData(count, size) {

    this.http.get(this.appConfig.urlGetAgency + '/code/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.agencyTypeList = data;
        console.log(this.agencyTypeList)
        this.dataSource.data = this.agencyTypeList.list;
        this.seqPageNum = this.agencyTypeList.pageNumber;
        this.seqPageSize = this.agencyTypeList.pageSize;
        this.commonservice.recordTable = this.agencyTypeList;
        this.noNextData = this.agencyTypeList.pageNumber === this.agencyTypeList.totalPages;
      });
  }

  paginatorL(page) {
    this.getAgencyTypesData(this.pageCount, this.agencyTypePageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getAgencyTypesData(page + 1, this.agencyTypePageSize);
  }

  pageChange(event, totalPages) {
    this.getAgencyTypesData(this.pageCount, event.value);
    this.agencyTypePageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['agency', "add"]);
    // this.viewSeq = 2;
    // this.agencyTypeForm.reset();
    // this.agencyTypeForm.get('active').setValue(true)
    // console.log(this.viewSeq);
    // this.router.navigate(['agency', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['agency', row]);
  }

  deleteItem(refCode) {

    console.log(refCode)
    let txt;

      this.commonservice.delAgency(refCode).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), 'success');
          }).bind(this));  
          this.getAgencyTypesData(this.pageCount, this.agencyTypePageSize);
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
    this.router.navigate(['agency']);
  }

  back(){
    this.router.navigate(['agency']);
  }

}
