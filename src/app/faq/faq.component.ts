// import { Component, OnInit } from '@angular/core';
// import { CommonService } from '../service/common.service';
// import { Router, RouterModule } from '@angular/router';


// @Component({
//   selector: 'app-faq',
//   templateUrl: './faq.component.html',
//   styleUrls: ['./faq.component.css']
// })
// export class FaqComponent implements OnInit {

//   constructor(private commonservice: CommonService, private router: Router) { 
//   }

//   ngOnInit() {
//   }
  
// }


import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FaqComponent implements OnInit {

  updateForm: FormGroup;
  
  public faqQEng: FormControl;
  public faqQMy: FormControl;
  public faqAEng: FormControl;
  public faqAMy: FormControl;
  public active: FormControl;

  public dataUrl: any;  
  public recordList: any;

  // public getIdentificationType: any;

  public getFaqIdEng: any;
  public getFaqIdMy: any;
  public getFaqCodeEng: any;
  public getFaqCodeMy: any;
  public getFaqActiveFlag: any;

  complete: boolean;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.faqQEng = new FormControl();
    this.faqQMy = new FormControl();
    this.faqAEng = new FormControl();
    this.faqAMy = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      faqQEng: this.faqQEng,
      faqQMy: this.faqQMy,
      faqAEng: this.faqAEng,
      faqAMy: this.faqAMy,
      active: this.active,

      
    });     
    
    let urlEdit = this.router.url.split('/')[2];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }
  }

  getData() {

    let _getRefID = this.router.url.split('/')[2];
    // this.appConfig.urlRaceList
    this.dataUrl = this.appConfig.urlFaqList + '/code/' +  _getRefID;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log(data);

      this.updateForm.get('faqQEng').setValue(this.recordList.faqList[0].facQuestion);
      this.updateForm.get('faqAEng').setValue(this.recordList.faqList[0].facAnswer);
      this.updateForm.get('active').setValue(this.recordList.faqList[0].faqActiveFlag);

      this.updateForm.get('faqQMy').setValue(this.recordList.faqList[1].facQuestion);
      this.updateForm.get('faqAMy').setValue(this.recordList.faqList[1].facAnswer);
      
      this.getFaqCodeEng = this.recordList.faqList[0].faqCode;
      this.getFaqIdEng = this.recordList.faqList[0].faqId;
      
      this.getFaqCodeMy = this.recordList.faqList[1].faqCode;
      this.getFaqIdMy = this.recordList.faqList[1].faqId;

    });
  }

  back(){
    this.router.navigate(['faq']);
  }

  submit(formValues: any) {
    
    let flag = false;

    if(formValues.active == null){
      flag = false;
    }

    else{
      flag = formValues.active;
    }

    let urlEdit = this.router.url.split('/')[2];

    // add form
    if(urlEdit === 'add'){

      let body = [
        {
          "faqActiveFlag": false,
          "facQuestion": null,
          "facAnswer": null,
          "facCode": null,
          "language": {
              "languageId": null
          }
        },
        {
          "faqActiveFlag": false,
          "facQuestion": null,
          "facAnswer": null,
          "facCode": null,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].faqActiveFlag = formValues.active;
      body[0].facQuestion = formValues.faqQEng;
      body[0].facAnswer = formValues.faqAEng;
      body[0].facCode = this.getFaqCodeEng;
      body[0].language.languageId = 1;

      body[1].faqActiveFlag = formValues.active;
      body[1].facQuestion = formValues.faqQMy;
      body[1].facAnswer = formValues.faqAMy;
      body[1].facCode = this.getFaqCodeMy;
      body[1].language.languageId = 2;

      console.log(body);

      this.commonservice.addFaq(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          // alert('Record added successfully!')

          let txt = "Record added successfully!";
          this.toastr.success(txt, '');  

          this.router.navigate(['faq']);
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
          "faqId": null,
          "faqCode": null,
          "faqActiveFlag": false,
          "facQuestion": null,
          "facAnswer": null,
          "language": {
              "languageId": null
          }
        },
        {
          "faqId": null,
          "faqCode": null,
          "faqActiveFlag": false,
          "facQuestion": null,
          "facAnswer": null,
          "language": {
              "languageId": null
          }
        }
      ]    

      body[0].faqId = this.getFaqIdEng;
      body[0].facQuestion = formValues.faqQEng;
      body[0].facAnswer = formValues.faqAEng;
      body[0].faqCode = this.getFaqCodeMy;
      body[0].language.languageId = 1;
      body[0].faqActiveFlag = formValues.active;

      body[1].faqId = this.getFaqIdMy;
      body[1].facQuestion = formValues.faqQMy; 
      body[1].facAnswer = formValues.faqAMy; 
      body[1].faqCode = this.getFaqCodeEng; 
      body[1].language.languageId = 2;
      body[1].faqActiveFlag = formValues.active;

      console.log(body);

      this.commonservice.updateFaq(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          // alert('Record updated successfully!')

          let txt = "Record updated successfully!";
          this.toastr.success(txt, ''); 

          this.router.navigate(['faq']);
          // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        },
        error => {
          console.log("No Data")
          // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["faqQEng", "faqQMy", "faqAEng", "faqAMy"];
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
        this.toastr.success(txt, ''); 
        this.updateForm.reset();
        this.checkReqValues();
    } else {
        txt = "You pressed Cancel!";
        this.toastr.success(txt, '');
    }
  }

}

