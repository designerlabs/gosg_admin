import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from './../../dialogs/dialogs.service';

@Component({
  selector: 'app-footercategory',
  templateUrl: './footercategory.component.html',
  styleUrls: ['./footercategory.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FootercategoryComponent implements OnInit {

  updateForm: FormGroup;
  
  public catEng: FormControl;
  public descEng: FormControl;
  public catMy: FormControl;
  public descMy: FormControl;
  public active: FormControl;

  public dataUrl: any;  
  public recordList: any;
  public getFooterIdEng: any;
  public getFooterIdMy: any;
  public getRefCode: any;
  public complete: boolean;
  public languageId: any;
  public urlEdit: any;

  public loading = false;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService,
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
            }
          }.bind(this));
        })
      });
    });

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.commonservice.getModuleId();
    }
  }

  ngOnInit() {

    this.commonservice.getModuleId();
    
    this.catEng = new FormControl();
    this.descEng = new FormControl();
    this.catMy = new FormControl();
    this.descMy = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      catEng: this.catEng,
      catMy: this.catMy,
      descEng: this.descEng,
      descMy: this.descMy,
      active: this.active,
      
    });     
    
    this.urlEdit = this.router.url.split('/')[3];
    
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }
    
    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  getData() {

    let _getRefID = this.router.url.split('/')[3];
    // this.dataUrl = this.appConfig.urlFooterCategory + "/" + _getRefID + "?language=" + this.languageId;
    this.loading = true;

    this.commonservice.readProtectedById('footer/', _getRefID)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
        this.recordList = data;

        console.log(data);

        this.updateForm.get('catEng').setValue(this.recordList.list[0].name);
        this.updateForm.get('descEng').setValue(this.recordList.list[0].description);
        this.updateForm.get('active').setValue(this.recordList.active);

        this.updateForm.get('catMy').setValue(this.recordList.list[1].name);
        this.updateForm.get('descMy').setValue(this.recordList.list[1].description);

        this.getRefCode = this.recordList.refCode;
        this.getFooterIdEng = this.recordList.list[0].id;
        this.getFooterIdMy = this.recordList.list[1].id;

        this.checkReqValues();
      }).bind(this));   

      this.loading = false;
    },
    error => {

      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      console.log(error);   
    });
    
  }

  back(){
    this.router.navigate(['footer/footercategory']);
  }

  submit(formValues: any) {
    
    let urlEdit = this.router.url.split('/')[3];

    // add form
    if(urlEdit === 'add'){

      let body = [
        {
          "name": null,
          "description": null,
          "enabled": false,
          "language": {
              "languageId": null
          }
        },
        {
          "name": null,
          "description": null,
          "enabled": false,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].name = formValues.catEng;
      body[0].description = formValues.descEng;
      body[0].enabled = formValues.active;
      body[0].language.languageId = 1;

      body[1].name = formValues.catMy;
      body[1].description = formValues.descMy;
      body[1].enabled = formValues.active;
      body[1].language.languageId = 2;

      console.log(body);
      this.loading = true;
      this.commonservice.create(body,'footer').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['footer/footercategory']);

          }).bind(this));   
          this.loading = false;
        },
        error => {

          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          console.log(error);
      });
    }

    // update form
    else{

      let body = [
        {
          "id": null,
          "name": null,
          "description": null,
          "enabled": false,
          "footerCode": null,
          "language": {
              "languageId": null
          }
        },
        {
          "id": null,
          "name": null,
          "description": null,
          "enabled": false,
          "footerCode": null,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].id = this.getFooterIdEng;
      body[0].name = formValues.catEng;
      body[0].description = formValues.descEng;
      body[0].enabled = formValues.active;
      body[0].footerCode = this.getRefCode;
      body[0].language.languageId = 1;

      body[1].id = this.getFooterIdMy;
      body[1].name = formValues.catMy;
      body[1].description = formValues.descMy;
      body[1].enabled = formValues.active;
      body[1].footerCode = this.getRefCode;
      body[1].language.languageId = 2;

      console.log(body);
      this.loading = true;

      this.commonservice.update(body, 'footer').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['footer/footercategory']);
            
          }).bind(this));   
          this.loading = false;
        },
        error => {

          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          console.log(error);
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["catEng", "catMy", "descEng", "descMy"];
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

}


