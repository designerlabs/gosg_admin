import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from './../dialogs/dialogs.service';
import { stringify } from '@angular/core/src/util';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  styles:[`
  .categoryList{
    color: #ff0 !important;
}
  `]
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
  public resultEn: FormControl;
  public dataUrl: any;  
  public recordList: any;
  public categoryData: any;
  public getCatIdEn: any;
  public getCatIdBm: any;

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

  constructor(private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private translate: TranslateService,
    private dialogsService: DialogsService) {

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
              this.getCategory()
              //this.getData();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.commonservice.getModuleId();
      //this.getData();
    }
    /* LANGUAGE FUNC */

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

    this.resultEn = new FormControl();

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
      resultEn: this.resultEn
      
    });

    this.getCategory();
    this.getImageList();

    let urlEdit = this.router.url.split('/')[2];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }

    this.commonservice.getModuleId();
    //document.getElementById("result").innerHTML = this.json_tree(this.treeEn);
    
  }


selectC(e){
  debugger;
}
  selectedCat(e, val){

    console.log(e);
    this.getCatIdEn = e.value;
    this.getCatIdBm = e.value;
    let dataListEn = this.treeEn;
    let dataListBm = this.treeBm;
    let indexVal: any;
    let idBm: any;
    let idEn: any;
    let refCodeVal: any;

    console.log("EN: "+this.getCatIdEn+" BM: "+this.getCatIdBm+ " value: " +val);

    // if english
    if(val == 1){

      //get the refcode
      for(let i=0; i<dataListEn.length; i++){
        indexVal = dataListEn[i].id;
        if(indexVal == this.getCatIdEn){
          refCodeVal = dataListEn[i].refCode;
        }        
      }

      //comprare refcode to get id for bm
      for(let i=0; i<dataListBm.length; i++){
        if(refCodeVal ==  dataListBm[i].refCode){
          idBm = dataListBm[i].id;
        }        
      }

      this.updateForm.get('parentsBm').setValue(idBm);  
    }

    else{ //if malay

      for(let i=0; i<dataListBm.length; i++){
        indexVal = dataListBm[i].id;
        if(indexVal == this.getCatIdBm){
          refCodeVal = dataListBm[i].refCode;
        }        
      }

      for(let i=0; i<dataListEn.length; i++){
        if(refCodeVal ==  dataListEn[i].refCode){
          idBm = dataListEn[i].id;
        }        
      }

      this.updateForm.get('parentsEn').setValue(idEn); 
    }
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
         
            arrCatEn.push({
                        id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                        value:this.categoryData[i].list[0].categoryId,
                        refCode: this.categoryData[i].refCode,
                        parent: this.categoryData[i].list[0].parentId,
                        parentEn: this.categoryData[i].list[0].parentId,
                        parentBm: this.categoryData[i].list[1].parentId,
                        // categoryName: this.categoryData[i].list[0].categoryName,
                        text: this.categoryData[i].list[0].categoryName,
                        checked: false,
                        children: []});      
                         
            arrCatBm.push({
                          id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                          value:this.categoryData[i].list[1].categoryId,
                          refCode: this.categoryData[i].refCode,
                          parent: this.categoryData[i].list[1].parentId,
                          parentEn: this.categoryData[i].list[0].parentId,
                          parentBm: this.categoryData[i].list[1].parentId,
                          // categoryName: this.categoryData[i].list[1].categoryName,
                          checked: false,
                          text: this.categoryData[i].list[1].categoryName,
                          children: []}); 
          }
          
          if(this.languageId == 1){
            this.treeEn = this.getNestedChildrenEn(arrCatEn, -1);
          }else if(this.languageId == 2){
            this.treeEn = this.getNestedChildrenBm(arrCatBm, -2);
          }else{
            this.treeEn = this.getNestedChildrenEn(arrCatEn, -1);
          }
          
          this.treeBm = this.getNestedChildrenBm(arrCatBm, -2);

          this.itemEn = this.treeEn;
          this.itemBm = this.treeBm;
          
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

  json_tree(data) {
    var json = `<ul style='margin:0px; padding:0px 15px;'>`;
      for (let i = 0; i < data.length; ++i) {
        json = json + `<li style='list-style-type: none;
                        margin:0px; padding:0px 15px; position: relative; '>`;
        let className = "categoryCheckbox";
        json = json + `<input type='checkbox' value=${data[i].id}> ${data[i].categoryName} <a onClick="alert(${data[i].id});">click</a>`;
        
        if (data[i].children.length) {
          json = json + this.json_tree(data[i].children);
        }
        json = json + "</li>";
      }
      return json + "</ul>";
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
        console.log("data");
        console.log(data);

        this.updateForm.get('titleEn').setValue(this.recordList.list[0].categoryName);
        this.updateForm.get('titleBm').setValue(this.recordList.list[1].categoryName);   
        this.updateForm.get('descEn').setValue(this.recordList.list[0].categoryDescription);
        this.updateForm.get('descBm').setValue(this.recordList.list[1].categoryDescription);  
        this.updateForm.get('parentsEn').setValue(this.recordList.list[0].parentId);    
        this.updateForm.get('parentsBm').setValue(this.recordList.list[1].parentId);  
        this.updateForm.get('imageEn').setValue(this.recordList.list[0].image.mediaId); 
        this.updateForm.get('imageBm').setValue(this.recordList.list[1].image.mediaId);       
        this.updateForm.get('ismainmenu').setValue(this.recordList.list[0].isMainMenu);   

        this.getIdEn = this.recordList.list[0].categoryId;
        this.getIdBm = this.recordList.list[1].categoryId;
        this.getRefCode = this.recordList.list[0].refCode;
        this.catCode = this.recordList.list[0].categoryCode;

        this.checkReqValues();
      }).bind(this));
      this.loading = false;
    },
    error => {

      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      this.loading = false;
      console.log(error);      
    });
  }

  getImageList(){
    this.loading = true;
    this.commonservice.readProtected('media/category/name/Article')
     .subscribe(resCatData => {

      this.commonservice.errorHandling(resCatData, (function(){

        this.imageData = resCatData['list'];       
        console.log(this.imageData);

      }).bind(this));
      this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      this.loading = false;
      console.log(error);
    });
  }

  submit(formValues: any) {
    let urlEdit = this.router.url.split('/')[2];
    let parentValEn: any;
    let parentValBm: any;

    let valImg: any;
    let body: any;

    //predefined super parent id;
    if(formValues.parentsEn == null){
      parentValEn = -1;
      parentValBm = -2;
    }

    else {
      parentValEn = formValues.parentsEn;
      parentValBm = formValues.parentsBm;
    }

    if(formValues.ismainmenu == null){
      formValues.ismainmenu = false;
    }

    if(formValues.imageEn == null){
      valImg = null;
    }

    else{
      valImg = { "mediaId": null };
    }

    // add form
    if(urlEdit === 'add'){

      body = [
        {
        
          "categoryName": null,
          "categoryDescription":null,
          "parentId":null,
          "isMainMenu": false,
          "image": valImg,
          "language": {
              "languageId": 1
          },
          "isActiveFlag":false
        },{
          "categoryName": null,
          "categoryDescription":null,
          "parentId":null,
          "isMainMenu": false,
          "image": valImg,
          "language": {
              "languageId": 2
          },
          "isActiveFlag":false
        }
      ]         

   
      body[0].categoryName = formValues.titleEn;
      body[0].categoryDescription = formValues.descEn;
      body[0].parentId = parentValEn.parentEn;
      body[0].isMainMenu = formValues.ismainmenu;      

      body[1].categoryName = formValues.titleBm;
      body[1].categoryDescription = formValues.descBm;
      body[1].parentId = parentValEn.parentBm;
      body[1].isMainMenu = formValues.ismainmenu;

      if(formValues.imageBm != null){
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
          console.log(error);
      });
    }

    // update form
    else{
      //  
      
      body = [
        {
        
          "categoryId": this.getIdEn,
          "categoryName": null,
          "categoryDescription":null,
          "categoryCode": this.catCode,
          "parentId":null,
          "isMainMenu": false,
          "image": valImg,
          "language": {
              "languageId": 1
          },
          "isActiveFlag":false
        },{
          "categoryId": this.getIdBm,
          "categoryName": null,
          "categoryDescription":null,
          "categoryCode": this.catCode,
          "parentId":null,
          "isMainMenu": false,
          "image": valImg,
          "language": {
              "languageId": 2
          },
          "isActiveFlag":false
        }
      ]    

      body[0].categoryName = formValues.titleEn;
      body[0].categoryDescription = formValues.descEn;
      body[0].parentId = formValues.parentsEn;
      body[0].isMainMenu = formValues.ismainmenu;
      //body[0].image.mediaId = formValues.imageEn;

      body[1].categoryName = formValues.titleBm;
      body[1].categoryDescription = formValues.descBm;
      body[1].parentId = formValues.parentsBm;
      body[1].isMainMenu = formValues.ismainmenu;
      //body[1].image.mediaId = formValues.imageBm;      

      if(formValues.imageBm != null){
        body[0].image.mediaId = formValues.imageEn;      
        body[1].image.mediaId = formValues.imageBm;
      }

      console.log("UPDATE: ");
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
          console.log(error);
      });
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

  myFunction() {
    this.updateForm.reset();
    this.checkReqValues();   
  }

  back(){
    this.router.navigate(['category']);
  }

}
