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
  displayedColumns :any;
  displayedColumns2 :any;
  sliderPageSize = 10;
  sliderPageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  viewSeq = 1; /* View Page Sequence Based on Discussion {1,2} */
  dataUrl:any;
  date = new Date();
  sliderForm: FormGroup
  isLocalAPI: boolean;
  isEdit: boolean;
  pageMode:String;

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

  ngOnInit() {
    // this.viewSeq = 1; /* View Page change by {1,2} */
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.displayedColumns = ['slideId','slideTitle', 'slideDescription', 'slideImage', 'slideActiveFlag','slideAction'];
    this.displayedColumns2 = ['sliderId','fullName', 'pid', 'sliderTypeId', 'isStaff', 'accountStatusId'  ];
    this.getSlidersData(this.sliderPageCount, this.sliderPageSize);
    // console.log(this.dataSource)

    // this.complete = false;

    this.titleEn = new FormControl()
    this.titleBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.imgEn = new FormControl([Validators.required])
    this.imgBm = new FormControl()
    this.active = new FormControl()
    this.copyImg = new FormControl()
    // this.email = new FormControl('', Validators.pattern(EMAIL_REGEX))

    this.sliderForm = new FormGroup({
      titleEn: this.titleEn,
      descEn: this.descEn,
      imgEn: this.descEn,
      titleBm: this.titleEn,
      descBm: this.descEn,
      imgBm: this.descEn,
      active: this.active,
      copyImg: this.copyImg
    });
  }

  // get Slider Data 
  getSlidersData(count,size) {
  // console.log(this.appConfig.urlsliderList + '/?page=' + count + '&size=' + size)

    this.dataUrl = this.appConfig.urlSlides;

    this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size).subscribe(
      data => {
      this.sliderList = data;
        console.log(this.sliderList)
      this.dataSource.data = this.sliderList.slideList;
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
    this.getSlidersData(this.sliderPageCount + 1, this.sliderPageSize);
  }

  changePageMode(isEdit) {
    if(isEdit == false) {
      this.pageMode = "Add";
    } else if(isEdit == true) {
      this.pageMode = "Update";
    }
  }

  addBtn() {
    // this.router.navigate(['slider', "add"]);
    
    this.viewSeq = 2;
    alert("Add Slider");
    console.log(this.viewSeq);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }
   pageChange(event, totalPages) {
    this.getSlidersData(this.sliderPageCount, this.sliderPageSize);
    this.sliderPageSize = event.value;
    this.noPrevData = true;
  }

   onPaginateChange(event) {
    // alert(JSON.stringify(event));
    //  const startIndex = event.pageIndex * event.pageSize;
    // this.drugmap.getDrugDataForClient(startIndex, event.pageSize);
      // this.dataSource = new ExampleDataSource(this.exampleDatabase,this.paginator);
  }

  navigateBack() {
    history.back();
  }

  // add, update, delete
  updateRow(row) {
    console.log(this.viewSeq);
    console.log(row);
    alert("Update Slider id: "+row);
    // this.commonservice.GetUser(row.userId);
  }

  deleteRow(row) {
    console.log(row);
    alert("Delete Slider id: "+row);
    // this.commonservice.GetUser(row.userId);
  }

  updateSlider(formValues:any) {
    console.log(this.viewSeq);

    let body = [{
      "slideTitle": null,
      "slideDescription": null,
      "slideImage": null,
      "slideActiveFlag": false,
      "slideSort": null,
      "language": {
        "languageId": 1
      },
      "slideCode": null
    }, {
      "slideTitle": null,
      "slideDescription": null,
      "slideImage": null,
      "slideActiveFlag": false,
      "slideSort": 1,
      "language": {
        "languageId": 2
      },
      "slideCode": null
    }];

  }
}
