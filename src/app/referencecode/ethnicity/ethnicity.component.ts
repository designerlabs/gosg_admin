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
  selector: 'app-ethnicity',
  templateUrl: './ethnicity.component.html',
  styleUrls: ['./ethnicity.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class EthnicityComponent implements OnInit {

  updateForm: FormGroup;
  
  public raceEng: FormControl;  
  public raceMy: FormControl;

  public active: FormControl

  public dataUrl: any;  
  public recordList: any;

  public getRaceIdEng: any;
  public getRaceIdMy: any;
  public getRefCodeMy: any;
  public getRefCodeEng: any;
  public getRaceActive: any;

  public raceCodeEn: any;
  public raceCodeBm: any;

  complete: boolean;
  public languageId: any;
  public loading = false;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  public commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService,
  private dialogsService: DialogsService) {
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
            this.languageId = 1;
          });
        }
        
        if (myLang == 'ms') {
          translate.get('HOME').subscribe((res: any) => {
            this.languageId = 2;
        });
        // alert(this.languageId + ',' + this.localeVal)
      }
    });
   }

  ngOnInit() {
    this.commonservice.getModuleId();
    this.raceEng = new FormControl();
    this.raceMy = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   
      raceEng: this.raceEng,
      raceMy: this.raceMy,
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
    this.commonservice.readPortalById('race/code/', _getRefID, this.languageId)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
      this.recordList = data;

      

      this.updateForm.get('raceMy').setValue(this.recordList.raceList[0].race);
      this.updateForm.get('raceEng').setValue(this.recordList.raceList[1].race); 
      

      this.getRaceIdMy = this.recordList.raceList[0].raceId;
      this.getRaceIdEng = this.recordList.raceList[1].raceId;
      this.getRefCodeMy = this.recordList.raceList[0].refCode;
      this.getRefCodeEng = this.recordList.raceList[1].refCode;
      this.getRaceActive = this.recordList.raceList[0].active;
      this.raceCodeEn = this.recordList.raceList[0].raceCode;
      this.raceCodeBm = this.recordList.raceList[1].raceCode;

      this.checkReqValues();

    }).bind(this));   
    this.loading = false;
  },
  error => {
    this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      

    });
  }

  back(){
    this.router.navigate(['reference/ethnicity']);
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
          "race": null,
          "active": false,
          "language": {
              "languageId": null
          }
        },
        {
          "race": null,
          "active": false,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].race = formValues.raceMy;
      body[0].language.languageId = 2;
      body[0].active = formValues.active;

      body[1].race = formValues.raceEng; 
      body[1].language.languageId = 1;
      body[1].active = formValues.active;

      

      this.loading = true;
      this.commonservice.create(body,'race').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['reference/ethnicity']);
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

        //   this.router.navigate(['reference/ethnicity']);
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
          "race": null,
          "raceId": null,
          "refCode": null,
          "active": false,
          "language": {
              "languageId": null
          },
          "raceCode": null
        },
        {
          "race": null,
          "raceId": null,
          "refCode": null,
          "active": false,
          "language": {
              "languageId": null
          },
          "raceCode": null
        }
      ]    


      body[0].race = formValues.raceMy;
      body[0].raceId = this.getRaceIdMy;
      body[0].raceCode = this.raceCodeBm;
      body[0].refCode = this.getRefCodeMy;
      body[0].language.languageId = 2;
      body[0].active = formValues.active;

      body[1].race = formValues.raceEng; 
      body[1].raceId = this.getRaceIdEng; 
      body[1].raceCode = this.raceCodeEn;
      body[1].refCode = this.getRefCodeEng; 
      body[1].language.languageId = 1;
      body[1].active = formValues.active;

      

      this.loading = true;
      this.commonservice.update(body,'race').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['reference/ethnicity']);
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

        //   this.router.navigate(['reference/ethnicity']);
        //   // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        // },
        // error => {
        //   
        //   // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["raceEng", "raceMy"];
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



