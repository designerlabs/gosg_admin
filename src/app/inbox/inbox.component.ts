// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-inbox',
//   templateUrl: './inbox.component.html',
//   styleUrls: ['./inbox.component.css']
// })
// export class InboxComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


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
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class InboxComponent implements OnInit {

  public loading = false;
  updateForm: FormGroup;
  
  public subject: FormControl;
  public content: FormControl;
  // public faqAEng: FormControl;
  // public faqAMy: FormControl;
  // public active: FormControl;

  public dataUrl: any;  
  public recordList: any;

  // public getFaqIdEng: any;
  // public getFaqIdMy: any;
  // public getFaqCodeEng: any;
  // public getFaqCodeMy: any;
  // public getFaqActiveFlag: any;

  complete: boolean;
  public languageId: any;
  public urlEdit = "";

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
    this.commonservice.getModuleId();
    this.subject = new FormControl();
    this.content = new FormControl();
    // this.faqAEng = new FormControl();
    // this.faqAMy = new FormControl();
    // this.active = new FormControl();

    this.updateForm = new FormGroup({   

      subject: this.subject,
      content: this.content,
      // faqAEng: this.faqAEng,
      // faqAMy: this.faqAMy,
      // active: this.active,      
    });     
    
    this.urlEdit = this.router.url.split('/')[2];
    
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      // this.updateForm.get('active').setValue(true);
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
    this.commonservice.readProtectedById('inbox/', _getRefID)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
        this.recordList = data;

        console.log(data);

        this.updateForm.get('subject').setValue(this.recordList.object.subject);
        this.updateForm.get('content').setValue(this.recordList.object.content);
        // this.updateForm.get('active').setValue(this.recordList.faqList[0].faqActiveFlag);

        // this.updateForm.get('faqQMy').setValue(this.recordList.faqList[1].facQuestion);
        // this.updateForm.get('faqAMy').setValue(this.recordList.faqList[1].facAnswer);
        
        // this.getFaqCodeEng = this.recordList.faqList[0].faqCode;
        // this.getFaqIdEng = this.recordList.faqList[0].faqId;
        
        // this.getFaqCodeMy = this.recordList.faqList[1].faqCode;
        // this.getFaqIdMy = this.recordList.faqList[1].faqId;

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
    this.router.navigate(['inbox']);
  }

  submit(formValues: any) {
    
    this.urlEdit = this.router.url.split('/')[2];

    // add form
    if(this.urlEdit === 'add'){

      let body = 
        {
          "subject": null,
          "content": null,
          "placeholder": "testing"
        }
        
 
      body.subject = formValues.subject;
      body.content = formValues.content;


      console.log(body);
      this.loading = true;

      this.commonservice.create(body, 'inbox').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['inbox']);
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

  changeLanguageAddEdit(){
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);  
    }
    else{
      this.commonservice.pageModeChange(true);      
    }
  }

  checkReqValues() {

    let reqVal:any = ["subject", "content"];
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


