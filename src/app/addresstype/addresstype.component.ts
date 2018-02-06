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
  selector: 'app-addresstype',
  templateUrl: './addresstype.component.html',
  styleUrls: ['./addresstype.component.css']
})
export class AddresstypeComponent implements OnInit {

  updateForm: FormGroup;
  
  public addTypeEn: FormControl;  
  public addTypeBm: FormControl;
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

    this.addTypeEn = new FormControl();
    this.addTypeBm = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      addTypeEn: this.addTypeEn,
      addTypeBm: this.addTypeBm,
      active: this.active      
    });

    let urlEdit = this.router.url.split('/')[3];
    
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

    let _getRefID = this.router.url.split('/')[3];
  
    this.dataUrl = this.appConfig.urlAddressType + '/code/'+_getRefID;

    //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log("data");
      console.log(data);

      this.updateForm.get('addTypeEn').setValue(this.recordList[0].addressType);
      this.updateForm.get('addTypeBm').setValue(this.recordList[1].addressType);      
      this.updateForm.get('active').setValue(this.recordList[1].enabled);      

      this.getIdEn = this.recordList[0].addressTypeId;
      this.getIdBm = this.recordList[1].addressTypeId;
      this.getRefId = this.recordList[0].refCode;

      this.checkReqValues();
      
    });
  }


  submit(formValues: any) {
    let urlEdit = this.router.url.split('/')[3];

    // add form
    if(urlEdit === 'add'){

      let body = [
        {
        
          "addressType": null,
          "enabled":false,
          "language": {
              "languageId": 1
          }
        },{
          "addressType": null,
          "enabled":false,
          "language": {
              "languageId": 2
          }
        }
      ]    

      body[0].addressType = formValues.addTypeEn;
      body[0].enabled = formValues.active;
      body[1].addressType = formValues.addTypeBm;
      body[1].enabled = formValues.active;

      console.log("TEST")
      console.log(body)

      this.commonservice.addRecordAddType(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          let txt = "Record added successfully!";
          this.toastr.success(txt, '');  
          this.router.navigate(['address/type']);
        },
        error => {
          console.log("No Data")
      });
    }

    // update form
    else{
      let body = [
        {
          "addressTypeId":this.getIdEn,
          "addressType": null,
          "enabled":false,
          "refCode": this.getRefId,
          "language": {
              "languageId": 1
          }
        },{
          "addressTypeId":this.getIdBm,
          "addressType": null,
          "enabled":false,
          "refCode": this.getRefId,
          "language": {
              "languageId": 2
          }
        }
      ]        

      body[0].addressType = formValues.addTypeEn;
      body[0].enabled = formValues.active;
      body[1].addressType = formValues.addTypeBm;
      body[1].enabled = formValues.active;
      

      console.log("UPDATE: ");
      console.log(body);

      this.commonservice.updateRecordAddType(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
        
          let txt = "Record updated successfully!";
          this.toastr.success(txt, '');  
          this.router.navigate(['address/type']);
        },
        error => {
          console.log("No Data")
      });
    }
    
  }

  checkReqValues() {

    let reqVal:any = ["addTypeEn", "addTypeBm"];
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
    this.router.navigate(['address/type']);
  }

}
