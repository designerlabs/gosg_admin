import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { SharedModule } from '../../shared/shared.module';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateService } from '../../common/validate.service';

@Component({
  selector: 'app-postcode',
  templateUrl: './postcode.component.html',
  styleUrls: ['./postcode.component.css']
})
export class PostcodeComponent implements OnInit, OnDestroy {

  getStateData: any;
  getCityData: any;
  maskPostcode: (string | RegExp)[];

  updateForm: FormGroup;  
  public state: FormControl;
  public city: FormControl;
  public postcode: FormControl;

  public languageId: any;
  public loading = false;
  public urlEdit = "";
  complete: boolean;
  public lang = "";
  public postcodeId: any;
  public stateId: any;
  private subscriptionLang: ISubscription;

  constructor(
    public commonservice: CommonService,
    private translate: TranslateService, 
    private navservice: NavService,
    private validateService: ValidateService,
    private router: Router,
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

    this.maskPostcode = this.validateService.getMask().postcode;

    this.state = new FormControl();
    this.city = new FormControl();
    this.postcode = new FormControl();

    this.updateForm = new FormGroup({   

      state: this.state,
      city: this.city,
      postcode: this.postcode
    });     

    this.urlEdit = this.router.url.split('/')[3];

    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
    }
    else{
      this.getData();
      this.commonservice.pageModeChange(true);      
      this.checkReqValues();  
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
        this.getStateData = resStateData["stateList"];        //.stateList
        this.getCityData = [];
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
    this.commonservice.readPortalById('postcode/id/', _getRefID, this.languageId)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
        this.recordList = data["postcode"];       

        this.updateForm.get('state').setValue(this.recordList.city.state.stateId);
        this.updateForm.get('city').setValue(this.recordList.city.cityId);
        this.updateForm.get('postcode').setValue(this.recordList.postCode);

        this.postcodeId = this.recordList.postcodeId;
        this.stateId = this.recordList.city.state.stateId;
        this.checkReqValues();

        let e = '';
        this.getCitiesByState(e)

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
        "postCode": false,
        "city": {
          "cityId": null
        }
      }  
 
      body.postCode = formValues.postcode;
      body.city.cityId = formValues.city;

      this.loading = true;
      this.commonservice.create(body, 'postcode').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), '');
          this.router.navigate(['reference/postcode']);
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
        "postcodeId": this.postcodeId,
        "postCode": null,
        "city": {
          "cityId": null
        }
      }    

      body.postCode = formValues.postcode;
      body.city.cityId = formValues.city;

      this.loading = true;
      this.commonservice.update(body,'postcode').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), '');
          this.router.navigate(['reference/postcode']);
        }).bind(this));   
        this.loading = false;
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');           
      });
    }
  }

  myFunction() {

    this.updateForm.reset();
    this.checkReqValues(); 
  }

  getCitiesByState(e){
    
    if(e){
      this.loading = true;
      return this.commonservice.readPortalById('city/state/',e.value, this.languageId)
        .subscribe(resCityData => {
          this.commonservice.errorHandling(resCityData, (function(){
          this.getCityData = resCityData["cityList"];     
          this.checkReqValues();       
        }).bind(this)); 
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        
      });
    }

    else{
      this.loading = true;
      return this.commonservice.readPortalById('city/state/',this.stateId, this.languageId)
        .subscribe(resCityData => {
          this.commonservice.errorHandling(resCityData, (function(){
          this.getCityData = resCityData["cityList"];     
          this.checkReqValues();       
        }).bind(this)); 
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        
      });
    }
  }

  getPostcodeByCity(e){

    this.checkReqValues();    
  }

  checkReqValues() {

    let reqVal:any = ["state", "city", "postcode"];
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

  changeLanguageAddEdit(){
    if (this.urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
    }
    else{
      this.commonservice.pageModeChange(true);
    }
  }

  back(){
    this.router.navigate(['reference/postcode']);
  }

}
