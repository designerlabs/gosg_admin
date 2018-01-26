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
  updateForm: FormGroup
  isLocalAPI: boolean;

  titleEn: FormControl
  titleBm: FormControl
  descEn: FormControl
  descBm: FormControl
  imgEn: FormControl
  imgBm: FormControl
  active: FormControl

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
    this.getSlidersData();
  }

  ngOnInit() {
    this.viewSeq = 2; /* View Page change by {1,2} */
    this.displayedColumns = ['slideId','slideTitle', 'slideDescription', 'slideImage', 'slideActiveFlag','slideAction'];
    this.displayedColumns2 = ['userId','fullName', 'pid', 'userTypeId', 'isStaff', 'accountStatusId'  ];
    this.getSlidersData();
    // console.log(this.dataSource)

    // this.complete = false;

    this.titleEn = new FormControl()
    this.titleBm = new FormControl()
    this.descEn = new FormControl()
    this.descBm = new FormControl()
    this.imgEn = new FormControl()
    this.imgBm = new FormControl()
    this.active = new FormControl()
    // this.email = new FormControl('', Validators.pattern(EMAIL_REGEX))

    this.updateForm = new FormGroup({
      titleEn: this.titleEn,
      descEn: this.descEn,
      imgEn: this.descEn,
      active: this.active
    });
  }

  // get Slider Data 
  getSlidersData() { //'?page=1&size=10'
  // console.log(this.appConfig.urlUserList + '/?page=' + count + '&size=' + size)

  // if(this.viewSeq == 1)
    this.dataUrl = this.appConfig.urlSlides+ '?langId=2';
  // else if(this.viewSeq == 2)
    // this.dataUrl = this.appConfig.urlUsers;

    // this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size).subscribe(data => {
    this.http.get(this.dataUrl).subscribe(data => {
      
      this.sliderList = data;
      // console.log(this.sliderList);
      this.dataSource.data = this.sliderList.slideList;
      this.commonservice.userTable = this.sliderList;
      // this.noNextData = this.sliderList.pageNumber === this.sliderList.totalPages;
    });
  }

  paginatorL(page) {
    this.getSlidersData();
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getSlidersData();
  }

  // getRow(row) {
  //   console.log(row);
  //   this.commonservice.GetUser(row.userId);
  // }

  add() {
    // console.log();
    this.viewSeq = 2;
    alert("Add Slider");
    // this.commonservice.GetUser(row.userId);
  }

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
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }
   pageChange(event, totalPages) {
    this.getSlidersData();
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
}
