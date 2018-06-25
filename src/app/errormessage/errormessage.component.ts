import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../nav/nav.service';

@Component({
  selector: 'app-errormessage',
  templateUrl: './errormessage.component.html',
  styleUrls: ['./errormessage.component.css']
})
export class ErrormessageComponent implements OnInit, OnDestroy {
  
  public loading = false;
  ErrorMsgData: Object;
  dataUrl: any;
  date = new Date();
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  refMessageCode:any;
  msgIdEn:any;
  msgIdBm:any;

  msgCodeEn: FormControl
  msgCodeBm: FormControl
  descEn: FormControl
  descBm: FormControl
  resetMsg = this.resetMsg;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  lang:any;
  public urlEdit: any;
  
  private subscriptionLang: ISubscription;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
    private translate: TranslateService,
    private navservice: NavService,
    private router: Router,
    private toastr: ToastrService
  ) { 

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
        // alert(this.languageId + ',' + this.localeVal)
      }
        if(this.navservice.flagLang){
          this.commonservice.getModuleId();
        }

    });
    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.urlEdit = this.router.url.split('/')[2];
    this.commonservice.getModuleId();

    this.msgCodeEn = new FormControl()
    this.msgCodeBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()

    this.updateForm = new FormGroup({
      msgCodeEn: this.msgCodeEn,
      descEn: this.descEn,
      msgCodeBm: this.msgCodeBm,
      descBm: this.descBm,
    });

    if(this.urlEdit == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(this.urlEdit);
    }

    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

 
  back(){
    this.router.navigate(['errormessage']);
  }

  // get, add, update, delete
  getRow(row) {

    this.loading = true;
    // Update ErrorMsg Service
    this.commonservice.readProtectedById('errormessage/code/', row, this.languageId)
    .subscribe(
      Rdata => {

        this.commonservice.errorHandling(Rdata, (function(){

          this.ErrorMsgData = Rdata;
          console.log(this.ErrorMsgData)
          let dataEn = this.ErrorMsgData['resourceList'][0];
          let dataBm = this.ErrorMsgData['resourceList'][1];

          // populate data
          this.updateForm.get('msgCodeEn').setValue(dataEn.messagesCode);
          this.updateForm.get('descEn').setValue(dataEn.messagesDescription);
          this.updateForm.get('msgCodeBm').setValue(dataBm.messagesCode);
          this.updateForm.get('descBm').setValue(dataBm.messagesDescription);
          this.refMessageCode = dataEn.refMessageCode;
          this.msgIdEn = dataEn.messagesId;
          this.msgIdBm = dataBm.messagesId;

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

  checkReqValues() {

    let msgCodeEn = "msgCodeEn";
    let descEn = "descEn";
    let msgCodeBm = "msgCodeBm";
    let descBm = "descBm";

    let reqVal: any = [msgCodeEn, descEn, msgCodeBm, descBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  copyValue(type) {
    let elemOne = this.updateForm.get('msgCodeEn');
    let elemTwo = this.updateForm.get('msgCodeBm');

    if(type == 1)
      elemTwo.setValue(elemOne.value)
    else
      elemOne.setValue(elemTwo.value)
      
    this.stripspaces(elemOne)
    this.stripspaces(elemTwo)

  }

  stripspaces(input)
  {
    input.value = input.value.replace(/\s/gi,"");
    return true;
  }

  myFunction() {

    this.updateForm.reset();
    this.checkReqValues(); 
  }

  deleteRow(refCode) {
    this.loading = true;

    this.commonservice.delete(refCode,'errormessage/delete/').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getRecordList(this.pageCount, this.pageSize);
        }).bind(this));   
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
        console.log(error);
      });
  }
  
  updateErrorMsg(formValues: any) {
    
    if(!this.isEdit) {

      let body = [
        {
          "messagesId": null,
          "messagesCode": null,
          "messagesDescription": null,
          "refMessageCode": null,
          "language": {
            "languageId": 1
          }
        }, 
        {
          "messagesId": null,
          "messagesCode": null,
          "messagesDescription": null,
          "refMessageCode": null,
          "language": {
            "languageId": 2
          }
        }
      ];
      

      body[0].messagesCode = formValues.msgCodeEn;
      body[0].messagesDescription = formValues.descEn;

      body[1].messagesCode = formValues.msgCodeBm;
      body[1].messagesDescription = formValues.descBm;

      console.log(body)
      this.loading = true;

      // Add ErrorMsg Service
      this.commonservice.create(body,'errormessage').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), ''); 
            this.router.navigate(['errormessage']);
          }).bind(this));   
          this.loading = false;
        },
        error => {

          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          console.log(error);
        });

    } 
    else {
      
      let body = [
        {
          "messagesId": null,
          "messagesCode": null,
          "messagesDescription": null,
          "refMessageCode": null,
          "language": {
            "languageId": 1
          }
        }, 
        {
          "messagesId": null,
          "messagesCode": null,
          "messagesDescription": null,
          "refMessageCode": null,
          "language": {
            "languageId": 2
          }
        }
      ];
        
      body[0].refMessageCode = this.refMessageCode;
      body[0].messagesId = this.msgIdEn;
      body[0].messagesCode = formValues.msgCodeEn;
      body[0].messagesDescription = formValues.descEn;
      
      body[1].refMessageCode = this.refMessageCode;
      body[1].messagesId = this.msgIdBm;
      body[1].messagesCode = formValues.msgCodeBm;
      body[1].messagesDescription = formValues.descBm;

      console.log(body);
      this.loading = true;

      // Update ErrorMsg Service
      this.commonservice.update(body,'errormessage/multiple/update').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['errormessage']);
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

}
