import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { debug } from 'util';
// import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit, AfterViewInit {

  users: any[];
  updateForm: FormGroup
  date = new Date();
  public username: FormControl

  constructor(private commonService:CommonService) { }

  ngOnInit() {
    this.getAllUsers()
    this.username = new FormControl()

    this.updateForm = new FormGroup({
      username: this.username,
    });
  }
  
  ngAfterViewInit() {
  }

  getAllUsers(){
        return this.commonService.getUsersData()
          .subscribe(resUsersData => {
            this.users = resUsersData;
            this.username = this.users[0].username
            debugger;
          },
          Error => {
            // this.toastr.error(this.translate.instant('Server is down!'), '');            
          });
  }

  getUserByID(uid){
        return this.commonService.getUsersDataByID(uid)
          .subscribe(resUsersData => {
            this.users = resUsersData;
            this.username = this.users[0].username
            debugger;
          },
          Error => {
            // this.toastr.error(this.translate.instant('Server is down!'), '');            
          });
  }

  updateUser() {

  }
}
