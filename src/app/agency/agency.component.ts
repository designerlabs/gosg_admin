import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidateService } from '../common/validate.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
  patternEmail: string;
  maskPhoneNo: (string | RegExp)[];
  maskFaxNo: (string | RegExp)[];
  
  searchMinistryResult: Object;
  isActiveList: boolean;
  isActive: boolean;
  closeUserBtn: boolean;
  addUserBtn: boolean;
  animateClass: string;
  showUserInput: boolean;
  showIC: boolean;
  showEmail: boolean;
  
  AgencyTypeData: Object;
  dataUrl: any;
  date = new Date();
  agencyForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  refCode:any;
  agencyIdEn:any;
  agencyIdBm:any;
  ministryId:any;

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
  mdecStatus: FormControl
  ministry: FormControl

  resetMsg = this.resetMsg;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private validateService: ValidateService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 

    let refCode = this.router.url.split('/')[2];
    this.maskPhoneNo = this.validateService.getMask().telephone;
    this.maskFaxNo = this.validateService.getMask().fax;

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
    this.email = new FormControl('', [Validators.pattern(this.validateService.getPattern().email)])
    this.contactperson = new FormControl()
    this.websiteUrl = new FormControl()
    this.rssUrl = new FormControl()
    this.blogUrl = new FormControl()
    this.fbUrl = new FormControl()
    this.youtubeUrl = new FormControl()
    this.instagramUrl = new FormControl()
    this.twitterUrl = new FormControl()
    this.flickrUrl = new FormControl()
    this.mdecStatus = new FormControl()
    this.ministry = new FormControl()

    this.agencyForm = new FormGroup({
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
      active: this.active,
      mdecStatus: this.mdecStatus,
      ministry: this.ministry
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
    this.maskPhoneNo = this.validateService.getMask().telephone;
    this.maskFaxNo = this.validateService.getMask().fax;
  }

  back(){
    this.router.navigate(['agency']);
  }

  // get, add, update, delete
  getRow(row) {

    // Update ErrorMsg Service
    return this.http.get(this.appConfig.urlAgency + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgencyType + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgencyType + row + "/").subscribe(
      Rdata => {

        this.AgencyTypeData = Rdata;
        // console.log(JSON.stringify(this.AgencyTypeData))
        console.log(this.AgencyTypeData)
        let dataEn = this.AgencyTypeData['agencyList'][0];
        let dataBm = this.AgencyTypeData['agencyList'][1];
        
        // populate data
        this.agencyForm.get('agencyNameEn').setValue(dataEn.agencyName);
        this.agencyForm.get('descEn').setValue(dataEn.agencyDescription);
        this.agencyForm.get('agencyNameBm').setValue(dataBm.agencyName);
        this.agencyForm.get('descBm').setValue(dataBm.agencyDescription);
        this.agencyForm.get('ministry').setValue(dataBm.agencyMinistry.ministryName);
        this.agencyForm.get('active').setValue(dataBm.agencyStatus);
        this.agencyForm.get('address').setValue(dataBm.agencyAddress);
        this.agencyForm.get('agclat').setValue(dataBm.agencyLatitude);
        this.agencyForm.get('agclong').setValue(dataBm.agencyLongitude);
        this.agencyForm.get('phoneno').setValue(dataBm.agencyPhone);
        this.agencyForm.get('faxno').setValue(dataBm.agencyFax);
        this.agencyForm.get('email').setValue(dataBm.agencyEmail);
        this.agencyForm.get('contactperson').setValue(dataBm.agencyContactPerson);
        this.agencyForm.get('websiteUrl').setValue(dataBm.agencyWebsiteUrl);
        this.agencyForm.get('rssUrl').setValue(dataBm.agencyRss);
        this.agencyForm.get('youtubeUrl').setValue(dataBm.agencyYoutube);
        this.agencyForm.get('twitterUrl').setValue(dataBm.agencyTwitter);
        this.agencyForm.get('flickrUrl').setValue(dataBm.agencyFlickr);
        this.agencyForm.get('blogUrl').setValue(dataBm.agencyBlog);
        this.agencyForm.get('instagramUrl').setValue(dataBm.agencyInstagram);
        this.agencyForm.get('fbUrl').setValue(dataBm.agencyFacebook);
        this.agencyForm.get('mdecStatus').setValue(dataBm.agencyMdecStatus);
        this.refCode = dataEn.agencyCode;
        this.agencyIdEn = dataEn.agencyId;
        this.agencyIdBm = dataBm.agencyId;
        this.ministryId = dataBm.agencyMinistry.ministryId;

      this.checkReqValues();
    });
    
  }

  getSearchData(keyword){
    this.isActive = true;
    this.isActiveList = true;
    // debugger;
    if(!keyword){
      keyword = '-';
    }

    if(keyword != "") {
      this.http.get(
        this.appConfig.urlSearchbyMinistry+keyword.value+'?language=1').subscribe(
        data => {
          // debugger;
        this.searchMinistryResult = data['ministryList'];
        console.log(this.searchMinistryResult)
      });
    }
  }
  
  getValue(mId,mName){
    // console.log(val)
    this.ministryId = this.agencyForm.get('ministry').value;
    this.isActive = false;
    this.isActiveList = false;
    this.searchMinistryResult = [''];
    this.agencyForm.get('ministry').setValue(mName);
    this.ministryId = mId;
  }

  checkReqValues() {

    let agencyNameEn = "agencyNameEn";
    let descEn = "descEn";
    let agencyNameBm = "agencyNameBm";
    let descBm = "descBm";

    let reqVal: any = [agencyNameEn, descEn, agencyNameBm, descBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.agencyForm.get(reqData);

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
      this.agencyForm.reset();
      this.checkReqValues();
    } else {
      txt = "You pressed Cancel!";
    }
  }

  validateCtrlChk(ctrl: FormControl) {
      // return ctrl.valid || ctrl.untouched
      return this.validateService.validateCtrl(ctrl);
  }
  
  updateAction(formValues: any) {
    
    if(!this.isEdit) {

      let body = [
        {
          "agencyName": null,
          "agencyDescription": null,
          "agencyAddress": null,
          "agencyLatitude": null,
          "agencyLongitude": null,
          "agencyPhoneNo": null,
          "agencyFax": null,
          "agencyEmail": null,
          "agencyStatus": null,
          "agencyBlog": null,
          "agencyContactPerson": null,
          "agencyFacebook": null,
          "agencyFlickr": null,
          "agencyInstagram": null,
          "agencyMdecStatus": null,
          "agencyRss": null,
          "agencyTwitter": null,
          "agencyWebsiteUrl": null,
          "agencyYoutube": null,
          "language": {
            "languageId": 1
          },
          "agencyMinistry": {
            "ministryId": null
          }
        }, 
        {
          "agencyName": null,
          "agencyDescription": null,
          "agencyAddress": null,
          "agencyLatitude": null,
          "agencyLongitude": null,
          "agencyPhoneNo": null,
          "agencyFax": null,
          "agencyEmail": null,
          "agencyStatus": null,
          "agencyBlog": null,
          "agencyContactPerson": null,
          "agencyFacebook": null,
          "agencyFlickr": null,
          "agencyInstagram": null,
          "agencyMdecStatus": null,
          "agencyRss": null,
          "agencyTwitter": null,
          "agencyWebsiteUrl": null,
          "agencyYoutube": null,
          "language": {
            "languageId": 2
          },
          "agencyMinistry": {
            "ministryId": null
          }
        }
      ];
    
      // console.log(formValues)
  
      body[0].agencyName = formValues.agencyNameEn;
      body[0].agencyDescription = formValues.descEn;
      body[0].agencyAddress = formValues.address;
      body[0].agencyLatitude = formValues.agclat;
      body[0].agencyLongitude = formValues.agclong;
      body[0].agencyPhoneNo = formValues.phoneno;
      body[0].agencyFax = formValues.faxno;
      body[0].agencyEmail = formValues.email;
      body[0].agencyStatus = formValues.active;
      body[0].agencyBlog = formValues.blogUrl;
      body[0].agencyContactPerson = formValues.contactperson;
      body[0].agencyFacebook = formValues.fbUrl;
      body[0].agencyFlickr = formValues.flickrUrl;
      body[0].agencyInstagram = formValues.instagramUrl;
      body[0].agencyMdecStatus = formValues.mdecStatus;
      body[0].agencyRss = formValues.rssUrl;
      body[0].agencyTwitter = formValues.twitterUrl;
      body[0].agencyWebsiteUrl = formValues.websiteUrl;
      body[0].agencyYoutube = formValues.youtubeUrl;
      body[0].agencyMinistry.ministryId = this.ministryId;
  
      body[1].agencyName = formValues.agencyNameEn;
      body[1].agencyDescription = formValues.descEn;
      body[1].agencyAddress = formValues.address;
      body[1].agencyLatitude = formValues.agclat;
      body[1].agencyLongitude = formValues.agclong;
      body[1].agencyPhoneNo = formValues.phoneno;
      body[1].agencyFax = formValues.faxno;
      body[1].agencyEmail = formValues.email;
      body[1].agencyStatus = formValues.active;
      body[1].agencyBlog = formValues.blogUrl;
      body[1].agencyContactPerson = formValues.contactperson;
      body[1].agencyFacebook = formValues.fbUrl;
      body[1].agencyFlickr = formValues.flickrUrl;
      body[1].agencyInstagram = formValues.instagramUrl;
      body[1].agencyMdecStatus = formValues.mdecStatus;
      body[1].agencyRss = formValues.rssUrl;
      body[1].agencyTwitter = formValues.twitterUrl;
      body[1].agencyWebsiteUrl = formValues.websiteUrl;
      body[1].agencyYoutube = formValues.youtubeUrl;
      body[1].agencyMinistry.ministryId = this.ministryId;
  
      console.log(body)

    // Add ErrorMsg Service
    this.commonservice.addAgency(body).subscribe(
      data => {
        this.toastr.success('Agency added successfully!', ''); 
        this.router.navigate(['agency']);
      },
      error => {
        console.log("No Data")
      });

    } else {
      
    let body = [
      {
        "agencyId": null,
        "agencyCode": null,
        "agencyName": null,
        "agencyDescription": null,
        "agencyAddress": null,
        "agencyLatitude": null,
        "agencyLongitude": null,
        "agencyPhoneNo": null,
        "agencyFax": null,
        "agencyEmail": null,
        "agencyStatus": null,
        "agencyBlog": null,
        "agencyContactPerson": null,
        "agencyFacebook": null,
        "agencyFlickr": null,
        "agencyInstagram": null,
        "agencyMdecStatus": null,
        "agencyRss": null,
        "agencyTwitter": null,
        "agencyWebsiteUrl": null,
        "agencyYoutube": null,
        "language": {
          "languageId": 1
        },
        "agencyMinistry": {
          "ministryId": null
        }
      }, 
      {
        "agencyId": null,
        "agencyCode": null,
        "agencyName": null,
        "agencyDescription": null,
        "agencyAddress": null,
        "agencyLatitude": null,
        "agencyLongitude": null,
        "agencyPhoneNo": null,
        "agencyFax": null,
        "agencyEmail": null,
        "agencyStatus": null,
        "agencyBlog": null,
        "agencyContactPerson": null,
        "agencyFacebook": null,
        "agencyFlickr": null,
        "agencyInstagram": null,
        "agencyMdecStatus": null,
        "agencyRss": null,
        "agencyTwitter": null,
        "agencyWebsiteUrl": null,
        "agencyYoutube": null,
        "language": {
          "languageId": 2
        },
        "agencyMinistry": {
          "ministryId": null
        }
      }
    ];
  
    body[0].agencyId = this.agencyIdEn;
    body[0].agencyCode = this.refCode;
    body[0].agencyName = formValues.agencyNameEn;
    body[0].agencyDescription = formValues.descEn;
    body[0].agencyAddress = formValues.address;
    body[0].agencyLatitude = formValues.agclat;
    body[0].agencyLongitude = formValues.agclong;
    body[0].agencyPhoneNo = formValues.phoneno;
    body[0].agencyFax = formValues.faxno;
    body[0].agencyEmail = formValues.email;
    body[0].agencyStatus = formValues.active;
    body[0].agencyBlog = formValues.blogUrl;
    body[0].agencyContactPerson = formValues.contactperson;
    body[0].agencyFacebook = formValues.fbUrl;
    body[0].agencyFlickr = formValues.flickrUrl;
    body[0].agencyInstagram = formValues.instagramUrl;
    body[0].agencyMdecStatus = formValues.mdecStatus;
    body[0].agencyRss = formValues.rssUrl;
    body[0].agencyTwitter = formValues.twitterUrl;
    body[0].agencyWebsiteUrl = formValues.websiteUrl;
    body[0].agencyYoutube = formValues.youtubeUrl;
    body[0].agencyMinistry.ministryId = this.ministryId;

    body[1].agencyId = this.agencyIdBm;
    body[1].agencyCode = this.refCode;
    body[1].agencyAddress = formValues.address;
    body[1].agencyLatitude = formValues.agclat;
    body[1].agencyLongitude = formValues.agclong;
    body[1].agencyPhoneNo = formValues.phoneno;
    body[1].agencyFax = formValues.faxno;
    body[1].agencyEmail = formValues.email;
    body[1].agencyStatus = formValues.active;
    body[1].agencyBlog = formValues.blogUrl;
    body[1].agencyContactPerson = formValues.contactperson;
    body[1].agencyFacebook = formValues.fbUrl;
    body[1].agencyFlickr = formValues.flickrUrl;
    body[1].agencyInstagram = formValues.instagramUrl;
    body[1].agencyMdecStatus = formValues.mdecStatus;
    body[1].agencyRss = formValues.rssUrl;
    body[1].agencyTwitter = formValues.twitterUrl;
    body[1].agencyWebsiteUrl = formValues.websiteUrl;
    body[1].agencyYoutube = formValues.youtubeUrl;
    body[1].agencyMinistry.ministryId = this.ministryId;

    console.log(body);

    // // Update ErrorMsg Service
    this.commonservice.updateAgency(body).subscribe(
      data => {
        this.toastr.success('Agency update successful!', '');   
        this.router.navigate(['agency']);
      },
      error => {
        console.log("No Data")
      });
    }
    

  }

}
