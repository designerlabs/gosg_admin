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
  selector: 'app-categorymanagement',
  templateUrl: './categorymanagement.component.html',
  styleUrls: ['./categorymanagement.component.css']
})
export class CategorymanagementComponent implements OnInit {

  updateForm: FormGroup;
  
  public titleEn: FormControl;  
  public titleBm: FormControl;
  public descEn: FormControl;  
  public descBm: FormControl;
  public parentsEn: FormControl;
  public parentsBm: FormControl;
  public active: FormControl;
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
    this.active = new FormControl();
    this.ismainmenu = new FormControl();

    this.updateForm = new FormGroup({   

      titleEn: this.titleEn,
      titleBm: this.titleBm,
      descEn: this.descEn,    
      descBm: this.descBm,
      parentsEn: this.parentsEn,
      parentsBm: this.parentsBm,
      active: this.active,
      ismainmenu: this.ismainmenu   
    });

    this.getCategory();

    let urlEdit = this.router.url.split('/')[2];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true)
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }
  }

  selectedCat(e){
    console.log(e);
    this.getCatIdEn = e.value.list[0].id;
    this.getCatIdBm = e.value.list[1].id;

    console.log("EN: "+this.getCatIdEn+" BM: "+this.getCatIdBm);
    this.updateForm.get('parentsBm').setValue(parseInt(this.getCatIdBm));  
  }

  getCategory(){

    let txt = "";

    return this.commonservice.getFooterCategoryList()
     .subscribe(data => {
        
        this.categoryData = data;   
        console.log(this.categoryData);         
      },

      Error => {

        txt = "Server is down."
        this.toastr.error(txt, '');  
        console.log(Error);
    });
  }

  getData() {

    let _getRefID = this.router.url.split('/')[2];
  
    this.dataUrl = this.appConfig.urlAccountStatus + '/code/'+_getRefID + '?language=' +this.languageId;

    this.http.get(this.dataUrl)
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
            this.router.navigate(['categorymanagement']);
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

      this.commonservice.updateRecordAccStatus(body).subscribe(
        data => {
          
          let errMsg = data.statusCode.toLowerCase();

          if(errMsg == "error"){
            this.commonservice.errorResponse(data);
          }
          
          else{
            txt = "Record updated successfully!"
            this.toastr.success(txt, '');  
            this.router.navigate(['categorymanagement']);
          }  
        },
        error => {

          txt = "Server is down."
          this.toastr.error(txt, '');  
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
    this.router.navigate(['categorymanagement']);
  }

}
