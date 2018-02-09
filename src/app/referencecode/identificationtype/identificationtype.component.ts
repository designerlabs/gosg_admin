// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-identificationtype',
//   templateUrl: './identificationtype.component.html',
//   styleUrls: ['./identificationtype.component.css']
// })
// export class IdentificationtypeComponent implements OnInit {

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
  selector: 'app-identificationtype',
  templateUrl: './identificationtype.component.html',
  styleUrls: ['./identificationtype.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class IdentificationtypeComponent implements OnInit {

  updateForm: FormGroup;
  
  public identificationType: FormControl;

  public userTypeEng: FormControl;  
  public userTypeMy: FormControl;
  public active: FormControl;

  public dataUrl: any;  
  public recordList: any;

  public getIdentificationType: any;

  public getUserTypeIdEng: any;
  public getUserTypeIdMy: any;
  public getRefCodeMy: any;
  public getRefCodeEng: any;
  public getUserTypeActive: any;

  complete: boolean;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.identificationType = new FormControl();
  
    this.userTypeEng = new FormControl();
    this.userTypeMy = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      identificationType: this.identificationType,

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
  }

  getData() {

    let _getRefID = this.router.url.split('/')[3];
    // this.appConfig.urlRaceList
    this.dataUrl = this.appConfig.urlIdentificationTypeList + '/code/' +  _getRefID;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log(data);

      this.updateForm.get('identificationType').setValue(this.recordList.userTypeList[0].identificationType)

      this.updateForm.get('userTypeMy').setValue(this.recordList.userTypeList[0].userType);
      this.updateForm.get('userTypeEng').setValue(this.recordList.userTypeList[1].userType); 
      this.updateForm.get('active').setValue(this.recordList.userTypeList[0].userTypeActiveFlag);
      

      this.getUserTypeIdMy = this.recordList.userTypeList[0].UserTypeId;
      this.getUserTypeIdEng = this.recordList.userTypeList[1].UserTypeeId;
      this.getRefCodeMy = this.recordList.userTypeList[0].userTypeCode;
      this.getRefCodeEng = this.recordList.userTypeList[1].userTypeCode;
      this.getUserTypeActive = this.recordList.userTypeList[0].userTypeActiveFlag;

    });
  }

  back(){
    this.router.navigate(['reference/identificationtype']);
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
          "identificationType": null,
          "identificationTypeActiveFlag": false,
          "language": {
              "languageId": null
          }
        },
        {
          "identificationType": null,
          "identificationTypeActiveFlag": false,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].identificationType = formValues.userTypeMy;
      body[0].language.languageId = 2;
      body[0].identificationTypeActiveFlag = formValues.active;

      body[1].identificationType = formValues.userTypeEng; 
      body[1].language.languageId = 1;
      body[1].identificationTypeActiveFlag = formValues.active;

      console.log(body);

      this.commonservice.addIdentificationType(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          // alert('Record added successfully!')

          let txt = "Record added successfully!";
          this.toastr.success(txt, '');  

          this.router.navigate(['reference/citizentype']);
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
          "identificationType": null,
          "identificationTypeId": null,
          "identificationTypeCode": null,
          "identificationTypeActiveFlag": false,
          "language": {
              "languageId": null
          }
        },
        {
          "identificationType": null,
          "identificationTypeId": null,
          "identificationTypeCode": null,
          "identificationTypeActiveFlag": false,
          "language": {
              "languageId": null
          }
        }
      ]    


      body[0].identificationType = formValues.identificationType;
      body[0].identificationTypeId = this.getUserTypeIdMy;
      body[0].identificationTypeCode = this.getRefCodeMy;
      body[0].language.languageId = 2;
      body[0].identificationTypeActiveFlag = formValues.active;

      body[1].identificationType = formValues.userTypeEng; 
      body[1].identificationTypeId = this.getUserTypeIdEng; 
      body[1].identificationTypeCode = this.getRefCodeEng; 
      body[1].language.languageId = 1;
      body[1].identificationTypeActiveFlag = formValues.active;

      console.log(body);

      this.commonservice.updateUserType(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          // alert('Record updated successfully!')

          let txt = "Record updated successfully!";
          this.toastr.success(txt, ''); 

          this.router.navigate(['reference/citizentype']);
          // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        },
        error => {
          console.log("No Data")
          // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
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
