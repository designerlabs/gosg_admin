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

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  updateForm: FormGroup;
  
  public titleEn: FormControl;  
  public titleBm: FormControl;
  public descEn: FormControl;  
  public descBm: FormControl;
  public parentsEn: FormControl;
  public parentsBm: FormControl;
  public ismainmenu: FormControl;

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
  public out: any[];


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
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              //this.getUsersData(this.pageCount, this.pageSize);
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
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

    this.updateForm = new FormGroup({   

      titleEn: this.titleEn,
      titleBm: this.titleBm,
      descEn: this.descEn,    
      descBm: this.descBm,
      parentsEn: this.parentsEn,
      parentsBm: this.parentsBm,
      ismainmenu: this.ismainmenu   
    });

    this.getCategory();

    let urlEdit = this.router.url.split('/')[2];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }
  }

  selectedCat(e, val){

    console.log(e);
    this.getCatIdEn = e.value;
    this.getCatIdBm = e.value;
    let dataList = this.categoryData;
    let indexVal: any;
    let idBm: any;
    let idEn: any;

    console.log("EN: "+this.getCatIdEn+" BM: "+this.getCatIdBm+ " value: " +val);

    if(val == 1){

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[0].categoryId;
        if(indexVal == this.getCatIdEn){
          idBm = dataList[i].list[1].categoryId;
        }        
      }

      this.updateForm.get('parentsBm').setValue(idBm);  
    }
    else{

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[1].categoryId;
        if(indexVal == this.getCatIdBm){
          idEn = dataList[i].list[0].categoryId;
        }        
      }

      this.updateForm.get('parentsEn').setValue(idEn); 
    }
  }

  getCategory(){

    return this.commonservice.getCategoryList()
     .subscribe(data => {
  
      console.log("GET CATEGORY: ");
      console.log(data);
        
      this.commonservice.errorHandling(data, (function(){
          this.categoryData = data["list"];   
          console.log(this.categoryData);    
          let arrCat = [];
          let parent = [];

          for(let i=0; i<this.categoryData.length; i++){

            
            arrCat.push({id:this.categoryData[i].list[0].categoryId, 
                         parent: this.categoryData[i].list[0].parentId,
                         title: this.categoryData[i].list[0].categoryDescription});
            parent.push(this.categoryData[i].list[0].categoryId);
          }
          
          this.getNestedChildren(arrCat, parent);
          console.log(arrCat);
          console.log(this.out);
          
        }).bind(this));
      },
      error => {

        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
    });
  }

  getNestedChildren(arr, parent) {
    //var out = []
    for(var i in arr) {
        if(arr[i].parent == parent) {
            var children = this.getNestedChildren(arr, arr[i].id)

            if(children.length) {
                arr[i].children = children
            }
            this.out.push(arr[i])
        }
    }
    return this.out
  }

  getData() {

    let _getRefID = this.router.url.split('/')[2];
  
    this.dataUrl = this.appConfig.urlCategory + '/'+_getRefID + '?language=' +this.languageId;

    this.http.get(this.dataUrl)
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
      
        //this.updateForm.get('ismainmenu').setValue(this.recordList[0].enabled);    

        this.getIdEn = this.recordList.list[0].categoryId;
        this.getIdBm = this.recordList.list[1].categoryId;
        this.getRefCode = this.recordList.list[0].refCode;

        this.checkReqValues();
      }).bind(this));
    },
    error => {

      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);      
    });
  }

  submit(formValues: any) {
    let urlEdit = this.router.url.split('/')[2];
    let txt = "";

    // add form
    if(urlEdit === 'add'){

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
     
      this.commonservice.addRecordAccStatus(body).subscribe(
        data => {         
          
          let errMsg = data.statusCode.toLowerCase();

          if(errMsg == "error"){
            this.commonservice.errorResponse(data);
          }
          
          else{
            txt = "Record added successfully!"
            this.toastr.success(txt, '');  
            this.router.navigate(['category']);
          }  
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, '');    
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

      this.commonservice.updateRecordAccStatus(body).subscribe(
        data => {
          
          let errMsg = data.statusCode.toLowerCase();

          if(errMsg == "error"){
            this.commonservice.errorResponse(data);
          }
          
          else{
            txt = "Record updated successfully!"
            this.toastr.success(txt, '');  
            this.router.navigate(['category']);
          }  
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
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
