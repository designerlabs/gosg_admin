import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eventcalendarext',
  templateUrl: './eventcalendarext.component.html',
  styleUrls: ['./eventcalendarext.component.css']
})
export class EventcalendarextComponent implements OnInit {
  
  date = new Date();
  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  sdt:number;
  edt:number;
  eventData: Object;
  dataUrl: any;
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  eventCode:any;
  eventIdEn:any;
  eventIdBm:any;
  minDate: any;
  imageData: any;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;

  eventName: String;
  eventDescription: String;
  eventLocation: String;
  eventStart: any;
  eventEnd: any;
  enabled: boolean;

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
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 

    let eventId = this.router.url.split('/')[2];
    this.commonservice.getModuleId();

    this.getRow(eventId);
    
    // #### for disable non update user ---1
    // if(!this.commonservice.isUpdate && this.commonservice.isWrite){
    //   this.updateForm.enable();
    // }else if(!this.commonservice.isUpdate){
    //   this.updateForm.disable();
    // }
  }

  ngAfterViewInit() {
  }

  setEventDate(tsd,type) {
    let res;    
    this.events = [];
    this.events.push(tsd);
    // this.events.push(`${event.value}`);
    if(type == 'start')
      this.sdt = new Date(this.events[0]).getTime();
    else
      this.edt = new Date(this.events[0]).getTime();

    this.dateFormatExample = "";
 
    // console.log(res)

    return res;
  }

  back(){
    this.router.navigate(['calendarext']);
  }

  // get, add, update, delete
  getRow(row) {

    this.loading = true;
    // Update event Service
    return this.commonservice.readProtectedById('calendar/external/', row).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){

        this.eventData = Rdata['object'];
        console.log(this.eventData)

      // populate data
      this.eventName = this.eventData.eventName;
      this.eventDescription = this.eventData.eventName;
      this.eventLocation = this.eventData.eventLocation;
      this.eventStart = this.eventData.eventStart;
      this.eventEnd = this.eventData.eventEnd;
      this.enabled = this.eventData.enabled;
      // this.updateForm.get('nameEn').setValue();
      // this.updateForm.get('descEn').setValue(this.eventData.eventDescription);
      // this.updateForm.get('nameBm').setValue(this.eventData.eventName);
      // this.updateForm.get('descBm').setValue(this.eventData.eventDescription);
      // this.updateForm.get('location').setValue(this.eventData.eventLocation);
      // this.updateForm.get('start').setValue(new Date(this.eventData.eventStart).toISOString());
      // this.updateForm.get('end').setValue(new Date(this.eventData.eventEnd).toISOString());

    }).bind(this));
    this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      console.log(error);  
      this.loading = false;
      });
    
  }

}
