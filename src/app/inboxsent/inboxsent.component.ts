// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-inboxsent',
//   templateUrl: './inboxsent.component.html',
//   styleUrls: ['./inboxsent.component.css']
// })
// export class InboxsentComponent implements OnInit {

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
  selector: 'app-inboxsent',
  templateUrl: './inboxsent.component.html',
  styleUrls: ['./inboxsent.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class InboxsentComponent implements OnInit {

  public loading = false;
  updateForm: FormGroup;
  
  public subject: FormControl;
  public content: FormControl;
  
  emailFld: FormControl;

  public dataUrl: any;  
  public recordList: any;

  complete: boolean;
  public languageId: any;
  public urlEdit = "";

  
  showEmail: boolean;
  searchUserResult: Object;
  checkStatus: any;
  isActive: boolean;
  isActiveList: boolean;
  userId: any;

  public emailList: any;
  public emailData: any;
  public emailKeyword: any;
  idArr = [];


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
    this.emailFld = new FormControl();
    this.subject = new FormControl();
    this.content = new FormControl();
    this.emailList = new FormControl();
    this.emailKeyword = new FormControl();
    this.isActive = true;
    this.isActiveList = false;

    this.updateForm = new FormGroup({   
      emailFld: this.emailFld,
      subject: this.subject,
      content: this.content,
      emailList: this.emailList,
      emailKeyword: this.emailKeyword,
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

  getEmailList(e){
    console.log(e);
    if(e != "" && e != null && e.length != null && e.length >= 3) {
    this.loading = true;
    return this.http.get(this.appConfig.urlAdminUserFind+'/findByEmail?email='+e)
     .subscribe(resCatData => {
        this.emailData = resCatData['userList'];   
        this.loading = false;    
      },
      Error => {
        this.loading = false;  
        console.log('Error in Footer');
     });
    }
  }

  

  getSearchData(keyword){
    this.isActive = true;
    this.isActiveList = true;
    this.loading = true;
    if(!keyword.value){
      keyword == '-';
    }
    if(keyword.value != null){
      var splitArr = keyword.value.split("; ");
      var newKeyword = splitArr[splitArr.length-1];
      // var str = keyword.value;     
      // var n = str.indexOf(";");
      // var str2 = str.substring(n+2, str.length);

      this.http.get(this.appConfig.urlAdminUserFind+'/findByEmail?email='+newKeyword).subscribe(data => {

        this.commonservice.errorHandling(data, (function(){
          
          this.searchUserResult = data['userList'];
          this.checkStatus = data['statusCode'];
  
        }).bind(this));
  
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');     
        this.loading = false;     
      });
    }
    
  }

  getValue(type, val, usrId){
    // console.log(e);
    event.preventDefault();
    this.userId = usrId;
    this.isActive = false;
    this.isActiveList = false;
    this.searchUserResult = [''];
    // if(val !=null){
    //   val = "";
    // }
    var joinText = "";
    var splitArr2 = this.emailFld.value.split("; ");
    for(var i=0; i<splitArr2.length-1; i++){
        joinText += splitArr2[i] + "; ";
    }

    let valAll = joinText + val + '; ';
    // let valAll = val + '; ';
    // let idArr = [];
    this.idArr.push(usrId);

    if(type == 'email'){
      this.updateForm.get('emailFld').setValue(valAll);
    }else{
      this.updateForm.get('icFld').setValue(val);
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
    this.router.navigate(['inboxsent']);
  }

  submit(formValues: any) {
    
    this.urlEdit = this.router.url.split('/')[2];

    // add form
    if(this.urlEdit === 'add'){

      let body = 
        {
          "subject": null,
          "content": null,
          "toUser": null
        }
        
 
      body.subject = formValues.subject;
      body.content = formValues.content;
      body.toUser = this.idArr;


      console.log(body);
      this.loading = true;

      this.commonservice.create(body, 'inbox').subscribe( //inbox/toUser
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['inboxsent']);
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

    let reqVal:any = ["subject", "content", "emailFld"];
    let nullPointers:any = [];
    this.isActive = true;
    this.isActiveList = false;
    this.showEmail = true;
    this.searchUserResult = [''];

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
