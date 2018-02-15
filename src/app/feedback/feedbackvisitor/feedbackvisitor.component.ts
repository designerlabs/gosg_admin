import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedbackvisitor',
  templateUrl: './feedbackvisitor.component.html',
  styleUrls: ['./feedbackvisitor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackvisitorComponent implements OnInit {

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

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.reply = new FormControl();

    this.updateForm = new FormGroup({   

      reply: this.reply,

    });

    this.getData();    
  }

  getData() {

    let _getRefID = this.router.url.split('/')[4];

    this.dataUrl = this.appConfig.urlFeedback + '/'+_getRefID;
    this.http.get(this.dataUrl)
    .subscribe(data => {
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
      this.checkReqValues();
      
    });
  }

  submit(formValues: any) {
    alert("DRAFT");
    let urlEdit = this.router.url.split('/')[2];
    let txt;
   
    let body = {
      "feedbackId": this.getId,
      "feedbackName": this.name,
      "feedbackRemarks":null,
      "feedbackEmail": this.email,
      "feedbackType": {
        "feedbackTypeId": this.feedbackTypeId,
      },
      "feedbackSubject": {
        "feedbackSubjectId": this.feedbackSubjectId,
      },
      "feedbackMessage": this.messages,
      "feedbackUserIpAddress": this.feedbackUserIpAddress,
      "feedbackReplyFlag": false,
      "feedbackTicketNo": this.feedbackTicketNo,
      "language": {
        "languageId": this.lang
      },
      "feedbackDraftFlag":true
    }

    body.feedbackRemarks = formValues.reply;     

    console.log("UPDATE: ");
    console.log(JSON.stringify(body))

    this.commonservice.updateRecordFeedbackDraft(body).subscribe(
      data => {
              
        if(data.statusCode == "ERROR"){
          this.commonservice.errorResponse(data);
        }
        else{
          txt = "Message saved successfully!";
          this.toastr.success(txt, '');  
          this.router.navigate(['feedback/message/visitor']);
        }
      },
      error => {

        txt = "Server is down."
        this.toastr.error(txt, '');  
        console.log(error);
    });    
    
  }

  submitReply(formValues: any) {
    alert("REPLY");
    let urlEdit = this.router.url.split('/')[2];
    let txt;
   
    let body = {
      "feedbackId": this.getId,
      "feedbackName": this.name,
      "feedbackRemarks":null,
      "feedbackEmail": this.email,
      "feedbackType": {
        "feedbackTypeId": this.feedbackTypeId,
      },
      "feedbackSubject": {
        "feedbackSubjectId": this.feedbackSubjectId,
      },
      "feedbackMessage": this.messages,
      "feedbackUserIpAddress": this.feedbackUserIpAddress,
      "feedbackReplyFlag": true,
      "feedbackTicketNo": this.feedbackTicketNo,
      "language": {
        "languageId": this.lang
      },
      "feedbackDraftFlag":false
    }

    body.feedbackRemarks = formValues.reply;     

    console.log("UPDATE: ");
    console.log(JSON.stringify(body))

    this.commonservice.updateRecordFeedbackReply(body).subscribe(
      data => {
        
        if(data.statusCode == "ERROR"){
          this.commonservice.errorResponse(data);
        }
        else{
      
          txt = "Feedback submitted successfully!";
          this.toastr.success(txt, '');  
          this.router.navigate(['feedback/message/visitor']);
          }
      },
      error => {

        txt = "Server is down."
        this.toastr.error(txt, '');  
        console.log(error);
    });    
    
  }

  checkReqValues() {

    let reqVal:any = ["reply"];
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
    var txt;
    var r = confirm("Are you sure to reset the form?");
    if (r == true) {
        txt = "You pressed OK!";
        this.updateForm.reset();
        this.checkReqValues();
    } else {
        txt = "You pressed Cancel!";
    }
  }

  back(){
    this.router.navigate(['feedback/message/visitor']);
  }

}
