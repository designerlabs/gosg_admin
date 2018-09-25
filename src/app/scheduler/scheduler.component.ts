import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  updateForm: FormGroup

  interval: FormControl
  intervalUnit: FormControl
  enabled: FormControl

  lang: any;
  languageId: any;

  scheduleId: any;
  moduleName: any;
  selUnit: any;
  lastExecutionDate: any;
  nextExecutionDate: any;
  executionStatus: any;

  recordList: any;
  
  public loading = false;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data: any) => {
          let getLang = data.list;
          let myLangData = getLang.filter(function (val) {
            if (val.languageCode == translate.currentLang) {
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              // this.getSchedulerData(this.pageCount, this.pageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
      this.commonservice.getModuleId();
    }
    // this.getSchedulerData(id);

    /* LANGUAGE FUNC */
}

  ngOnInit() {

    this.commonservice.getInitialMessage();

    let refId = this.router.url.split('/')[2];
    this.commonservice.getModuleId();

    this.interval = new FormControl()
    this.intervalUnit = new FormControl()
    this.enabled = new FormControl()

    this.updateForm = new FormGroup({

      interval: this.interval,
      intervalUnit: this.intervalUnit,
      enabled: this.enabled
      // moduleDesc: this.moduleDesc,
      // moduleUrl: this.moduleUrl,
      // active: this.active

    });

    // populate data
    this.getSchedulerData(refId);
  }

  // get module Data 
  getSchedulerData(id) {

    this.loading = true;
    this.commonservice.readProtectedById('schedule/',id, this.languageId).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function () {
          this.recordList = data;
          

          this.scheduleId = this.recordList.schedule.scheduleId;
          this.moduleName = this.recordList.schedule.moduleName;
          this.lastExecutionDate = this.recordList.schedule.lastExecutionDate;
          this.nextExecutionDate = this.recordList.schedule.nextExecutionDate;
          this.executionStatus = this.recordList.schedule.executionStatus;
          this.updateForm.get('interval').setValue(this.recordList.schedule.schedulerInterval);
          this.updateForm.get('intervalUnit').setValue(this.recordList.schedule.schedulerIntervalUnits);
          this.updateForm.get('enabled').setValue(this.recordList.schedule.enabled);

        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        
        this.loading = false;
      });

  }

  back() {
    this.router.navigate(['scheduler']);
  }

  updateAction(formValues: any) {

    let body = {
      "scheduleId": null,
      "moduleName": null,
      "lastExecutionDate": null,
      "nextExecutionDate": null,
      "executionStatus": null,
      "schedulerInterval": null,
      "schedulerIntervalUnits": null,
      "enabled": false
    };

    // lastExecutionDate: any;
    // nextExecutionDate: any;
    // executionStatus: any;
    
      body.scheduleId = this.scheduleId;
      body.moduleName = this.moduleName;
      body.schedulerInterval = parseInt(formValues.interval);
      body.schedulerIntervalUnits = formValues.intervalUnit;
      body.enabled = formValues.enabled;

    

    // body.scheduleId = this.scheduleId;
    // body.moduleName = formValues.moduleName;
    // body.schedulerInterval = formValues.interval;
    // body.active = formValues.active;
    // body.schedulerIntervalUnits = formValues.intervalUnit;

    // 
    // this.loading = true;

    // Update ErrorMsg Service
    this.commonservice.update(body, 'schedule').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function () {
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));
        this.loading = false;
        this.router.navigate(['scheduler']);
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });

  }

}
