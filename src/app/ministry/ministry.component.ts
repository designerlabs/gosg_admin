import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidateService } from '../common/validate.service';
import { TextMaskModule } from 'angular2-text-mask';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-ministry',
  templateUrl: './ministry.component.html',
  styleUrls: ['./ministry.component.css']
})
export class MinistryComponent implements OnInit {
  patternEmail: string;
  maskPhoneNo: (string | RegExp)[];
  maskFaxNo: (string | RegExp)[];
  
  MinistryData: Object;
  dataUrl: any;
  date = new Date();
  ministryForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  refCode:any;
  ministryIdEn:any;
  ministryIdBm:any;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  ministryNameEn: FormControl
  ministryNameBm: FormControl
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

  resetMsg = this.resetMsg;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private validateService: ValidateService,
    textMask:TextMaskModule,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {

     /* LANGUAGE FUNC */
     translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              // this.getMinistryData(this.pageCount, this.agencyPageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      // this.getMinistryData(this.pageCount, this.agencyPageSize);
      this.commonservice.getModuleId();
    }

   

    /* LANGUAGE FUNC */


    this.getUserData();
    this.commonservice.getModuleId();
  }

  ngOnInit() {
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 
    this.getUserData();
    this.commonservice.getModuleId();
    let refCode = this.router.url.split('/')[2];
    this.maskPhoneNo = this.validateService.getMask().telephone;
    this.maskFaxNo = this.validateService.getMask().fax;

    this.ministryNameEn = new FormControl()
    this.ministryNameBm = new FormControl()
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

    this.ministryForm = new FormGroup({
      ministryNameEn: this.ministryNameEn,
      descEn: this.descEn,
      ministryNameBm: this.ministryNameBm,
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
      mdecStatus: this.mdecStatus
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
    this.router.navigate(['ministry']);
  }

  

  
  
  getUserData(){
    this.commonservice.getUsersDetails().subscribe(
      data => {
        debugger;
        if(data['adminUser']){
          if(data['adminUser'].superAdmin){
            
          }else{
       
          }
        }else{
          this.commonservice.getUserList(data['adminUser'].userId).subscribe((data:any) => {
            data => {
              debugger;
              this.getModuleId();
            }
            
          });
        }
        
      },
    error => {
      
      }
    )}

    getModuleId(){
      this.commonservice.requestUrl('ministry').subscribe(
        data => {
          debugger;
        },
        error => {
          
          })
    };

  // get, add, update, delete
  getRow(row) {

    // Update ErrorMsg Service
    return this.http.get(this.appConfig.urlMinistry + "/" + row).subscribe(
    // return this.http.get(this.appConfig.urlAgency + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgency + row + "/").subscribe(
      Rdata => {

        this.MinistryData = Rdata;
        // console.log(JSON.stringify(this.MinistryData))
        console.log(this.MinistryData)
        let dataEn = this.MinistryData['ministryEntityList'][0];
        let dataBm = this.MinistryData['ministryEntityList'][1];

      // populate data
      this.ministryForm.get('ministryNameEn').setValue(dataEn.ministryName);
      this.ministryForm.get('descEn').setValue(dataEn.ministryDescription);
      this.ministryForm.get('ministryNameBm').setValue(dataBm.ministryName);
      this.ministryForm.get('descBm').setValue(dataBm.ministryDescription);
      this.ministryForm.get('active').setValue(dataBm.ministryStatus);
      this.ministryForm.get('address').setValue(dataBm.ministryAddress);
      this.ministryForm.get('contactperson').setValue(dataBm.ministryContactPerson);
      this.ministryForm.get('agclat').setValue(dataBm.ministryLatitude);
      this.ministryForm.get('agclong').setValue(dataBm.ministryLongitude);
      this.ministryForm.get('phoneno').setValue(dataBm.ministryPhone);
      this.ministryForm.get('faxno').setValue(dataBm.ministryFax);
      this.ministryForm.get('email').setValue(dataBm.ministryEmail);
      this.ministryForm.get('websiteUrl').setValue(dataBm.ministryWebsiteUrl);
      this.ministryForm.get('rssUrl').setValue(dataBm.ministryRss);
      this.ministryForm.get('youtubeUrl').setValue(dataBm.ministryYoutube);
      this.ministryForm.get('twitterUrl').setValue(dataBm.ministryTwitter);
      this.ministryForm.get('flickrUrl').setValue(dataBm.ministryFlickr);
      this.ministryForm.get('blogUrl').setValue(dataBm.ministryBlog);
      this.ministryForm.get('instagramUrl').setValue(dataBm.ministryInstagram);
      this.ministryForm.get('fbUrl').setValue(dataBm.ministryFacebook);
      this.ministryForm.get('mdecStatus').setValue(dataBm.ministryMdecstatus);
      this.refCode = dataEn.ministryCode;
      this.ministryIdEn = dataEn.ministryId;
      this.ministryIdBm = dataBm.ministryId;

      this.checkReqValues();
    },
    error => {
        this.toastr.error('Sorry, Server is down');
        // this.toastr.error(this.translate.instant('common.err.servicedown'), '');
        //this.alertService.error(error);
        //this.loading = false;
    });
    
  }

  checkReqValues() {

    let ministryNameEn = "ministryNameEn";
    let descEn = "descEn";
    let ministryNameBm = "ministryNameBm";
    let descBm = "descBm";

    let reqVal: any = [ministryNameEn, descEn, ministryNameBm, descBm];
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

  validateCtrlChk(ctrl: FormControl) {
      // return ctrl.valid || ctrl.untouched
      return this.validateService.validateCtrl(ctrl);
  }
  
  updateAction(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "ministryName": null,
        "ministryDescription": null,
        "ministryAddress": null,
        "ministryLatitude": null,
        "ministryLongitude": null,
        "ministryPhoneNo": null,
        "ministryFax": null,
        "ministryEmail": null,
        "ministryStatus": null,
        "ministryBlog": null,
        "ministryContactPerson": null,
        "ministryFacebook": null,
        "ministryFlickr": null,
        "ministryInstagram": null,
        "ministryMdecStatus": null,
        "ministryRss": null,
        "ministryTwitter": null,
        "ministryWebsiteUrl": null,
        "ministryYoutube": null,
        "language": {
          "languageId": 1
        }
      }, 
      {
        "ministryName": null,
        "ministryDescription": null,
        "ministryAddress": null,
        "ministryLatitude": null,
        "ministryLongitude": null,
        "ministryPhoneNo": null,
        "ministryFax": null,
        "ministryEmail": null,
        "ministryStatus": null,
        "ministryBlog": null,
        "ministryContactPerson": null,
        "ministryFacebook": null,
        "ministryFlickr": null,
        "ministryInstagram": null,
        "ministryMdecStatus": null,
        "ministryRss": null,
        "ministryTwitter": null,
        "ministryWebsiteUrl": null,
        "ministryYoutube": null,
        "language": {
          "languageId": 2
        }
      }
    ];
    
    console.log(formValues)

    body[0].ministryName = formValues.ministryNameEn;
    body[0].ministryDescription = formValues.descEn;
    body[0].ministryAddress = formValues.address;
    body[0].ministryLatitude = formValues.agclat;
    body[0].ministryLongitude = formValues.agclong;
    body[0].ministryPhoneNo = formValues.phoneno;
    body[0].ministryFax = formValues.faxno;
    body[0].ministryEmail = formValues.email;
    body[0].ministryStatus = formValues.active;
    body[0].ministryBlog = formValues.blogUrl;
    body[0].ministryContactPerson = formValues.contactperson;
    body[0].ministryFacebook = formValues.fbUrl;
    body[0].ministryFlickr = formValues.flickrUrl;
    body[0].ministryInstagram = formValues.instagramUrl;
    body[0].ministryMdecStatus = formValues.mdecStatus;
    body[0].ministryRss = formValues.rssUrl;
    body[0].ministryTwitter = formValues.twitterUrl;
    body[0].ministryWebsiteUrl = formValues.websiteUrl;
    body[0].ministryYoutube = formValues.youtubeUrl;

    body[1].ministryName = formValues.ministryNameBm;
    body[1].ministryDescription = formValues.descBm;
    body[1].ministryAddress = formValues.address;
    body[1].ministryLatitude = formValues.agclat;
    body[1].ministryLongitude = formValues.agclong;
    body[1].ministryPhoneNo = formValues.phoneno;
    body[1].ministryFax = formValues.faxno;
    body[1].ministryEmail = formValues.email;
    body[1].ministryStatus = formValues.active;
    body[1].ministryBlog = formValues.blogUrl;
    body[1].ministryContactPerson = formValues.contactperson;
    body[1].ministryFacebook = formValues.fbUrl;
    body[1].ministryFlickr = formValues.flickrUrl;
    body[1].ministryInstagram = formValues.instagramUrl;
    body[1].ministryMdecStatus = formValues.mdecStatus;
    body[1].ministryRss = formValues.rssUrl;
    body[1].ministryTwitter = formValues.twitterUrl;
    body[1].ministryWebsiteUrl = formValues.websiteUrl;
    body[1].ministryYoutube = formValues.youtubeUrl;

    console.log(body)

    // Add ErrorMsg Service
    this.commonservice.addMinistry(body).subscribe(
      data => {
        this.toastr.success('Ministry added successfully!', ''); 
        this.router.navigate(['ministry']);
      },
      error => {
        console.log("No Data")
      });

    } else {
      
    let body = [
      {
        "ministryId": null,
        "ministryCode": null,
        "ministryName": null,
        "ministryDescription": null,
        "ministryAddress": null,
        "ministryLatitude": null,
        "ministryLongitude": null,
        "ministryPhoneNo": null,
        "ministryFax": null,
        "ministryEmail": null,
        "ministryStatus": null,
        "ministryBlog": null,
        "ministryContactPerson": null,
        "ministryFacebook": null,
        "ministryFlickr": null,
        "ministryInstagram": null,
        "ministryMdecStatus": null,
        "ministryRss": null,
        "ministryTwitter": null,
        "ministryWebsiteUrl": null,
        "ministryYoutube": null,
        "language": {
          "languageId": 1
        }
      }, 
      {
        "ministryId": null,
        "ministryCode": null,
        "ministryName": null,
        "ministryDescription": null,
        "ministryAddress": null,
        "ministryLatitude": null,
        "ministryLongitude": null,
        "ministryPhoneNo": null,
        "ministryFax": null,
        "ministryEmail": null,
        "ministryStatus": null,
        "ministryBlog": null,
        "ministryContactPerson": null,
        "ministryFacebook": null,
        "ministryFlickr": null,
        "ministryInstagram": null,
        "ministryMdecStatus": null,
        "ministryRss": null,
        "ministryTwitter": null,
        "ministryWebsiteUrl": null,
        "ministryYoutube": null,
        "language": {
          "languageId": 2
        }
      }
    ];
  
    body[0].ministryId = this.ministryIdEn;
    body[0].ministryCode = this.refCode;
    body[0].ministryName = formValues.ministryNameEn;
    body[0].ministryDescription = formValues.descEn;
    body[0].ministryAddress = formValues.address;
    body[0].ministryLatitude = formValues.agclat;
    body[0].ministryLongitude = formValues.agclong;
    body[0].ministryPhoneNo = formValues.phoneno;
    body[0].ministryFax = formValues.faxno;
    body[0].ministryEmail = formValues.email;
    body[0].ministryStatus = formValues.active;
    body[0].ministryBlog = formValues.blogUrl;
    body[0].ministryContactPerson = formValues.contactperson;
    body[0].ministryFacebook = formValues.fbUrl;
    body[0].ministryFlickr = formValues.flickrUrl;
    body[0].ministryInstagram = formValues.instagramUrl;
    body[0].ministryMdecStatus = formValues.mdecStatus;
    body[0].ministryRss = formValues.rssUrl;
    body[0].ministryTwitter = formValues.twitterUrl;
    body[0].ministryWebsiteUrl = formValues.websiteUrl;
    body[0].ministryYoutube = formValues.youtubeUrl;
  
    body[1].ministryId = this.ministryIdBm;
    body[1].ministryCode = this.refCode;
    body[1].ministryName = formValues.ministryNameBm;
    body[1].ministryDescription = formValues.descBm;
    body[1].ministryAddress = formValues.address;
    body[1].ministryLatitude = formValues.agclat;
    body[1].ministryLongitude = formValues.agclong;
    body[1].ministryPhoneNo = formValues.phoneno;
    body[1].ministryFax = formValues.faxno;
    body[1].ministryEmail = formValues.email;
    body[1].ministryStatus = formValues.active;
    body[1].ministryBlog = formValues.blogUrl;
    body[1].ministryContactPerson = formValues.contactperson;
    body[1].ministryFacebook = formValues.fbUrl;
    body[1].ministryFlickr = formValues.flickrUrl;
    body[1].ministryInstagram = formValues.instagramUrl;
    body[1].ministryMdecStatus = formValues.mdecStatus;
    body[1].ministryRss = formValues.rssUrl;
    body[1].ministryTwitter = formValues.twitterUrl;
    body[1].ministryWebsiteUrl = formValues.websiteUrl;
    body[1].ministryYoutube = formValues.youtubeUrl;

    console.log(body);

    // Update ErrorMsg Service
    this.commonservice.updateMinistry(body).subscribe(
      data => {
        this.toastr.success('Ministry update successful!', '');   
        this.router.navigate(['ministry']);
      },
      error => {
        console.log("No Data")
      });
    }
    

  }

}
