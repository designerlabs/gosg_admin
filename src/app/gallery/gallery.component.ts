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
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  
  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  publishdt:number;  
  enddt: number;
  minDate: any;

  galleryData: Object;
  dataUrl: any;
  date = new Date();
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  galleryCode: any;
  galleryIdEn: any;
  galleryIdBm: any;

  publish: FormControl
  endD: FormControl
  titleEn: FormControl
  titleBm: FormControl
  descEn: FormControl
  descBm: FormControl
  imgEn: FormControl
  imgBm: FormControl
  active: FormControl
  copyImg: FormControl
  seqEng: FormControl
  seqMy: FormControl
  mtype: FormControl
  resetMsg = this.resetMsg;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  fileData = [];
  mediaTypes: any;
  public loading = false;
  getImgIdEn: any;
  getImgIdBm: any;
  selectedFileEn = '';
  selectedFileMy = '';
  mediaPath = '';
  contentCategoryIdEn='';
  contentCategoryIdMy='';

  sendForApporval: boolean;

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
              this.commonservice.getModuleId();
              this.changeLanguageAddEdit();
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
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    this.getMinEventDate();
    // this.getFileList();
    this.getMediaTypes()
    this.publish = new FormControl()
    this.endD = new FormControl
    this.titleEn = new FormControl()
    this.titleBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.imgEn = new FormControl()
    this.imgBm = new FormControl()
    this.active = new FormControl()
    this.copyImg = new FormControl()
    this.seqEng = new FormControl()
    this.seqMy = new FormControl()
    this.mtype = new FormControl()

    this.updateForm = new FormGroup({

      endD: this.endD,
      publish: this.publish,
      titleEn: this.titleEn,
      descEn: this.descEn,
      imgEn: this.imgEn,
      titleBm: this.titleBm,
      descBm: this.descBm,
      imgBm: this.imgBm,
      active: this.active,
      copyImg: this.copyImg,
      seqEng: this.seqEng,
      seqMy: this.seqMy,
      mtype: this.mtype,
    });

    let now = new Date();
    

    if (refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
      this.updateForm.get('active').setValue(true);

      this.publishdt = now.getTime();
      this.updateForm.get('publish').setValue(now.getTime());
      this.enddt = now.getTime();
      this.updateForm.get('endD').setValue(now.getTime());
      
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }

    // #### for disable non update user ---1
    if (!this.commonservice.isUpdate && this.commonservice.isWrite) {
      this.updateForm.enable();
    } else if (!this.commonservice.isUpdate) {
      this.updateForm.disable();
    }
  }

  isSameImg(enImg, bmImg) {
    console.log(enImg)
    if (enImg != null && enImg == bmImg) {
      this.updateForm.get('copyImg').setValue(true);
    } else {
      this.updateForm.get('copyImg').setValue(false);
    }
  }

  back() {
    this.router.navigate(['gallery']);
  }

  // get, add, update, delete
  getRow(row) {
    this.loading = true;
    // Update gallery Service
    // return this.http.get(this.appConfig.urlSlides + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
    return this.commonservice.readProtectedById('content/publisher/', row).subscribe(
      Rdata => {

        this.commonservice.errorHandling(Rdata, (function () {
          this.galleryData = Rdata;
          console.log(this.galleryData);
          
          let dataEn = this.galleryData['contentDetailList'][0];
          let dataBm = this.galleryData['contentDetailList'][1];
          this.getFileList(parseInt(dataEn.contentImage.mediaTypeId)); 
          // populate data
          this.updateForm.get('titleEn').setValue(dataEn.contentTitle);
          this.updateForm.get('descEn').setValue(dataEn.contentDescription);
          this.updateForm.get('imgEn').setValue(parseInt(dataEn.contentImage.mediaId));

          this.updateForm.get('titleBm').setValue(dataBm.contentTitle);
          this.updateForm.get('descBm').setValue(dataBm.contentDescription);
          this.updateForm.get('imgBm').setValue(parseInt(dataBm.contentImage.mediaId));

       
          this.updateForm.get('seqEng').setValue(dataEn.contentSort);
          this.updateForm.get('seqMy').setValue(dataBm.contentSort);
          this.updateForm.get('active').setValue(dataEn.isActiveFlag);

          this.updateForm.get('mtype').setValue(parseInt(dataEn.contentImage.mediaTypeId));

          this.selectedFileEn = dataEn.contentImage.mediaFile;
          this.selectedFileMy= dataBm.contentImage.mediaFile;

          this.dateFormatExample = "";

          this.publishdt = dataEn.publishDate;
          this.enddt = dataEn.endDate;
          this.updateForm.get('publish').setValue(dataEn.publishDate);
          this.updateForm.get('endD').setValue(dataEn.publishDate);

          this.galleryCode = this.galleryData.refCode;          
          this.galleryIdEn = dataEn.contentId;
          this.galleryIdBm = dataBm.contentId;

          this.sendForApporval = dataEn.isSendForApproval;

          if(dataEn.contentImage.mediaTypeId === 1){
            this.mediaPath = "documents";
          }else if(dataEn.contentImage.mediaTypeId === 2){
            this.mediaPath = "images";
          }else if(dataEn.contentImage.mediaTypeId === 3){
            this.mediaPath = "audios";
          }else if(dataEn.contentImage.mediaTypeId === 4){
            this.mediaPath = "videos";
          }

          //this.isSameImg(dataEn.galleryImage.mediaFile, dataBm.galleryImage.mediaFile);
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

  isChecked(e) {

    if (e.checked) {
      this.updateForm.get("imgBm").setValue(this.imgEn.value);
    } else {
      this.updateForm.get("imgBm").setValue("");
    }
    this.copyImg = e.checked;
    this.checkReqValues();
  }

  checkReqValues() {

    let titleEn = "titleEn";
    let descEn = "descEn";
    let imgEn = "imgEn";
    let titleBm = "titleBm";
    let descBm = "descBm";
    let imgBm = "imgBm";
    let publish = "publish";
    let endD = "endD";
    let mtype = "mtype";

    let reqVal: any = [titleEn, descEn, imgEn, titleBm, descBm, imgBm, publish, endD, mtype];
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

  changeLanguageAddEdit(){
    if (this.isEdit = false) {
      if(this.languageId==1)
      {
        this.pageMode = "Add";
      }
      else{
        this.pageMode = "Tambah";
      }
      
    } else {
      if(this.languageId==1)
      {
        this.pageMode = "Update";
      }
      else{
        this.pageMode = "Kemaskini";
      }  
    }
  }

  getFileList(mediaId) {
   
    console.log(mediaId);
    this.loading = true;
    return this.commonservice.readProtected('media/category/name/Gallery', '0', '999999999')
      .subscribe(resCatData => {

        this.commonservice.errorHandling(resCatData, (function () {
            this.fileData = resCatData['list'].filter(fData=>fData.list[0].mediaTypeId == mediaId);

            console.log(this.fileData);
            
            // this.fileData = resCatData['list'].filter(fData=>fData.list[1].mediaTypeId == mediaId);
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

  getMediaTypes(){
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
    
  selectedImg(e, val){
    console.log(e);
    this.getImgIdEn = e.value;
    this.getImgIdBm = e.value;
    let dataList = this.fileData;
    let indexVal: any;
    let idBm: any;
    let idEn: any;

    console.log("EN: "+this.getImgIdEn+" BM: "+this.getImgIdBm + " value: " + val);

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

  myFunction() {
    this.updateForm.reset();
    this.updateForm.get('active').setValue(true);
    this.checkReqValues();
  }

  gallerySubmit(formValues: any) {  
    this.loading = true;
    if (!this.isEdit) {
      let body = [
        {
          "contentCategoryId": null,
          "contents": [{
            "galleryTitle": null,
            "galleryDescription": null,
            "galleryImage": {
              "mediaId": null,
              "mediaTypeId": null
            },
            "gallerySort": null,
            "galleryActiveFlag": null,
            "language": {
              "languageId": null
            },
            "galleryPublishDate": null,
            "galleryEndDate": null
          }]
        },
        {
          "contentCategoryId": null,
          "contents": [{
            "galleryTitle": null,
            "galleryDescription": null,
            "galleryImage": {
              "mediaId": null,
              "mediaTypeId": null
            },
            "gallerySort": null,
            "galleryActiveFlag": null,
            "language": {
              "languageId": null
            },
            "galleryPublishDate": null,
            "galleryEndDate": null
          }]
        }
      ];

      // console.log(formValues)
      body[0].contentCategoryId = 2;
      body[0].contents[0].galleryTitle = formValues.titleEn;
      body[0].contents[0].galleryDescription = formValues.descEn;
      body[0].contents[0].galleryImage.mediaId = formValues.imgEn;
      body[0].contents[0].galleryImage.mediaTypeId = formValues.mtype;
      body[0].contents[0].gallerySort = formValues.seqEng;
      body[0].contents[0].galleryActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;
      body[0].contents[0].galleryPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].galleryEndDate = new Date(formValues.endD).getTime();

      body[1].contentCategoryId = 10;
      body[1].contents[0].galleryTitle = formValues.titleBm;
      body[1].contents[0].galleryDescription = formValues.descBm;
      body[1].contents[0].galleryImage.mediaId = formValues.imgBm;
      body[1].contents[0].galleryImage.mediaTypeId = formValues.mtype;
      body[1].contents[0].gallerySort = formValues.seqMy;
      body[1].contents[0].galleryActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;
      body[1].contents[0].galleryPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].galleryEndDate = new Date(formValues.endD).getTime();

      console.log(JSON.stringify(body))


      // Add gallery Service
      this.commonservice.create(body, 'gallery').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.gallerysubmitted'), '');
            this.router.navigate(['gallery']);
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
              "galleryId": null,
              "galleryTitle": null,
              "galleryDescription": null,
              "galleryImage": {
                "mediaId": null,
                "mediaTypeId": null
              },
              "gallerySort": null,
              "galleryActiveFlag": null,
              "language": {
                "languageId": null
              },
              "galleryPublishDate": null,
              "galleryEndDate": null
            }
          ]
        },
        {
          "contentCategoryId": null,
          "contents": [
            {
              "galleryId": null,
              "galleryTitle": null,
              "galleryDescription": null,
              "galleryImage": {
                "mediaId": null,
                "mediaTypeId": null
              },
              "gallerySort": null,
              "galleryActiveFlag": null,
              "language": {
                "languageId": null
              },
              "galleryPublishDate": null,
              "galleryEndDate": null
            }
          ]
        }
      ];
      body[0].contentCategoryId = 2;
      // body[0].contents[0].galleryCode = this.galleryCode;
      body[0].contents[0].galleryId = this.galleryIdEn;
      body[0].contents[0].galleryTitle = formValues.titleEn;
      body[0].contents[0].galleryDescription = formValues.descEn;
      body[0].contents[0].galleryImage.mediaId = formValues.imgEn;
      body[0].contents[0].galleryImage.mediaTypeId = formValues.mtype;
      body[0].contents[0].gallerySort = formValues.seqEng;
      body[0].contents[0].galleryActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;
      body[0].contents[0].galleryPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].galleryEndDate = new Date(formValues.endD).getTime();

      body[1].contentCategoryId = 10;
      body[1].contents[0].galleryId = this.galleryIdBm;
      body[1].contents[0].galleryTitle = formValues.titleBm;
      body[1].contents[0].galleryDescription = formValues.descBm;
      body[1].contents[0].galleryImage.mediaId = formValues.imgBm;
      body[1].contents[0].galleryImage.mediaTypeId = formValues.mtype;
      body[1].contents[0].gallerySort = formValues.seqMy;
      body[1].contents[0].galleryActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;
      body[1].contents[0].galleryPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].galleryEndDate = new Date(formValues.endD).getTime();
      console.log(body);
      // Update gallery Service
      // this.commonservice.update(body, 'gallery/multiple/update').subscribe(
        this.commonservice.update(body, 'gallery').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.gallerysubmitted'), '');
            this.router.navigate(['gallery']);
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

  galleryDraft(formValues: any) {  
    this.loading = true;
    if (!this.isEdit) {
      let body = [
        {
          "contentCategoryId": null,
          "contents": [{
            "galleryTitle": null,
            "galleryDescription": null,
            "galleryImage": {
              "mediaId": null,
              "mediaTypeId": null
            },
            "gallerySort": null,
            "galleryActiveFlag": null,
            "language": {
              "languageId": null
            },
            "galleryPublishDate": null,
            "galleryEndDate": null
          }]
        },
        {
          "contentCategoryId": null,
          "contents": [{
            "galleryTitle": null,
            "galleryDescription": null,
            "galleryImage": {
              "mediaId": null,
              "mediaTypeId": null
            },
            "gallerySort": null,
            "galleryActiveFlag": null,
            "language": {
              "languageId": null
            },
            "galleryPublishDate": null,
            "galleryEndDate": null
          }]
        }
      ];

      // console.log(formValues)
      body[0].contentCategoryId = 2;
      body[0].contents[0].galleryTitle = formValues.titleEn;
      body[0].contents[0].galleryDescription = formValues.descEn;
      body[0].contents[0].galleryImage.mediaId = formValues.imgEn;
      body[0].contents[0].galleryImage.mediaTypeId = formValues.mtype;
      body[0].contents[0].gallerySort = formValues.seqEng;
      body[0].contents[0].galleryActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;
      body[0].contents[0].galleryPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].galleryEndDate = new Date(formValues.endD).getTime();

      body[1].contentCategoryId = 10;
      body[1].contents[0].galleryTitle = formValues.titleBm;
      body[1].contents[0].galleryDescription = formValues.descBm;
      body[1].contents[0].galleryImage.mediaId = formValues.imgBm;
      body[1].contents[0].galleryImage.mediaTypeId = formValues.mtype;
      body[1].contents[0].gallerySort = formValues.seqMy;
      body[1].contents[0].galleryActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;
      body[1].contents[0].galleryPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].galleryEndDate = new Date(formValues.endD).getTime();

      console.log(JSON.stringify(body))


      // Add gallery Service
      this.commonservice.create(body, 'gallery/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.gallerydraft'), '');
            this.router.navigate(['gallery']);
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
              "galleryId": null,
              "galleryTitle": null,
              "galleryDescription": null,
              "galleryImage": {
                "mediaId": null,
                "mediaTypeId": null
              },
              "gallerySort": null,
              "galleryActiveFlag": null,
              "language": {
                "languageId": null
              },
              "galleryPublishDate": null,
              "galleryEndDate": null
            }
          ]
        },
        {
          "contentCategoryId": null,
          "contents": [
            {
              "galleryId": null,
              "galleryTitle": null,
              "galleryDescription": null,
              "galleryImage": {
                "mediaId": null,
                "mediaTypeId": null
              },
              "gallerySort": null,
              "galleryActiveFlag": null,
              "language": {
                "languageId": null
              },
              "galleryPublishDate": null,
              "galleryEndDate": null
            }
          ]
        }
      ];
      body[0].contentCategoryId = 2;
      // body[0].contents[0].galleryCode = this.galleryCode;
      body[0].contents[0].galleryId = this.galleryIdEn;
      body[0].contents[0].galleryTitle = formValues.titleEn;
      body[0].contents[0].galleryDescription = formValues.descEn;
      body[0].contents[0].galleryImage.mediaId = formValues.imgEn;
      body[0].contents[0].galleryImage.mediaTypeId = formValues.mtype;
      body[0].contents[0].gallerySort = formValues.seqEng;
      body[0].contents[0].galleryActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;
      body[0].contents[0].galleryPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].galleryEndDate = new Date(formValues.endD).getTime();

      body[1].contentCategoryId = 10;
      body[1].contents[0].galleryId = this.galleryIdBm;
      body[1].contents[0].galleryTitle = formValues.titleBm;
      body[1].contents[0].galleryDescription = formValues.descBm;
      body[1].contents[0].galleryImage.mediaId = formValues.imgBm;
      body[1].contents[0].galleryImage.mediaTypeId = formValues.mtype;
      body[1].contents[0].gallerySort = formValues.seqMy;
      body[1].contents[0].galleryActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;
      body[1].contents[0].galleryPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].galleryEndDate = new Date(formValues.endD).getTime();
      console.log(body);
      // Update gallery Service
      // this.commonservice.update(body, 'gallery/multiple/update').subscribe(
        this.commonservice.update(body, 'gallery/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.gallerydraft'), '');
            this.router.navigate(['gallery']);
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
