import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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
// import { stringify } from '@angular/core/src/util';
// import { forEach } from '@angular/router/src/utils/collection';
// import * as $ from 'jquery';
import { DialogResultExampleDialog } from '../lifeevent/lifeevent.component';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from './../nav/nav.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-participationpublisher',
  templateUrl: './participationpublisher.component.html',
  styleUrls: ['./participationpublisher.component.css']
})
export class ParticipationpublisherComponent implements OnInit, OnDestroy {

  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  publishdt:number;
  enddt: number;
  minDate: any;
  sMinDate: any;
  eMinDate: any;

  rawValBm: any;
  rawValEn: any;

  parseEnBtn: boolean;
  parseMyBtn: boolean;

  approve: FormControl
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
  public agencyEn: FormControl;
  public agencyBm: FormControl;
  resetMsg = this.resetMsg;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  lang: any;
  public loading = false;

  ministryNameEn:any;
  ministryNameBm:any;
  isActiveListEn: boolean;
  isActiveListBm: boolean;
  searchAgencyResultEn: string[];
  searchAgencyResultBm: string[];
  agencyIdEn:any;
  agencyIdBm:any;

  appPublisher = false;
  disableApprove: any;

  userDetails: any;
  fullName: any;
  email: any;

  private subscriptionLang: ISubscription;
  // private subscriptionContentCreator: ISubscription;
  // private subscriptionCategoryC: ISubscription;
  // private subscriptionRecordListC: ISubscription;

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
    public commonservice: CommonService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService,
    private dialogsService: DialogsService,
    public dialog: MatDialog,
    private navservice: NavService,
    public builder: FormBuilder
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

    this.updateForm = builder.group({
      enVal: "",
      bmVal: ""
    })
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    //this.subscriptionContentCreator.unsubscribe();
    //this.subscriptionCategoryC.unsubscribe();
    //this.subscriptionRecordListC.unsubscribe();
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

    let refCode = this.router.url.split('/')[3];
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
    this.agencyEn = new FormControl();
    this.agencyBm = new FormControl();
    this.htmlContentEn = new FormControl();
    this.htmlContentMy = new FormControl();
    this.approve = new FormControl();

    this.parseEnBtn = false;
    this.parseMyBtn = false;

    this.updateForm = new FormGroup({

      approve: this.approve,
      agencyEn: this.agencyEn,
      agencyBm: this.agencyBm,
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

    // =================== START SET MAMPU AGENCY BY DEFAULT ===============
    let mampuId: any;
    let mampuCode: any;
    mampuCode = this.commonservice.mampuCode;

    if(this.languageId == 1)
      mampuId = this.commonservice.mampuIdEn;
    else
      mampuId = this.commonservice.mampuIdBm;
    // =================== END SET MAMPU AGENCY BY DEFAULT =================

    if (refCode == "add") {
      this.getDetailsAgency(mampuId, mampuCode);
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



  public htmlContentEnEditor: Object = {

    key: environment.froalakey, //'bH3A7B5C5E4C2E3D3D2G2B5==' ,

    imageUploadURL: this.appConfig.urlCommon+'image',

    imageUploadMethod: 'POST',

    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],

    charCounterCount: true,
    toolbarButtons: ['paragraphFormat', 'bold', 'italic', 'underline', 'subscript', 'superscript', 'insertTable', '|', 'formatOL', 'formatUL', '|', 'alert', 'insertFile', 'insertImage', 'insertLink', 'insertVideo', '|', 'html', '|', 'undo', 'redo'],
    toolbarButtonsXS: ['paragraphFormat', 'bold', 'italic', 'underline', 'subscript', 'superscript', 'insertTable', '|', 'formatOL', 'formatUL', '|', 'alert', 'insertFile', 'insertImage', 'insertLink', 'insertVideo', '|', 'html', '|', 'undo', 'redo'],
    toolbarButtonsSM: ['paragraphFormat', 'bold', 'italic', 'underline', 'subscript', 'superscript', 'insertTable', '|', 'formatOL', 'formatUL', '|', 'alert', 'insertFile', 'insertImage', 'insertLink', 'insertVideo', '|', 'html', '|', 'undo', 'redo'],
    toolbarButtonsMD: ['paragraphFormat', 'bold', 'italic', 'underline', 'subscript', 'superscript', 'insertTable', '|', 'formatOL', 'formatUL', '|', 'alert', 'insertFile', 'insertImage', 'insertLink', 'insertVideo', '|', 'html', '|', 'undo', 'redo']
};

  public htmlContentMyEditor: Object = {
    key: environment.froalakey, //'bH3A7B5C5E4C2E3D3D2G2B5==',

    imageUploadURL: this.appConfig.urlCommon+'image',

    imageUploadMethod: 'POST',

    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],

    charCounterCount: true,
    toolbarButtons: ['paragraphFormat', 'bold', 'italic', 'underline', 'subscript', 'superscript', 'insertTable', '|', 'formatOL', 'formatUL', '|', 'alert', 'insertFile', 'insertImage', 'insertLink', 'insertVideo', '|', 'html', '|', 'undo', 'redo'],
    toolbarButtonsXS: ['paragraphFormat', 'bold', 'italic', 'underline', 'subscript', 'superscript', 'insertTable', '|', 'formatOL', 'formatUL', '|', 'alert', 'insertFile', 'insertImage', 'insertLink', 'insertVideo', '|', 'html', '|', 'undo', 'redo'],
    toolbarButtonsSM: ['paragraphFormat', 'bold', 'italic', 'underline', 'subscript', 'superscript', 'insertTable', '|', 'formatOL', 'formatUL', '|', 'alert', 'insertFile', 'insertImage', 'insertLink', 'insertVideo', '|', 'html', '|', 'undo', 'redo'],
    toolbarButtonsMD: ['paragraphFormat', 'bold', 'italic', 'underline', 'subscript', 'superscript', 'insertTable', '|', 'formatOL', 'formatUL', '|', 'alert', 'insertFile', 'insertImage', 'insertLink', 'insertVideo', '|', 'html', '|', 'undo', 'redo']
  };

  back() {
    this.router.navigate(['publisher/eparticipation']);
  }

  getUserInfo(id) {

    this.loading = true;
    return this.commonservice.readProtected('usermanagement/' + id, '', '', '', this.languageId)
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
        this.loading = false;
      });
  }

  // get, add, update, delete
  getRow(row) {
    this.loading = true;
    // return this.http.get(this.appConfig.urlSlides + '/code/' + row).subscribe(
    return this.commonservice.readProtectedById('content/publisher/', row, this.languageId).subscribe(
      Rdata => {

        this.commonservice.errorHandling(Rdata, (function () {
          this.participantData = Rdata;

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
          this.updateForm.get('approve').setValue(dataEn.isApprovedFlag);

          this.dateFormatExample = "";

          // this.publishdt = dataEn.publishDate;
          // this.enddt = dataEn.endDate;

          if(dataBm.publishDate != undefined){
            this.setEventDate(dataBm.publishDate,'publish')
            this.setEventDate(dataBm.endDate, 'endD')

            this.updateForm.get('publish').setValue(new Date(dataEn.publishDate).toISOString());
            this.updateForm.get('endD').setValue(new Date(dataEn.endDate).toISOString());
          }

          this.participantCode = dataEn.contentCode;
          this.participantIdEn = dataEn.contentId;
          this.participantIdBm = dataBm.contentId;

          if(dataEn.isApprovedFlag == true){
            this.appPublisher = false;
            this.approve.disable();
          }

          this.disableApprove = dataEn.isApprovedFlag;

          let getContentTxtEN = dataEn.contentText;
          let getContentTxtBM = dataBm.contentText;
          let replaceTxtEN = getContentTxtEN.replace(/class=.font-size-s.>/g, '>')
                                          .replace(/class=.font-size-xl.>/g, '>')
                                          .replace(/class=.font-size-l.>/g, '>')
                                          .replace(/class=.font-size-m.>/g, '>')
                                          .replace(/class=.table.>/g, '>');


          let replaceTxtBM = getContentTxtBM.replace(/class=.font-size-s.>/g, '>')
                                            .replace(/class=.font-size-xl.>/g, '>')
                                            .replace(/class=.font-size-l.>/g, '>')
                                            .replace(/class=.font-size-m.>/g, '>')
                                            .replace(/class=.table.>/g, '>');

          this.rawValEn = replaceTxtEN;
          this.rawValBm = replaceTxtBM;

          //set value at input field
          this.htmlContentEn.setValue(replaceTxtEN);
          this.htmlContentMy.setValue(replaceTxtBM);

          //set  value after preview
          this.contentTxtEn = replaceTxtEN;
          this.contentTxtMy = replaceTxtBM;

          this.getUserInfo(dataEn.createdBy);
          //get details agency
          let getObjKeys = Object.keys(dataEn);
          let valMT = getObjKeys.filter(fmt => fmt === "agencyId");

          let detAgenId;
          let detAgenCode;

          if(valMT.length > 0){
            if(this.languageId == 2){
              detAgenId = dataBm.agencyId;
              detAgenCode = dataBm.agencyCode;
            }
            else{
              detAgenId = dataEn.agencyId;
              detAgenCode = dataEn.agencyCode;
            }

            this.getDetailsAgency(detAgenId, detAgenCode);
          }

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
          let getHTML = resCatData.formattedHtml;
          let replaceString = getHTML.replace(/<p><br>/g,'')
          .replace(/<p>/g, '<p class="font-size-s">')
          .replace(/<a/g, '<a class="font-size-s" target="_blank"')
          .replace(/<section>/g, '<section class="font-size-s">')
          .replace(/<article>/g, '<article class="font-size-s">')
          .replace(/<div>/g, '<div class="font-size-s">')
          .replace(/<h1>/g, '<h1 class="font-size-xl">')
          .replace(/<h2>/g, '<h2 class="font-size-l">')
          .replace(/<h3>/g, '<h3 class="font-size-m">')
          .replace(/<h4>/g, '<h4 class="font-size-m">')
          .replace(/<h5>/g, '<h5 class="font-size-m">')
          .replace(/<span>/g, '<span class="font-size-s">')
          .replace(/<table>/g, '<div class="table-responsive"><table class="table">')
          .replace(/<ol>/g, '<ol class="font-size-s custom_list_number">')
          .replace(/<ul>/g, '<ul class="font-size-s custom_list">');
          dialogRef.componentInstance.content = replaceString;
          this.contentTxtEn = dialogRef.componentInstance.content;
          this.parseEnBtn = true;
      }).bind(this));
        this.loading = false;
      },
      error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
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
          let getHTML = resCatData.formattedHtml;
          let replaceString = getHTML.replace(/<p><br>/g,'')
          .replace(/<p>/g, '<p class="font-size-s">')
          .replace(/<a/g, '<a class="font-size-s" target="_blank"')
          .replace(/<section>/g, '<section class="font-size-s">')
          .replace(/<article>/g, '<article class="font-size-s">')
          .replace(/<div>/g, '<div class="font-size-s">')
          .replace(/<h1>/g, '<h1 class="font-size-xl">')
          .replace(/<h2>/g, '<h2 class="font-size-l">')
          .replace(/<h3>/g, '<h3 class="font-size-m">')
          .replace(/<h4>/g, '<h4 class="font-size-m">')
          .replace(/<h5>/g, '<h5 class="font-size-m">')
          .replace(/<span>/g, '<span class="font-size-s">')
          .replace(/<table>/g, '<div class="table-responsive"><table class="table">')
          .replace(/<ol>/g, '<ol class="font-size-s custom_list_number">')
          .replace(/<ul>/g, '<ul class="font-size-s custom_list">');
          dialogRef.componentInstance.content = replaceString;
          this.parseMyBtn = true;
          this.contentTxtMy = dialogRef.componentInstance.content;

      }).bind(this));
        this.loading = false;
      },
      error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
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

    //this.minDate = new Date(year, month, todaysdt);
    this.sMinDate = new Date(year, month, todaysdt);
    this.eMinDate = new Date(year, month, todaysdt);
  }

  publishEvent(type: string, event: OwlDateTimeInputDirective<Date>) {

    let year, month, day;
    this.events = [];
    this.events.push(`${event.value}`);

    this.publishdt = new Date(this.events[0]).getTime();
    this.updateForm.get('publish').setValue(new Date(this.publishdt).toISOString());
    this.dateFormatExample = "";

    year = new Date(this.events[0]).getFullYear();
    month = new Date(this.events[0]).getMonth();
    day = new Date(this.events[0]).getDate();

    this.eMinDate = new Date(year,month,day);

    if(this.publishdt>this.enddt || this.enddt == undefined || this.enddt == null){
      this.enddt = new Date(this.events[0]).getTime();
      this.updateForm.get('endD').setValue(new Date(this.enddt).toISOString());
      //this.enddt = null;
    }

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

  checkReqValues() {

    let titleEn = "titleEn";
    let descEn = "descEn";
    let titleBm = "titleBm";
    let descBm = "descBm";
    let publish = "publish";
    let endD = "endD";
    let urlEng = "urlEng";
    let urlMy = "urlMy";
    let agencyEn = "agencyEn";
    let agencyBm = "agencyBm"

    let reqVal: any = [titleEn, descEn, titleBm, descBm, publish, endD, urlEng, urlMy, agencyEn, agencyBm];
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

    let refCode = this.router.url.split('/')[3];

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
    this.events = [];
    this.publishdt = null;
    this.enddt = null;
    this.dateFormatExample = "";
  }

  participationSubmit(formValues: any) {
    this.loading = true;
    if (this.isEdit) {

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
            "agency": {
              "agencyId": null
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
            "agency": {
              "agencyId": null
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
      body[0].contents[0].agency.agencyId = this.agencyIdEn;
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
      body[1].contents[0].agency.agencyId = this.agencyIdBm;
      body[1].contents[0].eparticipationPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].eparticipationEndDate = new Date(formValues.endD).getTime();



        this.commonservice.update(body, 'e-participation/publisher').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.eparticipationsubmitted'), '');
            this.router.navigate(['publisher/eparticipation']);
          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });
    }
  }

  participationDraft(formValues: any) {
    this.loading = true;
    if (this.isEdit) {

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
            "agency": {
              "agencyId": null
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
            "agency": {
              "agencyId": null
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
      body[0].contents[0].agency.agencyId = this.agencyIdEn;
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
      body[1].contents[0].agency.agencyId = this.agencyIdBm;
      body[1].contents[0].eparticipationPublishDate = new Date(formValues.publish).getTime();
      body[1].contents[0].eparticipationEndDate = new Date(formValues.endD).getTime();



        this.commonservice.update(body, 'e-participation/publisher/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.eparticipationdraft'), '');
            this.router.navigate(['publisher/eparticipation']);
          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });
    }
  }

  onScroll(event, lngId){

    if(event.target.scrollTop >= (event.target.scrollHeight - 250)) {

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

  resetSearch() {
    this.updateForm.get('agencyEn').setValue('');
    this.updateForm.get('agencyBm').setValue('');
    this.isActiveListEn = false;
    this.isActiveListBm = false;
    this.agencyIdEn = null;
    this.agencyIdBm = null;
    this.ministryNameEn = "";
    this.ministryNameBm = "";

    this.checkReqValues();
  }

  getSearchData(keyword, langId, count, page){

    let selLangField;

    this.searchAgencyResultEn = [];
    this.searchAgencyResultBm = [];

    if(langId == 1) {
      selLangField = "agencyBm";
      this.ministryNameBm = "";
    } else {
      selLangField = "agencyEn";
      this.ministryNameEn = "";
    }
    this.updateForm.get(selLangField).setValue("");

    //if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
    this.loading = true;

    setTimeout(()=>{
      this.commonservice.readPortal('agency/language/'+langId, count, page, keyword, this.languageId).subscribe(
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
      },error => {
        this.loading = false;
      });
    }, 2000);
    // else {
    //   this.agencyIdEn = null;
    //   this.agencyIdBm = null;
    //   this.isActiveListEn = false;
    //   this.isActiveListBm = false;
    // }
  }

  //inthis case== english is 2, malay is 1
  getDetailsAgency(agenId, agenCode){

    let detailsAgency;
    let agenName;
    let minisName;

    this.commonservice.readPortal('agency/refcode/language/'+this.languageId+'/'+agenCode,'','', '', this.languageId).subscribe(
      data => {

      this.commonservice.errorHandling(data, (function(){

        detailsAgency = data['list'];

        agenName = detailsAgency[0].agencyName;
        minisName = detailsAgency[0].agencyMinistry.ministryName;

        this.getValue(agenId,agenName,minisName,agenCode, this.languageId);

      }).bind(this));
        this.loading = false;
    },err => {
      this.loading = false;
    });
  }

  getValue(aId,aName,mName, refCode, langId){

    if(langId == 1) {
      this.agencyEn = this.updateForm.get('agencyEn').value;
      this.isActiveListEn = false;
      this.searchAgencyResultEn = [''];
      this.updateForm.get('agencyEn').setValue(aName);
      this.agencyEn = aId;
      this.agencyIdEn = aId;
      this.ministryNameEn = mName;

    } else {
      this.agencyBm = this.updateForm.get('agencyBm').value;
      this.isActiveListBm = false;
      this.updateForm.get('agencyBm').setValue(aName);
      this.agencyBm = aId;
      this.agencyIdBm = aId;
      this.ministryNameBm = mName;

    }

    this.checkReqValues();
    this.getAgencyByRefCode(refCode,langId);
  }

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

          mName = data['list'][0]['agencyMinistry']['ministryName'];
          aName = data['list'][0]['agencyName'];
          aId = data['list'][0]['agencyId'];

          this.updateForm.get(selLangField).setValue(aName);

          if(langId == 1) {
            this.agencyIdEn = aId;
            this.ministryNameEn = mName;
          } else {
            this.agencyIdBm = aId;
            this.ministryNameBm = mName;
          }

          this.checkReqValues();
        }).bind(this));
        this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  approvePublisher(){

    let appVal = this.updateForm.get('approve');

    if(appVal.value == true){
      this.appPublisher = true;
      this.updateForm.get('active').setValue(true);
      //this.approve.enable();
    }

    else{
      this.appPublisher = false;
      //this.approve.disable();
    }
  }

  mySendDraft(){


    this.loading = true;
    this.commonservice.update(null, 'e-participation/publisher/todraft/'+this.participantCode).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function () {
          this.toastr.success(this.translate.instant('common.success.eparticipationsubmitted'), '');
          this.router.navigate(['publisher/eparticipation']);

        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
    });
  }

}
