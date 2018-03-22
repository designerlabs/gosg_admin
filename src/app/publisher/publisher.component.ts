import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
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

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PublisherComponent implements OnInit {

  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  publishdt:number;  
  enddt: number;
  minDate: any;

  publisherData: Object;
  dataUrl: any;
  date = new Date();
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  publisherCode: any;
  publisherIdEn: any;
  publisherIdBm: any;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;

  mtype: FormControl
  publish: FormControl
  endD: FormControl
  titleEn: FormControl
  titleBm: FormControl
  descEn: FormControl
  descBm: FormControl
  imgEn: FormControl
  imgBm: FormControl
  active: FormControl
  urlEng: FormControl
  urlMy: FormControl
  seqEng: FormControl
  seqMy: FormControl
  //imageData: any;
  public loading = false;
  getImgIdEn: any;
  getImgIdBm: any;
  selectedFileEn = '';
  selectedFileMy = '';

  fileData = [];
  mediaTypes: any;
  mediaPath = 'images';

  sendForApporval: boolean;
  refCode = "";

  categoryCode: any;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService
  ) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data: any) => {
          let getLang = data.list;
          let myLangData = getLang.filter(function (val) {
            if (val.languageCode == translate.currentLang) {
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.changeLanguageAddEdit();
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
      this.commonservice.getModuleId();
    }
    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    this.refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    this.getImageList();
    this.getMinEventDate();
    this.getMediaTypes();

    this.mtype = new FormControl()
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
    this.seqEng = new FormControl();
    this.seqMy = new FormControl();

    this.updateForm = new FormGroup({

      mtype: this.mtype,
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
      seqEng: this.seqEng,
      seqMy: this.seqMy,
    });

    let now = new Date();

    if (this.refCode == "add") {
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true);
      this.publishdt = now.getTime();
      this.updateForm.get('publish').setValue(now.getTime());
      this.enddt = now.getTime();
      this.updateForm.get('endD').setValue(now.getTime());
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

  back() {
    this.router.navigate(['publisher']);
  }

  getMediaTypes(){ // data for media type
    this.loading = true;
    return this.commonservice.readProtected('mediatype')
      .subscribe(resCatData => {
        this.commonservice.errorHandling(resCatData, (function () {
          this.mediaTypes = resCatData['mediaTypes'];

          console.log(this.mediaTypes);
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        console.log(error);
        this.loading = false;
      });
  }

  selectedmType(e){

    let resMT = this.mediaTypes.filter(fmt => fmt.mediaTypeId === e.value);
    this.mediaPath = "";
    console.log("###########");
    console.log(resMT);

    if(resMT[0].mediaTypeName === "Images"){
      this.mediaPath = "images";
    }else if(resMT[0].mediaTypeName === "Documents"){
      this.mediaPath = "documents";
    }else if(resMT[0].mediaTypeName === "Videos"){
      this.mediaPath = "videos";
    }else if(resMT[0].mediaTypeName === "Audios"){
      this.mediaPath = "audios";
    }

    this.getFileList(e.value);
    this.checkReqValues();
  }

  getFileList(mediaId) {
   
    console.log(mediaId);
    this.loading = true;
    return this.commonservice.readProtected('media/category/name/Gallery', '0', '999999999')
      .subscribe(resCatData => {

        this.commonservice.errorHandling(resCatData, (function () {
            this.fileData = resCatData['list'].filter(fData=>fData.list[0].mediaTypeId == mediaId);

            console.log(this.fileData);
            
            if(this.fileData.length>0){
              this.contentCategoryIdEn = this.fileData[0].list[0].rootCategoryId;
              this.contentCategoryIdMy = this.fileData[0].list[1].rootCategoryId;
            }
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        console.log(error);
        this.loading = false;
      });
  }

  getMinEventDate(){
    let today = new Date();
    let todaysdt = today.getDate();
    let year = today.getFullYear();
    let month = today.getMonth();

    this.minDate = new Date(year, month, todaysdt);
  }

  publishEvent(type: string, event: OwlDateTimeInputDirective<Date>) { 
    console.log("START: "+type);
    console.log(event.value);
    this.publishdt = (event.value).getTime();
    this.dateFormatExample = "";
    console.log(this.publishdt);
    this.checkReqValues()
  }

  endEvent(type: string, event: OwlDateTimeInputDirective<Date>) { 
    console.log("END: "+type);
    console.log(event.value);
    this.enddt = (event.value).getTime();
    this.dateFormatExample = "";
    console.log(this.enddt);
    this.checkReqValues()
  }

  // get, add, update, delete
  getRow(row) {

    this.loading = true;
    
    return this.commonservice.readProtectedById('content/creator/', row).subscribe(
      // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function () {

          this.publisherData = Rdata;
          console.log(this.publisherData)
          let dataEn = this.publisherData['list'][0];
          let dataBm = this.publisherData['list'][1];

          // populate data
          // this.updateForm.get('titleEn').setValue(dataEn.contentTitle);
          // this.updateForm.get('descEn').setValue(dataEn.contentDescription);
         
          // this.updateForm.get('titleBm').setValue(dataBm.contentTitle);
          // this.updateForm.get('descBm').setValue(dataBm.contentDescription);
          
          // this.updateForm.get('urlEng').setValue(dataEn.contentUrl);
          // this.updateForm.get('urlMy').setValue(dataBm.contentUrl);
          // this.updateForm.get('seqEng').setValue(dataEn.contentSort);
          // this.updateForm.get('seqMy').setValue(dataBm.contentSort);

          // this.updateForm.get('active').setValue(dataEn.isActiveFlag);

          // if(dataEn.contentImage != null){
          //   this.selectedFileEn = dataEn.contentImage.mediaFile;
          //   this.selectedFileMy = dataBm.contentImage.mediaFile;

          //   this.updateForm.get('imgEn').setValue(parseInt(dataEn.contentImage.mediaId));
          //   this.updateForm.get('imgBm').setValue(parseInt(dataBm.contentImage.mediaId));
          // }
          console.log("******************UPDATE*****************************");
          console.log("EN: "+this.selectedFileEn+ " BM: "+this.selectedFileMy);


          // this.publisherCode = this.publisherData.refCode;
          // this.publisherIdEn = dataEn.contentId;
          // this.publisherIdBm = dataBm.contentId;
          // this.sendForApporval = dataEn.isSendForApproval;

          //this.isSameImg(dataEn.sliderImage, dataBm.sliderImage);
          this.categoryCode = 39;

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

    // console.log(nullPointers)
    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  myFunction() {
    this.updateForm.reset();
    this.updateForm.get('active').setValue(true);
  }

  getImageList() {
    this.loading = true;
    return this.commonservice.readProtected('media/category/name/Slider', '0', '999999999')
      .subscribe(resCatData => {
        this.fileData = resCatData['list'];
        this.loading = false;
      },
        Error => {
          this.loading = false;
          console.log('Error in Slider');
        });
  }
  
  selectedImg(e, val){
    console.log(e);
    this.getImgIdEn = e.value;
    this.getImgIdBm = e.value;
    let dataList = this.fileData;
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
              // "publisherCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              }
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
              // "publisherCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              }
            }
          ]
        }
      ];

      // console.log(formValues)
      body[0].contentCategoryId = 15;
      body[0].contents[0].sliderTitle = formValues.titleEn;
      body[0].contents[0].sliderDescription = formValues.descEn;
      body[0].contents[0].sliderImage.mediaId = formValues.imgEn;
      body[0].contents[0].sliderSort = formValues.seqEng;
      body[0].contents[0].sliderUrl = formValues.urlEng;
      body[0].contents[0].sliderActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;

      body[1].contentCategoryId = 16;
      body[1].contents[0].sliderTitle = formValues.titleBm;
      body[1].contents[0].sliderDescription = formValues.descBm;
      body[1].contents[0].sliderImage.mediaId = formValues.imgBm;
      body[1].contents[0].sliderSort = formValues.seqMy;
      body[1].contents[0].sliderUrl = formValues.urlMy;
      body[1].contents[0].sliderActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;

      console.log(JSON.stringify(body))

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
          console.log(error);
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
              }
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
              }
            }
          ]
        }
      ];

      body[0].contentCategoryId = 15;
      body[0].contents[0].sliderId = this.publisherIdEn;
      body[0].contents[0].sliderTitle = formValues.titleEn;
      body[0].contents[0].sliderDescription = formValues.descEn;
      body[0].contents[0].sliderImage.mediaId = formValues.imgEn;
      body[0].contents[0].sliderSort = formValues.seqEng;
      body[0].contents[0].sliderUrl = formValues.urlEng;
      body[0].contents[0].sliderActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;

      body[1].contentCategoryId = 16;
      body[1].contents[0].sliderId = this.publisherIdBm;
      body[1].contents[0].sliderTitle = formValues.titleBm;
      body[1].contents[0].sliderDescription = formValues.descBm;
      body[1].contents[0].sliderImage.mediaId = formValues.imgBm;
      body[1].contents[0].sliderSort = formValues.seqMy;
      body[1].contents[0].sliderUrl = formValues.urlMy;
      body[1].contents[0].sliderActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;


      console.log(JSON.stringify(body))

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
          console.log(error);
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
              // "publisherCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              }
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
              // "publisherCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              }
            }
          ]
        }
      ];

      // console.log(formValues)
      body[0].contentCategoryId = 15;
      body[0].contents[0].sliderTitle = formValues.titleEn;
      body[0].contents[0].sliderDescription = formValues.descEn;
      body[0].contents[0].sliderImage.mediaId = formValues.imgEn;
      body[0].contents[0].sliderSort = formValues.seqEng;
      body[0].contents[0].sliderUrl = formValues.urlEng;
      body[0].contents[0].sliderActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;

      body[1].contentCategoryId = 16;
      body[1].contents[0].sliderTitle = formValues.titleBm;
      body[1].contents[0].sliderDescription = formValues.descBm;
      body[1].contents[0].sliderImage.mediaId = formValues.imgBm;
      body[1].contents[0].sliderSort = formValues.seqMy;
      body[1].contents[0].sliderUrl = formValues.urlMy;
      body[1].contents[0].sliderActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;

      console.log(JSON.stringify(body))

      this.loading = true;
      // Add Slider Service
      this.commonservice.create(body, 'slider/creator').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.draftsubmitted'), ''); 
            this.router.navigate(['slider']);

          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          console.log(error);
          this.loading = false;
      });
    }

    else{

      let body = [
        
        { 
          "contentCategoryId": null,
          "contents": [
            {
              "sliderId":  this.publisherIdEn,
              "sliderTitle": null,
              "sliderDescription": null,
              "sliderImage": {
                "mediaId": null
              },
              // "publisherCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              }
            }
          ]
        },
        {
          "contentCategoryId": null,
          "contents": [
            {
              "sliderId":  this.publisherIdBm,
              "sliderTitle": null,
              "sliderDescription": null,
              "sliderImage": {
                "mediaId": null
              },
              // "publisherCode": null,
              "sliderSort": null,
              "sliderUrl": null,
              "sliderActiveFlag": false,
              "language": {
                "languageId": null
              }
            }
          ]
        }
      ];

      // console.log(formValues)
      body[0].contentCategoryId = 15;
      body[0].contents[0].sliderTitle = formValues.titleEn;
      body[0].contents[0].sliderDescription = formValues.descEn;
      body[0].contents[0].sliderImage.mediaId = formValues.imgEn;
      body[0].contents[0].sliderSort = formValues.seqEng;
      body[0].contents[0].sliderUrl = formValues.urlEng;
      body[0].contents[0].sliderActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;

      body[1].contentCategoryId = 16;
      body[1].contents[0].sliderTitle = formValues.titleBm;
      body[1].contents[0].sliderDescription = formValues.descBm;
      body[1].contents[0].sliderImage.mediaId = formValues.imgBm;
      body[1].contents[0].sliderSort = formValues.seqMy;
      body[1].contents[0].sliderUrl = formValues.urlMy;
      body[1].contents[0].sliderActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;

      console.log(JSON.stringify(body))

      this.loading = true;
      // Add Slider Service
      this.commonservice.update(body, 'slider/creator').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.draftsubmitted'), ''); 
            this.router.navigate(['slider']);

          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          console.log(error);
          this.loading = false;
      });

    }

    
  }

}
