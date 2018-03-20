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
  mtype: FormControl
  resetMsg = this.resetMsg;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  fileData: any;
  mediaTypes: any;
  public loading = false;
  getImgIdEn: any;
  getImgIdBm: any;
  selectedFileEn = '';
  selectedFileMy = '';
  mediaPath = '';
  contentCategoryIdEn='';
  contentCategoryIdMy='';

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
    this.titleEn = new FormControl()
    this.titleBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.imgEn = new FormControl()
    this.imgBm = new FormControl()
    this.urlEng = new FormControl()
    this.urlMy = new FormControl()
    this.active = new FormControl()
    this.copyImg = new FormControl()
    this.seqEng = new FormControl()
    this.seqMy = new FormControl()
    this.mtype = new FormControl()

    this.updateForm = new FormGroup({
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
      mtype: this.mtype,
    });
    let now = new Date();
    this.publishdt = now.getTime();
    if (refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
      this.updateForm.get('active').setValue(true);
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

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['gallery']);
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
    return this.commonservice.readPortalById('gallery/code/', row).subscribe(
      Rdata => {

        this.commonservice.errorHandling(Rdata, (function () {
          this.galleryData = Rdata;
          console.log(this.galleryData);
          
          let dataEn = this.galleryData['galleryList'][0];
          let dataBm = this.galleryData['galleryList'][1];
          this.getFileList(parseInt(dataEn.galleryImage.mediaTypeId)); 
          // populate data
          this.updateForm.get('titleEn').setValue(dataEn.galleryTitle);
          this.updateForm.get('descEn').setValue(dataEn.galleryDescription);
          this.updateForm.get('imgEn').setValue(parseInt(dataEn.galleryImage.mediaId));
          this.updateForm.get('titleBm').setValue(dataBm.galleryTitle);
          this.updateForm.get('descBm').setValue(dataBm.galleryDescription);
          this.updateForm.get('imgBm').setValue(parseInt(dataBm.galleryImage.mediaId));
          this.updateForm.get('urlEng').setValue(dataEn.galleryUrl);
          this.updateForm.get('urlMy').setValue(dataBm.galleryUrl);
          this.updateForm.get('seqEng').setValue(dataEn.gallerySort);
          this.updateForm.get('seqMy').setValue(dataBm.gallerySort);
          this.updateForm.get('active').setValue(dataEn.galleryActiveFlag);
          this.updateForm.get('mtype').setValue(parseInt(dataEn.galleryImage.mediaTypeId));
          this.selectedFileEn = dataEn.galleryImage.mediaFile;
          this.selectedFileMy= dataBm.galleryImage.mediaFile;
          this.galleryCode = dataEn.galleryCode;
          this.galleryIdEn = dataEn.galleryId;
          this.galleryIdBm = dataBm.galleryId;

          if(dataEn.galleryImage.mediaTypeId === 1){
            this.mediaPath = "documents";
          }else if(dataEn.galleryImage.mediaTypeId === 2){
            this.mediaPath = "images";
          }else if(dataEn.galleryImage.mediaTypeId === 3){
            this.mediaPath = "audios";
          }else if(dataEn.galleryImage.mediaTypeId === 4){
            this.mediaPath = "videos";
          }

          this.isSameImg(dataEn.galleryImage.mediaFile, dataBm.galleryImage.mediaFile);
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
    console.log(type);
    console.log(event.value);
    this.publishdt = (event.value).getTime();
    this.dateFormatExample = "";
    console.log(this.publishdt);
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
    let urlEng = "urlEng";
    let urlMy = "urlMy";
    // let active = "active";

    let reqVal: any = [titleEn, descEn, imgEn, titleBm, descBm, imgBm, urlEng, urlMy];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    this.isSameImg(this.updateForm.get(imgEn).value, this.updateForm.get(imgBm).value);

    // console.log(nullPointers)
    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  getFileList(mediaId) {
    this.loading = true;
    return this.commonservice.readProtected('media/category/name/Gallery', '0', '999999999')
      .subscribe(resCatData => {
        this.commonservice.errorHandling(resCatData, (function () {
          this.fileData = resCatData['list'].filter(fData=>fData.list[0].mediaTypeId == mediaId);
          // this.fileData = resCatData['list'].filter(fData=>fData.list[1].mediaTypeId == mediaId);
          this.contentCategoryIdEn = this.fileData[0].list[0].rootCategoryId;
          this.contentCategoryIdMy = this.fileData[0].list[1].rootCategoryId;
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
    debugger;
    let resMT = this.mediaTypes.filter(fmt => fmt.mediaTypeId === e.value);
    

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
          // this.selectedFileEn=dataList[i].list[0].mediaFile;
          this.selectedFileMy=dataList[i].list[1].mediaFile;
        }        
      }
      // this.updateForm.get('imgEn').setValue(idEn); 
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
              "mediaId": null
            },
            "gallerySort": null,
            "galleryUrl": null,
            "galleryActiveFlag": null,
            "language": {
              "languageId": null
            }
          }]
        },
        {
          "contentCategoryId": null,
          "contents": [{
            "galleryTitle": null,
            "galleryDescription": null,
            "galleryImage": {
              "mediaId": null
            },
            "gallerySort": null,
            "galleryUrl": null,
            "galleryActiveFlag": null,
            "language": {
              "languageId": null
            }
          }]
        }
      ];

      // console.log(formValues)
      body[0].contentCategoryId = this.contentCategoryIdEn;
      body[0].contents[0].galleryTitle = formValues.titleEn;
      body[0].contents[0].galleryDescription = formValues.descEn;
      body[0].contents[0].galleryImage.mediaId = formValues.imgEn;
      body[0].contents[0].gallerySort = formValues.seqEng;
      body[0].contents[0].galleryUrl = formValues.urlEng;
      body[0].contents[0].galleryActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;

      body[1].contentCategoryId = this.contentCategoryIdMy;
      body[1].contents[0].galleryTitle = formValues.titleBm;
      body[1].contents[0].galleryDescription = formValues.descBm;
      body[1].contents[0].galleryImage.mediaId = formValues.imgBm;
      body[1].contents[0].gallerySort = formValues.seqMy;
      body[0].contents[0].galleryUrl = formValues.urlMy;
      body[1].contents[0].galleryActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;

      console.log(body)

      // Add gallery Service
      this.commonservice.create(body, 'gallery/creator/draft').subscribe(
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
                "mediaId": null
              },
              "gallerySort": null,
              "galleryUrl": null,
              "galleryActiveFlag": null,
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
              "galleryId": null,
              "galleryTitle": null,
              "galleryDescription": null,
              "galleryImage": {
                "mediaId": null
              },
              "gallerySort": null,
              "galleryUrl": null,
              "galleryActiveFlag": null,
              "language": {
                "languageId": null
              }
            }
          ]
        }
      ];
      body[0].contentCategoryId = this.contentCategoryIdEn;
      // body[0].contents[0].galleryCode = this.galleryCode;
      body[0].contents[0].galleryId = this.galleryIdEn;
      body[0].contents[0].galleryTitle = formValues.titleEn;
      body[0].contents[0].galleryDescription = formValues.descEn;
      body[0].contents[0].galleryImage.mediaId = formValues.imgEn;
      body[0].contents[0].gallerySort = formValues.seqEng;
      body[0].contents[0].galleryUrl = formValues.urlEng;
      body[0].contents[0].galleryActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;

      body[1].contentCategoryId = this.contentCategoryIdMy;
      body[1].contents[0].galleryId = this.galleryIdBm;
      body[1].contents[0].galleryTitle = formValues.titleBm;
      body[1].contents[0].galleryDescription = formValues.descBm;
      body[1].contents[0].galleryImage.mediaId = formValues.imgBm;
      body[1].contents[0].gallerySort = formValues.seqMy;
      body[1].contents[0].galleryUrl = formValues.urlMy;
      body[1].contents[0].galleryActiveFlag = formValues.active;
      body[1].contents[0].language.languageId = 2;
      console.log(body);
      // Update gallery Service
      // this.commonservice.update(body, 'gallery/multiple/update').subscribe(
        this.commonservice.update(body, 'gallery/creator/draft').subscribe(
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

  gallerySubmit(formValues: any) {
    this.loading = true;
    let body = [
      {
        "contentCategoryId": null,
        "contents": [{
          "galleryTitle": null,
          "galleryDescription": null,
          "galleryImage": {
            "mediaId": null
          },
          "gallerySort": null,
          "galleryUrl": null,
          "galleryActiveFlag": null,
          "language": {
            "languageId": null
          }
        }]
      },
      {
        "contentCategoryId": null,
        "contents": [{
          "galleryTitle": null,
          "galleryDescription": null,
          "galleryImage": {
            "mediaId": null
          },
          "gallerySort": null,
          "galleryUrl": null,
          "galleryActiveFlag": null,
          "language": {
            "languageId": null
          }
        }]
      }
    ];
    // console.log(formValues)
    body[0].contentCategoryId = this.contentCategoryIdEn;
    body[0].contents[0].galleryTitle = formValues.titleEn;
    body[0].contents[0].galleryDescription = formValues.descEn;
    body[0].contents[0].galleryImage.mediaId = formValues.imgEn;
    body[0].contents[0].gallerySort = formValues.seqEng;
    body[0].contents[0].galleryUrl = formValues.urlEng;
    body[0].contents[0].galleryActiveFlag = formValues.active;
    body[0].contents[0].language.languageId = 1;

    body[1].contentCategoryId = this.contentCategoryIdMy;
    body[1].contents[0].galleryTitle = formValues.titleBm;
    body[1].contents[0].galleryDescription = formValues.descBm;
    body[1].contents[0].galleryImage.mediaId = formValues.imgBm;
    body[1].contents[0].gallerySort = formValues.seqMy;
    body[0].contents[0].galleryUrl = formValues.urlMy;
    body[1].contents[0].galleryActiveFlag = formValues.active;
    body[1].contents[0].language.languageId = 2;

    console.log(body);

    // Add gallery Service
    this.commonservice.create(body, 'gallery/creator').subscribe(
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
