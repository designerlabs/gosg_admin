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
  public message: any;
  public email: any;
  public replyMessage: any;

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
    this.dataUrl = this.appConfig.urlFeedbackType + '/'+_getRefID;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log("data");
      console.log(data);    

      this.getId = this.recordList.feedbackTypeEntityList[0].feedbackTypeId;
      this.name = "Noraini";
      this.type = "This Type";
      this.subject = "This Subject";
      this.message = "This message";
      this.email = "noraini.ghani@mimos.my";
      this.replyMessage = this.recordList.feedbackTypeEntityList[0].feedbackTypeDescription;
      
    });
  }

  delete(getId) {
    let txt;
    let r = confirm("Are you sure to delete?");
    if (r == true) {

      console.log(getId);
      // this.commonservice.delRecordAccStatus(getId).subscribe(
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
