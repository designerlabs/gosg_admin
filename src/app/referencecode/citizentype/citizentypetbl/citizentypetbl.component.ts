// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-citizentypetbl',
//   templateUrl: './citizentypetbl.component.html',
//   styleUrls: ['./citizentypetbl.component.css']
// })
// export class CitizentypetblComponent implements OnInit {

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
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-citizentypetbl',
  templateUrl: './citizentypetbl.component.html',
  styleUrls: ['./citizentypetbl.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CitizentypetblComponent implements OnInit {

  updateForm: FormGroup

  recordList = null;
  // displayedColumns = ['no', 'raceEng', 'raceMy', 'status', 'action'];
  displayedColumns = ['no', 'userMy', 'userEng', 'status', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  dataUrl: any;  
  public languageId: any;

  public getUserTypeIdEng: any;
  public getUserTypeIdMy: any;
  public getUserTypeMy: any;
  public getUserTypeEng: any;
  
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
  private commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getRecordList(this.pageCount, this.pageSize);
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getRecordList(this.pageCount, this.pageSize);
    }
    
  }

  ngOnInit() {
    this.getRecordList(this.pageCount, this.pageSize);
  }

  getRecordList(count, size) {
  
    this.dataUrl = this.appConfig.urlUserTypeList + '/?page=' + count + '&size=' + size + "&language=" + this.languageId;

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

      //
      // this.getRaceIdMy = this.recordList.raceList[0].raceId;
      // this.getRaceIdEng = this.recordList.raceList[1].raceId;
      // this.getRaceMy = this.recordList.raceList[0].refCode;
      // this.getRaceEng = this.recordList.raceList[1].refCode;
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

    this.router.navigate(['reference/citizentype/add']);
    this.commonservice.pageModeChange(false);
  }

  updateRow(row) {
    console.log(row);
    this.router.navigate(['reference/citizentype', row]);
    this.commonservice.pageModeChange(true);
  }

  
  deleteRow(refCode, userTypeMy, userTypeEng) {
    let txt;
    let r = confirm("Are you sure to delete ?");

    
    if (r == true) {
      console.log(refCode);
      this.commonservice.delUserType(refCode).subscribe(
        data => {
          // alert('Record deleted successfully!')
          txt = " record deleted successfully!";

          this.toastr.success(txt, '');   
          this.router.navigate(['reference/citizentype']);
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









