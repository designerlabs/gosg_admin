import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-groupstbl',
  templateUrl: './groupstbl.component.html',
  styleUrls: ['./groupstbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupstblComponent implements OnInit {
  dataUrl: any;
  groupPageCount = 1;
  groupPageSize = 10;
  seqPageNum = 0;
  seqPageSize = 0 ;
  groupList = null;
  noPrevData = true;
  noNextData = false;
  displayedColumns = ['moduleGroupName', 'moduleName', 'isActive', 'action'];

  dataSource = new MatTableDataSource<object>(this.groupList);
  @ViewChild(MatSort) sort: MatSort;
  // tslint:disable-next-line:max-line-length
  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private route:ActivatedRoute) {
    this.getGroupList(this.groupPageCount, this.groupPageSize);
  }

  ngOnInit() {
    this.getGroupList(this.groupPageCount, this.groupPageSize);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getGroupList(count, size) {
    
    this.dataUrl = this.appConfig.urlGroupList;
    this.http.get(this.dataUrl+'?page=' + count + '&size=' + size).subscribe(data => {
      this.groupList = data;
      this.dataSource.data = this.groupList.moduleGroupListViewList;
      this.seqPageNum = this.groupList.pageNumber;
      this.seqPageSize = this.groupList.pageSize;
      this.commonservice.recordTable = this.groupList;
      this.noNextData = this.groupList.pageNumber === this.groupList.totalPages;
    });
  }

  editGroup(gId) {
    console.log(gId);
    this.router.navigate(['groups', gId]);
  }

  paginatorL(page) {
    this.getGroupList(page - 1, this.groupPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getGroupList(page + 1, this.groupPageSize);
  }

  pageChange(event, totalPages) {
    this.getGroupList(this.groupPageCount, event.value);
    this.groupPageSize = event.value;
    this.noPrevData = true;
  }

  add(){
    this.router.navigate(['groups/add']);
  }
}
