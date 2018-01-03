import { Component, OnInit, ViewEncapsulation, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-usertbl',
  templateUrl: './usertbl.component.html',
  styleUrls: ['./usertbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsertblComponent implements OnInit, AfterViewInit {

  userList = null;
  displayedColumns = ['fullName', 'email', 'lastName', 'dateOfBirth'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.userList);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, private commonservice: CommonService, private router: Router) {
    this.http.get(this.appConfig.urlUserList).subscribe(data => {
      this.userList = data;
      this.dataSource.data = this.userList.userList;
    });
  }

  ngOnInit() {

  }

  getRow(row) {
    console.log(row);
    this.commonservice.GetUser(row.userId);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }

   onPaginateChange(event) {
    // alert(JSON.stringify(event));
    //  const startIndex = event.pageIndex * event.pageSize;
    // this.drugmap.getDrugDataForClient(startIndex, event.pageSize);
      // this.dataSource = new ExampleDataSource(this.exampleDatabase,this.paginator);
  }
}

