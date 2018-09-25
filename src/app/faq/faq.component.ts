import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../dialogs/dialogs.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FaqComponent implements OnInit {

  public loading = false;
  updateForm: FormGroup;
  
  public faqQEng: FormControl;
  public faqQMy: FormControl;
  public faqAEng: FormControl;
  public faqAMy: FormControl;
  public active: FormControl;
  seqEng: FormControl
  seqMy: FormControl

  public dataUrl: any;  
  public recordList: any;

  public getFaqIdEng: any;
  public getFaqIdMy: any;
  public getFaqCodeEng: any;
  public getFaqCodeMy: any;
  public getFaqActiveFlag: any;

  complete: boolean;
  public languageId: any;
  public urlEdit = "";

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  public commonservice: CommonService, private router: Router, private toastr: ToastrService,
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
              this.changeLanguageAddEdit();
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

    this.commonservice.getInitialMessage();
    this.commonservice.getModuleId();
    this.faqQEng = new FormControl();
    this.faqQMy = new FormControl();
    this.faqAEng = new FormControl();
    this.faqAMy = new FormControl();
    this.active = new FormControl();
    this.seqEng = new FormControl();
    this.seqMy = new FormControl();

    this.updateForm = new FormGroup({   

      faqQEng: this.faqQEng,
      faqQMy: this.faqQMy,
      faqAEng: this.faqAEng,
      faqAMy: this.faqAMy,
      active: this.active,      
      seqEng: this.seqEng,
      seqMy: this.seqMy
    });     
    
    this.urlEdit = this.router.url.split('/')[2];
    
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

    let _getRefID = this.router.url.split('/')[2];
    this.loading = true;
    this.commonservice.readProtectedById('faq/code/', _getRefID, this.languageId)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
        this.recordList = data;

        

        this.updateForm.get('faqQEng').setValue(this.recordList.faqList[0].faqQuestion);
        this.updateForm.get('faqAEng').setValue(this.recordList.faqList[0].faqAnswer);
        this.updateForm.get('active').setValue(this.recordList.faqList[0].faqActiveFlag);

        this.updateForm.get('faqQMy').setValue(this.recordList.faqList[1].faqQuestion);
        this.updateForm.get('faqAMy').setValue(this.recordList.faqList[1].faqAnswer);

        let getObjKeys = Object.keys(this.recordList.faqList[0]);
        let valMT = getObjKeys.filter(fmt => fmt === "faqSort");

        if(valMT.length > 0){
          this.updateForm.get('seqEng').setValue(this.recordList.faqList[0].faqSort);
          this.updateForm.get('seqMy').setValue(this.recordList.faqList[1].faqSort);
        }
        
        this.getFaqCodeEng = this.recordList.faqList[0].faqCode;
        this.getFaqIdEng = this.recordList.faqList[0].faqId;
        
        this.getFaqCodeMy = this.recordList.faqList[1].faqCode;
        this.getFaqIdMy = this.recordList.faqList[1].faqId;

        this.checkReqValues();

      }).bind(this));   
      this.loading = false;
    },
    error => {

      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      
    });
  }

  back(){
    this.router.navigate(['faq']);
  }

  submit(formValues: any) {
    
    this.urlEdit = this.router.url.split('/')[2];

    // add form
    if(this.urlEdit === 'add'){

      let body = [
        {
          "faqActiveFlag": false,
          "faqQuestion": null,
          "faqAnswer": null,
          "faqCode": null,
          "faqSort": null,
          "language": {
              "languageId": null
          }
        },
        {
          "faqActiveFlag": false,
          "faqQuestion": null,
          "faqAnswer": null,
          "faqCode": null,
          "faqSort": null,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].faqActiveFlag = formValues.active;
      body[0].faqQuestion = formValues.faqQEng;
      body[0].faqAnswer = formValues.faqAEng;
      body[0].faqCode = this.getFaqCodeEng;
      body[0].faqSort = formValues.seqEng;
      body[0].language.languageId = 1;

      body[1].faqActiveFlag = formValues.active;
      body[1].faqQuestion = formValues.faqQMy;
      body[1].faqAnswer = formValues.faqAMy;
      body[1].faqCode = this.getFaqCodeMy;
      body[1].faqSort = formValues.seqMy;
      body[1].language.languageId = 2;

      
      this.loading = true;

      this.commonservice.create(body, 'faq').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['faq']);
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
          "faqId": null,
          "faqCode": null,
          "faqActiveFlag": false,
          "faqQuestion": null,
          "faqAnswer": null,
          "faqSort": null,
          "language": {
              "languageId": null
          }
        },
        {
          "faqId": null,
          "faqCode": null,
          "faqActiveFlag": false,
          "faqQuestion": null,
          "faqAnswer": null,
          "faqSort": null,
          "language": {
              "languageId": null
          }
        }
      ]    

      body[0].faqId = this.getFaqIdEng;
      body[0].faqQuestion = formValues.faqQEng;
      body[0].faqAnswer = formValues.faqAEng;
      body[0].faqCode = this.getFaqCodeMy;
      body[0].faqSort = formValues.seqEng;
      body[0].language.languageId = 1;
      body[0].faqActiveFlag = formValues.active;

      body[1].faqId = this.getFaqIdMy;
      body[1].faqQuestion = formValues.faqQMy; 
      body[1].faqAnswer = formValues.faqAMy; 
      body[1].faqCode = this.getFaqCodeEng; 
      body[1].faqSort = formValues.seqMy;
      body[1].language.languageId = 2;
      body[1].faqActiveFlag = formValues.active;

      
      this.loading = true;

      this.commonservice.update(body,'faq').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['faq']);
          }).bind(this));   
          this.loading = false;
        },
        error => {

          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          
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

    let reqVal:any = ["faqQEng", "faqQMy", "faqAEng", "faqAMy"];
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

}

