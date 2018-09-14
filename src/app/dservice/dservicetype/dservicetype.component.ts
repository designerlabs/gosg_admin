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
  selector: 'app-dservicetype',
  templateUrl: './dservicetype.component.html',
  styleUrls: ['./dservicetype.component.css']
})
export class DServicetypeComponent implements OnInit {
  
  refCode: any;
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
  public loading = false;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;

  nameBm: FormControl;
  nameEn: FormControl;
  code: FormControl;

  resetMsg = this.resetMsg;

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

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    this.nameBm = new FormControl()
    this.nameEn = new FormControl()
    this.code = new FormControl()

    this.updateForm = new FormGroup({
      nameEn: this.nameEn,
      nameBm: this.nameBm,
      code: this.code

    });

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

  // get, add, update, delete
  getRow(row) {
    
    // Update ErrorMsg Service
    this.loading = true;
    this.commonservice.readProtectedById('dservice/type/', row, this.languageId)
    .subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
        this.dsTypeData = Rdata;
        // 
        
        let dataEn = this.dsTypeData['list'][0];
        let dataBm = this.dsTypeData['list'][1];

      // populate data
        this.updateForm.get('nameEn').setValue(dataEn.name);
        this.updateForm.get('nameBm').setValue(dataBm.name);
        this.updateForm.get('code').setValue(dataBm.code);
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

  back(){
    this.router.navigate(['dservicetype']);
  }

  checkReqValues() {

    let nameEn = "nameEn";
    let nameBm = "nameBm";
    let code = "code";

    let reqVal: any = [nameEn, nameBm, code];
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
        "name": null,
        "code": null,
        "language": {
          "languageId": 1
        }
      }, 
      {
        "name": null,
        "code": null,
        "language": {
          "languageId": 2
        }
      }
    ];
    
    // 

    body[0].name = formValues.nameEn;
    body[0].code = formValues.code;

    body[1].name = formValues.nameBm;
    body[1].code = formValues.code;
    
    

    // Add ErrorMsg Service
    this.loading = true;
    this.commonservice.create(body, 'dservice/type').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
        this.router.navigate(['dservicetype']);
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
          "name": null,
          "code": null,
          "language": {
            "languageId": 1
          }
        }, 
        {
          "id": null,
          "name": null,
          "code": null,
          "language": {
            "languageId": 2
          }
        }
      ];
      
      // 
  
      body[0].id = this.idEn;
      body[0].name = formValues.nameEn;
      body[0].code = formValues.code;
  
      body[1].id = this.idBm;
      body[1].name = formValues.nameBm;
      body[1].code = formValues.code;
      
      

    // Update AgencyApp Service
    this.loading = true;
    this.commonservice.update(body, 'dservice/type').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['dservicetype']);
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        this.loading = false;
      });
    }

  }

}
