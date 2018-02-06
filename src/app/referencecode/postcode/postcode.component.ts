import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { SharedModule } from '../../shared/shared.module';


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
  constructor(private commonservice: CommonService) { }

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
