import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agencyapptype',
  templateUrl: './agencyapptype.component.html',
  styleUrls: ['./agencyapptype.component.css']
})
export class AgencyapptypeComponent implements OnInit {
  
  AgencyAppTypeData: Object;
  AgencyTypeData: Object;
  dataUrl: any;
  date = new Date();
  agencyAppTypeForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  refCode:any;
  agencyAppTypeIdEn:any;
  agencyAppTypeIdBm:any;

  agencyAppTypeNameEn: FormControl
  agencyAppTypeNameBm: FormControl
  descEn: FormControl
  descBm: FormControl
  agencyTypeId: FormControl
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

    this.agencyAppTypeNameEn = new FormControl()
    this.agencyAppTypeNameBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.agencyTypeId = new FormControl()

    this.agencyAppTypeForm = new FormGroup({
      agencyAppTypeNameEn: this.agencyAppTypeNameEn,
      descEn: this.descEn,
      agencyAppTypeNameBm: this.agencyAppTypeNameBm,
      descBm: this.descBm,
      agencyTypeId: this.agencyTypeId,
    });
    this.getAgencyType();

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
    this.router.navigate(['agencyapptype']);
  }

  // get, add, update, delete
  getRow(row) {

    // Update ErrorMsg Service
    return this.http.get(this.appConfig.urlAgencyAppType + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgencyAppType + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgencyAppType + row + "/").subscribe(
      Rdata => {

        this.AgencyAppTypeData = Rdata;
        // console.log(JSON.stringify(this.AgencyAppTypeData))
        console.log(this.AgencyAppTypeData)
        let dataEn = this.AgencyAppTypeData['agencyTypeList'][0];
        let dataBm = this.AgencyAppTypeData['agencyTypeList'][1];

      // populate data
      this.agencyAppTypeForm.get('agencyAppTypeNameEn').setValue(dataEn.agencyApplicationTypeName);
      this.agencyAppTypeForm.get('descEn').setValue(dataEn.agencyApplicationTypeDescription);
      this.agencyAppTypeForm.get('agencyAppTypeNameBm').setValue(dataBm.agencyApplicationTypeName);
      this.agencyAppTypeForm.get('descBm').setValue(dataBm.agencyApplicationTypeDescription);
      this.agencyAppTypeForm.get('agencyTypeId').setValue(dataBm.agencyType.agencyTypeId);
      this.refCode = dataEn.agencyApplicationTypeCode;
      this.agencyAppTypeIdEn = dataEn.agencyApplicationTypeId;
      this.agencyAppTypeIdBm = dataBm.agencyApplicationTypeId;

      this.checkReqValues();
    });
    
  }

  getAgencyType() {
    return this.http.get(this.appConfig.urlAgencyType + '/code').subscribe(
      // return this.http.get(this.appConfig.urlAgencyAppType + '/code/' + row).subscribe(
      // return this.http.get(this.appConfig.urlAgencyAppType + row + "/").subscribe(
        Rdata => {
  
          this.AgencyTypeData = Rdata['list'];
          // console.log(JSON.stringify(this.AgencyAppTypeData))
          console.log(this.AgencyTypeData)
      });
  }

  checkReqValues() {

    let agencyAppTypeNameEn = "agencyAppTypeNameEn";
    let descEn = "descEn";
    let agencyAppTypeNameBm = "agencyAppTypeNameBm";
    let descBm = "descBm";
    let agencyTypeId = "agencyTypeId";

    let reqVal: any = [agencyAppTypeNameEn, descEn, agencyAppTypeNameBm, descBm, agencyTypeId];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.agencyAppTypeForm.get(reqData);

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
      this.agencyAppTypeForm.reset();
      this.agencyAppTypeForm.get('active').setValue(true);
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

      // this.agencyAppTypeForm.reset();
    } else {
      txt = "Delete Cancelled!";
      alert(txt)
    }
  }
  
  updateAgencyAppType(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "agencyApplicationTypeName": null,
        "agencyApplicationTypeDescription": null,
        "agencyTypeCode": null
      }, 
      {
        "agencyApplicationTypeName": null,
        "agencyApplicationTypeDescription": null,
        "agencyTypeCode": null
      }
    ];
    
    // console.log(formValues)

    body[0].agencyApplicationTypeName = formValues.agencyAppTypeNameEn;
    body[0].agencyApplicationTypeDescription = formValues.descEn;
    body[0].agencyTypeCode = formValues.agencyTypeId;

    body[1].agencyApplicationTypeName = formValues.agencyAppTypeNameBm;
    body[1].agencyApplicationTypeDescription = formValues.descBm;
    body[1].agencyTypeCode = formValues.agencyTypeId;

    console.log(body)

    // Add ErrorMsg Service
    // this.commonservice.addAgencyType(body).subscribe(
    //   data => {
    //     this.toastr.success('Agency Type added successfully!', ''); 
    //     this.router.navigate(['agencyapptype']);
    //   },
    //   error => {
    //     console.log("No Data")
    //   });

    } else {
      
    let body = [
      {
        "agencyApplicationTypeId": null,
        "agencyApplicationTypeName": null,
        "agencyApplicationTypeCode": null,
        "agencyApplicationTypeDescription": null,
        "agencyTypeCode": null
      }, 
      {
        "agencyApplicationTypeId": null,
        "agencyApplicationTypeName": null,
        "agencyApplicationTypeCode": null,
        "agencyApplicationTypeDescription": null,
        "agencyTypeCode": null
      }
    ];
      
    body[0].agencyApplicationTypeCode = this.refCode;
    body[0].agencyApplicationTypeId = this.agencyAppTypeIdEn;
    body[0].agencyApplicationTypeName = formValues.agencyAppTypeNameEn;
    body[0].agencyApplicationTypeDescription = formValues.descEn;
    body[0].agencyTypeCode = formValues.agencyTypeId;
    
    body[1].agencyApplicationTypeCode = this.refCode;
    body[1].agencyApplicationTypeId = this.agencyAppTypeIdBm;
    body[1].agencyApplicationTypeName = formValues.agencyAppTypeNameBm;
    body[1].agencyApplicationTypeDescription = formValues.descBm;
    body[0].agencyTypeCode = formValues.agencyTypeId;

    console.log(body);

    // Update ErrorMsg Service
    // this.commonservice.updateAgencyType(body).subscribe(
    //   data => {
    //     this.toastr.success('Agency Type update successful!', '');   
    //     this.router.navigate(['agencyapptype']);
    //   },
    //   error => {
    //     console.log("No Data")
    //   });
    }
    

  }

}
