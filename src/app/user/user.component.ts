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
import { ToastrService } from 'ngx-toastr';
import { ValidateService } from '../common/validate.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit, AfterViewInit {

  AccStatusData: any;
  date= new Date();
  
  updateForm: FormGroup;
  userData:any;
  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  refCode:any;

  // ROW DATA
  userId: any;
  fullname: string;
  email: string;
  isCitizen: string;
  country: string;
  dob: string;
  race: string;
  religion: string;
  isStaff: string;
  gender: string;
  icNo: string;
  passportNo: string;
  address: string;
  regDate: string;
  mobileno: any;
  userTypeCode: any;
  accStatusCode: any;
  accStatusDesc: string;
  accStatusId: string;

  accountStatus: FormControl
  public loading = false;

  // tslint:disable-next-line:max-line-length
  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private translate: TranslateService,
    private validateService: ValidateService,
    private toastr: ToastrService
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
              this.getAccountStatus(this.languageId);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getAccountStatus();
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    
    this.getAccountStatus();

    this.accountStatus = new FormControl()

    this.updateForm = new FormGroup({
      accountStatus: this.accountStatus
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }

    this.checkReqValues();
    
    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  ngAfterViewInit() {

  }

  back(){
    this.router.navigate(['userlist']);
  }

  // get, add, update, delete
  getRow(row) {
    this.loading = true;

    // Get User By Id Service
    return this.http.get(this.appConfig.urlUserList + '/' + row + '?langId=' +this.languageId).subscribe(
      Rdata => {

        this.commonservice.errorHandling(Rdata, (function(){
        this.userData = Rdata['user'];
        console.log(this.userData)
        
        // populate data
        this.userId = this.userData.userId;
        this.fullname = this.userData.fullName;
        this.email = this.userData.email;
        this.icNo = this.userData.identificationNo;
        this.passportNo = this.userData.passportNo;
        this.gender = this.userData.gender;
        this.race = this.userData.race;
        this.religion = this.userData.religion;
        this.isStaff = this.userData.isStaff;
        this.isCitizen = this.userData.userType.userType;
        this.dob = this.userData.dateOfBirth;

        if(this.userData.country)
          this.country = this.userData.country.countryName;

        this.mobileno = this.userData.mobilePhoneNo
        this.regDate = this.userData.registrationDate;

        this.accStatusId = this.userData.accountStatus.accountStatusId
        this.accStatusCode = this.userData.accountStatus.accountStatusCode
        this.accStatusDesc = this.userData.accountStatus.accountStatusDescription
        
        this.updateForm.get('accountStatus').setValue(this.accStatusId);
        // this.refCode = dataEn.agencyCode;

        this.checkReqValues();
      }).bind(this)); 
      this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);
      this.loading = false;
    });
    
  }

  getAccountStatus() {
    this.loading = true;
    return this.http.get(this.appConfig.urlAccountStatus + '/').subscribe(
        Rdata => {

        this.commonservice.errorHandling(Rdata, (function(){
          this.AccStatusData = Rdata['list'];

          console.log(this.AccStatusData);
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        this.loading = false;       
      });
  }

  checkReqValues() {

    let accountStatus = "accountStatus";

    let reqVal: any = [accountStatus];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

      // console.log(nullPointers)

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  updateAction(formValues: any) {

    console.log(this.userId)
    console.log(formValues.accountStatus)
    
    this.loading = true;
    // Update User Status Service
    this.commonservice.updateUserStatus(this.userId, formValues.accountStatus).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.loading = false;       
        this.router.navigate(['userlist']);
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        this.loading = false;       
    });
  }


}
