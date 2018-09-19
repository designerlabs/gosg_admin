import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-dservice',
  templateUrl: './dservice.component.html',
  styleUrls: ['./dservice.component.css']
})
export class DServiceComponent implements OnInit {
  
  refCode: any;
  agencyIdBm: any;
  agencyIdEn: any;
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
  searchAgencyResultBm: string[];
  searchAgencyResultEn: string[];

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;

  agencyBm: FormControl;
  agencyEn: FormControl;
  titleBm: FormControl;
  titleEn: FormControl;
  descEn: FormControl;
  descBm: FormControl;
  active: FormControl;

  resetMsg = this.resetMsg;
  public loading = false;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
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

    this.commonservice.getInitialMessage();
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();

    this.titleEn = new FormControl()
    this.titleBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.agencyEn = new FormControl()
    this.agencyBm = new FormControl()
    this.active = new FormControl()

    this.updateForm = new FormGroup({
      titleEn: this.titleEn,
      descEn: this.descEn,
      titleBm: this.titleBm,
      descBm: this.descBm,
      agencyEn: this.agencyEn,
      agencyBm: this.agencyBm,
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

  ngAfterViewInit() {
  }

  back(){
    this.router.navigate(['dservice']);
  }

  // get, add, update, delete
  getRow(row) {
    
    // Update ErrorMsg Service
    this.loading = true;
    this.commonservice.readProtectedById('dservice/', row, this.languageId)
    .subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
        this.dsData = Rdata;
        // 
        
        let dataEn = this.dsData['list'][0];
        let dataBm = this.dsData['list'][1];

      // populate data
        this.updateForm.get('titleEn').setValue(dataEn.title);
        this.updateForm.get('descEn').setValue(dataEn.description);
        this.updateForm.get('titleBm').setValue(dataBm.title);
        this.updateForm.get('descBm').setValue(dataBm.description);

        if(dataEn.agency) {
          this.updateForm.get('agencyEn').setValue(dataEn.agency.agencyName);
          this.updateForm.get('agencyBm').setValue(dataBm.agency.agencyName);
          this.agencyIdEn = dataEn.agency.agencyId;
          this.agencyIdBm = dataBm.agency.agencyId;
        }

        this.updateForm.get('active').setValue(dataBm.enabled);
        this.refCode = dataEn.code;
        this.idEn = dataEn.id;
        this.idBm = dataBm.id;
        
        this.checkReqValues();
      }).bind(this));
      this.loading = false;
    }, err => {
      this.loading = false;
    });
    
  }

  resetSearch() {
    this.updateForm.get('agencyEn').setValue('');
    this.updateForm.get('agencyBm').setValue('');
    this.isActiveListEn = false;
    this.isActiveListBm = false;
    // this.getModuleData(this.pageCount, this.pageSize);
  }

  onScroll(event, lngId){

    // 
    if(event.target.scrollTop >= (event.target.scrollHeight - 250)) {
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

    this.searchAgencyResultEn = []
    this.searchAgencyResultBm = []
    let selLangField;

    if(langId == 1) {
      selLangField = "agencyBm";
      // this.ministryNameBm = "";
    } else {
      selLangField = "agencyEn";
      // this.ministryNameEn = "";
    }
    this.updateForm.get(selLangField).setValue("");

    // if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      // 
      // 
      this.isActive = true;
      this.loading = true;
      
      this.commonservice.readPortal('agency/language/'+langId, count, page, keyword, this.languageId).subscribe(
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
      // this.agencyEn = aId;
      this.agencyIdEn = aId;
      // this.ministryNameEn = mName;

    } else {
      this.agencyBm = this.updateForm.get('agencyBm').value;
      this.isActive = false;
      this.isActiveListBm = false;
      this.updateForm.get('agencyBm').setValue(aName);
      // this.agencyBm = aId;
      this.agencyIdBm = aId;
      // this.ministryNameBm = mName;

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
    this.commonservice.readPortalById('agency/refcode/language/'+langId+'/', refCode, this.languageId)
    .subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          // 
          // 

          aName = data['list'][0]['agencyName'];
          aId = data['list'][0]['agencyId'];
          
          this.updateForm.get(selLangField).setValue(aName);

          if(langId == 1) {
            this.agencyIdEn = aId;
          } else {
            this.agencyIdBm = aId;
          }
          this.checkReqValues();
        }).bind(this));
        this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  checkReqValues() {

    let titleEn = "titleEn";
    let descEn = "descEn";
    let titleBm = "titleBm";
    let descBm = "descBm";
    let agencyEn = "agencyEn";
    let agencyBm = "agencyBm";

    let reqVal: any = [titleEn, descEn, titleBm, descBm, agencyEn, agencyBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

      // 

    if (nullPointers.length > 0) {
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
        "description": null,
        "enabled": null,
        "language": {
          "languageId": 1
        },
        "agency":{
          "agencyId":  null
        }
      }, 
      {
        "title": null,
        "description": null,
        "enabled": null,
        "language": {
          "languageId": 2
        },
        "agency":{
          "agencyId":  null
        }
      }
    ];
    
    // 

    body[0].title = formValues.titleEn;
    body[0].description = formValues.descEn;
    body[0].agency.agencyId = this.agencyIdEn;
    body[0].enabled = formValues.active;
    
    body[1].title = formValues.titleBm;
    body[1].description = formValues.descBm;
    body[1].agency.agencyId = this.agencyIdBm;
    body[1].enabled = formValues.active;

    

    // Add ErrorMsg Service
    this.loading = true;
    this.commonservice.create(body, 'dservice').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
        this.router.navigate(['dservice']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;       
      });

    } else {

      
      
    let body = [
      {
        "id": null,
        "code": null,
        "title": null,
        "description": null,
        "enabled": null,
        "language": {
          "languageId": 1
        },
        "agency":{
          "agencyId":  null
        }
      }, 
      {
        "id": null,
        "code": null,
        "title": null,
        "description": null,
        "enabled": null,
        "language": {
          "languageId": 2
        },
        "agency":{
          "agencyId":  null
        }
      }
    ];
      
    body[0].id = this.idEn;
    body[0].code = this.refCode;
    body[0].title = formValues.titleEn;
    body[0].description = formValues.descEn;
    body[0].agency.agencyId = this.agencyIdEn;
    body[0].enabled = formValues.active;
    
    body[1].id = this.idBm;
    body[1].code = this.refCode;
    body[1].title = formValues.titleBm;
    body[1].description = formValues.descBm;
    body[1].agency.agencyId = this.agencyIdBm;
    body[1].enabled = formValues.active;

    

    // Update AgencyApp Service
    this.loading = true;
    this.commonservice.update(body, 'dservice').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['dservice']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        this.loading = false;
      });
    }

  }

}
