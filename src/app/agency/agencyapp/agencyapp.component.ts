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
  selector: 'app-agencyapp',
  templateUrl: './agencyapp.component.html',
  styleUrls: ['./agencyapp.component.css']
})
export class AgencyappComponent implements OnInit {
  searchAgencyResultEn: Object;
  searchAgencyResultBm: Object;
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

  agencyAppNameEn: FormControl
  agencyAppNameBm: FormControl
  descEn: FormControl
  descBm: FormControl
  agencyEn: FormControl
  agencyBm: FormControl
  websiteUrl: FormControl
  public loading = false;
  isDoc: FormControl
  resetMsg = this.resetMsg;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private dialogsService: DialogsService,
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
              this.getAgency();
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getAgency();
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

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

    this.updateForm = new FormGroup({
      agencyAppNameEn: this.agencyAppNameEn,
      descEn: this.descEn,
      agencyAppNameBm: this.agencyAppNameBm,
      descBm: this.descBm,
      agencyEn: this.agencyEn,
      agencyBm: this.agencyBm,
      websiteUrl: this.websiteUrl,
      isDoc: this.isDoc,
    });
    this.getAgency();

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

  ngAfterViewInit() {
  }

  back(){
    this.router.navigate(['agencyapp']);
  }

  // get, add, update, delete
  getRow(row) {
    
    // Update ErrorMsg Service
    this.loading = true;
    this.commonservice.readPortalById('agency/application/code/', row)
    .subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
        this.AgencyAppData = Rdata;
        // console.log(JSON.stringify(this.AgencyAppData))
        console.log(this.AgencyAppData)
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

  getAgency() {
    this.loading = true;
    this.commonservice.readPortal('agency/application/code').subscribe(
        Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
            this.AgencyData = Rdata['list'];
        }).bind(this));
          this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  getSearchData(keyword, langId){

    let selLangField;
      
    if(langId == 1) {
      selLangField = "agencyBm";
      this.ministryNameBm = "";
    } else {
      selLangField = "agencyEn";
      this.ministryNameEn = "";
    }
    this.updateForm.get(selLangField).setValue("");

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      console.log(keyword)
      console.log(keyword.length)
      this.isActive = true;
      this.loading = true;
      this.commonservice.readPortal('agency/language/'+langId,'','', keyword).subscribe(
        data => {

        this.commonservice.errorHandling(data, (function(){

          console.log(data['agencyList'].length)

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
    } else {
      this.isActiveListEn = false;
      this.isActiveListBm = false;
    }
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

    // console.log(mName)
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
          console.log('refCode Data');
          console.log(data);

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

      // console.log(nullPointers)

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
        "language": {
          "languageId": 2
        },
        "agencyId":  null
      }
    ];
    
    // console.log(formValues)

    body[0].agencyApplicationName = formValues.agencyAppNameEn;
    body[0].agencyApplicationDescription = formValues.descEn;
    body[0].isDocument = formValues.isDoc;
    body[0].agencyApplicationUrl = formValues.websiteUrl;
    body[0].agencyId = this.agencyIdEn;

    body[1].agencyApplicationName = formValues.agencyAppNameBm;
    body[1].agencyApplicationDescription = formValues.descBm;
    body[1].isDocument = formValues.isDoc;
    body[1].agencyApplicationUrl = formValues.websiteUrl;
    body[1].agencyId = this.agencyIdBm;

    console.log(body)

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

      console.log(this.refCode)
      
    let body = [
      {
        "agencyApplicationId": null,
        "agencyApplicationName": null,
        "agencyApplicationCode": null,
        "agencyApplicationDescription": null,
        "isDocument": false,
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
    body[0].agencyApplicationUrl = formValues.websiteUrl;
    body[0].agencyId = this.agencyIdEn;
    
    body[1].agencyApplicationCode = this.refCode;
    body[1].agencyApplicationId = this.agencyAppIdBm;
    body[1].agencyApplicationName = formValues.agencyAppNameBm;
    body[1].agencyApplicationDescription = formValues.descBm;
    body[1].isDocument = formValues.isDoc;
    body[1].agencyApplicationUrl = formValues.websiteUrl;
    body[1].agencyId = this.agencyIdBm;

    console.log(body);

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
