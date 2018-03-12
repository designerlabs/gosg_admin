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
  updateForm: FormGroup
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
  public loading = false;

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
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
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
  }

  ngOnInit() {
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 

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

    this.updateForm = new FormGroup({
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
    
    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  ngAfterViewInit() {
    this.maskPhoneNo = this.validateService.getMask().telephone;
    this.maskFaxNo = this.validateService.getMask().fax;
  }

  back(){
    this.router.navigate(['ministry']);
  }

  


  // get, add, update, delete
  getRow(row) {


    this.loading = true;
    // Update Ministry Service
    return this.commonservice.readPortalById("ministry/", row).subscribe(
    // return this.http.get(this.appConfig.urlAgency + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgency + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){

          this.MinistryData = Rdata;
          // console.log(JSON.stringify(this.MinistryData))
          console.log(this.MinistryData)
          let dataEn = this.MinistryData['ministryEntityList'][0];
          let dataBm = this.MinistryData['ministryEntityList'][1];

        // populate data
        this.updateForm.get('ministryNameEn').setValue(dataEn.ministryName);
        this.updateForm.get('descEn').setValue(dataEn.ministryDescription);
        this.updateForm.get('ministryNameBm').setValue(dataBm.ministryName);
        this.updateForm.get('descBm').setValue(dataBm.ministryDescription);
        this.updateForm.get('active').setValue(dataBm.ministryStatus);
        this.updateForm.get('address').setValue(dataBm.ministryAddress);
        this.updateForm.get('contactperson').setValue(dataBm.ministryContactPerson);
        this.updateForm.get('agclat').setValue(dataBm.ministryLatitude);
        this.updateForm.get('agclong').setValue(dataBm.ministryLongitude);
        this.updateForm.get('phoneno').setValue(dataBm.ministryPhone);
        this.updateForm.get('faxno').setValue(dataBm.ministryFax);
        this.updateForm.get('email').setValue(dataBm.ministryEmail);
        this.updateForm.get('websiteUrl').setValue(dataBm.ministryWebsiteUrl);
        this.updateForm.get('rssUrl').setValue(dataBm.ministryRss);
        this.updateForm.get('youtubeUrl').setValue(dataBm.ministryYoutube);
        this.updateForm.get('twitterUrl').setValue(dataBm.ministryTwitter);
        this.updateForm.get('flickrUrl').setValue(dataBm.ministryFlickr);
        this.updateForm.get('blogUrl').setValue(dataBm.ministryBlog);
        this.updateForm.get('instagramUrl').setValue(dataBm.ministryInstagram);
        this.updateForm.get('fbUrl').setValue(dataBm.ministryFacebook);
        this.updateForm.get('mdecStatus').setValue(dataBm.ministryMdecstatus);
        this.refCode = dataEn.ministryCode;
        this.ministryIdEn = dataEn.ministryId;
        this.ministryIdBm = dataBm.ministryId;

        this.checkReqValues();
            
      }).bind(this));
      this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      console.log(error);  
      this.loading = false;
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
      let elem = this.updateForm.get(reqData);

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
      this.updateForm.reset();
      this.checkReqValues();
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
    this.loading = true;

    // Add ErrorMsg Service
    this.commonservice.create(body,'ministry/add/multiple').subscribe(
      data => {
                    
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), '');
          this.router.navigate(['font']);
        }).bind(this));      
        this.loading = false;      
        this.router.navigate(['ministry']);
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
        console.log(error);
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
    this.commonservice.update(body,'ministry/update/multiple').subscribe(
      data => {
                    
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), '');
          this.router.navigate(['font']);
        }).bind(this));      
        this.loading = false;      
        this.router.navigate(['ministry']);
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
        console.log(error);
      });
    }
    

  }

}
