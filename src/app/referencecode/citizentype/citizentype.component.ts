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

  public dataUrl: any;  
  public recordList: any;

  public getUserTypeIdEng: any;
  public getUserTypeIdMy: any;
  public getRefCodeMy: any;
  public getRefCodeEng: any;
  public getUserTypeActive: any;

  complete: boolean;
  public languageId: any;
  public loading = false;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService,
  private dialogsService: DialogsService) {
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
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
    this.commonservice.getModuleId();
    this.userTypeEng = new FormControl();
    this.userTypeMy = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   
      userTypeEng: this.userTypeEng,
      userTypeMy: this.userTypeMy,
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
    // this.appConfig.urlRaceList
    this.dataUrl = this.appConfig.urlUserTypeList + '/code/' +  _getRefID + "?language=" + this.languageId;

    this.loading = true;
    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
      this.recordList = data;

      console.log(data);

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
      console.log(error);
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

    let urlEdit = this.router.url.split('/')[3];

    // add form
    if(urlEdit === 'add'){

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

      console.log(body);

      this.loading = true;
      this.commonservice.addUserType(body).subscribe(
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
          console.log(error);

        //   console.log(JSON.stringify(body))
        //   console.log(body)
        //   // alert('Record added successfully!')

        //   let txt = "Record added successfully!";
        //   this.toastr.success(txt, '');  

        //   this.router.navigate(['reference/citizentype']);
        //   // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        // },
        // error => {
        //   console.log("No Data")
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

      console.log(body);

      this.loading = true;
      this.commonservice.updateUserType(body).subscribe(
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
          console.log(error);

        //   console.log(JSON.stringify(body))
        //   console.log(body)
        //   // alert('Record updated successfully!')

        //   let txt = "Record updated successfully!";
        //   this.toastr.success(txt, ''); 

        //   this.router.navigate(['reference/citizentype']);
        //   // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        // },
        // error => {
        //   console.log("No Data")
        //   // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
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
