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
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ReligionComponent implements OnInit {

  updateForm: FormGroup;
  
  public religionEng: FormControl;  
  public religionMy: FormControl;

  // public active: FormControl

  public dataUrl: any;  
  public recordList: any;

  public getReligionIdEng: any;
  public getReligionIdMy: any;
  public getReligionCodeMy: any;
  public getReligionCodeEng: any;
  // public getRaceActive: any;

  complete: boolean;
  public languageId: any;
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
              // this.getRecordList(this.pageCount, this.pageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      // this.getRecordList(this.pageCount, this.pageSize);
      this.commonservice.getModuleId();
    }
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();
    this.commonservice.getModuleId();
    this.religionEng = new FormControl();
    this.religionMy = new FormControl();
    // this.active = new FormControl();

    this.updateForm = new FormGroup({   
      religionEng: this.religionEng,
      religionMy: this.religionMy,
      // active: this.active,

      
    });     
    
    let urlEdit = this.router.url.split('/')[3];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      // this.updateForm.get('active').setValue(true);
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
    this.commonservice.readPortalById('religion/', _getRefID, this.languageId)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
      this.recordList = data;

      

      this.updateForm.get('religionMy').setValue(this.recordList.religionList[1].religion);
      this.updateForm.get('religionEng').setValue(this.recordList.religionList[0].religion); 
      

      this.getReligionIdMy = this.recordList.religionList[1].religionId;
      this.getReligionCodeMy = this.recordList.religionList[1].religionCode;

      this.getReligionIdEng = this.recordList.religionList[0].religionId;
      this.getReligionCodeEng = this.recordList.religionList[0].religionCode;
      // this.getRaceActive = this.recordList.raceList[0].active;

    }).bind(this));   
    this.loading = false;
  },
  error => {

      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      
      this.loading = false;

    });
  }

  back(){
    this.router.navigate(['reference/religion']);
  }

  submit(formValues: any) {
    let txt = "";
    
    // let flag = false;

    // if(formValues.active == null){
    //   flag = false;
    // }

    // else{
    //   flag = formValues.active;
    // }

    let urlEdit = this.router.url.split('/')[3];

    // add form
    if(urlEdit === 'add'){

      let body = [
        {
          "religion": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        },
        {
          "religion": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[1].religion = formValues.religionMy;
      body[1].language.languageId = 2;
      // body[0].active = formValues.active;

      body[0].religion = formValues.religionEng; 
      body[0].language.languageId = 1;
      // body[1].active = formValues.active;

      

      this.loading = true;
      this.commonservice.create(body,'religion').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['reference/religion']);
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

        //   this.router.navigate(['reference/religion']);
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
          "religion": null,
          "religionId": null,
          "religionCode": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        },
        {
          "religion": null,
          "religionId": null,
          "religionCode": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        }
      ]    


      body[1].religion = formValues.religionMy;
      body[1].religionId = this.getReligionIdMy;
      body[1].religionCode = this.getReligionCodeMy;
      body[1].language.languageId = 2;

      // body[0].active = formValues.active;

      body[0].religion = formValues.religionEng; 
      body[0].religionId = this.getReligionIdEng; 
      body[0].religionCode = this.getReligionCodeEng; 
      body[0].language.languageId = 1;

      // body[1].active = formValues.active;

      
      this.loading = true;

      this.commonservice.update(body,'religion').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['reference/religion']);
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

        //   this.router.navigate(['reference/religion']);
        //   // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        // },
        // error => {
        //   
        //   // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["religionEng", "religionMy"];
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



