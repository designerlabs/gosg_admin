import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { debug } from 'util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
// import { ToastrService } from "ngx-toastr";
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit, AfterViewInit {

  date = new Date();
  updateForm: FormGroup
  isLocalAPI: boolean;
  groupsTemp = ['Content Admin', 'FAQ Team', 'Polls Team', 'Monitoring', 'Perhilitan', 'Perikanan'];
  groupsData: any;
  permissions = ['Article', 'Announcements', 'Business Agency', 'Client Charterer', 'Counter', 'Feedback'];

  userData: any;
  complete: boolean;
  users: any[];
  userInfo = null;
  userId = null;
  pid:String;
  email:String;
  userTypeId = null;
  accountStatusId = null;

  username: FormControl
  firstname: FormControl
  lastname: FormControl
  // email: FormControl
  staffstatus: FormControl
  active: FormControl
  superuserstatus: FormControl
  usergroup: FormControl
  userpermission: FormControl
  datejoined: FormControl
  datelastlogin: FormControl

  userList = null;
  displayedColumns = ['fullName', 'email', 'lastName', 'dateOfBirth'];
  userPageSize = 10;
  userPageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.userList);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, private commonService: CommonService) {
    this.route.params.subscribe( params => this.userId = params.id);
    this.getUserList(this.userPageCount, this.userPageSize);

    this.http.get(this.appConfig.urlUserList + '/' + this.userId + '?langId=1').subscribe(data => {
    // this.http.get(this.appConfig.urlUsers + this.userId).subscribe(data => {
      console.log(this.appConfig.urlUsers + this.userId)
        let temp = null;
        // this.userInfo = data;
        temp = data;
        this.userInfo = temp.user;

        console.log(this.userInfo)

        this.pid = this.userInfo.pid;
        this.email = this.userInfo.email;
        this.userTypeId = this.userInfo.userTypeId;
        this.accountStatusId = this.userInfo.accountStatusId;
        this.userTypeId = this.userInfo.userType.userTypeId;
        this.accountStatusId = this.userInfo.accountStatus.accountStatusId;

        // console.log(this.userTypeId)
        // console.log(this.accountStatusId)
        
        // fill in formControl values
        this.updateForm.get('username').setValue(this.userInfo.fullName);
        this.updateForm.get('firstname').setValue(this.userInfo.firstName);
        this.updateForm.get('lastname').setValue(this.userInfo.lastName);
        // this.updateForm.get('email').setValue(this.userInfo.email);
        this.updateForm.get('staffstatus').setValue(this.userInfo.isStaff);
        this.updateForm.get('active').setValue(this.accountStatusId);
        this.checkReqValues();
      },
      error => {
        // console.log("no data")
        // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
   }

  ngOnInit() {
    this.isLocalAPI = true;
    this.getUserList(this.userPageCount, this.userPageSize);
    // this.getGroups()
    // this.route.params.subscribe(params => {
    //   this.userID = params['id'];
    // });

    this.complete = false;

    this.username = new FormControl()
    this.firstname = new FormControl('',
    Validators.required)
    this.lastname = new FormControl()
    // this.email = new FormControl('', Validators.pattern(EMAIL_REGEX))
    this.active = new FormControl()
    this.staffstatus = new FormControl()
    this.superuserstatus = new FormControl()
    this.usergroup = new FormControl()
    this.userpermission = new FormControl()

    this.updateForm = new FormGroup({
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      // email: this.email,
      active: this.active,
      staffstatus: this.staffstatus,
      superuserstatus: this.superuserstatus,
      usergroup: this.usergroup,
      userpermission: this.userpermission,
    });
  }

  navigateBack() {
    history.back();
  }

  getUserList(count, size) { //'?page=1&size=10'
    this.http.get(this.appConfig.urlUserList + '/?page=' + count + '&size=' + size).subscribe(data => {
      this.userList = data;
      this.dataSource.data = this.userList.userList;
      this.commonService.userTable = this.userList;
      this.noNextData = this.userList.pageNumber === this.userList.totalPages;
    });
  }

  getGroups() {
      return this.commonService.getGroupsData()
          .subscribe(
            resGroupData => {
            console.log(resGroupData)
            if(resGroupData == null || resGroupData == 'undefined')
              this.groupsData = this.groupsTemp;
            else
              this.groupsData = resGroupData;
          });
  }

  paginatorL(page) {
    this.getUserList(page - 1, this.userPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getUserList(page + 1, this.userPageSize);
  }

  getRow(row) {
    console.log(row);
    this.commonService.GetUser(row.userId);
  }

  ngAfterViewInit() {
  }

  pageChange(event, totalPages) {
   this.getUserList(this.userPageCount, event.value);
   this.userPageSize = event.value;
   this.noPrevData = true;
 }
  
  checkReqValues() {
    let username = "username";
    let firstname = "firstname";
    let lastname = "lastname";
    // let email = "email";
    let usergroup = "usergroup";
    let userpermission = "userpermission";

    let reqVal:any = [ username, firstname, lastname, usergroup ];
    let nullPointers:any = [];

    for(var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if(elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if(nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
      // this.toastr.error(this.translate.instant('Country error!'), '');
    }

  }

  updateUser(formValues:any) {

    let body = {
      "userId": null,
      "pid": null,
      "userTypeId": null,
      "fullName": null,
      "firstName": null,
      "lastName": null,
      "email": null,
      "dateOfBirth": null,
      "countryId": null,
      "genderId": null,
      "raceId": null,
      "religionId": null,
      "phoneNo": null,
      "accountStatusId": null,
      "isStaff": null,
      // "superuser_status": null,
      // "roles": null,
      // "permissions": null,
      "isMyIdentityVerified": true,
      "isMyIdentityValid": true,
      "agencyForwardUrl": null
      // "date_update": null
    }

    body.pid = this.pid;
    body.userTypeId = this.userTypeId;
    body.accountStatusId = this.accountStatusId;
    body.userId = parseInt(this.userId);
    body.fullName = formValues.username;
    body.firstName = formValues.firstname;
    body.lastName = formValues.lastname;
    body.email = this.email;
    body.accountStatusId = formValues.active;
    body.isStaff = formValues.staffstatus;
    // body.superuser_status = formValues.superuserstatus;
    // body.roles = formValues.usergroup;
    // body.permissions = formValues.userpermission;
    // body.date_update = new Date().getTime();

        // console.log(JSON.stringify(body))
        // console.log(body)

    // Update User Service
    this.commonService.updateUser(body).subscribe(
      data => {
        console.log(JSON.stringify(body))
        console.log(body)
        alert('Update successful!')
        // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
      },
      error => {
        console.log("No Data")
        // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
  }
}
