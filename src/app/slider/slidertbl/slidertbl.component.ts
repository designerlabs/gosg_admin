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
  selector: 'app-slidertbl',
  templateUrl: './slidertbl.component.html',
  styleUrls: ['./slidertbl.component.css']
})
export class SlidertblComponent implements OnInit {

  sliderData: Object;
  sliderList = null;
  displayedColumns: any;
  displayedColumns2: any;
  sliderPageSize = 10;
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

  recordTable = null;

  showNoData = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.sliderList);

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
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getSlidersData(this.pageCount, this.sliderPageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getSlidersData(this.pageCount, this.sliderPageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = ['no','slideTitle', 'sliderDescription', 'slideActiveFlag', 'slideDraft', 'slideAction'];
    this.commonservice.getModuleId();
    this.getSlidersData(this.pageCount, this.sliderPageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get Slider Data 
  getSlidersData(page, size) {
    
    this.loading = true;
    this.commonservice.readProtected('slider/creator/4',page, size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
        this.sliderList = data;
        console.log(this.sliderList)

        if(this.sliderList.list.length > 0){
          this.dataSource.data = this.sliderList.list;
          this.seqPageNum = this.sliderList.pageNumber;
          this.seqPageSize = this.sliderList.pageSize;
          this.recordTable = this.sliderList;
          this.noNextData = this.sliderList.pageNumber === this.sliderList.totalPages;

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

  paginatorL(page) {
    this.getSlidersData(this.pageCount, this.sliderPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getSlidersData(page + 1, this.sliderPageSize);
  }

  pageChange(event, totalPages) {
    this.getSlidersData(this.pageCount, event.value);
    this.sliderPageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.commonservice.pageModeChange(false);
    this.router.navigate(['slider', "add"]);
  }
  
  updateRow(row) {
    this.commonservice.pageModeChange(true);
    this.router.navigate(['slider', row]);
  }

  deleteItem(refcode) {

    this.loading = true;
      this.commonservice.delete(refcode, 'slider/delete/').subscribe(
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

  // changePageMode(isEdit) {
  //   if (isEdit == false) {
  //     this.pageMode = "Add";
  //   } else if (isEdit == true) {
  //     this.pageMode = "Update";
  //   }
  // }

  back(){
    this.router.navigate(['slider']);
  }

}
