import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidateService } from '../common/validate.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { NavService } from '../nav/nav.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit, OnDestroy {
  patternEmail: string;
  maskPhoneNo: (string | RegExp)[];
  maskFaxNo: (string | RegExp)[];
  
  searchMinistryResultEn: string[];
  searchMinistryResultBm: string[];
  isActiveListEn: boolean;
  isActiveListBm: boolean;
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
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  refCode:any;
  agencyIdEn:any;
  agencyIdBm:any;
  ministryIdEn:any;
  ministryIdBm:any;
  ministryNameEn:any;
  ministryNameBm:any;
  imageData: any;
  selectedFile = '';
  getImgId: any;

  agencyNameEn: FormControl
  agencyNameBm: FormControl
  descEn: FormControl
  descBm: FormControl
  uniqueCode: FormControl
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
  publicationUrl: FormControl
  ePartUrl: FormControl
  ePartArchiveUrl: FormControl
  ePartPolicyUrl: FormControl
  mdecStatus: FormControl
  ministryEn: FormControl
  ministryBm: FormControl
  image: FormControl

  resetMsg = this.resetMsg;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  lang:any;
  public loading = false;
  
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;
  private subscriptionLangAll: ISubscription;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
    private router: Router,
    private translate: TranslateService,
    private validateService: ValidateService,
    private navservice: NavService,
    private toastr: ToastrService
  ) { 
    
    /* LANGUAGE FUNC */
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
            this.lang = 'en';
            this.languageId = 1;
          });
        }
        
        if (myLang == 'ms') {
          translate.get('HOME').subscribe((res: any) => {
            this.lang = 'ms';
            this.languageId = 2;
        });
        // alert(this.languageId + ',' + this.localeVal)
      }
        if(this.navservice.flagLang){
          this.commonservice.getModuleId();
        }

    });

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 
    this.getImageList();

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    this.maskPhoneNo = this.validateService.getMask().telephone;
    this.maskFaxNo = this.validateService.getMask().fax;

    this.agencyNameEn = new FormControl()
    this.agencyNameBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.uniqueCode = new FormControl()
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
    this.publicationUrl = new FormControl()
    this.ePartUrl = new FormControl()
    this.ePartArchiveUrl = new FormControl()
    this.ePartPolicyUrl = new FormControl()
    this.mdecStatus = new FormControl()
    this.ministryEn = new FormControl()
    this.ministryBm = new FormControl()
    this.image = new FormControl()

    this.updateForm = new FormGroup({
      agencyNameEn: this.agencyNameEn,
      descEn: this.descEn,
      agencyNameBm: this.agencyNameBm,
      descBm: this.descBm,
      address: this.address,
      uniqueCode: this.uniqueCode,
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
      publicationUrl: this.publicationUrl,
      ePartUrl: this.ePartUrl,
      ePartArchiveUrl: this.ePartArchiveUrl,
      ePartPolicyUrl: this.ePartPolicyUrl,
      active: this.active,
      image: this.image,
      mdecStatus: this.mdecStatus,
      ministryEn: this.ministryEn,
      ministryBm: this.ministryBm
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = 'common.add';
    } else {
      this.isEdit = true;
      this.pageMode = 'common.update';
      this.getRow(refCode);
    }
    
    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngAfterViewInit() {
    this.maskPhoneNo = this.validateService.getMask().telephone;
    this.maskFaxNo = this.validateService.getMask().fax;
  }

  getImageList(){
    this.loading = true;
    this.commonservice.readProtected('media/category/name/Article', '1', '99999', '', this.languageId)
     .subscribe(resCatData => {

      this.commonservice.errorHandling(resCatData, (function(){

        this.imageData = resCatData['list'];       
        // 

      }).bind(this));
      this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      this.loading = false;
      
    });
  }
  
  selectedImg(e){
    
    this.getImgId = e.value;
    let dataList = this.imageData;
    let indexVal: any;
    let id: any;

    for(let i=0; i<dataList.length; i++){
      indexVal = dataList[i].list[0].mediaId;
      if(indexVal == this.getImgId){
        id = dataList[i].list[0].mediaId;
        this.selectedFile=dataList[i].list[0].mediaFile;
      }        
    }

    

    this.updateForm.get('image').setValue(id);  
    this.checkReqValues();

  }

  onScroll(event, lngId){

    // 
    if(event.target.scrollTop >= (event.target.scrollHeight - 250)) {
      // 
      

      let keywordVal;
      
      if(lngId == 1) {
        keywordVal = this.updateForm.get("ministryEn").value
        this.getSearchData(keywordVal, lngId, 1, this.searchMinistryResultEn.length+10)
        
      } else if(lngId == 2) {
        keywordVal = this.updateForm.get("ministryBm").value
        this.getSearchData(keywordVal, lngId, 1, this.searchMinistryResultBm.length+10)
        
      }
    }
  }

  back(){
    this.router.navigate(['agency']);
  }

  // get, add, update, delete
  getRow(row) {

    this.loading = true;
    // Update ErrorMsg Service
    this.commonservice.readPortalById('agency/type/code/', row, this.languageId).subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
          this.AgencyTypeData = Rdata;
          console.log(this.AgencyTypeData)
          
          let dataEn = this.AgencyTypeData['list'][0];
          let dataBm = this.AgencyTypeData['list'][1];
          
          // populate data
          this.updateForm.get('agencyNameEn').setValue(dataEn.agencyName);
          this.updateForm.get('descEn').setValue(dataEn.agencyDescription);
          this.updateForm.get('agencyNameBm').setValue(dataBm.agencyName);
          this.updateForm.get('descBm').setValue(dataBm.agencyDescription);
          this.updateForm.get('ministryEn').setValue(dataEn.agencyMinistry.ministryName);
          this.updateForm.get('ministryBm').setValue(dataBm.agencyMinistry.ministryName);
          this.updateForm.get('uniqueCode').setValue(dataBm.agencyUniqueCode);
          this.updateForm.get('active').setValue(dataBm.agencyStatus);
          this.updateForm.get('address').setValue(dataBm.agencyAddress);
          this.updateForm.get('agclat').setValue(dataBm.agencyLatitude);
          this.updateForm.get('agclong').setValue(dataBm.agencyLongitude);
          this.updateForm.get('phoneno').setValue(dataBm.agencyPhoneNo);
          this.updateForm.get('faxno').setValue(dataBm.agencyFax);
          this.updateForm.get('email').setValue(dataBm.agencyEmail);
          this.updateForm.get('contactperson').setValue(dataBm.agencyContactPerson);
          this.updateForm.get('websiteUrl').setValue(dataBm.agencyWebsiteUrl);
          this.updateForm.get('publicationUrl').setValue(dataBm.agencyPublicationUrl);
          this.updateForm.get('ePartUrl').setValue(dataBm.agencyEparticipationUrl);
          this.updateForm.get('ePartArchiveUrl').setValue(dataBm.agencyEparticipationArchiveUrl);
          this.updateForm.get('ePartPolicyUrl').setValue(dataBm.agencyEparticipationPolicyUrl);
          this.updateForm.get('rssUrl').setValue(dataBm.agencyRss);
          this.updateForm.get('youtubeUrl').setValue(dataBm.agencyYoutube);
          this.updateForm.get('twitterUrl').setValue(dataBm.agencyTwitter);
          this.updateForm.get('flickrUrl').setValue(dataBm.agencyFlickr);
          this.updateForm.get('blogUrl').setValue(dataBm.agencyBlog);
          this.updateForm.get('instagramUrl').setValue(dataBm.agencyInstagram);
          this.updateForm.get('fbUrl').setValue(dataBm.agencyFacebook);
          this.updateForm.get('mdecStatus').setValue(dataBm.agencyMdecStatus);
          this.refCode = dataEn.agencyCode;
          this.agencyIdEn = dataEn.agencyId;
          this.agencyIdBm = dataBm.agencyId;
          this.ministryIdEn = dataEn.agencyMinistry.ministryId;
          this.ministryIdBm = dataBm.agencyMinistry.ministryId;

          if(dataBm.agencyImage) {
            this.selectedFile = dataBm.agencyImage.mediaFile;
            this.updateForm.get('image').setValue(dataBm.agencyImage.mediaId);
          } else {
            this.updateForm.get('image').setValue(null);
          }

          this.checkReqValues();
        }).bind(this));  
      this.loading = false;
    }, err => {
      this.loading = false;
    });
    
  }

  getSearchData(keyword, langId, count, page){
    
    

    let selLangField;
      
    if(langId == 1) {
      selLangField = "ministryBm";
      this.ministryNameBm = "";
    } else {
      selLangField = "ministryEn";
      this.ministryNameEn = "";
    }
    this.updateForm.get(selLangField).reset();
    // 
    
    // if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      
      this.loading = true;
      this.commonservice.readPortal('ministry/language/'+langId, count, page, keyword, langId).subscribe(data => {
            this.commonservice.errorHandling(data, (function(){
              
          if(data['list'].length != 0) {
              if(langId == 1) {
                this.searchMinistryResultEn = data['list'];
                this.isActiveListEn = true;
                this.isActiveListBm = false;
              } else {
                this.searchMinistryResultBm = data['list'];
                this.isActiveListBm = true;
                this.isActiveListEn = false;
              }
            }
            }).bind(this)); 
            this.loading = false; 
          }, err =>{
            this.loading = false;
          });
    // } else {
    //   this.isActiveListEn = false;
    //   this.isActiveListBm = false;
    // }
  }
  
  getValue(mId,mName, refCode, langId){

    if(langId == 1) {
      this.ministryEn = this.updateForm.get('ministryEn').value;
      this.isActiveListEn = false;
      this.searchMinistryResultEn = [''];
      this.updateForm.get('ministryEn').setValue(mName);
      this.ministryIdEn = mId;

      // this.getMinistryByRefCode(refCode,langId);
      
    } else {
      this.ministryBm = this.updateForm.get('ministryBm').value;
      this.isActiveListBm = false;
      this.searchMinistryResultBm = [''];
      this.updateForm.get('ministryBm').setValue(mName);
      this.ministryIdBm = mId;

      
    }
    this.getMinistryByRefCode(refCode,langId);
  }

  // GET MINISTRY NAME BY PAIRED LANGUAGE ID
  getMinistryByRefCode(refCode, langId) {

    let selLangField;
    let mName;
    let mId;

    if(langId == 1) {
      langId = 2;
      selLangField = "ministryBm";
    } else {
      langId = 1;
      selLangField = "ministryEn";
    }
    this.loading = true;
    this.commonservice.readPortalById('ministry/refcode/language/'+langId+'/', refCode)
    .subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          
          

          // 
          mName = data['ministryEntityList'][0]['ministryName'];
          mId = data['ministryEntityList'][0]['ministryId'];
          
          this.updateForm.get(selLangField).setValue(mName);

          if(langId == 1)
            this.ministryIdEn = mId;
          else
            this.ministryIdBm = mId;
        }).bind(this)); 
        this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  checkReqValues() {

    let agencyNameEn = "agencyNameEn";
    let descEn = "descEn";
    let agencyNameBm = "agencyNameBm";
    let descBm = "descBm";
    let ministryEn = "ministryEn";
    let ministryBm = "ministryBm";
    let uniqueCode = "uniqueCode";
    let address = "address";
    let contactperson = "contactperson";
    let email = "email";

    let reqVal: any = [
                        agencyNameEn, 
                        descEn, 
                        agencyNameBm, 
                        descBm,
                        ministryEn,
                        ministryBm,
                        uniqueCode,
                        address,
                        contactperson,
                        email
                      ];

    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

      // 

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
          "agencyName": null,
          "agencyDescription": null,
          "agencyUniqueCode": null,
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
          "agencyPublicationUrl": null, 
          "agencyEparticipationArchiveUrl": null, 
          "agencyEparticipationPolicyUrl": null, 
          "agencyEparticipationUrl": null, 
          "agencyYoutube": null,
          "language": {
            "languageId": 1
          },
          "agencyImage": {
            "mediaId": null
          },
          "agencyMinistry": {
            "ministryId": null
          }
        },
        {
          "agencyName": null,
          "agencyDescription": null,
          "agencyUniqueCode": null,
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
          "agencyPublicationUrl": null, 
          "agencyEparticipationArchiveUrl": null, 
          "agencyEparticipationPolicyUrl": null, 
          "agencyEparticipationUrl": null, 
          "agencyYoutube": null,
          "language": {
            "languageId": 2
          },
          "agencyImage": {
            "mediaId": null
          },
          "agencyMinistry": {
            "ministryId": null
          }
        }
      ];
    
      body[0].agencyName = formValues.agencyNameEn;
      body[0].agencyDescription = formValues.descEn;
      body[0].agencyUniqueCode = formValues.uniqueCode;
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
      body[0].agencyPublicationUrl = formValues.publicationUrl;
      body[0].agencyEparticipationArchiveUrl = formValues.ePartArchiveUrl;
      body[0].agencyEparticipationPolicyUrl = formValues.ePartPolicyUrl;
      body[0].agencyEparticipationUrl = formValues.ePartUrl;
      body[0].agencyYoutube = formValues.youtubeUrl;
      body[0].agencyMinistry.ministryId = this.ministryIdEn;
  
      body[1].agencyName = formValues.agencyNameBm;
      body[1].agencyDescription = formValues.descBm;
      body[1].agencyUniqueCode = formValues.uniqueCode;
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
      body[1].agencyPublicationUrl = formValues.publicationUrl;
      body[1].agencyEparticipationArchiveUrl = formValues.ePartArchiveUrl;
      body[1].agencyEparticipationPolicyUrl = formValues.ePartPolicyUrl;
      body[1].agencyEparticipationUrl = formValues.ePartUrl;
      body[1].agencyYoutube = formValues.youtubeUrl;
      body[1].agencyMinistry.ministryId = this.ministryIdBm;
    
      if(formValues.image) {
        body[0].agencyImage.mediaId = formValues.image;
        body[1].agencyImage.mediaId = formValues.image;
      } else {
        body[0].agencyImage = null;
        body[1].agencyImage = null;
      }
      

    // Add Agency Service
    this.loading = true;
    this.commonservice.create(body,'agency/type').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
        this.router.navigate(['agency']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });

    } else {
      
    let body = [
      {
        "agencyId": null,
        "agencyCode": null,
        "agencyUniqueCode": null,
        "agencyName": "",
        "agencyDescription": "",
        "agencyAddress": "",
        "agencyLatitude": "",
        "agencyLongitude": "",
        "agencyPhoneNo": "",
        "agencyFax": "",
        "agencyEmail": "",
        "agencyStatus": "",
        "agencyBlog": "",
        "agencyContactPerson": "",
        "agencyFacebook": "",
        "agencyFlickr": "",
        "agencyInstagram": "",
        "agencyMdecStatus": false,
        "agencyRss": "",
        "agencyTwitter": "",
        "agencyWebsiteUrl": "",
        "agencyPublicationUrl": null, 
        "agencyEparticipationArchiveUrl": null, 
        "agencyEparticipationPolicyUrl": null, 
        "agencyEparticipationUrl": null, 
        "agencyYoutube": "",
        "language": {
          "languageId": 1
        },
        "agencyImage": {
          "mediaId": null
        },
        "agencyMinistry": {
          "ministryId": null
        }
      }, 
      {
        "agencyId": null,
        "agencyCode": null,
        "agencyUniqueCode": null,
        "agencyName": "",
        "agencyDescription": "",
        "agencyAddress": "",
        "agencyLatitude": "",
        "agencyLongitude": "",
        "agencyPhoneNo": "",
        "agencyFax": "",
        "agencyEmail": "",
        "agencyStatus": "",
        "agencyBlog": "",
        "agencyContactPerson": "",
        "agencyFacebook": "",
        "agencyFlickr": "",
        "agencyInstagram": "",
        "agencyMdecStatus": false,
        "agencyRss": "",
        "agencyTwitter": "",
        "agencyWebsiteUrl": "",
        "agencyPublicationUrl": null, 
        "agencyEparticipationArchiveUrl": null, 
        "agencyEparticipationPolicyUrl": null, 
        "agencyEparticipationUrl": null, 
        "agencyYoutube": "",
        "language": {
          "languageId": 2
        },
        "agencyImage": {
          "mediaId": null
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
    body[0].agencyUniqueCode = formValues.uniqueCode;
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
    body[0].agencyPublicationUrl = formValues.publicationUrl;
    body[0].agencyEparticipationArchiveUrl = formValues.ePartArchiveUrl;
    body[0].agencyEparticipationPolicyUrl = formValues.ePartPolicyUrl;
    body[0].agencyEparticipationUrl = formValues.ePartUrl;
    body[0].agencyYoutube = formValues.youtubeUrl;
    body[0].agencyMinistry.ministryId = this.ministryIdEn;

    body[1].agencyId = this.agencyIdBm;
    body[1].agencyName = formValues.agencyNameBm;
    body[1].agencyDescription = formValues.descBm;
    body[1].agencyUniqueCode = formValues.uniqueCode;
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
    body[1].agencyPublicationUrl = formValues.publicationUrl;
    body[1].agencyEparticipationArchiveUrl = formValues.ePartArchiveUrl;
    body[1].agencyEparticipationPolicyUrl = formValues.ePartPolicyUrl;
    body[1].agencyEparticipationUrl = formValues.ePartUrl;
    body[1].agencyYoutube = formValues.youtubeUrl;
    body[1].agencyMinistry.ministryId = this.ministryIdBm;

    if(formValues.image) {
      body[0].agencyImage.mediaId = formValues.image;
      body[1].agencyImage.mediaId = formValues.image;
    } else {
      body[0].agencyImage = null;
      body[1].agencyImage = null;
    }

    // Update Agency Service
    this.loading = true;
    this.commonservice.update(body,'agency/type').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['agency']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });
    }
    

  }

}