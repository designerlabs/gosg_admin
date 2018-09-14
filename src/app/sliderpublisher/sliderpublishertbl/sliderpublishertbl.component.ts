import { Component, OnInit, ViewChild, Inject, OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { DialogResultExampleDialog } from '../../lifeevent/lifeevent.component';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sliderpublishertbl',
  templateUrl: './sliderpublishertbl.component.html',
  styleUrls: ['./sliderpublishertbl.component.css']
})
export class SliderpublishertblComponent implements OnInit, OnDestroy {
  archiveId = [];
  arrStatus = [];
  selectedItem = [];
  flagApprove: boolean;
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
  listHistory = null;

  showNoData = false;

  displayDP: any;
  displayDE: any;

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.sliderList);

  applyFilter(e) {

    this.nameStatus = this.updateForm.get('nameStatus').value;
    let d = this.updateForm.get('publish').value;

    if(e){
      this.getFilterList(this.pageCount, this.sliderPageSize, e, this.nameStatus, d);
    }
    else{
      this.getSlidersData(this.pageCount, this.sliderPageSize);
    }
  }

  resetSearch() {
    this.getSlidersData(this.pageCount, this.sliderPageSize);
    this.updateForm.get('kataKunci').setValue(null);
    this.valkey = false;

    this.keywordVal = '';
  }

  filterStatus(e){
    this.keywordVal = this.updateForm.get('kataKunci').value;
    let d = this.updateForm.get('publish').value;

    if(this.keywordVal != null){
      this.getFilterList(this.pageCount, this.sliderPageSize, this.keywordVal, e.value, d);
    }

    else{
      this.getSlidersData(this.pageCount, this.sliderPageSize);
    }
  }

  constructor(private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private router: Router,
    private navservice: NavService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {

    /* LANGUAGE FUNC */
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.languageId = 1;
        });
      }

      if (myLang == 'ms') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.languageId = 2;
        });
      }
      if (this.navservice.flagLang) {

        this.getSlidersData(this.pageCount, this.sliderPageSize);
        this.archiveId = [];
        this.arrStatus = [];
        this.selectedItem = [];
        this.commonservice.getModuleId();
      }

    });
    /* LANGUAGE FUNC */
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    // this.subscriptionContentCreator.unsubscribe();
    // this.subscriptionCategoryC.unsubscribe();
    // this.subscriptionRecordListC.unsubscribe();
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
    } else {
      this.languageId = 1;
    }

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

    this.displayedColumns = ['cbox','no','slideTitle', 'sliderDescription', 'date','slideActiveFlag', 'slideDraft', 'slideAction'];
    this.commonservice.getModuleId();
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
        generalUrl = 'slider/publisher/state/all';
      }

      else{
        generalUrl = 'slider/publisher/state/all/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(a == 2){
      if(this.newPublishD == undefined || this.newPublishD == null){
        generalUrl = 'slider/publisher/state/draft';
      }

      else{
        generalUrl = 'slider/publisher/state/draft/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(a == 3){
      if(this.newPublishD == undefined || this.newPublishD == null){
        generalUrl = 'slider/publisher/state/pending';
      }

      else{
        generalUrl = 'slider/publisher/state/pending/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(a == 4){
      if(this.newPublishD == undefined || this.newPublishD == null){
        generalUrl = 'slider/publisher/state/approved';
      }

      else{
        generalUrl = 'slider/publisher/state/approved/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    this.loading = true;
    this.commonservice.readProtected(generalUrl,page, size, '', this.languageId).subscribe(
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

  changeDate(dateDP){
    this.displayDP = moment(new Date(dateDP)).format('DD/MM/YYYY');

    return this.displayDP;
  }

  changeDate2(dateDE){
    this.displayDE = moment(new Date(dateDE)).format('DD/MM/YYYY');

    return this.displayDE;
  }

  getFilterList(page, size, keyword, valStatus, dateP) {
    this.sliderList = null;

    let generalUrl = "";

    if(valStatus == 1){
      if(dateP == undefined || this.newPublishD == undefined){
        generalUrl = 'slider/publisher/search/state/all';
      }

      else{
        generalUrl = 'slider/publisher/search/state/all/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(valStatus == 2){
      if(dateP == undefined || this.newPublishD == undefined){
        generalUrl = 'slider/publisher/search/state/draft';
      }

      else{
        generalUrl = 'slider/publisher/search/state/draft/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(valStatus == 3){
      if(dateP == undefined || this.newPublishD == undefined){
        generalUrl = 'slider/publisher/search/state/pending';
      }

      else{
        generalUrl = 'slider/publisher/search/state/pending/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    else if(valStatus == 4){
      if(dateP == undefined || this.newPublishD == undefined){
        generalUrl = 'slider/publisher/search/state/approved';
      }

      else{
        generalUrl = 'slider/publisher/search/state/approved/'+this.newPublishD+"/"+this.newEndD;
      }
    }

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.valkey = true;
      this.loading = true;
      this.commonservice.readProtected(generalUrl,page, size, keyword, this.languageId).subscribe(
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

      this.getFilterList(this.pageCount, this.sliderPageSize, this.keywordVal, this.nameStatus, this.newPublishD);
    }

    else if(this.keywordVal == undefined || this.keywordVal == null){

      this.getSlidersData(this.pageCount, this.sliderPageSize);
    }

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

    this.keywordVal = this.updateForm.get('kataKunci').value;

    if(this.keywordVal){
      this.getFilterList(page - 1, this.sliderPageSize, this.keywordVal, this.nameStatus, this.newPublishD);
    }
    else{
      this.getSlidersData(page - 1, this.sliderPageSize);
    }
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {

    this.keywordVal = this.updateForm.get('kataKunci').value;
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    if(this.keywordVal){
      this.getFilterList(page + 1, this.sliderPageSize, this.keywordVal, this.nameStatus, this.newPublishD);
    }
    else{
      this.getSlidersData(page + 1, this.sliderPageSize);
    }
  }

  pageChange(event, totalPages) {

    this.keywordVal = this.updateForm.get('kataKunci').value;
    if(this.keywordVal){
      this.getFilterList(this.pageCount, event.value, this.keywordVal, this.nameStatus, this.newPublishD);
    }
    else{
      this.getSlidersData(this.pageCount, event.value);
    }
    this.sliderPageSize = event.value;
    this.noPrevData = true;
  }


  updateRow(row) {
    this.commonservice.pageModeChange(true);
    this.router.navigate(['publisher/slider', row]);
  }

  deleteItem(refcode) {

    this.loading = true;
    this.commonservice.delete(refcode, 'slider/publisher/delete/').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getSlidersData(this.pageCount, this.sliderPageSize);
          this.archiveId = [];
          this.selectedItem = [];
          this.arrStatus = [];
          this.flagApprove = false;

      }).bind(this));
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
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
          this.toastr.success(this.translate.instant('common.success.archivesuccess_multi'), '');
          this.getSlidersData(this.pageCount, this.sliderPageSize);

      }).bind(this));
      this.archiveId = [];
      this.selectedItem = [];
      this.arrStatus = [];
      this.flagApprove = false;
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.archiveId = [];
        this.loading = false;
      });

  }

  archiveItem(refcode) {
    this.loading = true;
    this.commonservice.update('', `archive/update/${refcode}`).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.archivesuccess'), '');
          this.getSlidersData(this.pageCount, this.sliderPageSize);
          this.archiveId = [];
          this.selectedItem = [];
          this.arrStatus = [];
          this.flagApprove = false;

      }).bind(this));
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });

  }

  isChecked(event, statusApproved) {

    if(this.archiveId.length == 0){
      this.flagApprove = false;
    }

    if(event.checked){

      this.selectedItem.push(event.source.value);
      this.arrStatus.push(statusApproved);

      if(statusApproved == true){
        this.archiveId.push(event.source.value);
      }

    }else{

      for(let i=0; i<this.archiveId.length; i++){
        //check if item can be archive or not
        if(this.archiveId[i] == event.source.value){
          let index = this.archiveId.indexOf(event.source.value);
          this.archiveId.splice(index, 1);
        }
      }

      let indexDel = this.selectedItem.indexOf(event.source.value);
      this.selectedItem.splice(indexDel, 1);

      let indexStatus = this.arrStatus.indexOf(statusApproved);
      this.arrStatus.splice(indexStatus, 1);
    }

    let countTrue = 0;

    for(let i=0; i<this.arrStatus.length; i++){

      if(this.arrStatus[i] == true){
        countTrue = countTrue + 1;
      }
    }

    //approved record only = archive
    if(countTrue > 0 && countTrue == this.arrStatus.length){
      this.flagApprove = true;
    }

    //record not only approved. cannot be archived
    else if(countTrue > 0 && countTrue != this.arrStatus.length){
      this.flagApprove = false;
    }






    return false;
  }

  deleteAll(){
    let deletedCodes = this.selectedItem.join(',');



    this.commonservice.delete('', `slider/delete/multiple/${deletedCodes}`).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getSlidersData(this.pageCount, this.sliderPageSize);

      }).bind(this));
      this.selectedItem = [];
      this.archiveId = [];
      this.arrStatus = [];
      this.flagApprove = false;
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.selectedItem = [];
        this.loading = false;
      });
  }

  detailHistory(id){


      this.loading = true;
      this.commonservice.readProtected('content/history/'+id, '', '', '', this.languageId).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){

            this.listHistory = data;
            let config = new MatDialogConfig();
            config.width = '800px';
            config.height = '600px';
            let dialogRef = this.dialog.open(DialogResultExampleDialog, config);

            let displayTilte = "";
            if(this.languageId == 1){
              displayTilte = "<h3>HISTORY</h3>"
              displayTilte += '<table class="table"><tr class="tableHistory"><td width="40%">Name</td>';
              displayTilte += '<td width="20%">Activity</td>';
              displayTilte += '<td width="40%">Time</td></tr>';
            }else{
              displayTilte = "<h3>SEJARAH</h3>";
              displayTilte += '<table class="table"><tr class="tableHistory"><td width="40%">Nama</td>';
              displayTilte += '<td width="20%">Aktiviti</td>';
              displayTilte += '<td width="40%">Masa</td></tr>';
            }
            let display: any;

            for(let i=0; i<this.listHistory.list.length; i++){

              let newDate = new Date(this.listHistory.list[i].revisionDate);
              displayTilte += '<tr><td>'+this.listHistory.list[i].user.firstName;
              displayTilte += '<br>('+this.listHistory.list[i].user.email+')</td>';
              displayTilte += '<td>'+this.listHistory.list[i].type+'</td>';
              displayTilte += '<td>'+newDate+'</td></tr>';
            }

            displayTilte += '</table>';

            dialogRef.componentInstance.content =  `${displayTilte}`;
            display = dialogRef.componentInstance.content;

            // if(this.listHistory.list.length > 0){
            //   this.dataSourceH.data = this.listHistory.list;
            // }

          }).bind(this));
          this.loading = false;
        },
        error => {

          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
        });

  }

}
