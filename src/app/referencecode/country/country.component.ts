import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';
import { DialogsService } from '../../dialogs/dialogs.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {

  isActive: boolean;
  countryData: Object;
  dataUrl: any;
  date = new Date();
  updateForm: FormGroup
  isEdit: boolean;
  complete: boolean;
  pageMode: String;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  lang: any;
  countryId: any;
  
  countryCode: FormControl
  countryDialCode: FormControl
  countryName: FormControl

  public loading = false;
  resetMsg = this.resetMsg;
  
  private subscriptionLang: ISubscription;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private router: Router,
    private navservice: NavService,
    private toastr: ToastrService
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
        // alert(this.languageId + ',' + this.localeVal)
      }
        if(this.navservice.flagLang){
          this.commonservice.getModuleId();
        }

    });

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    let refCode = this.router.url.split('/')[3];
    this.commonservice.getModuleId();

    this.countryName = new FormControl()
    this.countryCode = new FormControl()
    this.countryDialCode = new FormControl()

    this.updateForm = new FormGroup({
      countryName: this.countryName,
      countryCode: this.countryCode,
      countryDialCode: this.countryDialCode
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = 'common.add';
    } else {
      this.isEdit = true;
      this.pageMode = 'common.update';
      this.getRow(refCode);
    }
    
    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }

  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  back(){
    this.router.navigate(['reference/country']);
  }

  // get, add, update, delete
  getRow(row) {
    
    // Update ErrorMsg Service
    this.loading = true;
    this.commonservice.readPortalById('country/id/', row, this.languageId)
    .subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
        this.countryData = Rdata['country'];
        this.countryId = this.countryData.countryId;
      // populate data
        this.updateForm.get('countryName').setValue(this.countryData.countryName);
        this.updateForm.get('countryCode').setValue(this.countryData.countryCode);
        this.updateForm.get('countryDialCode').setValue(this.countryData.countryDialCode);
        this.checkReqValues();
      }).bind(this));
      this.loading = false;
    }, err => {
      this.loading = false;
    });
    
  }

  checkReqValues() {

    let countryName = "countryName";
    let countryCode = "countryCode";
    let countryDialCode = "countryDialCode";

    let reqVal: any = [countryName, countryCode, countryDialCode];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  myFunction() {  
    this.updateForm.reset();
    this.checkReqValues();
  }

  updateAction(formValues: any) {
    
    if(!this.isEdit) {

    let body = 
      {
        "countryName": null,
        "countryCode": null,
        "countryDialCode": null
       };
    
    body.countryName = formValues.countryName;
    body.countryCode = formValues.countryCode;
    body.countryDialCode = formValues.countryDialCode;

    // Add ErrorMsg Service
    this.loading = true;
    this.commonservice.create(body, 'country').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
        this.router.navigate(['reference/country']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;       
      });

    } else {

    let body = 
      {
        "countryId": this.countryId,
        "countryName": null,
        "countryCode": null,
        "countryDialCode": null
       };

    body.countryName = formValues.countryName;
    body.countryCode = formValues.countryCode;
    body.countryDialCode = formValues.countryDialCode;

    // Update AgencyApp Service
    this.loading = true;
    this.commonservice.update(body, 'country').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['reference/country']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        this.loading = false;
      });
    }

  }

}
