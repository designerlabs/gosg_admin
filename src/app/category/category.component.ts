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
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  value: any;
  itemEn: any;
  itemBm: any;

  updateForm: FormGroup;
  
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

  public parentFlag = false;

  public categoryPlaceholder = "";
  public filterPlaceholder = "";
  public urlEdit = "";

  editor = {treeVal: '' };

  constructor(private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    public builder: FormBuilder) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.commonservice.getModuleId();
              this.getCategory();
              this.changePlaceHolder(); 
              this.changeLanguageAddEdit();              
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.commonservice.getModuleId();
      this.getCategory();
      //this.getData();
    }
    /* LANGUAGE FUNC */

    // this.updateForm = builder.group({
    //   treeVal: ""
    // })
   
  }

  ngOnInit() {

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

    this.active = new FormControl();

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
      deleted: this.deleted
      
    });

    this.getCategory();
    this.getImageList();

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

  selectedImage(e, val){

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

  getCategory(){

    this.loading = true;
    return this.commonservice.readProtected('content/category')
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


  getData() {  

    let _getRefID = this.router.url.split('/')[2];
  
    this.loading = true;
    this.commonservice.readProtectedById('content/category/',_getRefID)
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.recordList = data;

        this.updateForm.get('titleEn').setValue(this.recordList.list[0].categoryName);
        this.updateForm.get('titleBm').setValue(this.recordList.list[1].categoryName);   
        this.updateForm.get('descEn').setValue(this.recordList.list[0].categoryDescription);
        this.updateForm.get('descBm').setValue(this.recordList.list[1].categoryDescription);  
          
        //this.updateForm.get('parentsBm').setValue(this.recordList.list[1].parentId);  
        // this.updateForm.get('imageEn').setValue(this.recordList.list[0].image.mediaId); 
        // this.updateForm.get('imageBm').setValue(this.recordList.list[1].image.mediaId);  
             
        this.updateForm.get('ismainmenu').setValue(this.recordList.list[0].isMainMenu);   
        this.updateForm.get('active').setValue(this.recordList.list[0].isActiveFlag);  
        this.updateForm.get('subcription').setValue(this.recordList.list[0].isSubscribable);  
        this.updateForm.get('deleted').setValue(this.recordList.list[0].isDeleted);  

        this.getIdEn = this.recordList.list[0].categoryId;
        this.getIdBm = this.recordList.list[1].categoryId;
        this.getRefCode = this.recordList.list[0].refCode;
        this.catCode = this.recordList.list[0].categoryCode;

        if(this.recordList.list[0].image != null){

          this.updateForm.get('imageEn').setValue(this.recordList.list[0].image.mediaId); 
          this.updateForm.get('imageBm').setValue(this.recordList.list[1].image.mediaId);  
        }
        
        // if(this.languageId == 1){
      
        //   if(this.recordList.list[0].parentId.categoryId != -1){
        //   this.categoryPlaceholder = this.recordList.list[0].parentId.categoryName;
        //   }

        //   else{
        //     this.categoryPlaceholder = this.commonservice.showPlaceHolderEn;
        //   }
        // }

        // else{
     
        //   if(this.recordList.list[1].parentId.categoryId != -2){
        //     this.categoryPlaceholder = this.recordList.list[1].parentId.categoryName;
        //   }

        //   else{
        //     this.categoryPlaceholder = this.commonservice.showPlaceHolderBm;
        //   }
        // }

        let setParentEn = [];

        //get array of categoryId        
        console.log("GET CATEGORY TREE");
        console.log(this.languageId);             

        if(this.languageId == 1){    
          console.log("ENGLISH");    

          let a = {
            "id": [this.recordList.list[0].parentId.categoryId,this.recordList.list[1].parentId.categoryId],
            "text":this.recordList.list[0].parentId.categoryName,
            "value": this.recordList.list[0].parentId.categoryId
          }
            
          setParentEn.push(a);    
          
          //this.categoryPlaceholder = dataEn.contentCategories[0].categoryName;          
          this.filterPlaceholder = this.commonservice.showFilterEn;         
          if(this.recordList.list[0].parentId.categoryId != -1){
            this.categoryPlaceholder = this.recordList.list[0].parentId.categoryName;
          }
  
          else{
            this.categoryPlaceholder = this.commonservice.showPlaceHolderEn;
          } 
        }

        else{
          console.log("BAHASA MALAYSIA");   

          let a = {
            "id": [this.recordList.list[0].parentId.categoryId,this.recordList.list[1].parentId.categoryId],
            "text":this.recordList.list[1].parentId.categoryName,
            "value": this.recordList.list[1].parentId.categoryId
          }  

          setParentEn.push(a);    
          
          //this.categoryPlaceholder = dataBm.contentCategories[0].categoryName;
          this.filterPlaceholder = this.commonservice.showFilterBm;
          if(this.recordList.list[0].parentId.categoryId != -2){
            this.categoryPlaceholder = this.recordList.list[1].parentId.categoryName;
          }
  
          else{
            this.categoryPlaceholder = this.commonservice.showPlaceHolderEn;
          } 
        }

        console.log(setParentEn);  
        console.log("OOOOO");         
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

  getImageList(){
    this.loading = true;
    this.commonservice.readProtected('media/category/name/Article')
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

    console.log(ele);
    console.log(this.parentFlag);
  }

  submit(formValues: any) {
    this.urlEdit = this.router.url.split('/')[2];

    let parentValEn = formValues.parentsEn;
    let parentValBm = formValues.parentsBm;

    console.log("PARENTSSSSSSSS");
    console.log(formValues.parentsEn);

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

    if(formValues.imageEn == null){
      valImgEn = null;
      valImgBm = null;
    }

    else{
      valImgEn = { "mediaId": null };
      valImgBm = { "mediaId": null };
      
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
          "isDeleted":false
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
          "isDeleted":false
        }
      ]         

      
      body[0].categoryName = formValues.titleEn;
      body[0].categoryDescription = formValues.descEn;      
      body[0].isMainMenu = formValues.ismainmenu;      
      body[0].isActiveFlag = formValues.active;   
      body[0].isSubscribable = formValues.subcription;   
      body[0].isDeleted = formValues.deleted; 
    
      body[1].categoryName = formValues.titleBm;
      body[1].categoryDescription = formValues.descBm;      
      body[1].isMainMenu = formValues.ismainmenu;
      body[1].isActiveFlag = formValues.active; 
      body[1].isSubscribable = formValues.subcription;     
      body[1].isDeleted = formValues.deleted; 

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

      console.log(JSON.stringify(body))      

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
          "isDeleted":false
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
          "isDeleted":false
        }
      ]    
     
      body[0].categoryName = formValues.titleEn;
      body[0].categoryDescription = formValues.descEn;
      body[0].isMainMenu = formValues.ismainmenu;
      body[0].isActiveFlag = formValues.active;  
      //body[0].image.mediaId = formValues.imageEn;
      body[0].isSubscribable = formValues.subcription;   
      body[0].isDeleted = formValues.deleted; 

      body[1].categoryName = formValues.titleBm;
      body[1].categoryDescription = formValues.descBm;      
      body[1].isMainMenu = formValues.ismainmenu;
      body[1].isActiveFlag = formValues.active;  
      //body[1].image.mediaId = formValues.imageBm;     
      body[1].isSubscribable = formValues.subcription;  
      body[1].isDeleted = formValues.deleted;   

      if(formValues.imageBm != null && formValues.imageEn != null){
        body[0].image.mediaId = formValues.imageEn;      
        body[1].image.mediaId = formValues.imageBm;

        console.log(formValues.imageEn +" : "+ formValues.imageBm);
      }

      // if(formValues.parentsEn == null || formValues.parentsEn == ""){

      //   parentValEn = -1;
      //   parentValBm = -2;
            
      //   body[0].parentId.categoryId = this.parentsValEn;
      //   body[1].parentId.categoryId = this.parentsValBm; 
      // }

      console.log("LENGTH: ");
      console.log(parentValEn);
      console.log(parentValEn.length);

      if(parentValEn.length == undefined){
        body[0].parentId.categoryId = parentValEn.id[0];
        body[1].parentId.categoryId = parentValEn.id[1]; 
      }
    
      else{
        body[0].parentId.categoryId = parentValEn[0].id[0];
        body[1].parentId.categoryId = parentValEn[0].id[1];  
      }
          
      
      console.log(JSON.stringify(body))
      this.loading = true;
      this.commonservice.update(body,'content/category/update/').subscribe(
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

}
