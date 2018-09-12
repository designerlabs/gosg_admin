import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, OnDestroy {
  
  getStateData: any;

  updateForm: FormGroup;  
  public state: FormControl;
  public city: FormControl;

  languageId: any;
  lang: any;
  public loading = false;
  public urlEdit = "";
  complete: boolean;
  cityId: any;
  cityCode: any;
  private subscriptionLang: ISubscription;
  showNoData = false; 

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService, 
    private router: Router,
    private translate: TranslateService,
    private navservice: NavService,
    private toastr: ToastrService) {
    
    /* LANGUAGE FUNC */
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.languageId = 1;
        });
      }

      if (myLang == 'ms') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.languageId = 2;
        });
      }
      if (this.navservice.flagLang) {
        this.changeLanguageAddEdit();
        this.commonservice.getModuleId();
      }

    });
    /* LANGUAGE FUNC */     
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.state = new FormControl();
    this.city = new FormControl();

    this.updateForm = new FormGroup({   

      state: this.state,
      city: this.city,
    });

    this.urlEdit = this.router.url.split('/')[3];

    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.checkReqValues();  
      this.getData();
    }

    this.getState('152', this.languageId); 
    this.commonservice.getModuleId(); 

    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  getState(id?, lng?){ //list of state in Malaysia only
    this.loading = true;
    return this.commonservice.readPortal('state/all', '', '', '', lng)
     .subscribe(resStateData => {
      this.commonservice.errorHandling(resStateData, (function(){
        this.getStateData = resStateData["stateList"];     
      }).bind(this)); 
      this.loading = false;
    },
    error => {
      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
     });
  }

  getData(){
    let _getRefID = this.router.url.split('/')[3];  
    this.loading = true;
    this.commonservice.readPortalById('city/', _getRefID, this.languageId)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function(){

          this.recordList = data["city"];

          this.updateForm.get('state').setValue(this.recordList.state.stateId);
          this.updateForm.get('city').setValue(this.recordList.cityName);     
          this.cityId = this.recordList.cityId;
          this.cityCode = this.recordList.cityCode;
          this.checkReqValues();

        }).bind(this));   
        this.loading = false;
    },
    error => {

      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   

    });
  }

  submit(formValues: any) {
    
    this.urlEdit = this.router.url.split('/')[3];

    // add form
    if(this.urlEdit === 'add'){

      let body = 
      {
        "cityName": null,
        "state": {
          "stateId": null
        }
      }  
 
      body.cityName = formValues.city;
      body.state.stateId = formValues.state;
      
      this.loading = true;
      this.commonservice.create(body, 'city').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), '');
          this.router.navigate(['reference/city']);
        }).bind(this));  
        this.loading = false; 
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');           
      });
    }

    // update form
    else{

      let body = 
      {
        "cityId": this.cityId,
        "cityName": null,
        "cityCode": this.cityCode,
        "state": {
          "stateId": null
        }
      }    

      body.cityName = formValues.city;
      body.state.stateId = formValues.state;

      this.loading = true;
      this.commonservice.update(body,'city').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['reference/city']);
          }).bind(this));   
          this.loading = false;
        },
        error => {

          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["state", "city"];
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
  
  changeLanguageAddEdit(){
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
    }
    else{
      this.commonservice.pageModeChange(true);
    }
  }

  back(){
    this.router.navigate(['reference/city']);
  }

}
