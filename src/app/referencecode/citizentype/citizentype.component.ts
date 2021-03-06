import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from './../../dialogs/dialogs.service';

@Component({
  selector: 'app-citizentype',
  templateUrl: './citizentype.component.html',
  styleUrls: ['./citizentype.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CitizentypeComponent implements OnInit {

  updateForm: FormGroup;
  
  public userTypeEng: FormControl;  
  public userTypeMy: FormControl;
  public active: FormControl;

  public recordList: any;

  public getUserTypeIdEng: any;
  public getUserTypeIdMy: any;
  public getRefCodeMy: any;
  public getRefCodeEng: any;
  public getUserTypeActive: any;

  complete: boolean;
  public languageId: any;
  public loading = false;
  public urlEdit = "";
  lang: string;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  public commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService,
  private dialogsService: DialogsService) {
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
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
    });
   }

  ngOnInit() {

    this.commonservice.getInitialMessage();

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }
    this.commonservice.getModuleId();
    this.userTypeEng = new FormControl();
    this.userTypeMy = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   
      userTypeEng: this.userTypeEng,
      userTypeMy: this.userTypeMy,
      active: this.active,

      
    });     
    
    this.urlEdit = this.router.url.split('/')[3];
    
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData(this.languageId);
    }
    
    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  getData(lng) {

    let _getRefID = this.router.url.split('/')[3];

    this.loading = true;
    this.commonservice.readProtectedById('usertype/code/',_getRefID, lng)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
      this.recordList = data;

      

      this.updateForm.get('userTypeMy').setValue(this.recordList.userTypeList[1].userType);
      this.updateForm.get('userTypeEng').setValue(this.recordList.userTypeList[0].userType); 
      this.updateForm.get('active').setValue(this.recordList.userTypeList[1].userTypeActiveFlag);
      

      this.getUserTypeIdMy = this.recordList.userTypeList[1].userTypeId;
      this.getUserTypeIdEng = this.recordList.userTypeList[0].userTypeId;

      this.getRefCodeMy = this.recordList.userTypeList[1].userTypeCode;
      this.getRefCodeEng = this.recordList.userTypeList[0].userTypeCode;

      this.getUserTypeActive = this.recordList.userTypeList[1].userTypeActiveFlag;

      this.checkReqValues();

    }).bind(this));   
    this.loading = false;
  },
  error => {

      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      
      this.loading = false;
    });
  }

  back(){
    this.router.navigate(['reference/citizentype']);
  }

  submit(formValues: any) {
    
    let flag = false;
    let txt = "";

    if(formValues.active == null){
      flag = false;
    }

    else{
      flag = formValues.active;
    }

    this.urlEdit = this.router.url.split('/')[3];

    // add form
    if(this.urlEdit === 'add'){

      let body = [
        {
          "userType": null,
          "userTypeActiveFlag": false,
          "language": {
              "languageId": null
          }
        },
        {
          "userType": null,
          "userTypeActiveFlag": false,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[1].userType = formValues.userTypeMy;
      body[1].language.languageId = 2;
      body[1].userTypeActiveFlag = formValues.active;

      body[0].userType = formValues.userTypeEng; 
      body[0].language.languageId = 1;
      body[0].userTypeActiveFlag = formValues.active;

      

      this.loading = true;
      this.commonservice.create(body,'usertype').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['reference/citizentype']);
          }).bind(this));   
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          

        //   
        //   
        //   // alert('Record added successfully!')

        //   let txt = "Record added successfully!";
        //   this.toastr.success(txt, '');  

        //   this.router.navigate(['reference/citizentype']);
        //   // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        // },
        // error => {
        //   
        //   // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }

    // update form
    else{

      let body = [
        {
          "userType": null,
          "userTypeId": null,
          "userTypeCode": null,
          "userTypeActiveFlag": false,
          "language": {
              "languageId": null
          }
        },
        {
          "userType": null,
          "userTypeId": null,
          "userTypeCode": null,
          "userTypeActiveFlag": false,
          "language": {
              "languageId": null
          }
        }
      ]    


      body[1].userType = formValues.userTypeMy;
      body[1].userTypeId = this.getUserTypeIdMy;
      body[1].userTypeCode = this.getRefCodeMy;
      body[1].language.languageId = 2;
      body[1].userTypeActiveFlag = formValues.active;

      body[0].userType = formValues.userTypeEng; 
      body[0].userTypeId = this.getUserTypeIdEng; 
      body[0].userTypeCode = this.getRefCodeEng; 
      body[0].language.languageId = 1;
      body[0].userTypeActiveFlag = formValues.active;

      

      this.loading = true;
      this.commonservice.update(body,'usertype').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['reference/citizentype']);
          }).bind(this)); 
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
          

        //   
        //   
        //   // alert('Record updated successfully!')

        //   let txt = "Record updated successfully!";
        //   this.toastr.success(txt, ''); 

        //   this.router.navigate(['reference/citizentype']);
        //   // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        // },
        // error => {
        //   
        //   // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }
  }

  changeLanguageAddEdit(){
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);  
    }
    else{
      this.commonservice.pageModeChange(true);      
    }
  }

  checkReqValues() {

    let reqVal:any = ["userTypeEng", "userTypeMy"];
    let nullPointers:any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }
      
    if(nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  myFunction() {

    this.updateForm.reset();
    this.checkReqValues(); 
    
    // var txt;
    // var r = confirm("Are you sure to reset the form?");
    // if (r == true) {
    //     txt = "You pressed OK!";
    //     this.toastr.success(txt, ''); 
    //     this.updateForm.reset();
    //     this.checkReqValues();

    // } else {
    //     txt = "You pressed Cancel!";
    //     this.toastr.success(txt, '');
    // }
  }

}
