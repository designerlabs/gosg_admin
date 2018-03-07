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
  selector: 'app-feedbacktype',
  templateUrl: './feedbacktype.component.html',
  styleUrls: ['./feedbacktype.component.css']
})

export class FeedbacktypeComponent implements OnInit {

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

  constructor(
    private http: HttpClient, 
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
              this.commonservice.getModuleId();
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
    this.dataUrl = this.appConfig.urlFeedbackTypeGet + '/'+_getRefID + '?language=' +this.languageId;
    this.loading = true;

    this.http.get(this.dataUrl)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;
          console.log("data");
          console.log(data);

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
      console.log(error);
      
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

      console.log("ADD: ")
      console.log(JSON.stringify(body));
      this.loading = true;

      this.commonservice.addRecordFeedbackType(body).subscribe(
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
          console.log(error);
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

      console.log("UPDATE: ");
      console.log(body);
      this.loading = true;

      this.commonservice.updateRecordFeedbackType(body).subscribe(
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
          console.log(error);
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

  myFunction() {
    this.updateForm.reset();
    this.checkReqValues();   
  }

  back(){
    this.router.navigate(['feedback/type']);
  }
}
