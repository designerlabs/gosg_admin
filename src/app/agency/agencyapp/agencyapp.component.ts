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
  searchAgencyResult: Object;
  isActiveList: boolean;
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
  agencyId:any;
  ministryName:any;
  lang:any;
  languageId: any;

  agencyAppNameEn: FormControl
  agencyAppNameBm: FormControl
  descEn: FormControl
  descBm: FormControl
  agency: FormControl
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
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getAgency();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    let refCode = this.router.url.split('/')[2];

    this.agencyAppNameEn = new FormControl()
    this.agencyAppNameBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.agency = new FormControl()
    this.websiteUrl = new FormControl()
    this.isDoc = new FormControl()

    this.agencyAppForm = new FormGroup({
      agencyAppNameEn: this.agencyAppNameEn,
      descEn: this.descEn,
      agencyAppNameBm: this.agencyAppNameBm,
      descBm: this.descBm,
      agency: this.agency,
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
    return this.http.get(this.appConfig.urlAgencyApp + '/code/' + row).subscribe(
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
      this.agencyAppForm.get('agency').setValue(dataBm.agencyName);
      this.agencyAppForm.get('websiteUrl').setValue(dataBm.agencyApplicationUrl);
      // this.agencyAppForm.get('isDoc').setValue(dataBm.agency.isDocument);
      this.refCode = dataEn.agencyApplicationCode;
      this.agencyAppIdEn = dataEn.agencyApplicationId;
      this.agencyAppIdBm = dataBm.agencyApplicationId;
      this.agency = dataBm.agencyId;
      this.agencyId = dataBm.agencyId;

      this.checkReqValues();
    });
    
  }

  getAgency() {
    return this.http.get(this.appConfig.urlAgency + '/code'+ '?language='+this.languageId).subscribe(
      // return this.http.get(this.appConfig.urlAgencyApp + '/code/' + row).subscribe(
      // return this.http.get(this.appConfig.urlAgencyApp + row + "/").subscribe(
        Rdata => {
  
          this.AgencyData = Rdata['list'];
          // 
          // console.log(JSON.stringify(this.AgencyAppData))
          // console.log(this.AgencyData)
          // console.log(this.AgencyData[0]['list'][0].agencyName)
      });
  }

  getSearchData(keyword){

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      console.log(keyword)
      console.log(keyword.length)
      this.isActive = true;
      this.isActiveList = true;

      this.http.get(
        this.appConfig.urlSearchbyAgency+keyword+'?language='+localStorage.getItem('langID')).subscribe(
        data => {
          console.log(this.appConfig.urlSearchbyAgency+keyword+'?language='+localStorage.getItem('langID'));
          // if()
          this.searchAgencyResult = data['agencyList'];
          console.log(this.searchAgencyResult)
      });
    } else {
      this.isActiveList = false;
    }
  }
  
  getValue(aId,aName,mName){
    this.agency = this.agencyAppForm.get('agency').value;
    this.isActive = false;
    this.isActiveList = false;
    this.searchAgencyResult = [''];
    this.agencyAppForm.get('agency').setValue(aName);
    this.agency = aId;
    this.agencyId = aId;

    console.log(mName)

    if(mName != "")
      this.ministryName = mName;
      else
      this.ministryName = "-";
  }

  checkReqValues() {

    let agencyAppNameEn = "agencyAppNameEn";
    let descEn = "descEn";
    let agencyAppNameBm = "agencyAppNameBm";
    let descBm = "descBm";
    let websiteUrl = "websiteUrl";
    let agency = "agency";

    let reqVal: any = [agencyAppNameEn, descEn, agencyAppNameBm, descBm, websiteUrl, agency];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.agencyAppForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

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
    body[0].agencyId = this.agencyId;

    body[1].agencyApplicationName = formValues.agencyAppNameBm;
    body[1].agencyApplicationDescription = formValues.descBm;
    body[1].isDocument = formValues.isDoc;
    body[1].agencyApplicationUrl = formValues.websiteUrl;
    body[1].agencyId = this.agencyId;

    console.log(body)

    // Add ErrorMsg Service
    this.commonservice.addAgencyApp(body).subscribe(
      data => {
        this.toastr.success('Agency Application added successfully!', ''); 
        this.router.navigate(['agencyapp']);
      },
      error => {
        console.log("No Data")
      });

    } else {
      
    let body = [
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
    body[0].agencyId = formValues.agencyId;
    
    body[1].agencyApplicationCode = this.refCode;
    body[1].agencyApplicationId = this.agencyAppIdBm;
    body[1].agencyApplicationName = formValues.agencyAppNameBm;
    body[1].agencyApplicationDescription = formValues.descBm;
    body[1].isDocument = formValues.isDoc;
    body[1].agencyApplicationUrl = formValues.websiteUrl;
    body[1].agencyId = formValues.agencyId;

    console.log(body);

    // Update ErrorMsg Service
    this.commonservice.updateAgencyApp(body).subscribe(
      data => {
        this.toastr.success('Agency Application update successful!', '');   
        this.router.navigate(['agencyapp']);
      },
      error => {
        console.log("No Data")
      });
    }
    

  }

}
