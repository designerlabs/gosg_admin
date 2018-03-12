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
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  
  galleryData: Object;
  dataUrl: any;
  date = new Date();
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  galleryCode:any;
  galleryIdEn:any;
  galleryIdBm:any;

  titleEn: FormControl
  titleBm: FormControl
  descEn: FormControl
  descBm: FormControl
  imgEn: FormControl
  imgBm: FormControl
  active: FormControl
  copyImg: FormControl
  resetMsg = this.resetMsg;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  public loading = false;

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
       this.commonservice.readPortal('language/all').subscribe((data:any) => {
         let getLang = data.list;
         let myLangData =  getLang.filter(function(val) {
           if(val.languageCode == translate.currentLang){
             this.lang = val.languageCode;
             this.languageId = val.languageId;
             this.commonservice.getModuleId();
           }
         }.bind(this));
       })
     });
   });
   if(!this.languageId){
     this.languageId = localStorage.getItem('langID');
     this.commonservice.getModuleId();
   }

  

   /* LANGUAGE FUNC */}

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

    this.updateForm = new FormGroup({
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
      this.updateForm.get('active').setValue(true);
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
      this.updateForm.get('copyImg').setValue(true);
    } else {
      this.updateForm.get('copyImg').setValue(false);
    }
  }

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['gallery']);
  }

  back(){
    this.router.navigate(['gallery']);
  }

  // get, add, update, delete
  getRow(row) {

    this.loading = true;
    // Update gallery Service
    return this.http.get(this.appConfig.urlSlides + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {

        this.commonservice.errorHandling(Rdata, (function(){
        this.galleryData = Rdata;
        console.log(this.galleryData)
        console.log(this.appConfig.urlSlides + '/code/' + row)
        let dataEn = this.galleryData['list'][0];
        let dataBm = this.galleryData['list'][1];

        // populate data
        this.updateForm.get('titleEn').setValue(dataEn.slideTitle);
        this.updateForm.get('descEn').setValue(dataEn.slideDescription);
        this.updateForm.get('imgEn').setValue(parseInt(dataEn.slideImage));
        this.updateForm.get('titleBm').setValue(dataBm.slideTitle);
        this.updateForm.get('descBm').setValue(dataBm.slideDescription);
        this.updateForm.get('imgBm').setValue(parseInt(dataBm.slideImage));
        this.updateForm.get('active').setValue(dataEn.slideActiveFlag);
        this.galleryCode = dataEn.slideCode;
        this.galleryIdEn = dataEn.slideId;
        this.galleryIdBm = dataBm.slideId;
        
        this.isSameImg(dataEn.slideImage,dataBm.slideImage);

        this.checkReqValues();
      }).bind(this));
      this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      this.loading = false;       
    });
    
  }

  isChecked(e) {

    if (e.checked) {
      this.updateForm.get("imgBm").setValue(this.imgEn.value);
    } else {
      this.updateForm.get("imgBm").setValue("");
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
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    this.isSameImg(this.updateForm.get(imgEn).value,this.updateForm.get(imgBm).value);

      // console.log(nullPointers)

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  myFunction() {
    this.updateForm.reset();
    this.updateForm.get('active').setValue(true);
    this.checkReqValues();
  }

  updateGallery(formValues: any) {
    // console.log(this.viewSeq);
    // let galleryCode = Math.floor((Math.random() * 100) + 1);
    
    if(!this.isEdit) {

    let body = [
      {
        "galleryTitle": null,
        "galleryDescription": null,
        "galleryImage": null,
        "galleryCode": null,
        "gallerySort": null,
        "galleryActiveFlag": false,
        "language": {
          "languageId": null
        }
      }, 
      {
        "galleryTitle": null,
        "galleryDescription": null,
        "galleryImage": null,
        "galleryCode": null,
        "gallerySort": null,
        "galleryActiveFlag": false,
        "language": {
          "languageId": null
        }
      }
    ];
    
    // console.log(formValues)

    body[0].galleryTitle = formValues.titleEn;
    body[0].galleryDescription = formValues.descEn;
    body[0].galleryImage = formValues.imgEn;
    body[0].gallerySort = null;
    body[0].galleryActiveFlag = formValues.active;
    body[0].language.languageId = 1;

    body[1].galleryTitle = formValues.titleBm;
    body[1].galleryDescription = formValues.descBm;
    body[1].galleryImage = formValues.imgBm;
    body[1].gallerySort = null;
    body[1].galleryActiveFlag = formValues.active;
    body[1].language.languageId = 2;

    console.log(body)

    // Add gallery Service
    this.commonservice.addGallery(body).subscribe(
      data => {
        this.toastr.success('Gallery added successfully!', ''); 
        this.router.navigate(['gallery']);
      },
      error => {
        console.log("No Data")
      });

    } else {
      
    let body = [
      {
        "galleryId": null,
        "galleryTitle": null,
        "galleryDescription": null,
        "galleryImage": null,
        "galleryCode": null,
        "gallerySort": null,
        "galleryActiveFlag": false,
        "language": {
          "languageId": null
        }
      }, 
      {
        "galleryId": null,
        "galleryTitle": null,
        "galleryDescription": null,
        "galleryImage": null,
        "galleryCode": null,
        "gallerySort": null,
        "galleryActiveFlag": false,
        "language": {
          "languageId": null
        }
      }
    ];
      
    body[0].galleryCode = this.galleryCode;
    body[0].galleryId = this.galleryIdEn;
    body[0].galleryTitle = formValues.titleEn;
    body[0].galleryDescription = formValues.descEn;
    body[0].galleryImage = formValues.imgEn;
    body[0].gallerySort = null;
    body[0].galleryActiveFlag = formValues.active;
    body[0].language.languageId = 1;
    
    body[1].galleryCode = this.galleryCode;
    body[1].galleryId = this.galleryIdBm;
    body[1].galleryTitle = formValues.titleBm;
    body[1].galleryDescription = formValues.descBm;
    body[1].galleryImage = formValues.imgBm;
    body[1].gallerySort = null;
    body[1].galleryActiveFlag = formValues.active;
    body[1].language.languageId = 2;

    console.log(body);

    // Update gallery Service
    this.commonservice.updateGallery(body).subscribe(
      data => {
        this.toastr.success('Gallery update successful!', '');   
        this.router.navigate(['gallery']);
      },
      error => {
        console.log("No Data")
      });
    }
    

  }

}
