import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedbacktype',
  templateUrl: './feedbacktype.component.html',
  styleUrls: ['./feedbacktype.component.css']
})

export class FeedbacktypeComponent implements OnInit {

  updateForm: FormGroup;
  
  public typeEn: FormControl;  
  public typeBm: FormControl;

  public active: FormControl

  complete: boolean;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router) { }

  ngOnInit() {

    this.typeEn = new FormControl();
    this.typeBm = new FormControl();

    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      typeEn: this.typeEn,
      typeBm: this.typeBm,

      active: this.active
      
    }); 
  }

  update(formValues: any) {
    let body = [
      {
        "typeId": null,
        "type": null,
        "typeReference": null,
        "language": {
            "languageId": null
        }
      },{
        "typeId": null,
        "type": null,
        "typeReference": null,
        "language": {
            "languageId": null
        }
      }
    ]    
    
    console.log(formValues)

    body[0].typeId = 98;
    body[0].type = formValues.typeBm;
    body[0].typeReference = 22;
    body[0].language.languageId = 2;

    body[1].typeId = 99;
    body[1].type = formValues.typeEn;
    body[1].typeReference = 22;
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
