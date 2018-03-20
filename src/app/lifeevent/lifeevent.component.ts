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
  selector: 'app-lifeevent',
  templateUrl: './lifeevent.component.html',
  styleUrls: ['./lifeevent.component.css']
})
export class LifeeventComponent implements OnInit {

  public loading = false;
  updateForm: FormGroup;
  
  public fname: FormControl;  
  public furl: FormControl;
  public default: FormControl;
  public active: FormControl;

  public readByIdUrl: any;  
  public recordList: any;

  public getId: any;

  public complete: boolean;
  public urlEdit: any;
  public urlVal: any;
  public languageId: any;

  public refId: any;

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

    // this.refId = this.router.url.split('/')[2];

    this.fname = new FormControl();
    this.furl = new FormControl();
    this.default = new FormControl();
    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      fname: this.fname,
      furl: this.furl,
      default: this.default,
      active: this.active     

    });

    this.urlEdit = this.router.url.split('/')[2];
    
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true);

    }
    else{
      this.commonservice.pageModeChange(true);      
      this.getData(this.urlEdit);
    }

    this.commonservice.getModuleId();

    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  getData(id) {

    this.loading = true;
    this.commonservice.readPortalById('lifeevent/id/', id)
    .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data;
          console.log("data");
          console.log(data);

          this.updateForm.get('fname').setValue(this.recordList.font.fontName);
          this.updateForm.get('furl').setValue(this.recordList.font.fontUrl); 
          this.updateForm.get('default').setValue(this.recordList.font.defaultFont);       
          this.updateForm.get('active').setValue(this.recordList.font.enabled);      

          this.getId = this.recordList.font.fontId;
          this.checkReqValues();

        }).bind(this));   
        this.loading = false;
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        console.log(error);
      
    });
  }

  submit(formValues: any) {
    this.urlEdit = this.router.url.split('/')[2];

    // add form
    if(this.urlEdit === 'add'){

      let body = 
      {        
        "fontName": null,
        "fontUrl": null,
        "enabled": false,
        "defaultFont":false
      }      

      body.fontName = formValues.fname;
      body.fontUrl = formValues.furl;
      body.enabled = formValues.active;
      body.defaultFont = formValues.default;

      // console.log("TEST")
      // console.log(JSON.stringify(body))

      this.loading = true;
      this.commonservice.create(body, 'font').subscribe(
        data => {
                    
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['lifeevent']);
          }).bind(this));      
          this.loading = false;      
        },
        error => {

          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          console.log(error);
      });
    }

    // update form
    else{      

      let body = 
      {        
        "fontId": this.getId,
        "fontName": null,
        "fontUrl": null,
        "enabled": false,
        "defaultFont":false
      }      

      body.fontName = formValues.fname;
      body.fontUrl = formValues.furl;
      body.enabled = formValues.active;
      body.defaultFont = formValues.default;

      // console.log("UPDATE: ");     
      // console.log(JSON.stringify(body))

      this.loading = true;
      this.commonservice.update(body, 'font').subscribe(
        data => {
                  
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['lifeevent']);
          }).bind(this)); 
          this.loading = false;
        },
        error => {
          
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');  
          console.log(error);
      });
    }
    
  }

  checkReqValues() {

    let reqVal:any = ["fname"];
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

    // start get new url without space
    this.urlVal = this.furl.value;
    let currUrlValue :any;

    if(this.urlVal){
      currUrlValue = this.stripspaces(this.urlVal);
      this.updateForm.get('furl').setValue(currUrlValue); 
    }
    // end get new url without space

    //active is auto check when default status is true
    // if(this.updateForm.controls.default.value == true){
    //   this.updateForm.get('active').setValue(true);
    //   this.defStatus = true;
    // }

    // else{
    //   this.defStatus = false;
    // }
    // end active is auto check when default status is true
    
    //capitalize font name
    if(this.updateForm.controls.fname.value != null){
      let capFname = this.updateForm.controls.fname.value;

      capFname = capFname.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();})

      if(capFname)
        this.updateForm.get('fname').setValue(capFname);

    }
  }

  checkDefaultStatus() {
    let def = this.updateForm.get('default');
    let active = this.updateForm.get('active');

    if(def.value == true) {
      active.setValue(true)
    } else if(def.value == true && active.value == true) {
      def.setValue(false)
      active.setValue(false)
    } else if(def.value == true && active.value == false) {
      def.setValue(false)
      active.setValue(false)
    }
  }

  stripspaces(input){
    input = input.replace(/\s+/g, '');
    return input;
  }

  myFunction() {
    this.updateForm.reset();
    this.checkReqValues();   
  }

  back(){
    this.router.navigate(['lifeevent']);
  }

}
