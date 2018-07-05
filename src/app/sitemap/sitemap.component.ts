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
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {

  sitemapData: Object;
  isActive: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  lang:any;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  sitemapEnId: any;
  sitemapBmId: any;
  siteMapCode: any;
  
  updateForm: FormGroup
  sitemapEnName: FormControl
  sitemapBmName: FormControl
  sitemapUrl: FormControl
  public loading = false;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    public commonservice: CommonService, 
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

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    let refId = this.router.url.split('/')[2];
    this.commonservice.getModuleId();

    this.sitemapEnName = new FormControl()
    this.sitemapBmName = new FormControl()
    this.sitemapUrl = new FormControl()

    this.updateForm = new FormGroup({

      sitemapEnName: this.sitemapEnName,
      sitemapBmName: this.sitemapBmName,
      sitemapUrl: this.sitemapUrl,

    });
    
    if(refId == "add") {
      this.isEdit = false;
      this.pageMode = 'common.add';
    } else {
      this.isEdit = true;
      this.pageMode = 'common.update';
      this.getRow(refId);
    }
    
    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }

  }

  back(){
    this.router.navigate(['sitemap']);
  }

  // get, add, update, delete
  getRow(row) {
    this.loading = true;

    // Update Slider Service
    return this.commonservice.readPortalById('sitemap/code/', row, this.languageId).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){

        this.sitemapData = Rdata['siteMapList'];
        
        // 

        // populate data
        this.updateForm.get('sitemapEnName').setValue(this.sitemapData[0]['sitemapName']);
        this.updateForm.get('sitemapBmName').setValue(this.sitemapData[1]['sitemapName']);
        this.updateForm.get('sitemapUrl').setValue(this.sitemapData[0]['sitemapRelativeUrl']);
        this.sitemapEnId = this.sitemapData[0]['sitemapId'];
        this.sitemapBmId = this.sitemapData[1]['sitemapId'];
        this.siteMapCode = this.sitemapData[0]['sitemapCode'];

        // this.updateForm.get('sitemapEnName').disable();
        // this.updateForm.get('sitemapBmName').disable();
        // this.updateForm.get('sitemapUrl').disable();

        this.checkReqValues();
              
      }).bind(this));
      this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      
      this.loading = false;
    });
    
  }
  myFunction() {
    this.updateForm.reset();
    this.checkReqValues();   
  }

  checkReqValues() {

    let reqVal: any;
    let sitemapEnName = "sitemapEnName";
    let sitemapBmName = "sitemapBmName";
    let sitemapUrl = "sitemapUrl";

    reqVal = [sitemapEnName, sitemapBmName, sitemapUrl];

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

  updateModule(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "sitemapName": null,
        "sitemapRelativeUrl": null,
        "language": {
          "languageId": 1
          }
          
      },
      {
        "sitemapName": null,
        "sitemapRelativeUrl": null,
        "language": {
          "languageId": 2
          }
          
      }
  ];
    
    // 

    body[0].sitemapName = formValues.sitemapEnName;
    body[0].sitemapRelativeUrl = formValues.sitemapUrl;
    body[1].sitemapName = formValues.sitemapBmName;
    body[1].sitemapRelativeUrl = formValues.sitemapUrl;

    
    this.loading = true;

    // Add ErrorMsg Service
    this.commonservice.create(body,'sitemap').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
        this.router.navigate(['sitemap']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
        this.loading = false;
      });

    } else {

      let body = [
        {
          "sitemapId": null,
          "sitemapCode": null,
          "sitemapName": null,
          "sitemapRelativeUrl": null,
          "language": {
            "languageId": 1
            }
            
        },
        {
          "sitemapId": null,
          "sitemapCode": null,
          "sitemapName": null,
          "sitemapRelativeUrl": null,
          "language": {
            "languageId": 2
            }
            
        }
    ]
      
      // 
  
      body[0].sitemapId = this.sitemapEnId;
      body[0].sitemapCode = this.siteMapCode;
      body[0].sitemapName = formValues.sitemapEnName;
      body[0].sitemapRelativeUrl = formValues.sitemapUrl;
      body[1].sitemapId = this.sitemapBmId;
      body[1].sitemapCode = this.siteMapCode;
      body[1].sitemapName = formValues.sitemapBmName;
      body[1].sitemapRelativeUrl = formValues.sitemapUrl;

    
    // 
    // this.loading = true;

    // Update ErrorMsg Service
    this.commonservice.update(body,'sitemap').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['sitemap']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });
    }
    
    }

}
