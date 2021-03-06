import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
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
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from './../nav/nav.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  AccStatusData: any;
  date= new Date();

  updateForm: FormGroup;
  userData:any;
  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  lang: any;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  refCode:any;

  // ROW DATA
  userId: any;
  credentialsNonExpired: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  isCitizen: string;
  country: string;
  dateOfBirth: string;
  race: string;
  religion: string;
  isStaff: string;
  gender: string;
  icNo: string;
  passportNo: string;
  address: string;
  registrationDate: string;
  mobilePhoneNo: any;
  userTypeId: any;
  accStatusCode: any;
  accStatusDesc: string;
  accStatusId: string;

  accountStatusSel: FormControl
  public loading = false;

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;

  // tslint:disable-next-line:max-line-length
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private router: Router,
    private translate: TranslateService,
    private validateService: ValidateService,
    private toastr: ToastrService,
    private navservice: NavService,
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

        this.getAccountStatus(this.languageId);
        this.commonservice.getModuleId();
      }

    });
    /* LANGUAGE FUNC */
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    // this.subscriptionContentCreator.unsubscribe();
    // this.subscriptionCategoryC.unsubscribe();
    // this.subscriptionRecordListC.unsubscribe();
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
    } else {
      this.languageId = 1;
    }

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();

    this.getAccountStatus(this.languageId);

    this.accountStatusSel = new FormControl()

    this.updateForm = new FormGroup({
      accountStatusSel: this.accountStatusSel
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

  back(){
    this.router.navigate(['userlist']);
  }

  // get, add, update, delete
  getRow(row) {
    this.loading = true;

    // Get User By Id Service
    return this.commonservice.readProtectedById('usermanagement/', row,this.languageId).subscribe(
      Rdata => {

        this.commonservice.errorHandling(Rdata, (function(){
        this.userData = Rdata['user'];


        // populate data
        this.userId = this.userData.userId;
        this.fullName = this.userData.fullName;
        this.email = this.userData.email;
        this.icNo = this.userData.identificationNo;
        this.passportNo = this.userData.passportNo;
        this.gender = this.userData.gender;
        this.race = this.userData.race;
        this.religion = this.userData.religion;
        this.isStaff = this.userData.isStaff;
        this.isCitizen = this.userData.userType.userType;
        this.dateOfBirth = this.userData.dateOfBirth;

        if(this.userData.country)
          this.country = this.userData.country.countryName;

        this.mobilePhoneNo = this.userData.mobilePhoneNo
        this.registrationDate = this.userData.registrationDate;

        this.accStatusId = this.userData.accountStatus.accountStatusId
        this.accStatusCode = this.userData.accountStatus.accountStatusCode
        this.accStatusDesc = this.userData.accountStatus.accountStatusDescription

        this.updateForm.get('accountStatusSel').setValue(this.accStatusId);
        // this.refCode = dataEn.agencyCode;

        this.checkReqValues();
      }).bind(this));
      this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');

      this.loading = false;
    });

  }

  getAccountStatus(lang) {
    this.loading = true;
    return this.commonservice.readProtected('accountstatus/','','','',lang).subscribe(
        Rdata => {

        this.commonservice.errorHandling(Rdata, (function(){
          this.AccStatusData = Rdata['list'];


        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });
  }

  checkReqValues() {

    let accountStatus = "accountStatusSel";

    let reqVal: any = [accountStatus];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

      //

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  updateAction(formValues: any) {




    this.loading = true;
    // Update User Status Service
    this.http.put(this.appConfig.urlCommon+'usermanagement/status/'+this.userId+'/'+formValues.accountStatusSel+ '?language='+this.languageId, null).subscribe(
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
