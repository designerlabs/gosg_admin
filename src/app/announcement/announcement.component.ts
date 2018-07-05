import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  announceData: Object;
  dataUrl: any;
  date = new Date();
  announceForm: FormGroup
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  announcementIDEn:any;
  announcementIDBm:any;

  titleEn: FormControl
  titleBm: FormControl
  descEn: FormControl
  descBm: FormControl
  urlEn: FormControl
  urlBm: FormControl
  htmlContentEn: FormControl
  htmlContentBm: FormControl
  active: FormControl
  resetMsg = this.resetMsg;
  private subscription: Subject<any> = new Subject();
  // dataEn: object;
  // dataBm: object;

  htmlContent = '';
  editorConfig = {
    "editable": true,
    "height": "5rem",
    "minHeight": "2rem",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "toolbar": [
        ["bold", "italic"],
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["orderedList", "unorderedList"],
        ["link", "unlink", "image"]
    ]
}

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // this.isEdit = false;
    // this.changePageMode(this.isEdit);

    let refCode = this.router.url.split('/')[2];

    this.titleEn = new FormControl()
    this.titleBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.urlEn = new FormControl()
    this.urlBm = new FormControl()
    this.htmlContentEn = new FormControl()
    this.htmlContentBm = new FormControl()
    this.active = new FormControl()

    this.announceForm = new FormGroup({
      titleEn: this.titleEn,
      descEn: this.descEn,
      htmlContentEn: this.htmlContentEn,
      titleBm: this.titleBm,
      descBm: this.descBm,
      urlEn: this.urlEn,
      urlBm: this.urlBm,
      htmlContentBm: this.htmlContentBm,
      active: this.active
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add"; this.pageMode = "Add";
      this.announceForm.get('active').setValue(true);
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }
  }


  // navigateBack() {
  //   this.isEdit = false;
  //   this.router.navigate(['announcement']);
  // }

  back(){
    this.router.navigate(['announcement']);
  }

  // get, add, update, delete
  getRow(row) {
    // Update Slider Service
    return this.http.get(this.appConfig.urlAnnounceList + '/' + row).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {

        this.announceData = Rdata;


        let dataEn = this.announceData['announcementEntityList'][1];
        let dataBm = this.announceData['announcementEntityList'][0];

      // populate data
      this.announceForm.get('titleEn').setValue(dataEn.announcementTitle);
      this.announceForm.get('descEn').setValue(dataEn.announcementDescription);
      this.announceForm.get('htmlContentEn').setValue(dataEn.announcementText);
      this.announceForm.get('titleBm').setValue(dataBm.announcementTitle);
      this.announceForm.get('descBm').setValue(dataBm.announcementDescription);
      this.announceForm.get('urlEn').setValue(dataEn.announcementUrl);
      this.announceForm.get('urlBm').setValue(dataBm.announcementUrl);
      this.announceForm.get('htmlContentBm').setValue(dataBm.announcementText);
      this.announceForm.get('active').setValue(dataEn.announcementActiveFlag);
      this.announcementIDEn = dataEn.announcementID;
      this.announcementIDBm = dataBm.announcementID;

      // this.isSameImg(dataEn.slideImage,dataBm.slideImage);

      this.checkReqValues();
    });

  }


  checkReqValues() {

    let titleEn = "titleEn";
    let descEn = "descEn";
    let htmlContentEn = "htmlContentEn";
    let titleBm = "titleBm";
    let descBm = "descBm";
    let htmlContentBm = "htmlContentBm";
    // let active = "active";

    let reqVal: any = [titleEn, descEn, htmlContentEn, titleBm, descBm, htmlContentBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.announceForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    // this.isSameImg(this.announceForm.get(htmlContentEn).value,this.announceForm.get(htmlContentBm).value);

      //

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  myFunction() {
    // let txt;
    // let r = confirm("Are you sure to reset the form?");
    // if (r == true) {
    //   txt = "You pressed OK!";
      this.announceForm.reset();
      this.announceForm.get('active').setValue(true);
    // } else {
    //   txt = "You pressed Cancel!";
    // }
  }

  // deleteRow(enId,bmId) {
  //   let txt;
  //   let r = confirm("Are you sure to delete " + enId + " & " + bmId + "?");
  //   if (r == true) {

  //     this.commonservice.delSlider(enId,bmId).subscribe(
  //       data => {
  //         txt = "Announcement deleted successfully!";
  //         window.location.reload()
  //       },
  //       error => {
  //
  //       });

  //     // this.announceForm.reset();
  //   } else {
  //     txt = "Delete Cancelled!";
  //     alert(txt)
  //   }
  // }

  // updateAnnounce(formValues: any) {

  //   if(!this.isEdit) {

  //   let body = [
  //     {
  //       "announcementTitle": null,
  //       "announcementDescription": null,
  //       "announcementText": null,
  //       "announcementActiveFlag": false,
  //       "language": {
  //         "languageId": null
  //       }
  //     },
  //     {
  //       "announcementTitle": null,
  //       "announcementDescription": null,
  //       "announcementText": null,
  //       "announcementActiveFlag": false,
  //       "language": {
  //         "languageId": null
  //       }
  //     }
  //   ];

  //   //

  //   body[0].announcementTitle = formValues.titleEn;
  //   body[0].announcementDescription = formValues.descEn;
  //   body[0].announcementText = formValues.htmlContentEn;
  //   body[0].announcementActiveFlag = formValues.active;
  //   body[0].language.languageId = 1;

  //   body[1].announcementTitle = formValues.titleBm;
  //   body[1].announcementDescription = formValues.descBm;
  //   body[1].announcementText = formValues.htmlContentBm;
  //   body[1].announcementActiveFlag = formValues.active;
  //   body[1].language.languageId = 2;

  //

  //   // Add Slider Service
  //   this.commonservice.addSlider(body).subscribe(
  //     data => {
  //       this.toastr.success('Announcement added successfully!', '');
  //       this.router.navigate(['announcement']);
  //     },
  //     error => {
  //
  //     });

  //   } else {

  //   let body = [
  //     {
  //       "announcementID": null,
  //       "announcementTitle": null,
  //       "announcementDescription": null,
  //       "announcementText": null,
  //       "announcementActiveFlag": false,
  //       "language": {
  //         "languageId": null
  //       }
  //     },
  //     {
  //       "announcementID": null,
  //       "announcementTitle": null,
  //       "announcementDescription": null,
  //       "announcementText": null,
  //       "announcementActiveFlag": false,
  //       "language": {
  //         "languageId": null
  //       }
  //     }
  //   ];

  //   body[0].announcementID = this.announcementIDEn;
  //   body[0].announcementTitle = formValues.titleEn;
  //   body[0].announcementDescription = formValues.descEn;
  //   body[0].announcementText = formValues.htmlContentEn;
  //   body[0].announcementActiveFlag = formValues.active;
  //   body[0].language.languageId = 1;

  //   body[1].announcementID = this.announcementIDBm;
  //   body[1].announcementTitle = formValues.titleBm;
  //   body[1].announcementDescription = formValues.descBm;
  //   body[1].announcementText = formValues.htmlContentBm;
  //   body[1].announcementActiveFlag = formValues.active;
  //   body[1].language.languageId = 2;

  //

  //   // Update Slider Service
  //   this.commonservice.updateAnnounce(body).subscribe(
  //     data => {
  //       this.toastr.success('Announcement update successful!', '');
  //       this.router.navigate(['announcement']);
  //     },
  //     error => {
  //
  //     });
  //   }
  // }
}
