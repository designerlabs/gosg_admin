import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GenderComponent implements OnInit {

  // updateForm: FormGroup

  recordList = null;
  displayedColumns = ['no', 'genderEng', 'genderMy'];
  // displayedColumns = ['no', 'raceEng', 'raceMy', 'action'];
  // pageSize = 10;
  // pageCount = 1;
  noPrevData = true;
  noNextData = false;
  // rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;
  languageId: any;
  
  public getRaceIdEng: any;
  public getRaceIdMy: any;
  public getRaceMy: any;
  public getRaceEng: any;
  public loading = false;

  recordTable = null;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);
  selection = new SelectionModel<Element>(true, []);

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, 
  public commonservice: CommonService, private router: Router,private dialogsService: DialogsService, private translate: TranslateService,
  private toastr: ToastrService) {
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
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
    });
    
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.getRecordList(this.languageId);
    this.commonservice.getModuleId();
  }

  getRecordList(lng) {

    this.recordList = null;
    this.loading = true;
    this.commonservice.readPortal('gender/all', '', '', '', lng)
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){
      this.recordList = data;
      
      this.dataSource.data = this.recordList.list;
      this.recordTable = this.recordList;
      this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
          
      }).bind(this));
      this.loading = false;
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');   
      console.log(error);  
      this.loading = false;
      });
  }

  

  
}
