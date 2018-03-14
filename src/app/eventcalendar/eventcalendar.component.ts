import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
  
  eventData: Object;
  dataUrl: any;
  date = new Date();
  updateForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  eventCode:any;
  eventIdEn:any;
  eventIdBm:any;

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

  isSameImg(enImg,bmImg) {

    console.log(enImg)
    if(enImg != null && enImg == bmImg) {
      this.updateForm.get('copyImg').setValue(true);
    } else {
      this.updateForm.get('copyImg').setValue(false);
    }
  }

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['event']);
  }

  back(){
    this.router.navigate(['event']);
  }

  // get, add, update, delete
  getRow(row) {

    this.loading = true;
    // Update event Service
    return this.commonservice.readPortalById('slide/code/', row).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){

        this.eventData = Rdata;
        console.log(this.eventData)
        let dataEn = this.eventData['list'][0];
        let dataBm = this.eventData['list'][1];

      // populate data
      this.updateForm.get('nameEn').setValue(dataEn.eventTitle);
      this.updateForm.get('descEn').setValue(dataEn.eventDescription);
      this.updateForm.get('imgEn').setValue(parseInt(dataEn.eventImage));
      this.updateForm.get('nameBm').setValue(dataBm.eventTitle);
      this.updateForm.get('descBm').setValue(dataBm.eventDescription);
      this.updateForm.get('imgBm').setValue(parseInt(dataBm.eventImage));
      this.updateForm.get('active').setValue(dataEn.eventActiveFlag);
      this.eventCode = dataEn.eventCode;
      this.eventIdEn = dataEn.eventId;
      this.eventIdBm = dataBm.eventId;
      
      this.isSameImg(dataEn.eventImage,dataBm.eventImage);

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

  // isChecked(e) {

  //   if (e.checked) {
  //     this.updateForm.get("imgBm").setValue(this.imgEn.value);
  //   } else {
  //     this.updateForm.get("imgBm").setValue("");
  //   }
  //   this.copyImg = e.checked;
  //   this.checkReqValues();
  // }

  checkReqValues() {

    let nameEn = "nameEn";
    let descEn = "descEn";
    let imgEn = "imgEn";
    let nameBm = "nameBm";
    let descBm = "descBm";
    let imgBm = "imgBm";
    // let active = "active";

    let reqVal: any = [nameEn, descEn, imgEn, nameBm, descBm, imgBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    this.isSameImg(this.updateForm.get(imgEn).value,this.updateForm.get(imgBm).value);

      // console.log(nullPointers)

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  myFunction() {
    this.updateForm.reset();
    this.updateForm.get('active').setValue(true);
  }

  updateevent(formValues: any) {
    
    if(!this.isEdit) {

    let body = [
      {
        "eventTitle": null,
        "eventDescription": null,
        "eventImage": {
          "mediaId": null
        },
        "eventCode": null,
        "eventSort": null,
        "eventActiveFlag": false,
        "language": {
          "languageId": null
        }
      }, 
      {
        "eventTitle": null,
        "eventDescription": null,
        "eventImage":  {
          "mediaId": null
        },
        "eventCode": null,
        "eventSort": null,
        "eventActiveFlag": false,
        "language": {
          "languageId": null
        }
      }
    ];
    
    // console.log(formValues)

    body[0].eventTitle = formValues.nameEn;
    body[0].eventDescription = formValues.descEn;
    body[0].eventImage.mediaId = formValues.imgEn;
    body[0].eventSort = null;
    body[0].eventActiveFlag = formValues.active;
    body[0].language.languageId = 1;

    body[1].eventTitle = formValues.nameBm;
    body[1].eventDescription = formValues.descBm;
    body[1].eventImage.mediaId = formValues.imgBm;
    body[1].eventSort = null;
    body[1].eventActiveFlag = formValues.active;
    body[1].language.languageId = 2;

    console.log(body)

    this.loading = true;
    // Add event Service
    this.commonservice.create(body,'slide').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
        this.toastr.success('event added successfully!', ''); 
        this.router.navigate(['event']);

      }).bind(this)); 
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
        "eventId": null,
        "eventTitle": null,
        "eventDescription": null,
        "eventImage": {
          "mediaId": null
        },
        "eventCode": null,
        "eventSort": null,
        "eventActiveFlag": false,
        "language": {
          "languageId": null
        }
      }, 
      {
        "eventId": null,
        "eventTitle": null,
        "eventDescription": null,
        "eventImage": {
          "mediaId": null
        },
        "eventCode": null,
        "eventSort": null,
        "eventActiveFlag": false,
        "language": {
          "languageId": null
        }
      }
    ];
      
    body[0].eventCode = this.eventCode;
    body[0].eventId = this.eventIdEn;
    body[0].eventTitle = formValues.nameEn;
    body[0].eventDescription = formValues.descEn;
    body[0].eventImage.mediaId = formValues.imgEn;
    body[0].eventSort = null;
    body[0].eventActiveFlag = formValues.active;
    body[0].language.languageId = 1;
    
    body[1].eventCode = this.eventCode;
    body[1].eventId = this.eventIdBm;
    body[1].eventTitle = formValues.nameBm;
    body[1].eventDescription = formValues.descBm;
    body[1].eventImage.mediaId = formValues.imgBm;
    body[1].eventSort = null;
    body[1].eventActiveFlag = formValues.active;
    body[1].language.languageId = 2;

    console.log(body);
    this.loading = true;

    // Update event Service
    this.commonservice.update(body,'slide').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
        this.toastr.success('event update successful!', '');   
        this.router.navigate(['event']);

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

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.events = [];
  //   this.events.push(`${event.value}`);
  //   this.dt = new Date(this.events[0]).getTime();
  //   this.dateFormatExample = "";
    // console.log(this.dt)
  // }

}
