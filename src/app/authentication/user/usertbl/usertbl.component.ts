import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../../dialogs/dialogs.service';

@Component({
  selector: 'app-usertbl',
  templateUrl: './usertbl.component.html',
  styleUrls: ['./usertbl.component.css']
})
export class UsertblComponent implements OnInit {
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.userList);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
              this.getUsersData(this.pageCount, this.pageSize); //internal function
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getUsersData(this.pageCount, this.pageSize);
    }

    /* LANGUAGE FUNC */
    
  }

  
  
  ngOnInit() {
    
    this.isActiveList = false;
    this.isActive = true;
    this.displayedColumns = ['no', 'username', 'icno', 'moduleGroupName', 'activeFlag', 'action'];
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
    this.dataUrl = this.appConfig.urlAdminUserList;
    this.http.get(this.dataUrl+'?page=' + count + '&size=' + size+'&language='+this.languageId).subscribe(data => {
      

      this.userList = data;
        console.log(this.userList)
        this.dataSource.data = this.userList.adminUserListResource;
        this.seqPageNum = this.userList.pageNumber;
        this.seqPageSize = this.userList.pageSize;
        this.commonservice.recordTable = this.userList;
        this.noNextData = this.userList.pageNumber === this.userList.totalPages;

    });
  }



  getSearchData(findby,type,keyword){
    this.isActive = true;
    this.isActiveList = true;
    if(!keyword.value){
      keyword == '-';
    }
    this.http.get(this.appConfig.urlAdminUserFind+'/'+findby+'?'+type+'='+keyword.value).subscribe(data => {
      this.searchUserResult = data['userList'];
    });
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
    this.deleteMail(msgId);
  }

  
  deleteMail(msgId){
    
    this.commonservice.addUserList(msgId).
    subscribe(
      success => {
    //    this.getMails(this.mailPageCount, this.mailPageSize);
        this.toastr.error(this.translate.instant('mailbox.success.deletesuccess'), '');     
      },
      Error => {

       this.toastr.error(this.translate.instant('mailbox.err.failtodelete'), '');            
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

    this.commonservice.addUserList(this.userId).subscribe(
      data => {
          let statusCode = data.statusCode.toLowerCase();
          if(statusCode == 'error'){
            this.toastr.error(data.statusDesc, 'Error');
          }else{
            this.toastr.success('User successfully Add!', 'success');
          }
          
          this.checkReqValues();
          this.closeUser();
          this.getUsersData(this.pageCount, this.pageSize);
      }
    )
  
  }

  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['admin/permission', row]);
  }

  deleteRow(enId) {
    let txt;
    let r = confirm("Are you sure to delete " + enId  + "?");
    if (r == true) {

      this.commonservice.deleteUserList(enId).subscribe(
        data => {
          txt = "Slider deleted successfully!";
          this.toastr.success(txt, '');   
          this.getUsersData(this.pageCount, this.pageSize);
        },
        error => {
          console.log("No Data")
        });

      // this.sliderForm.reset();
    } else {
      txt = "Delete Cancelled!";
      // alert(txt)
    }
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

  back(){
    this.router.navigate(['slider']);
  }

}
