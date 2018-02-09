import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-systemsettings',
  templateUrl: './systemsettings.component.html',
  styleUrls: ['./systemsettings.component.css']
})
export class SystemsettingsComponent implements OnInit {

  updateForm: FormGroup;
  
  public entity: FormControl;  
  public key: FormControl;
  public value: FormControl;
  public active: FormControl;

  public dataUrl: any;  
  public recordList: any;

  public getId: any;

  public complete: boolean;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.entity = new FormControl();
    this.key = new FormControl();
    this.value = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      entity: this.entity,
      key: this.key,
      value: this.value,
      active: this.active     

    });

    let urlEdit = this.router.url.split('/')[2];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true)
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }
  }

  getData() {

    let _getRefID = this.router.url.split('/')[2];
  
    this.dataUrl = this.appConfig.urlSystemSettings + '/'+_getRefID;

    //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log("data");
      console.log(data);

      this.updateForm.get('entity').setValue(this.recordList[0].accountStatusDescription);
      this.updateForm.get('key').setValue(this.recordList[1].accountStatusDescription); 
      this.updateForm.get('value').setValue(this.recordList[1].accountStatusDescription);       
      this.updateForm.get('active').setValue(this.recordList[1].enabled);      

      this.getId = this.recordList[0].accountStatusId;

      this.checkReqValues();
      
    });
  }

  submit(formValues: any) {
    let urlEdit = this.router.url.split('/')[2];

    // add form
    if(urlEdit === 'add'){

      let body = [
        {        
          "settingsEntities": null,
          "settingsKey": null,
          "settingsValue": null,
          "isActive":false,  
        }
      ]    

      body[0].settingsEntities = formValues.entity;
      body[0].settingsKey = formValues.key;
      body[0].settingsValue = formValues.value;
      body[0].isActive = formValues.active;

      console.log("TEST")
      console.log(body)

      this.commonservice.addRecordSysSettings(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          let txt = "Record added successfully!";
          this.toastr.success(txt, '');  
          this.router.navigate(['systemsettings']);
        },
        error => {
          console.log("No Data")
      });
    }

    // update form
    else{      

      console.log("UPDATE: ");     

      this.commonservice.updateRecordSysSettings(this.getId ).subscribe(
        data => {
                  
          let txt = "Record updated successfully!";
          this.toastr.success(txt, '');  
          this.router.navigate(['systemsettings']);
        },
        error => {
          console.log("No Data")
      });
    }
    
  }

  checkReqValues() {

    let reqVal:any = ["entity", "key", "value"];
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

  back(){
    this.router.navigate(['systemsettings']);
  }

}
