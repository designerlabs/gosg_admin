import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../../config/app.config.module';
import { CommonService } from './../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedbacktype',
  templateUrl: './feedbacktype.component.html',
  styleUrls: ['./feedbacktype.component.css']
})

export class FeedbacktypeComponent implements OnInit {

  updateForm: FormGroup;
  
  public typeEn: FormControl;  
  public typeBm: FormControl;
  public active: FormControl;

  public dataUrl: any;  
  public recordList: any;
 
  public getIdEn: any;
  public getIdBm: any;
  public getRefId: any;

  public complete: boolean;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.typeEn = new FormControl();
    this.typeBm = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      typeEn: this.typeEn,
      typeBm: this.typeBm,
      active: this.active
      
    }); 

    let urlEdit = this.router.url.split('/')[3];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true)
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }

  }

  getData() {

    let _getRefID = this.router.url.split('/')[3];
  
    this.dataUrl = this.appConfig.urlAddressType + '/code/'+_getRefID;

    //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log("data");
      console.log(data);

      this.updateForm.get('typeEn').setValue(this.recordList[0].addressType);
      this.updateForm.get('typeBm').setValue(this.recordList[1].addressType);      
      this.updateForm.get('active').setValue(this.recordList[1].enabled);      

      this.getIdEn = this.recordList[0].addressTypeId;
      this.getIdBm = this.recordList[1].addressTypeId;
      this.getRefId = this.recordList[0].refCode;

      this.checkReqValues();
      
    });
  }

  submit(formValues: any) {
    let urlEdit = this.router.url.split('/')[3];

    // add form
    if(urlEdit === 'add'){

      let body = [
        {
        
          "feedbackTypeDescription": null,
          "active":false,
          "language": {
              "languageId": 2
          }
        },{
          "feedbackTypeDescription": null,
          "active":false,
          "language": {
              "languageId": 1
          }
        }
      ]    


      body[0].feedbackTypeDescription = formValues.typeBm;
      body[0].active = formValues.active;
      body[1].feedbackTypeDescription = formValues.typeEn;
      body[1].active = formValues.active;

      console.log(body)

      this.commonservice.addRecordFeedbackType(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          let txt = "Record added successfully!";
          this.toastr.success(txt, '');  
          this.router.navigate(['feedback/type']);
        },
        error => {
          console.log("No Data")
      });
    }

    // update form
    else{
      let body = [
        {
          "feedbackTypeId":this.getIdBm,
          "feedbackTypeDescription": null,
          "active":false,
          "refCode": this.getRefId,
          "language": {
              "languageId": 2
          }
        },{
          "feedbackTypeId":this.getIdEn,
          "feedbackTypeDescription": null,
          "active":false,
          "refCode": this.getRefId,
          "language": {
              "languageId": 1
          }
        }
      ]        


      body[0].feedbackTypeDescription = formValues.typeBm;
      body[0].active = formValues.active;
      body[1].feedbackTypeDescription = formValues.typeEn;
      body[1].active = formValues.active;
      

      console.log("UPDATE: ");
      console.log(body);

      this.commonservice.updateRecordFeedbackType(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
        
          let txt = "Record updated successfully!";
          this.toastr.success(txt, '');  
          this.router.navigate(['feedback/type']);
        },
        error => {
          console.log("No Data")
      });
    }
    
  }

  checkReqValues() {

    let reqVal:any = ["typeEn", "typeBm"];
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

  back(){
    this.router.navigate(['feedback/type']);
  }
}
