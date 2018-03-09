import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from './../dialogs/dialogs.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  
  LanguageData: Object;
  date = new Date();
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  languageId: any;
  langName: any;
  langCode: any;
  languageName: FormControl
  languageCode: FormControl
  languageDescription: FormControl
  isDefault: FormControl
  resetMsg = this.resetMsg;
  public loading = false;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
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
              //this.getUsersData(this.pageCount, this.pageSize);
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.commonservice.getModuleId();
      //this.getData();
    }
    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 

    this.langCode = this.router.url.split('/')[2];

    this.languageName = new FormControl()
    this.languageCode = new FormControl()
    this.languageDescription = new FormControl()
    this.isDefault = new FormControl()

    this.updateForm = new FormGroup({
      languageName: this.languageName,
      languageDescription: this.languageDescription,
      languageCode: this.languageCode,
      isDefault: this.isDefault
    });

    if(this.langCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(this.langCode);
    }

    this.commonservice.getModuleId();
    
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
    this.router.navigate(['language']);
  }

  // get, add, update, delete
  getRow(code) {
    this.loading = true;

    // Update Language Service
    // return this.http.get(this.appConfig.urlGetLanguage + '/' + code + '?language='+this.languageId).subscribe(
    return this.commonservice.readPortalById('language/', code).subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
          this.LanguageData = Rdata;
          let langData = this.LanguageData['language'];
          this.languageId = langData.languageId;

        // populate data
        this.updateForm.get('languageName').setValue(langData.languageName);
        this.updateForm.get('languageDescription').setValue(langData.languageDescription);
        this.updateForm.get('languageCode').setValue(langData.languageCode);
        this.updateForm.get('isDefault').setValue(langData.isDefault);
        this.langName = langData.languageName;
        this.langCode = langData.languageCode;

        this.updateForm.get('languageName').disable();
        this.updateForm.get('languageCode').disable();
        
        this.checkReqValues();

      }).bind(this)); 
      this.loading = false;
    },
    error => {
      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);
    });    
  }

  // isChecked(e) {

  //   if (e.checked) {
  //     this.updateForm.get("imgBm").setValue(this.imgEn.value);
  //   } else {
  //     this.updateForm.get("imgBm").setValue("");
  //   }
  //   this.copyImg = e.checked;
  //   this.checkReqValues();
  // }

  checkReqValues() 
  {
    let reqVal: any;
    let languageName = "languageName";
    let langDesc = "languageDescription";
    let languageCode = "languageCode";

    if(this.isEdit == true)
      reqVal = [langDesc];
    else
      reqVal = [languageName, langDesc, languageCode];

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
 
  updateLanguage(formValues: any) {

    if(!this.isEdit) {

    let body = 
      {
        "languageId": null,
        "languageCode": null,
        "languageName": null,
        "isDefault": null,
        "languageDescription": null
      };
    
    console.log(formValues)


    body.languageCode = formValues.languageCode;
    body.languageName = formValues.languageName;
    body.languageDescription = formValues.languageDescription;
    body.isDefault = formValues.isDefault;

    console.log(body)

    // Add Language Service
    this.commonservice.addLanguage(body).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), '');
          this.router.navigate(['language']);
      }).bind(this));   
    },
    error => {

      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);
      });

    } else {

      let body = 
        {
          "languageId": this.languageId,
          "languageCode": null,
          "languageName": null,
          "isDefault": null,
          "languageDescription": null
        };

        body.languageCode = this.langCode;
        body.languageName = this.langName;
        body.languageDescription = formValues.languageDescription;
        body.isDefault = formValues.isDefault;

    console.log(body);

    // Update Language Service
    this.commonservice.updateLanguage(body).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), '');
          this.router.navigate(['language']);
      }).bind(this));   
    },
    error => {

      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);
      });
    }   
  }
}
