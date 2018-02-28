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

  constructor(private commonservice: CommonService,
  private translate: TranslateService, private toastr: ToastrService) {
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getState('152');
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getState('152');
      this.commonservice.getModuleId();
    }
   }

  ngOnInit() {
    this.getState('152');   
    this.commonservice.getModuleId(); 
  }
    
  getState(id?){
    return this.commonservice.getStateData()
     .subscribe(resStateData => {
      this.commonservice.errorHandling(resStateData, (function(){
        this.getStateData = resStateData["stateList"];        //.stateList
      }).bind(this)); 
    },
    error => {
  
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);
     });
  }

  getCitiesByState(e){
    this.getPostData = '';
    this.selStateInfo = e;
    if(e){
      return this.commonservice.getCitiesbyState(e.value.stateId)
      .subscribe(resCityData => {
        this.commonservice.errorHandling(resCityData, (function(){
        this.getCityData = resCityData["cityList"];          
      }).bind(this)); 
    },
    error => {
  
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);     
     });
    }
  }

  getPostcodeByCity(e){
    this.selCityInfo = e;
    if(e){
      return this.commonservice.getPostCodeData(e.value.cityId)
      .subscribe(resPostCodeData => {
        this.commonservice.errorHandling(resPostCodeData, (function(){
        this.getPostData = resPostCodeData["postcodeList"];
      }).bind(this)); 
    },
    error => {
  
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      console.log(error);      
     });
    }    
  }

}
