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

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  filterPlaceholder: string;
  parentValEn: any;
  parentValBm: any;

  showPlaceHolderEn = "Category Parents";
  showPlaceHolderBm = "Induk Kategori";
  showFilterEn = "Type your filter here...";
  showFilterBm = "Taip tapisan di sini...";

  rawValBm: any;
  rawValEn: any;

  parseEnBtn: boolean;
  parseMyBtn: boolean;

  updateForm: FormGroup;
  
  public titleEn: FormControl;  
  public titleBm: FormControl;
  public descEn: FormControl;  
  public descBm: FormControl;
  public active: FormControl;
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
  public urlEdit = "";

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
    this.parseEnBtn = false;
    this.parseMyBtn = false;
    this.parentsEn = new FormControl();
    this.parentsBm = new FormControl();
    this.deleted = new FormControl();

    this.titleEn = new FormControl();
    this.titleBm = new FormControl();
    this.descEn = new FormControl();
    this.descBm = new FormControl();
    this.seqEng = new FormControl();
    this.seqMy = new FormControl();
    this.active = new FormControl();

    this.htmlContentEn = new FormControl();
    this.htmlContentMy = new FormControl();

    this.updateForm = new FormGroup({   

      titleEn: this.titleEn,
      titleBm: this.titleBm,
      descEn: this.descEn,    
      descBm: this.descBm,
      seqEng: this.seqEng,
      seqMy: this.seqMy,
      parentsEn: this.parentsEn,
      parentsBm: this.parentsBm,
      active: this.active,
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
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
     
      console.log(this.parseEnBtn);
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

    this.urlEdit = this.router.url.split('/')[2];

    if(this.urlEdit === "add" && ele == ""){
      this.parentFlag = false;
    }

    else if(this.urlEdit === "add" && ele != ""){
      this.parentFlag = true;
    }

    else{
      this.parentFlag = true;
    }

    console.log(ele);   
  }

  getCategory(){

    this.loading = true;
    return this.commonservice.readProtected('content/dropdown')
     .subscribe(data => {
  
      console.log("GET CATEGORY: ");
      console.log(data);
        
      this.commonservice.errorHandling(data, (function(){

          this.categoryData = data["list"];   
          console.log(this.categoryData);    
          let arrCatEn = [];          
          let arrCatBm = [];          

          for(let i=0; i<this.categoryData.length; i++){     
    
              if(this.categoryData[i].list.length === 2){
                arrCatEn.push({
                  
                      id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                      value:this.categoryData[i].list[0].categoryId,
                      refCode: this.categoryData[i].refCode,
                      parent: this.categoryData[i].list[0].parentId,
                      text: this.categoryData[i].list[0].categoryName,
                      checked: false,
                      children: []});      
                    
                arrCatBm.push({
                      id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                      value:this.categoryData[i].list[1].categoryId,
                      refCode: this.categoryData[i].refCode,
                      parent: this.categoryData[i].list[1].parentId,
                      checked: false,
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
          console.log(this.itemEn);
          
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

        this.getIdEn = dataEn.contentId;
        this.getIdBm = dataBm.contentId;
        this.getRefCode = this.recordList.refCode;
        this.sendForApporval = dataEn.isSendForApproval;

        this.checkReqValues();

        //check contentImage element exist or not.
        let getObjKeys = Object.keys(dataEn);
        let valMT = getObjKeys.filter(fmt => fmt === "contentText");

        if(valMT.length > 0){
      
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
        }

        this.parentValEn = dataEn.contentCategories[0].categoryId;
        this.parentValBm = dataBm.contentCategories[0].categoryId;

        this.parseEnBtn = true;
        this.parseMyBtn = true;

        if(this.languageId == 1){          
          this.categoryPlaceholder = dataEn.contentCategories[0].categoryName;
          this.filterPlaceholder = this.showFilterEn;          
        }

        else{
          this.categoryPlaceholder = dataBm.contentCategories[0].categoryName;
          this.filterPlaceholder = this.showFilterBm;
        }
        
      });
    }
    
  }

  draft(formValues: any) {
    this.urlEdit = this.router.url.split('/')[2];
    let txt = "";
    let parentValEn: any;
    let parentValBm: any;

    // add form
    if(this.urlEdit === 'add'){

      let body = [
        {
          "contentCategoryId": null,
          "contents": [
            {
            "contentTitle": null,
            "contentText": null,
            "contentDescription": null,
       
            "contentSort": null,
            "contentUrl": null,
            "language": {
              "languageId": 1
              },          
            "contentCitizenFlag": false,
            "contentNonCitizenFlag":false,
            "contentActiveFlag":false
            }
          ]
        },
        {
          "contentCategoryId": null,
          "contents": [
            {
            "contentTitle": null,
            "contentText": null,
            "contentDescription": null,
            "contentSort": null,
            "contentUrl": null,
            "language": {
              "languageId": 2
              },        
            "contentCitizenFlag": false,
            "contentNonCitizenFlag":false,
            "contentActiveFlag":false
            }
          ]
        }
      ];    

      body[0].contents[0].contentTitle = formValues.titleEn;
      body[1].contents[0].contentTitle = formValues.titleBm;
      body[0].contents[0].contentText = this.contentTxtEn;
      body[1].contents[0].contentText = this.contentTxtMy;
      body[0].contents[0].contentDescription = formValues.descEn;
      body[1].contents[0].contentDescription = formValues.descBm;
      body[0].contents[0].contentSort = formValues.seqEng;
      body[1].contents[0].contentSort = formValues.seqMy;

      body[0].contents[0].contentActiveFlag = formValues.active;
      body[1].contents[0].contentActiveFlag = formValues.active;
    
      this.parentValEn = formValues.parentsEn;
      this.parentValBm = formValues.parentsBm;
      body[0].contentCategoryId = this.parentValEn.id[0];
      body[1].contentCategoryId = this.parentValEn.id[1];             

      console.log(JSON.stringify(body))
     
      this.loading = true;
      // Add
      this.commonservice.create(body, 'content/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.ledraft'), ''); 
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
          "contentCategoryId": null,
          "contents": [
            {
            "contentId":  this.getIdEn,
            "contentTitle": null,
            "contentText": null,
            "contentDescription": null,
       
            "contentSort": null,
            "contentUrl": null,
            "language": {
              "languageId": 1
              },
            "contentCitizenFlag": false,
            "contentNonCitizenFlag":false,
            "contentActiveFlag":false
            }
          ]
        },
        {
          "contentCategoryId": null,
          "contents": [
            {
            "contentId":  this.getIdBm,
            "contentTitle": null,
            "contentText": null,
            "contentDescription": null,
            "contentSort": null,
            "contentUrl": null,
            "language": {
              "languageId": 2
              },
            "contentCitizenFlag": false,
            "contentNonCitizenFlag":false,
            "contentActiveFlag":false
            }
          ]
        }
      ];    

      console.log("kkkkkkkkkkkkkkkkkkkkk");
      console.log(this.contentTxtEn);

      body[0].contents[0].contentTitle = formValues.titleEn;
      body[1].contents[0].contentTitle = formValues.titleBm;
      body[0].contents[0].contentText = this.contentTxtEn;
      body[1].contents[0].contentText = this.contentTxtMy;
      body[0].contents[0].contentDescription = formValues.descEn;
      body[1].contents[0].contentDescription = formValues.descBm;
      body[0].contents[0].contentSort = formValues.seqEng;
      body[1].contents[0].contentSort = formValues.seqMy;

      body[0].contents[0].contentActiveFlag = formValues.active;
      body[1].contents[0].contentActiveFlag = formValues.active;

      if(formValues.parentsEn == null || formValues.parentsEn == ""){
       
        body[0].contentCategoryId = this.parentValEn;
        body[1].contentCategoryId = this.parentValBm;
      }

      else {      
        this.parentValEn = formValues.parentsEn;
        this.parentValBm = formValues.parentsBm;
        body[0].contentCategoryId = this.parentValEn.id[0];
        body[1].contentCategoryId = this.parentValEn.id[1];       
      }
      

      console.log("UPDATE: ");
      console.log(JSON.stringify(body))

      this.loading = true;
      // Update 
      this.commonservice.update(body, 'content/draft').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.ledraft'), ''); 
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
    let txt = "";
    let parentValEn: any;
    let parentValBm: any;

    // add form
    if(this.urlEdit === 'add'){

      let body = [
        {
          "contentCategoryId": null,
          "contents": [
            {
            "contentTitle": null,
            "contentText": null,
            "contentDescription": null,
       
            "contentSort": null,
            "contenttUrl": null,
            "language": {
              "languageId": 1
              },          
            "contentCitizenFlag": false,
            "contentNonCitizenFlag":false,
            "contentActiveFlag":false
            }
          ]
        },
        {
          "contentCategoryId": null,
          "contents": [
            {
            "contentTitle": null,
            "contentText": null,
            "contentDescription": null,
            "contentSort": null,
            "contentUrl": null,
            "language": {
              "languageId": 2
              },          
            "contentCitizenFlag": false,
            "contentNonCitizenFlag":false,
            "contentActiveFlag":false
            }
          ]
        }
      ];    

      body[0].contents[0].contentTitle = formValues.titleEn;
      body[1].contents[0].contentTitle = formValues.titleBm;
      body[0].contents[0].contentText = this.contentTxtEn;
      body[1].contents[0].contentText = this.contentTxtMy;
      body[0].contents[0].contentDescription = formValues.descEn;
      body[1].contents[0].contentDescription = formValues.descBm;
      body[0].contents[0].contentSort = formValues.seqEng;
      body[1].contents[0].contentSort = formValues.seqMy;

      body[0].contents[0].contentActiveFlag = formValues.active;
      body[1].contents[0].contentActiveFlag = formValues.active;

      this.parentValEn = formValues.parentsEn;
      this.parentValBm = formValues.parentsBm;
      body[0].contentCategoryId = this.parentValEn.id[0];
      body[1].contentCategoryId = this.parentValEn.id[1];   

      console.log(JSON.stringify(body))
     
      this.loading = true;
      // Add
      this.commonservice.create(body, 'content').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.lesubmitted'), ''); 
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
          "contentCategoryId": null,
          "contents": [
            {
            "contentId":  this.getIdEn,
            "contentTitle": null,
            "contentText": null,
            "contentDescription": null,
       
            "contentSort": null,
            "contentUrl": null,
            "language": {
              "languageId": 1
              },
            "contentCitizenFlag": false,
            "contentNonCitizenFlag":false,
            "contentActiveFlag":false
            }
          ]
        },
        {
          "contentCategoryId": null,
          "contents": [
            {
            "contentId":  this.getIdBm,
            "contentTitle": null,
            "contentText": null,
            "contentDescription": null,
            "contentSort": null,
            "contentUrl": null,
            "language": {
              "languageId": 2
              },
            "contentCitizenFlag": false,
            "contentNonCitizenFlag":false,
            "contentActiveFlag":false
            }
          ]
        }
      ];    

      body[0].contents[0].contentTitle = formValues.titleEn;
      body[1].contents[0].contentTitle = formValues.titleBm;
      body[0].contents[0].contentText = this.contentTxtEn;
      body[1].contents[0].contentText = this.contentTxtMy;
      body[0].contents[0].contentDescription = formValues.descEn;
      body[1].contents[0].contentDescription = formValues.descBm;
      body[0].contents[0].contentSort = formValues.seqEng;
      body[1].contents[0].contentSort = formValues.seqMy;

      body[0].contents[0].contentActiveFlag = formValues.active;
      body[1].contents[0].contentActiveFlag = formValues.active;

      if(formValues.parentsEn == null || formValues.parentsEn == ""){
   
        body[0].contentCategoryId = this.parentValEn;
        body[1].contentCategoryId = this.parentValBm;
      }

      else {      
        this.parentValEn = formValues.parentsEn;
        this.parentValBm = formValues.parentsBm;
        body[0].contentCategoryId = this.parentValEn.id[0];
        body[1].contentCategoryId = this.parentValEn.id[1];       
      }
      

      console.log("UPDATE: ");
      console.log(body);

      this.loading = true;
      // Update 
      this.commonservice.update(body, 'content').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.lesubmitted'), ''); 
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
    console.log(e);
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

    if(this.languageId == 1){
      if(this.urlEdit == "add"){
        this.categoryPlaceholder = this.showPlaceHolderEn;
        this.filterPlaceholder = this.showFilterEn;
      }

      else{
        this.getData();
      }
    }

    else{
      if(this.urlEdit == "add"){
        this.categoryPlaceholder = this.showPlaceHolderBm;        
        this.filterPlaceholder = this.showFilterBm;
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

}

