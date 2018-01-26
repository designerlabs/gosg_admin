import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../config/app.config.module';
import { CommonService } from './../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-pollresult',
  templateUrl: './pollresult.component.html',
  styleUrls: ['./pollresult.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PollresultComponent implements OnInit {

  pqList = null;
  displayedColumns = ['num', 'pq_en', 'pq_bm', 'status', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  dataUrl: any;  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.pqList);
  selection = new SelectionModel<Element>(true, []);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, 
  private commonservice: CommonService, private router: Router) { 

    this.getPQList(this.pageCount, this.pageSize);
  }

  ngOnInit() {

    this.getPQList(this.pageCount, this.pageSize);
  }

  getPQList(count, size) {
  
    this.dataUrl = this.appConfig.urlCommon + '/announcement/category/list';

    //this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size)
    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.pqList = data;

      console.log("data");
      console.log(data);
      
      this.dataSource.data = this.pqList.announcementList;
      this.commonservice.pqTable = this.pqList;
      this.noNextData = this.pqList.pageNumber === this.pqList.totalPages;
    });
  }

  paginatorL(page) {
    this.getPQList(page - 1, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getPQList(page + 1, this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
    this.getPQList(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

}
