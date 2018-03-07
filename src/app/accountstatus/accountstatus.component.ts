import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from './../dialogs/dialogs.service';

@Component({
  selector: 'app-accountstatus',
  templateUrl: './accountstatus.component.html',
  styleUrls: ['./accountstatus.component.css']
})
export class AccountstatusComponent implements OnInit {

  updateForm: FormGroup;
  
  public accEn: FormControl;  
  public accBm: FormControl;
  public active: FormControl

  public dataUrl: any;  
  public recordList: any;

  public getIdEn: any;
  public getIdBm: any;
  public getRefId: any;

  public complete: boolean;
  public languageId: any;
  public loading = false;

  constructor(private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private translate: TranslateService,
    private dialogsService: DialogsService) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.commonservice.getModuleId();
              //this.getUsersData(this.pageCount, this.pageSize);
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      if(localStorage.getItem('langID')){
        this.languageId = localStorage.getItem('langID');
      }else{
        this.languageId = 1;
      }
      this.commonservice.getModuleId();
      //this.getData();
    }
    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    this.accEn = new FormControl();
    this.accBm = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      accEn: this.accEn,
      accBm: this.accBm,
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

    this.commonservice.getModuleId();

    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  getData() {

    let _getRefID = this.router.url.split('/')[2];
  
    this.dataUrl = this.appConfig.urlAccountStatus + '/code/'+_getRefID + '?language=' +this.languageId;
    this.loading = true;
    this.http.get(this.dataUrl)
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){
        this.recordList = data;
        console.log("data");
        console.log(data);

        this.updateForm.get('accEn').setValue(this.recordList.list[0].accountStatusDescription);
        this.updateForm.get('accBm').setValue(this.recordList.list[1].accountStatusDescription);      
        this.updateForm.get('active').setValue(this.recordList.list[1].enabled);      

        this.getIdEn = this.recordList.list[0].accountStatusId;
        this.getIdBm = this.recordList.list[1].accountStatusId;
        this.getRefId = this.recordList.list[0].accountStatusCode;

        this.checkReqValues();
      }).bind(this));   
      this.loading = false;
    },
    error => {

        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        this.loading = false;
        console.log(error);
      
    });
  }

  submit(formValues: any) {
    let urlEdit = this.router.url.split('/')[2];
  
    // add form
    if(urlEdit === 'add'){

      let body = [
        {
        
          "accountStatusDescription": null,
          "enabled":false,
          "language": {
              "languageId": 1
          }
        },{
          "accountStatusDescription": null,
          "enabled":false,
          "language": {
              "languageId": 2
          }
        }
      ]    

      body[0].accountStatusDescription = formValues.accEn;
      body[0].enabled = formValues.active;
      body[1].accountStatusDescription = formValues.accBm;
      body[1].enabled = formValues.active;

      console.log("TEST")
      console.log(JSON.stringify(body))
      this.loading = true;
      this.commonservice.addRecordAccStatus(body).subscribe(
        data => {         
          
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['account']);
          }).bind(this));   
          this.loading = false;
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          this.loading = false;
          console.log(error);
      });
    }

    // update form
    else{
      let body = [
        {
          "accountStatusId":this.getIdEn,
          "accountStatusDescription": null,
          "enabled":false,
          "accountStatusCode": this.getRefId,
          "language": {
              "languageId": 1
          }
        },{
          "accountStatusId":this.getIdBm,
          "accountStatusDescription": null,
          "enabled":false,
          "accountStatusCode": this.getRefId,
          "language": {
              "languageId": 2
          }
        }
      ]        

      body[0].accountStatusDescription = formValues.accEn;
      body[0].enabled = formValues.active;
      body[1].accountStatusDescription = formValues.accBm;
      body[1].enabled = formValues.active;
      

      console.log("UPDATE: ");
      console.log(body);
      this.loading = true;
      this.commonservice.updateRecordAccStatus(body).subscribe(
        data => {
          
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['account']);
          }).bind(this));   
          this.loading = false;
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          console.log(error);
          this.loading = false;
      });
    }
    
  }

  checkReqValues() {

    let reqVal:any = ["accEn", "accBm"];
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
    this.updateForm.reset();
    this.checkReqValues();   
  }

  back(){
    this.router.navigate(['account']);
  }

}
