// import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// import { HttpClient } from '@angular/common/http';
// import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
// import { CommonService } from '../../service/common.service';
// import { Router } from '@angular/router';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-slider',
//   templateUrl: './ethnicity.component.html',
//   styleUrls: ['./ethnicity.component.css'],
//   encapsulation: ViewEncapsulation.None
// })
// export class EthnicityComponent implements OnInit {

//     constructor() { }
  
//     ngOnInit() {
//     }
  
//   }



import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  public getIdEn: any;
  public getIdBm: any;
  public getRefId: any;

  complete: boolean;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router) { }

  ngOnInit() {
  
    this.raceEng = new FormControl();
    this.raceMy = new FormControl();

    this.active = new FormControl();

    this.updateForm = new FormGroup({   
      raceEng: this.raceEng,
      raceMy: this.raceMy,

      
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

      this.updateForm.get('raceEng').setValue(this.recordList[0].questionTitle);
      this.updateForm.get('raceMy').setValue(this.recordList[1].questionTitle); 
      

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
 
      body[0].pollsQuestion = formValues.raceMy;
      body[0].pollsReference = 50;
      body[0].language.languageId = 2;

      body[1].pollsQuestion = formValues.raceEng;      
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

      
      body[0].pollsQuestion = formValues.raceMy;
      body[0].pollsReference = this.getRefId;
      body[0].language.languageId = 2;

      
      body[1].pollsQuestion = formValues.raceEng;
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



