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
@Component({
  selector: 'app-lifeevent',
  templateUrl: './lifeevent.component.html',
  styleUrls: ['./lifeevent.component.css']
})
export class LifeeventComponent implements OnInit {

  updateForm: FormGroup;
  
  public titleEn: FormControl;  
  public titleBm: FormControl;
  public descEn: FormControl;  
  public descBm: FormControl;
  public imgEn: FormControl;
  public imgBm: FormControl;
  public catEn: FormControl;
  public catBm: FormControl;
  public active: FormControl;
  public htmlContentEn: FormControl;
  public htmlContentMy: FormControl;
  itemEn: any;
  itemBm: any;
  public parentsEn: FormControl;
  public parentsBm: FormControl;
  public ismainmenu: FormControl;
  public imageEn: FormControl;
  public imageBm: FormControl;
  public dataUrl: any;  
  public recordList: any;
  public categoryData: any;
  public getCatIdEn: any;
  public getCatIdBm: any;
  public subcription: FormControl;
  public deleted: FormControl;

  public getIdEn: any;
  public getIdBm: any;
  public getRefCode: any;

  public complete: boolean;
  public languageId: any;
  public treeEn: any;
  public treeBm: any;
  public imageData: any;
  public getImgEn: any;
  public getImgdBm: any;
  public catCode: any;
  public loading = false;

  public parentsValEn : any;
  public parentsValBm : any;
  public resultEn1: any;
  public categoryPlaceholder = "";
  public urlEdit = "";


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
    public dialog: MatDialog ) {

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
              //this.getUsersData(this.pageCount, this.pageSize);
              this.changeLanguageAddEdit();
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
  }
  

  ngOnInit() {  
    this.parentsEn = new FormControl();
    this.parentsBm = new FormControl();
    this.ismainmenu = new FormControl();
    this.imageEn = new FormControl();
    this.imageBm = new FormControl();
    this.subcription = new FormControl();
    this.deleted = new FormControl();

    this.titleEn = new FormControl();
    this.titleBm = new FormControl();
    this.descEn = new FormControl();
    this.descBm = new FormControl();
    this.imgEn = new FormControl();
    this.imgBm = new FormControl();
    this.catEn = new FormControl();
    this.catBm = new FormControl();
    this.active = new FormControl();
    this.htmlContentEn = new FormControl();
    this.htmlContentMy = new FormControl();

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
      imgEn: this.imgEn,
      imgBm: this.imgBm,
      catEn: this.catEn,
      catBm: this.catBm,
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
    }
    this.commonservice.getModuleId();
  }


  

  selectedCat(e, val){

    // console.log(e);
    // this.getCatIdEn = e.value;
    // this.getCatIdBm = e.value;
    // let dataList = this.categoryData;
    // let indexVal: any;
    // let idBm: any;
    // let idEn: any;

    // console.log("EN: "+this.getCatIdEn+" BM: "+this.getCatIdBm+ " value: " +val);

    // if(val == 1){

    //   for(let i=0; i<dataList.length; i++){
    //     indexVal = dataList[i].list[0].id;
    //     if(indexVal == this.getCatIdEn){
    //       idBm = dataList[i].list[1].id;
    //     }        
    //   }

    //   this.updateForm.get('catBm').setValue(idBm);  
    // }
    // else{

    //   for(let i=0; i<dataList.length; i++){
    //     indexVal = dataList[i].list[1].id;
    //     if(indexVal == this.getCatIdBm){
    //       idEn = dataList[i].list[0].id;
    //     }        
    //   }

    //   this.updateForm.get('catEn').setValue(idEn); 
    // }
  }

  selectedImage(e, val){

    console.log(e);
    this.imageEn = e.value;
    this.imageBm = e.value;
   
    let indexVal: any;
    let idBm: any;
    let idEn: any;   

    console.log("EN: "+this.imageEn+" BM: "+this.imageBm+ " value: " +val);

    // if english
    if(val == 1){

    
      for(let i=0; i<this.imageData.length; i++){
        indexVal = this.imageData[i].list[0].mediaId;
        if(indexVal == this.imageEn){
          idBm = this.imageData[i].list[1].mediaId;
        }            
      }   

      this.updateForm.get('imageBm').setValue(idBm);  
    }

    else{ //if malay

      for(let i=0; i<this.imageData.length; i++){
        indexVal = this.imageData[i].list[1].mediaId;
        if(indexVal == this.imageBm){
          idBm = this.imageData[i].list[0].mediaId;
        }        
      }

      this.updateForm.get('imageEn').setValue(idEn); 
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
          dialogRef.componentInstance.content = resCatData.formattedHtml;
          
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
    console.log();
  }

  getCategory(){

    this.loading = true;
    return this.commonservice.readProtected('content/category')
     .subscribe(data => {
  
      console.log("GET CATEGORY: ");
      console.log(data);
        
      this.commonservice.errorHandling(data, (function(){

          this.categoryData = data["list"];   
          console.log(this.categoryData);    
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
                    // categoryName: this.categoryData[i].list[0].categoryName,
                    text: this.categoryData[i].list[0].categoryName,
                    checked: false,
                    children: []});      
                  
              arrCatBm.push({
                    id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                    value:this.categoryData[i].list[1].categoryId,
                    refCode: this.categoryData[i].refCode,
                    parent: this.categoryData[i].list[1].parentId.categoryId,
                    parentEn: this.categoryData[i].list[0].parentId.categoryId,
                    parentBm: this.categoryData[i].list[1].parentId.categoryId,
                    // categoryName: this.categoryData[i].list[1].categoryName,
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

     this.commonservice.readPortalById('accountstatus/code/', _getRefID)
      .subscribe(data => {
        this.recordList = data;

        console.log("data");
        console.log(data);

        this.updateForm.get('titleEn').setValue(this.recordList[0].accountStatusDescription);
        this.updateForm.get('titleBm').setValue(this.recordList[1].accountStatusDescription);   
        this.updateForm.get('descEn').setValue(this.recordList[0].accountStatusDescription);
        this.updateForm.get('descBm').setValue(this.recordList[1].accountStatusDescription);  
        this.updateForm.get('parents').setValue(this.recordList[0].enabled);    
        this.updateForm.get('active').setValue(this.recordList[0].enabled);      
        this.updateForm.get('ismainmenu').setValue(this.recordList[0].enabled);    

        this.getIdEn = this.recordList[0].accountStatusId;
        this.getIdBm = this.recordList[1].accountStatusId;
        this.getRefCode = this.recordList[0].accountStatusCode;

        this.checkReqValues();
        
      });

    
  }

  submit(formValues: any) {
    this.urlEdit = this.router.url.split('/')[2];
    let txt = "";

    // add form
    if(this.urlEdit === 'add'){

      let body = [
        {
        
          "accountStatusDescription": null,
          "enabled":false,
          "language": {
              "languageId": 1
          }
        },{
          "accountStatusDescription": null,
          "enabled":false,
          "language": {
              "languageId": 2
          }
        }
      ]    

      body[0].accountStatusDescription = formValues.accEn;
      body[0].enabled = formValues.active;
      body[1].accountStatusDescription = formValues.accBm;
      body[1].enabled = formValues.active;

      console.log("TEST")
      console.log(JSON.stringify(body))
     
      this.commonservice.create(body, 'accountstatus').subscribe(
        data => {         
          
          let errMsg = data.statusCode.toLowerCase();

          if(errMsg == "error"){
            this.commonservice.errorResponse(data);
          }
          
          else{
            txt = "Record added successfully!"
            this.toastr.success(txt, '');  
            this.router.navigate(['lifeevent']);
          }  
        },
        error => {

          txt = "Server is down."
          this.toastr.error(txt, '');  
          console.log(error);
      });
    }

    // update form
    else{
      let body = [
        {
          "accountStatusId":this.getIdEn,
          "accountStatusDescription": null,
          "enabled":false,
          "accountStatusCode": this.getRefCode,
          "language": {
              "languageId": 1
          }
        },{
          "accountStatusId":this.getIdBm,
          "accountStatusDescription": null,
          "enabled":false,
          "accountStatusCode": this.getRefCode,
          "language": {
              "languageId": 2
          }
        }
      ]        

      body[0].accountStatusDescription = formValues.accEn;
      body[0].enabled = formValues.active;
      body[1].accountStatusDescription = formValues.accBm;
      body[1].enabled = formValues.active;
      

      console.log("UPDATE: ");
      console.log(body);

      this.commonservice.update(body,'accountstatus').subscribe(
        data => {
          
          let errMsg = data.statusCode.toLowerCase();

          if(errMsg == "error"){
            this.commonservice.errorResponse(data);
          }
          
          else{
            txt = "Record updated successfully!"
            this.toastr.success(txt, '');  
            this.router.navigate(['content']);
          }  
        },
        error => {

          txt = "Server is down."
          this.toastr.error(txt, '');  
          console.log(error);
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
      this.categoryPlaceholder = "Category Parents";
    }

    else{
      this.categoryPlaceholder = "Induk Kategori";
    }
  }

  myFunction() {
    this.updateForm.reset();
    this.checkReqValues();   
  }

  back(){
    this.router.navigate(['lifeevent']);
  }

}


@Component({
  selector: 'dialog-result-example-dialog',
  template: `
<div mat-dialog-content>
  <div [innerHTML]="content"></div>
</div>
<div mat-dialog-actions>
<button mat-button (click)="dialogRef.close()">
Cancel
</button>
</div>
  `,
})
export class DialogResultExampleDialog {
  content: string;
  constructor(public dialogRef: MatDialogRef<DialogResultExampleDialog>) {}
}