// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-footercategory',
//   templateUrl: './footercategory.component.html',
//   styleUrls: ['./footercategory.component.css']
// })
// export class FootercategoryComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }




import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footercategory',
  templateUrl: './footercategory.component.html',
  styleUrls: ['./footercategory.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FootercategoryComponent implements OnInit {

  updateForm: FormGroup;
  
  public catEng: FormControl;
  public descEng: FormControl;

  public catMy: FormControl;
  public descMy: FormControl;

  public active: FormControl;

  public dataUrl: any;  
  public recordList: any;

  // public getIdentificationType: any;

  public getFaqIdEng: any;
  public getFaqCodeEng: any;

  public getFaqIdMy: any;
  public getFaqCodeMy: any;

  complete: boolean;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.catEng = new FormControl();
    this.descEng = new FormControl();

    this.catMy = new FormControl();
    this.descMy = new FormControl();

    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      catEng: this.catEng,
      catMy: this.catMy,

      descEng: this.descEng,
      descMy: this.descMy,

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
  }

  getData() {

    let _getRefID = this.router.url.split('/')[3];
    // this.appConfig.urlRaceList
    this.dataUrl = this.appConfig.urlFaqList + '/code/' +  _getRefID;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log(data);

      this.updateForm.get('catEng').setValue(this.recordList.faqList[0].facQuestion);
      this.updateForm.get('descEng').setValue(this.recordList.faqList[0].facAnswer);
      this.updateForm.get('active').setValue(this.recordList.faqList[0].faqActiveFlag);

      this.updateForm.get('catMy').setValue(this.recordList.faqList[1].facQuestion);
      this.updateForm.get('descMy').setValue(this.recordList.faqList[1].facAnswer);
      
      this.getFaqCodeEng = this.recordList.faqList[0].faqCode;
      this.getFaqIdEng = this.recordList.faqList[0].faqId;
      
      this.getFaqCodeMy = this.recordList.faqList[1].faqCode;
      this.getFaqIdMy = this.recordList.faqList[1].faqId;

    });
  }

  back(){
    this.router.navigate(['footer/footercategory']);
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

    // add form
    if(urlEdit === 'add'){

      let body = [
        {
          "title": null,
          "description": null,
          "active": false,
          "language": {
              "languageId": null
          }
        },
        {
          "title": null,
          "description": null,
          "active": false,
          "facCode": null,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].title = formValues.catEng;
      body[0].description = formValues.descEng;
      body[0].active = formValues.active;
      body[0].language.languageId = 1;

      body[1].title = formValues.catMy;
      body[1].description = formValues.descMy;
      body[1].active = formValues.active;
      body[1].language.languageId = 2;

      console.log(body);

      this.commonservice.addFaq(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          // alert('Record added successfully!')

          let txt = "Record added successfully!";
          this.toastr.success(txt, '');  

          this.router.navigate(['footer/footercategory']);
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
          "title": null,
          "description": null,
          "active": false,
          "language": {
              "languageId": null
          }
        },
        {
          "title": null,
          "description": null,
          "active": false,
          "facCode": null,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].title = formValues.catEng;
      body[0].description = formValues.descEng;
      body[0].active = formValues.active;
      body[0].language.languageId = 1;

      body[1].title = formValues.catMy;
      body[1].description = formValues.descMy;
      body[1].active = formValues.active;
      body[1].language.languageId = 2;

      console.log(body);

      this.commonservice.updateFaq(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          // alert('Record updated successfully!')

          let txt = "Record updated successfully!";
          this.toastr.success(txt, ''); 

          this.router.navigate(['footer/footercategory']);
          // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        },
        error => {
          console.log("No Data")
          // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["catEng", "catMy", "descEng", "descMy"];
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


