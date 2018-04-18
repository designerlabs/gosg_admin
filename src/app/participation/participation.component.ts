import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from './../dialogs/dialogs.service';
import { stringify } from '@angular/core/src/util';
import { forEach } from '@angular/router/src/utils/collection';
import { DialogResultExampleDialog } from '../lifeevent/lifeevent.component';
import * as $ from 'jquery';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.css']
})
export class ParticipationComponent implements OnInit {

  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  publishdt:number;  
  enddt: number;
  minDate: any;

  rawValBm: any;
  rawValEn: any;

  parseEnBtn: boolean;
  parseMyBtn: boolean;

  public contentTxtEn: FormControl;
  public contentTxtMy: FormControl;
  public htmlContentEn: FormControl;
  public htmlContentMy: FormControl;

  participantData: Object;
  dataUrl: any;
  date = new Date();
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  participantCode: any;
  participantIdEn: any;
  participantIdBm: any;

  publish: FormControl
  endD: FormControl
  titleEn: FormControl
  titleBm: FormControl
  descEn: FormControl
  descBm: FormControl
  active: FormControl
  seqEng: FormControl
  seqMy: FormControl
  urlEng: FormControl
  urlMy: FormControl
  resetMsg = this.resetMsg;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  public loading = false;

  sendForApporval: boolean;

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

  constructor(private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService,
    private dialogsService: DialogsService,
    public dialog: MatDialog,
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

    this.updateForm = builder.group({
      enVal: "",
      bmVal: ""
    })
  }

  ngOnInit() {
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    this.getMinEventDate();
    this.publish = new FormControl()
    this.endD = new FormControl
    this.titleEn = new FormControl()
    this.titleBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.active = new FormControl()
    this.seqEng = new FormControl()
    this.seqMy = new FormControl()
    this.urlEng = new FormControl();
    this.urlMy = new FormControl();
    this.htmlContentEn = new FormControl();
    this.htmlContentMy = new FormControl();

    this.parseEnBtn = false;
    this.parseMyBtn = false;

    this.updateForm = new FormGroup({

      endD: this.endD,
      publish: this.publish,
      titleEn: this.titleEn,
      descEn: this.descEn,
      titleBm: this.titleBm,
      descBm: this.descBm,
      active: this.active,
      seqEng: this.seqEng,
      seqMy: this.seqMy,
      urlEng: this.urlEng,
      urlMy: this.urlMy,
      htmlContentEn: this.htmlContentEn,
      htmlContentMy: this.htmlContentMy
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

  back() {
    this.router.navigate(['eparticipation']);
  }

  // get, add, update, delete
  getRow(row) {
    this.loading = true;
    // return this.http.get(this.appConfig.urlSlides + '/code/' + row).subscribe(
    return this.commonservice.readProtectedById('content/publisher/', row).subscribe(
      Rdata => {

        this.commonservice.errorHandling(Rdata, (function () {
          this.participantData = Rdata;
          console.log(this.participantData);
          
          let dataEn = this.participantData['contentDetailList'][0];
          let dataBm = this.participantData['contentDetailList'][1];
          // populate data
          this.updateForm.get('titleEn').setValue(dataEn.contentTitle);
          this.updateForm.get('descEn').setValue(dataEn.contentDescription);
          this.updateForm.get('titleBm').setValue(dataBm.contentTitle);
          this.updateForm.get('descBm').setValue(dataBm.contentDescription);
          this.updateForm.get('urlEng').setValue(dataEn.contentUrl);
          this.updateForm.get('urlMy').setValue(dataBm.contentUrl);
       
          this.updateForm.get('seqEng').setValue(dataEn.contentSort);
          this.updateForm.get('seqMy').setValue(dataBm.contentSort);
          this.updateForm.get('active').setValue(dataEn.isActiveFlag);

          this.dateFormatExample = "";

          this.publishdt = dataEn.publishDate;
          this.enddt = dataEn.endDate;
          this.updateForm.get('publish').setValue(dataEn.publishDate);
          this.updateForm.get('endD').setValue(dataEn.publishDate);

          this.participantCode = this.participantData.refCode;          
          this.participantIdEn = dataEn.contentId;
          this.participantIdBm = dataBm.contentId;
          this.sendForApporval = dataEn.isSendForApproval;

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

          this.checkReqValues();
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });

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

  parseChkEn(e){

    this.parseEnBtn = false;
    this.checkReqValues();
  }

  parseChkMy(e){
    this.parseMyBtn = false;
    this.checkReqValues();
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

  checkReqValues() {

    let titleEn = "titleEn";
    let descEn = "descEn";
    let titleBm = "titleBm";
    let descBm = "descBm";
    let publish = "publish";
    let endD = "endD";
    let urlEng = "urlEng";
    let urlMy = "urlMy";

    let reqVal: any = [titleEn, descEn, titleBm, descBm, publish, endD, urlEng, urlMy];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  changeLanguageAddEdit(){

    let refCode = this.router.url.split('/')[2];

    if (refCode == "add") {
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

  participationSubmit(formValues: any) {  
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
      body[0].contentCategoryId = this.commonservice.galleryContentCategoryIdEn;
      body[0].contents[0].galleryTitle = formValues.titleEn;
      body[0].contents[0].galleryDescription = formValues.descEn;
      body[0].contents[0].galleryImage.mediaId = formValues.imgEn;
      body[0].contents[0].galleryImage.mediaTypeId = formValues.mtype;
      body[0].contents[0].gallerySort = formValues.seqEng;
      body[0].contents[0].galleryActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;
      body[0].contents[0].galleryPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].galleryEndDate = new Date(formValues.endD).getTime();

      body[1].contentCategoryId = this.commonservice.galleryContentCategoryIdBm;
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
      body[0].contentCategoryId = this.commonservice.galleryContentCategoryIdEn;
      // body[0].contents[0].participantCode = this.participantCode;
      body[0].contents[0].galleryId = this.participantIdEn;
      body[0].contents[0].galleryTitle = formValues.titleEn;
      body[0].contents[0].galleryDescription = formValues.descEn;
      body[0].contents[0].galleryImage.mediaId = formValues.imgEn;
      body[0].contents[0].galleryImage.mediaTypeId = formValues.mtype;
      body[0].contents[0].gallerySort = formValues.seqEng;
      body[0].contents[0].galleryActiveFlag = formValues.active;
      body[0].contents[0].language.languageId = 1;
      body[0].contents[0].galleryPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].galleryEndDate = new Date(formValues.endD).getTime();

      body[1].contentCategoryId = this.commonservice.galleryContentCategoryIdBm;
      body[1].contents[0].galleryId = this.participantIdBm;
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
        this.commonservice.update(body, 'gallery/creator').subscribe(
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

  participationDraft(formValues: any) {  
    this.loading = true;
    if (!this.isEdit) {
      let body = [
        {
          "contentCategoryId": null,
          "contents": [{
            "eparticipationTitle": null,
            "eparticipationDescription": null,
            "eparticipationUrl": null,
            "eparticipationText": null,
            "eparticipationSort": null,
            "eparticipationActiveFlag": null,
            "language": {
              "languageId": 1
            },
            "eparticipationPublishDate": null,
            "eparticipationEndDate": null
          }]
        },
        {
          "contentCategoryId": null,
          "contents": [{
            "eparticipationTitle": null,
            "eparticipationDescription": null,
            "eparticipationUrl": null,
            "eparticipationText": null,
            "eparticipationSort": null,
            "eparticipationActiveFlag": null,
            "language": {
              "languageId": 2
            },
            "eparticipationPublishDate": null,
            "eparticipationEndDate": null
          }]
        }
      ];

      body[0].contentCategoryId = this.commonservice.participationContentCategoryIdEn;
      body[0].contents[0].eparticipationTitle = formValues.titleEn;
      body[0].contents[0].eparticipationDescription = formValues.descEn;
      body[0].contents[0].eparticipationUrl = formValues.urlEng;
      body[0].contents[0].eparticipationText = this.contentTxtEn;
      body[0].contents[0].eparticipationSort = formValues.seqEng;
      body[0].contents[0].eparticipationActiveFlag = formValues.active;
      body[0].contents[0].eparticipationPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].eparticipationEndDate = new Date(formValues.endD).getTime();

      body[1].contentCategoryId = this.commonservice.participationContentCategoryIdBm;
      body[1].contents[0].eparticipationTitle = formValues.titleBm;
      body[1].contents[0].eparticipationDescription = formValues.descBm;
      body[1].contents[0].eparticipationUrl = formValues.urlMy;
      body[1].contents[0].eparticipationText = this.contentTxtMy;
      body[1].contents[0].eparticipationSort = formValues.seqMy;
      body[1].contents[0].eparticipationActiveFlag = formValues.active;
      body[1].contents[0].eparticipationPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].eparticipationEndDate = new Date(formValues.endD).getTime();

      console.log(JSON.stringify(body))

      this.commonservice.create(body, 'e-participation/creator/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.eparticipationdraft'), '');
            this.router.navigate(['eparticipation']);
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
          "contents": [{
            "eparticipationId": null,
            "eparticipationTitle": null,
            "eparticipationDescription": null,
            "eparticipationUrl": null,
            "eparticipationText": null,
            "eparticipationSort": null,
            "eparticipationActiveFlag": null,
            "language": {
              "languageId": 1
            },
            "eparticipationPublishDate": null,
            "eparticipationEndDate": null
          }]
        },
        {
          "contentCategoryId": null,
          "contents": [{
            "eparticipationId": null,
            "eparticipationTitle": null,
            "eparticipationDescription": null,
            "eparticipationUrl": null,
            "eparticipationText": null,
            "eparticipationSort": null,
            "eparticipationActiveFlag": null,
            "language": {
              "languageId": 2
            },
            "eparticipationPublishDate": null,
            "eparticipationEndDate": null
          }]
        }
      ];
      
      body[0].contentCategoryId = this.commonservice.participationContentCategoryIdEn;
      body[0].contents[0].eparticipationId = this.participantIdEn;
      body[0].contents[0].eparticipationTitle = formValues.titleEn;
      body[0].contents[0].eparticipationDescription = formValues.descEn;
      body[0].contents[0].eparticipationUrl = formValues.urlEng;
      body[0].contents[0].eparticipationText = this.contentTxtEn;
      body[0].contents[0].eparticipationSort = formValues.seqEng;
      body[0].contents[0].eparticipationActiveFlag = formValues.active;
      body[0].contents[0].eparticipationPublishDate = new Date(formValues.publish).getTime();
      body[0].contents[0].eparticipationEndDate = new Date(formValues.endD).getTime();

      body[1].contentCategoryId = this.commonservice.participationContentCategoryIdBm;
      body[1].contents[0].eparticipationId = this.participantIdBm;
      body[1].contents[0].eparticipationTitle = formValues.titleBm;
      body[1].contents[0].eparticipationDescription = formValues.descBm;
      body[1].contents[0].eparticipationUrl = formValues.urlMy;
      body[1].contents[0].eparticipationText = this.contentTxtMy;
      body[1].contents[0].eparticipationSort = formValues.seqMy;
      body[1].contents[0].eparticipationActiveFlag = formValues.active;
      body[1].contents[0].eparticipationPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].eparticipationEndDate = new Date(formValues.endD).getTime();

      console.log(JSON.stringify(body));

      // this.commonservice.update(body, 'gallery/multiple/update').subscribe(
        this.commonservice.update(body, 'participation/creator/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.eparticipationdraft'), '');
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
