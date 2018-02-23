// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-footercontent',
//   templateUrl: './footercontent.component.html',
//   styleUrls: ['./footercontent.component.css']
// })
// export class FootercontentComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }




import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from './../../dialogs/dialogs.service';
import { ValidateService } from '../../common/validate.service';

@Component({
  selector: 'app-footercontent',
  templateUrl: './footercontent.component.html',
  styleUrls: ['./footercontent.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FootercontentComponent implements OnInit {

  updateForm: FormGroup;

  public catEng: FormControl;
  public catMy: FormControl;
  
  public nameEng: FormControl;
  public descEng: FormControl;
  public iconEng: FormControl;
  public imgEng: FormControl;
  public urlEng: FormControl;
  public seqEng: FormControl;
  public getIdEng: any;
  public getContentCodeEng: any; 
  public getFooterNameEng: any; 
  public getFooterIdEng: any;


  public nameMy: FormControl;
  public descMy: FormControl;
  public iconMy: FormControl;
  public imgMy: FormControl;
  public urlMy: FormControl;
  public seqMy: FormControl;
  public getIdMy: any;
  public getContentCodeMy: any; 
  public getFooterNameMy: any; 
  public getFooterIdMy: any;

  public active: FormControl;
  public copyImg: FormControl;  
  public getCat: FormControl;
  public getRefCode: any;

  public dataUrl: any;  
  public recordList: any;
  public resCatData: any;
  // public category: any;
  public categoryData: any;
  // public categoryDataEng: any;
  // public categoryDataMy: any;

  public getCatValueEng: any;
  public getCatValueMy: any;
  public languageId: any;

  public getCatIdEn: any;
  public getCatIdBm: any;

  complete: boolean;

  public imageDataEng: any;
  public imageDataMy: any;

  public imejEng: any;
  public imejMy: any;

  // patternIconEng: string;

  // public selectedImgMy = 'Sila Pilih';
  // public selectedImgEng = 'Please Select';

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService,
  private dialogsService: DialogsService,
  private validateService: ValidateService) {
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              // this.getData();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      // this.getData();
    }
   }

  ngOnInit() {

    this.catEng = new FormControl();
    this.catMy = new FormControl();

    this.nameEng = new FormControl();
    this.descEng = new FormControl();
    this.iconEng = new FormControl();
    // this.iconEng = new FormControl('', [Validators.pattern(this.validateService.getPattern().alphaOnly)]);
    this.imgEng = new FormControl();
    this.urlEng = new FormControl();
    this.seqEng = new FormControl();

    this.nameMy = new FormControl();
    this.descMy = new FormControl();
    this.iconMy = new FormControl();
    this.imgMy = new FormControl();
    this.urlMy = new FormControl();
    this.seqMy = new FormControl();

    this.active = new FormControl();
    this.copyImg = new FormControl();
    this.getCat = new FormControl();

    // this.patternIconEng = this.validateService.getPattern().alphaOnly;

    this.getCategory();
    this.getImageList();

    this.updateForm = new FormGroup({   

      catEng: this.catEng,
      catMy: this.catMy,

      nameEng: this.nameEng,
      descEng: this.descEng,
      iconEng: this.iconEng,
      imgEng: this.imgEng,
      urlEng: this.urlEng,
      seqEng: this.seqEng,

      nameMy: this.nameMy,
      descMy: this.descMy,
      iconMy: this.iconMy,
      imgMy: this.imgMy,
      urlMy: this.urlMy,
      seqMy: this.seqMy,

      active: this.active,
      copyImg: this.copyImg,

      

      
    });     
    
    let urlEdit = this.router.url.split('/')[3];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }

    // this.isSameImg(this.imgEng,this.imgMy);
    
  }

  validateCtrlChk(ctrl: FormControl) {
    // return ctrl.valid || ctrl.untouched
    return this.validateService.validateCtrl(ctrl);
}

  getCategory(){
    return this.commonservice.getFooterCategoryList()
     .subscribe(resCatData => {
        this.categoryData = resCatData;   
        // this.categoryDataMy = resCatData;       
      },
      Error => {
      //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
      console.log('Error in State');
     });
  }

  


  selectedCat(e, val){

    console.log(e);
    this.getCatIdEn = e.value;
    this.getCatIdBm = e.value;
    let dataList = this.categoryData;
    let indexVal: any;
    let idBm: any;
    let idEn: any;

    console.log("EN: "+this.getCatIdEn+" BM: "+this.getCatIdBm + " value: " +val);

    if(val == 1){

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[0].id;
        if(indexVal == this.getCatIdEn){
          idBm = dataList[i].list[1].id;
        }        
      }

      this.updateForm.get('catMy').setValue(idBm);  
    }
    else{

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[1].id;
        if(indexVal == this.getCatIdBm){
          idEn = dataList[i].list[0].id;
        }        
      }

      this.updateForm.get('catEng').setValue(idEn); 
    }
  }

  getImageList(){
    return this.commonservice.getImageList()
     .subscribe(resCatData => {
        this.imageDataEng = resCatData.list;   
        this.imageDataMy = resCatData.list;      
      },
      Error => {
      //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
      console.log('Error in State');
     });
  }

  selectedImg(e, val){
    console.log(e);

    if(val == 1){
      this.imgEng = e.value;
    }
    else{
      this.imgMy = e.value;
    }

    this.isSameImg(this.updateForm.controls.imgEng.value,this.updateForm.controls.imgMy.value);

    // if(this.imgEng != null && this.imgEng == this.imgMy) {
    //   this.updateForm.get('copyImg').setValue(true);
    // } else {
    //   this.updateForm.get('copyImg').setValue(false);
    // }
    
  }

  isSameImg(imgEng,imgMy) {

    console.log(imgEng)
    if(imgEng != null && imgEng == imgMy) {
      this.updateForm.get('copyImg').setValue(true);
    } else {
      this.updateForm.get('copyImg').setValue(false);
    }
  }

  isChecked(e, imgEng) {

    // if (e.checked) {
    //   this.updateForm.get("imgMy").setValue(this.imgEng);
    // } else {
    //   this.updateForm.get("imgMy").setValue("");
    // }
    // this.copyImg = e.checked;

    // this.checkReqValues();

    if (e.checked) {
      
      if(this.updateForm.controls.imgEng.value == null || this.updateForm.controls.imgEng.value == undefined){
        this.updateForm.get("imgMy").setValue("");
        this.updateForm.get('copyImg').setValue(false);
      }
      else
        {
          // this.selectedImg(this.imgEng, 1);
          // this.updateForm.get("imgMy").setValue(this.imgEng);
          this.updateForm.get('copyImg').setValue(true);
          this.updateForm.get("imgMy").setValue(this.updateForm.controls.imgEng.value);
        } 
      
    } else {
      this.updateForm.get("imgMy").setValue("");
      this.updateForm.get('copyImg').setValue(false);
    }
  }

  copyIcon(type) {
    let elemOne = this.updateForm.get('iconEng');
    let elemTwo = this.updateForm.get('iconMy');

    if(type == 1)
      elemTwo.setValue(elemOne.value)
    else
      elemOne.setValue(elemTwo.value)
      
    this.onlyAlpha(elemOne)
    this.onlyAlpha(elemTwo)

  }

  onlyAlpha(text)
  {
    if(text.value !== text){
      text.value = text.value.replace(/[^a-zA-Z]/g, '');
    return true;
    }
    else{
      return false;
    }
    
  }


  copyValue(type) {
    let elemOne = this.updateForm.get('seqEng');
    let elemTwo = this.updateForm.get('seqMy');

    if(type == 1)
      elemTwo.setValue(elemOne.value)
    else
      elemOne.setValue(elemTwo.value)
      
    this.stripspaces(elemOne)
    this.stripspaces(elemTwo)

  }

  stripspaces(input)
  {
    if(input.value != null){
      let word = input.value.toString();
    input.value = word.replace(/\s/gi,"");
    return true;
    }
    else{
      return false;
    }
    
  }
  

  getData() {

    let _getRefID = this.router.url.split('/')[3];
    // this.appConfig.urlRaceList
    this.dataUrl = this.appConfig.urlFooterContent + '/' +  _getRefID + "?language=" + this.languageId;

    this.getCategory();

    this.http.get(this.dataUrl)
    .subscribe(data => {
      // this.commonservice.errorHandling(data, (function(){
      this.recordList = data;

      console.log(data);

      this.updateForm.get('catEng').setValue(this.recordList.list[0].footer.name);
      this.updateForm.get('catMy').setValue(this.recordList.list[0].footer.name);

      this.updateForm.get('nameEng').setValue(this.recordList.list[0].name);
      this.updateForm.get('descEng').setValue(this.recordList.list[0].description);
      this.updateForm.get('iconEng').setValue(this.recordList.list[0].icon);
      this.updateForm.get('imgEng').setValue(parseInt(this.recordList.list[0].image.mediaId));
      // this.updateForm.get('imgEng').setValue(this.recordList.list[0].image);
      this.updateForm.get('urlEng').setValue(this.recordList.list[0].url);
      this.updateForm.get('seqEng').setValue(this.recordList.list[0].sortingOrder);

      this.updateForm.get('active').setValue(this.recordList.list[0].enabled);
      // this.updateForm.get('copyImg').setValue(this.recordList.list[0].faqActiveFlag);
      // this.updateForm.get('isSameImg').setValue(this.recordList.list[0].faqActiveFlag);

      this.updateForm.get('nameMy').setValue(this.recordList.list[1].name);
      this.updateForm.get('descMy').setValue(this.recordList.list[1].description);
      this.updateForm.get('iconMy').setValue(this.recordList.list[1].icon);
      this.updateForm.get('imgMy').setValue(parseInt(this.recordList.list[1].image.mediaId));
      // this.updateForm.get('imgMy').setValue(this.recordList.list[1].image);
      this.updateForm.get('urlMy').setValue(this.recordList.list[1].url);
      this.updateForm.get('seqMy').setValue(this.recordList.list[1].sortingOrder);
      
      this.getRefCode = this. recordList.refCode;
      this.getCatValueEng = this.recordList.list[0].footer.name;
      this.getCatValueMy = this.recordList.list[1].footer.name;

      this.getIdEng = this.recordList.list[0].id;
      this.getContentCodeEng = this.recordList.list[0].contentCode;
      this.getFooterNameEng = this.recordList.list[0].footer.name;
      this.getFooterIdEng = this.recordList.list[0].footer.id;


      this.getIdMy = this.recordList.list[1].id;
      this.getContentCodeMy = this.recordList.list[0].contentCode;
      this.getFooterNameMy = this.recordList.list[0].footer.name;
      this.getFooterIdMy = this.recordList.list[0].footer.id;

      this.isSameImg(this.recordList.list[0].image,this.recordList.list[1].image);

      this.checkReqValues();
      // }).bind(this));   
    },
    error => {

        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        console.log(error);

    });
  }

  back(){
    this.router.navigate(['footer/footercontent']);
  }

  submit(formValues: any) {
    
    let flag = false;
    let txt = "";

    if(formValues.active == null){
      flag = false;
    }

    else{
      flag = formValues.active;
    }

    let urlEdit = this.router.url.split('/')[3];

    // add form
    if(urlEdit === 'add'){

      let body = [
        {
          // "id": null,
          "name": null,
          "description": null,
          "url": null,
          "icon": null,
          "contentCode": null,
          "language": {
              "languageId": null
          },
          "mediaId": null,
          "enabled": false,
          "sortingOrder": 0.0,
          "footer": {
              "id": null
              // "name": null,
          },
        },
        {
          // "id": null,
          "name": null,
          "description": null,
          "url": null,
          "icon": null,
          "contentCode": null,
          "language": {
              "languageId": null
          },
          "mediaId": null,
          "enabled": false,
          "sortingOrder": 0.0,
          "footer": {
              "id": null
              // "name": null,
          },
        }
      ]   

      // body[0].id = this.getIdEng;
      body[0].name = formValues.nameEng;
      body[0].description = formValues.descEng;
      body[0].url = formValues.urlEng;
      body[0].icon = formValues.iconEng;
      body[0].contentCode = this.getContentCodeEng;
      body[0].language.languageId = 1;
      body[0].mediaId = formValues.imgEng;
      body[0].enabled = formValues.active;
      body[0].sortingOrder = formValues.seqEng;
      body[0].footer.id = this.getCatIdEn;
      // body[0].footer.id = 1;
      // body[0].footer.name = this.getFooterNameEng;

      // body[1].id = this.getIdMy;
      body[1].name = formValues.nameMy;
      body[1].description = formValues.descMy;
      body[1].url = formValues.urlMy;
      body[1].icon = formValues.iconMy;
      body[1].contentCode = this.getContentCodeMy;
      body[1].language.languageId = 2;
      body[1].mediaId = formValues.imgMy;
      body[1].enabled = formValues.active;
      body[1].sortingOrder = formValues.seqMy;
      body[1].footer.id = this.getCatIdBm;
      // body[1].footer.id = 1;
      // body[1].footer.name = this.getFooterNameMy;

      console.log(body);

      this.commonservice.addFooterContent(body).subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['footer/footercontent']);
          }).bind(this));   
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          console.log(error);

        //   console.log(JSON.stringify(body))
        //   console.log(body)
        //   // alert('Record added successfully!')

        //   let txt = "Record added successfully!";
        //   this.toastr.success(txt, '');  

        //   this.router.navigate(['footer/footercontent']);
        //   // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        // },
        // error => {
        //   console.log("No Data")
        //   // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }

    // update form
    else{

      let body = [
        {
          "id": null,
          "name": null,
          "description": null,
          "url": null,
          "icon": null,
          "contentCode": null,
          "language": {
              "languageId": null
          },
          "mediaId": null,
          "enabled": false,
          "sortingOrder": 0.0,
          "footer": {
              "id": null,
              // "name": null,
          },
        },
        {
          "id": null,
          "name": null,
          "description": null,
          "url": null,
          "icon": null,
          "contentCode": null,
          "language": {
              "languageId": null
          },
          "mediaId": null,
          "enabled": false,
          "sortingOrder": 0.0,
          "footer": {
              "id": null
              // "name": null,
          },
        }
      ]   
 
      body[0].id = this.getIdEng;
      body[0].name = formValues.nameEng;
      body[0].description = formValues.descEng;
      body[0].url = formValues.urlEng;
      body[0].icon = formValues.iconEng;
      body[0].contentCode = this.getContentCodeEng;
      body[0].language.languageId = 1;
      body[0].mediaId = formValues.imgEng;
      body[0].enabled = formValues.active;
      body[0].sortingOrder = formValues.seqEng;
      body[0].footer.id = this.getFooterIdEng;
      // body[0].footer.id = 1;
      // body[0].footer.name = this.getFooterNameEng;

      body[1].id = this.getIdMy;
      body[1].name = formValues.nameMy;
      body[1].description = formValues.descMy;
      body[1].url = formValues.urlMy;
      body[1].icon = formValues.iconMy;
      body[1].contentCode = this.getContentCodeMy;
      body[1].language.languageId = 2;
      body[1].mediaId = formValues.imgMy;
      body[1].enabled = formValues.active;
      body[1].sortingOrder = formValues.seqMy;
      body[1].footer.id = this.getFooterIdMy;
      // body[1].footer.id = 1;
      // body[1].footer.name = this.getFooterNameMy;

      console.log(body);

      this.commonservice.updateFooterContent(body).subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['footer/footercontent']);
          }).bind(this));   
        },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          console.log(error);

        //   console.log(JSON.stringify(body))
        //   console.log(body)
        //   // alert('Record updated successfully!')

        //   let txt = "Record updated successfully!";
        //   this.toastr.success(txt, ''); 

        //   this.router.navigate(['footer/footercontent']);
        //   // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        // },
        // error => {
        //   console.log("No Data")
        //   // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["nameEng", "nameMy"];
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

    // var txt;
    // var r = confirm("Are you sure to reset the form?");
    // if (r == true) {
    //     txt = "You pressed OK!";
    //     this.toastr.success(txt, ''); 
    //     this.updateForm.reset();
    //     this.checkReqValues();
    // } else {
    //     txt = "You pressed Cancel!";
    //     this.toastr.success(txt, '');
    // }
  }

  // getCategory(){
  //   return this.commonservice.getFooterCategoryList()
  //    .subscribe(resCatData => {
  //       this.getCat = resCatData.list;        
  //     },
  //     Error => {
  //     //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
  //     console.log('Error in State');
  //    });
  // }

  // selectedCat(e){
  //   // this.getPostData = '';
  //   // this.selStateInfo = e;
  //   if(e){
  //     return this.commonservice.getCitiesbyState(e.value.stateId)
  //     .subscribe(resCityData => {
  //       this.getCityData = resCityData;          
  //     },
  //     Error => {
  //   //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');      
  //   console.log('Error in City');      
  //    });
  //   }
  // }

}


