import { Component, OnInit, ViewChild, Inject, OnDestroy} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../dialogs/dialogs.service';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';
import { DatePipe } from '../../../../node_modules/@angular/common';
import * as moment from 'moment';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';

@Component({
  selector: 'app-actmontbl',
  templateUrl: './actmontbl.component.html',
  styleUrls: ['./actmontbl.component.css']
})
export class ActmontblComponent implements OnInit, OnDestroy {

  filterTypeVal = 0;
  checkStatus: any;
  userId: any;
  lang:any;
  languageId: any;
  isActiveList: boolean;
  isActive: boolean;
  searchUserResult: string[];
  searchAgencyResult: string[];
  closeUserBtn: boolean;
  addUserBtn: boolean;
  animateClass: string;
  showUserInput: boolean;
  showIC: boolean;
  showEmail: boolean;
  startDate: any;
  endDate: any;

  seqPageNum = 0;
  seqPageSize = 0 ;
  userData: Object;
  userList = null;
  agencyActivityList = null;
  displayedColumns: any;
  displayedColumns1: any;
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  dataUrl: any;
  date = new Date();
  pageMode: String;
  isComplete: boolean;
  seqNo = 0;
  // addUserForm: FormGroup;
  // emailFld: FormControl;
  // icFld:FormControl;
  // userType: FormControl;
  isMailContainerShow = 'block';
  public loading = false;
  showNoData = false;

  recordTable = null;
  recordList = null;

  value: String;

  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  startdt: number;
  enddt: number;
  // publish: FormControl
  // endD: FormControl
  disableSearch = false;
  newPublishD: any;
  newEndD: any;

  displayDP: any;
  displayDE: any;

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.userList);
  dataSource1 = new MatTableDataSource<object>(this.agencyActivityList);
  currentTab: any;
  currentAgencyRefNo: any;
  currentUserIDNO: any;
  agcSelect: any;
  usertype: any;
  identNo: any;

  applyFilter(val) {
    
    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }

  }

  resetSearch() {
    this.identNo = null;
    this.filterTypeVal = 0;
    this.value='';
    this.isActiveList = false;
    this.usertype = null;
    this.agcSelect = null;
    this.userList = null;
    this.agencyActivityList = null;
    this.showNoData = false;
  }

  filterType(filterVal) {
    this.filterTypeVal = filterVal.value;

    this.value='';
    this.value=null;
    this.isActiveList = false;
    // this.agcSelect = null;
    this.userList = null;
    // this.agencyActivityList = null;
    this.showNoData = false;

  }

  agcFilterType(filterVal) {
    this.filterTypeVal = filterVal.value;
  }

  onScroll(event, lngId){

    if(event.target.scrollTop >= (event.target.scrollHeight - 250)) {

        this.getFilterList(this.pageCount, this.searchUserResult.length+10, this.value,this.filterTypeVal);
        
      }
  }

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    private navservice: NavService,
    private datePipe:DatePipe
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

        // this.getUsersData(this.pageCount, this.pageSize);
        this.getAgenciesData(this.pageCount, this.pageSize);
        this.getUsersDataByIDNO(0, this.pageCount, this.pageSize);
        this.getAgenciesDataByID(0, this.pageCount, this.pageSize);
        this.commonservice.getModuleId();
      }

    });
    /* LANGUAGE FUNC */

  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngOnInit() {
    this.commonservice.getInitialMessage();

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
    } else {
      this.languageId = 1;
    }
    this.isComplete = false;
    this.isActiveList = false;
    this.isActive = true;
    this.displayedColumns = ['no', 'username', 'idno', 'serviceName', 'submissionRefno', 'status', 'date'];
    this.displayedColumns1 = ['no', 'svcname', 'name', 'status', 'date'];
    this.getAgenciesData(this.pageCount, this.pageSize);
    this.getUsersDataByIDNO(0, this.pageCount, this.pageSize);
    this.getAgenciesDataByID(0, this.pageCount, this.pageSize);
    this.usertype = 0;
    this.filterTypeVal = 0;
    this.commonservice.getModuleId();
    this.checkReqValues();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  publishEvent(type: string, event: OwlDateTimeInputDirective<Date>) {

    this.events = [];
    this.events.push(`${event.value}`);
    this.startdt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";

    if (this.startdt > this.enddt || this.enddt == undefined || this.enddt == null) {
      this.enddt = new Date(this.events[0]).getTime();
      this.enddt = null;
    } else {
    }
    this.startDate = moment(new Date(this.events[0])).format('YYYY-MM-DD');
    // console.log(this.startDate)
    this.checkReqValues();
  }

  endEvent(type: string, event: OwlDateTimeInputDirective<Date>) {

    this.events = [];
    this.events.push(`${event.value}`);
    this.enddt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";

    if (this.startdt > this.enddt || this.startdt == undefined || this.startdt == null) {
      this.startdt = new Date(this.events[0]).getTime();
      this.startdt = null;
    } else {
    }
    this.endDate = moment(new Date(this.events[0])).format('YYYY-MM-DD');
    // console.log(this.endDate)
    this.checkReqValues();
  }

  clearDate() {
    this.startDate = '';
    this.endDate = '';
    this.startdt = undefined;
    this.enddt = undefined;
    this.identNo = null;
    // this.value = '';
    // this.addUserForm.get('publish').setValue(null);
    // this.addUserForm.get('endD').setValue(null);
    this.checkReqValues();
  }

  checkReqValues(){
    if(this.usertype != 0 && this.identNo && this.startDate != '' && this.endDate != '') {
      
        this.isComplete = true;
      
        console.log('a');
    } else {
      this.isComplete = false;
      
      console.log('b');
    }
  }

  tabAction(type) {
    
    // if(type == 0) {
    //   this.agencyActivityList = null;
    // } else if(type == 1) {
    //   this.userList = null;
    // }
    this.currentTab = type;
    this.resetSearch();
  }

  // get User Data
  getUsersData(page, size) {
    this.loading = true;
    this.dataUrl = this.appConfig.urlUserList;
    this.commonservice.readProtected('usermanagement', page, size, '', this.languageId).subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.userList = data;
        if(this.userList.userList.length > 0){
          this.dataSource.data = this.userList.userList;
          this.seqPageNum = this.userList.pageNumber;
          this.seqPageSize = this.userList.pageSize;
          this.recordTable = this.userList;
          this.noNextData = this.userList.pageNumber === this.userList.totalPages;

          this.showNoData = false;
        }else{
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

  // list user mgmt
  getFilterList(page, size, keyword?, filterVal?) {

    this.recordList = null;
    let param='';

    if(filterVal == 2){  // by Email
      this.dataUrl = 'usermanagement';
      param = '&email='+keyword+'&page='+page+'&size='+size

    }

    else if (filterVal == 3){ // by keywords
      this.dataUrl = 'usermanagement';
      param = '&ic='+keyword+'&page='+page+'&size='+size
    }

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {

      this.loading = true;
      this.commonservice.readProtected(this.dataUrl,'','','',this.languageId+param).subscribe(data => {

        this.commonservice.errorHandling(data, (function(){
          this.recordList = data;

          if(this.recordList.userList.length > 0){

            this.searchUserResult = this.recordList.userList;

            // this.dataSource.data = this.recordList.userList;
            // this.seqPageNum = this.recordList.pageNumber;
            // this.seqPageSize = this.recordList.pageSize;
            // this.recordTable = this.recordList;
            // this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

            this.isActiveList = true;
            this.showNoData = false;
          }else{
            this.searchUserResult = [];
            this.dataSource.data = [];
            this.showNoData = true;
            
            this.isActiveList = false;
            // this.seqPageNum = this.recordList.pageNumber;
            // this.seqPageSize = this.recordList.pageSize;
            // this.recordTable = this.recordList;
            // this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
          }

        }).bind(this));
        this.loading = false;
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');

      });
    }
  }
  
  // onClick
  getVal(idno, email){
      if(this.usertype == 2){
        this.value = email;
      } else {
        this.value = idno;
      }
      this.isActiveList = false;
      this.searchUserResult = [''];
      this.identNo = idno;
  }

  search() {
    this.getUsersDataByIDNO(this.identNo, this.pageCount, this.pageSize);
  }

  // get User Data by IDNO
  getUsersDataByIDNO(id?, page?, size?) {
    this.loading = true;
    // this.dataUrl = this.appConfig.urlUserList;
    this.currentUserIDNO = id;
    let idno;

    if(id == 0 || id == '' || id == null) {
        idno = '';
    } else {
      if(this.startDate && this.endDate)
        idno = '&identificationNo='+id+'&startDate='+this.startDate+'&endDate='+this.endDate;
      else
        idno = '&identificationNo='+id;
    }

    this.commonservice.readProtected('monitoring/userservice', page, size, '', this.languageId+idno).subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.userList = data;
        if(this.userList.list.length > 0){

          this.userList.list.forEach(el => {
            el.receivedDate = this.changeDateFormat(el.receivedDate);
          });
          this.dataSource.data = this.userList.list;
          this.seqPageNum = this.userList.pageNumber;
          this.seqPageSize = this.userList.pageSize;
          this.recordTable = this.userList;
          this.noNextData = this.userList.pageNumber === this.userList.totalPages;

          this.showNoData = false;
        }else{
          this.dataSource.data = [];
          this.userList = null;
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

  // get Agencies Data
  getAgenciesData(page, size) {
    this.loading = true;
    // this.dataUrl = this.appConfig.urlUserList;
    this.commonservice.readProtected('monitoring/agencylist', '', '', '', this.languageId).subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.agencyList = data['list'];
        // if(this.agencyList.list.length > 0){

          // this.dataSource.data = this.agencyList.list;
          // this.seqPageNum = this.agencyList.pageNumber;
          // this.seqPageSize = this.agencyList.pageSize;
          // this.recordTable = this.agencyList;
          // this.noNextData = this.agencyList.pageNumber === this.agencyList.totalPages;

        //   this.showNoData = false;
        // }else{
        //   this.dataSource.data = [];
        //   this.showNoData = true;
        // }

      }).bind(this));

      this.loading = false;

    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
      this.loading = false;
    });
  }

  // get Agencies Data By ID
  getAgenciesDataByID(refCode?, page?, size?) {
    this.loading = true;
    let agencyCode;
    this.currentAgencyRefNo = refCode;

    if(refCode == 0)
      agencyCode = '';
    else
      agencyCode = '&agencyCode='+refCode;
    
    this.commonservice.readProtected('monitoring/dservice', page, size, '', this.languageId+agencyCode).subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.agencyDserviceActivity = data;
        this.agencyActivityList = this.agencyDserviceActivity.list;
        if(this.agencyDserviceActivity.list.length > 0){

          this.agencyDserviceActivity.list.forEach(el => {
            el.receivedDate = this.changeDateFormat(el.receivedDate);
          });

          this.dataSource1.data = this.agencyDserviceActivity.list;
          this.seqPageNum = this.agencyDserviceActivity.pageNumber;
          this.seqPageSize = this.agencyDserviceActivity.pageSize;
          this.recordTable = this.agencyDserviceActivity;
          this.noNextData = this.agencyDserviceActivity.pageNumber === this.agencyDserviceActivity.totalPages;

          this.showNoData = false;
        }else{
          this.dataSource1.data = [];
          this.agencyDserviceActivity = null;
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

  changeDateFormat(dateVal) {
    let res;
    res = this.datePipe.transform(new Date(dateVal*1000).getTime(), 'd/M/y h:mm a')

    return res;
  }

  paginatorL(page) {
    if(this.currentTab == 0)
      this.getUsersDataByIDNO(this.currentUserIDNO, this.pageCount, this.pageSize);
    else
      this.getAgenciesDataByID(this.currentAgencyRefNo, this.pageCount, this.pageSize);

    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    if(this.currentTab == 0)
      this.getUsersDataByIDNO(this.currentUserIDNO, page + 1, this.pageSize);
    else
      this.getAgenciesDataByID(this.currentAgencyRefNo, page + 1, this.pageSize);
  }


  pageChange(event, totalPages) {
    // this.getUsersData(this.pageCount, event.value);
    if(this.currentTab == 0)
      this.getUsersDataByIDNO(this.currentUserIDNO, this.pageCount, event.value);
    else
      this.getAgenciesDataByID(this.currentAgencyRefNo, this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

}
