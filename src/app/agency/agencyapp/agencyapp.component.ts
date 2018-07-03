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
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';

@Component({
  selector: 'app-agencyapp',
  templateUrl: './agencyapp.component.html',
  styleUrls: ['./agencyapp.component.css']
})
export class AgencyappComponent implements OnInit {
  searchAgencyResultEn: string[];
  searchAgencyResultBm: string[];
  isActiveListEn: boolean;
  isActiveListBm: boolean;
  isActive: boolean;
  
  AgencyAppData: Object;
  AgencyData: Object;
  dataUrl: any;
  date = new Date();
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  isDocument: boolean;
  complete: boolean;
  pageMode: String;
  refCode:any;
  agencyAppIdEn:any;
  agencyAppIdBm:any;
  agencyIdEn:any;
  agencyIdBm:any;
  ministryNameEn:any;
  ministryNameBm:any;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  lang: any;

  agencyAppNameEn: FormControl
  agencyAppNameBm: FormControl
  descEn: FormControl
  descBm: FormControl
  agencyEn: FormControl
  agencyBm: FormControl
  websiteUrl: FormControl
  active: FormControl
  public loading = false;
  isDoc: FormControl
  resetMsg = this.resetMsg;
  
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;
  private subscriptionLangAll: ISubscription;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private router: Router,
    private navservice: NavService,
    private toastr: ToastrService
  ) { 
    
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
        // alert(this.languageId + ',' + this.localeVal)
      }
        if(this.navservice.flagLang){
          this.commonservice.getModuleId();
        }

    });

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();

    this.agencyAppNameEn = new FormControl()
    this.agencyAppNameBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.agencyEn = new FormControl()
    this.agencyBm = new FormControl()
    this.websiteUrl = new FormControl()
    this.isDoc = new FormControl()
    this.active = new FormControl()

    this.updateForm = new FormGroup({
      agencyAppNameEn: this.agencyAppNameEn,
      descEn: this.descEn,
      agencyAppNameBm: this.agencyAppNameBm,
      descBm: this.descBm,
      agencyEn: this.agencyEn,
      agencyBm: this.agencyBm,
      websiteUrl: this.websiteUrl,
      isDoc: this.isDoc,
      active: this.active
    });
    this.getAgency(this.languageId);

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
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngAfterViewInit() {
  }

  onScroll(event, lngId){

    // 
    if(event.target.scrollTop >= (event.target.scrollHeight - 250)) {
      // 
      // 

      let keywordVal;
      
      if(lngId == 1) {
        keywordVal = this.updateForm.get("agencyEn").value
        this.getSearchData(keywordVal, lngId, 1, this.searchAgencyResultEn.length+10)
        
      } else if(lngId == 2) {
        keywordVal = this.updateForm.get("agencyBm").value
        this.getSearchData(keywordVal, lngId, 1, this.searchAgencyResultBm.length+10)
        
      }
    }
  }

  back(){
    this.router.navigate(['agencyapp']);
  }

  // get, add, update, delete
  getRow(row) {
    
    // Update ErrorMsg Service
    this.loading = true;
    this.commonservice.readPortalById('agency/application/code/', row, this.languageId)
    .subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
        this.AgencyAppData = Rdata;
        // 
        
        let dataEn = this.AgencyAppData['agencyApplicationList'][0];
        let dataBm = this.AgencyAppData['agencyApplicationList'][1];

      // populate data
        this.updateForm.get('agencyAppNameEn').setValue(dataEn.agencyApplicationName);
        this.updateForm.get('descEn').setValue(dataEn.agencyApplicationDescription);
        this.updateForm.get('agencyAppNameBm').setValue(dataBm.agencyApplicationName);
        this.updateForm.get('descBm').setValue(dataBm.agencyApplicationDescription);
        this.updateForm.get('agencyEn').setValue(dataEn.agencyName);
        this.updateForm.get('agencyBm').setValue(dataBm.agencyName);
        this.updateForm.get('websiteUrl').setValue(dataBm.agencyApplicationUrl);
        this.updateForm.get('isDoc').setValue(dataBm.isDocument);
        this.updateForm.get('active').setValue(dataBm.enabled);
        this.refCode = dataEn.agencyApplicationCode;
        this.agencyAppIdEn = dataEn.agencyApplicationId;
        this.agencyAppIdBm = dataBm.agencyApplicationId;
        this.agencyIdEn = dataEn.agencyId;
        this.agencyIdBm = dataBm.agencyId;
        this.ministryNameEn = dataEn.ministryName;
        this.ministryNameBm = dataBm.ministryName;
        this.checkReqValues();
      }).bind(this));
      this.loading = false;
    }, err => {
      this.loading = false;
    });
    
  }

  getAgency(lng) {
    this.loading = true;
    this.commonservice.readPortal('agency/application/code', '', '', '', lng).subscribe(
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

    let selLangField;
      
    if(langId == 1) {
      selLangField = "agencyBm";
      this.ministryNameBm = "";
    } else {
      selLangField = "agencyEn";
      this.ministryNameEn = "";
    }
    this.updateForm.get(selLangField).setValue("");

    // if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      
      // 
      this.isActive = true;
      this.loading = true;
      this.commonservice.readPortal('agency/language/'+langId, count, page, keyword, langId).subscribe(
        data => {

        this.commonservice.errorHandling(data, (function(){

          

          if(data['agencyList'].length != 0) {
            if(langId == 1) {
              this.searchAgencyResultEn = data['agencyList'];
              this.isActiveListEn = true;
              this.isActiveListBm = false;
            } else {
              this.searchAgencyResultBm = data['agencyList'];
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
  
  getValue(aId,aName,mName, refCode, langId){

    if(langId == 1) {
      this.agencyEn = this.updateForm.get('agencyEn').value;
      this.isActiveListEn = false;
      this.searchAgencyResultEn = [''];
      this.updateForm.get('agencyEn').setValue(aName);
      this.agencyEn = aId;
      this.agencyIdEn = aId;
      this.ministryNameEn = mName;

    } else {
      this.agencyBm = this.updateForm.get('agencyBm').value;
      this.isActive = false;
      this.isActiveListBm = false;
      this.updateForm.get('agencyBm').setValue(aName);
      this.agencyBm = aId;
      this.agencyIdBm = aId;
      this.ministryNameBm = mName;

    }
    this.getAgencyByRefCode(refCode,langId);

    // 
  }

  // GET AGENCY NAME BY PAIRED LANGUAGE ID
  getAgencyByRefCode(refCode, langId) {

    let selLangField;
    let mName;
    let aName;
    let aId;

    if(langId == 1) {
      langId = 2;
      selLangField = "agencyBm";
    } else {
      langId = 1;
      selLangField = "agencyEn";
    }
    this.loading = true;
    this.commonservice.readPortalById('agency/refcode/language/'+langId+'/', refCode)
    .subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          
          

          mName = data['list'][0]['agencyMinistry']['ministryName'];
          aName = data['list'][0]['agencyName'];
          aId = data['list'][0]['agencyId'];
          
          this.updateForm.get(selLangField).setValue(aName);

          if(langId == 1) {
            this.agencyIdEn = aId;
            this.ministryNameEn = mName;
          } else {
            this.agencyIdBm = aId;
            this.ministryNameBm = mName;
          }
        }).bind(this));
        this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  checkReqValues() {

    let agencyAppNameEn = "agencyAppNameEn";
    let descEn = "descEn";
    let agencyAppNameBm = "agencyAppNameBm";
    let descBm = "descBm";
    let websiteUrl = "websiteUrl";
    let agencyEn = "agencyEn";
    let agencyBm = "agencyBm";

    let reqVal: any = [agencyAppNameEn, descEn, agencyAppNameBm, descBm, websiteUrl, agencyEn, agencyBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
        // this.checkAgencyVal()
      }
    }

      // 

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  checkAgencyVal() {
    let agc = this.updateForm.get('agency').value;
    if(agc == "" || agc == null) {
      this.ministryNameEn = "";
    }
  }

  myFunction() {  
    this.updateForm.reset();
    this.checkReqValues();
  }

  updateAgencyApp(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "agencyApplicationName": null,
        "agencyApplicationDescription": null,
        "isDocument": false,
        "agencyApplicationUrl": null,
        "enabled": null,
        "language": {
          "languageId": 1
        },
        "agencyId":  null
      }, 
      {
        "agencyApplicationName": null,
        "agencyApplicationDescription": null,
        "isDocument": false,
        "agencyApplicationUrl": null,
        "enabled": null,
        "language": {
          "languageId": 2
        },
        "agencyId":  null
      }
    ];
    
    // 

    body[0].agencyApplicationName = formValues.agencyAppNameEn;
    body[0].agencyApplicationDescription = formValues.descEn;
    body[0].isDocument = formValues.isDoc;
    body[0].enabled = formValues.active;
    body[0].agencyApplicationUrl = formValues.websiteUrl;
    body[0].agencyId = this.agencyIdEn;

    body[1].agencyApplicationName = formValues.agencyAppNameBm;
    body[1].agencyApplicationDescription = formValues.descBm;
    body[1].isDocument = formValues.isDoc;
    body[1].enabled = formValues.active;
    body[1].agencyApplicationUrl = formValues.websiteUrl;
    body[1].agencyId = this.agencyIdBm;

    

    // Add ErrorMsg Service
    this.loading = true;
    this.commonservice.create(body, 'agency/application/add').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
        this.router.navigate(['agencyapp']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;       
      });

    } else {

      
      
    let body = [
      {
        "agencyApplicationId": null,
        "agencyApplicationName": null,
        "agencyApplicationCode": null,
        "agencyApplicationDescription": null,
        "isDocument": false,
        "enabled": null,
        "agencyApplicationUrl": null,
        "language": {
          "languageId": 1
        },
        "agencyId":  null
      }, 
      {
        "agencyApplicationId": null,
        "agencyApplicationName": null,
        "agencyApplicationCode": null,
        "agencyApplicationDescription": null,
        "isDocument": false,
        "enabled": null,
        "agencyApplicationUrl": null,
        "language": {
          "languageId": 2
        },
        "agencyId":  null
      }
    ];
      
    body[0].agencyApplicationCode = this.refCode;
    body[0].agencyApplicationId = this.agencyAppIdEn;
    body[0].agencyApplicationName = formValues.agencyAppNameEn;
    body[0].agencyApplicationDescription = formValues.descEn;
    body[0].isDocument = formValues.isDoc;
    body[0].enabled = formValues.active;
    body[0].agencyApplicationUrl = formValues.websiteUrl;
    body[0].agencyId = this.agencyIdEn;
    
    body[1].agencyApplicationCode = this.refCode;
    body[1].agencyApplicationId = this.agencyAppIdBm;
    body[1].agencyApplicationName = formValues.agencyAppNameBm;
    body[1].agencyApplicationDescription = formValues.descBm;
    body[1].isDocument = formValues.isDoc;
    body[1].enabled = formValues.active;
    body[1].agencyApplicationUrl = formValues.websiteUrl;
    body[1].agencyId = this.agencyIdBm;

    

    // Update AgencyApp Service
    this.loading = true;
    this.commonservice.update(body, 'agency/application/update').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['agencyapp']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        this.loading = false;
      });
    }

  }

}
