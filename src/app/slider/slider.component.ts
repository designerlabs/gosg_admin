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
      data => {
        this.sliderList = data;
        console.log(this.sliderList)
        this.dataSource.data = this.sliderList.slideCodeList;
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

  onPaginateChange(event) {
    // alert(JSON.stringify(event));
    //  const startIndex = event.pageIndex * event.pageSize;
    // this.drugmap.getDrugDataForClient(startIndex, event.pageSize);
    // this.dataSource = new ExampleDataSource(this.exampleDatabase,this.paginator);
  }

  addBtn() {
    this.viewSeq = 2;
    // console.log(this.viewSeq);
    // this.router.navigate(['slider', "add"]);
  }

  navigateBack() {
    // this.router.navigate(['slider']);
    this.viewSeq = 1;
  }

  // add, update, delete
  updateRow(row) {
    console.log(this.viewSeq);
    console.log(row);
    alert("Update Slider id: " + row);
    // this.commonservice.GetUser(row.userId);
  }

  deleteRow(enId,bmId) {
    // console.log(enId);
    alert("Delete Slider id: " + enId + " & " +bmId);
    // this.commonservice.GetUser(row.userId);
  }

  isChecked(e) {

    if (e.checked) {
      this.sliderForm.get("imgBm").setValue(this.sliderForm.get("imgEn").value);
      // console.log(e.checked)
    } else {
      this.sliderForm.get("imgBm").setValue("");
    }
    this.copyImg = e.checked;
  }

  checkReqValues() {
    let titleEn = "titleEn";
    let descEn = "descEn";
    let imgEn = "imgEn";
    let titleBm = "titleBm";
    let descBm = "descBm";
    let imgBm = "imgBm";
    let active = "active";

    let reqVal: any = [titleEn, descEn, imgEn, titleBm, descBm, imgBm, active];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.sliderForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
      // this.toastr.error(this.translate.instant('Country error!'), '');
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

  updateSlider(formValues: any) {
    // console.log(this.viewSeq);

    let body = [
      {
        "slideTitle": null,
        "slideDescription": null,
        "slideImage": null,
        "slideCode": null,
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
        "slideCode": null,
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
    body[0].slideImage = "enImg.png";
    body[0].slideCode = null;
    body[0].slideSort = null;
    body[0].slideActiveFlag = formValues.active;
    body[0].language.languageId = 1;

    body[1].slideTitle = formValues.titleBm;
    body[1].slideDescription = formValues.descBm;
    body[1].slideImage = "bmImg.jpg";
    body[1].slideCode = null;
    body[1].slideSort = null;
    body[1].slideActiveFlag = formValues.active;
    body[1].language.languageId = 2;

    console.log(body)
    // console.log(JSON.stringify(body))

    // Add Slider Service
    this.commonservice.addSlider(body).subscribe(
      data => {
        alert('Slider added successfully!')
        this.router.navigate(['slider']);
      },
      error => {
        console.log("No Data")
      });

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
