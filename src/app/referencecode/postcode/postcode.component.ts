import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { SharedModule } from '../../shared/shared.module';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-postcode',
  templateUrl: './postcode.component.html',
  styleUrls: ['./postcode.component.css']
})
export class PostcodeComponent implements OnInit {
  getStateData: any;
  getCityData: any;
  getPostData: any;
  selectedState: any;
  selStateInfo: any;
  selCityInfo: any;
  // public stateList: any;
  public languageId: any;
  public loading = false;

  constructor(private commonservice: CommonService,
  private translate: TranslateService, private toastr: ToastrService) {
    /* LANGUAGE FUNC */
      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
            this.languageId = 1;
          });
        }
        
        if (myLang == 'ms') {
          translate.get('HOME').subscribe((res: any) => {
            this.languageId = 2;
        });
        // alert(this.languageId + ',' + this.localeVal)
      }
   }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.getState('152', this.languageId);   
    this.commonservice.getModuleId(); 
  }
    
  getState(id?, lng?){
    this.loading = true;
    return this.commonservice.readPortal('state/all', '', '', '', lng)
     .subscribe(resStateData => {
      this.commonservice.errorHandling(resStateData, (function(){
        this.getStateData = resStateData["stateList"];        //.stateList
        this.getCityData = [];
        this.selStateInfo = '';
        this.getPostData = '';
      }).bind(this)); 
      this.loading = false;
    },
    error => {
      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);
     });
  }

  getCitiesByState(e){
    this.getPostData = '';
    this.selStateInfo = e;
    if(e){
      this.loading = true;
      return this.commonservice.readPortalById('city/state/',e.value.stateId)
      .subscribe(resCityData => {
        this.commonservice.errorHandling(resCityData, (function(){
        this.getCityData = resCityData["cityList"];          
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

  getPostcodeByCity(e){
    this.selCityInfo = e;
    console.log(e);
    if(e){
      this.loading = true;
      return this.commonservice.readPortal('postcode/city/'+e.value.cityCode, '', '', '', this.languageId)
      .subscribe(resPostCodeData => {
        this.commonservice.errorHandling(resPostCodeData, (function(){
        this.getPostData = resPostCodeData["postcodeList"];
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

}
