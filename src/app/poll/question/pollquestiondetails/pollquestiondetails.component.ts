// import { Component, OnInit, ViewEncapsulation, ViewChild, Inject  } from '@angular/core';
// import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
// import { CommonService } from '../../service/common.service';
// import { Router, RouterModule } from '@angular/router';
// import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
// import { SelectionModel } from '@angular/cdk/collections';

import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pollquestiondetails',
  templateUrl: './pollquestiondetails.component.html',
  styleUrls: ['./pollquestiondetails.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PollquestiondetailsComponent implements OnInit {

  updateForm: FormGroup;
  
  public pollEng: FormControl;  
  public pollMalay: FormControl;

  public opt1En: FormControl;
  public opt2En: FormControl;
  public opt3En: FormControl;
  public opt4En: FormControl;
  public opt5En: FormControl;

  public opt1Bm: FormControl;
  public opt2Bm: FormControl;
  public opt3Bm: FormControl;
  public opt4Bm: FormControl;
  public opt5Bm: FormControl;

  public active: FormControl

  public dataUrl: any;  
  public recordList: any;

  public getIdEn: any;
  public getIdBm: any;
  public getRefId: any;

  complete: boolean;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router) { }

  ngOnInit() {
  
    this.pollEng = new FormControl();
    this.pollMalay = new FormControl();

    this.opt1En = new FormControl();
    this.opt2En = new FormControl();
    this.opt3En = new FormControl();
    this.opt4En = new FormControl();
    this.opt5En = new FormControl();

    this.opt1Bm = new FormControl();
    this.opt2Bm = new FormControl();
    this.opt3Bm = new FormControl();
    this.opt4Bm = new FormControl();
    this.opt5Bm = new FormControl();

    this.active = new FormControl();

    this.updateForm = new FormGroup({   
      pollEng: this.pollEng,
      pollMalay: this.pollMalay,

      opt1En: this.opt1En,
      opt2En: this.opt2En,
      opt3En: this.opt3En,
      opt4En: this.opt4En,
      opt5En: this.opt5En,

      opt1Bm: this.opt1Bm,
      opt2Bm: this.opt2Bm,
      opt3Bm: this.opt3Bm,
      opt4Bm: this.opt4Bm,
      opt5Bm: this.opt5Bm,
      active: this.active
      
    });     
    
    let urlEdit = this.router.url.split('/')[3];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }
  }

  getData() {

    let _getRefID = this.router.url.split('/')[3];
  
    this.dataUrl = this.appConfig.urlPoll + '/question/same/'+_getRefID;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log(data);

      this.updateForm.get('pollEng').setValue(this.recordList[0].questionTitle);
      this.updateForm.get('pollMalay').setValue(this.recordList[1].questionTitle); 
      this.updateForm.get('opt1En').setValue(this.recordList[0].answer[0].answer);    
      this.updateForm.get('opt2En').setValue(this.recordList[0].answer[1].answer);    
      this.updateForm.get('opt3En').setValue(this.recordList[0].answer[2].answer);    
      this.updateForm.get('opt4En').setValue(this.recordList[0].answer[3].answer);    
      this.updateForm.get('opt5En').setValue(this.recordList[0].answer[4].answer);    
      this.updateForm.get('opt1Bm').setValue(this.recordList[1].answer[0].answer);    
      this.updateForm.get('opt2Bm').setValue(this.recordList[1].answer[1].answer);    
      this.updateForm.get('opt3Bm').setValue(this.recordList[1].answer[2].answer);    
      this.updateForm.get('opt4Bm').setValue(this.recordList[1].answer[3].answer);    
      this.updateForm.get('opt5Bm').setValue(this.recordList[1].answer[4].answer);
      this.updateForm.get('active').setValue(this.recordList[0].pollsActiveFlag);

      this.getIdEn = this.recordList[0].questionId;
      this.getIdBm = this.recordList[1].questionId;
      this.getRefId = this.recordList[0].pollReference;

    });
  }

  submit(formValues: any) {
    
    let flag = false;

    if(formValues.active == null){
      flag = false;
    }

    else{
      flag = formValues.active;
    }

    let urlEdit = this.router.url.split('/')[3];

    // delete form
    if(urlEdit === 'add'){

      let body = [
        {
          "pollsQuestion": null,
          "pollsAnswer1": null,
          "pollsAnswer2": null,
          "pollsAnswer3": null,
          "pollsAnswer4": null,
          "pollsAnswer5": null,
          "pollsActiveFlag": false,
          "pollsResult1": null,
          "pollsResult2": null,
          "pollsResult3": null,
          "pollsResult4": null,
          "pollsResult5": null,
          "pollsReference": null,
          "language": {
              "languageId": null
          }
        },{
          "pollsQuestion": null,
          "pollsAnswer1": null,
          "pollsAnswer2": null,
          "pollsAnswer3": null,
          "pollsAnswer4": null,
          "pollsAnswer5": null,
          "pollsActiveFlag": false,
          "pollsResult1": null,
          "pollsResult2": null,
          "pollsResult3": null,
          "pollsResult4": null,
          "pollsResult5": null,
          "pollsReference": null,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].pollsQuestion = formValues.pollMalay;
      body[0].pollsAnswer1 = formValues.opt1Bm;
      body[0].pollsAnswer2 = formValues.opt2Bm;
      body[0].pollsAnswer3 = formValues.opt3Bm;
      body[0].pollsAnswer4 = formValues.opt4Bm;
      body[0].pollsAnswer5 = formValues.opt5Bm;
      body[0].pollsActiveFlag = flag;
      body[0].pollsResult1 = null;
      body[0].pollsResult2 = null;
      body[0].pollsResult3= null;
      body[0].pollsResult4 = null;
      body[0].pollsResult5 = null;
      body[0].pollsReference = 50;
      body[0].language.languageId = 2;

      body[1].pollsQuestion = formValues.pollEng;
      body[1].pollsAnswer1 = formValues.opt1En;
      body[1].pollsAnswer2 = formValues.opt2En;
      body[1].pollsAnswer3 = formValues.opt3En;
      body[1].pollsAnswer4 = formValues.opt4En;
      body[1].pollsAnswer5 = formValues.opt5En;
      body[1].pollsActiveFlag = flag;
      body[1].pollsResult1 = null;
      body[1].pollsResult2 = null;
      body[1].pollsResult3= null;
      body[1].pollsResult4 = null;
      body[1].pollsResult5 = null;
      body[1].pollsReference = 50;
      body[1].language.languageId = 1;

      console.log(body);

      this.commonservice.addRecord(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          alert('Record added successfully!')
          this.router.navigate(['poll/questions']);
          // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        },
        error => {
          console.log("No Data")
          // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }

    // update form
    else{

      let body = [
        {
          "pollsQuestionId": null,
          "pollsQuestion": null,
          "pollsAnswer1": null,
          "pollsAnswer2": null,
          "pollsAnswer3": null,
          "pollsAnswer4": null,
          "pollsAnswer5": null,
          "pollsActiveFlag": false,
          "pollsResult1": null,
          "pollsResult2": null,
          "pollsResult3": null,
          "pollsResult4": null,
          "pollsResult5": null,
          "pollsReference": null,
          "language": {
              "languageId": null
          }
        },{
          "pollsQuestionId": null,
          "pollsQuestion": null,
          "pollsAnswer1": null,
          "pollsAnswer2": null,
          "pollsAnswer3": null,
          "pollsAnswer4": null,
          "pollsAnswer5": null,
          "pollsActiveFlag": false,
          "pollsResult1": null,
          "pollsResult2": null,
          "pollsResult3": null,
          "pollsResult4": null,
          "pollsResult5": null,
          "pollsReference": null,
          "language": {
              "languageId": null
          }
        }
      ]    

      body[0].pollsQuestionId = this.getIdBm;
      body[0].pollsQuestion = formValues.pollMalay;
      body[0].pollsAnswer1 = formValues.opt1Bm;
      body[0].pollsAnswer2 = formValues.opt2Bm;
      body[0].pollsAnswer3 = formValues.opt3Bm;
      body[0].pollsAnswer4 = formValues.opt4Bm;
      body[0].pollsAnswer5 = formValues.opt5Bm;
      body[0].pollsActiveFlag = flag;
      body[0].pollsResult1 = null;
      body[0].pollsResult2 = null;
      body[0].pollsResult3= null;
      body[0].pollsResult4 = null;
      body[0].pollsResult5 = null;
      body[0].pollsReference = this.getRefId;
      body[0].language.languageId = 2;

      body[1].pollsQuestionId = this.getIdEn;
      body[1].pollsQuestion = formValues.pollEng;
      body[1].pollsAnswer1 = formValues.opt1En;
      body[1].pollsAnswer2 = formValues.opt2En;
      body[1].pollsAnswer3 = formValues.opt3En;
      body[1].pollsAnswer4 = formValues.opt4En;
      body[1].pollsAnswer5 = formValues.opt5En;
      body[1].pollsActiveFlag = flag;
      body[1].pollsResult1 = null;
      body[1].pollsResult2 = null;
      body[1].pollsResult3= null;
      body[1].pollsResult4 = null;
      body[1].pollsResult5 = null;
      body[1].pollsReference = this.getRefId;
      body[1].language.languageId = 1;

      console.log(body);

      this.commonservice.updateRecord(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          alert('Record updated successfully!')
          this.router.navigate(['poll/questions']);
          // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        },
        error => {
          console.log("No Data")
          // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["pollEng", "pollMalay", "opt1En", "opt1Bm", "opt2En", "opt2Bm"];
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
    var txt;
    var r = confirm("Are you sure to reset the form?");
    if (r == true) {
        txt = "You pressed OK!";
        this.updateForm.reset();
    } else {
        txt = "You pressed Cancel!";
    }
  }

}

