import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../../config/app.config.module';
import { CommonService } from './../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedbacksubject',
  templateUrl: './feedbacksubject.component.html',
  styleUrls: ['./feedbacksubject.component.css']
})

export class FeedbacksubjectComponent implements OnInit {

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

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

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
  }

  getData() {

    let _getRefID = this.router.url.split('/')[3];  
    this.dataUrl = this.appConfig.urlFeedbackSubject+ '/'+_getRefID;

    this.http.get(this.dataUrl)
    .subscribe(data => {
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

      this.commonservice.addRecordFeedbackSubject(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          let txt = "Record added successfully!";
          this.toastr.success(txt, '');  
          this.router.navigate(['feedback/subject']);
        },
        error => {
          console.log("No Data")
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

      this.commonservice.updateRecordFeedbackSubject(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
        
          let txt = "Record updated successfully!";
          this.toastr.success(txt, '');  
          this.router.navigate(['feedback/subject']);
        },
        error => {
          console.log("No Data")
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
    this.router.navigate(['feedback/subject']);
  }

}
