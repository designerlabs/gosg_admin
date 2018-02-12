import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ministry',
  templateUrl: './ministry.component.html',
  styleUrls: ['./ministry.component.css']
})
export class MinistryComponent implements OnInit {
  
  AgencyData: Object;
  dataUrl: any;
  date = new Date();
  ministryForm: FormGroup
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
  active: FormControl
  address: FormControl
  email: FormControl
  faxno: FormControl
  phoneno: FormControl
  agclat: FormControl
  agclong: FormControl
  contactperson: FormControl
  websiteUrl: FormControl
  rssUrl: FormControl
  blogUrl: FormControl
  fbUrl: FormControl
  flickrUrl: FormControl
  instagramUrl: FormControl
  twitterUrl: FormControl
  youtubeUrl: FormControl
  // mdecStatus: FormControl

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
    this.active = new FormControl()
    this.address = new FormControl()
    this.agclat = new FormControl()
    this.agclong = new FormControl()
    this.phoneno = new FormControl()
    this.faxno = new FormControl()
    this.email = new FormControl()
    this.contactperson = new FormControl()
    this.websiteUrl = new FormControl()
    this.rssUrl = new FormControl()
    this.blogUrl = new FormControl()
    this.fbUrl = new FormControl()
    this.youtubeUrl = new FormControl()
    this.instagramUrl = new FormControl()
    this.twitterUrl = new FormControl()
    this.flickrUrl = new FormControl()

    this.ministryForm = new FormGroup({
      agencyNameEn: this.agencyNameEn,
      descEn: this.descEn,
      agencyNameBm: this.agencyNameBm,
      descBm: this.descBm,
      address: this.address,
      agclat: this.agclat,
      agclong: this.agclong,
      phoneno: this.phoneno,
      faxno: this.faxno,
      email: this.email,
      contactperson: this.contactperson,
      websiteUrl: this.websiteUrl,
      rssUrl: this.rssUrl,
      blogUrl: this.blogUrl,
      fbUrl: this.fbUrl,
      youtubeUrl: this.youtubeUrl,
      instagramUrl: this.instagramUrl,
      twitterUrl: this.twitterUrl,
      flickrUrl: this.flickrUrl,
      active: this.active
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
    this.router.navigate(['agency']);
  }

  // get, add, update, delete
  getRow(row) {

    // Update ErrorMsg Service
    return this.http.get(this.appConfig.urlAgency + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgency + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgency + row + "/").subscribe(
      Rdata => {

        this.AgencyData = Rdata;
        // console.log(JSON.stringify(this.AgencyData))
        console.log(this.AgencyData)
        let dataEn = this.AgencyData['agencyList'][0];
        let dataBm = this.AgencyData['agencyList'][1];

      // populate data
      this.ministryForm.get('agencyNameEn').setValue(dataEn.agencyName);
      this.ministryForm.get('descEn').setValue(dataEn.agencyDescription);
      this.ministryForm.get('agencyNameBm').setValue(dataBm.agencyName);
      this.ministryForm.get('descBm').setValue(dataBm.agencyDescription);
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
      let elem = this.ministryForm.get(reqData);

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
      this.ministryForm.reset();
      this.checkReqValues();
    } else {
      txt = "You pressed Cancel!";
    }
  }

  deleteRow(refCode) {
    let txt;
    let r = confirm("Are you sure to delete " + refCode + "?");
    if (r == true) {

      this.commonservice.delAgency(refCode).subscribe(
        data => {
          txt = "ErrorMsg deleted successfully!";
          // this.router.navigate(['ErrorMsg']);
        },
        error => {
          console.log("No Data")
        });

      // this.ministryForm.reset();
    } else {
      txt = "Delete Cancelled!";
      alert(txt)
    }
  }
  
  updateAction(formValues: any) {
    
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
    
    console.log(formValues)

    body[0].agencyName = formValues.agencyNameEn;
    body[0].agencyDescription = formValues.descEn;

    body[1].agencyName = formValues.agencyNameBm;
    body[1].agencyDescription = formValues.descBm;

    console.log(body)

    // Add ErrorMsg Service
    // this.commonservice.addAgency(body).subscribe(
    //   data => {
    //     this.toastr.success('Agency added successfully!', ''); 
    //     this.router.navigate(['agency']);
    //   },
    //   error => {
    //     console.log("No Data")
    //   });

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
    // this.commonservice.updateAgency(body).subscribe(
    //   data => {
    //     this.toastr.success('Agency update successful!', '');   
    //     this.router.navigate(['agency']);
    //   },
    //   error => {
    //     console.log("No Data")
    //   });
    }
    

  }

}
