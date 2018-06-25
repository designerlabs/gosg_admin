import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, OnDestroy } from '@angular/core';
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
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from './../../nav/nav.service';
// import { PatternValidator } from '@angular/forms';

@Component({
  selector: 'app-footercontent',
  templateUrl: './footercontent.component.html',
  styleUrls: ['./footercontent.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FootercontentComponent implements OnInit, OnDestroy {

  public loading = false;
  updateForm: FormGroup;

  patternAlphaOnly: string;

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
  public categoryData: any;

  public getCatValueEng: any;
  public getCatValueMy: any;
  public lang: any;
  public languageId: any;

  public getCatIdEn: any;
  public getCatIdBm: any;

  public getImgIdEn: any;
  public getImgIdBm: any;

  complete: boolean;

  public imageData: any;

  public imejEng: any;
  public imejMy: any;

  public flagErrIcon: any;

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;


  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  public commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService, private navservice: NavService,
  private dialogsService: DialogsService,
  private validateService: ValidateService) {

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
        this.commonservice.getModuleId();
      }

    });
    /* LANGUAGE FUNC */ 
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    //this.subscriptionContentCreator.unsubscribe();
    //this.subscriptionCategoryC.unsubscribe();
    //this.subscriptionRecordListC.unsubscribe();
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }
    
    this.commonservice.getModuleId();

    this.catEng = new FormControl();
    this.catMy = new FormControl();

    this.nameEng = new FormControl();
    this.descEng = new FormControl();
    // this.iconEng = new FormControl();
    this.iconEng = new FormControl('',[Validators.pattern(this.validateService.getPattern(0,10).alphaSpaceHyphen)]);
    this.imgEng = new FormControl();
    this.urlEng = new FormControl();
    this.seqEng = new FormControl();

    this.nameMy = new FormControl();
    this.descMy = new FormControl();
    // this.iconMy = new FormControl();
    this.iconMy = new FormControl('',[Validators.pattern(this.validateService.getPattern(0,10).alphaSpaceHyphen)]);
    this.imgMy = new FormControl();
    this.urlMy = new FormControl();
    this.seqMy = new FormControl();

    this.active = new FormControl();
    this.copyImg = new FormControl();
    this.getCat = new FormControl();


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

    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
    
  }

  

  getCategory(){
    this.loading = true;
    return this.commonservice.getFooterCategoryList()
     .subscribe(resCatData => {
        this.categoryData = resCatData;   
        // this.categoryDataMy = resCatData;  
        this.loading = false;     
      },
      Error => {
        this.loading = false;
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

      this.updateForm.get('catEng').setValue(this.getCatIdEn); 
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
      this.updateForm.get('catMy').setValue(this.getCatIdBm);
    }
  }

  getImageList(){

    this.loading = true;
    return this.commonservice.readProtected('media/category/name/Article','0','999999999','', this.languageId)
     .subscribe(resCatData => {
        this.imageData = resCatData['list'];   
        this.loading = false;    
      },
      Error => {
        this.loading = false;  
        console.log('Error in Footer');
     });
  }

  selectedImg(e, val){

    console.log(e);
    this.getImgIdEn = e.value;
    this.getImgIdBm = e.value;
    let dataList = this.imageData;
    let indexVal: any;
    let idBm: any;
    let idEn: any;

    console.log("EN: "+this.getImgIdEn+" BM: "+this.getImgIdBm + " value: " + val);

    if(val == 1){

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[0].mediaId;
        if(indexVal == this.getImgIdEn){
          idBm = dataList[i].list[1].mediaId;
        }        
      }

      this.updateForm.get('imgMy').setValue(idBm);  
    }
    else{

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[1].mediaId;
        if(indexVal == this.getImgIdBm){
          idEn = dataList[i].list[0].mediaId;
        }        
      }

      this.updateForm.get('imgEng').setValue(idEn); 
    }
  }

  validateCtrlChk(ctrl: FormControl) {
    // return ctrl.valid || ctrl.untouched
    return this.validateService.validateCtrl(ctrl);
  }

  copyIcon(type) {
    let elemOne = this.updateForm.get('iconEng');
    let elemTwo = this.updateForm.get('iconMy');

    if(type == 1)
      elemTwo.setValue(elemOne.value)
    else
      elemOne.setValue(elemTwo.value)
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
    
    this.getCategory();
    this.loading = true;
    this.commonservice.readProtectedById('footercontent/', _getRefID, this.languageId)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
        this.recordList = data;

        console.log(data);

        this.updateForm.get('catEng').setValue(this.recordList.list[0].footer.name);
        this.updateForm.get('catMy').setValue(this.recordList.list[0].footer.name);

        this.updateForm.get('nameEng').setValue(this.recordList.list[0].name);
        this.updateForm.get('descEng').setValue(this.recordList.list[0].description);
        this.updateForm.get('iconEng').setValue(this.recordList.list[0].icon);
        this.updateForm.get('imgEng').setValue(parseInt(this.recordList.list[0].mediaId));
        // this.updateForm.get('imgEng').setValue(this.recordList.list[0].image);
        this.updateForm.get('urlEng').setValue(this.recordList.list[0].url);
        this.updateForm.get('seqEng').setValue(this.recordList.list[0].sortingOrder);

        this.updateForm.get('active').setValue(this.recordList.list[0].enabled);
        // this.updateForm.get('copyImg').setValue(this.recordList.list[0].faqActiveFlag);
        // this.updateForm.get('isSameImg').setValue(this.recordList.list[0].faqActiveFlag);

        this.updateForm.get('nameMy').setValue(this.recordList.list[1].name);
        this.updateForm.get('descMy').setValue(this.recordList.list[1].description);
        this.updateForm.get('iconMy').setValue(this.recordList.list[1].icon);
        this.updateForm.get('imgMy').setValue(parseInt(this.recordList.list[1].mediaId));
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
        this.getContentCodeMy = this.recordList.list[1].contentCode;
        this.getFooterNameMy = this.recordList.list[1].footer.name;
        this.getFooterIdMy = this.recordList.list[1].footer.id;

        // this.isSameImg(this.recordList.list[0].image,this.recordList.list[1].image);

        this.checkReqValues();
      }).bind(this));   
      this.loading = false;
    },
    error => {

      this.loading = false;
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
          // "contentCode": null,
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
          // "contentCode": null,
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
      // body[0].contentCode = this.getContentCodeEng;
      body[0].language.languageId = 1;
      body[0].mediaId = formValues.imgEng;
      body[0].enabled = formValues.active;
      body[0].sortingOrder = formValues.seqEng;
      body[0].footer.id = formValues.catEng;
      // body[0].footer.id = 1;
      // body[0].footer.name = this.getFooterNameEng;

      // body[1].id = this.getIdMy;
      body[1].name = formValues.nameMy;
      body[1].description = formValues.descMy;
      body[1].url = formValues.urlMy;
      body[1].icon = formValues.iconMy;
      // body[1].contentCode = this.getContentCodeMy;
      body[1].language.languageId = 2;
      body[1].mediaId = formValues.imgMy;
      body[1].enabled = formValues.active;
      body[1].sortingOrder = formValues.seqMy;
      body[1].footer.id = formValues.catMy;
      // body[1].footer.id = 1;
      // body[1].footer.name = this.getFooterNameMy;

      console.log(body);

      this.loading = true;

      this.commonservice.create(body,'footercontent').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['footer/footercontent']);
          }).bind(this));   
          this.loading = false;
        },
        error => {

          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          console.log(error);

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
      this.loading = true;

      this.commonservice.update(body,'footercontent').subscribe(
        data => {

          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['footer/footercontent']);
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
  }

}


