import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../../dialogs/dialogs.service';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../../nav/nav.service';

@Component({
  selector: 'app-identificationtypetbl',
  templateUrl: './identificationtypetbl.component.html',
  styleUrls: ['./identificationtypetbl.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class IdentificationtypetblComponent implements OnInit, OnDestroy {

  updateForm: FormGroup

  recordList = null;
  // displayedColumns = ['no', 'raceEng', 'raceMy', 'status', 'action'];
  displayedColumns = ['no', 'identificationEng', 'identificationMy'];
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

  public getIdentificationTypeIdEng: any;
  public getIdentificationTypeIdMy: any;
  public getIdentificationTypeMy: any;
  public getIdentificationTypeEng: any;
  public loading = false;

  recordTable = null;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);
  selection = new SelectionModel<Element>(true, []);
  
  private subscriptionLang: ISubscription;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, 
  private commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService,
  private navservice: NavService,
  private dialogsService: DialogsService) {
    /* LANGUAGE FUNC */
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
            this.languageId = 1;
          });
        }
        
        if (myLang == 'ms') {
          translate.get('HOME').subscribe((res: any) => {
            this.languageId = 2;
        });
        // alert(this.languageId + ',' + this.localeVal)
      }
        if(this.navservice.flagLang){
          this.getRecordList(this.pageCount, this.pageSize,this.languageId);
          this.commonservice.getModuleId();
        }

    });
    
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.getRecordList(this.pageCount, this.pageSize,this.languageId);
    this.commonservice.getModuleId();
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  getRecordList(page, size, lng) {
  
    this.recordList = null;
    // this.dataUrl = this.appConfig.urlIdentificationTypeList + '?page=' + page + '&size=' + size + "?language=" + this.languageId;

    this.loading = true;
    this.commonservice.readProtected('identificationtype/code', page, size, '', lng)
    .subscribe(data => {
      this.commonservice.errorHandling(data, (function(){
      this.recordList = data;

      this.seqPageNum = this.recordList.pageNumber;
      this.seqPageSize = this.recordList.pageSize;
      
      this.dataSource.data = this.recordList.list;
      this.recordTable = this.recordList;
      this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
    }).bind(this)); 
    this.loading = false;
  },
  error => {
    this.loading = false;
    this.toastr.error(JSON.parse(error._body).statusDesc, '');  
    console.log(error);

    });
  }

  paginatorL(page) {
    this.getRecordList(page - 1, this.pageSize,this.languageId);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getRecordList(page + 1, this.pageSize,this.languageId);
  }

  add() {

    this.router.navigate(['reference/identificationtype/add']);
    this.commonservice.pageModeChange(false);
  }

  updateRow(row) {
    console.log(row);
    this.router.navigate(['reference/identificationtype', row]);
    this.commonservice.pageModeChange(true);
  }

  
  deleteRow(refCode) {

    let txt;

    this.loading = true;
    console.log(refCode);
    this.commonservice.delete(refCode,'identificationtype/delete/multiple/').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){
          
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getRecordList(this.pageCount, this.pageSize);
        }).bind(this)); 
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        console.log(error);
    });

    // let txt;
    // let r = confirm("Are you sure to delete ?");

    
    // if (r == true) {
    //   console.log(refCode);
    //   this.commonservice.delIdentificationType(refCode).subscribe(
    //     data => {
    //       // alert('Record deleted successfully!')
    //       txt = " record deleted successfully!";

    //       this.toastr.success(txt, '');   
    //       this.router.navigate(['reference/identificationtype']);
    //       this.getRecordList(this.pageCount, this.pageSize);
    //     },
    //     error => {
    //       txt = "Delete Cancelled!";
    //   });
    // }
    // else{
    //   txt = "Delete Cancelled!";
    // }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
    this.getRecordList(this.pageCount, event.value,this.languageId);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

}
