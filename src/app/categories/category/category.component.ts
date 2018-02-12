import { Component, OnInit, ViewEncapsulation, ViewChild, Inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  announceCateData: Object;
  CategoryForm: FormGroup
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  announceCategorymentIDEn:any;
  announceCategorymentIDBm:any;

  nameEn: FormControl
  nameBm: FormControl
  descEn: FormControl
  descBm: FormControl
  urlEn: FormControl
  urlBm: FormControl
  htmlContentEn: FormControl
  htmlContentBm: FormControl
  active: FormControl
  resetMsg = this.resetMsg;
  private subscription: Subject<any> = new Subject();
  
  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 
    debugger;
    let refCode = this.router.url.split('/')[2];

    this.nameEn = new FormControl()
    this.nameBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.active = new FormControl()

    this.CategoryForm = new FormGroup({
      nameEn: this.nameEn,
      descEn: this.descEn,
      nameBm: this.nameBm,
      descBm: this.descBm,
      active: this.active
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add"; this.pageMode = "Add";
      this.CategoryForm.get('active').setValue(true);
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
    this.router.navigate(['category']);
  }

  // get, add, update, delete
  getRow(row) {
    debugger;
    return this.http.get(this.appConfig.urlCategoryList + '/code/' + row).subscribe(
      Rdata => {
        this.announceCateData = Rdata;
        console.log(this.announceCateData)
        console.log(this.appConfig.urlAnnounceList + "/" + row)
        let dataEn = this.announceCateData['announcementList'][1];
        let dataBm = this.announceCateData['announcementList'][0];

      // populate data
      this.CategoryForm.get('nameEn').setValue(dataEn.announcementCategoryName);
      this.CategoryForm.get('descEn').setValue(dataEn.announcementCategoryDescription);
      this.CategoryForm.get('nameBm').setValue(dataBm.announcementCategoryName);
      this.CategoryForm.get('descBm').setValue(dataBm.announcementCategoryDescription);
      this.CategoryForm.get('active').setValue(dataEn.announcementCategoryActiveFlag);
      this.announceCategorymentIDEn = dataEn.announcementID;
      this.announceCategorymentIDBm = dataBm.announcementID;

      this.checkReqValues();
    });    
  }

  checkReqValues() {

    let nameEn = "nameEn";
    let descEn = "descEn";
    let nameBm = "nameBm";
    let descBm = "descBm";
    // let active = "active";

    let reqVal: any = [nameEn, descEn, nameBm, descBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.CategoryForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  myFunction() {
    let txt;
    let r = confirm("Are you sure to reset the form?");
    if (r == true) {
      txt = "You pressed OK!";
      this.CategoryForm.reset();
      this.CategoryForm.get('active').setValue(true);
    } else {
      txt = "You pressed Cancel!";
    }
  }

  deleteRow(enId,bmId) {
    let txt;
    let r = confirm("Are you sure to delete " + enId + " & " + bmId + "?");
    if (r == true) {

      this.commonservice.delSlider(enId,bmId).subscribe(
        data => {
          txt = "Announcement deleted successfully!";
          window.location.reload()
        },
        error => {
          console.log("No Data")
        });

      // this.announceForm.reset();
    } else {
      txt = "Delete Cancelled!";
      alert(txt)
    }
  }
  
  updateAnnounce(formValues: any) {    
    if(!this.isEdit) {

    let body = [
      {
        "announcementCategoryName": null,
        "announcementCategoryDescription": null,
        "announcementCategoryActiveFlag": false,
        "language": {
          "languageId": null
        }
      }, 
      {
        "announcementCategoryName": null,
        "announcementCategoryDescription": null,
        "announcementCategoryActiveFlag": false,
        "language": {
          "languageId": null
        }
      }
    ];
    
    // console.log(formValues)

    body[0].announcementCategoryName = formValues.nameEn;
    body[0].announcementCategoryDescription = formValues.descEn;
    body[0].announcementCategoryActiveFlag = formValues.active;
    body[0].language.languageId = 1;

    body[1].announcementCategoryName = formValues.nameBm;
    body[1].announcementCategoryDescription = formValues.descBm;
    body[1].announcementCategoryActiveFlag = formValues.active;
    body[1].language.languageId = 2;

    console.log(body)

    // Add Slider Service
    this.commonservice.addSlider(body).subscribe(
      data => {
        this.toastr.success('Announcement added successfully!', ''); 
        this.router.navigate(['announcement']);
      },
      error => {
        console.log("No Data")
      });

    } else {
      
    let body = [
      {
        "announcementCategoryId": null,
        "announcementCategoryName": null,
        "announcementCategoryDescription": null,
        "announcementCategoryActiveFlag": false,
        "language": {
          "languageId": null
        }
      }, 
      {
        "announcementCategoryId": null,
        "announcementCategoryName": null,
        "announcementCategoryDescription": null,
        "announcementCategoryActiveFlag": false,
        "language": {
          "languageId": null
        }
      }
    ];
      
    body[0].announcementCategoryId = this.announceCategorymentIDEn;
    body[0].announcementCategoryName = formValues.nameEn;
    body[0].announcementCategoryDescription = formValues.descEn;
    body[0].announcementCategoryActiveFlag = formValues.active;
    body[0].language.languageId = 1;
    
    body[1].announcementCategoryId = this.announceCategorymentIDBm;
    body[1].announcementCategoryName = formValues.nameBm;
    body[1].announcementCategoryDescription = formValues.descBm;
    body[1].announcementCategoryActiveFlag = formValues.active;
    body[1].language.languageId = 2;

    console.log(body);

    // Update Slider Service
    this.commonservice.updateAnnounce(body).subscribe(
      data => {
        this.toastr.success('Announcement Category update successful!', '');   
        this.router.navigate(['category']);
      },
      error => {
        console.log("No Data")
      });
    }
  }

}
