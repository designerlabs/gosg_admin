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
  public urlEdit: any;
  public keyVal: any;

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

    this.urlEdit = this.router.url.split('/')[2];
    
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true);
    }
    else{
      this.commonservice.pageModeChange(true);      
      this.getData();
    }
  }

  getData() {

    let _getRefID = this.router.url.split('/')[2];  
    this.dataUrl = this.appConfig.urlSystemSettings + '/'+_getRefID;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log("data");
      console.log(data);

      this.updateForm.get('entity').setValue(this.recordList.settingsEntities);
      this.updateForm.get('key').setValue(this.recordList.settingsKey); 
      this.updateForm.get('value').setValue(this.recordList.settingsValue);       
      this.updateForm.get('active').setValue(this.recordList.isActive);      

      this.getId = this.recordList.settings_id;

      this.checkReqValues();
      
    });
  }

  submit(formValues: any) {
    this.urlEdit = this.router.url.split('/')[2];

    // add form
    if(this.urlEdit === 'add'){

      let body = 
      {        
        "settingsEntities": null,
        "settingsKey": null,
        "settingsValue": null,
        "isActive":false
      }      

      body.settingsEntities = formValues.entity;
      body.settingsKey = formValues.key;
      body.settingsValue = formValues.value;
      body.isActive = formValues.active;

      console.log("TEST")
      console.log(body)

      this.commonservice.addRecordSysSettings(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(data);

          let txt = "";
          if(data.statusCode == "ERROR"){
            txt = data.statusDesc;
            this.toastr.error(txt, ''); 
          }
          else{
            txt = "Record added successfully!"
            this.toastr.success(txt, '');  
            this.router.navigate(['systemsettings']);
          }               
        },
        error => {
          console.log("No Data")
      });
    }

    // update form
    else{      

      let body = 
      {        
        "settingsEntities": null,
        "settingsKey": null,
        "settingsValue": null,
        "isActive":false,
        "settings_id": this.getId
      }      

      body.settingsEntities = formValues.entity;
      body.settingsKey = formValues.key;
      body.settingsValue = formValues.value;
      body.isActive = formValues.active;

      console.log("UPDATE: ");     

      this.commonservice.updateRecordSysSettings(body).subscribe(
        data => {
                  
          console.log(data);
          let txt = "";
          if(data.statusCode == "ERROR"){
            txt = data.statusDesc;
            this.toastr.error(txt, ''); 
          }
          else{
            txt = "Record updated successfully!"
            this.toastr.success(txt, '');  
            this.router.navigate(['systemsettings']);
          }    
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

    // start get new key without space
    this.keyVal = this.key.value;
    let currKeyValue :any;

    if(this.keyVal){
      currKeyValue = this.stripspaces(this.keyVal);
      this.updateForm.get('key').setValue(currKeyValue); 
    }
    // end get new key without space
  }

  stripspaces(input){
    input = input.replace(/\s+/g, '');
    return input;
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
    this.router.navigate(['systemsettings']);
  }

}
