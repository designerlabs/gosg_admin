import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  recordList = null;
  displayedColumns = ['no', 'cityName', 'cityId', 'cityCode', 'stateName', 'stateId'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  dataUrl: any;
  languageId: any;
  public loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.recordList);
  selection = new SelectionModel<Element>(true, []);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
              private commonservice: CommonService, private router: Router,
              private translate: TranslateService,
              private toastr: ToastrService) {

                /* LANGUAGE FUNC */
              translate.onLangChange.subscribe((event: LangChangeEvent) => {
                translate.get('HOME').subscribe((res: any) => {
                  this.commonservice.getAllLanguage().subscribe((data:any) => {
                    let getLang = data.list;
                    let myLangData =  getLang.filter(function(val) {
                      if(val.languageCode == translate.currentLang){
                        this.lang = val.languageCode;
                        this.languageId = val.languageId;
                        this.getRecordList(this.pageCount, this.pageSize);
                        this.commonservice.getModuleId();
                      }
                    }.bind(this));
                  })
                });
              });
              if(!this.languageId){
                this.languageId = localStorage.getItem('langID');
                this.getRecordList(this.pageCount, this.pageSize);
                this.commonservice.getModuleId();
              }

    
  }

  ngOnInit() {
    this.getRecordList(this.pageCount, this.pageSize);
    this.commonservice.getModuleId(); 
  }

  getRecordList(count, size) {

    //this.dataUrl = this.appConfig.urlCommon + '/announcement/category/list';
    this.dataUrl = this.appConfig.urlCityList;
    //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
    //this.http.get(this.dataUrl)
    this.loading = true;
    this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size + "&language=" + this.languageId)
      .subscribe(data => {
        this.commonservice.errorHandling(data, (function(){
        this.recordList = data;

        console.log("data");
        console.log(data);

        this.dataSource.data = this.recordList.cityList;
        this.seqPageNum = this.recordList.pageNumber;
        this.seqPageSize = this.recordList.pageSize;
        this.commonservice.recordTable = this.recordList;
        this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

      }).bind(this)); 
      this.loading = false;
    },
    error => {
      this.loading = false;
    this.toastr.error(JSON.parse(error._body).statusDesc, '');  
    console.log(error);
      });
  }

  paginatorL(page) {
    this.getRecordList(page - 1, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getRecordList(page + 1, this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
    this.getRecordList(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

}
