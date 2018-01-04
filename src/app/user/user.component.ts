import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { debug } from 'util';
import { ActivatedRoute } from '@angular/router';
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
  userID:any;
  complete: boolean = false;
  
  username: FormControl
  firstname: FormControl
  lastname: FormControl
  email: FormControl
  staffstatus: FormControl
  active: FormControl
  superuserstatus: FormControl
  usergroup: FormControl
  userpermission: FormControl
  datejoined: FormControl
  datelastlogin: FormControl

  constructor(
    private commonService:CommonService, 
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userID = params['id'];
    });

    this.getUserByID(this.userID)
    this.username = new FormControl()
    this.firstname = new FormControl('',
    Validators.required)
    this.lastname = new FormControl()
    this.email = new FormControl('', 
      Validators.pattern(EMAIL_REGEX))
    this.active = new FormControl()
    this.staffstatus = new FormControl()
    this.superuserstatus = new FormControl()
    this.usergroup = new FormControl()
    this.userpermission = new FormControl()

    this.updateForm = new FormGroup({
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      active: this.active,
      staffstatus: this.staffstatus,
      superuserstatus: this.superuserstatus,
      usergroup: this.usergroup,
      userpermission: this.userpermission,
    });

    this.checkReqValues();
  }
  
  ngAfterViewInit() {
  }
  
  // getAllUsers(){
    //       return this.commonService.getUsersData()
    //         .subscribe(resUsersData => {
      // this.users = resUsersData;
      // this.username = this.users[0].username
      // debugger;
      // },
      // Error => {
        // this.toastr.error(this.translate.instant('Server is down!'), '');            
        // });
        // }
        
        getUserByID(uid){
          return this.commonService.getUsersDataByID(uid)
          .subscribe(resUsersData => {
            this.userData = resUsersData;
            console.log(this.userData)
            
            // fill data from service
            this.username = this.userData.username;
            this.firstname = this.userData.firstName;
            this.lastname = this.userData.lastName;
            this.email = this.userData.email;
            this.active = this.userData.accountStatusId;
            this.staffstatus = this.userData.isStaff;
            this.superuserstatus = this.userData.superuser_status;
            this.active = this.userData.active;
            this.datejoined = this.userData.date_joined;
            this.datelastlogin = this.userData.date_last_login;
          
            // update form values
            this.updateForm.get('username').setValue(this.username);
            this.updateForm.get('firstname').setValue(this.firstname);
            this.updateForm.get('lastname').setValue(this.lastname);
            this.updateForm.get('email').setValue(this.email);
            this.updateForm.get('active').setValue(this.active);
            this.updateForm.get('staffstatus').setValue(this.staffstatus);
            this.updateForm.get('superuserstatus').setValue(this.superuserstatus);

            if(this.updateForm.get('usergroup').value !== null && this.updateForm.get('userpermission').value !== null) {
              this.updateForm.get('usergroup').setValue(this.usergroup);
              this.updateForm.get('userpermission').setValue(this.userpermission);
            }

          },
          Error => {
            // this.toastr.error(this.translate.instant('Server is down!'), '');            
          });
        }

  checkReqValues() {
    let username = this.updateForm.get('username').value;
    let firstname = this.updateForm.get('firstname').value;
    let lastname = this.updateForm.get('lastname').value;
    let email = this.updateForm.get('email').value;
    let usergroup = this.updateForm.get('usergroup').value;
    let userpermission = this.updateForm.get('userpermission').value;

    let reqVal:any = [ username, firstname, lastname, email, usergroup, userpermission ];

    // console.log(reqVal)
    // console.log(this.groups)

    // if(username) {
    if(username != null && firstname != null && lastname != null && email != null && usergroup !=null && userpermission != null) {
      this.complete = false;
    } else {
      // this.toastr.error(this.translate.instant('Country error!'), '');
      this.complete = true;
    }

  }
        
  updateUser(formValues:any) {
    console.log(this.userID)
    console.log(formValues)
    // console.log(JSON.stringify(formValues))

    let body = {
      "user_id": null,
      "username": null,
      "first_name": null,
      "last_name": null,
      "email": null,
      "active": null,
      "staff_status": null,
      "superuser_status": null,
      "user_group": null,
      "user_permission": null,
      "date_update": null,
    }

    body.user_id = this.userID;
    body.username = formValues.username;
    body.first_name = formValues.firstname;
    body.last_name = formValues.lastname;
    body.email = formValues.email;
    body.active = formValues.active;
    body.staff_status = formValues.staffstatus;
    body.superuser_status = formValues.superuserstatus;
    body.user_group = formValues.usergroup;
    body.user_permission = formValues.userpermission;
    body.date_update = new Date().getTime();

    console.log(body)
    // console.log(JSON.stringify(body))
// 
  }
}
