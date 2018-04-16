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
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  publishdt:number;  
  enddt: number;
  minDate: any;
  publish: FormControl
  endD: FormControl


  rawValBm: any;
  rawValEn: any;

  parseEnBtn: boolean;
  parseMyBtn: boolean;

  updateForm: FormGroup;
  
  public agencyApp: FormControl;  
  public agencyforApp: FormControl;  
  public agencyEn: FormControl;  
  public agencyBm: FormControl;
  public ministryEn: FormControl;  
  public ministryBm: FormControl;
  public titleEn: FormControl;  
  public titleBm: FormControl;
  public descEn: FormControl;  
  public descBm: FormControl;
  public active: FormControl;
  // public citizenflag:FormControl;
  // public noncitizenflag: FormControl;
  public seqEng: FormControl;
  public seqMy: FormControl;
  public contentTxtEn: FormControl;
  public contentTxtMy: FormControl;
  public htmlContentEn: FormControl;
  public htmlContentMy: FormControl;
  itemEn: any;
  itemBm: any;
  public parentsEn: FormControl;
  public parentsBm: FormControl;
  public dataUrl: any;  
  public recordList: any;
  public categoryData: any;
  public deleted: FormControl;

  public getIdEn: any;
  public getIdBm: any;
  public getRefCode: any;

  public complete: boolean;
  public languageId: any;
  public treeEn: any;
  public treeBm: any;
  public loading = false;
  public parentFlag = false;

  public categoryPlaceholder = "";
  public filterPlaceholder = "";
  public urlEdit = "";

  public parentValEn: any;
  public parentValBm: any;

  public ministryData: any;
  selectedMinEn = '';
  selectedMinBm = '';

  arrAgencyApp = [];
  public agencyAppData: any;
  public agencyAppDataCode: any;
  ministryNameEn:any;
  ministryNameBm:any;
  isActiveListEn: boolean;
  isActiveListBm: boolean;
  isActive: boolean;
  searchAgencyResultEn: string[];
  searchAgencyResultBm: string[];
  agencyIdEn:any;
  agencyIdBm:any;

  isActiveList: boolean;
  searchAgencyResult: string[];
  agencyIdforApp: any;

  sendForApporval: any;

  editor = { enVal: '', bmVal: '', treeVal: '' };
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

  dataSource: any;
  // dataSource = new MatTableDataSource<object>(this.arrAgencyApp);
  displayedColumns = ['agencyNameEn', 'urlEn', 'agencyNameBm','urlBm', 'action'];

  constructor(private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    public dialog: MatDialog,
    public builder: FormBuilder ) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.getCategory();           
              this.languageId = val.languageId;
              this.changeLanguageAddEdit();
              this.changePlaceHolder();
                    //this.getData();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getCategory();
      //this.getData();
    }
    /* LANGUAGE FUNC */
      
    this.updateForm = builder.group({
      enVal: "",
      bmVal: "",
      treeVal: ""
    })
  }
  
  ngOnInit() {  

    this.getMinistry();
    this.getMinEventDate();
    
    this.publish = new FormControl()
    this.endD = new FormControl
    this.parseEnBtn = false;
    this.parseMyBtn = false;
    this.parentsEn = new FormControl();
    this.parentsBm = new FormControl();
    this.deleted = new FormControl();

    this.agencyApp = new FormControl();
    this.agencyforApp = new FormControl();
    this.agencyEn = new FormControl();
    this.agencyBm = new FormControl();
    this.ministryEn = new FormControl();
    this.ministryBm = new FormControl();
    this.titleEn = new FormControl();
    this.titleBm = new FormControl();
    this.descEn = new FormControl();
    this.descBm = new FormControl();
    this.seqEng = new FormControl();
    this.seqMy = new FormControl();
    this.active = new FormControl();
    // this.citizenflag = new FormControl();
    // this.noncitizenflag = new FormControl();
    this.htmlContentEn = new FormControl();
    this.htmlContentMy = new FormControl();

    this.updateForm = new FormGroup({   

      endD: this.endD,
      publish: this.publish,
      agencyApp: this.agencyApp,
      agencyforApp: this.agencyforApp,
      agencyEn: this.agencyEn,
      agencyBm: this.agencyBm,
      ministryEn: this.ministryEn,
      ministryBm: this.ministryBm,
      titleEn: this.titleEn,
      titleBm: this.titleBm,
      descEn: this.descEn,    
      descBm: this.descBm,
      seqEng: this.seqEng,
      seqMy: this.seqMy,
      parentsEn: this.parentsEn,
      parentsBm: this.parentsBm,
      active: this.active,
      // citizenflag: this.citizenflag,
      // noncitizenflag: this.noncitizenflag,
      deleted: this.deleted,
      htmlContentEn: this.htmlContentEn,
      htmlContentMy: this.htmlContentMy,
    });

    this.getCategory();

    this.urlEdit = this.router.url.split('/')[2];
    
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.changePlaceHolder(); 
      this.updateForm.get('active').setValue(true)
      // this.updateForm.get('citizenflag').setValue(true)
      // this.updateForm.get('noncitizenflag').setValue(true)
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
     
    }
    this.commonservice.getModuleId();
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

  onChange(ele){    

    // this.urlEdit = this.router.url.split('/')[2];

    // if(this.urlEdit === "add" && ele == ""){
    //   this.parentFlag = false;
    // }

    // else if(this.urlEdit === "add" && ele != ""){
    //   this.parentFlag = true;
    // }

    // else{
    //   this.parentFlag = true;
    // }

    if(ele.length > 0 ){
      this.parentFlag = true;
    }

    else{
      this.parentFlag = false;
    }
  }

  getMinEventDate(){
    let today = new Date();
    let todaysdt = today.getDate();
    let year = today.getFullYear();
    let month = today.getMonth();

    this.minDate = new Date(year, month, todaysdt);
  }

  publishEvent(type: string, event: OwlDateTimeInputDirective<Date>) { 
   
    this.publishdt = (event.value).getTime();
    this.dateFormatExample = "";
    this.checkReqValues()
  }

  endEvent(type: string, event: OwlDateTimeInputDirective<Date>) { 
  
    this.enddt = (event.value).getTime();
    this.dateFormatExample = "";
    this.checkReqValues()
  }

  getCategory(){

    this.loading = true;
    return this.commonservice.readProtected('content/dropdown')
     .subscribe(data => {
          
      this.commonservice.errorHandling(data, (function(){

          this.categoryData = data["list"];   
          let arrCatEn = [];          
          let arrCatBm = [];          


          for(let i=0; i<this.categoryData.length; i++){     
    
              if(this.categoryData[i].list.length === 2){
                arrCatEn.push({
                  
                      id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                      value:this.categoryData[i].list[0].categoryId,
                      // refCode: this.categoryData[i].refCode,
                      parent: this.categoryData[i].list[0].parentId,
                      text: this.categoryData[i].list[0].categoryName,
                      // checked: false,
                      children: []});      
                    
                arrCatBm.push({
                      id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                      value:this.categoryData[i].list[1].categoryId,
                      // refCode: this.categoryData[i].refCode,
                      parent: this.categoryData[i].list[1].parentId,
                      // checked: false,
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
        console.log(error);
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

  getData() {

    let _getRefID = this.router.url.split('/')[2];
    this.loading = true;

    if(_getRefID != undefined){

      this.commonservice.readProtectedById('content/publisher/', _getRefID)
      .subscribe(data => {
        this.recordList = data;

        let dataEn = this.recordList['contentDetailList'][0];
        let dataBm = this.recordList['contentDetailList'][1];

        this.updateForm.get('titleEn').setValue(dataEn.contentTitle);
        this.updateForm.get('titleBm').setValue(dataBm.contentTitle);   
        this.updateForm.get('descEn').setValue(dataEn.contentDescription);
        this.updateForm.get('descBm').setValue(dataBm.contentDescription);  
        this.updateForm.get('seqEng').setValue(dataEn.contentSort);
        this.updateForm.get('seqMy').setValue(dataBm.contentSort);  
        this.updateForm.get('active').setValue(dataEn.isActiveFlag);      
        // this.updateForm.get('citizenflag').setValue(dataEn.lifeEventCitizenFlag);      
        // this.updateForm.get('noncitizenflag').setValue(dataEn.lifeEventNonCitizenFlag);   

        this.getIdEn = dataEn.contentId;
        this.getIdBm = dataBm.contentId;
        this.getRefCode = this.recordList.refCode;
        this.sendForApporval = dataEn.isSendForApproval;

        this.checkReqValues();       
        
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

        this.parentValEn = dataEn.contentCategories[0].categoryId;
        this.parentValBm = dataBm.contentCategories[0].categoryId;

        this.parseEnBtn = true;
        this.parseMyBtn = true;

        //get details agency
        let getObjKeys = Object.keys(dataEn);
        let valMT = getObjKeys.filter(fmt => fmt === "agencyId");

        console.log("KEY OBJECT");
        console.log(valMT.length);

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

        //get detail app agency
        if(dataEn.agencyApplications.length > 0){
          for(let i=0; i<dataEn.agencyApplications.length; i++){
            this.getAgencyAppEnBm(dataEn.agencyApplications[i].agencyApplicationCode)
          }
        }

        let setParentEn = [];

        //get array of categoryId        

        console.log("GET CATEGORY TREE");
        console.log(setParentEn);        

        if(this.languageId == 1){          
          for(let i=0; i<dataEn.contentCategories.length; i++){
            let a;

            a = {
              "id": [dataEn.contentCategories[i].categoryId,dataBm.contentCategories[i].categoryId],
              "text":dataEn.contentCategories[i].categoryName,
              "value": dataEn.contentCategories[i].categoryId
            }
              
            setParentEn.push(a);    
          }
          //this.categoryPlaceholder = dataEn.contentCategories[0].categoryName;
          this.filterPlaceholder = this.commonservice.showFilterEn;          
        }

        else{

          for(let i=0; i<dataBm.contentCategories.length; i++){
            let a;
      
            a = {
              "id": [dataEn.contentCategories[i].categoryId,dataBm.contentCategories[i].categoryId],
              "text":dataBm.contentCategories[i].categoryName,
              "value": dataBm.contentCategories[i].categoryId
            };
        
            setParentEn.push(a);    
          }
          //this.categoryPlaceholder = dataBm.contentCategories[0].categoryName;
          this.filterPlaceholder = this.commonservice.showFilterBm;
        }

        this.updateForm.get('parentsEn').setValue(setParentEn);  
        
      });
    }
    
  }

  
  draft(formValues: any) {
    this.urlEdit = this.router.url.split('/')[2];

    if(!this.agencyIdEn){
      this.agencyIdEn = null;
      this.agencyIdBm = null;
    }

    this.parentValEn = formValues.parentsEn;
    this.parentValBm = formValues.parentsBm;

    let arrCatIDEn = [];
    let arrCatIDBm = [];

    console.log(this.parentValEn);

    //get array of categoryId
    for(let i=0; i<this.parentValEn.length; i++){
      let a = {"categoryId": this.parentValEn[i].id[0]};
      let b = {"categoryId": this.parentValEn[i].id[1]};

      arrCatIDEn.push(a);
      arrCatIDBm.push(b);      
    }

    let appsEn = [];
    let appsBm = [];
    console.log(this.arrAgencyApp);  

    //get agencyapp
    for(let i=0; i<this.arrAgencyApp.length; i++){
      let a = {"agencyApplicationId": this.arrAgencyApp[i][0].agencyAppID}  
      appsEn.push(a);      
      let b = {"agencyApplicationId": this.arrAgencyApp[i][1].agencyAppID}  
      appsBm.push(b);
    }  

    if(this.arrAgencyApp.length == 0){
      appsEn = null;
      appsBm = null;
    }
  
    // add form
    if(this.urlEdit === 'add'){

      let body = [
        {
          "contentCategories": null,   
          "contentTitle": null,
          "contentText": null,
          "contentDescription": null,     
          "contentSort": null,
          "contentUrl": null,   
          "contentActiveFlag":false,    
          "contentPublishDate": null,
          "contentEndDate": null,       
          "language": {
            "languageId": 1
          },
          "agency": {
            "agencyId": null
          },        
          "agencyApplications": null
        },
        {
          "contentCategories": null,
          "contentTitle": null,
          "contentText": null,
          "contentDescription": null,      
          "contentSort": null,
          "contentUrl": null,   
          "contentActiveFlag":false,       
          "contentPublishDate": null,
          "contentEndDate": null,       
          "language": {
            "languageId": 2
          },
          "agency": {
            "agencyId": null
          },
          "agencyApplications": null
        }
      ];    

      body[0].contentTitle = formValues.titleEn;
      body[1].contentTitle = formValues.titleBm;
      body[0].contentText = this.contentTxtEn;
      body[1].contentText = this.contentTxtMy;
      body[0].contentDescription = formValues.descEn;
      body[1].contentDescription = formValues.descBm;
      body[0].contentSort = formValues.seqEng;
      body[1].contentSort = formValues.seqMy;

      // body[0].contentCitizenFlag = formValues.citizenflag;
      // body[0].contentNonCitizenFlag = formValues.noncitizenflag;
      body[0].contentActiveFlag = formValues.active;
      body[0].agency.agencyId = this.agencyIdEn;

      // body[1].contentCitizenFlag = formValues.citizenflag;
      // body[1].contentNonCitizenFlag = formValues.noncitizenflag;
      body[1].contentActiveFlag = formValues.active;
      body[1].agency.agencyId = this.agencyIdBm;        
      

      body[0].contentCategories = arrCatIDEn;
      body[1].contentCategories = arrCatIDBm;      

      body[0].contentPublishDate = new Date(formValues.publish).getTime();
      body[0].contentEndDate = new Date(formValues.endD).getTime();

      body[1].contentPublishDate = new Date(formValues.publish).getTime();
      body[1].contentEndDate = new Date(formValues.endD).getTime();      

      body[0].agencyApplications = appsEn;
      body[1].agencyApplications = appsBm;  

      console.log(JSON.stringify(body))
     
      this.loading = true;
      // Add
      this.commonservice.create(body, 'content/creator/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.contentdraft'), ''); 
            this.router.navigate(['content']);

          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          console.log(error);
          this.loading = false;
        });
    }

    // update form 
    else{
      let body = [
        {
          "contentId":  this.getIdEn,
          "contentCategories": null,   
          "contentTitle": null,
          "contentText": null,
          "contentDescription": null,     
          "contentSort": null,
          "contentUrl": null,   
          "contentActiveFlag":false,   
          "contentPublishDate": null,
          "contentEndDate": null,       
          "language": {
            "languageId": 1
          },
          "agency": {
            "agencyId": null
          },        
          "agencyApplications": null
        },
        {
          "contentId":  this.getIdBm,
          "contentCategories": null,
          "contentTitle": null,
          "contentText": null,
          "contentDescription": null,      
          "contentSort": null,
          "contentUrl": null,   
          "contentActiveFlag":false,     
          "contentPublishDate": null,
          "contentEndDate": null,       
          "language": {
            "languageId": 2
          },
          "agency": {
            "agencyId": null
          },
          "agencyApplications": null
        }
      ];    

      body[0].contentTitle = formValues.titleEn;
      body[1].contentTitle = formValues.titleBm;
      body[0].contentText = this.contentTxtEn;
      body[1].contentText = this.contentTxtMy;
      body[0].contentDescription = formValues.descEn;
      body[1].contentDescription = formValues.descBm;
      body[0].contentSort = formValues.seqEng;
      body[1].contentSort = formValues.seqMy;

      // body[0].contentCitizenFlag = formValues.citizenflag;
      // body[0].contentCitizenFlag = formValues.noncitizenflag;
      body[0].contentActiveFlag = formValues.active;
      body[0].agency.agencyId = this.agencyIdEn;

      // body[1].contentCitizenFlag = formValues.citizenflag;
      // body[1].contentNonCitizenFlag = formValues.noncitizenflag;
      body[1].contentActiveFlag = formValues.active;
      body[1].agency.agencyId = this.agencyIdBm;        
      

      body[0].contentCategories = arrCatIDEn;
      body[1].contentCategories = arrCatIDBm;      

      body[0].contentPublishDate = new Date(formValues.publish).getTime();
      body[0].contentEndDate = new Date(formValues.endD).getTime();

      body[1].contentPublishDate = new Date(formValues.publish).getTime();
      body[1].contentEndDate = new Date(formValues.endD).getTime();      

      body[0].agencyApplications = appsEn;
      body[1].agencyApplications = appsBm;       
      
      console.log(JSON.stringify(body))

      this.loading = true;
      // Update 
      this.commonservice.update(body, 'content/creator/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.contentdraft'), ''); 
            this.router.navigate(['content']);

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

  submit(formValues: any) {
    this.urlEdit = this.router.url.split('/')[2];

    if(!this.agencyIdEn){
      this.agencyIdEn = null;
      this.agencyIdBm = null;
    }

    this.parentValEn = formValues.parentsEn;
    this.parentValBm = formValues.parentsBm;

    let arrCatIDEn = [];
    let arrCatIDBm = [];

    console.log(this.parentValEn);

    //get array of categoryId
    for(let i=0; i<this.parentValEn.length; i++){
      let a = {"categoryId": this.parentValEn[i].id[0]};
      let b = {"categoryId": this.parentValEn[i].id[1]};

      arrCatIDEn.push(a);
      arrCatIDBm.push(b);      
    }

    let appsEn = [];
    let appsBm = [];
    console.log(this.arrAgencyApp);  

    //get agencyapp
    for(let i=0; i<this.arrAgencyApp.length; i++){
      let a = {"agencyApplicationId": this.arrAgencyApp[i][0].agencyAppID}  
      appsEn.push(a);      
      let b = {"agencyApplicationId": this.arrAgencyApp[i][1].agencyAppID}  
      appsBm.push(b);
    }  

    if(this.arrAgencyApp.length == 0){
      appsEn = null;
      appsBm = null;
    }    

    // add form
    if(this.urlEdit === 'add'){

      let body = [
        {
          "contentCategories": null,   
          "contentTitle": null,
          "contentText": null,
          "contentDescription": null,     
          "contentSort": null,
          "contentUrl": null,   
          "contentActiveFlag":false,    
          "contentPublishDate": null,
          "contentEndDate": null,       
          "language": {
            "languageId": 1
          },
          "agency": {
            "agencyId": null
          },        
          "agencyApplications": null
        },
        {
          "contentCategories": null,
          "contentTitle": null,
          "contentText": null,
          "contentDescription": null,      
          "contentSort": null,
          "contentUrl": null,   
          "contentActiveFlag":false,     
          "contentPublishDate": null,
          "contentEndDate": null,       
          "language": {
            "languageId": 2
          },
          "agency": {
            "agencyId": null
          },
          "agencyApplications": null
        }
      ];    

      body[0].contentTitle = formValues.titleEn;
      body[1].contentTitle = formValues.titleBm;
      body[0].contentText = this.contentTxtEn;
      body[1].contentText = this.contentTxtMy;
      body[0].contentDescription = formValues.descEn;
      body[1].contentDescription = formValues.descBm;
      body[0].contentSort = formValues.seqEng;
      body[1].contentSort = formValues.seqMy;

      // body[0].contentCitizenFlag = formValues.citizenflag;
      // body[0].contentNonCitizenFlag = formValues.noncitizenflag;
      body[0].contentActiveFlag = formValues.active;
      body[0].agency.agencyId = this.agencyIdEn;

      // body[1].contentCitizenFlag = formValues.citizenflag;
      // body[1].contentNonCitizenFlag = formValues.noncitizenflag;
      body[1].contentActiveFlag = formValues.active;
      body[1].agency.agencyId = this.agencyIdBm;        
      

      body[0].contentCategories = arrCatIDEn;
      body[1].contentCategories = arrCatIDBm;      

      body[0].contentPublishDate = new Date(formValues.publish).getTime();
      body[0].contentEndDate = new Date(formValues.endD).getTime();

      body[1].contentPublishDate = new Date(formValues.publish).getTime();
      body[1].contentEndDate = new Date(formValues.endD).getTime();      

      body[0].agencyApplications = appsEn;
      body[1].agencyApplications = appsBm;         
      
      console.log(JSON.stringify(body))
     
      this.loading = true;
      // Add
      this.commonservice.create(body, 'content/creator').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.contentsubmitted'), ''); 
            this.router.navigate(['content']);

          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          console.log(error);
          this.loading = false;
        });
    }

    // update form
    else{
      let body = [
        {
          "contentId":  this.getIdEn,
          "contentCategories": null,   
          "contentTitle": null,
          "contentText": null,
          "contentDescription": null,     
          "contentSort": null,
          "contentUrl": null,   
          "contentActiveFlag":false,      
          "contentPublishDate": null,
          "contentEndDate": null,       
          "language": {
            "languageId": 1
          },
          "agency": {
            "agencyId": null
          },        
          "agencyApplications": null
        },
        {
          "contentId":  this.getIdBm,
          "contentCategories": null,
          "contentTitle": null,
          "contentText": null,
          "contentDescription": null,      
          "contentSort": null,
          "contentUrl": null,   
          "contentActiveFlag":false,     
          "contentPublishDate": null,
          "contentEndDate": null,       
          "language": {
            "languageId": 2
          },
          "agency": {
            "agencyId": null
          },
          "agencyApplications": null
        }
      ];    

      body[0].contentTitle = formValues.titleEn;
      body[1].contentTitle = formValues.titleBm;
      body[0].contentText = this.contentTxtEn;
      body[1].contentText = this.contentTxtMy;
      body[0].contentDescription = formValues.descEn;
      body[1].contentDescription = formValues.descBm;
      body[0].contentSort = formValues.seqEng;
      body[1].contentSort = formValues.seqMy;

      // body[0].contentCitizenFlag = formValues.citizenflag;
      // body[0].contentNonCitizenFlag = formValues.noncitizenflag;
      body[0].contentActiveFlag = formValues.active;
      body[0].agency.agencyId = this.agencyIdEn;

      // body[1].contentCitizenFlag = formValues.citizenflag;
      // body[1].contentNonCitizenFlag = formValues.noncitizenflag;
      body[1].contentActiveFlag = formValues.active;
      body[1].agency.agencyId = this.agencyIdBm;        
      

      body[0].contentCategories = arrCatIDEn;
      body[1].contentCategories = arrCatIDBm;      

      body[0].contentPublishDate = new Date(formValues.publish).getTime();
      body[0].contentEndDate = new Date(formValues.endD).getTime();

      body[1].contentPublishDate = new Date(formValues.publish).getTime();
      body[1].contentEndDate = new Date(formValues.endD).getTime();      

      body[0].agencyApplications = appsEn;
      body[1].agencyApplications = appsBm;  

      console.log("UPDATE NOT DRAFT: ");
      console.log(JSON.stringify(body))

      this.loading = true;
      // Update 
      this.commonservice.update(body, 'content/creator').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.contentsubmitted'), ''); 
            this.router.navigate(['content']);

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

  changeLanguageAddEdit(){
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);  
    }
    else{
      this.commonservice.pageModeChange(true);      
    }
  }

  parseChkEn(e){

    this.parseEnBtn = false;
  }

  parseChkMy(e){
    this.parseMyBtn = false;
  }

  checkReqValues() {
    let reqVal:any;

    reqVal = ["titleEn", "titleBm", "descEn", "descBm"];    

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

  changePlaceHolder(){
    this.urlEdit = this.router.url.split('/')[2];

    this.updateForm.get('agencyforApp').setValue('');
    this.updateForm.get('agencyApp').setValue('');

    if(this.languageId == 1){
      if(this.urlEdit == "add"){
        this.categoryPlaceholder = this.commonservice.showPlaceHolderEn;
        this.filterPlaceholder = this.commonservice.showFilterEn;
      }

      else{
        this.getData();
      }
    }

    else{
      if(this.urlEdit == "add"){
        this.categoryPlaceholder = this.commonservice.showPlaceHolderBm;        
        this.filterPlaceholder = this.commonservice.showFilterBm;
      }

      else{
        this.getData();
      }
    }
  }

  myFunction() {
    this.updateForm.reset();
    this.checkReqValues();   
  }

  back(){
    this.router.navigate(['content']);
  }

  getMinistry() {
    this.loading = true;
    return this.commonservice.readPortal('ministry', '0', '300')
      .subscribe(resMinData => {
        this.ministryData = resMinData['list'];
        this.loading = false;
      },
      Error => {
        this.loading = false;
      });
  }

  //list of agency app for selected agency
  getAgencyApp(agencyId) {
    this.loading = true;   
    return this.commonservice.readPortal('agency/application/agencyid/'+agencyId)
      .subscribe(resMinData => {
        this.agencyAppData = resMinData['agencyApplicationList'];
        this.loading = false;
      },
      Error => {
        this.loading = false;
      });
   
  }

  selectedMinistry(e, val){
   
    let getMinistryIdEn = e.value;
    let getMinistryIdBm = e.value;
    let dataList = this.ministryData;
    let indexVal: any;
    let idBm: any;
    let idEn: any;

   
    if(val == 1){

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[0].ministryId;
        if(indexVal == getMinistryIdEn){
          idBm = dataList[i].list[1].ministryId;
          this.selectedMinEn=dataList[i].list[0].ministryName;
          this.selectedMinBm=dataList[i].list[1].ministryName;
        }        
      }

      this.updateForm.get('ministryBm').setValue(idBm);  
    }
    else{

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[1].ministryId;
        if(indexVal == getMinistryIdBm){
          idEn = dataList[i].list[0].ministryId;
          this.selectedMinEn=dataList[i].list[0].ministryName;
          this.selectedMinBm=dataList[i].list[1].ministryName;
        }        
      }

      this.updateForm.get('ministryEn').setValue(idEn); 
    }
  }

  selectedAgencyApp(e){ 
   
    let dataList = this.agencyAppData;
    let idAgencyApp: any;
    let codeAgencyApp: any;

    for(let i=0; i<dataList.length; i++){
  
      if(e.value == dataList[i].agencyApplicationId){
        idAgencyApp = dataList[i].agencyApplicationId;
        codeAgencyApp = dataList[i].agencyApplicationCode;
      }            
    }

    console.log("AgencyAppID: "+idAgencyApp+" codeAgencyApp: "+codeAgencyApp);


    this.updateForm.get('agencyApp').setValue(idAgencyApp);  

    this.getAgencyAppEnBm(codeAgencyApp);
    
  }

  //onclick agenci application
  getAgencyAppEnBm(getAgencyAppEnBm){

    this.loading = true;   

    let flagNoOfRecord: any; 
    
    if(getAgencyAppEnBm != undefined){
      return this.commonservice.readPortal('agency/application/code/'+getAgencyAppEnBm)
        .subscribe(resMinData => {

          this.commonservice.errorHandling(resMinData, (function () {
            this.agencyAppDataCode = resMinData['agencyApplicationList'];

            let a = [{"agencyName": this.agencyAppDataCode[0].agencyName,
                      "agencyId": this.agencyAppDataCode[0].agencyId,
                      "agencyAppID": this.agencyAppDataCode[0].agencyApplicationId,
                      "agencyApplicationName": this.agencyAppDataCode[0].agencyApplicationName,
                      "agencyUrl":this.agencyAppDataCode[0].agencyApplicationUrl,
                      "agencyCode":this.agencyAppDataCode[0].agencyApplicationCode},
                     {"agencyName": this.agencyAppDataCode[1].agencyName,
                      "agencyId": this.agencyAppDataCode[1].agencyId,
                      "agencyAppID": this.agencyAppDataCode[1].agencyApplicationId,
                      "agencyApplicationName": this.agencyAppDataCode[1].agencyApplicationName,
                      "agencyUrl":this.agencyAppDataCode[1].agencyApplicationUrl,
                      "agencyCode":this.agencyAppDataCode[1].agencyApplicationCode}]        
      
            if(this.arrAgencyApp.length>0){
              flagNoOfRecord = false;
      
              for(let i=0; i<this.arrAgencyApp.length; i++){
                if(this.arrAgencyApp[i][0].agencyCode == getAgencyAppEnBm){
                  flagNoOfRecord = true;
                }           
              }
            }

            else{
              this.arrAgencyApp.push(a);
            }

            if(flagNoOfRecord == false){
              this.arrAgencyApp.push(a);
            }

            this.dataSource = new MatTableDataSource<object>(this.arrAgencyApp);

          }).bind(this));

          this.loading = false;
        },
        error => {
          this.loading = false;
        });
    }
  }

  onScroll(event, lngId){

    // console.log(event.target.scrollHeight+' - '+event.target.scrollTop +  'Required scroll bottom ' +(event.target.scrollHeight - 250) +' Container height: 250px');
    if(event.target.scrollTop >= (event.target.scrollHeight - 250)) {
      // console.log(this.searchAgencyResultEn.length)
      console.log(event)

      let keywordVal;
      
      if(lngId == 1) {
        keywordVal = this.updateForm.get("agencyEn").value
        this.getSearchData(keywordVal, lngId, 1, this.searchAgencyResultEn.length+10)
        console.log(this.searchAgencyResultEn)
      } else if(lngId == 2) {
        keywordVal = this.updateForm.get("agencyBm").value
        this.getSearchData(keywordVal, lngId, 1, this.searchAgencyResultBm.length+10)
        console.log(this.searchAgencyResultBm)
      }
    }
  }

  onScrollApp(event){

    // console.log(event.target.scrollHeight+' - '+event.target.scrollTop +  'Required scroll bottom ' +(event.target.scrollHeight - 250) +' Container height: 250px');
    if(event.target.scrollTop >= (event.target.scrollHeight - 250)) {
      // console.log(this.searchAgencyResultEn.length)
      console.log(event)

      let keywordVal;
   
        keywordVal = this.updateForm.get("agencyforApp").value;
        this.getSearchDataApp(keywordVal, 1, this.searchAgencyResult.length+10);
    }
  }

  resetSearch() {
    this.updateForm.get('agencyEn').setValue('');
    this.updateForm.get('agencyBm').setValue('');
    this.isActiveListEn = false;
    this.isActiveListBm = false;
    this.agencyIdEn = null;
    this.agencyIdBm = null;
    // this.getModuleData(this.pageCount, this.pageSize);
  }

  resetSearchApp() {
    this.updateForm.get('agencyforApp').setValue('');
    this.isActiveList = false;
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
    this.isActive = true;    

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
  
    this.commonservice.readPortal('agency/refcode/language/'+this.languageId+'/'+agenCode,'','', '').subscribe(
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
      this.isActive = false;
      this.isActiveListBm = false;
      this.updateForm.get('agencyBm').setValue(aName);
      this.agencyBm = aId;
      this.agencyIdBm = aId;
      this.ministryNameBm = mName;

    }
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
    this.commonservice.readPortalById('agency/refcode/language/'+langId+'/', refCode)
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
        }).bind(this));
        this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  getSearchDataApp(keyword, count, page){

    this.searchAgencyResult = [];
    
    //this.updateForm.get('agencyforApp').setValue("");
    //if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
    this.isActive = true;
    this.loading = true;

    setTimeout(()=>{  
      
      this.commonservice.readPortal('agency/language/'+this.languageId, count, page, keyword).subscribe(
        data => {

        this.commonservice.errorHandling(data, (function(){

          if(data['agencyList'].length != 0) {
            if(this.languageId == 1) {
              this.searchAgencyResult = data['agencyList'];
              this.isActiveList = true;
            } else {
              this.searchAgencyResult = data['agencyList'];
              this.isActiveList = true;
            }
          }
        }).bind(this));
          this.loading = false;
      },err => {
        this.loading = false;
      });
    }, 2000);  
    // else {
    //   this.isActiveList = false;
    // }
  }

  getValueApp(aId,aName,mName, refCode){

    if(this.languageId == 1) {
      this.agencyforApp = this.updateForm.get('agencyforApp').value;
      this.isActiveList = false;
      this.searchAgencyResult = [''];
      this.updateForm.get('agencyforApp').setValue(aName);
      this.agencyforApp = aName;
      this.agencyIdforApp = aId;

    } else {
      this.agencyforApp = this.updateForm.get('agencyforApp').value;
      this.isActive = false;
      this.isActiveList = false;
      this.searchAgencyResult = [''];
      this.updateForm.get('agencyforApp').setValue(aName);
      this.agencyforApp = aName;
      this.agencyIdforApp = aId;

    }
    this.getAgencyByRefCodeApp(refCode);
    this.getAgencyApp(this.agencyIdforApp);
  }

  getAgencyByRefCodeApp(refCode) {

    let selLangField;
    let mName;
    let aName;
    let aId;
    let langId;

    if(this.languageId == 1) {
      langId = 2;
    } else {
      langId = 1;
    }
    this.loading = true;
    this.commonservice.readPortalById('agency/refcode/language/'+langId+'/', refCode)
    .subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
      
          mName = data['list'][0]['agencyMinistry']['ministryName'];
          aName = data['list'][0]['agencyName'];
          aId = data['list'][0]['agencyId'];
          
          if(langId == 1) {
            this.agencyIdforApp = aId;
          } else {
            this.agencyIdforApp = aId;
          }
        }).bind(this));
        this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  deleteApp(agenCode){

    for(let i=0; i<this.arrAgencyApp.length; i++){
      if(this.arrAgencyApp[i][0].agencyCode == agenCode){
        this.arrAgencyApp.splice(i,1);
      }         
    }

    this.dataSource = new MatTableDataSource<object>(this.arrAgencyApp);
  }

}