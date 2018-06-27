import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from './../nav/nav.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit, OnDestroy {

  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  publishdt:number;  
  enddt: number;
  minDate: any;
  sMinDate: any;
  eMinDate: any;
  publish: FormControl
  endD: FormControl

  sliderData: Object;
  dataUrl: any;
  date = new Date();
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  sliderCode: any;
  sliderIdEn: any;
  sliderIdBm: any;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  lang: any;
  languageId: any;

  titleEn: FormControl
  titleBm: FormControl
  descEn: FormControl
  descBm: FormControl
  imgEn: FormControl
  imgBm: FormControl
  active: FormControl
  copyImg: FormControl
  urlEng: FormControl
  urlMy: FormControl
  seqEng: FormControl
  seqMy: FormControl
  resetMsg = this.resetMsg;
  imageData: any;
  public loading = false;
  getImgIdEn: any;
  getImgIdBm: any;
  selectedFileEn = '';
  selectedFileMy = '';

  sendForApporval: boolean;

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;


  refCode = "";

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private translate: TranslateService,
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
      }
      if (this.navservice.flagLang) {
        this.changeLanguageAddEdit();
        this.commonservice.getModuleId();
      }

    });
    /* LANGUAGE FUNC */ 

  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    //this.subscriptionContentCreator.unsubscribe();
    //this.subscriptionCategoryC.unsubscribe();
    //this.subscriptionRecordListC.unsubscribe();
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    this.getImageList();
    this.getMinEventDate();

    this.publish = new FormControl()
    this.endD = new FormControl
    this.titleEn = new FormControl();
    this.titleBm = new FormControl();
    this.descEn = new FormControl();
    this.descBm = new FormControl();
    this.imgEn = new FormControl();
    this.imgBm = new FormControl();
    this.urlEng = new FormControl();
    this.urlMy = new FormControl();
    this.active = new FormControl();
    this.copyImg = new FormControl();
    this.seqEng = new FormControl();
    this.seqMy = new FormControl();

    this.updateForm = new FormGroup({
      endD: this.endD,
      publish: this.publish,
      titleEn: this.titleEn,
      descEn: this.descEn,
      imgEn: this.imgEn,
      urlEng: this.urlEng,
      urlMy: this.urlMy,
      titleBm: this.titleBm,
      descBm: this.descBm,
      imgBm: this.imgBm,
      active: this.active,
      copyImg: this.copyImg,
      seqEng: this.seqEng,
      seqMy: this.seqMy,
    });

    if (this.refCode == "add") {
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true);

    } else {
      this.commonservice.pageModeChange(true);
      this.getRow(this.refCode);
    }

    // #### for disable non update user ---1
    if (!this.commonservice.isUpdate && this.commonservice.isWrite) {
      this.updateForm.enable();
    } else if (!this.commonservice.isUpdate) {
      this.updateForm.disable();
    }
  }

  isSameImg(enImg, bmImg) {
    
    if (enImg != null && enImg == bmImg) {
      this.updateForm.get('copyImg').setValue(true);
    } else {
      this.updateForm.get('copyImg').setValue(false);
    }
  }

  back() {
    this.router.navigate(['slider']);
  }

  // get, add, update, delete
  getRow(row) {

    this.loading = true;
    // Update Slider Service
    return this.commonservice.readProtectedById('content/publisher/', row, this.languageId).subscribe(
      // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function () {

          this.sliderData = Rdata;
          
          let dataEn = this.sliderData['contentDetailList'][0];
          let dataBm = this.sliderData['contentDetailList'][1];

          // populate data
          this.updateForm.get('titleEn').setValue(dataEn.contentTitle);
          this.updateForm.get('descEn').setValue(dataEn.contentDescription);
         
          this.updateForm.get('titleBm').setValue(dataBm.contentTitle);
          this.updateForm.get('descBm').setValue(dataBm.contentDescription);
          
          this.updateForm.get('active').setValue(dataEn.isActiveFlag);
          this.updateForm.get('urlEng').setValue(dataEn.contentUrl);
          this.updateForm.get('urlMy').setValue(dataBm.contentUrl);
          this.updateForm.get('seqEng').setValue(dataEn.contentSort);
          this.updateForm.get('seqMy').setValue(dataBm.contentSort);

          this.dateFormatExample = "";
          // this.publishdt = dataEn.publishDate;
          // this.enddt = dataEn.endDate;
          if(dataBm.publishDate != undefined){
            this.setEventDate(dataBm.publishDate,'publish')
            this.setEventDate(dataBm.endDate, 'endD')        
  
            this.updateForm.get('publish').setValue(new Date(dataEn.publishDate).toISOString());
            this.updateForm.get('endD').setValue(new Date(dataEn.endDate).toISOString());
          }

          if(dataEn.contentImage != null){
            this.selectedFileEn = dataEn.contentImage.mediaFile;
            this.selectedFileMy = dataBm.contentImage.mediaFile;

            this.updateForm.get('imgEn').setValue(parseInt(dataEn.contentImage.mediaId));
            this.updateForm.get('imgBm').setValue(parseInt(dataBm.contentImage.mediaId));
          }
          
          


          this.sliderCode = this.sliderData.refCode;
          this.sliderIdEn = dataEn.contentId;
          this.sliderIdBm = dataBm.contentId;
          this.sendForApporval = dataEn.isSendForApproval;

          this.checkReqValues();

        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        
        this.loading = false;
      });

  }

  getMinEventDate(){
    let today = new Date();
    let todaysdt = today.getDate();
    let year = today.getFullYear();
    let month = today.getMonth(); 

    //this.minDate = new Date(year, month, todaysdt);
    this.sMinDate = new Date(year, month, todaysdt);
    this.eMinDate = new Date(year, month, todaysdt);
  }

  publishEvent(type: string, event: OwlDateTimeInputDirective<Date>) { 

    let year, month, day;
    this.events = [];
    this.events.push(`${event.value}`);

    this.publishdt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";   

    year = new Date(this.events[0]).getFullYear();
    month = new Date(this.events[0]).getMonth();
    day = new Date(this.events[0]).getDate();
 
    this.eMinDate = new Date(year,month,day);

    //if(this.publishdt>this.enddt || this.enddt == undefined){
      // this.enddt = new Date(year,month,day).getTime(); 
      // this.enddt = new Date(this.events[0]).getTime();
      // this.updateForm.get('endD').setValue(new Date(this.enddt).toISOString());
    //}

    if(this.publishdt>this.enddt || this.enddt == undefined){
      this.enddt = new Date(this.events[0]).getTime();
      this.updateForm.get('endD').setValue(new Date(this.enddt).toISOString());
      this.enddt = null;
    }
    //this.updateForm.get('endD').setValue('');

    this.checkReqValues()    
  }

  endEvent(type: string, event: OwlDateTimeInputDirective<Date>) { 

    this.events = [];
    this.events.push(`${event.value}`);
    this.enddt = new Date(this.events[0]).getTime();    
    this.dateFormatExample = "";
    this.checkReqValues()
  }

  setEventDate(tsd,type) {

    let year, month, day;
    let res;    
    this.events = [];
    var d = new Date(tsd); 
    this.events.push(`${d}`);

    year = new Date(this.events[0]).getFullYear();
    month = new Date(this.events[0]).getMonth();
    day = new Date(this.events[0]).getDate();

    if(type == 'publish'){

      this.eMinDate = new Date(year,month,day);
      this.publishdt = new Date(this.events[0]).getTime();
      this.enddt = new Date(this.events[0]).getTime();     
      this.updateForm.get('endD').setValue(new Date(this.enddt).toISOString());
    }
    else{
      this.enddt = new Date(this.events[0]).getTime();
    }

    this.dateFormatExample = "";
    return res;
  }

  isChecked(e) {

    if (e.checked) {
      this.updateForm.get("imgBm").setValue(this.imgEn.value);
    } else {
      this.updateForm.get("imgBm").setValue("");
    }
    this.copyImg = e.checked;
    this.checkReqValues();
  }

  changeLanguageAddEdit(){
    if (this.refCode === 'add'){
      this.commonservice.pageModeChange(false);  
    }
    else{
      this.commonservice.pageModeChange(true);      
    }
  }

  checkReqValues() {

    let titleEn = "titleEn";
    let descEn = "descEn";
    let imgEn = "imgEn";
    let titleBm = "titleBm";
    let descBm = "descBm";
    let imgBm = "imgBm";

    let reqVal: any = [titleEn, descEn, imgEn, titleBm, descBm, imgBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    // this.isSameImg(this.updateForm.get(imgEn).value, this.updateForm.get(imgBm).value);

    // 
    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  myFunction() {
    this.updateForm.reset();
    this.updateForm.get('active').setValue(true);
    this.checkReqValues();
    this.events = [];
    this.publishdt = null;
    this.enddt = null;
    this.dateFormatExample = "";
  }

  getImageList() {
    this.loading = true;
    return this.commonservice.readProtected('media/category/name/Slider', '0', '999999999', '', this.languageId)
      .subscribe(resCatData => {
        this.imageData = resCatData['list'];
        this.loading = false;
      },
        Error => {
          this.loading = false;
          
        });
  }
  
  selectedImg(e, val){
    
    this.getImgIdEn = e.value;
    this.getImgIdBm = e.value;
    let dataList = this.imageData;
    let indexVal: any;
    let idBm: any;
    let idEn: any;

   
    if(val == 1){

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[0].mediaId;
        if(indexVal == this.getImgIdEn){
          idBm = dataList[i].list[1].mediaId;
          this.selectedFileEn=dataList[i].list[0].mediaFile;
          this.selectedFileMy=dataList[i].list[1].mediaFile;
        }        
      }

      this.updateForm.get('imgBm').setValue(idBm);  
    }
    else{

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[1].mediaId;
        if(indexVal == this.getImgIdBm){
          idEn = dataList[i].list[0].mediaId;
          this.selectedFileEn=dataList[i].list[0].mediaFile;
          this.selectedFileMy=dataList[i].list[1].mediaFile;
        }        
      }

      this.updateForm.get('imgEn').setValue(idEn); 
    }
    this.checkReqValues();

  }

  copyValue(type) {
    let elemOne = this.updateForm.get('seqEng');
    let elemTwo = this.updateForm.get('seqMy');

    if (type == 1)
      elemTwo.setValue(elemOne.value)
    else
      elemOne.setValue(elemTwo.value)

    this.stripspaces(elemOne)
    this.stripspaces(elemTwo)

  }
  stripspaces(input) {
    if (input.value != null) {
      let word = input.value.toString();
      input.value = word.replace(/\s/gi, "");
      return true;
    }
    else {
      return false;
    }

  }

  sliderDraft(formValues: any) {

    if (this.refCode == "add") {

      let body = [
        
        { 
          "contentCategoryId": null,
          "contents": [
            {
              "sliderTitle": null,
              "sliderDescription": null,
              "sliderImage": {
                "mediaId": null
              },
              // "sliderCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              },
              "sliderPublishDate": null,
              "sliderEndDate": null
            }
          ]
        },
        {
          "contentCategoryId": null,
          "contents": [
            {
              "sliderTitle": null,
              "sliderDescription": null,
              "sliderImage": {
                "mediaId": null
              },
              // "sliderCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              },
              "sliderPublishDate": null,
              "sliderEndDate": null
            }
          ]
        }
      ];

      // 
      body[0].contentCategoryId = this.commonservice.sliderContentCategoryIdEn;
      body[0].contents[0].sliderTitle = formValues.titleEn;
      body[0].contents[0].sliderDescription = formValues.descEn;
      body[0].contents[0].sliderImage.mediaId = formValues.imgEn;
      body[0].contents[0].sliderSort = formValues.seqEng;
      body[0].contents[0].sliderUrl = formValues.urlEng;
      body[0].contents[0].sliderActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;

      body[1].contentCategoryId = this.commonservice.sliderContentCategoryIdBm;
      body[1].contents[0].sliderTitle = formValues.titleBm;
      body[1].contents[0].sliderDescription = formValues.descBm;
      body[1].contents[0].sliderImage.mediaId = formValues.imgBm;
      body[1].contents[0].sliderSort = formValues.seqMy;
      body[1].contents[0].sliderUrl = formValues.urlMy;
      body[1].contents[0].sliderActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;
      
      body[0].contents[0].sliderPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].sliderEndDate = new Date(formValues.endD).getTime();

      body[1].contents[0].sliderPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].sliderEndDate = new Date(formValues.endD).getTime();
      

      
      
      

      this.loading = true;
      // Add Slider Service
      this.commonservice.create(body, 'slider/creator/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.sliderdraft'), ''); 
            this.router.navigate(['slider']);

          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          
          this.loading = false;
      });

    } else {

      let body = [
        {
          "contentCategoryId": null,
          "contents": [
            {
              "sliderId": null,
              "sliderTitle": null,
              "sliderDescription": null,
              "sliderImage": {
                "mediaId": null
              },
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              },
              "sliderPublishDate": null,
              "sliderEndDate": null
            }
          ]
        },
        {
          "contentCategoryId": null,
          "contents": [
            {
              "sliderId": null,
              "sliderTitle": null,
              "sliderDescription": null,
              "sliderImage": {
                "mediaId": null
              },
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              },
              "sliderPublishDate": null,
              "sliderEndDate": null
            }
          ]
        }
      ];

      body[0].contentCategoryId = this.commonservice.sliderContentCategoryIdEn;
      body[0].contents[0].sliderId = this.sliderIdEn;
      body[0].contents[0].sliderTitle = formValues.titleEn;
      body[0].contents[0].sliderDescription = formValues.descEn;
      body[0].contents[0].sliderImage.mediaId = formValues.imgEn;
      body[0].contents[0].sliderSort = formValues.seqEng;
      body[0].contents[0].sliderUrl = formValues.urlEng;
      body[0].contents[0].sliderActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;


      body[1].contentCategoryId = this.commonservice.sliderContentCategoryIdBm;
      body[1].contents[0].sliderId = this.sliderIdBm;
      body[1].contents[0].sliderTitle = formValues.titleBm;
      body[1].contents[0].sliderDescription = formValues.descBm;
      body[1].contents[0].sliderImage.mediaId = formValues.imgBm;
      body[1].contents[0].sliderSort = formValues.seqMy;
      body[1].contents[0].sliderUrl = formValues.urlMy;
      body[1].contents[0].sliderActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;

      body[0].contents[0].sliderPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].sliderEndDate = new Date(formValues.endD).getTime();

      body[1].contents[0].sliderPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].sliderEndDate = new Date(formValues.endD).getTime();
      

      

      this.loading = true;
      // Update Slider Service
      this.commonservice.update(body, 'slider/creator/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.sliderdraft'), ''); 
            this.router.navigate(['slider']);

          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          
          this.loading = false;
        });
    }
  }
  
  sliderSubmit(formValues: any) {

    if (this.refCode == "add") {

      let body = [
        
        { 
          "contentCategoryId": null,
          "contents": [
            {
              "sliderTitle": null,
              "sliderDescription": null,
              "sliderImage": {
                "mediaId": null
              },
              // "sliderCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              },
              "sliderPublishDate": null,
              "sliderEndDate": null
            }
          ]
        },
        {
          "contentCategoryId": null,
          "contents": [
            {
              "sliderTitle": null,
              "sliderDescription": null,
              "sliderImage": {
                "mediaId": null
              },
              // "sliderCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              },
              "sliderPublishDate": null,
              "sliderEndDate": null
            }
          ]
        }
      ];

      // 
      body[0].contentCategoryId = this.commonservice.sliderContentCategoryIdEn;
      body[0].contents[0].sliderTitle = formValues.titleEn;
      body[0].contents[0].sliderDescription = formValues.descEn;
      body[0].contents[0].sliderImage.mediaId = formValues.imgEn;
      body[0].contents[0].sliderSort = formValues.seqEng;
      body[0].contents[0].sliderUrl = formValues.urlEng;
      body[0].contents[0].sliderActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;

      body[1].contentCategoryId = this.commonservice.sliderContentCategoryIdBm;
      body[1].contents[0].sliderTitle = formValues.titleBm;
      body[1].contents[0].sliderDescription = formValues.descBm;
      body[1].contents[0].sliderImage.mediaId = formValues.imgBm;
      body[1].contents[0].sliderSort = formValues.seqMy;
      body[1].contents[0].sliderUrl = formValues.urlMy;
      body[1].contents[0].sliderActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;    

      body[0].contents[0].sliderPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].sliderEndDate = new Date(formValues.endD).getTime();

      body[1].contents[0].sliderPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].sliderEndDate = new Date(formValues.endD).getTime();
      

      

      this.loading = true;
      // Add Slider Service
      this.commonservice.create(body, 'slider/creator').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.slidersubmitted'), ''); 
            this.router.navigate(['slider']);

          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          
          this.loading = false;
      });
    }

    else{

      let body = [
        
        { 
          "contentCategoryId": null,
          "contents": [
            {
              "sliderId":  this.sliderIdEn,
              "sliderTitle": null,
              "sliderDescription": null,
              "sliderImage": {
                "mediaId": null
              },
              // "sliderCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              },
              "sliderPublishDate": null,
              "sliderEndDate": null
            }
          ]
        },
        {
          "contentCategoryId": null,
          "contents": [
            {
              "sliderId":  this.sliderIdBm,
              "sliderTitle": null,
              "sliderDescription": null,
              "sliderImage": {
                "mediaId": null
              },
              // "sliderCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              },
              "sliderPublishDate": null,
              "sliderEndDate": null
            }
          ]
        }
      ];

      // 
      body[0].contentCategoryId = this.commonservice.sliderContentCategoryIdEn;
      body[0].contents[0].sliderTitle = formValues.titleEn;
      body[0].contents[0].sliderDescription = formValues.descEn;
      body[0].contents[0].sliderImage.mediaId = formValues.imgEn;
      body[0].contents[0].sliderSort = formValues.seqEng;
      body[0].contents[0].sliderUrl = formValues.urlEng;
      body[0].contents[0].sliderActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;

      body[1].contentCategoryId = this.commonservice.sliderContentCategoryIdBm;
      body[1].contents[0].sliderTitle = formValues.titleBm;
      body[1].contents[0].sliderDescription = formValues.descBm;
      body[1].contents[0].sliderImage.mediaId = formValues.imgBm;
      body[1].contents[0].sliderSort = formValues.seqMy;
      body[1].contents[0].sliderUrl = formValues.urlMy;
      body[1].contents[0].sliderActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;    

      body[0].contents[0].sliderPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].sliderEndDate = new Date(formValues.endD).getTime();

      body[1].contents[0].sliderPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].sliderEndDate = new Date(formValues.endD).getTime();
      

      

      this.loading = true;
      // Add Slider Service
      this.commonservice.update(body, 'slider/creator').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.slidersubmitted'), ''); 
            this.router.navigate(['slider']);

          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          
          this.loading = false;
      });

    }
    
  }
}
