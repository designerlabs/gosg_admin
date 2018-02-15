import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gallerytbl',
  templateUrl: './gallerytbl.component.html',
  styleUrls: ['./gallerytbl.component.css']
})
export class GallerytblComponent implements OnInit {

  galleryData: Object;
  galleryList = null;
  displayedColumns: any;
  displayedColumns2: any;
  galleryPageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  dataUrl: any;
  date = new Date();
  pageMode: String;
  isEdit: boolean;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.galleryList);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.getGalleryData(this.pageCount, this.galleryPageSize);
  }

  ngOnInit() {
    this.displayedColumns = ['no','galleryTitleEn', 'galleryTitleBm', 'galleryActiveFlag', 'galleryAction'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get gallery Data 
  getGalleryData(count, size) {
    // console.log(this.appConfig.urlgalleryList + '/?page=' + count + '&size=' + size)
    this.dataUrl = this.appConfig.urlSlides;

    this.http.get(this.dataUrl + '/code/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.galleryList = data;
        console.log(this.galleryList)
        // console.log(JSON.stringify(this.galleryList))
        this.dataSource.data = this.galleryList.list;
        this.seqPageNum = this.galleryList.pageNumber;
        this.seqPageSize = this.galleryList.pageSize;
        this.commonservice.recordTable = this.galleryList;
        this.noNextData = this.galleryList.pageNumber === this.galleryList.totalPages;
      });
  }

  paginatorL(page) {
    this.getGalleryData(this.pageCount, this.galleryPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getGalleryData(page + 1, this.galleryPageSize);
  }

  pageChange(event, totalPages) {
    this.getGalleryData(this.pageCount, event.value);
    this.galleryPageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['gallery', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    this.router.navigate(['gallery', row]);
  }

  deleteRow(enId,bmId) {
    let txt;
    let r = confirm("Are you sure to delete " + enId + " & " + bmId + "?");
    if (r == true) {

      this.commonservice.delGallery(enId,bmId).subscribe(
        data => {
          txt = "gallery deleted successfully!";
          this.toastr.success(txt, '');   
          this.getGalleryData(this.pageCount, this.galleryPageSize);
        },
        error => {
          console.log("No Data")
        });

    } else {
      txt = "Delete Cancelled!";
    }
  }

  changePageMode(isEdit) {
    if (isEdit == false) {
      this.pageMode = "Add";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
  }

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['gallery']);
  }

  back(){
    this.router.navigate(['gallery']);
  }

}
