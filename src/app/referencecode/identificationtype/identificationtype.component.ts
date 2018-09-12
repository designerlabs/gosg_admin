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
  selector: 'app-identificationtype',
  templateUrl: './identificationtype.component.html',
  styleUrls: ['./identificationtype.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class IdentificationtypeComponent implements OnInit {

  updateForm: FormGroup;
  
  public identificationTypeEng: FormControl;
  public identificationTypeMy: FormControl;
  public active: FormControl;

  

  public dataUrl: any;  
  public recordList: any;
  public languageId: any;

  // public getIdentificationType: any;

  public getIdentificationTypeIdEng: any;
  public getIdentificationTypeIdMy: any;
  public getIdentificationCodeEng: any;
  public getIdentificationCodeMy: any;
  public getUserTypeActive: any;

  complete: boolean;
  public loading = false;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  public commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService,
  private dialogsService: DialogsService) { 
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.commonservice.getModuleId();
    }
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();
    this.commonservice.getModuleId();
    this.identificationTypeEng = new FormControl();
    this.identificationTypeMy = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      identificationTypeEng: this.identificationTypeEng,
      identificationTypeMy: this.identificationTypeMy,
      active: this.active,

      
    });     
    
    let urlEdit = this.router.url.split('/')[3];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }

    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  getData() {

    let _getRefID = this.router.url.split('/')[3];
    this.loading = true;
    this.commonservice.readProtectedById('identificationtype/code', _getRefID, this.languageId)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
      this.recordList = data;

      

      this.updateForm.get('identificationTypeEng').setValue(this.recordList.identificationType[1].identificationType);
      this.updateForm.get('identificationTypeMy').setValue(this.recordList.identificationType[0].identificationType)
      this.updateForm.get('active').setValue(this.recordList.identificationType[0].active);
      
      this.getIdentificationTypeIdEng = this.recordList.identificationType[1].identificationTypeId;
      this.getIdentificationCodeEng = this.recordList.identificationType[1].identificationCode;
      
      this.getIdentificationTypeIdMy = this.recordList.identificationType[0].identificationTypeId;
      this.getIdentificationCodeMy = this.recordList.identificationType[0].identificationCode;

    }).bind(this));   
    this.loading = false;
  },
  error => {
    this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      

  

    });
  }

  back(){
    this.router.navigate(['reference/identificationtype']);
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

    let urlEdit = this.router.url.split('/')[3];

    // add form
    if(urlEdit === 'add'){

      let body = [
        {
          "identificationType": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        },
        {
          "identificationType": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].identificationType = formValues.identificationTypeMy;
      body[0].language.languageId = 2;
      // body[0].active = formValues.active;

      body[1].identificationType = formValues.identificationTypeEng; 
      body[1].language.languageId = 1;
      // body[1].active = formValues.active;

      

      this.loading = true;
      this.commonservice.create(body,'identificationtype/add/multiple/').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['reference/identificationtype']);
          }).bind(this));   
          this.loading = false;
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          
          this.loading = false;

        //   
        //   
        //   // alert('Record added successfully!')

        //   let txt = "Record added successfully!";
        //   this.toastr.success(txt, '');  

        //   this.router.navigate(['reference/identificationtype']);
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
          "identificationType": null,
          "identificationTypeId": null,
          "identificationCode": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        },
        {
          "identificationType": null,
          "identificationTypeId": null,
          "identificationCode": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        }
      ]    


      body[0].identificationTypeId = this.getIdentificationTypeIdMy;
      body[0].identificationType = formValues.identificationTypeMy;
      body[0].identificationCode = this.getIdentificationCodeMy;
      body[0].language.languageId = 2;
      // body[0].active = formValues.active;

      body[1].identificationTypeId = this.getIdentificationTypeIdEng; 
      body[1].identificationType = formValues.identificationTypeEng; 
      body[1].identificationCode = this.getIdentificationCodeEng; 
      body[1].language.languageId = 1;
      // body[1].active = formValues.active;

      

      this.loading = true;
      this.commonservice.update(body,'identificationtype/update/multiple').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['reference/identificationtype']);
          }).bind(this));
          this.loading = false;   
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          
          this.loading = false;

        //   
        //   
        //   // alert('Record updated successfully!')

        //   let txt = "Record updated successfully!";
        //   this.toastr.success(txt, ''); 

        //   this.router.navigate(['reference/identificationtype']);
        //   // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        // },
        // error => {
        //   
        //   // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["identificationTypeEng", "identificationTypeMy"];
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
