import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

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
      
    });      
  }

  submitForm(formValues:any){
    let body = {
      "pollqen":null,
      "pollqbm":null,
      "opt1en": null,
      "opt1bm":null,
      "opt2en": null,
      "opt2bm":null,
      "opt3en": null,
      "opt3bm":null,
      "opt4en": null,
      "opt4bm":null,
      "opt5en": null,
      "opt5bm":null,
    };

    body.pollqen = formValues.pollEng;
    body.pollqbm = formValues.pollMalay;
    body.opt1en = {"opts1en": formValues.opt1en};
    body.opt1bm = {"opts1bm": formValues.opt1bm};
    body.opt2en = {"opts2en": formValues.opt2en};
    body.opt2bm = {"opts2bm": formValues.opt2bm};
    body.opt3en = {"opts3en": formValues.opt3en};
    body.opt3bm = {"opts3bm": formValues.opt3bm};
    body.opt4en = {"opts4en": formValues.opt4en};
    body.opt4bm = {"opts4bm": formValues.opt4bm};
    body.opt5en = {"opts5en": formValues.opt5en};
    body.opt5bm = {"opts5bm": formValues.opt5bm};   
   
    let datasend = JSON.stringify(body);   

    alert(datasend);
  }

  checkReqValues() {
    let pqen = "pollEng";
    let pqbm = "pollMalay";
    let opten1 = "opt1en";
    let optbm1 = "opt1bm";
    let opten2 = "opt2en";
    let optbm2 = "opt2bm";

    let reqVal:any = [ pqen, pqbm, opten1, optbm1, opten2, optbm2];
    let nullPointers:any = [];

    for(var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if(elem.value == "" || elem.value == null) {
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

}

