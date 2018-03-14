import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-eventcalendar',
  templateUrl: './eventcalendar.component.html',
  styleUrls: ['./eventcalendar.component.css']
})
export class EventcalendarComponent implements OnInit {
  
  date = new Date();
  dateFormatExample = "dd/mm/yyyy";
  events: string[] = [];
  sdt:number;
  edt:number;
  eventData: Object;
  dataUrl: any;
  updateForm: FormGroup
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

  nameEn: FormControl
  nameBm: FormControl
  descEn: FormControl
  descBm: FormControl
  start: FormControl
  end: FormControl
  image: FormControl
  location: FormControl
  city: FormControl
  active: FormControl

  resetMsg = this.resetMsg;
  public loading = false;

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

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    this.getMinEventDate();
    this.getImageList();

    this.nameEn = new FormControl()
    this.nameBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.location = new FormControl()
    this.city = new FormControl()
    this.start = new FormControl()
    this.end = new FormControl()
    this.active = new FormControl()
    this.image = new FormControl()
    
    this.updateForm = new FormGroup({
      nameEn: this.nameEn,
      nameBm: this.nameBm,
      descEn: this.descEn,
      descBm: this.descBm,
      start: this.start,
      end: this.end,
      location: this.location,
      city: this.city,
      image: this.image,
      active: this.active
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
      this.updateForm.get('active').setValue(true);
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
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

  getMinEventDate(){
    let today = new Date();
    let todaysdt = today.getDate();
    let year = today.getFullYear();
    let month = today.getMonth();

    this.minDate = new Date(year, month, todaysdt);
  }

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['calendar']);
  }

  back(){
    this.router.navigate(['calendar']);
  }

  // get, add, update, delete
  getRow(row) {

    this.loading = true;
    // Update event Service
    return this.commonservice.readProtectedById('calendar/', row).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){

        this.eventData = Rdata;
        console.log(this.eventData)
        let dataEn = this.eventData['list'][0];
        let dataBm = this.eventData['list'][1];

      // populate data
      this.updateForm.get('nameEn').setValue(dataEn.eventName);
      this.updateForm.get('descEn').setValue(dataEn.eventDescription);
      this.updateForm.get('nameBm').setValue(dataBm.eventName);
      this.updateForm.get('descBm').setValue(dataBm.eventDescription);
      this.updateForm.get('location').setValue(dataBm.eventLocation);
      this.updateForm.get('city').setValue(dataBm.eventCity);
      this.updateForm.get('start').setValue(dataBm.eventStart);
      this.updateForm.get('end').setValue(dataBm.eventEnd);
      this.updateForm.get('image').setValue(dataBm.image.mediaId);
      this.updateForm.get('active').setValue(dataEn.enabled);
      this.eventCode = dataEn.eventCode;
      this.eventIdEn = dataEn.id;
      this.eventIdBm = dataBm.id;
      
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

  getImageList(){
    this.loading = true;
    this.commonservice.readProtected('media/category/name/Article')
     .subscribe(resCatData => {

      this.commonservice.errorHandling(resCatData, (function(){

        this.imageData = resCatData['list'];       
        console.log(this.imageData);

      }).bind(this));
      this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      this.loading = false;
      console.log(error);
    });
  }

  checkReqValues() {

    let nameEn = "nameEn";
    let descEn = "descEn";
    let nameBm = "nameBm";
    let descBm = "descBm";
    let location = "location";
    let city = "city";
    let start = "start";
    let end = "end";
    let image = "image";

    let reqVal: any = [
                        nameEn, 
                        descEn, 
                        nameBm, 
                        descBm, 
                        location, 
                        city, 
                        start, 
                        end
                      ];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);
      // console.log(elem.value)

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

  addStartEvent(type: string, event: MatDatepickerInputEvent<Date>) { 
    console.log(type)
    console.log(event)
    this.events = [];
    this.events.push(`${event.value}`);
    this.sdt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";
    console.log(this.sdt)
    this.checkReqValues()
  }

  addEndEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(type)
    this.events = [];
    this.events.push(`${event.value}`);
    this.edt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";
    console.log(this.edt)
    this.checkReqValues()
  }

  updateAction(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "eventName": null,
        "eventDescription": null,
        "eventStart": null,
        "eventEnd": null,
        "eventLocation": null,
        "eventCity": null,
        "enabled": false,
        "externalData": false,
        "image": {
          "mediaId": null
        },
        "language": {
          "languageId": 1
        }
      }, 
      {
        "eventName": null,
        "eventDescription": null,
        "eventStart": null,
        "eventEnd": null,
        "eventLocation": null,
        "eventCity": null,
        "enabled": false,
        "externalData": false,
        "image": {
          "mediaId": null
        },
        "language": {
          "languageId": 2
        }
      }
    ];
    
    // console.log(formValues)

    body[0].eventName = formValues.nameEn;
    body[0].eventDescription = formValues.descEn;
    body[0].eventStart = new Date(formValues.start).getTime();
    body[0].eventEnd =  new Date(formValues.end).getTime();
    body[0].eventLocation = formValues.location;
    body[0].eventCity = formValues.city;
    body[0].enabled = formValues.active;
    
    body[1].eventName = formValues.nameBm;
    body[1].eventDescription = formValues.descBm;
    body[1].eventStart = new Date(formValues.start).getTime();
    body[1].eventEnd =  new Date(formValues.end).getTime();
    body[1].eventLocation = formValues.location;
    body[1].eventCity = formValues.city;
    body[1].enabled = formValues.active;
    
    if(formValues.image) {
      body[0].image.mediaId = formValues.image;
      body[1].image.mediaId = formValues.image;
    } else {
      body[0].image = null;
      body[1].image = null;
    }

    console.log(body)

    this.loading = true;
    // Add event Service
    this.commonservice.create(body,'calendar').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
        this.router.navigate(['calendar']);
      this.loading = false;
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
        this.loading = false;
      });

    } else {
      
    let body = [
      {
        "id": null,
        "eventCode": null,
        "eventName": null,
        "eventDescription": null,
        "eventStart": null,
        "eventEnd": null,
        "eventLocation": null,
        "eventCity": null,
        "enabled": false,
        "externalData": false,
        "image": {
          "mediaId": null
        },
        "language": {
          "languageId": 1
        }
      }, 
      {
        "id": null,
        "eventCode": null,
        "eventName": null,
        "eventDescription": null,
        "eventStart": null,
        "eventEnd": null,
        "eventLocation": null,
        "eventCity": null,
        "enabled": false,
        "externalData": false,
        "image": {
          "mediaId": null
        },
        "language": {
          "languageId": 2
        }
      }
    ];

    body[0].id = this.eventIdEn;
    body[0].eventName = formValues.nameEn;
    body[0].eventDescription = formValues.descEn;
    body[0].eventStart = new Date(formValues.start).getTime();
    body[0].eventEnd =  new Date(formValues.end).getTime();
    body[0].eventLocation = formValues.location;
    body[0].eventCity = formValues.city;
    body[0].enabled = formValues.active;
    body[0].eventCode = this.eventCode;

    body[1].id = this.eventIdBm;
    body[1].eventName = formValues.nameBm;
    body[1].eventDescription = formValues.descBm;
    body[1].eventStart = new Date(formValues.start).getTime();
    body[1].eventEnd =  new Date(formValues.end).getTime();
    body[1].eventLocation = formValues.location;
    body[1].eventCity = formValues.city;
    body[1].enabled = formValues.active;
    body[1].eventCode = this.eventCode;
    
    if(formValues.image) {
      body[0].image.mediaId = formValues.image;
      body[1].image.mediaId = formValues.image;
    } else {
      body[0].image = null;
      body[1].image = null;
    }

    console.log(body);
    // this.loading = true;

    // Update event Service
    this.commonservice.update(body,'calendar').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['calendar']);
      this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
        this.loading = false;
      });
    }
    

  }

}
