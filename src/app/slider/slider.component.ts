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
  userPageSize = 10;
  userPageCount = 1;
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
    this.getSlidersData(this.userPageCount, this.userPageSize);
  }

  ngOnInit() {
    // this.viewSeq = 1; /* View Page change by {1,2} */
    this.isEdit = false;
    // this.changePageMode(this.isEdit);
    this.displayedColumns = ['slideId','slideTitle', 'slideDescription', 'slideImage', 'slideActiveFlag','slideAction'];
    this.displayedColumns2 = ['userId','fullName', 'pid', 'userTypeId', 'isStaff', 'accountStatusId'  ];
    this.getSlidersData(this.userPageCount, this.userPageSize);
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
  getSlidersData(count,size) { //'?page=1&size=10'
  // console.log(this.appConfig.urlUserList + '/?page=' + count + '&size=' + size)

  // if(this.viewSeq == 1)
    this.dataUrl = this.appConfig.urlSlides;
  // else if(this.viewSeq == 2)
    // this.dataUrl = this.appConfig.urlUsers;

    this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size).subscribe(data => {
    // this.http.get(this.dataUrl).subscribe(data => {
      
      this.sliderList = data;
      // console.log(this.sliderList);
      this.dataSource.data = this.sliderList.slideList;
      this.commonservice.userTable = this.sliderList;
      // this.noNextData = this.sliderList.pageNumber === this.sliderList.totalPages;
    });
  }

  paginatorL(page) {
    this.getSlidersData(this.userPageCount, this.userPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getSlidersData(this.userPageCount, this.userPageSize);
  }

  // getRow(row) {
  //   console.log(row);
  //   this.commonservice.GetUser(row.userId);
  // }
  changePageMode(isEdit) {
    if(isEdit == false) {
      this.pageMode = "Add";
    } else if(isEdit == true) {
      this.pageMode = "Update";
    }
  }

  addBtn() {
    // console.log();

    this.viewSeq = 2;
    this.router.navigate(['slider', "add"]);
    alert("Add Slider");
    // this.commonservice.GetUser(row.userId);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }
   pageChange(event, totalPages) {
    this.getSlidersData(this.userPageCount, this.userPageSize);
    this.userPageSize = event.value;
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
