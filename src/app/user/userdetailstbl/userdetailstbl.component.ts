import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../dialogs/dialogs.service';

@Component({
  selector: 'app-userdetailstbl',
  templateUrl: './userdetailstbl.component.html',
  styleUrls: ['./userdetailstbl.component.css']
})
export class UserdetailstblComponent implements OnInit {

  filterTypeVal: any;
  checkStatus: any;
  userId: any;
  lang:any;
  languageId: any;
  isActiveList: boolean;
  isActive: boolean;
  searchUserResult: Object;
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
  addUserForm: FormGroup;
  emailFld: FormControl;
  icFld:FormControl;
  userType: FormControl;
  isMailContainerShow = 'block';
  public loading = false;
  showNoData = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.userList);

  applyFilter(val) {   

    if(val){
      this.getFilterList(this.pageCount, this.pageSize, val, this.filterTypeVal);
    }
    else{
      this.getUsersData(this.pageCount, this.pageSize);
    }
  
  }

  resetSearch() {
    this.getUsersData(this.pageCount, this.pageSize);
  }
  
  filterType(filterVal) {
    
    this.filterTypeVal = filterVal.value; 
    
    // keyword = ''
    
    if(this.filterTypeVal == 1){
      this.getUsersData(this.pageCount, this.pageSize);
    }
 
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private dialogsService: DialogsService,
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
              this.commonservice.getModuleId();
              this.getUsersData(this.pageCount, this.pageSize); //internal function
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getUsersData(this.pageCount, this.pageSize);
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
    
  }
  
  ngOnInit() {
    
    this.isActiveList = false;
    this.isActive = true;
    this.displayedColumns = ['no', 'username', 'email', 'activeFlag', 'action'];
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

  // get User Data 
  getUsersData(count, size) {
    this.loading = true;
    this.dataUrl = this.appConfig.urlUserList;
    this.http.get(this.dataUrl+'?page=' + count + '&size=' + size+'&language='+this.languageId).subscribe(data => {
      
      this.commonservice.errorHandling(data, (function(){
        
        this.userList = data;
        if(this.userList.userList.length > 0){
          console.log(this.userList)
          this.dataSource.data = this.userList.userList;
          this.seqPageNum = this.userList.pageNumber;
          this.seqPageSize = this.userList.pageSize;
          this.commonservice.recordTable = this.userList;
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

  getFilterList(count, size, keyword, filterVal) {

    if(filterVal == 2){  // by Email
      this.dataUrl = this.appConfig.urlUserList + '?email='+ keyword + '&language='+this.languageId;
    }

    else if (filterVal == 3){ // by keywords
      this.dataUrl = this.appConfig.urlUserList + '/ic='+ keyword + '&language='+this.languageId;
    }

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      
      this.loading = true;
      this.http.get(this.dataUrl).subscribe(data => {

        this.commonservice.errorHandling(data, (function(){
          this.recordList = data;
          console.log(this.recordList.userList.length)

          if(this.recordList.userList.length > 0){

            console.log("data");
            console.log(data);
            
            this.dataSource.data = this.recordList.userList;
            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
            this.commonservice.recordTable = this.recordList;
            this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
            
            this.showNoData = false;
          }else{
            this.dataSource.data = []; 
            this.showNoData = true;
          }  

        }).bind(this)); 
        this.loading = false;
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
      });
    }
  }

  paginatorL(page) {
    this.getUsersData(this.pageCount, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getUsersData(page + 1, this.pageSize);
  }


  pageChange(event, totalPages) {
    this.getUsersData(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  resetMethod(event, msgId) {
    debugger;
    this.isMailContainerShow = 'none';
    this.deleteUser(msgId);
  }

  
  deleteUser(msgId){
    this.loading = true;
    this.commonservice.deleteUserList(msgId).subscribe(
      data => {
        
        this.commonservice.errorHandling(data, (function(){
        
          this.getUsersData(this.pageCount, this.pageSize);
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
  
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        this.loading = false;       
      });
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
