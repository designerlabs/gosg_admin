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
  agencyAppForm: FormGroup
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
        this.commonservice.getAllLanguage().subscribe((data:any) => {
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

    this.agencyAppForm = new FormGroup({
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
      this.pageMode = "Add";
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
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
    return this.http.get(this.appConfig.urlGetAgencyApp + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgencyApp + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgencyApp + row + "/").subscribe(
      Rdata => {

        this.AgencyAppData = Rdata;
        // console.log(JSON.stringify(this.AgencyAppData))
        console.log(this.AgencyAppData)
        let dataEn = this.AgencyAppData['agencyApplicationList'][0];
        let dataBm = this.AgencyAppData['agencyApplicationList'][1];

      // populate data
      this.agencyAppForm.get('agencyAppNameEn').setValue(dataEn.agencyApplicationName);
      this.agencyAppForm.get('descEn').setValue(dataEn.agencyApplicationDescription);
      this.agencyAppForm.get('agencyAppNameBm').setValue(dataBm.agencyApplicationName);
      this.agencyAppForm.get('descBm').setValue(dataBm.agencyApplicationDescription);
      this.agencyAppForm.get('agencyEn').setValue(dataEn.agencyName);
      this.agencyAppForm.get('agencyBm').setValue(dataBm.agencyName);
      this.agencyAppForm.get('websiteUrl').setValue(dataBm.agencyApplicationUrl);
      this.agencyAppForm.get('isDoc').setValue(dataBm.isDocument);
      this.refCode = dataEn.agencyApplicationCode;
      this.agencyAppIdEn = dataEn.agencyApplicationId;
      this.agencyAppIdBm = dataBm.agencyApplicationId;
      this.agencyIdEn = dataEn.agencyId;
      this.agencyIdBm = dataBm.agencyId;
      this.ministryNameEn = dataEn.ministryName;
      this.ministryNameBm = dataBm.ministryName;

      this.checkReqValues();
    });
    
  }

  getAgency() {
    return this.http.get(this.appConfig.urlAgency + '/code'+ '?language='+this.languageId).subscribe(
        Rdata => {
          this.AgencyData = Rdata['list'];
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
    this.agencyAppForm.get(selLangField).setValue("");

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      console.log(keyword)
      console.log(keyword.length)
      this.isActive = true;

      if(langId == 1) {
        this.isActiveListEn = true;
        this.isActiveListBm = false;
      } else {
        this.isActiveListBm = true;
        this.isActiveListEn = false;
      }

      this.http.get(
        this.appConfig.urlSearchbyAgency+keyword+'?language='+langId).subscribe(
        data => {
          console.log(this.appConfig.urlSearchbyAgency+keyword+'?language='+langId);
          if(langId == 1) {
            this.searchAgencyResultEn = data['agencyList'];
            console.log(this.searchAgencyResultEn)
          } else {
            this.searchAgencyResultBm = data['agencyList'];
            console.log(this.searchAgencyResultBm)
          }
      });
    } else {
      this.isActiveListEn = false;
      this.isActiveListBm = false;
    }
  }
  
  getValue(aId,aName,mName, refCode, langId){

    if(langId == 1) {
      this.agencyEn = this.agencyAppForm.get('agencyEn').value;
      this.isActiveListEn = false;
      this.searchAgencyResultEn = [''];
      this.agencyAppForm.get('agencyEn').setValue(aName);
      this.agencyEn = aId;
      this.agencyIdEn = aId;
      this.ministryNameEn = mName;

      this.getAgencyByRefCode(refCode,langId);

    } else {
      this.agencyBm = this.agencyAppForm.get('agencyBm').value;
      this.isActive = false;
      this.isActiveListBm = false;
      this.agencyAppForm.get('agencyBm').setValue(aName);
      this.agencyBm = aId;
      this.agencyIdBm = aId;
      this.ministryNameBm = mName;

      this.getAgencyByRefCode(refCode,langId);
    }

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

    return this.http.get(this.appConfig.urlGetAgency + '/code/language/' + refCode+ '?language='+langId).subscribe(
      data => {
        console.log('refCode Data');
        console.log(data);

        mName = data['agencyList'][0]['agencyMinistry']['ministryName'];
        aName = data['agencyList'][0]['agencyName'];
        aId = data['agencyList'][0]['agencyId'];
        
        this.agencyAppForm.get(selLangField).setValue(aName);

        if(langId == 1) {
          this.agencyIdEn = aId;
          this.ministryNameEn = mName;
        } else {
          this.agencyIdBm = aId;
          this.ministryNameBm = mName;
        }
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
      let elem = this.agencyAppForm.get(reqData);

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
    let agc = this.agencyAppForm.get('agency').value;
    if(agc == "" || agc == null) {
      this.ministryNameEn = "";
    }
  }

  myFunction() {
    let txt;
    let r = confirm("Are you sure to reset the form?");
    if (r == true) {
      txt = "You pressed OK!";
      this.agencyAppForm.reset();
      this.checkReqValues();
    } else {
      txt = "You pressed Cancel!";
    }
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
    this.commonservice.addAgencyApp(body).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
        this.router.navigate(['agencyapp']);
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');       
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
    this.commonservice.updateAgencyApp(body).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['agencyapp']);
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      });
    }

  }

}
