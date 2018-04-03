import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from './../dialogs/dialogs.service';
import { stringify } from '@angular/core/src/util';
import { forEach } from '@angular/router/src/utils/collection';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';
import { DialogResultExampleDialog } from '../lifeevent/lifeevent.component';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PublisherComponent implements OnInit {

  rawValBm: any;
  rawValEn: any;

  parseEnBtn: boolean;
  parseMyBtn: boolean;

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

  public contentTxtEn: FormControl;
  public contentTxtMy: FormControl;
  public htmlContentEn: FormControl;
  public htmlContentMy: FormControl;

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
  public citizenflag:FormControl;
  public noncitizenflag: FormControl;
  approve: FormControl
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
  mediaPath = '';

  sendForApporval: boolean;
  refCode = "";

  categoryCode: any;
  categoryName: any;
  appPublisher = false;

  disableApprove: any;
  userDetails: any;
  createdBy: any;
  fullName: any;
  email: any;

  editor = { enVal: '', bmVal: ''};
  editorConfig = {
    "editable": true,
    "spellcheck": true,
    "height": "600px",
    "minHeight": "0",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "toolbar": [
        ["bold", "italic"],
        ["cut", "copy", "delete", "undo", "redo"],
        ["paragraph", "orderedList", "unorderedList"],
        ["link", "unlink"]
    ]
  }

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService,
    private translate: TranslateService,
    private router: Router,    
    private dialogsService: DialogsService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    public builder: FormBuilder
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
      this.commonservice.
      getModuleId();
    }
    /* LANGUAGE FUNC */

    this.updateForm = builder.group({
      enVal: "",
      bmVal: ""
    })
  }

  ngOnInit() {

    this.refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();    
    this.getMinEventDate();
    
    this.htmlContentEn = new FormControl();
    this.htmlContentMy = new FormControl();
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
    this.citizenflag = new FormControl();
    this.noncitizenflag = new FormControl();
    this.approve = new FormControl();
    this.seqEng = new FormControl();
    this.seqMy = new FormControl();

    this.updateForm = new FormGroup({

      htmlContentEn: this.htmlContentEn,
      htmlContentMy: this.htmlContentMy,
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
      citizenflag: this.citizenflag,
      noncitizenflag: this.noncitizenflag,
      approve: this.approve,
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
    
    this.getImageList();  
    this.getMediaTypes();

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
    this.mediaPath = ""

    this.updateForm.get('imgEn').setValue('');
    this.updateForm.get('imgBm').setValue('');

    
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

  getUserInfo(id) {
   
    console.log(id);
    this.loading = true;
    return this.commonservice.readProtected('usermanagement/' + id)
      .subscribe(resUser => {

        this.commonservice.errorHandling(resUser, (function () {
          
            this.userDetails = resUser["user"];

            this.fullName = this.userDetails.fullName;
            this.email = this.userDetails.email;

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
    
    return this.commonservice.readProtectedById('content/publisher/', row).subscribe(
      // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function () {

          this.publisherData = Rdata;
          let dataEn = this.publisherData['contentDetailList'][0];
          let dataBm = this.publisherData['contentDetailList'][1];

          //populate data
          this.updateForm.get('titleEn').setValue(dataEn.contentTitle);
          this.updateForm.get('descEn').setValue(dataEn.contentDescription);
         
          this.updateForm.get('titleBm').setValue(dataBm.contentTitle);
          this.updateForm.get('descBm').setValue(dataBm.contentDescription);
          
          this.updateForm.get('urlEng').setValue(dataEn.contentUrl);
          this.updateForm.get('urlMy').setValue(dataBm.contentUrl);
          this.updateForm.get('seqEng').setValue(dataEn.contentSort);
          this.updateForm.get('seqMy').setValue(dataBm.contentSort);

          this.updateForm.get('active').setValue(dataEn.isActiveFlag);
          this.updateForm.get('approve').setValue(dataEn.isApprovedFlag);

          this.createdBy = dataEn.createdBy;
          this.getUserInfo(this.createdBy);

          this.categoryCode = dataEn.contentCategories[0].categoryCode;
          this.categoryName = dataEn.contentCategories[0].categoryName;

          //check contentImage element exist or not.
          let getObjKeys = Object.keys(dataEn);
          let valMT = getObjKeys.filter(fmt => fmt === "contentImage");
          
          if(valMT.length > 0){
            this.updateForm.get('mtype').setValue(parseInt(dataEn.contentImage.mediaTypeId)); 

            //get list of images if slider
            if(this.categoryCode === this.commonservice.sliderCategoryCode){
              this.getImageList();
            }

            //get list of images if besides slider
            else{
              this.getFileList(dataEn.contentImage.mediaTypeId);
            }
        
            if(dataEn.contentImage != null){
              this.selectedFileEn = dataEn.contentImage.mediaFile;
              this.selectedFileMy = dataBm.contentImage.mediaFile;

              this.updateForm.get('imgEn').setValue(parseInt(dataEn.contentImage.mediaId));
              this.updateForm.get('imgBm').setValue(parseInt(dataBm.contentImage.mediaId));
            }

            //get path
            if(dataEn.contentImage.mediaTypeId === 1){
              this.mediaPath = "documents";
            }else if(dataEn.contentImage.mediaTypeId === 2){
              this.mediaPath = "images";
            }else if(dataEn.contentImage.mediaTypeId === 3){
              this.mediaPath = "audios";
            }else if(dataEn.contentImage.mediaTypeId === 4){
              this.mediaPath = "videos";
            }
          }

          if(dataEn.isApprovedFlag == true){
            this.appPublisher = false;
          }


          let addClassforP = dataEn.contentText.replace('class="font-size-s">', '>');
          let addClassforH1 = addClassforP.replace('class="font-size-xl">', '>');
          let addClassforH2 = addClassforH1.replace('class="font-size-l">', '>');
          let addClassforH3 = addClassforH2.replace('class="font-size-m">', '>');
          let addClassforSpan = addClassforH3.replace('class="font-size-s">', '>');
          let addClassforTable = addClassforSpan.replace('class="table">', '>');


          let addClassforP_BM = dataBm.contentText.replace('class="font-size-s">', '>');
          let addClassforH1_BM = addClassforP_BM.replace('class="font-size-xl">', '>');
          let addClassforH2_BM = addClassforH1_BM.replace('class="font-size-l">', '>');
          let addClassforH3_BM = addClassforH2_BM.replace('class="font-size-m">', '>');
          let addClassforSpan_BM = addClassforH3_BM.replace('class="font-size-s">', '>');
          let addClassforTable_BM = addClassforSpan_BM.replace('class="table">', '>');

          this.rawValEn = addClassforTable;
          this.rawValBm = addClassforTable_BM;

          //set value at input field
          this.htmlContentEn.setValue(addClassforTable);
          this.htmlContentMy.setValue(addClassforTable_BM);

          //set  value after preview
          this.contentTxtEn = addClassforTable;
          this.contentTxtMy = addClassforTable_BM;  

          this.disableApprove = dataEn.isApprovedFlag;

          this.dateFormatExample = "";

          this.publishdt = dataEn.publishDate;
          this.enddt = dataEn.endDate;
          this.updateForm.get('publish').setValue(dataEn.publishDate);
          this.updateForm.get('endD').setValue(dataEn.publishDate);

          this.publisherCode = this.publisherData.refCode;
          this.publisherIdEn = dataEn.contentId;
          this.publisherIdBm = dataBm.contentId;
          this.sendForApporval = dataEn.isSendForApproval;          

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

  parseChkEn(e){
    console.log(e);
    this.parseEnBtn = false;
  }

  parseChkMy(e){
    this.parseMyBtn = false;
  }

  onChangeEn(ele){
    if(ele == this.rawValEn){
      this.parseEnBtn = true;        
    }
    else{
      this.parseEnBtn = false;
    }   
  }

  onChangeBm(ele){
    if(ele == this.rawValBm){
      this.parseMyBtn = true;
    }
    else{
      this.parseMyBtn = false;
    }
  }

  previewEn() {
    // htmlcontent/formathtml
    this.loading = true;
    return this.commonservice.create(this.htmlContentEn.value, 'htmlcontent/formathtml')
      .subscribe(resCatData => {
        this.commonservice.errorHandling(resCatData, (function () { 
          let config = new MatDialogConfig();
          config.width = '800px';
          config.height = '600px';
          let dialogRef = this.dialog.open(DialogResultExampleDialog, config);         
          let addClassforP = resCatData.formattedHtml.replace('<p>', '<p class="font-size-s">');
          let addClassforH1 = addClassforP.replace('<h1>', '<h1 class="font-size-xl">');
          let addClassforH2 = addClassforH1.replace('<h2>', '<h2 class="font-size-l">');
          let addClassforH3 = addClassforH2.replace('<h3>', '<h3 class="font-size-m">');
          let addClassforSpan = addClassforH3.replace('<span>', '<span class="font-size-s">');
          let addClassforTable = addClassforSpan.replace('<table>', '<table class="table">');

          dialogRef.componentInstance.content = addClassforSpan;
          this.contentTxtEn = dialogRef.componentInstance.content;
          this.parseEnBtn = true;
      }).bind(this));
        this.loading = false;
      },
      error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          console.log(error);
          this.loading = false;
        });
  }
  previewMy(){
    this.loading = true;
    return this.commonservice.create(this.htmlContentMy.value, 'htmlcontent/formathtml')
      .subscribe(resCatData => {
        this.commonservice.errorHandling(resCatData, (function () { 
          let config = new MatDialogConfig();
          config.width = '800px';
          config.height = '600px';
          let dialogRef = this.dialog.open(DialogResultExampleDialog, config);         
          let addClassforP = resCatData.formattedHtml.replace('<p>', '<p class="font-size-s">');
          let addClassforH1 = addClassforP.replace('<h1>', '<h1 class="font-size-xl">');
          let addClassforH2 = addClassforH1.replace('<h2>', '<h2 class="font-size-l">');
          let addClassforH3 = addClassforH2.replace('<h3>', '<h3 class="font-size-m">');
          let addClassforSpan = addClassforH3.replace('<span>', '<span class="font-size-s">');
          let addClassforTable = addClassforSpan.replace('<table>', '<table class="table">');
          dialogRef.componentInstance.content = addClassforSpan;
          this.parseMyBtn = true;
          this.contentTxtMy = dialogRef.componentInstance.content;

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

    let titleEn = "titleEn";
    let descEn = "descEn";
    //let imgEn = "imgEn";
    let titleBm = "titleBm";
    let descBm = "descBm";
   // let imgBm = "imgBm";

    let reqVal: any = [titleEn, descEn, titleBm, descBm];
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
      this.commonservice.update(body, 'slider/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.sliderdraft'), ''); 
            this.router.navigate(['publisher']);

          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          console.log(error);
          this.loading = false;
        });
    
  }
  
  sliderSubmit(formValues: any) {

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
      this.commonservice.update(body, 'slider').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.draftsubmitted'), ''); 
            this.router.navigate(['publisher']);

          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          console.log(error);
          this.loading = false;
      });

    
  }

  approvePublisher(){

    let appVal = this.updateForm.get('approve');
    
    if(appVal.value == true){
      this.appPublisher = true;
      this.approve.enable();
    }

    else{
      this.appPublisher = false;
      this.approve.disable();
    }    
  }

}
