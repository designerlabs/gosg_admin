import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-errormessage',
  templateUrl: './errormessage.component.html',
  styleUrls: ['./errormessage.component.css']
})
export class ErrormessageComponent implements OnInit {
  
  ErrorMsgData: Object;
  dataUrl: any;
  date = new Date();
  errorMsgForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  refMessageCode:any;
  msgIdEn:any;
  msgIdBm:any;

  msgCodeEn: FormControl
  msgCodeBm: FormControl
  descEn: FormControl
  descBm: FormControl
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

    let refMessageCode = this.router.url.split('/')[2];

    this.msgCodeEn = new FormControl()
    this.msgCodeBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()

    this.errorMsgForm = new FormGroup({
      msgCodeEn: this.msgCodeEn,
      descEn: this.descEn,
      msgCodeBm: this.msgCodeBm,
      descBm: this.descBm,
    });

    if(refMessageCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refMessageCode);
    }
  }

  ngAfterViewInit() {
  }

  back(){
    this.router.navigate(['errormessage']);
  }

  // get, add, update, delete
  getRow(row) {

    // Update ErrorMsg Service
    return this.http.get(this.appConfig.urlErrorMsg + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlErrorMsg + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlErrorMsg + row + "/").subscribe(
      Rdata => {

        this.ErrorMsgData = Rdata;
        // console.log(JSON.stringify(this.ErrorMsgData))
        console.log(this.ErrorMsgData)
        let dataEn = this.ErrorMsgData['resourceList'][0];
        let dataBm = this.ErrorMsgData['resourceList'][1];

      // populate data
      this.errorMsgForm.get('msgCodeEn').setValue(dataEn.messagesCode);
      this.errorMsgForm.get('descEn').setValue(dataEn.messagesDescription);
      this.errorMsgForm.get('msgCodeBm').setValue(dataBm.messagesCode);
      this.errorMsgForm.get('descBm').setValue(dataBm.messagesDescription);
      this.refMessageCode = dataEn.refMessageCode;
      this.msgIdEn = dataEn.messagesId;
      this.msgIdBm = dataBm.messagesId;

      this.checkReqValues();
    });
    
  }

  checkReqValues() {

    let msgCodeEn = "msgCodeEn";
    let descEn = "descEn";
    let msgCodeBm = "msgCodeBm";
    let descBm = "descBm";

    let reqVal: any = [msgCodeEn, descEn, msgCodeBm, descBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.errorMsgForm.get(reqData);

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

  copyValue(type) {
    let elemOne = this.errorMsgForm.get('msgCodeEn');
    let elemTwo = this.errorMsgForm.get('msgCodeBm');

    if(type == 1)
      elemTwo.setValue(elemOne.value)
    else
      elemOne.setValue(elemTwo.value)

  }



  myFunction() {
    let txt;
    let r = confirm("Are you sure to reset the form?");
    if (r == true) {
      txt = "You pressed OK!";
      this.errorMsgForm.reset();
      this.checkReqValues();
    } else {
      txt = "You pressed Cancel!";
    }
  }

  deleteRow(refCode) {
    let txt;
    let r = confirm("Are you sure to delete " + refCode + "?");
    if (r == true) {

      this.commonservice.delErrorMsg(refCode).subscribe(
        data => {
          txt = "ErrorMsg deleted successfully!";
          // this.router.navigate(['ErrorMsg']);
          window.location.reload()
        },
        error => {
          console.log("No Data")
        });

      // this.errorMsgForm.reset();
    } else {
      txt = "Delete Cancelled!";
      alert(txt)
    }
  }
  
  updateErrorMsg(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "messagesId": null,
        "messagesCode": null,
        "messagesDescription": null,
        "refMessageCode": null,
        "language": {
          "languageId": 1
        }
      }, 
      {
        "messagesId": null,
        "messagesCode": null,
        "messagesDescription": null,
        "refMessageCode": null,
        "language": {
          "languageId": 2
        }
      }
    ];
    
    // console.log(formValues)

    body[0].messagesCode = formValues.msgCodeEn;
    body[0].messagesDescription = formValues.descEn;

    body[1].messagesCode = formValues.msgCodeBm;
    body[1].messagesDescription = formValues.descBm;

    console.log(body)

    // Add ErrorMsg Service
    this.commonservice.addErrorMsg(body).subscribe(
      data => {
        this.toastr.success('ErrorMsg added successfully!', ''); 
        this.router.navigate(['errormessage']);
      },
      error => {
        console.log("No Data")
      });

    } else {
      
    let body = [
      {
        "messagesId": null,
        "messagesCode": null,
        "messagesDescription": null,
        "refMessageCode": null,
        "language": {
          "languageId": 1
        }
      }, 
      {
        "messagesId": null,
        "messagesCode": null,
        "messagesDescription": null,
        "refMessageCode": null,
        "language": {
          "languageId": 2
        }
      }
    ];
      
    body[0].refMessageCode = this.refMessageCode;
    body[0].messagesId = this.msgIdEn;
    body[0].messagesCode = formValues.msgCodeEn;
    body[0].messagesDescription = formValues.descEn;
    
    body[1].refMessageCode = this.refMessageCode;
    body[1].messagesId = this.msgIdBm;
    body[1].messagesCode = formValues.msgCodeBm;
    body[1].messagesDescription = formValues.descBm;

    console.log(body);

    // Update ErrorMsg Service
    this.commonservice.updateErrorMsg(body).subscribe(
      data => {
        this.toastr.success('ErrorMsg update successful!', '');   
        this.router.navigate(['errormessage']);
      },
      error => {
        console.log("No Data")
      });
    }
    

  }

}
