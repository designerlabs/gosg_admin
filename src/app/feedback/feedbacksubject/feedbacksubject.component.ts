import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../../config/app.config.module';
import { CommonService } from './../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../dialogs/dialogs.service';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from './../../nav/nav.service';

@Component({
  selector: 'app-feedbacksubject',
  templateUrl: './feedbacksubject.component.html',
  styleUrls: ['./feedbacksubject.component.css']
})

export class FeedbacksubjectComponent implements OnInit, OnDestroy {

  public loading = false;
  updateForm: FormGroup;
  
  public subjectEn: FormControl;  
  public subjectBm: FormControl;
  public active: FormControl

  public dataUrl: any;  
  public recordList: any;

  public getIdEn: any;
  public getIdBm: any;
  public getRefId: any;

  public complete: boolean;
  public languageId: any;
  public lang: any;

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;

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
      }

    });
    /* LANGUAGE FUNC */
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    //this.subscriptionContentCreator.unsubscribe();
    //this.subscriptionCategoryC.unsubscribe();
    //this.subscriptionRecordListC.unsubscribe();
  }

  ngOnInit() {

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
    } else {
      this.languageId = 1;
    }

    this.subjectEn = new FormControl();
    this.subjectBm = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      subjectEn: this.subjectEn,
      subjectBm: this.subjectBm,
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

    this.commonservice.readPortalById('feedback/subject/', _getRefID)
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.recordList = data;
        console.log("data");
        console.log(data);

        this.updateForm.get('subjectBm').setValue(this.recordList.feedbackSubjectEntityList[0].feedbackSubjectDescription);
        this.updateForm.get('subjectEn').setValue(this.recordList.feedbackSubjectEntityList[1].feedbackSubjectDescription);      

        this.getIdBm = this.recordList.feedbackSubjectEntityList[0].feedbackSubjectId;
        this.getIdEn = this.recordList.feedbackSubjectEntityList[1].feedbackSubjectId;      
        this.getRefId = this.recordList.feedbackSubjectEntityList[0].feedbackSubjectCode;

        console.log("EN: "+this.getIdEn+" BM: "+this.getIdBm)

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
          "feedbackSubjectDescription": null,
          "language": {
              "languageId": 2
          }
        },{
          "feedbackSubjectDescription": null,
          "language": {
              "languageId": 1
          }
        }
      ]    

      body[0].feedbackSubjectDescription = formValues.subjectBm;
      body[1].feedbackSubjectDescription = formValues.subjectEn;

      console.log("ADD: ");
      console.log(body)

      this.loading = true;
      this.commonservice.create(body,'feedback/subject').subscribe(
        data => {
          console.log(JSON.stringify(body))

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['feedback/subject']);
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
          "feedbackSubjectId":this.getIdBm,
          "feedbackSubjectDescription": null,
          "feedbackSubjectCode": this.getRefId,
          "language": {
              "languageId": 2
          }
        },{
          "feedbackSubjectId":this.getIdEn,
          "feedbackSubjectDescription": null,
          "feedbackSubjectCode": this.getRefId,
          "language": {
              "languageId": 1
          }
        }
      ]        

      body[1].feedbackSubjectDescription = formValues.subjectEn; 
      body[0].feedbackSubjectDescription = formValues.subjectBm;           

      console.log("UPDATE: ");
      console.log(body);
      this.loading = true;

      this.commonservice.update(body,'feedback/subject').subscribe(
        data => {
          console.log(JSON.stringify(body))

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['feedback/subject']);
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

    let reqVal:any = ["subjectEn", "subjectBm"];
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
    this.router.navigate(['feedback/subject']);
  }

}
