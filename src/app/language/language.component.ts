import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  
  LanguageData: Object;
  dataUrl: any;
  date = new Date();
  languageForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  languageId: any;
  
  langCode: any;
  languageName: FormControl
  languageCode: FormControl
  languageDescription: FormControl
  resetMsg = this.resetMsg;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 

    this.langCode = this.router.url.split('/')[2];

    this.languageName = new FormControl()
    this.languageCode = new FormControl()
    this.languageDescription = new FormControl()

    this.languageForm = new FormGroup({
      languageName: this.languageName,
      languageDescription: this.languageDescription,
      languageCode: this.languageCode
    });

    if(this.langCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(this.langCode);
    }
  }

  ngAfterViewInit() {
  }

  back(){
    this.router.navigate(['language']);
  }

  // get, add, update, delete
  getRow(code) {

    // Update Language Service
    return this.http.get(this.appConfig.urlLanguage + '/' + code).subscribe(
    // return this.http.get(this.appConfig.urlLanguage + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlLanguage + row + "/").subscribe(
      Rdata => {

        this.LanguageData = Rdata;
        console.log(this.LanguageData)
        console.log(this.appConfig.urlLanguage + "/" + code)
        let langData = this.LanguageData['language'];
        this.languageId = langData.languageId;

      // populate data
      this.languageForm.get('languageName').setValue(langData.languageName);
      this.languageForm.get('languageDescription').setValue(langData.languageDescription);
      this.languageForm.get('languageCode').setValue(langData.languageCode);
      
      this.checkReqValues();
    });
    
  }

  // isChecked(e) {

  //   if (e.checked) {
  //     this.languageForm.get("imgBm").setValue(this.imgEn.value);
  //   } else {
  //     this.languageForm.get("imgBm").setValue("");
  //   }
  //   this.copyImg = e.checked;
  //   this.checkReqValues();
  // }

  checkReqValues() {

    let languageName = "languageName";
    let langDesc = "languageDescription";
    let languageCode = "languageCode";

    let reqVal: any = [languageName, langDesc, languageCode];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.languageForm.get(reqData);

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

  myFunction() {
    let txt;
    let r = confirm("Are you sure to reset the form?");
    if (r == true) {
      txt = "You pressed OK!";
      this.languageForm.reset();
      this.checkReqValues();
    } else {
      txt = "You pressed Cancel!";
    }
  }

  deleteRow(langCode) {
    let txt;
    let r = confirm("Are you sure to delete " + langCode + "?");
    if (r == true) {

      this.commonservice.delLanguage(langCode).subscribe(
        data => {
          txt = "Language deleted successfully!";
          // this.router.navigate(['Language']);
          window.location.reload()
        },
        error => {
          console.log("No Data")
        });

      // this.languageForm.reset();
    } else {
      txt = "Delete Cancelled!";
      alert(txt)
    }
  }
  
  updateLanguage(formValues: any) {
    
    if(!this.isEdit) {

    let body = 
      {
        "languageId": null,
        "languageCode": null,
        "languageName": null,
        "languageDescription": null
      };
    
    // console.log(formValues)

    body.languageCode = formValues.languageCode;
    body.languageName = formValues.languageName;
    body.languageDescription = formValues.languageDescription;

    console.log(body)

    // Add Language Service
    this.commonservice.addLanguage(body).subscribe(
      data => {
        this.toastr.success('Language added successfully!', ''); 
        this.router.navigate(['language']);
      },
      error => {
        console.log("No Data")
      });

    } else {

      let body = 
        {
          "languageId": this.languageId,
          "languageCode": null,
          "languageName": null,
          "languageDescription": null
        };

        body.languageCode = formValues.languageCode;
        body.languageName = formValues.languageName;
        body.languageDescription = formValues.languageDescription;

    console.log(body);

    // Update Language Service
    this.commonservice.updateLanguage(body).subscribe(
      data => {
        this.toastr.success('Language update successful!', '');   
        this.router.navigate(['language']);
      },
      error => {
        console.log("No Data")
      });
    }
    

  }

}
