import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

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

  complete: boolean;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router) { }

  ngOnInit() {

    this.subjectEn = new FormControl();
    this.subjectBm = new FormControl();

    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      subjectEn: this.subjectEn,
      subjectBm: this.subjectBm,

      active: this.active
      
    });
  }

  update(formValues: any) {
    let body = [
      {
        "subjectId": null,
        "subject": null,
        "subjectReference": null,
        "language": {
            "languageId": null
        }
      },{
        "subjectId": null,
        "subject": null,
        "subjectReference": null,
        "language": {
            "languageId": null
        }
      }
    ]    
    
    console.log(formValues)

    body[0].subjectId = 98;
    body[0].subject = formValues.typeBm;
    body[0].subjectReference = 22;
    body[0].language.languageId = 2;

    body[1].subjectId = 99;
    body[1].subject = formValues.typeEn;
    body[1].subjectReference = 22;
    body[1].language.languageId = 1;


    console.log("TEST")
    console.log(body)

    // this.commonservice.addRecord(body).subscribe(
    //   data => {
    //     console.log(JSON.stringify(body))
    //     console.log(body)
    //     alert('Record added successfully!')
    //     this.router.navigate(['feedback/type/add']);
    //     // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
    //   },
    //   error => {
    //     console.log("No Data")
    //     // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
    // });
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
    } else {
        txt = "You pressed Cancel!";
    }
  }

}
