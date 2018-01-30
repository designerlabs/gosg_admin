// import { Component, OnInit, ViewEncapsulation, ViewChild, Inject  } from '@angular/core';
// import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
// import { CommonService } from '../../service/common.service';
// import { Router, RouterModule } from '@angular/router';
// import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
// import { SelectionModel } from '@angular/cdk/collections';

import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
=======
import { Router, RouterModule } from '@angular/router';
// import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
// import { SelectionModel } from '@angular/cdk/collections';
>>>>>>> 333c561bfc7c5e882488e2b8edce8f5c5e359688

@Component({
  selector: 'app-pollquestiondetails',
  templateUrl: './pollquestiondetails.component.html',
  styleUrls: ['./pollquestiondetails.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PollquestiondetailsComponent implements OnInit {

  updateForm: FormGroup;
  
  pollEng: FormControl;  
  pollMalay: FormControl;

  opt1En: FormControl;
  opt2En: FormControl;
  opt3En: FormControl;
  opt4En: FormControl;
  opt5En: FormControl;

  opt1Bm: FormControl;
  opt2Bm: FormControl;
  opt3Bm: FormControl;
  opt4Bm: FormControl;
  opt5Bm: FormControl;

  active: FormControl

  displayedColumns = ['optionEn', 'optionBm'];
  complete: boolean;

  constructor(private commonservice: CommonService) { }

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
  }

  // submitForm(formValues:any){
  //   let body = {
  //     "pollqen":null,
  //     "pollqbm":null,
  //     "opt1en": null,
  //     "opt1bm":null,
  //     "opt2en": null,
  //     "opt2bm":null,
  //     "opt3en": null,
  //     "opt3bm":null,
  //     "opt4en": null,
  //     "opt4bm":null,
  //     "opt5en": null,
  //     "opt5bm":null,
  //   };

  //   body.pollqen = formValues.pollEng;
  //   body.pollqbm = formValues.pollMalay;
  //   body.opt1en = {"opts1en": formValues.opt1en};
  //   body.opt1bm = {"opts1bm": formValues.opt1bm};
  //   body.opt2en = {"opts2en": formValues.opt2en};
  //   body.opt2bm = {"opts2bm": formValues.opt2bm};
  //   body.opt3en = {"opts3en": formValues.opt3en};
  //   body.opt3bm = {"opts3bm": formValues.opt3bm};
  //   body.opt4en = {"opts4en": formValues.opt4en};
  //   body.opt4bm = {"opts4bm": formValues.opt4bm};
  //   body.opt5en = {"opts5en": formValues.opt5en};
  //   body.opt5bm = {"opts5bm": formValues.opt5bm};   
   
  //   let datasend = JSON.stringify(body);   

  //   alert(datasend);
  // }

  checkReqValues() {

    debugger;
   // this.complete = true;
    let pollEng = "pollEng";
    let pollMalay = "pollMalay";
    let opt1en = "opt1en";
    let opt1bm = "opt1bm";
    let opt2en = "opt2en";
    let opt2bm = "opt2bm";

    let reqVal:any = [pollEng, opt1en];
    let nullPointers:any = [];

    let elem = this.updateForm.getRawValue();


    //for(var reqData of reqVal) {
    // for(var i=0; i<reqVal.length; i++){
      
    //   let elem3 = this.updateForm.controls[reqVal][i].value;

    //   console.log(elem3);

    //   // if(tes.value == "" || tes.value == null) {
    //   //   tes.setValue(null)
    //   //   nullPointers.push(null)
    //   // }
    // }
   
      if(elem.pollEng == null || elem.pollEng == "" || elem.pollMalay == null || elem.pollMalay == "" || elem.opt1en == null || elem.opt1en == ""
      || elem.opt1bm == null || elem.opt1bm == "" || elem.opt2en == null || elem.opt2en == "" || elem.opt2bm == null || elem.opt2bm == ""){
      
        this.complete = false;
      }

      else{
      
        this.complete = true;
      }
    

    console.log(this.complete);
      
    // if(nullPointers.length > 0) {
    //   this.complete = false;
    // } else {
    //   this.complete = true;
    // }
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

