import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../../config/app.config.module';
import { CommonService } from './../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../dialogs/dialogs.service';

@Component({
  selector: 'app-pollquestion',
  templateUrl: './pollquestion.component.html',
  styleUrls: ['./pollquestion.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PollquestionComponent implements OnInit {

  updateForm: FormGroup;
  
  public pollEng: FormControl;  
  public pollMalay: FormControl;

  public opt1En: FormControl;
  public opt2En: FormControl;
  public opt3En: FormControl;
  public opt4En: FormControl;
  public opt5En: FormControl;

  public opt1Bm: FormControl;
  public opt2Bm: FormControl;
  public opt3Bm: FormControl;
  public opt4Bm: FormControl;
  public opt5Bm: FormControl;

  public active: FormControl

  public res1En: any;
  public res2En: any;
  public res3En: any;
  public res4En: any;
  public res5En: any;

  public res1Bm: any;
  public res2Bm: any;
  public res3Bm: any;
  public res4Bm: any;
  public res5Bm: any;

  public dataUrl: any;  
  public recordList: any;

  public getIdEn: any;
  public getIdBm: any;
  public getRefId: any;

  public complete: boolean;
  public languageId: any;
  public loading = false;
  public urlEdit = "";

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
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
              //this.getUsersData(this.pageCount, this.pageSize);
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.commonservice.getModuleId();
      //this.getData();
    }
    /* LANGUAGE FUNC */
  }

  ngOnInit() {
  
    this.pollEng = new FormControl();
    this.pollMalay = new FormControl();

    this.opt1En = new FormControl();
    this.opt2En = new FormControl();
    this.opt3En = new FormControl();
    this.opt4En = new FormControl();
    this.opt5En = new FormControl();

    this.opt1Bm = new FormControl();
    this.opt2Bm = new FormControl();
    this.opt3Bm = new FormControl();
    this.opt4Bm = new FormControl();
    this.opt5Bm = new FormControl();

    this.active = new FormControl();

    this.updateForm = new FormGroup({   
      pollEng: this.pollEng,
      pollMalay: this.pollMalay,

      opt1En: this.opt1En,
      opt2En: this.opt2En,
      opt3En: this.opt3En,
      opt4En: this.opt4En,
      opt5En: this.opt5En,

      opt1Bm: this.opt1Bm,
      opt2Bm: this.opt2Bm,
      opt3Bm: this.opt3Bm,
      opt4Bm: this.opt4Bm,
      opt5Bm: this.opt5Bm,
      active: this.active
      
    });     
    
    this.urlEdit = this.router.url.split('/')[3];
    
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true)
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
  
    // this.dataUrl = this.appConfig.urlPoll + '/question/same/' + _getRefID + '?language=' +this.languageId;

    this.loading = true;
    this.commonservice.readProtectedById('polls/question/same/', _getRefID)
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){
        
        this.recordList = data;

        this.updateForm.get('pollEng').setValue(this.recordList.pollQuestionListDto[0].questionTitle);
        this.updateForm.get('pollMalay').setValue(this.recordList.pollQuestionListDto[1].questionTitle); 
        this.updateForm.get('opt1En').setValue(this.recordList.pollQuestionListDto[0].answer[0].answer);    
        this.updateForm.get('opt2En').setValue(this.recordList.pollQuestionListDto[0].answer[1].answer);    
        this.updateForm.get('opt3En').setValue(this.recordList.pollQuestionListDto[0].answer[2].answer);    
        this.updateForm.get('opt4En').setValue(this.recordList.pollQuestionListDto[0].answer[3].answer);    
        this.updateForm.get('opt5En').setValue(this.recordList.pollQuestionListDto[0].answer[4].answer);    
        this.updateForm.get('opt1Bm').setValue(this.recordList.pollQuestionListDto[1].answer[0].answer);    
        this.updateForm.get('opt2Bm').setValue(this.recordList.pollQuestionListDto[1].answer[1].answer);    
        this.updateForm.get('opt3Bm').setValue(this.recordList.pollQuestionListDto[1].answer[2].answer);    
        this.updateForm.get('opt4Bm').setValue(this.recordList.pollQuestionListDto[1].answer[3].answer);    
        this.updateForm.get('opt5Bm').setValue(this.recordList.pollQuestionListDto[1].answer[4].answer);
        this.updateForm.get('active').setValue(this.recordList.pollQuestionListDto[0].pollsActiveFlag);

        this.getIdEn = this.recordList.pollQuestionListDto[0].questionId;
        this.getIdBm = this.recordList.pollQuestionListDto[1].questionId;
        this.getRefId = this.recordList.pollQuestionListDto[0].pollReference;

        this.res1En = this.recordList.pollQuestionListDto[0].answer[0].result;
        this.res2En = this.recordList.pollQuestionListDto[0].answer[1].result;
        this.res3En = this.recordList.pollQuestionListDto[0].answer[2].result;
        this.res4En = this.recordList.pollQuestionListDto[0].answer[3].result;
        this.res5En = this.recordList.pollQuestionListDto[0].answer[4].result;

        this.res1Bm = this.recordList.pollQuestionListDto[1].answer[0].result;
        this.res2Bm = this.recordList.pollQuestionListDto[1].answer[1].result;
        this.res3Bm = this.recordList.pollQuestionListDto[1].answer[2].result;
        this.res4Bm = this.recordList.pollQuestionListDto[1].answer[3].result;
        this.res5Bm = this.recordList.pollQuestionListDto[1].answer[4].result;

        

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
    
    this.urlEdit = this.router.url.split('/')[3];
    let txt = "";

    // add form
    if(this.urlEdit === 'add'){

      let body = [
        {
          "pollsQuestion": null,
          "pollsAnswer1": null,
          "pollsAnswer2": null,
          "pollsAnswer3": null,
          "pollsAnswer4": null,
          "pollsAnswer5": null,
          "pollsActiveFlag": false,
          "pollsResult1": null,
          "pollsResult2": null,
          "pollsResult3": null,
          "pollsResult4": null,
          "pollsResult5": null,
          "language": {
              "languageId": null
          }
        },{
          "pollsQuestion": null,
          "pollsAnswer1": null,
          "pollsAnswer2": null,
          "pollsAnswer3": null,
          "pollsAnswer4": null,
          "pollsAnswer5": null,
          "pollsActiveFlag": false,
          "pollsResult1": null,
          "pollsResult2": null,
          "pollsResult3": null,
          "pollsResult4": null,
          "pollsResult5": null,
          "language": {
              "languageId": null
          }
        }
      ]    
      
      body[0].pollsQuestion = formValues.pollEng;
      body[0].pollsAnswer1 = formValues.opt1En;
      body[0].pollsAnswer2 = formValues.opt2En;
      body[0].pollsAnswer3 = formValues.opt3En;
      body[0].pollsAnswer4 = formValues.opt4En;
      body[0].pollsAnswer5 = formValues.opt5En;
      body[0].pollsActiveFlag = formValues.active;
      body[0].language.languageId = 1;

      body[1].pollsQuestion = formValues.pollMalay;
      body[1].pollsAnswer1 = formValues.opt1Bm;
      body[1].pollsAnswer2 = formValues.opt2Bm;
      body[1].pollsAnswer3 = formValues.opt3Bm;
      body[1].pollsAnswer4 = formValues.opt4Bm;
      body[1].pollsAnswer5 = formValues.opt5Bm;
      body[1].pollsActiveFlag = formValues.active;   
      body[1].language.languageId = 2;

      
      

      this.commonservice.create(body,'polls/question').subscribe(
        data => {
          
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['poll/questions']);
          }).bind(this));   
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, '');  
          
      });
    }

    // update form
    else{

      let body = [
        {
          "pollsQuestionId": this.getIdEn,
          "pollsQuestion": null,
          "pollsAnswer1": null,
          "pollsAnswer2": null,
          "pollsAnswer3": null,
          "pollsAnswer4": null,
          "pollsAnswer5": null,
          "pollsActiveFlag": false,
          "pollsResult1": null,
          "pollsResult2": null,
          "pollsResult3": null,
          "pollsResult4": null,
          "pollsResult5": null,
          "pollsReference": this.getRefId,
          "language": {
              "languageId": null
          }
        },{
          "pollsQuestionId": this.getIdBm,
          "pollsQuestion": null,
          "pollsAnswer1": null,
          "pollsAnswer2": null,
          "pollsAnswer3": null,
          "pollsAnswer4": null,
          "pollsAnswer5": null,
          "pollsActiveFlag": false,
          "pollsResult1": null,
          "pollsResult2": null,
          "pollsResult3": null,
          "pollsResult4": null,
          "pollsResult5": null,
          "pollsReference": this.getRefId,
          "language": {
              "languageId": null
          }
        }
      ]    

      body[0].pollsQuestion = formValues.pollEng;
      body[0].pollsAnswer1 = formValues.opt1En;
      body[0].pollsAnswer2 = formValues.opt2En;
      body[0].pollsAnswer3 = formValues.opt3En;
      body[0].pollsAnswer4 = formValues.opt4En;
      body[0].pollsAnswer5 = formValues.opt5En;
      body[0].pollsActiveFlag = formValues.active;
      body[0].language.languageId = 1;

      body[0].pollsResult1 = this.res1En;
      body[0].pollsResult2 = this.res2En;
      body[0].pollsResult3 = this.res3En;
      body[0].pollsResult4 = this.res4En;
      body[0].pollsResult5 = this.res5En;

      body[1].pollsQuestion = formValues.pollMalay;
      body[1].pollsAnswer1 = formValues.opt1Bm;
      body[1].pollsAnswer2 = formValues.opt2Bm;
      body[1].pollsAnswer3 = formValues.opt3Bm;
      body[1].pollsAnswer4 = formValues.opt4Bm;
      body[1].pollsAnswer5 = formValues.opt5Bm;
      body[1].pollsActiveFlag = formValues.active;
      body[1].language.languageId = 2;

      body[1].pollsResult1 = this.res1Bm;
      body[1].pollsResult2 = this.res2Bm;
      body[1].pollsResult3 = this.res3Bm;
      body[1].pollsResult4 = this.res4Bm;
      body[1].pollsResult5 = this.res5Bm;

      
      

      this.commonservice.update(body,'polls/question/multiple/update').subscribe(
        data => {
          
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), ''); 
            this.router.navigate(['poll/questions']);
          }).bind(this)); 
          
        },
        error => {
          
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

    let reqVal:any = ["pollEng", "pollMalay", "opt1En", "opt1Bm", "opt2En", "opt2Bm"];
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
    this.router.navigate(['poll/questions']);
  }

}

