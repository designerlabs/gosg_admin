import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';

@Component({
  selector: 'app-slidertbl',
  templateUrl: './slidertbl.component.html',
  styleUrls: ['./slidertbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SlidertblComponent implements OnInit {

  selectedItem = [];

  updateForm: FormGroup;
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
  // nameStatus=1;
  keywordVal="";
  recordTable = null;

  public kataKunci: FormControl;
  public nameStatus: FormControl;

  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  publishdt:number;  
  enddt: number;
  publish: FormControl
  endD: FormControl  
  disableSearch = false;
  newPublishD: any;
  newEndD: any;
  valkey = false;

  showNoData = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.sliderList);

  applyFilter(e) {

    this.nameStatus = this.updateForm.get('nameStatus').value;
    let d = this.updateForm.get('publish').value;
    
    if(e){
      this.getFilterListS(this.pageCount, this.sliderPageSize, e, this.nameStatus, d);
    }
    else{
      this.getSlidersData(this.pageCount, this.sliderPageSize);
    }
  }

  resetSearch() {
    this.getSlidersData(this.pageCount, this.sliderPageSize);
    this.updateForm.get('kataKunci').setValue(null); 
    this.valkey = false;
  }

  filterStatus(e){

    this.keywordVal = this.updateForm.get('kataKunci').value;
    let d = this.updateForm.get('publish').value;

    if(this.keywordVal != null){
      this.getFilterListS(this.pageCount, this.sliderPageSize, this.keywordVal, e.value, d);
    }

    else{
      this.getSlidersData(this.pageCount, this.sliderPageSize);
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
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              console.log("Translate");
              this.getSlidersData(this.pageCount, this.sliderPageSize);
              this.commonservice.getModuleId();
              this.selectedItem = [];
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      console.log("languange");
      //this.getSlidersData(this.pageCount, this.sliderPageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {
   
    this.nameStatus = new FormControl();
    this.kataKunci = new FormControl();
    this.publish = new FormControl();
    this.endD = new FormControl ();

    this.updateForm = new FormGroup({   
      
      nameStatus: this.nameStatus,
      kataKunci: this.kataKunci,
      endD: this.endD,
      publish: this.publish
    });
    
    this.updateForm.get('nameStatus').setValue(1); 
    
    this.valkey = false;   
    this.displayedColumns = ['cbox','no','slideTitle', 'sliderDescription', 'slideActiveFlag', 'slideDraft', 'slideAction'];
    this.commonservice.getModuleId();

    console.log("ON INIT");
    this.getSlidersData(this.pageCount, this.sliderPageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get Slider Data 
  getSlidersData(page, size) {

    let generalUrl = ""
    let a = this.updateForm.get('nameStatus').value;

    if(a == 1){
      if(this.newPublishD == undefined || this.newPublishD == null){
        generalUrl = 'slider/creator/state/all';
      }

      else{
        generalUrl = 'slider/creator/state/all/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(a == 2){
      if(this.newPublishD == undefined || this.newPublishD == null){
        generalUrl = 'slider/creator/state/draft';
      }

      else{
        generalUrl = 'slider/creator/state/draft/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(a == 3){
      if(this.newPublishD == undefined || this.newPublishD == null){
        generalUrl = 'slider/creator/state/pending';
      }

      else{
        generalUrl = 'slider/creator/state/pending/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(a == 4){
      if(this.newPublishD == undefined || this.newPublishD == null){
        generalUrl = 'slider/creator/state/approved';
      }

      else{
        generalUrl = 'slider/creator/state/approved/'+this.newPublishD+"/"+this.newEndD;
      }
    }
    
    this.loading = true;
    this.commonservice.readProtected(generalUrl,page, size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
        this.sliderList = data;              

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
        this.loading = false;
      });
  }

  getFilterListS(page, size, keyword, valStatus, dateP) {

    this.sliderList = null;
    let generalUrl = "";

    if(valStatus == 1){
      if(dateP == undefined || this.newPublishD == undefined){
        generalUrl = 'slider/creator/search/state/all';
      }

      else{
        generalUrl = 'slider/creator/search/state/all/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(valStatus == 2){
      if(dateP == undefined || this.newPublishD == undefined){
        generalUrl = 'slider/creator/search/state/draft';
      }

      else{
        generalUrl = 'slider/creator/search/state/draft/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(valStatus == 3){
      if(dateP == undefined || this.newPublishD == undefined){
        generalUrl = 'slider/creator/search/state/pending';
      }

      else{
        generalUrl = 'slider/creator/search/state/pending/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(valStatus == 4){
      if(dateP == undefined || this.newPublishD == undefined){
        generalUrl = 'slider/creator/search/state/approved';
      }

      else{
        generalUrl = 'slider/creator/search/state/approved/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    console.log(generalUrl);
    
    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.valkey = true;
      this.loading = true;
      this.commonservice.readProtected(generalUrl,page, size, keyword).subscribe(
        // this.http.get(this.dataUrl).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
          this.sliderList = data;


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

            this.seqPageNum = this.sliderList.pageNumber;
            this.seqPageSize = this.sliderList.pageSize;
            this.recordTable = this.sliderList;
            this.noNextData = this.sliderList.pageNumber === this.sliderList.totalPages;
          }
            
        }).bind(this));
        this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
          this.loading = false;
      });
    }
  }

  publishEvent(type: string, event: OwlDateTimeInputDirective<Date>) { 
  
    this.events = [];
    this.events.push(`${event.value}`);
    this.publishdt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";    

    if(this.publishdt>this.enddt || this.enddt == undefined || this.enddt == null){
      this.enddt = new Date(this.events[0]).getTime();
      this.updateForm.get('endD').setValue(new Date(this.enddt).toISOString());
      this.enddt = null;
      this.disableSearch = true;
    }    

    else{
      this.disableSearch = false;
    }
  }

  endEvent(type: string, event: OwlDateTimeInputDirective<Date>) { 

    this.events = [];
    this.events.push(`${event.value}`);
    this.enddt = new Date(this.events[0]).getTime();    
    this.dateFormatExample = ""; 

    if(this.publishdt>this.enddt || this.publishdt == undefined || this.publishdt == null){
      this.publishdt = new Date(this.events[0]).getTime();
      this.updateForm.get('publish').setValue(new Date(this.publishdt).toISOString());
      this.publishdt = null;
      this.disableSearch = true;
    }

    else{
      this.disableSearch = false;
    }
  }

  search(){
    let year, month, day;   
    
    let e = '';
    
    if(this.publishdt != undefined){
      this.events = [];
      var d = new Date(this.publishdt); 
      this.events.push(`${d}`);

      year = new Date(this.events[0]).getFullYear();
      month = new Date(this.events[0]).getMonth()+1;
      day = new Date(this.events[0]).getDate();

      this.newPublishD = year+"-"+month+"-"+day;
    }

    if(this.enddt != undefined){
    
      this.events = [];
      var d = new Date(this.enddt); 
      this.events.push(`${d}`);

      year = new Date(this.events[0]).getFullYear();
      month = new Date(this.events[0]).getMonth()+1;
      day = new Date(this.events[0]).getDate();
      
      this.newEndD = year+"-"+month+"-"+day;
    }

    this.nameStatus = this.updateForm.get('nameStatus').value;
    this.keywordVal = this.updateForm.get('kataKunci').value;

    if(this.keywordVal != undefined || this.keywordVal != null){
   
      this.getFilterListS(this.pageCount, this.sliderPageSize, this.keywordVal, this.nameStatus, this.newPublishD);
    }

    else if(this.keywordVal == undefined || this.keywordVal == null){
    
      this.getSlidersData(this.pageCount, this.sliderPageSize);
    }

    console.log("Publish: "+this.publishdt);
    console.log("End: "+this.enddt);
    console.log("NEW Publish: "+this.newPublishD);
    console.log("NEW End: "+this.newEndD);
    console.log(this.updateForm.get('publish').value);
  }

  clearDate() {
    this.newPublishD = undefined;
    this.newEndD = undefined;
    this.publishdt = undefined;
    this.enddt = undefined;
    this.disableSearch = false;
    this.updateForm.get('publish').setValue(null);
    this.updateForm.get('endD').setValue(null);

    //this.getSlidersData(this.pageCount, this.sliderPageSize);
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
    this.commonservice.delete(refcode, 'slider/creator/delete/').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getSlidersData(this.pageCount, this.sliderPageSize);
          this.selectedItem = [];

      }).bind(this)); 
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        this.loading = false;
      });

  }

  deleteAll(){
    let deletedCodes = this.selectedItem.join(',');

    console.log("DELETED REFCODE: ");
    console.log(deletedCodes);
    this.commonservice.delete('', `slider/delete/multiple/${deletedCodes}`).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getSlidersData(this.pageCount, this.sliderPageSize);

      }).bind(this)); 
      this.selectedItem = [];
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        this.selectedItem = [];
        this.loading = false;
      });
  }

  isChecked(event) {
    
    if(event.checked){
      this.selectedItem.push(event.source.value);
    }else{
      let index = this.selectedItem.indexOf(event.source.value);
      this.selectedItem.splice(index, 1);
    }

    return false;
  }

  // changePageMode(isEdit) {
  //   if (isEdit == false) {
  //     this.pageMode = "Add";
  //   } else if (isEdit == true) {
  //     this.pageMode = "Update";
  //   }
  // }

}
