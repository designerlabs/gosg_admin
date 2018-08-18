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
  isEdit: boolean;
  seqNo = 0;
  addUserForm: FormGroup;
  emailFld: FormControl;
  icFld:FormControl;
  userType: FormControl;
  isMailContainerShow = 'block';
  public loading = false;
  showNoData = false;

  recordTable = null;
  recordList = null;

  value: String;

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

  applyFilter(val) {
    
    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }

  }

  resetSearch() {
    this.value='';
    this.isActiveList = false;
    this.userList = null;
    this.agencyActivityList = null;
  }

  filterType(filterVal) {
    this.filterTypeVal = filterVal.value;

    this.value='';
    this.isActiveList = false;
    this.userList = null;
    this.agencyActivityList = null;

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
        this.commonservice.getModuleId();
      }

    });
    /* LANGUAGE FUNC */

  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngOnInit() {

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
    } else {
      this.languageId = 1;
    }

    this.isActiveList = false;
    this.isActive = true;
    this.displayedColumns = ['no', 'username', 'idno', 'serviceName', 'submissionRefno', 'status', 'date'];
    this.displayedColumns1 = ['no', 'svcname', 'name', 'status', 'date'];
    this.emailFld = new FormControl();
    this.addUserBtn = true;
    this.closeUserBtn = false;
    this.icFld = new FormControl();
    this.userType = new FormControl();
    this.addUserForm = new FormGroup({
      emailFld: this.emailFld,
      icFld:this.icFld,
      userType: this.userType
    });
    // this.getUsersData(this.pageCount, this.pageSize);
    this.getAgenciesData(this.pageCount, this.pageSize);
    this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checkReqValues(){
    this.addUserForm.get('emailFld').setValue('');
    this.addUserForm.get('icFld').setValue('');
    this.isActive = true;
    this.isActiveList = false;
    if(this.userType.value == 1){
      this.showEmail = true;
      this.showIC = false;
    }else{
      this.showEmail = false;
      this.showIC = true;

    }
  }

  tabAction(type) {
    
    // if(type == 0) {
    //   this.agencyActivityList = null;
    // } else if(type == 1) {
    //   this.userList = null;
    // }
    this.currentTab = type;
    // this.resetSearch();
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

  getFilterList(page, size, keyword, filterVal) {

    this.recordList = null;

    if(filterVal == 2){  // by Email
      this.dataUrl = 'usermanagement?email=';
    }

    else if (filterVal == 3){ // by keywords
      this.dataUrl = 'usermanagement?ic=';
    }

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {

      this.loading = true;
      this.commonservice.readProtected(this.dataUrl+keyword+'&page='+page+'&size='+size,'','','',this.languageId).subscribe(data => {

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
  
  getVal(idno){

      this.isActiveList = false;
      this.searchUserResult = [''];
      this.getUsersDataByIDNO(idno, this.pageCount, this.pageSize) 
  }

  // get User Data by IDNO
  getUsersDataByIDNO(id, page, size) {
    this.loading = true;
    // this.dataUrl = this.appConfig.urlUserList;
    let idno = '&identificationNo='+id;

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
      this.getUsersData(this.pageCount, this.pageSize);
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
      this.getUsersData(page + 1, this.pageSize);
    else
      this.getAgenciesDataByID(this.currentAgencyRefNo, page + 1, this.pageSize);
  }


  pageChange(event, totalPages) {
    // this.getUsersData(this.pageCount, event.value);
    if(this.currentTab == 0)
      this.getUsersData(this.pageCount, event.value);
    else
      this.getAgenciesDataByID(this.currentAgencyRefNo, this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  closeUser(){
    this.addUserBtn = true;
    this.closeUserBtn = false;
    this.animateClass = "animated flipOutX";
  }

  addUser() {
    this.addUserBtn = false;
    this.closeUserBtn = true;
    this.showUserInput = true;
    this.animateClass = "animated flipInX";
  }

  addUserDetails(){

    this.loading = true;
    this.commonservice.addUserList(this.userId).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
          this.getUsersData(this.pageCount, this.pageSize);
        }).bind(this));
        this.loading = false;

        this.checkReqValues();
        this.closeUser();

      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });

  }

  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['userlist', row]);
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
    this.router.navigate(['slider']);
  }

  getValue(type, val, usrId){
    event.preventDefault();
    this.userId = usrId;
    this.isActive = false;
    this.isActiveList = false;
    this.searchUserResult = [''];
    if(type == 'email'){
      this.addUserForm.get('emailFld').setValue(val);
    }else{
      this.addUserForm.get('icFld').setValue(val);
    }
  }

}
