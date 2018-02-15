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
  selector: 'app-feedbackadmin',
  templateUrl: './feedbackadmin.component.html',
  styleUrls: ['./feedbackadmin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackadminComponent implements OnInit {

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
      
    });
  }

  delete(getId) {
    let txt;
    let r = confirm("Are you sure to delete?");
    if (r == true) {

      console.log(getId);
      // this.commonservice.delRecordFeedback(getId).subscribe(
      //   data => {
          
      //     txt = "Record deleted successfully!";

      //     this.toastr.success(txt, '');  
      //     this.router.navigate(['feedback/message/admin']);
      //   },
      //   error => {
      //     console.log("No Data")
      // });
    }

    else{
      txt = "Delete Cancelled!";
    }
  }

  back(){
    this.router.navigate(['feedback/message/admin']);
  }

}
