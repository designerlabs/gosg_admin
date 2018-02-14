// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-footercontenttbl',
//   templateUrl: './footercontenttbl.component.html',
//   styleUrls: ['./footercontenttbl.component.css']
// })
// export class FootercontenttblComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }



import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footercontenttbl',
  templateUrl: './footercontenttbl.component.html',
  styleUrls: ['./footercontenttbl.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FootercontenttblComponent implements OnInit {

  updateForm: FormGroup

  recordList = null;
  // displayedColumns = ['no', 'raceEng', 'raceMy', 'status', 'action'];
  displayedColumns = ['no', 'catEng', 'nameEng', 'nameMy', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  dataUrl: any;  

  public getIdentificationTypeIdEng: any;
  public getIdentificationTypeIdMy: any;
  public getIdentificationTypeMy: any;
  public getIdentificationTypeEng: any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);
  selection = new SelectionModel<Element>(true, []);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, 
  private commonservice: CommonService, private router: Router, private toastr: ToastrService) {
    this.getRecordList(this.pageCount, this.pageSize);
  }

  ngOnInit() {
    this.getRecordList(this.pageCount, this.pageSize);
  }

  getRecordList(count, size) {
  
    this.dataUrl = this.appConfig.urlFooterCategory + '?page=' + count + '&size=' + size;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log("data");
      console.log(data);

      this.seqPageNum = this.recordList.pageNumber;
      this.seqPageSize = this.recordList.pageSize;
      
      this.dataSource.data = this.recordList.list;
      this.commonservice.recordTable = this.recordList;
      this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

    });
  }

  paginatorL(page) {
    this.getRecordList(page - 1, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getRecordList(page + 1, this.pageSize);
  }

  add() {

    this.router.navigate(['footer/footercontent/add']);
    this.commonservice.pageModeChange(false);
  }

  updateRow(row) {
    console.log(row);
    this.router.navigate(['footer/footercontent', row]);
    this.commonservice.pageModeChange(true);
  }

  
  deleteRow(refCode) {
    let txt;
    let r = confirm("Are you sure to delete ?");

    
    if (r == true) {
      console.log(refCode);
      this.commonservice.delFooterCategory(refCode).subscribe(
        data => {
          // alert('Record deleted successfully!')
          txt = " record deleted successfully!";

          this.toastr.success(txt, '');   
          this.router.navigate(['footer/footercontent']);
          this.getRecordList(this.pageCount, this.pageSize);
        },
        error => {
          txt = "Delete Cancelled!";
      });
    }
    else{
      txt = "Delete Cancelled!";
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
    this.getRecordList(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

}

