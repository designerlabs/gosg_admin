import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../../config/app.config.module';
import { CommonService } from './../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../dialogs/dialogs.service';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from './../../nav/nav.service';

@Component({
  selector: 'app-feedbacktype',
  templateUrl: './feedbacktype.component.html',
  styleUrls: ['./feedbacktype.component.css']
})

export class FeedbacktypeComponent implements OnInit, OnDestroy {

  public loading = false;
  updateForm: FormGroup;
  
  public typeEn: FormControl;  
  public typeBm: FormControl;
  public active: FormControl;

  public dataUrl: any;  
  public recordList: any;
 
  public getIdEn: any;
  public getIdBm: any;
  public getRefId: any;

  public complete: boolean;
  public languageId: any;
  public lang: any;

  private subscriptionLang: ISubscription;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private navservice: NavService,
    private translate: TranslateService,
    private dialogsService: DialogsService) {

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
        this.commonservice.getModuleId();
        this.changeLanguageAddEdit();
      }

    });
    /* LANGUAGE FUNC */ 

  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.typeEn = new FormControl();
    this.typeBm = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      typeEn: this.typeEn,
      typeBm: this.typeBm,
      active: this.active
      
    }); 

    let urlEdit = this.router.url.split('/')[3];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }

    this.commonservice.getModuleId();
    
    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }

  }

  getData() {

    let _getRefID = this.router.url.split('/')[3];  
    this.loading = true;
    this.commonservice.readPortalById('feedback/type/', _getRefID, this.languageId)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;

          this.updateForm.get('typeEn').setValue(this.recordList.feedbackTypeEntityList[1].feedbackTypeDescription);
          this.updateForm.get('typeBm').setValue(this.recordList.feedbackTypeEntityList[0].feedbackTypeDescription);        

          this.getIdEn = this.recordList.feedbackTypeEntityList[1].feedbackTypeId;
          this.getIdBm = this.recordList.feedbackTypeEntityList[0].feedbackTypeId;
          this.getRefId = this.recordList.feedbackTypeEntityList[0].feedbackTypeCode;

          this.checkReqValues();
        }).bind(this));   
        this.loading = false;
    },
    error => {

      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   

    });
  }

  submit(formValues: any) {
    let urlEdit = this.router.url.split('/')[3];
   
    // add form
    if(urlEdit === 'add'){

      let body = [
        {        
          "feedbackTypeDescription": null,
          "language": {
              "languageId": 2
          }
        },{
          "feedbackTypeDescription": null,
          "language": {
              "languageId": 1
          }
        }
      ]    

      body[0].feedbackTypeDescription = formValues.typeBm;
      body[1].feedbackTypeDescription = formValues.typeEn;
      
      this.loading = true;
      this.commonservice.create(body,'feedback/type').subscribe(
      data => {
        
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), ''); 
          this.router.navigate(['feedback/type']);
        }).bind(this));         
        this.loading = false; 
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          
      });
    }

    // update form
    else{
      let body = [
        {
          "feedbackTypeId":this.getIdBm,
          "feedbackTypeDescription": null,
          "feedbackTypeCode": this.getRefId,
          "language": {
              "languageId": 2
          }
        },{
          "feedbackTypeId":this.getIdEn,
          "feedbackTypeDescription": null,
          "feedbackTypeCode": this.getRefId,
          "language": {
              "languageId": 1
          }
        }
      ]        

      body[0].feedbackTypeDescription = formValues.typeBm;
      body[1].feedbackTypeDescription = formValues.typeEn;      

      
      
      this.loading = true;

      this.commonservice.update(body,'feedback/type').subscribe(
      data => {
        
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), ''); 
          this.router.navigate(['feedback/type']);
        }).bind(this));    
        this.loading = false;     
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          
      });
    }
    
  }

  checkReqValues() {

    let reqVal:any = ["typeEn", "typeBm"];
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

  changeLanguageAddEdit(){

    let urlEdit = this.router.url.split('/')[3];

    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
    }
    else{
      this.commonservice.pageModeChange(true);
    }
  }

  myFunction() {
    this.updateForm.reset();
    this.checkReqValues();   
  }

  back(){
    this.router.navigate(['feedback/type']);
  }
}
