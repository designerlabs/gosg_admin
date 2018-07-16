import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { SharedModule } from '../../../shared/shared.module';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postcodetbl',
  templateUrl: './postcodetbl.component.html',
  styleUrls: ['./postcodetbl.component.css']
})
export class PostcodetblComponent implements OnInit {

  getStateData: any;
  getCityData: any;
  getPostData: any;
  selectedState: any;
  selStateInfo: any;
  selCityInfo: any;

  public latestCityCode = "";
  public languageId: any;
  public loading = false;

  constructor(
    public commonservice: CommonService,
    private translate: TranslateService, 
    private toastr: ToastrService,
    private router: Router) {
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
      
     });
    }
  }

  getPostcodeByCity(e,str){
    this.selCityInfo = e;
    this.latestCityCode = "";
    console.log(e);
    console.log("Before assign");
    console.log(this.latestCityCode);
    
    if(e){
      this.loading = true;
      this.latestCityCode = e.value.cityCode;
      return this.commonservice.readPortal('postcode/city/'+e.value.cityCode, '', '', '', this.languageId)
      .subscribe(resPostCodeData => {
        this.commonservice.errorHandling(resPostCodeData, (function(){
          console.log(this.latestCityCode)
        this.getPostData = resPostCodeData["postcodeList"];
        console.log("After assign");
        console.log(this.getPostData);
      }).bind(this)); 
      this.loading = false;
    },
    error => {
      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      
     });
    }    

    else{// use after delete
      console.log(this.latestCityCode)
    
      this.loading = true;
      return this.commonservice.readPortal('postcode/city/'+this.latestCityCode, '', '', '', this.languageId)
      .subscribe(resPostCodeData => {
        this.commonservice.errorHandling(resPostCodeData, (function(){
        this.getPostData = resPostCodeData["postcodeList"];
      }).bind(this)); 
      this.loading = false;
    },
    error => {
      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      
     });
    }
  }


  deletePoscode(val){

    console.log(val)
    this.loading = true;
    
    this.commonservice.delete(val,'postcode/delete/').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getPostcodeByCity('',this.latestCityCode);
        }).bind(this)); 
        this.loading = false;          
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        
    });
  }

  addBtn() { 
    this.router.navigate(['reference/postcode/', "add"]);
  }

  updateRow(row) {
    
    this.router.navigate(['reference/postcode/', row]);
    this.commonservice.pageModeChange(true);
  }

}
