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
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);
  selection = new SelectionModel<Element>(true, []);

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, 
  private commonservice: CommonService, private router: Router,private dialogsService: DialogsService, private translate: TranslateService,
  private toastr: ToastrService) {
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getRecordList();
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getRecordList();
      this.commonservice.getModuleId();
    }

    
  }

  ngOnInit() {
    this.commonservice.getModuleId();
    this.getRecordList();
  }

  getRecordList() {
  
    this.loading = true;
    this.commonservice.readPortal('gender/all')
    .subscribe(data => {

      this.commonservice.errorHandling(data, (function(){
      this.recordList = data;
      
      this.dataSource.data = this.recordList.list;
      this.commonservice.recordTable = this.recordList;
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
