import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  sliderData: Object;
  sliderList = null;
  displayedColumns: any;
  displayedColumns2: any;
  sliderPageSize = 10;
  sliderPageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  viewSeq: any; /* View Page Sequence Based on Discussion {1,2} */
  dataUrl: any;
  date = new Date();
  sliderForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  slideCode:any;
  slideIdEn:any;
  slideIdBm:any;

  titleEn: FormControl
  titleBm: FormControl
  descEn: FormControl
  descBm: FormControl
  imgEn: FormControl
  imgBm: FormControl
  active: FormControl
  copyImg: FormControl

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.sliderList);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, private commonservice: CommonService, private router: Router) {
    this.getSlidersData(this.sliderPageCount, this.sliderPageSize);
  }
  resetMsg = this.resetMsg;

  ngOnInit() {
    this.viewSeq = 1;
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.displayedColumns = ['slideCode', 'slideTitleEn', 'slideTitleBm', 'slideActiveFlag', 'slideAction'];
    // this.displayedColumns2 = ['sliderId', 'fullName', 'pid', 'sliderTypeId', 'isStaff', 'accountStatusId'];
    // this.getSlidersData(this.sliderPageCount, this.sliderPageSize);

    // this.complete = false;

    this.titleEn = new FormControl()
    this.titleBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.imgEn = new FormControl()
    this.imgBm = new FormControl()
    this.active = new FormControl()
    this.copyImg = new FormControl()
    // this.email = new FormControl('', Validators.pattern(EMAIL_REGEX))

    this.sliderForm = new FormGroup({
      titleEn: this.titleEn,
      descEn: this.descEn,
      imgEn: this.imgEn,
      titleBm: this.titleBm,
      descBm: this.descBm,
      imgBm: this.imgBm,
      active: this.active,
      copyImg: this.copyImg
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get Slider Data 
  getSlidersData(count, size) {
    // console.log(this.appConfig.urlsliderList + '/?page=' + count + '&size=' + size)
    this.dataUrl = this.appConfig.urlSlides;

    this.http.get(this.dataUrl + '/code/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.sliderList = data;
        console.log(this.sliderList)
        this.dataSource.data = this.sliderList.list;
        this.commonservice.sliderTable = this.sliderList;
        this.noNextData = this.sliderList.pageNumber === this.sliderList.totalPages;
      });
  }

  paginatorL(page) {
    this.getSlidersData(this.sliderPageCount, this.sliderPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getSlidersData(page + 1, this.sliderPageSize);
  }

  pageChange(event, totalPages) {
    this.getSlidersData(this.sliderPageCount, this.sliderPageSize);
    this.sliderPageSize = event.value;
    this.noPrevData = true;
  }

  changePageMode(isEdit) {
    if (isEdit == false) {
      this.pageMode = "Add";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
  }

  isSameImg(enImg,bmImg) {

    console.log(enImg)
    if(enImg != null && enImg == bmImg) {
      this.sliderForm.get('copyImg').setValue(true);
    } else {
      this.sliderForm.get('copyImg').setValue(false);
    }
  }

  // isSameImgAsEn(enImg,bmImg) {
  //   if(enImg !== "" && enImg === bmImg) {
  //     this.sliderForm.get('copyImg').setValue(true);
  //   } else {
  //     this.sliderForm.get('copyImg').setValue(false);
  //   }
  // }

  onPaginateChange(event) {
    // alert(JSON.stringify(event));
    //  const startIndex = event.pageIndex * event.pageSize;
    // this.drugmap.getDrugDataForClient(startIndex, event.pageSize);
    // this.dataSource = new ExampleDataSource(this.exampleDatabase,this.paginator);
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.viewSeq = 2;
    this.sliderForm.reset();
    this.sliderForm.get('active').setValue(true)
    // console.log(this.viewSeq);
    // this.router.navigate(['slider', "add"]);
  }

  navigateBack() {
    this.viewSeq = 1;
    this.isEdit = false;
    this.router.navigate(['slider']);
  }

  // add, update, delete
  updateRow(row) {

    // this.router.navigate(['slider', row]);
    this.viewSeq = 2;
    // alert("Update Slider id: " + row);
    this.isEdit = true;
    this.changePageMode(this.isEdit);

    // Update Slider Service
    return this.http.get(this.appConfig.urlSlides + '/code/' + row).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {

        this.sliderData = Rdata;
        console.log(this.sliderData)
        console.log(this.appConfig.urlSlides + "/" + row)
        let dataEn = this.sliderData['list'][0];
        let dataBm = this.sliderData['list'][1];

      // populate data
      this.sliderForm.get('titleEn').setValue(dataEn.slideTitle);
      this.sliderForm.get('descEn').setValue(dataEn.slideDescription);
      this.sliderForm.get('imgEn').setValue(parseInt(dataEn.slideImage));
      this.sliderForm.get('titleBm').setValue(dataBm.slideTitle);
      this.sliderForm.get('descBm').setValue(dataBm.slideDescription);
      this.sliderForm.get('imgBm').setValue(parseInt(dataBm.slideImage));
      this.sliderForm.get('active').setValue(dataEn.slideActiveFlag);
      this.slideCode = dataEn.slideCode;
      this.slideIdEn = dataEn.slideId;
      this.slideIdBm = dataBm.slideId;
      
      this.isSameImg(dataEn.slideImage,dataBm.slideImage);

      this.checkReqValues();
    });
    
  }

  isChecked(e) {

    if (e.checked) {
      this.sliderForm.get("imgBm").setValue(this.imgEn.value);
    } else {
      this.sliderForm.get("imgBm").setValue("");
    }
    this.copyImg = e.checked;
    this.checkReqValues();
  }

  checkReqValues() {

    let titleEn = "titleEn";
    let descEn = "descEn";
    let imgEn = "imgEn";
    let titleBm = "titleBm";
    let descBm = "descBm";
    let imgBm = "imgBm";
    // let active = "active";

    let reqVal: any = [titleEn, descEn, imgEn, titleBm, descBm, imgBm];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.sliderForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    this.isSameImg(this.sliderForm.get(imgEn).value,this.sliderForm.get(imgBm).value);

      // console.log(nullPointers)

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
      this.sliderForm.reset();
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
          txt = "Slider deleted successfully!";
          // this.router.navigate(['slider']);
          window.location.reload()
        },
        error => {
          console.log("No Data")
        });

      // this.sliderForm.reset();
    } else {
      txt = "Delete Cancelled!";
      alert(txt)
    }
  }
  
  updateSlider(formValues: any) {
    // console.log(this.viewSeq);
    let sliderCode = Math.floor((Math.random() * 100) + 1);
    
    if(!this.isEdit) {

    let body = [
      {
        "slideTitle": null,
        "slideDescription": null,
        "slideImage": null,
        "slideCode": sliderCode,
        "slideSort": null,
        "slideActiveFlag": false,
        "language": {
          "languageId": null
        }
      }, 
      {
        "slideTitle": null,
        "slideDescription": null,
        "slideImage": null,
        "slideCode": sliderCode,
        "slideSort": null,
        "slideActiveFlag": false,
        "language": {
          "languageId": null
        }
      }
    ];
    
    // console.log(formValues)

    body[0].slideTitle = formValues.titleEn;
    body[0].slideDescription = formValues.descEn;
    body[0].slideImage = formValues.imgEn;
    body[0].slideSort = null;
    body[0].slideActiveFlag = formValues.active;
    body[0].language.languageId = 1;

    body[1].slideTitle = formValues.titleBm;
    body[1].slideDescription = formValues.descBm;
    body[1].slideImage = formValues.imgBm;
    body[1].slideSort = null;
    body[1].slideActiveFlag = formValues.active;
    body[1].language.languageId = 2;

    console.log(body)
    // console.log(JSON.stringify(body))

    // Add Slider Service
    this.commonservice.addSlider(body).subscribe(
      data => {
        alert('Slider added successfully!')
        window.location.reload()
      },
      error => {
        console.log("No Data")
      });

    } else {
      
    let body = [
      {
        "slideId": null,
        "slideTitle": null,
        "slideDescription": null,
        "slideImage": null,
        "slideCode": sliderCode,
        "slideSort": null,
        "slideActiveFlag": false,
        "language": {
          "languageId": null
        }
      }, 
      {
        "slideId": null,
        "slideTitle": null,
        "slideDescription": null,
        "slideImage": null,
        "slideCode": sliderCode,
        "slideSort": null,
        "slideActiveFlag": false,
        "language": {
          "languageId": null
        }
      }
    ];
      
    body[0].slideCode = this.slideCode;
    body[0].slideId = this.slideIdEn;
    body[0].slideTitle = formValues.titleEn;
    body[0].slideDescription = formValues.descEn;
    body[0].slideImage = formValues.imgEn;
    body[0].slideSort = null;
    body[0].slideActiveFlag = formValues.active;
    body[0].language.languageId = 1;
    
    body[1].slideCode = this.slideCode;
    body[1].slideId = this.slideIdBm;
    body[1].slideTitle = formValues.titleBm;
    body[1].slideDescription = formValues.descBm;
    body[1].slideImage = formValues.imgBm;
    body[1].slideSort = null;
    body[1].slideActiveFlag = formValues.active;
    body[1].language.languageId = 2;

    console.log(body);

    // Update Slider Service
    this.commonservice.updateSlider(body).subscribe(
      data => {
        alert('Slider update successful!')
        //window.location.reload()
      },
      error => {
        console.log("No Data")
      });
    }
    

  }

  // showResetMsg(){
  //   this.dialogsService
  //   .confirm('', this.translate.instant('feedback.reset'))
  //   .subscribe(
  //     data => {
  //       if(data){
  //         this.resetForm();
  //       }
  //     });
  // }

  // resetForm(){
  //   this.nama_penuh.reset();
  //   this.feedback_message.reset();
  //   this.email.reset();
  //   this.feedbacksubject.reset();
  //   this.feedbacktype.reset();
  //   this.sendMsg = true;
  // } 

  // resetMethod(event) {
  //   this.resetForm();
  // }
}
