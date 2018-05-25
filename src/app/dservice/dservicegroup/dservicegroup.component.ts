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
  selector: 'app-dservicegroup',
  templateUrl: './dservicegroup.component.html',
  styleUrls: ['./dservicegroup.component.css']
})
export class DServicegroupComponent implements OnInit {
  
  refstatusCode: any;
  statusIdBm: any;
  statusIdEn: any;
  isActive: boolean;
  date = new Date();
  dateFormatExample = "dd/mm/yyyy h:i:s";
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  public loading = false;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;

  statusDescriptionBm: FormControl;
  statusDescriptionEn: FormControl;
  statusCode: FormControl;
  groupId: FormControl;

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
           if(val.languagestatusCode == translate.currentLang){
             this.lang = val.languagestatusCode;
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

    let refstatusCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    this.statusDescriptionBm = new FormControl()
    this.statusDescriptionEn = new FormControl()
    this.statusCode = new FormControl()
    this.groupId = new FormControl()

    this.updateForm = new FormGroup({
      statusDescriptionEn: this.statusDescriptionEn,
      statusDescriptionBm: this.statusDescriptionBm,
      statusCode: this.statusCode,
      groupId: this.groupId

    });

    if(refstatusCode == "add") {
      this.isEdit = false;
      this.pageMode = 'common.add';
    } else {
      this.isEdit = true;
      this.pageMode = 'common.update';
      this.getRow(refstatusCode);
    }
    
    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }
  }

  // get, add, update, delete
  getRow(row) {
    
    // Update ErrorMsg Service
    this.loading = true;
    this.commonservice.readProtectedById('dservice/group/', row)
    .subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
        this.dsGroupData = Rdata;
        // console.log(JSON.stringify(this.dsGroupData))
        console.log(this.dsGroupData)
        let dataEn = this.dsGroupData['list'][0];
        let dataBm = this.dsGroupData['list'][1];

      // populate data
        this.updateForm.get('statusDescriptionEn').setValue(dataEn.statusDescription);
        this.updateForm.get('statusDescriptionBm').setValue(dataBm.statusDescription);
        this.updateForm.get('statusCode').setValue(dataBm.statusCode);
        console.log(dataBm.groupId)
        this.updateForm.get('groupId').setValue(dataBm.groupId);
        this.refstatusCode = dataEn.statusCode;
        this.statusIdEn = dataEn.statusId;
        this.statusIdBm = dataBm.statusId;
            
        this.checkReqValues();
      }).bind(this));
      this.loading = false;
    }, err => {
      this.loading = false;
    });
    
  }

  back(){
    this.router.navigate(['dservicegroup']);
  }

  checkReqValues() {

    let statusDescriptionEn = "statusDescriptionEn";
    let statusDescriptionBm = "statusDescriptionBm";
    let statusCode = "statusCode";
    let groupId = "groupId";

    let reqVal: any = [statusDescriptionEn, statusDescriptionBm, statusCode, groupId];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

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
    this.updateForm.reset();
    this.checkReqValues();
  }

  updateAction(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "statusDescription": null,
        "groupId": null,
        "statusCode": null,
        "language": {
          "languageId": 1
        }
      }, 
      {
        "statusDescription": null,
        "groupId": null,
        "statusCode": null,
        "language": {
          "languageId": 2
        }
      }
    ];
    
    // console.log(formValues) , 

    body[0].statusDescription = formValues.statusDescriptionEn;
    body[0].groupId = formValues.groupId;
    body[0].statusCode = formValues.statusCode;

    body[1].statusDescription = formValues.statusDescriptionBm;
    body[1].groupId = formValues.groupId;
    body[1].statusCode = formValues.statusCode;
    
    console.log(body)

    // Add ErrorMsg Service
    this.loading = true;
    this.commonservice.create(body, 'dservice/group').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
        this.router.navigate(['dservicegroup']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;       
      });

    } else {

      console.log(this.refstatusCode)

      let body = [
        {
          "statusId": null,
          "statusDescription": null,
          "groupId": null,
          "statusCode": null,
          "language": {
            "languageId": 1
          }
        }, 
        {
          "statusId": null,
          "statusDescription": null,
          "groupId": null,
          "statusCode": null,
          "language": {
            "languageId": 2
          }
        }
      ];
      
      // console.log(formValues) , 
  
      body[0].statusId = this.statusIdEn;
      body[0].statusDescription = formValues.statusDescriptionEn;
      body[0].groupId = formValues.groupId;
      body[0].statusCode = formValues.statusCode;
  
      body[1].statusId = this.statusIdBm;
      body[1].statusDescription = formValues.statusDescriptionBm;
      body[1].groupId = formValues.groupId;
      body[1].statusCode = formValues.statusCode;
      
      console.log(body)

    // Update AgencyApp Service
    this.loading = true;
    this.commonservice.update(body, 'dservice/group').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['dservicegroup']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        this.loading = false;
      });
    }

  }

}
