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
  public lang: any;
  public urlEdit = "";

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  public commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService,
  private dialogsService: DialogsService) { 
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
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
        // alert(this.languageId + ',' + this.localeVal)
      }
      // if(this.navservice.flagLang){
      //   this.commonservice.getModuleId();
      // }

    });
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

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
    this.commonservice.readProtectedById('inbox/', _getRefID, this.languageId)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
        this.recordList = data;

        

        this.updateForm.get('subject').setValue(this.recordList.object.subject);
        this.updateForm.get('content').setValue(this.recordList.object.content);

        if(this.commonservice.isWrite==true && this.urlEdit != 'add'){
          this.subject.disable();
          this.content.disable();
        }
         

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
    this.router.navigate(['inbox']);
  }

  submit(formValues: any) {
    
    this.urlEdit = this.router.url.split('/')[2];

    // add form
    if(this.urlEdit === 'add'){

      let body = 
        {
          "subject": null,
          "content": null
          // "placeholder": "testing"
        }
        
 
      body.subject = formValues.subject;
      body.content = formValues.content;


      
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


