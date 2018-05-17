import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-digitalservicedetails',
  templateUrl: './digitalservicedetails.component.html',
  styleUrls: ['./digitalservicedetails.component.css']
})
export class DigitalservicedetailsComponent implements OnInit {
  
  refCode: any;
  serviceCode: any;
  categoryIdBm: any;
  categoryIdEn: any;
  idBm: any;
  idEn: any;
  isActive: boolean;
  date = new Date();
  dateFormatExample = "dd/mm/yyyy h:i:s";
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  isActiveListBm: boolean;
  isActiveListEn: boolean;
  searchCategoryResultBm: string[];
  searchCategoryResultEn: string[];
  fileData = [];
  mediaTypes: any;
  public loading = false;
  getManualIdEn: any;
  getManualIdBm: any;
  selectedFileEn = '';
  selectedFileMy = '';
  mediaPath = '';

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;

  categoryBm: FormControl;
  categoryEn: FormControl;
  titleBm: FormControl;
  titleEn: FormControl;
  descBm: FormControl;
  descEn: FormControl;
  serviceUrl: FormControl;
  forCitizen: FormControl;
  forNonCitizen: FormControl;
  active: FormControl;
  manualEn: FormControl
  manualBm: FormControl

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
       this.commonservice.readPortal('language/all').subscribe((data:any) => {
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

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    this.titleEn = new FormControl()
    this.titleBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.serviceUrl = new FormControl()
    this.categoryEn = new FormControl()
    this.categoryBm = new FormControl()
    this.forCitizen = new FormControl()
    this.forNonCitizen = new FormControl()
    this.manualEn = new FormControl()
    this.manualBm = new FormControl()
    this.active = new FormControl()

    this.updateForm = new FormGroup({
      titleEn: this.titleEn,
      descEn: this.descEn,
      serviceUrl: this.serviceUrl,
      titleBm: this.titleBm,
      descBm: this.descBm,
      categoryEn: this.categoryEn,
      categoryBm: this.categoryBm,
      manualEn: this.manualEn,
      manualBm: this.manualBm,
      forCitizen: this.forCitizen,
      forNonCitizen: this.forNonCitizen,
      active: this.active
    });
    this.getDigitalServices();

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = 'common.add';
    } else {
      this.isEdit = true;
      this.pageMode = 'common.update';
      this.getRow(refCode);
    }
    
    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }

    this.getFileList()
  }

  ngAfterViewInit() {
  }

  back(){
    this.router.navigate(['digitalservicedetails']);
  }

  // get, add, update, delete
  getRow(row) {
    
    // Update ErrorMsg Service
    this.loading = true;
    this.commonservice.readProtectedById('digitalservice/details/', row)
    .subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
        this.dsData = Rdata;
        // console.log(JSON.stringify(this.dsData))
        console.log(this.dsData)
        let dataEn = this.dsData['list'][0];
        let dataBm = this.dsData['list'][1];

      // populate data
        this.updateForm.get('titleEn').setValue(dataEn.title);
        this.updateForm.get('serviceUrl').setValue(dataEn.url);
        this.updateForm.get('titleBm').setValue(dataBm.title);
        this.updateForm.get('categoryEn').setValue(dataEn.service.title);
        this.updateForm.get('categoryBm').setValue(dataBm.service.title);
        this.updateForm.get('descEn').setValue(dataEn.description);
        this.updateForm.get('descBm').setValue(dataBm.description);
        this.updateForm.get('manualEn').setValue(dataEn.manual.mediaId);
        this.updateForm.get('manualBm').setValue(dataBm.manual.mediaId);
        this.updateForm.get('forCitizen').setValue(dataEn.citizen);
        this.updateForm.get('forNonCitizen').setValue(dataBm.nonCitizen);
        this.updateForm.get('active').setValue(dataBm.enabled);
        this.refCode = dataEn.code;
        this.idEn = dataEn.id;
        this.idBm = dataBm.id;
        this.categoryIdEn = dataEn.service.id;
        this.categoryIdBm = dataBm.service.id;
            
        // this.forCitizen = dataEn.citizen;
        // this.forNonCitizen = dataEn.nonCitizen;
        
        this.checkReqValues();
      }).bind(this));
      this.loading = false;
    }, err => {
      this.loading = false;
    });
    
  }

  resetSearch() {
    this.updateForm.get('categoryEn').setValue('');
    this.updateForm.get('categoryBm').setValue('');
    this.isActiveListEn = false;
    this.isActiveListBm = false;
    // this.getModuleData(this.pageCount, this.pageSize);
  }

  onScroll(event, lngId){

    // console.log(event.target.scrollHeight+' - '+event.target.scrollTop +  'Required scroll bottom ' +(event.target.scrollHeight - 250) +' Container height: 250px');
    if(event.target.scrollTop >= (event.target.scrollHeight - 250)) {
      // console.log(this.searchCategoryResultEn.length)
      console.log(event)

      let keywordVal;
      
      if(lngId == 1) {
        keywordVal = this.updateForm.get("categoryEn").value
        this.getSearchData(keywordVal, lngId, 1, this.searchCategoryResultEn.length+10)
        console.log(this.searchCategoryResultEn)
      } else if(lngId == 2) {
        keywordVal = this.updateForm.get("categoryBm").value
        this.getSearchData(keywordVal, lngId, 1, this.searchCategoryResultBm.length+10)
        console.log(this.searchCategoryResultBm)
      }
    }
  }

  getDigitalServices() {
    this.loading = true;
    this.commonservice.readProtected('digitalservice/details').subscribe(
        Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
            this.AgencyData = Rdata['list'];
        }).bind(this));
          this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  getSearchData(keyword, langId, count, page){

    this.searchCategoryResultEn = []
    this.searchCategoryResultBm = []
    let selLangField;

    if(langId == 1) {
      selLangField = "categoryBm";
      // this.ministrytitleBm = "";
    } else {
      selLangField = "categoryEn";
      // this.ministrytitleEn = "";
    }
    this.updateForm.get(selLangField).setValue("");

    // if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      // console.log(keyword)
      // console.log(keyword.length)
      this.isActive = true;
      this.loading = true;
      
      this.commonservice.readProtected('digitalservice/language/'+langId, count, page, keyword).subscribe(
        data => {

        this.commonservice.errorHandling(data, (function(){

          console.log(data['list'].length)
          console.log(data['list'])

          if(data['list'].length != 0) {
            if(langId == 1) {
              this.searchCategoryResultEn = data['list'];
              this.isActiveListEn = true;
              this.isActiveListBm = false;
            } else {
              this.searchCategoryResultBm = data['list'];
              this.isActiveListBm = true;
              this.isActiveListEn = false;
            }
          }
        }).bind(this));
          this.loading = false;
      },err => {
        this.loading = false;
      });
    // } else {
    //   this.isActiveListEn = false;
    //   this.isActiveListBm = false;
    // }
  }
  
  getValue(dsId,dsName, refCode, langId){

    if(langId == 1) {
      this.categoryEn = this.updateForm.get('categoryEn').value;
      this.isActiveListEn = false;
      this.searchCategoryResultEn = [''];
      this.updateForm.get('categoryEn').setValue(dsName);
      // this.categoryEn = dsId;
      this.categoryIdEn = dsId;
      // this.ministrytitleEn = mName;

    } else {
      this.categoryBm = this.updateForm.get('categoryBm').value;
      this.isActive = false;
      this.isActiveListBm = false;
      this.updateForm.get('categoryBm').setValue(dsName);
      // this.categoryBm = dsId;
      this.categoryIdBm = dsId;
      // this.ministrytitleBm = mName;

    }
    this.getDigitalServicesByRefCode(refCode,langId);

    // console.log(mName)
  }

  // GET AGENCY NAME BY PAIRED LANGUAGE ID
  getDigitalServicesByRefCode(refCode, langId) {

    let selLangField;
    let mName;
    let dsName;
    let dsId;

    if(langId == 1) {
      langId = 2;
      selLangField = "categoryBm";
    } else {
      langId = 1;
      selLangField = "categoryEn";
    }
    this.loading = true;
    this.commonservice.readProtectedById('digitalservice/refcode/language/'+langId+'/', refCode)
    .subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          // console.log('refCode Data');
          console.log(data);

          dsName = data['object'].title;
          dsId = data['object'].id;
          
          this.updateForm.get(selLangField).setValue(dsName);

          if(langId == 1) {
            this.categoryIdEn = dsId;
          } else {
            this.categoryIdBm = dsId;
          }
          this.checkReqValues();
        }).bind(this));
        this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
    
  selectedImg(e, val){
  
    this.getManualIdEn = e.value;
    this.getManualIdBm = e.value;
    let dataList = this.fileData;
    let indexVal: any;
    let idBm: any;
    let idEn: any;

    if(val == 1){

      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[0].mediaId;
        if(indexVal == this.getManualIdEn){
          idBm = dataList[i].list[1].mediaId;
          this.selectedFileEn=dataList[i].list[0].mediaFile;
          this.selectedFileMy=dataList[i].list[1].mediaFile;
        }        
      }
      this.updateForm.get('manualBm').setValue(idBm);  
    }
    else{
      for(let i=0; i<dataList.length; i++){
        indexVal = dataList[i].list[1].mediaId;
        if(indexVal == this.getManualIdBm){
          idEn = dataList[i].list[0].mediaId;
          this.selectedFileEn=dataList[i].list[0].mediaFile;
          this.selectedFileMy=dataList[i].list[1].mediaFile;
        }        
      }
      this.updateForm.get('manualEn').setValue(idEn); 
    }
    this.checkReqValues();
  }

  getFileList() {
   
    this.loading = true;
    return this.commonservice.readProtected('media/category/name/Digital-Services', '0', '999999999')
      .subscribe(resCatData => {

        console.log(resCatData)
        this.commonservice.errorHandling(resCatData, (function () {
            this.fileData = resCatData['list'].filter(fData=>fData.list[0].mediaTypeId == 1);

            if(this.fileData.length>0){
              this.contentCategoryIdEn = this.fileData[0].list[0];
              this.contentCategoryIdMy = this.fileData[0].list[1];
            }
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });
  }

  checkReqValues() {

    let titleEn = "titleEn";
    let titleBm = "titleBm";
    let categoryEn = "categoryEn";
    let categoryBm = "categoryBm";
    let descEn = "descEn";
    let descBm = "descBm";
    let forCitizen = "forCitizen";
    let forNonCitizen = "forNonCitizen";
    let serviceUrl = "serviceUrl";

    let reqVal: any = [titleEn, serviceUrl, titleBm, categoryEn, categoryBm, descEn, descBm, forCitizen, forNonCitizen];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

      // console.log(nullPointers)

    if (nullPointers.length > 0 && serviceUrl.length < 5) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  myFunction() {  
    this.updateForm.reset();
    this.checkReqValues();
  }

  updateAction(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "title": null,
        "url": null,
        "enabled": null,
        "description": null,
        "citizen": null,
        "nonCitizen": null,
        "language": {
          "languageId": 1
        },
        "service":{
          "id":  null
        },
        "manual": {
          "mediaId": null
        }
      }, 
      {
        "title": null,
        "url": null,
        "enabled": null,
        "description": null,
        "citizen": null,
        "nonCitizen": null,
        "language": {
          "languageId": 2
        },
        "service":{
          "id":  null
        },
        "manual": {
          "mediaId": null
        }
      }
    ];
    
    // console.log(formValues) , 

    body[0].title = formValues.titleEn;
    body[0].url = formValues.serviceUrl;
    body[0].description = formValues.descEn;
    body[0].citizen = formValues.forCitizen;
    body[0].nonCitizen = formValues.forNonCitizen;
    body[0].service.id = this.categoryIdEn;
    body[0].manual.mediaId = formValues.manualEn;
    body[0].enabled = formValues.active;
    
    body[1].title = formValues.titleBm;
    body[1].url = formValues.serviceUrl;
    body[1].description = formValues.descBm;
    body[1].citizen = formValues.forCitizen;
    body[1].nonCitizen = formValues.forNonCitizen;
    body[1].service.id = this.categoryIdBm;
    body[1].manual.mediaId = formValues.manualBm;
    body[1].enabled = formValues.active;

    console.log(body)

    // Add ErrorMsg Service
    this.loading = true;
    this.commonservice.create(body, 'digitalservice/details').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
        this.router.navigate(['digitalservicedetails']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;       
      });

    } else {

      console.log(this.refCode)
      
    let body = [
      {
        "id":  null,
        "code":  null,
        "title": null,
        "url": null,
        "description": null,
        "citizen": null,
        "nonCitizen": null,
        "enabled": null,
        "language": {
          "languageId": 1
        },
        "service":{
          "id":  null
        },
        "manual": {
          "mediaId": null
        }
      }, 
      {
        "id":  null,
        "code":  null,
        "title": null,
        "url": null,
        "description": null,
        "citizen": null,
        "nonCitizen": null,
        "enabled": null,
        "language": {
          "languageId": 2
        },
        "service":{
          "id":  null
        },
        "manual": {
          "mediaId": null
        }
      }
    ];
      
    body[0].id = this.idEn;
    body[0].code = this.refCode;
    body[0].title = formValues.titleEn;
    body[0].url = formValues.serviceUrl;
    body[0].description = formValues.descEn;
    body[0].citizen = formValues.forCitizen;
    body[0].nonCitizen = formValues.forNonCitizen;
    body[0].service.id = this.categoryIdEn;
    body[0].manual.mediaId = formValues.manualEn;
    body[0].enabled = formValues.active;
    
    body[1].id = this.idBm;
    body[1].code = this.refCode;
    body[1].title = formValues.titleBm;
    body[1].url = formValues.serviceUrl;
    body[1].description = formValues.descBm;
    body[1].citizen = formValues.forCitizen;
    body[1].nonCitizen = formValues.forNonCitizen;
    body[1].service.id = this.categoryIdBm;
    body[1].manual.mediaId = formValues.manualBm;
    body[1].enabled = formValues.active;

    console.log(body);

    // Update AgencyApp Service
    this.loading = true;
    this.commonservice.update(body, 'digitalservice/details').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['digitalservicedetails']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        this.loading = false;
      });
    }

  }

}
