import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../dialogs/dialogs.service';
import { HtmlParser } from '@angular/compiler';
import { NavService } from '../nav/nav.service';
declare var jquery:any;
declare var $ :any;

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
  input: HTMLElement;
  emailFld: FormControl;
  public recordList: any;

  complete: boolean;
  public languageId: any;
  public urlEdit = "";

  searchUserResult: Object;
  userId: any;

  public emailList: any;
  public lang: any;
  idArr = [];

  // var el = `<a href="#" onClick="alert(test delete);">[X]</a>`;


  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  public commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService,
  private navservice: NavService,
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
        if(this.navservice.flagLang){
          this.commonservice.getModuleId();
        }

    });
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.commonservice.getModuleId();
    this.emailFld = new FormControl();
    this.subject = new FormControl();
    this.content = new FormControl();
    this.emailList = new FormControl();

    this.updateForm = new FormGroup({   
      emailFld: this.emailFld,
      subject: this.subject,
      content: this.content,
      emailList: this.emailList,
      // idArr : this.idArr,
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

  getSearchData(keyword){
    // this.isActive = true;
    // this.isActiveList = true;
    this.loading = true;
    if(!keyword.value){
      keyword == '-';
    }
    if(keyword.value != null){
      var splitArr = keyword.value.split("; ");
      var newKeyword = splitArr[splitArr.length-1];
      

      this.http.get(this.appConfig.urlAdminUserFind+'/findByEmail?email='+newKeyword).subscribe(data => {

        this.commonservice.errorHandling(data, (function(){
          
          this.searchUserResult = data['userList'];
  
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
    // console.log(e);a
    event.preventDefault();
    let span = document.createElement("span");
    let spanName = document.createElement("span");
    let spanclose = document.createElement("span");
    let nameNode = document.createTextNode(val); 
    spanName.appendChild(nameNode);
    spanclose.setAttribute("class", "fa fa-times");
    span.setAttribute("usrId", usrId);
    span.setAttribute("class", "emailList");
 
    span.appendChild(spanName);
    span.appendChild(spanclose);
    
    document.getElementById("myList").appendChild(span); 
    document.getElementById("myList").removeChild
    let inx = this.idArr.length;
    let element: HTMLElement = document.getElementsByClassName('emailList')[inx] as HTMLElement;
    // element.click(this.btnClose());
    element.addEventListener( 'click', function( e ){

      $("#myList div:nth(1)").attr('usrId');
      let le =  $("#myList .emailList").filter(function(inx, val){
          return $(this).attr('usrid') == usrId;
      });

    
      let remInx = $("#myList .emailList").index(le);
      $("#myList .emailList")[remInx].remove();
      this.idArr.splice(remInx,1);

    }.bind(this));


    // this.userId = usrId;
    // this.isActive = false;
    // this.isActiveList = false;
    this.searchUserResult = [];
    // let a = {
    //   "userId":usrId
    // }

    this.idArr.push(usrId);
    // this.idArr.push(usrId);
    this.updateForm.get('emailFld').setValue("");

    // let placeholder =+ val;

    
  }

  getData() {

    let _getRefID = this.router.url.split('/')[2];
    this.loading = true;
    this.commonservice.readProtectedById('inbox/', _getRefID, this.languageId)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
        this.recordList = data;

        console.log(data);
        
        this.updateForm.get('emailFld').setValue(this.recordList.object.placeholder);
        this.updateForm.get('subject').setValue(this.recordList.object.subject);
        this.updateForm.get('content').setValue(this.recordList.object.content);

        if(this.commonservice.isWrite==true && this.urlEdit != 'add'){
          this.emailFld.disable();
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
          "recipient": null
        }
        
 
      body.subject = formValues.subject;
      body.content = formValues.content;
      body.recipient = this.idArr;


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

    let reqVal:any = ["subject", "content"];
    let nullPointers:any = [];
    this.searchUserResult = [];

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
    this.idArr =[];
    $("#myList").empty();
    this.updateForm.reset();
    this.checkReqValues(); 
  }

}
