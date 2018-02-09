import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agencytype',
  templateUrl: './agencytype.component.html',
  styleUrls: ['./agencytype.component.css']
})
export class AgencytypeComponent implements OnInit {
  
  AgencyTypeData: Object;
  dataUrl: any;
  date = new Date();
  agencyTypeForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  refCode:any;
  agencyIdEn:any;
  agencyIdBm:any;

  agencyNameEn: FormControl
  agencyNameBm: FormControl
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

    let refCode = this.router.url.split('/')[2];

    this.agencyNameEn = new FormControl()
    this.agencyNameBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()

    this.agencyTypeForm = new FormGroup({
      agencyNameEn: this.agencyNameEn,
      descEn: this.descEn,
      agencyNameBm: this.agencyNameBm,
      descBm: this.descBm,
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }
  }

  ngAfterViewInit() {
  }

  back(){
    this.router.navigate(['agencytype']);
  }

  // get, add, update, delete
  getRow(row) {

    // Update ErrorMsg Service
    return this.http.get(this.appConfig.urlAgencyType + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgencyType + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgencyType + row + "/").subscribe(
      Rdata => {

        this.AgencyTypeData = Rdata;
        // console.log(JSON.stringify(this.AgencyTypeData))
        console.log(this.AgencyTypeData)
        let dataEn = this.AgencyTypeData['agencyList'][0];
        let dataBm = this.AgencyTypeData['agencyList'][1];

      // populate data
      this.agencyTypeForm.get('agencyNameEn').setValue(dataEn.agencyName);
      this.agencyTypeForm.get('descEn').setValue(dataEn.agencyDescription);
      this.agencyTypeForm.get('agencyNameBm').setValue(dataBm.agencyName);
      this.agencyTypeForm.get('descBm').setValue(dataBm.agencyDescription);
      this.refCode = dataEn.agencyCode;
      this.agencyIdEn = dataEn.agencyId;
      this.agencyIdBm = dataBm.agencyId;

      this.checkReqValues();
    });
    
  }

  checkReqValues() {

    let agencyNameEn = "agencyNameEn";
    let descEn = "descEn";
    let agencyNameBm = "agencyNameBm";
    let descBm = "descBm";

    let reqVal: any = [agencyNameEn, descEn, agencyNameBm, descBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.agencyTypeForm.get(reqData);

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
      this.agencyTypeForm.reset();
      this.checkReqValues();
    } else {
      txt = "You pressed Cancel!";
    }
  }

  deleteRow(refCode) {
    let txt;
    let r = confirm("Are you sure to delete " + refCode + "?");
    if (r == true) {

      this.commonservice.delAgencyType(refCode).subscribe(
        data => {
          txt = "ErrorMsg deleted successfully!";
          // this.router.navigate(['ErrorMsg']);
        },
        error => {
          console.log("No Data")
        });

      // this.agencyTypeForm.reset();
    } else {
      txt = "Delete Cancelled!";
      alert(txt)
    }
  }
  
  updateActionType(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "agencyName": null,
        "agencyDescription": null,
        "language": {
          "languageId": 1
        }
      }, 
      {
        "agencyName": null,
        "agencyDescription": null,
        "language": {
          "languageId": 2
        }
      }
    ];
    
    // console.log(formValues)

    body[0].agencyName = formValues.agencyNameEn;
    body[0].agencyDescription = formValues.descEn;

    body[1].agencyName = formValues.agencyNameBm;
    body[1].agencyDescription = formValues.descBm;

    console.log(body)

    // Add ErrorMsg Service
    this.commonservice.addAgencyType(body).subscribe(
      data => {
        this.toastr.success('Agency added successfully!', ''); 
        this.router.navigate(['agencytype']);
      },
      error => {
        console.log("No Data")
      });

    } else {
      
    let body = [
      {
        "agencyId": null,
        "agencyName": null,
        "agencyCode": null,
        "agencyDescription": null,
        "language": {
          "languageId": 1
        }
      }, 
      {
        "agencyId": null,
        "agencyName": null,
        "agencyCode": null,
        "agencyDescription": null,
        "language": {
          "languageId": 2
        }
      }
    ];
      
    body[0].agencyCode = this.refCode;
    body[0].agencyId = this.agencyIdEn;
    body[0].agencyName = formValues.agencyNameEn;
    body[0].agencyDescription = formValues.descEn;
    
    body[1].agencyCode = this.refCode;
    body[1].agencyId = this.agencyIdBm;
    body[1].agencyName = formValues.agencyNameBm;
    body[1].agencyDescription = formValues.descBm;

    console.log(body);

    // Update ErrorMsg Service
    this.commonservice.updateAgencyType(body).subscribe(
      data => {
        this.toastr.success('Agency update successful!', '');   
        this.router.navigate(['agencytype']);
      },
      error => {
        console.log("No Data")
      });
    }
    

  }

}
