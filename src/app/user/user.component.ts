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

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit, AfterViewInit {

  users: any[];
  updateForm: FormGroup;
  date = new Date();
  userInfo = null;
  public username: FormControl;
  userId = null;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, private commonService: CommonService) {
    this.route.params.subscribe( params => this.userId = params.id);

    this.http.get(this.appConfig.urlUserList + '/' + this.userId + '?langId=1').subscribe(data => {
      let temp = null;
      temp = data;
      this.userInfo = temp.user;
    });
   }

  ngOnInit() {
    // this.getAllUsers();
    this.username = new FormControl();
    this.updateForm = new FormGroup({
      username: this.username,
    });
  }

  ngAfterViewInit() {
  }

  getAllUsers() {
        return this.commonService.getUsersData()
          .subscribe(resUsersData => {
            this.users = resUsersData;
            this.username = this.users[0].username;
            // debugger;
          },
          Error => {
            // this.toastr.error(this.translate.instant('Server is down!'), '');
          });
  }

  getUserByID(uid) {
        return this.commonService.getUsersDataByID(uid)
          .subscribe(resUsersData => {
            this.users = resUsersData;
            this.username = this.users[0].username;
          },
          Error => {
            // this.toastr.error(this.translate.instant('Server is down!'), '');
          });
  }

  updateUser() {

  }
}
