import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { SharedModule } from '../../shared/shared.module';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';


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
  public languageId: any;

  constructor(private commonservice: CommonService,
  private translate: TranslateService) {
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
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getState('152');
    }
   }

  ngOnInit() {
    this.getState('152');    
  }
    
  getState(id?){
    return this.commonservice.getStateData()
     .subscribe(resStateData => {
        this.getStateData = resStateData;        
      },
      Error => {
      //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
      console.log('Error in State');
     });
  }

  getCitiesByState(e){
    this.getPostData = '';
    this.selStateInfo = e;
    if(e){
      return this.commonservice.getCitiesbyState(e.value.stateId)
      .subscribe(resCityData => {
        this.getCityData = resCityData;          
      },
      Error => {
    //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');      
    console.log('Error in City');      
     });
    }
  }

  getPostcodeByCity(e){
    this.selCityInfo = e;
    if(e){
      return this.commonservice.getPostCodeData(e.value.cityId)
      .subscribe(resPostCodeData => {
        this.getPostData = resPostCodeData;
      },
      Error => {
      //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');      
      console.log('Error in Podtcode');      
     });
    }    
  }

}
