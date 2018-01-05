import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
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
  groups = ['Content Admin', 'FAQ Team', 'Polls Team', 'Monitoring', 'Perhilitan', 'Perikanan'];
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

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, private commonService: CommonService) {
    this.route.params.subscribe( params => this.userId = params.id);

    this.http.get(this.appConfig.urlUserList + '/' + this.userId + '?langId=1').subscribe(data => {
    // this.http.get(this.appConfig.urlUsers + this.userId).subscribe(data => {
        let temp = null;
        // this.userInfo = data;
        temp = data;
        this.userInfo = temp.user;

        console.log(this.userInfo)

        this.pid = this.userInfo.pid;
        this.email = this.userInfo.email;
        this.userTypeId = this.userInfo.userType.userTypeId;
        this.accountStatusId = this.userInfo.accountStatus.accountStatusId;

        console.log(this.userTypeId)
        console.log(this.accountStatusId)
        
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

  ngAfterViewInit() {
  }
  
  checkReqValues() {
    let username = "username";
    let firstname = "firstname";
    let lastname = "lastname";
    // let email = "email";
    let usergroup = "usergroup";
    let userpermission = "userpermission";

    let reqVal:any = [ username, firstname, lastname, usergroup, userpermission ];
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
