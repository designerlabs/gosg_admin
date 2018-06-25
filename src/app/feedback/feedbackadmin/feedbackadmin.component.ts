import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from './../../dialogs/dialogs.service';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from './../../nav/nav.service';

@Component({
  selector: 'app-feedbackadmin',
  templateUrl: './feedbackadmin.component.html',
  styleUrls: ['./feedbackadmin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackadminComponent implements OnInit, OnDestroy {

  public loading = false;
  updateForm: FormGroup;

  public reply: FormControl;
  
  public name: any;
  public type: any;
  public subject: any;
  public messages: any;
  public email: any;
  public replyMessage: any;
  public lang: any;
  public feedbackTicketNo: any;
  public feedbackUserIpAddress: any;
  public feedbackTypeId: any;
  public feedbackSubjectId: any;
  public dataUrl: any;  
  public recordList: any;

  public getId: any;

  public complete: boolean;
  public languageId: any;

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
    private translate: TranslateService,
    private navservice: NavService,
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

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    } 

    this.reply = new FormControl();

    this.updateForm = new FormGroup({   

      reply: this.reply, 
    });
  
    this.getData();
    this.commonservice.getModuleId();

    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
    
  }

  getData() {

    let _getRefID = this.router.url.split('/')[4];  
    this.loading = true;

    this.commonservice.readProtectedById('feedback/', _getRefID, this.languageId)
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.recordList = data;
        console.log("data");
        console.log(data);    

        this.updateForm.get('reply').setValue(this.recordList.feedback.feedbackRemarks); 

        this.name = this.recordList.feedback.feedbackName;
        this.type = this.recordList.feedback.feedbackType.feedbackTypeDescription;
        this.subject = this.recordList.feedback.feedbackSubject.feedbackSubjectDescription;
        this.messages = this.recordList.feedback.feedbackMessage;
        this.email = this.recordList.feedback.feedbackEmail;
        this.replyMessage = this.recordList.feedback.feedbackRemarks;
        this.lang = this.recordList.feedback.language.languageId;
        this.feedbackTicketNo = this.recordList.feedback.feedbackTicketNo;
        this.feedbackUserIpAddress = this.recordList.feedback.feedbackUserIpAddress;
        this.feedbackTypeId = this.recordList.feedback.feedbackType.feedbackTypeId;
        this.feedbackSubjectId = this.recordList.feedback.feedbackSubject.feedbackSubjectId;

        this.getId = this.recordList.feedback.feedbackId;
        console.log(this.messages);   

      }).bind(this));     
      this.loading = false;  
    },
    error => {

      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);      
    });
  }

  delete(getId) {
    
    this.loading = true;
    console.log(getId);
    this.commonservice.delete(getId,'feedback/').subscribe(
      data => {
        
        this.commonservice.errorHandling(data, (function(){

          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.router.navigate(['feedback/message/admin']);
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
    this.router.navigate(['feedback/message/admin']);
  }

}
