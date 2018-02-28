import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {
  
  sliderData: Object;
  dataUrl: any;
  date = new Date();
  sliderForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  sliderCode:any;
  sliderIdEn:any;
  sliderIdBm:any;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;

  titleEn: FormControl
  titleBm: FormControl
  descEn: FormControl
  descBm: FormControl
  imgEn: FormControl
  imgBm: FormControl
  active: FormControl
  copyImg: FormControl
  resetMsg = this.resetMsg;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService
  ) { 

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
     translate.get('HOME').subscribe((res: any) => {
       this.commonservice.getAllLanguage().subscribe((data:any) => {
         let getLang = data.list;
         let myLangData =  getLang.filter(function(val) {
           if(val.languageCode == translate.currentLang){
             this.lang = val.languageCode;
             this.languageId = val.languageId;
             // this.getMinistryData(this.pageCount, this.agencyPageSize);
             this.commonservice.getModuleId();
           }
         }.bind(this));
       })
     });
   });
   if(!this.languageId){
     this.languageId = localStorage.getItem('langID');
     // this.getMinistryData(this.pageCount, this.agencyPageSize);
     this.commonservice.getModuleId();
   }
   /* LANGUAGE FUNC */
  }

  ngOnInit() {
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();

    this.titleEn = new FormControl()
    this.titleBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.imgEn = new FormControl()
    this.imgBm = new FormControl()
    this.active = new FormControl()
    this.copyImg = new FormControl()

    this.sliderForm = new FormGroup({
      titleEn: this.titleEn,
      descEn: this.descEn,
      imgEn: this.imgEn,
      titleBm: this.titleBm,
      descBm: this.descBm,
      imgBm: this.imgBm,
      active: this.active,
      copyImg: this.copyImg
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
      this.sliderForm.get('active').setValue(true);
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }
  }

  ngAfterViewInit() {
  }

  isSameImg(enImg,bmImg) {

    console.log(enImg)
    if(enImg != null && enImg == bmImg) {
      this.sliderForm.get('copyImg').setValue(true);
    } else {
      this.sliderForm.get('copyImg').setValue(false);
    }
  }

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['slider']);
  }

  back(){
    this.router.navigate(['slider']);
  }

  // get, add, update, delete
  getRow(row) {

    // Update Slider Service
    return this.http.get(this.appConfig.urlSlides + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {

        this.sliderData = Rdata;
        console.log(this.sliderData)
        console.log(this.appConfig.urlSlides + "/" + row)
        let dataEn = this.sliderData['list'][0];
        let dataBm = this.sliderData['list'][1];

      // populate data
      this.sliderForm.get('titleEn').setValue(dataEn.sliderTitle);
      this.sliderForm.get('descEn').setValue(dataEn.sliderDescription);
      this.sliderForm.get('imgEn').setValue(parseInt(dataEn.sliderImage));
      this.sliderForm.get('titleBm').setValue(dataBm.sliderTitle);
      this.sliderForm.get('descBm').setValue(dataBm.sliderDescription);
      this.sliderForm.get('imgBm').setValue(parseInt(dataBm.sliderImage));
      this.sliderForm.get('active').setValue(dataEn.sliderActiveFlag);
      this.sliderCode = dataEn.sliderCode;
      this.sliderIdEn = dataEn.sliderId;
      this.sliderIdBm = dataBm.sliderId;
      
      this.isSameImg(dataEn.sliderImage,dataBm.sliderImage);

      this.checkReqValues();
    });
    
  }

  isChecked(e) {

    if (e.checked) {
      this.sliderForm.get("imgBm").setValue(this.imgEn.value);
    } else {
      this.sliderForm.get("imgBm").setValue("");
    }
    this.copyImg = e.checked;
    this.checkReqValues();
  }

  checkReqValues() {

    let titleEn = "titleEn";
    let descEn = "descEn";
    let imgEn = "imgEn";
    let titleBm = "titleBm";
    let descBm = "descBm";
    let imgBm = "imgBm";
    // let active = "active";

    let reqVal: any = [titleEn, descEn, imgEn, titleBm, descBm, imgBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.sliderForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    this.isSameImg(this.sliderForm.get(imgEn).value,this.sliderForm.get(imgBm).value);

      // console.log(nullPointers)

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  myFunction() {
    let txt;
    let r = confirm("Are you sure to reset the form?");
    if (r == true) {
      txt = "You pressed OK!";
      this.sliderForm.reset();
      this.sliderForm.get('active').setValue(true);
    } else {
      txt = "You pressed Cancel!";
    }
  }

  updateSlider(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "sliderTitle": null,
        "sliderDescription": null,
        "sliderImage": {
          "mediaId": null
        },
        "sliderCode": null,
        "sliderSort": null,
        "sliderActiveFlag": false,
        "language": {
          "languageId": null
        }
      }, 
      {
        "sliderTitle": null,
        "sliderDescription": null,
        "sliderImage":  {
          "mediaId": null
        },
        "sliderCode": null,
        "sliderSort": null,
        "sliderActiveFlag": false,
        "language": {
          "languageId": null
        }
      }
    ];
    
    // console.log(formValues)

    body[0].sliderTitle = formValues.titleEn;
    body[0].sliderDescription = formValues.descEn;
    body[0].sliderImage.mediaId = formValues.imgEn;
    body[0].sliderSort = null;
    body[0].sliderActiveFlag = formValues.active;
    body[0].language.languageId = 1;

    body[1].sliderTitle = formValues.titleBm;
    body[1].sliderDescription = formValues.descBm;
    body[1].sliderImage.mediaId = formValues.imgBm;
    body[1].sliderSort = null;
    body[1].sliderActiveFlag = formValues.active;
    body[1].language.languageId = 2;

    console.log(body)

    // Add Slider Service
    this.commonservice.addSlider(body).subscribe(
      data => {
        this.toastr.success('Slider added successfully!', ''); 
        this.router.navigate(['slider']);
      },
      error => {
        console.log("No Data")
      });

    } else {
      
    let body = [
      {
        "sliderId": null,
        "sliderTitle": null,
        "sliderDescription": null,
        "sliderImage": {
          "mediaId": null
        },
        "sliderCode": null,
        "sliderSort": null,
        "sliderActiveFlag": false,
        "language": {
          "languageId": null
        }
      }, 
      {
        "sliderId": null,
        "sliderTitle": null,
        "sliderDescription": null,
        "sliderImage": {
          "mediaId": null
        },
        "sliderCode": null,
        "sliderSort": null,
        "sliderActiveFlag": false,
        "language": {
          "languageId": null
        }
      }
    ];
      
    body[0].sliderCode = this.sliderCode;
    body[0].sliderId = this.sliderIdEn;
    body[0].sliderTitle = formValues.titleEn;
    body[0].sliderDescription = formValues.descEn;
    body[0].sliderImage.mediaId = formValues.imgEn;
    body[0].sliderSort = null;
    body[0].sliderActiveFlag = formValues.active;
    body[0].language.languageId = 1;
    
    body[1].sliderCode = this.sliderCode;
    body[1].sliderId = this.sliderIdBm;
    body[1].sliderTitle = formValues.titleBm;
    body[1].sliderDescription = formValues.descBm;
    body[1].sliderImage.mediaId = formValues.imgBm;
    body[1].sliderSort = null;
    body[1].sliderActiveFlag = formValues.active;
    body[1].language.languageId = 2;

    console.log(body);

    // Update Slider Service
    this.commonservice.updateSlider(body).subscribe(
      data => {
        this.toastr.success('Slider update successful!', '');   
        this.router.navigate(['slider']);
      },
      error => {
        console.log("No Data")
      });
    }
    

  }

}
