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
import { stringify } from '@angular/core/src/util';
import { forEach } from '@angular/router/src/utils/collection';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../nav/nav.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit, OnDestroy {
  value: any;
  itemEn: any;
  itemBm: any;

  updateForm: FormGroup;

  public citizenflag:FormControl;
  public noncitizenflag: FormControl;
  public titleEn: FormControl;
  public titleBm: FormControl;
  public descEn: FormControl;
  public descBm: FormControl;
  public parentsEn: FormControl;
  public parentsBm: FormControl;
  public ismainmenu: FormControl;
  public imageEn: FormControl;
  public imageBm: FormControl;
  public active: FormControl;
  public dataUrl: any;
  public recordList: any;
  public categoryData: any;
  public getCatIdEn: any;
  public getCatIdBm: any;
  public subcription: FormControl;
  public deleted: FormControl;
  public rss: FormControl;
  public media: FormControl;
  public seqEng: FormControl;
  public seqMy: FormControl;

  public getIdEn: any;
  public getIdBm: any;
  public getRefCode: any;

  public complete: boolean;
  public languageId: any;
  public lang: any;
  public treeEn: any;
  public treeBm: any;
  public imageData: any;
  public getImgEn: any;
  public getImgdBm: any;
  selectedFileEn = '';
  selectedFileMy = '';
  public catCode: any;
  public loading = false;

  public parentFlag = false;
  public flagLifeE: any;
  public flagLifeED: any;

  public categoryPlaceholder = "";
  public filterPlaceholder = "";
  public urlEdit = "";

  boolenLEC: any;
  boolenLENC: any;
  parentIndicator: any;

  editor = {treeVal: '' };

  private subscription: ISubscription;
  private subscriptionLang: ISubscription;
  private subscriptionLangAll: ISubscription;

  constructor(private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private navservice: NavService,
    private dialogsService: DialogsService,
    public builder: FormBuilder) {

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
        if(this.navservice.flagLang){
          this.commonservice.getModuleId();
          this.changeLanguageAddEdit();
          this.getCategory(this.languageId);
          if (this.urlEdit === 'add'){
            this.changePlaceHolder();
          }

          else{
            this.getData();
          }
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

    this.titleEn = new FormControl();
    this.titleBm = new FormControl();
    this.descEn = new FormControl();
    this.descBm = new FormControl();
    this.parentsEn = new FormControl();
    this.parentsBm = new FormControl();
    this.ismainmenu = new FormControl();
    this.imageEn = new FormControl();
    this.imageBm = new FormControl();
    this.subcription = new FormControl();
    this.deleted = new FormControl();
    this.rss = new FormControl();
    this.media = new FormControl();
    this.active = new FormControl();
    this.seqEng = new FormControl();
    this.seqMy = new FormControl();
    this.citizenflag = new FormControl();
    this.noncitizenflag = new FormControl();

    this.updateForm = new FormGroup({

      titleEn: this.titleEn,
      titleBm: this.titleBm,
      descEn: this.descEn,
      descBm: this.descBm,
      parentsEn: this.parentsEn,
      parentsBm: this.parentsBm,
      ismainmenu: this.ismainmenu,
      imageEn: this.imageEn,
      imageBm: this.imageBm,
      active: this.active,
      subcription: this.subcription,
      deleted: this.deleted,
      rss: this.rss,
      media: this.media,
      seqEng: this.seqEng,
      seqMy: this.seqMy,
      citizenflag: this.citizenflag,
      noncitizenflag: this.noncitizenflag

    });

    this.getCategory(this.languageId);
    this.getImageList(this.languageId);

    this.urlEdit = this.router.url.split('/')[2];

    if (this.urlEdit === 'add'){

      this.commonservice.pageModeChange(false);
      this.changePlaceHolder();
      this.updateForm.get('active').setValue(true);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }

    this.commonservice.getModuleId();
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }


  selectedImage(e, val){

    this.imageEn = e.value;
    this.imageBm = e.value;
    let dataList = this.imageData;
    let indexVal: any;
    let idBm: any;
    let idEn: any;

    // if english
    if(val == 1){

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[0].mediaId;
        if(indexVal == this.imageEn){
          idBm = dataList[i].list[1].mediaId;
          this.selectedFileEn=dataList[i].list[0].mediaFile;
          this.selectedFileMy=dataList[i].list[1].mediaFile;
        }
      }

      this.updateForm.get('imageBm').setValue(idBm);
    }

    else{ //if malay

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[1].mediaId;
        if(indexVal == this.imageBm){
          idEn = dataList[i].list[0].mediaId;
          this.selectedFileEn=dataList[i].list[0].mediaFile;
          this.selectedFileMy=dataList[i].list[1].mediaFile;
        }
      }

      this.updateForm.get('imageEn').setValue(idEn);
    }

    if(e.value == 0){
      this.selectedFileMy = '';
      this.selectedFileEn = '';
    }

    this.checkReqValues();
  }

  getCategory(lng){

    this.loading = true;
    return this.commonservice.readProtected('content/category', '', '', '', lng)
     .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

          this.categoryData = data["list"];

          let arrCatEn = [];
          let parentEn;
          let arrCatBm = [];
          let parentBm;

          for(let i=0; i<this.categoryData.length; i++){

            if(this.categoryData[i].list.length === 2){
              arrCatEn.push({

                    id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                    value:this.categoryData[i].list[0].categoryId,
                    refCode: this.categoryData[i].refCode,
                    parent: this.categoryData[i].list[0].parentId.categoryId,
                    parentEn: this.categoryData[i].list[0].parentId.categoryId,
                    parentBm: this.categoryData[i].list[1].parentId.categoryId,
                    categoryName: this.categoryData[i].list[0].categoryName,
                    checked: false,
                    flagLE: this.categoryData[i].list[0].template,
                    isLEC: this.categoryData[i].list[0].isCitizenLifeEvent,
                    isLENC:this.categoryData[i].list[0].isNonCitizenLifeEvent,
                    text: this.categoryData[i].list[0].categoryName,
                    children: []});

              arrCatBm.push({
                    id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                    value:this.categoryData[i].list[1].categoryId,
                    refCode: this.categoryData[i].refCode,
                    parent: this.categoryData[i].list[1].parentId.categoryId,
                    parentEn: this.categoryData[i].list[0].parentId.categoryId,
                    parentBm: this.categoryData[i].list[1].parentId.categoryId,
                    categoryName: this.categoryData[i].list[1].categoryName,
                    checked: false,
                    flagLE: this.categoryData[i].list[0].template,
                    isLEC: this.categoryData[i].list[0].isCitizenLifeEvent,
                    isLENC:this.categoryData[i].list[0].isNonCitizenLifeEvent,
                    text: this.categoryData[i].list[1].categoryName,
                    children: []});

            }

          }

          if(this.languageId == 1){
            this.treeEn = this.getNestedChildrenEn(arrCatEn, -1);
          }else if(this.languageId == 2){
            this.treeEn = this.getNestedChildrenBm(arrCatBm, -2);
          }else{
            this.treeEn = this.getNestedChildrenEn(arrCatEn, -1);
          }

          this.itemEn = this.treeEn;

        }).bind(this));
        this.loading = false;
      },
      error => {

        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
    });
  }

  getNestedChildrenEn(arr, parent) {
    var out = []
    var children = []

    for(var i in arr) {

        if(arr[i].parent == parent) {
            children = this.getNestedChildrenEn(arr, arr[i].value)

            if(children.length) {
                 arr[i].children = children
            }
            out.push(arr[i])
        }
    }
    return out
  }

  getNestedChildrenBm(arr, parent) {
    var out = []
    var children = []

    for(var i in arr) {

        if(arr[i].parent == parent) {
            children = this.getNestedChildrenBm(arr, arr[i].value)

            if(children.length) {
                 arr[i].children = children
            }
            out.push(arr[i])
        }

    }
    return out
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
      input.value = word.replace(/\s/gi, '');
      return true;
    }
    else {
      return false;
    }

  }

  getData() {

    let _getRefID = this.router.url.split('/')[2];

    this.loading = true;
    this.commonservice.readProtectedById('content/category/',_getRefID, this.languageId)
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.recordList = data;

        this.updateForm.get('titleEn').setValue(this.recordList.list[0].categoryName);
        this.updateForm.get('titleBm').setValue(this.recordList.list[1].categoryName);
        this.updateForm.get('descEn').setValue(this.recordList.list[0].categoryDescription);
        this.updateForm.get('descBm').setValue(this.recordList.list[1].categoryDescription);
        this.updateForm.get('seqEng').setValue(this.recordList.list[0].categorySort);
        this.updateForm.get('seqMy').setValue(this.recordList.list[1].categorySort);

        //this.updateForm.get('parentsBm').setValue(this.recordList.list[1].parentId);
        // this.updateForm.get('imageEn').setValue(this.recordList.list[0].image.mediaId);
        // this.updateForm.get('imageBm').setValue(this.recordList.list[1].image.mediaId);

        this.updateForm.get('ismainmenu').setValue(this.recordList.list[0].isMainMenu);
        this.updateForm.get('active').setValue(this.recordList.list[0].isActiveFlag);
        this.updateForm.get('subcription').setValue(this.recordList.list[0].isSubscribable);
        this.updateForm.get('deleted').setValue(this.recordList.list[0].isDeleted);
        this.updateForm.get('rss').setValue(this.recordList.list[0].isRssFeeder);
        this.updateForm.get('media').setValue(this.recordList.list[0].isMediaType);

        if(this.recordList.list[0].template == 'lifeevent'){
          this.flagLifeED = 'lifeevent';

          this.updateForm.get('citizenflag').setValue(this.recordList.list[0].isCitizenLifeEvent);
          this.updateForm.get('noncitizenflag').setValue(this.recordList.list[0].isNonCitizenLifeEvent);

          this.boolenLEC = this.recordList.list[0].isCitizenLifeEvent;
          this.boolenLENC = this.recordList.list[0].isNonCitizenLifeEvent;

          this.parentIndicator = this.recordList.list[0].parentId.categoryCode;

        }

        this.getIdEn = this.recordList.list[0].categoryId;
        this.getIdBm = this.recordList.list[1].categoryId;
        this.getRefCode = this.recordList.list[0].refCode;
        this.catCode = this.recordList.list[0].categoryCode;

        let getObjKeys = Object.keys(this.recordList.list[0]);
        let valMT = getObjKeys.filter(fmt => fmt === "image");

        if(valMT.length > 0){
          this.selectedFileEn = this.recordList.list[0].image.mediaFile;
          this.selectedFileMy = this.recordList.list[1].image.mediaFile;

          this.updateForm.get('imageEn').setValue(parseInt(this.recordList.list[0].image.mediaId));
          this.updateForm.get('imageBm').setValue(parseInt(this.recordList.list[1].image.mediaId));
        }

        let setParentEn = [];

        //get array of categoryId
        if(this.languageId == 1){

          let a = {
            "id": [this.recordList.list[0].parentId.categoryId,this.recordList.list[1].parentId.categoryId],
            "text":this.recordList.list[0].parentId.categoryName,
            "value": this.recordList.list[0].parentId.categoryId
          }

          setParentEn.push(a);
          this.filterPlaceholder = this.commonservice.showFilterEn;

          if(this.recordList.list[0].parentId.categoryId != -1){
            this.categoryPlaceholder = this.recordList.list[0].parentId.categoryName;
          }

          else{
            this.categoryPlaceholder = this.commonservice.showPlaceHolderEn;
          }
        }

        else{

          let a = {
            "id": [this.recordList.list[0].parentId.categoryId,this.recordList.list[1].parentId.categoryId],
            "text":this.recordList.list[1].parentId.categoryName,
            "value": this.recordList.list[1].parentId.categoryId
          }

          setParentEn.push(a);

          this.filterPlaceholder = this.commonservice.showFilterBm;
          if(this.recordList.list[1].parentId.categoryId != -2){
            this.categoryPlaceholder = this.recordList.list[1].parentId.categoryName;
          }

          else{

            this.categoryPlaceholder = this.commonservice.showPlaceHolderBm;
          }
        }

        this.updateForm.get('parentsEn').setValue(setParentEn);
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
    this.commonservice.readProtected('media/category/name/Article','1', '99999', '', lng)
     .subscribe(resCatData => {

      this.commonservice.errorHandling(resCatData, (function(){

        this.imageData = resCatData['list'];

      }).bind(this));
      this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
      this.loading = false;
    });
  }

  onChange(ele){

    if(ele){
      this.parentFlag = true;
    }

    else{
      this.parentFlag = false;
    }

    this.flagLifeE = ele.flagLE;

    if(ele.refCode != undefined){
      this.parentIndicator = ele.refCode;
      this.boolenLEC = ele.isLEC;
      this.boolenLENC = ele.isLENC;
    }

    if(this.flagLifeE == 'lifeevent'){

      if(ele.isLENC == false && ele.isLEC == false && ele.refCode == this.commonservice.lifeEventCategoryCode){ // for new parent category under lifeevent
        this.updateForm.get('noncitizenflag').setValue(false);
        this.updateForm.get('citizenflag').setValue(true);
      }

      else{
        this.updateForm.get('noncitizenflag').setValue(ele.isLENC); // new child under existing parent except LE itself.
        this.updateForm.get('citizenflag').setValue(ele.isLEC);
      }
    }

    if(this.flagLifeE == ''){// bila change tree
      this.flagLifeED = '';
    }

  }

  submit(formValues: any) {
    this.urlEdit = this.router.url.split('/')[2];

    let parentValEn = formValues.parentsEn;
    let parentValBm = formValues.parentsBm;

    let valImgEn: any;
    let valImgBm: any;
    let body: any;

    if(formValues.ismainmenu == null){
      formValues.ismainmenu = false;
    }

    if(formValues.subcription == null){
      formValues.subcription = false;
    }

    if(formValues.deleted == null){
      formValues.deleted = false;
    }

    if(formValues.rss == null){
      formValues.rss = false;
    }


    if(formValues.media == null){
      formValues.media = false;
    }

    if(formValues.imageEn == null){
      valImgEn = null;
      valImgBm = null;
    }

    else{
      valImgEn = { "mediaId": null };
      valImgBm = { "mediaId": null };

    }

    if(this.flagLifeE == 'lifeevent' || this.flagLifeED == 'lifeevent'){

      if(formValues.citizenflag == null){
        formValues.citizenflag = false;
      }

      if(formValues.noncitizenflag == null){
        formValues.noncitizenflag = false;
      }

    }

    // add form
    if(this.urlEdit === 'add'){

      body = [
        {

          "categoryName": null,
          "categoryDescription":null,
          "parentId":{
             "categoryId": null
          },
          "isMainMenu": false,
          "image": valImgEn,
          "language": {
              "languageId": 1
          },
          "isActiveFlag":false,
          "isSubscribable":false,
          "isDeleted":false,
          "isRssFeeder":false,
          "isMediaType":false,
          "isCitizenLifeEvent": false,
          "isNonCitizenLifeEvent": false,
          "categorySort": null,
        },{
          "categoryName": null,
          "categoryDescription":null,
          "parentId":{
            "categoryId": null
          },
          "isMainMenu": false,
          "image": valImgBm,
          "language": {
              "languageId": 2
          },
          "isActiveFlag":false,
          "isSubscribable":false,
          "isDeleted":false,
          "isRssFeeder":false,
          "isMediaType":false,
          "isCitizenLifeEvent": false,
          "isNonCitizenLifeEvent": false,
          "categorySort": null,
        }
      ]

      body[0].categoryName = formValues.titleEn;
      body[0].categoryDescription = formValues.descEn;
      body[0].isMainMenu = formValues.ismainmenu;
      body[0].isActiveFlag = formValues.active;
      body[0].isSubscribable = formValues.subcription;
      body[0].isDeleted = formValues.deleted;
      body[0].isRssFeeder = formValues.rss;
      body[0].isMediaType = formValues.media;



      body[0].categorySort = formValues.seqEng;

      body[1].categoryName = formValues.titleBm;
      body[1].categoryDescription = formValues.descBm;
      body[1].isMainMenu = formValues.ismainmenu;
      body[1].isActiveFlag = formValues.active;
      body[1].isSubscribable = formValues.subcription;
      body[1].isDeleted = formValues.deleted;
      body[1].isRssFeeder = formValues.rss;
      body[1].isMediaType = formValues.media;
      body[1].categorySort = formValues.seqMy;

      if(this.flagLifeE == 'lifeevent'){

        //checkbox appear
        if(this.boolenLEC == '' && this.boolenLENC == '' || this.boolenLEC == false && this.boolenLENC == false){

          body[0].isCitizenLifeEvent = formValues.citizenflag;
          body[0].isNonCitizenLifeEvent = formValues.noncitizenflag;
          body[1].isCitizenLifeEvent = formValues.citizenflag;
          body[1].isNonCitizenLifeEvent = formValues.noncitizenflag;
        }

        //checkbox disappear
        else{

          body[0].isCitizenLifeEvent = this.boolenLEC;
          body[0].isNonCitizenLifeEvent = this.boolenLENC;
          body[1].isCitizenLifeEvent = this.boolenLEC;
          body[1].isNonCitizenLifeEvent = this.boolenLENC;
        }
      }

      //predefined super parent id;
      if(formValues.parentsEn == null || formValues.parentsEn == ""){

          parentValEn = -1;
          parentValBm = -2;

          body[0].parentId.categoryId = parentValEn;
          body[1].parentId.categoryId = parentValBm;
      }

      else{

        body[0].parentId.categoryId = parentValEn.id[0];
        body[1].parentId.categoryId = parentValEn.id[1];
      }

      if(formValues.imageBm != null && formValues.imageEn != null){
          body[0].image.mediaId = formValues.imageEn;
          body[1].image.mediaId = formValues.imageBm;
      }

      this.loading = true;
      this.commonservice.create(body,'content/category/post').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){

            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['category']);

          }).bind(this));
          this.loading = false;
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
      });
    }

    // update form
    else{

      body = [
        {

          "categoryId": this.getIdEn,
          "categoryName": null,
          "categoryDescription":null,
          "categoryCode": this.catCode,
          "parentId":{
            "categoryId": null
          },
          "isMainMenu": false,
          "image": valImgEn,
          "language": {
              "languageId": 1
          },
          "isActiveFlag":false,
          "isSubscribable":false,
          "isDeleted":false,
          "isRssFeeder":false,
          "isMediaType": false,
          "isCitizenLifeEvent": false,
          "isNonCitizenLifeEvent": false,
          "categorySort": null,
        },{
          "categoryId": this.getIdBm,
          "categoryName": null,
          "categoryDescription":null,
          "categoryCode": this.catCode,
          "parentId":{
            "categoryId": null
          },
          "isMainMenu": false,
          "image": valImgBm,
          "language": {
              "languageId": 2
          },
          "isActiveFlag":false,
          "isSubscribable":false,
          "isDeleted":false,
          "isRssFeeder":false,
          "isMediaType": false,
          "isCitizenLifeEvent": false,
          "isNonCitizenLifeEvent": false,
          "categorySort": null,
        }
      ]

      body[0].categoryName = formValues.titleEn;
      body[0].categoryDescription = formValues.descEn;
      body[0].isMainMenu = formValues.ismainmenu;
      body[0].isActiveFlag = formValues.active;
      body[0].isSubscribable = formValues.subcription;
      body[0].isDeleted = formValues.deleted;
      body[0].isRssFeeder = formValues.rss;
      body[0].isMediaType = formValues.media;
      body[0].categorySort = formValues.seqEng;

      body[1].categoryName = formValues.titleBm;
      body[1].categoryDescription = formValues.descBm;
      body[1].isMainMenu = formValues.ismainmenu;
      body[1].isActiveFlag = formValues.active;
      body[1].isSubscribable = formValues.subcription;
      body[1].isDeleted = formValues.deleted;
      body[1].isRssFeeder = formValues.rss;
      body[1].isMediaType = formValues.media;
      body[1].categorySort = formValues.seqMy;

      if(this.flagLifeE == 'lifeevent' || this.flagLifeED == 'lifeevent'){

        //checkbox appear;
        if(this.parentIndicator == this.commonservice.lifeEventCategoryCode){

          body[0].isCitizenLifeEvent = formValues.citizenflag;
          body[0].isNonCitizenLifeEvent = formValues.noncitizenflag;
          body[1].isCitizenLifeEvent = formValues.citizenflag;
          body[1].isNonCitizenLifeEvent = formValues.noncitizenflag;
        }

        //checkbox disappear
        else {

          body[0].isCitizenLifeEvent = this.boolenLEC;
          body[0].isNonCitizenLifeEvent = this.boolenLENC;
          body[1].isCitizenLifeEvent = this.boolenLEC;
          body[1].isNonCitizenLifeEvent = this.boolenLENC;
        }
      }

      if(formValues.imageBm != null && formValues.imageEn != null){
        body[0].image.mediaId = formValues.imageEn;
        body[1].image.mediaId = formValues.imageBm;

      }

      // if(formValues.parentsEn == null || formValues.parentsEn == ""){

      //   parentValEn = -1;
      //   parentValBm = -2;

      //   body[0].parentId.categoryId = this.parentsValEn;
      //   body[1].parentId.categoryId = this.parentsValBm;
      // }

      if(parentValEn.length == undefined){
        body[0].parentId.categoryId = parentValEn.id[0];
        body[1].parentId.categoryId = parentValEn.id[1];
      }

      else{
        body[0].parentId.categoryId = parentValEn[0].id[0];
        body[1].parentId.categoryId = parentValEn[0].id[1];
      }

      //console.log(JSON.stringify(body));

      this.loading = true;
      this.commonservice.update(body,'content/category/update').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){

            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['category']);

          }).bind(this));
          this.loading = false;
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
      });
    }

  }

  changeLanguageAddEdit(){
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
    }
    else{
      this.commonservice.pageModeChange(true);
    }
  }

  checkReqValues() {

    let reqVal:any = ["titleEn", "titleBm", "descEn", "descBm"];
    let nullPointers:any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if(nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  changePlaceHolder(){
    if(this.languageId == 1){
      this.categoryPlaceholder = this.commonservice.showPlaceHolderEn;
    }

    else{
      this.categoryPlaceholder = this.commonservice.showPlaceHolderBm;
    }
  }

  myFunction() {
    this.updateForm.reset();
    this.checkReqValues();
    this.changePlaceHolder();
  }

  back(){
    this.router.navigate(['category']);
  }

  le(e){

    let citezenF = this.updateForm.get('citizenflag');

    if(citezenF.value == true){
      this.updateForm.get('noncitizenflag').setValue(true);
    }

    if(citezenF.value == false || citezenF.value == null){
      this.updateForm.get('noncitizenflag').setValue(null);
    }

  }

  le2(e){
    let noncitizenF = this.updateForm.get('noncitizenflag');

    if(noncitizenF.value == false || noncitizenF.value == null){
      this.updateForm.get('citizenflag').setValue(null);
    }

    if(noncitizenF.value == true){
      this.updateForm.get('citizenflag').setValue(true);
    }

  }

}
