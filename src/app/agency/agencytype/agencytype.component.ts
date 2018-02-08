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
  agencyTypeIdEn:any;
  agencyTypeIdBm:any;

  agencyTypeNameEn: FormControl
  agencyTypeNameBm: FormControl
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

    this.agencyTypeNameEn = new FormControl()
    this.agencyTypeNameBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()

    this.agencyTypeForm = new FormGroup({
      agencyTypeNameEn: this.agencyTypeNameEn,
      descEn: this.descEn,
      agencyTypeNameBm: this.agencyTypeNameBm,
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
        let dataEn = this.AgencyTypeData['agencyTypeList'][0];
        let dataBm = this.AgencyTypeData['agencyTypeList'][1];

      // populate data
      this.agencyTypeForm.get('agencyTypeNameEn').setValue(dataEn.agencyTypeName);
      this.agencyTypeForm.get('descEn').setValue(dataEn.agencyTypeDescription);
      this.agencyTypeForm.get('agencyTypeNameBm').setValue(dataBm.agencyTypeName);
      this.agencyTypeForm.get('descBm').setValue(dataBm.agencyTypeDescription);
      this.refCode = dataEn.agencyTypeCode;
      this.agencyTypeIdEn = dataEn.agencyTypeId;
      this.agencyTypeIdBm = dataBm.agencyTypeId;

      this.checkReqValues();
    });
    
  }

  checkReqValues() {

    let agencyTypeNameEn = "agencyTypeNameEn";
    let descEn = "descEn";
    let agencyTypeNameBm = "agencyTypeNameBm";
    let descBm = "descBm";

    let reqVal: any = [agencyTypeNameEn, descEn, agencyTypeNameBm, descBm];
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
      this.agencyTypeForm.get('active').setValue(true);
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
        "agencyTypeName": null,
        "agencyTypeDescription": null,
        "language": {
          "languageId": 1
        }
      }, 
      {
        "agencyTypeName": null,
        "agencyTypeDescription": null,
        "language": {
          "languageId": 2
        }
      }
    ];
    
    // console.log(formValues)

    body[0].agencyTypeName = formValues.agencyTypeNameEn;
    body[0].agencyTypeDescription = formValues.descEn;

    body[1].agencyTypeName = formValues.agencyTypeNameBm;
    body[1].agencyTypeDescription = formValues.descBm;

    console.log(body)

    // Add ErrorMsg Service
    this.commonservice.addAgencyType(body).subscribe(
      data => {
        this.toastr.success('Agency Type added successfully!', ''); 
        this.router.navigate(['agencytype']);
      },
      error => {
        console.log("No Data")
      });

    } else {
      
    let body = [
      {
        "agencyTypeId": null,
        "agencyTypeName": null,
        "agencyTypeCode": null,
        "agencyTypeDescription": null,
        "language": {
          "languageId": 1
        }
      }, 
      {
        "agencyTypeId": null,
        "agencyTypeName": null,
        "agencyTypeCode": null,
        "agencyTypeDescription": null,
        "language": {
          "languageId": 2
        }
      }
    ];
      
    body[0].agencyTypeCode = this.refCode;
    body[0].agencyTypeId = this.agencyTypeIdEn;
    body[0].agencyTypeName = formValues.agencyTypeNameEn;
    body[0].agencyTypeDescription = formValues.descEn;
    
    body[1].agencyTypeCode = this.refCode;
    body[1].agencyTypeId = this.agencyTypeIdBm;
    body[1].agencyTypeName = formValues.agencyTypeNameBm;
    body[1].agencyTypeDescription = formValues.descBm;

    console.log(body);

    // Update ErrorMsg Service
    // this.commonservice.updateAgencyType(body).subscribe(
    //   data => {
    //     this.toastr.success('Agency Type update successful!', '');   
    //     this.router.navigate(['agencytype']);
    //   },
    //   error => {
    //     console.log("No Data")
    //   });
    }
    

  }

}
