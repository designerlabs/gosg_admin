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
  public languageId: any;
  public loading = false;

  constructor(private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private translate: TranslateService,
    private dialogsService: DialogsService) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
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
      this.languageId = localStorage.getItem('langID');
      this.commonservice.getModuleId();
      //this.getData();
    }
    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();

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

    this.commonservice.getModuleId();

    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  getData() {

    let _getRefID = this.router.url.split('/')[3];
    this.loading = true;
    this.commonservice.readPortalById('addresstype/code/', _getRefID, this.languageId)
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){

        this.recordList = data;
        
        

        this.updateForm.get('addTypeEn').setValue(this.recordList.list[0].addressType);
        this.updateForm.get('addTypeBm').setValue(this.recordList.list[1].addressType);      
        this.updateForm.get('active').setValue(this.recordList.list[1].enabled);      

        this.getIdEn = this.recordList.list[0].addressTypeId;
        this.getIdBm = this.recordList.list[1].addressTypeId;
        this.getRefId = this.recordList.list[0].refCode;

        this.checkReqValues();
      }).bind(this));
      this.loading = false;  
    },
    error => {

      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      this.loading = false;
      
    
    });

  }


  submit(formValues: any) {
    let urlEdit = this.router.url.split('/')[3];
    let txt;

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

      
      
      this.loading = true;
      this.commonservice.create(body, 'addresstype').subscribe(
        data => {
                    
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['address/type']);
          }).bind(this));   
          this.loading = false;         
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
          this.loading = false; 
          
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
      

      
      
      this.loading = true;
      this.commonservice.update(body, 'addresstype').subscribe(
        data => {
          
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['address/type']);
          }).bind(this));  
          this.loading = false;         
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
          this.loading = false;
          
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
    this.updateForm.reset();
    this.checkReqValues();   
  }

  back(){
    this.router.navigate(['address/type']);
  }

}
