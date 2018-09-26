import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, OnDestroy } from '@angular/core';
//import * as $ from 'jquery';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';
import { ValidateService } from '../common/validate.service';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../nav/nav.service';
  
@Component({
  selector: 'app-eventcalendar',
  templateUrl: './eventcalendar.component.html',
  styleUrls: ['./eventcalendar.component.css']
})
export class EventcalendarComponent implements OnInit, OnDestroy {
  
  maskPostCode: RegExp[];
  agencyIdBm: any;
  agencyIdEn: any;
  searchAgencyResultBm: string[];
  searchAgencyResultEn: string[];
  getImgId: any;
  isActiveListBm: boolean;
  isActiveListEn: boolean;
  isActive: boolean;
  patternEmail: string;
  maskPhoneNo: (string | RegExp)[];
  
  date = new Date();
  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  sdt:number;
  edt:number;
  eventData: Object;
  dataUrl: any;
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  eventCode:any;
  eventIdEn:any;
  eventIdBm:any;
  sMinDate: any;
  eMinDate: any;
  imageData: any;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  lang:any;
  selectedFile = '';
  parentAgencyEn = '#parentAgencyEn';

  agencyBm: FormControl;
  agencyEn: FormControl;
  nameEn: FormControl
  nameBm: FormControl
  descEn: FormControl
  descBm: FormControl
  start: FormControl
  end: FormControl
  image: FormControl
  location: FormControl
  zipcode: FormControl
  country: FormControl
  city: FormControl
  orgr: FormControl
  orgrEmail: FormControl
  orgrAddress: FormControl
  orgrUrl: FormControl
  orgrFb: FormControl
  orgrPhone: FormControl
  active: FormControl

  resetMsg = this.resetMsg;
  public loading = false;
  
  private subscriptionLang: ISubscription;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
    private translate: TranslateService,
    private validateService: ValidateService,
    private navservice: NavService,
    private router: Router,
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

    this.commonservice.getInitialMessage();
    
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 
    this.maskPhoneNo = this.validateService.getMask().telephone;
    this.maskPostCode = this.validateService.getMask().postcode;

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    this.getMinEventDate();
    this.getImageList(this.languageId);

    this.nameEn = new FormControl()
    this.nameBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.location = new FormControl()
    this.country = new FormControl()
    this.city = new FormControl()
    this.zipcode = new FormControl()
    this.orgr = new FormControl()
    this.orgrEmail = new FormControl('', [Validators.pattern(this.validateService.getPattern().email)])
    this.orgrAddress = new FormControl()
    this.orgrUrl = new FormControl()
    this.orgrFb = new FormControl()
    this.orgrPhone = new FormControl()
    this.start = new FormControl()
    this.end = new FormControl()
    this.agencyEn = new FormControl()
    this.agencyBm = new FormControl()
    this.active = new FormControl()
    this.image = new FormControl()
    
    this.updateForm = new FormGroup({
      nameEn: this.nameEn,
      nameBm: this.nameBm,
      descEn: this.descEn,
      descBm: this.descBm,
      start: this.start,
      end: this.end,
      location: this.location,
      country: this.country,
      city: this.city,
      zipcode: this.zipcode,
      orgr: this.orgr,
      orgrEmail: this.orgrEmail,
      orgrAddress: this.orgrAddress,
      orgrUrl: this.orgrUrl,
      orgrFb: this.orgrFb,
      orgrPhone: this.orgrPhone,
      agencyEn: this.agencyEn,
      agencyBm: this.agencyBm,
      image: this.image,
      active: this.active
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = 'common.add';
      this.updateForm.get('active').setValue(true);
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

  resetSearch() {
    this.updateForm.get('agencyEn').setValue('');
    this.updateForm.get('agencyBm').setValue('');
    this.isActiveListEn = false;
    this.isActiveListBm = false;
    // this.getModuleData(this.pageCount, this.pageSize);
  }

  ngAfterViewInit() {
    this.maskPhoneNo = this.validateService.getMask().telephone;
    this.maskPostCode = this.validateService.getMask().postcode;
  }

  onScroll(event, lngId){

    // 
    if(event.target.scrollTop >= (event.target.scrollHeight - 250)) {
      // 
      

      let keywordVal;
      
      if(lngId == 1) {
        keywordVal = this.updateForm.get("agencyEn").value
        this.getSearchData(keywordVal, lngId, 1, this.searchAgencyResultEn.length+10)
        
      } else if(lngId == 2) {
        keywordVal = this.updateForm.get("agencyBm").value
        this.getSearchData(keywordVal, lngId, 1, this.searchAgencyResultBm.length+10)
        
      }
    }
  }

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['calendar']);
  }

  back(){
    this.router.navigate(['calendar']);
  }

  // get, add, update, delete
  getRow(row) {

    this.loading = true;
    // Update event Service
    return this.commonservice.readProtectedById('calendar/', row, this.languageId).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){

        this.eventData = Rdata;
        
        let dataEn = this.eventData['list'][0];
        let dataBm = this.eventData['list'][1];

      // populate data
      this.updateForm.get('agencyEn').setValue(dataEn.agency?dataEn.agency.agencyName:'');
      this.updateForm.get('agencyBm').setValue(dataBm.agency?dataBm.agency.agencyName:'');
      this.updateForm.get('nameEn').setValue(dataEn.eventName);
      this.updateForm.get('descEn').setValue(dataEn.eventDescription);
      this.updateForm.get('nameBm').setValue(dataBm.eventName);
      this.updateForm.get('descBm').setValue(dataBm.eventDescription);
      this.updateForm.get('location').setValue(dataBm.eventLocation);
      this.updateForm.get('country').setValue(dataBm.eventCountry);
      this.updateForm.get('city').setValue(dataBm.eventCity);
      this.updateForm.get('zipcode').setValue(dataBm.eventZip);
      this.updateForm.get('orgr').setValue(dataBm.organizer);
      this.updateForm.get('orgrAddress').setValue(dataBm.organizerAddress);
      this.updateForm.get('orgrUrl').setValue(dataBm.organizerUrl);
      this.updateForm.get('orgrEmail').setValue(dataBm.organizerEmail);
      this.updateForm.get('orgrFb').setValue(dataBm.organizerFb);
      this.updateForm.get('orgrPhone').setValue(dataBm.organizerPhone);
      this.updateForm.get('start').setValue(new Date(dataBm.eventStart).toISOString());
      this.updateForm.get('end').setValue(new Date(dataBm.eventEnd).toISOString());
      this.agencyIdEn = dataEn.agency?dataEn.agency.agencyId:null;
      this.agencyIdBm = dataBm.agency?dataBm.agency.agencyId:null;

      if(dataBm.image) {
        this.selectedFile = dataBm.image.mediaFile;
        this.updateForm.get('image').setValue(dataBm.image.mediaId);
      } else {
        this.updateForm.get('image').setValue(null);
      }
        
      this.updateForm.get('active').setValue(dataEn.enabled);
      this.eventCode = dataEn.eventCode;
      this.eventIdEn = dataEn.id;
      this.eventIdBm = dataBm.id;
      
      // this.setEventDate(dataBm.eventStart);
      this.setEventDate(dataBm.eventStart,'start')
      this.setEventDate(dataBm.eventEnd, 'end')
      // this.updateForm.get('start').setValue('3/25/2018')
      
      

      this.checkReqValues();
          
    }).bind(this));
    this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      
      this.loading = false;
      });
    
  }

  getImageList(lng){
    this.loading = true;
    this.commonservice.readProtected('media/category/name/Article', '1', '99999', '', lng)
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

  getAgency() {
    this.loading = true;
    this.commonservice.readPortal('agency/application/code','','','',this.languageId).subscribe(
        Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
            this.AgencyData = Rdata['list'];
        }).bind(this));
          this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  getSearchData(keyword, langId, count, page){

    this.searchAgencyResultEn = []
    this.searchAgencyResultBm = []
    let selLangField;

    if(langId == 1) {
      selLangField = "agencyBm";
    } else {
      selLangField = "agencyEn";
    }
    this.updateForm.get(selLangField).setValue("");

    // if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      // 
      // 
      this.isActive = true;
      this.loading = true;
      
    setTimeout(()=>{
      this.commonservice.readPortal('agency/language/'+langId, count, page, keyword).subscribe(
        data => {

        this.commonservice.errorHandling(data, (function(){

          

          if(data['agencyList'].length != 0) {
            if(langId == 1) {
              this.searchAgencyResultEn = data['agencyList'];
              this.isActiveListEn = true;
              this.isActiveListBm = false;
            } else {
              this.searchAgencyResultBm = data['agencyList'];
              this.isActiveListBm = true;
              this.isActiveListEn = false;
            }
          }
        }).bind(this));
          this.loading = false;
      },err => {
        this.loading = false;
      });
    }, 2000);
    // } else {
    //   this.isActiveListEn = false;
    //   this.isActiveListBm = false;
    // }
  }
  
  getValue(aId,aName,mName, refCode, langId){

    if(langId == 1) {
      this.agencyEn = this.updateForm.get('agencyEn').value;
      this.isActiveListEn = false;
      this.searchAgencyResultEn = [''];
      this.updateForm.get('agencyEn').setValue(aName);
      // this.agencyEn = aId;
      this.agencyIdEn = aId;
      // this.ministryNameEn = mName;

    } else {
      this.agencyBm = this.updateForm.get('agencyBm').value;
      this.isActive = false;
      this.isActiveListBm = false;
      this.updateForm.get('agencyBm').setValue(aName);
      // this.agencyBm = aId;
      this.agencyIdBm = aId;
      // this.ministryNameBm = mName;

    }
    this.getAgencyByRefCode(refCode,langId);

    // 
  }

  // GET AGENCY NAME BY PAIRED LANGUAGE ID
  getAgencyByRefCode(refCode, langId) {

    let selLangField;
    let mName;
    let aName;
    let aId;

    if(langId == 1) {
      langId = 2;
      selLangField = "agencyBm";
    } else {
      langId = 1;
      selLangField = "agencyEn";
    }
    this.loading = true;
    this.commonservice.readPortalById('agency/refcode/language/'+langId+'/', refCode, this.languageId)
    .subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          
          

          // mName = data['list'][0]['agencyMinistry']['ministryName'];
          aName = data['list'][0]['agencyName'];
          aId = data['list'][0]['agencyId'];
          
          this.updateForm.get(selLangField).setValue(aName);

          if(langId == 1) {
            this.agencyIdEn = aId;
            // this.ministryNameEn = mName;
          } else {
            this.agencyIdBm = aId;
            // this.ministryNameBm = mName;
          }
        }).bind(this));
        this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  checkReqValues() {

    let nameEn = "nameEn";
    let nameBm = "nameBm";
    let agencyEn = "agencyEn";
    let descEn = "descEn";
    let agencyBm = "agencyBm";
    let descBm = "descBm";
    let location = "location";
    let country = "location";
    let city = "city";
    let zipcode = "zipcode";
    let start = "start";
    let end = "end";
    // let image = "image";

    let reqVal: any = [
                        nameEn, 
                        nameBm, 
                        agencyEn, 
                        descEn, 
                        agencyBm, 
                        descBm, 
                        country, 
                        location, 
                        zipcode, 
                        city, 
                        start, 
                        end
                      ];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);
      // 

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

  getMinEventDate(){
    let today = new Date();
    let todaysdt = today.getDate();
    let year = today.getFullYear();
    let month = today.getMonth();
    // 
    // 
    // 

    this.sMinDate = new Date(year, month, todaysdt);
    this.eMinDate = new Date(year, month, todaysdt);
  }

  setEventDate(tsd,type) {
    let res;    
    this.events = [];
    this.events.push(tsd);

    
    // this.events.push(`${event.value}`);
    if(type == 'start') {
      this.sdt = new Date(this.events[0]).getTime();
    } else {
      this.edt = new Date(this.events[0]).getTime();
    }

    this.dateFormatExample = "";
 
    // 

    return res;
  }

  addStartEvent(type: string, event: OwlDateTimeInputDirective<Date>) { 
    let year, month, day;
    
    
    this.events = [];
    this.events.push(`${event.value}`);
    this.sdt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";
    
    year = new Date(this.events[0]).getFullYear();
    month = new Date(this.events[0]).getMonth();
    day = new Date(this.events[0]).getDate();

    this.eMinDate = new Date(year,month,day);
    this.edt = new Date(year,month,day).getTime();
    this.updateForm.get('end').setValue(new Date(this.edt).toISOString());
    this.edt = null;

    this.checkReqValues()
  }

  addEndEvent(type: string, event: OwlDateTimeInputDirective<Date>) {
    
    this.events = [];
    this.events.push(`${event.value}`);
    this.edt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";
    
    
    this.checkReqValues()
  }

  myFunction() {
    this.updateForm.reset();
    this.checkReqValues();   
    this.events = [];
    this.sdt = null;
    this.edt = null;
    this.getMinEventDate();
    this.dateFormatExample = "";
  }

  validateCtrlChk(ctrl: FormControl) {
      // return ctrl.valid || ctrl.untouched
      return this.validateService.validateCtrl(ctrl);
  }

  updateAction(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "eventName": null,
        "eventDescription": null,
        "eventStart": null,
        "eventEnd": null,
        "eventLocation": null,
        "eventCountry": null,
        "eventCity": null,
        "eventZip": null,
        "organizer": false,
        "organizerEmail": false,
        "organizerAddress": false,
        "organizerUrl": false,
        "organizerFb": false,
        "organizerPhone": false,
        "enabled": false,
        "agency": {
          "agencyId": null
        },
        "externalData": false,
        "image": {
          "mediaId": null
        },
        "language": {
          "languageId": 1
        }
      }, 
      {
        "eventName": null,
        "eventDescription": null,
        "eventStart": null,
        "eventEnd": null,
        "eventLocation": null,
        "eventCountry": null,
        "eventCity": null,
        "eventZip": null,
        "organizer": false,
        "organizerEmail": false,
        "organizerAddress": false,
        "organizerUrl": false,
        "organizerFb": false,
        "organizerPhone": false,
        "enabled": false,
        "agency": {
          "agencyId": null
        },
        "externalData": false,
        "image": {
          "mediaId": null
        },
        "language": {
          "languageId": 2
        }
      }
    ];
    
    // 

    body[0].eventName = formValues.nameEn;
    body[0].eventDescription = formValues.descEn;
    body[0].eventStart = new Date(formValues.start).getTime();
    body[0].eventEnd =  new Date(formValues.end).getTime();
    body[0].eventLocation = formValues.location;
    body[0].eventCountry = formValues.country;
    body[0].eventCity = formValues.city;
    body[0].eventZip = formValues.zipcode;
    body[0].organizer = formValues.orgr;
    body[0].organizerEmail = formValues.orgrEmail;
    body[0].organizerAddress = formValues.orgrAddress;
    body[0].organizerUrl = formValues.orgrUrl;
    body[0].organizerFb = formValues.orgrFb;
    body[0].organizerPhone = formValues.orgrPhone;
    body[0].agency.agencyId = this.agencyIdEn;
    body[0].enabled = formValues.active;
    
    body[1].eventName = formValues.nameBm;
    body[1].eventDescription = formValues.descBm;
    body[1].eventStart = new Date(formValues.start).getTime();
    body[1].eventEnd =  new Date(formValues.end).getTime();
    body[1].eventLocation = formValues.location;
    body[1].eventCountry = formValues.country;
    body[1].eventCity = formValues.city;
    body[1].eventZip = formValues.zipcode;
    body[1].organizer = formValues.orgr;
    body[1].organizerEmail = formValues.orgrEmail;
    body[1].organizerAddress = formValues.orgrAddress;
    body[1].organizerUrl = formValues.orgrUrl;
    body[1].organizerFb = formValues.orgrFb;
    body[1].organizerPhone = formValues.orgrPhone;
    body[1].agency.agencyId = this.agencyIdBm;
    body[1].enabled = formValues.active;
    
    if(formValues.image) {
      body[0].image.mediaId = formValues.image;
      body[1].image.mediaId = formValues.image;
    } else {
      body[0].image = null;
      body[1].image = null;
    }

    
    this.loading = true;

    // Add event Service
    this.commonservice.create(body,'calendar').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
      this.router.navigate(['calendar']);
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        
        this.loading = false;
      });

    } else {
    
      
      
    let body = [
      {
        "id": null,
        "eventCode": null,
        "eventName": null,
        "eventDescription": null,
        "eventStart": null,
        "eventEnd": null,
        "eventLocation": null,
        "eventCountry": null,
        "eventCity": null,
        "eventZip": null,
        "organizer": false,
        "organizerEmail": false,
        "organizerAddress": false,
        "organizerUrl": false,
        "organizerFb": false,
        "organizerPhone": false,
        "enabled": false,
        "agency": {
          "agencyId": null
        },
        "externalData": false,
        "image": {
          "mediaId": null
        },
        "language": {
          "languageId": 1
        }
      }, 
      {
        "id": null,
        "eventCode": null,
        "eventName": null,
        "eventDescription": null,
        "eventStart": null,
        "eventEnd": null,
        "eventLocation": null,
        "eventCountry": null,
        "eventCity": null,
        "eventZip": null,
        "organizer": false,
        "organizerEmail": false,
        "organizerAddress": false,
        "organizerUrl": false,
        "organizerFb": false,
        "organizerPhone": false,
        "enabled": false,
        "agency": {
          "agencyId": null
        },
        "externalData": false,
        "image": {
          "mediaId": null
        },
        "language": {
          "languageId": 2
        }
      }
    ];

    body[0].id = this.eventIdEn;
    body[0].eventName = formValues.nameEn;
    body[0].eventCode = this.eventCode;
    body[0].eventDescription = formValues.descEn;
    body[0].eventStart = new Date(formValues.start).getTime();
    body[0].eventEnd =  new Date(formValues.end).getTime();
    body[0].eventLocation = formValues.location;
    body[0].eventCountry = formValues.country;
    body[0].eventCity = formValues.city;
    body[0].eventZip = formValues.zipcode;
    body[0].organizer = formValues.orgr;
    body[0].organizerEmail = formValues.orgrEmail;
    body[0].organizerAddress = formValues.orgrAddress;
    body[0].organizerUrl = formValues.orgrUrl;
    body[0].organizerFb = formValues.orgrFb;
    body[0].organizerPhone = formValues.orgrPhone;
    body[0].agency.agencyId = this.agencyIdEn;
    body[0].enabled = formValues.active;
    
    body[1].id = this.eventIdBm;
    body[1].eventName = formValues.nameBm;
    body[1].eventCode = this.eventCode;
    body[1].eventDescription = formValues.descBm;
    body[1].eventStart = new Date(formValues.start).getTime();
    body[1].eventEnd =  new Date(formValues.end).getTime();
    body[1].eventLocation = formValues.location;
    body[1].eventCountry = formValues.country;
    body[1].eventCity = formValues.city;
    body[1].eventZip = formValues.zipcode;
    body[1].organizer = formValues.orgr;
    body[1].organizerEmail = formValues.orgrEmail;
    body[1].organizerAddress = formValues.orgrAddress;
    body[1].organizerUrl = formValues.orgrUrl;
    body[1].organizerFb = formValues.orgrFb;
    body[1].organizerPhone = formValues.orgrPhone;
    body[1].agency.agencyId = this.agencyIdBm;
    body[1].enabled = formValues.active;
    
    if(formValues.image) {
      body[0].image.mediaId = formValues.image;
      body[1].image.mediaId = formValues.image;
    } else {
      body[0].image = null;
      body[1].image = null;
    }

    
    this.loading = true;

    // Update event Service
    this.commonservice.update(body,'calendar').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['calendar']);
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        
        this.loading = false;
      });
    }
    

  }

}
