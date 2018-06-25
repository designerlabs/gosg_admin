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
  selector: 'app-modmenu',
  templateUrl: './modmenu.component.html',
  styleUrls: ['./modmenu.component.css']
})
export class ModmenuComponent implements OnInit {

  moduleData: Object;
  isActive: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  lang: any;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  moduleId: any;

  updateForm: FormGroup
  moduleName: FormControl
  moduleDesc: FormControl
  moduleUrl: FormControl
  active: FormControl
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
        /* LANGUAGE FUNC */
      }
    })
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    let refId = this.router.url.split('/')[2];
    this.commonservice.getModuleId();

    this.moduleName = new FormControl()
    this.moduleDesc = new FormControl()
    this.moduleUrl = new FormControl()
    this.active = new FormControl()

    this.updateForm = new FormGroup({

      moduleName: this.moduleName,
      moduleDesc: this.moduleDesc,
      moduleUrl: this.moduleUrl,
      active: this.active

    });

    if (refId == "add") {
      this.isEdit = false;
      this.pageMode = 'common.add';
      this.updateForm.get('active').setValue(true);
    } else {
      this.isEdit = true;
      this.pageMode = 'common.update';
      this.getRow(refId);
    }

    // #### for disable non update user ---1
    if (!this.commonservice.isUpdate && this.commonservice.isWrite) {
      this.updateForm.enable();
    } else if (!this.commonservice.isUpdate) {
      this.updateForm.disable();
    }

  }

  back() {
    this.router.navigate(['modmenu']);
  }

  // get, add, update, delete
  getRow(row) {
    this.loading = true;

    // Update Slider Service
    return this.http.get(this.appConfig.urlModule + '/' + row).subscribe(
      // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function () {

          this.moduleData = Rdata['module'];
          console.log(this.moduleData)
          // console.log(this.appConfig.urlMenu + "/" + row)

          // populate data
          this.updateForm.get('moduleName').setValue(this.moduleData['moduleName']);
          this.updateForm.get('moduleDesc').setValue(this.moduleData['moduleDescription']);
          this.updateForm.get('moduleUrl').setValue(this.moduleData['moduleUrl']);
          this.updateForm.get('active').setValue(this.moduleData['active']);
          this.moduleId = this.moduleData['moduleId'];

          this.updateForm.get('moduleName').disable();
          this.updateForm.get('moduleUrl').disable();

          this.checkReqValues();

        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        console.log(error);
        this.loading = false;
      });

  }
  myFunction() {
    this.updateForm.reset();
    this.checkReqValues();
  }

  checkReqValues() {

    let reqVal: any;
    let moduleName = "moduleName";
    let moduleDesc = "moduleDesc";
    let moduleUrl = "moduleUrl";

    if (this.isEdit == true)
      reqVal = [moduleDesc];
    else
      reqVal = [moduleName, moduleDesc, moduleUrl];

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

  updateModule(formValues: any) {

    if (!this.isEdit) {

      let body = {
        "moduleName": null,
        "moduleDescription": null,
        "active": false,
        "moduleUrl": null
      };

      // console.log(formValues)

      body.moduleName = formValues.moduleName;
      body.moduleDescription = formValues.moduleDesc;
      body.active = formValues.active;
      body.moduleUrl = formValues.moduleUrl;

      console.log(body)
      this.loading = true;

      // Add ErrorMsg Service
      this.commonservice.create(body, 'authorization/module/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.added'), 'success');
          }).bind(this));
          this.router.navigate(['modmenu']);
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });

    } else {

      let body = {
        "moduleId": null,
        "moduleName": null,
        "moduleDescription": null,
        "active": false,
        "moduleUrl": null
      };

      // console.log(formValues)

      body.moduleId = this.moduleId;
      body.moduleName = formValues.moduleName;
      body.moduleDescription = formValues.moduleDesc;
      body.active = formValues.active;
      body.moduleUrl = formValues.moduleUrl;

      console.log(JSON.stringify(body));
      this.loading = true;

      // Update ErrorMsg Service
      this.commonservice.update(body, 'authorization/module/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.updated'), 'success');
          }).bind(this));
          this.router.navigate(['modmenu']);
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });
    }

  }

}
