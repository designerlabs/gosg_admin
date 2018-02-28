import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
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
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  
  events: string[] = [];
  calendarData: Object;
  dataUrl: any;
  date = new Date();
  
  dt:number;
  calendarForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  refId:any;
  eventId:any;
  dateFormatExample: string = "dd/mm/yyyy";

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;

  eventName: FormControl
  eventDesc: FormControl
  eventStartTime: FormControl
  eventEndTime: FormControl
  eventLocation: FormControl
  eventCity: FormControl
  eventCountry: FormControl
  eventLatitude: FormControl
  eventLongitude: FormControl
  eventZip: FormControl
  eventPrivacy: FormControl
  eventIsDateOnly: FormControl
  eventPicture: FormControl
  eventUpdatedTime: FormControl
  dataQueryDateTime: FormControl
  dataQueryUpdateDateTime: FormControl
  startDate: FormControl
  endTime: FormControl
  startTime: FormControl
  startMonth: FormControl
  eventStatus: FormControl
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

    this.eventName = new FormControl()
    this.eventDesc = new FormControl()
    this.eventStartTime = new FormControl()
    this.eventEndTime = new FormControl()
    this.eventLocation = new FormControl()
    this.eventCity = new FormControl()
    this.eventCountry = new FormControl()
    this.eventLatitude = new FormControl()
    this.eventLongitude = new FormControl()
    this.eventZip = new FormControl()
    this.eventPrivacy = new FormControl()
    this.eventIsDateOnly = new FormControl()
    this.eventPicture = new FormControl()
    this.eventUpdatedTime = new FormControl()
    this.dataQueryDateTime = new FormControl()
    this.dataQueryUpdateDateTime = new FormControl()
    this.startDate = new FormControl()
    this.endTime = new FormControl()
    this.startTime = new FormControl()
    this.startMonth = new FormControl()
    this.eventStatus = new FormControl()

    this.calendarForm = new FormGroup({
      eventName: this.eventName,
      eventDesc: this.eventDesc,
      eventStartTime: this.eventStartTime,
      eventEndTime: this.eventEndTime,
      eventLocation: this.eventLocation,
      eventCity: this.eventCity,
      eventCountry: this.eventCountry,
      eventLatitude: this.eventLatitude,
      eventLongitude: this.eventLongitude,
      eventZip: this.eventZip,
      eventPrivacy: this.eventPrivacy,
      eventIsDateOnly: this.eventIsDateOnly,
      eventPicture: this.eventPicture,
      eventUpdatedTime: this.eventUpdatedTime,
      dataQueryDateTime: this.dataQueryDateTime,
      dataQueryUpdateDateTime: this.dataQueryUpdateDateTime,
      startDate: this.startDate,
      endTime: this.endTime,
      startTime: this.startTime,
      startMonth: this.startMonth,
      eventStatus: this.eventStatus
    });

    if(refId == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      // this.getRow(refId);
    }
  }

  back(){
    this.router.navigate(['calendar']);
  }

  // get, add, update, delete
  getRow(row) {

    // Update Calendar Service
    return this.http.get(this.appConfig.urlGetAgencyApp + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgencyApp + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlAgencyApp + row + "/").subscribe(
      Rdata => {

        this.calendarData = Rdata;
        // console.log(JSON.stringify(this.calendarData))
        console.log(this.calendarData)

      // populate data
      // this.calendarForm.get('eventName').setValue(this.calendarData.eventName);
      // this.calendarForm.get('eventDesc').setValue(this.calendarData.eventDesc);
      // this.calendarForm.get('eventStartTime').setValue(this.calendarData.eventStartTime);
      // this.calendarForm.get('eventEndTime').setValue(this.calendarData.eventEndTime);
      // this.calendarForm.get('eventLocation').setValue(this.calendarData.eventLocation);
      // this.calendarForm.get('eventCity').setValue(this.calendarData.eventCity);
      // this.calendarForm.get('eventCountry').setValue(this.calendarData.eventCountry);
      // this.calendarForm.get('eventLatitude').setValue(this.calendarData.eventLatitude);
      // this.calendarForm.get('eventLongitude').setValue(this.calendarData.eventLongitude);
      // this.calendarForm.get('eventZip').setValue(this.calendarData.eventZip);
      // this.calendarForm.get('eventPrivacy').setValue(this.calendarData.eventPrivacy);
      // this.calendarForm.get('eventIsDateOnly').setValue(this.calendarData.eventIsDateOnly);
      // this.calendarForm.get('eventPicture').setValue(this.calendarData.eventPicture);
      // this.calendarForm.get('eventUpdatedTime').setValue(this.calendarData.eventUpdatedTime);
      // this.calendarForm.get('isdataQueryDateTimeDoc').setValue(this.calendarData.dataQueryDateTime);
      // this.calendarForm.get('dataQueryUpdateDateTime').setValue(this.calendarData.dataQueryUpdateDateTime);
      // this.calendarForm.get('startDate').setValue(this.calendarData.startDate);
      // this.calendarForm.get('endTime').setValue(this.calendarData.endTime);
      // this.calendarForm.get('startTime').setValue(this.calendarData.startTime);
      // this.calendarForm.get('startMonth').setValue(this.calendarData.startMonth);
      // this.calendarForm.get('eventStatus').setValue(this.calendarData.eventStatus);

      // this.eventId = this.calendarData.eventID;
      // this.agencyAppIdEn = agencyApplicationId;
      // this.agencyAppIdBm = agencyApplicationId;
      // this.agencyIdEn = agencyId;
      // this.agencyIdBm = agencyId;
      // this.ministryNameEn = ministryName;
      // this.ministryNameBm = ministryName;

      // this.checkReqValues();
    });
    
  }
  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events = [];
    this.events.push(`${event.value}`);
    this.dt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";
    // console.log(this.dt)
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
      let elem = this.calendarForm.get(reqData);

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

  updateCalendarEvent(formValues: any) {
    
    if(!this.isEdit) {

      let body = {
          "eventName": null,
          "eventDesc": null,
          "eventStartTime": null,
          "eventEndTime": null,
          "eventLocation": null,
          "eventCity": null,
          "eventCountry": null,
          "eventLatitude": null,
          "eventLongitude": null,
          "eventZip": null,
          "eventPrivacy": null,
          "eventIsDateOnly": null,
          "eventPicture": null,
          "eventUpdatedTime": null,
          "dataQueryDateTime": null,
          "dataQueryUpdateDateTime": null,
          "startDate": null,
          "startTime": null,
          "endTime": null,
          "startMonth": null,
          "eventStatus": null
      };
      
      // console.log(formValues)

      body.eventName = formValues.agencyAppNameEn;
      body.eventDesc = formValues.descEn;
      body.eventStartTime = formValues.isDoc;
      body.eventEndTime = formValues.websiteUrl;
      body.eventLocation = formValues.eventLocation;
      body.eventCity = formValues.eventCity;
      body.eventCountry = formValues.eventCountry;
      body.eventLatitude = formValues.eventLatitude;
      body.eventLongitude = formValues.eventLongitude;
      body.eventZip = formValues.eventZip;
      body.eventPrivacy = formValues.eventPrivacy;
      body.eventIsDateOnly = formValues.eventIsDateOnly;
      body.eventPicture = formValues.eventPicture;
      body.eventUpdatedTime = formValues.eventUpdatedTime;
      body.dataQueryDateTime = formValues.dataQueryDateTime;
      body.dataQueryUpdateDateTime = formValues.dataQueryUpdateDateTime;
      body.startDate = formValues.startDate;
      body.startTime = formValues.startTime;
      body.endTime = formValues.endTime;
      body.startMonth = formValues.startMonth;
      body.eventStatus = formValues.eventStatus;

      console.log(body)

      // Add ErrorMsg Service
      this.commonservice.addAgencyApp(body).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), 'success');
          }).bind(this));  
          this.router.navigate(['calendar']);
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');       
        });

      } else {

        console.log(this.refId)
        
      let body = {
        "eventName": null,
        "eventDesc": null,
        "eventStartTime": null,
        "eventEndTime": null,
        "eventLocation": null,
        "eventCity": null,
        "eventCountry": null,
        "eventLatitude": null,
        "eventLongitude": null,
        "eventZip": null,
        "eventPrivacy": null,
        "eventIsDateOnly": null,
        "eventPicture": null,
        "eventUpdatedTime": null,
        "dataQueryDateTime": null,
        "dataQueryUpdateDateTime": null,
        "startDate": null,
        "startTime": null,
        "endTime": null,
        "startMonth": null,
        "eventStatus": null,
        "eventID":  null
      };

      body.eventName = formValues.agencyAppNameEn;
      body.eventDesc = formValues.descEn;
      body.eventStartTime = formValues.isDoc;
      body.eventEndTime = formValues.websiteUrl;
      body.eventLocation = formValues.eventLocation;
      body.eventCity = formValues.eventCity;
      body.eventCountry = formValues.eventCountry;
      body.eventLatitude = formValues.eventLatitude;
      body.eventLongitude = formValues.eventLongitude;
      body.eventZip = formValues.eventZip;
      body.eventPrivacy = formValues.eventPrivacy;
      body.eventIsDateOnly = formValues.eventIsDateOnly;
      body.eventPicture = formValues.eventPicture;
      body.eventUpdatedTime = formValues.eventUpdatedTime;
      body.dataQueryDateTime = formValues.dataQueryDateTime;
      body.dataQueryUpdateDateTime = formValues.dataQueryUpdateDateTime;
      body.startDate = formValues.startDate;
      body.startTime = formValues.startTime;
      body.endTime = formValues.endTime;
      body.startMonth = formValues.startMonth;
      body.eventStatus = formValues.eventStatus;
      body.eventID = this.eventId;
      console.log(body);

      // Update AgencyApp Service
      this.commonservice.updateAgencyApp(body).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), 'success');
          }).bind(this));  
          this.router.navigate(['calendar']);
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        });
      }

    }

}
