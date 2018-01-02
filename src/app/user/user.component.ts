import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { debug } from 'util';
import { ActivatedRoute } from '@angular/router';
// import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit, AfterViewInit {

  date = new Date();
  updateForm: FormGroup

  userData: any;
  userID:any;
  
  username: FormControl
  firstname: FormControl
  lastname: FormControl
  email: FormControl
  staffstatus: FormControl
  active: FormControl
  superuserstatus: FormControl
  datejoined: FormControl
  datelastlogin: FormControl

  constructor(
    private commonService:CommonService, 
    private route:ActivatedRoute,) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userID = params['id'];
      // console.log(params['id']) //log the entire params object
    });
    this.getUserByID(this.userID)
    this.username = new FormControl()
    this.firstname = new FormControl()
    this.lastname = new FormControl()

    this.updateForm = new FormGroup({
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
    });
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
            this.username = this.userData.username;
            this.firstname = this.userData.first_name;
            this.lastname = this.userData.last_name;
            this.email = this.userData.email;
            this.active = this.userData.active;
            this.staffstatus = this.userData.staff_status;
            this.superuserstatus = this.userData.superuser_status;
            this.active = this.userData.active;
            this.datejoined = this.userData.date_joined;
            this.datelastlogin = this.userData.date_last_login;
            // debugger;
          },
          Error => {
            // this.toastr.error(this.translate.instant('Server is down!'), '');            
          });
  }

  updateUser() {

  }
}
