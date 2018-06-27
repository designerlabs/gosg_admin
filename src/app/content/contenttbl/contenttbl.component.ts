import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../../config/app.config.module';
import { CommonService } from './../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../dialogs/dialogs.service';
import { DialogResultExampleDialog } from '../../lifeevent/lifeevent.component';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../nav/nav.service';
import * as moment from 'moment';

@Component({
  selector: 'app-contenttbl',
  templateUrl: './contenttbl.component.html',
  styleUrls: ['./contenttbl.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ContenttblComponent implements OnInit, OnDestroy {

  selectedItem = [];

  updateForm: FormGroup;
  public loading = false;
  recordList = null;
  displayedColumns = ['cbox', 'num', 'name', 'url', 'category', 'date', 'default_status', 'status', 'action'];
  displayedColumnsH = ['names', 'actions', 'time'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;

  itemEn: any;
  itemBm: any;
  public nameStatus: FormControl;
  public parentsEn: FormControl;
  public parentsBm: FormControl;
  public keys: FormControl;
  public kataKunci: FormControl;
  public parentsValEn: any;
  public parentsValBm: any;
  public treeEn: any;
  public treeBm: any;
  public categoryPlaceholder = "";
  public filterPlaceholder = "";

  dateFormatExample = "dd/mm/yyyy h:i:s";
  events: string[] = [];
  publishdt: number;
  enddt: number;
  publish: FormControl
  endD: FormControl
  disableSearch = false;
  newPublishD: any;
  newEndD: any;

  dataUrl: any;
  public languageId: any;
  public lang: any;
  leCategoryCode: any;
  countArticle = 0;
  catCode: any;
  catName: any;

  valkey = false;
  recordTable = null;
  showNoData = false;

  listHistory = null;

  //nameStatus=1;
  keywordVal = "";
  displayDP: any;
  displayDE: any;

  editor = { treeVal: '' };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.recordList);
  dataSourceH = new MatTableDataSource<object>(this.listHistory);

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;

  applyFilter(e) {

    this.nameStatus = this.updateForm.get('nameStatus').value;
    let d = this.updateForm.get('publish').value;

    if (e) {
      this.getFilterListC(this.pageCount, this.pageSize, e, this.nameStatus, d);
    }
    else {
      this.getCategoryCodeC(this.languageId);
      
    }
  }

  resetSearch() {
    this.updateForm.get('kataKunci').setValue('');
    this.updateForm.get('nameStatus').setValue(1);
    this.getCategoryCodeC(this.languageId);
    
  }

  filterStatus(e) {

    this.keywordVal = this.updateForm.get('kataKunci').value;
    let d = this.updateForm.get('publish').value;

    if (this.keywordVal != "") {
      this.getFilterListC(this.pageCount, this.pageSize, this.keywordVal, e.value, d);
    }

    else {
      this.getCategoryCodeC(this.languageId);
      
    }
  }

  constructor(private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    private navservice: NavService,
    public dialog: MatDialog,
    public builder: FormBuilder) {

    /* LANGUAGE FUNC */
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.languageId = 1;
        });
      }

      if (myLang == 'ms') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.languageId = 2;
        });
      }
      if (this.navservice.flagLang) {
        
        this.getCategoryCodeC(this.languageId);
        //this.getCategoryC(this.languageId);
        this.selectedItem = [];
        this.commonservice.getModuleId();
      }

    });
    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
    } else {
      this.languageId = 1;
    }

    this.getCategoryCodeC(this.languageId);
    this.commonservice.getModuleId();
    this.parentsEn = new FormControl();
    this.parentsBm = new FormControl({ disabled: true });
    this.keys = new FormControl();
    this.nameStatus = new FormControl();
    this.kataKunci = new FormControl({ value: '', disabled: true });
    this.publish = new FormControl();
    this.endD = new FormControl();

    this.updateForm = new FormGroup({

      nameStatus: this.nameStatus,
      parentsEn: this.parentsEn,
      parentsBm: this.parentsBm,
      keys: this.keys,
      kataKunci: this.kataKunci,
      endD: this.endD,
      publish: this.publish
    });

    this.updateForm.get('nameStatus').setValue(1);
    this.getCategoryC(this.languageId);
    this.valkey = false;
    
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    this.subscriptionContentCreator.unsubscribe();
    this.subscriptionCategoryC.unsubscribe();
    this.subscriptionRecordListC.unsubscribe();
  }

  getCategoryCodeC(lng) {

    this.loading = true;
    this.subscriptionContentCreator = this.commonservice.readProtected('content/creator/dropdown/' + this.commonservice.contentCategoryCode, '', '', '', lng)
      .subscribe(resCatData => {
        this.commonservice.errorHandling(resCatData, (function () {
          this.leCategoryCode = resCatData['list'];

          let setParentEn;

          for (let i = 0; i < this.leCategoryCode.length; i++) {

            if (this.leCategoryCode[i].refCode == this.commonservice.contentCategoryCode) {

              // this.countArticle = this.leCategoryCode[i].list[0].articleCount;
              // this.catCode = this.leCategoryCode[i].refCode;

              if (this.languageId == 1) {
                this.catName = this.leCategoryCode[i].list[0].categoryName;
                this.filterPlaceholder = this.commonservice.showFilterEn;

                setParentEn = {
                  "id": [this.leCategoryCode[i].list[0].categoryId, this.leCategoryCode[i].list[1].categoryId],
                  "text": this.leCategoryCode[i].list[0].categoryName,
                  "value": this.leCategoryCode[i].list[0].categoryName,
                  "refCode": this.leCategoryCode[i].refCode
                };
              }

              else {
                this.catName = this.leCategoryCode[i].list[1].categoryName;
                this.filterPlaceholder = this.commonservice.showFilterBm;

                setParentEn = {
                  "id": [this.leCategoryCode[i].list[0].categoryId, this.leCategoryCode[i].list[1].categoryId],
                  "text": this.leCategoryCode[i].list[0].categoryName,
                  "value": this.leCategoryCode[i].list[1].categoryName,
                  "refCode": this.leCategoryCode[i].refCode
                };
              }
            }
          }

          if (this.catCode == undefined || this.catCode == "") {

            this.catCode = this.commonservice.contentCategoryCode;
            this.categoryPlaceholder = this.catName;
          }


          this.updateForm.get('parentsEn').setValue(setParentEn);
          this.categoryPlaceholder = this.catName;
          //this.getRecordListC(this.pageCount, this.pageSize, this.catCode, this.languageId);

        }).bind(this));
        this.loading = false;
      },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });

    return this.subscriptionContentCreator;
  }

  getRecordListC(page, size, code, lng) {

    this.recordList = null;
    let nameStatus = this.updateForm.get('nameStatus').value;
    let generalUrl = ""

    if (nameStatus == 1) {
      if (this.newPublishD == undefined || this.newPublishD == null) {
        generalUrl = 'content/creator/state/all/' + code;
      }

      else {
        generalUrl = 'content/creator/state/all/' + code + "/" + this.newPublishD + "/" + this.newEndD;
      }
    }

    else if (nameStatus == 2) {
      if (this.newPublishD == undefined || this.newPublishD == null) {
        generalUrl = 'content/creator/state/draft/' + code;
      }

      else {
        generalUrl = 'content/creator/state/draft/' + code + "/" + this.newPublishD + "/" + this.newEndD;
      }
    }

    else if (nameStatus == 3) {
      if (this.newPublishD == undefined || this.newPublishD == null) {
        generalUrl = 'content/creator/state/pending/' + code;
      }

      else {
        generalUrl = 'content/creator/state/pending/' + code + "/" + this.newPublishD + "/" + this.newEndD;
      }
    }

    else if (nameStatus == 4) {
      if (this.newPublishD == undefined || this.newPublishD == null) {
        generalUrl = 'content/creator/state/approved/' + code;
      }

      else {
        generalUrl = 'content/creator/state/approved/' + code + "/" + this.newPublishD + "/" + this.newEndD;
      }
    }

    if (code != undefined) {
      this.loading = true;
      this.subscriptionRecordListC = this.commonservice.readProtected(generalUrl, page, size, '', lng).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {

            this.recordList = data;

            if (this.recordList.list.length > 0) {
              this.dataSource.data = this.recordList.list;
              this.seqPageNum = this.recordList.pageNumber;
              this.seqPageSize = this.recordList.pageSize;
              this.recordTable = this.recordList;
              this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

              this.showNoData = false;
            }

            else {
              this.dataSource.data = [];

              this.showNoData = true;
              this.seqPageNum = this.recordList.pageNumber;
              this.seqPageSize = this.recordList.pageSize;
              this.recordTable = this.recordList;
              this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
            }
          }).bind(this));
          this.loading = false;
        },
        error => {

          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
        });
    }

  }

  changeDate(dateDP){
    this.displayDP = moment(new Date(dateDP)).format('DD/MM/YYYY');

    return this.displayDP;
  }

  changeDate2(dateDE){
    this.displayDE = moment(new Date(dateDE)).format('DD/MM/YYYY');

    return this.displayDE;
  }

  getFilterListC(page, size, e, valStatus, dateP) {

    this.recordList = null;
    let generalUrl = "";

    if (valStatus == 1) {
      if (dateP == undefined || dateP == null) {
        generalUrl = 'content/creator/search/state/all';
      }

      else {
        generalUrl = 'content/creator/search/state/all/' + this.newPublishD + "/" + this.newEndD;
      }
    }

    else if (valStatus == 2) {
      if (dateP == undefined || dateP == null) {
        generalUrl = 'content/creator/search/state/draft';
      }

      else {
        generalUrl = 'content/creator/search/state/draft/' + this.newPublishD + "/" + this.newEndD;
      }
    }

    else if (valStatus == 3) {
      if (dateP == undefined || dateP == null) {
        generalUrl = 'content/creator/search/state/pending';
      }

      else {
        generalUrl = 'content/creator/search/state/pending/' + this.newPublishD + "/" + this.newEndD;
      }
    }

    else if (valStatus == 4) {
      if (dateP == undefined || dateP == null) {
        generalUrl = 'content/creator/search/state/approved';
      }
      else {
        generalUrl = 'content/creator/search/state/approved/' + this.newPublishD + "/" + this.newEndD;
      }
    }

    this.loading = true;
    this.commonservice.readProtected(generalUrl, page, size, e, this.languageId).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function () {

          this.recordList = data;

          if (this.recordList.list.length > 0) {
            this.dataSource.data = this.recordList.list;
            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
            this.recordTable = this.recordList;
            this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

            this.showNoData = false;
          }

          else {
            this.dataSource.data = [];

            this.showNoData = true;
            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
            this.recordTable = this.recordList;
            this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
          }
        }).bind(this));
        this.loading = false;
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });

  }

  publishEvent(type: string, event: OwlDateTimeInputDirective<Date>) {

    this.events = [];
    this.events.push(`${event.value}`);
    this.publishdt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";

    if (this.publishdt > this.enddt || this.enddt == undefined || this.enddt == null) {
      this.enddt = new Date(this.events[0]).getTime();
      this.updateForm.get('endD').setValue(new Date(this.enddt).toISOString());
      this.enddt = null;
      this.disableSearch = true;
    }

    else {
      this.disableSearch = false;
    }
  }

  endEvent(type: string, event: OwlDateTimeInputDirective<Date>) {

    this.events = [];
    this.events.push(`${event.value}`);
    this.enddt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";

    if (this.publishdt > this.enddt || this.publishdt == undefined || this.publishdt == null) {
      this.publishdt = new Date(this.events[0]).getTime();
      this.updateForm.get('publish').setValue(new Date(this.publishdt).toISOString());
      this.publishdt = null;
      this.disableSearch = true;
    }

    else {
      this.disableSearch = false;
    }
  }

  search() {
    let year, month, day;

    let e = '';

    if (this.publishdt != undefined) {
      this.events = [];
      var d = new Date(this.publishdt);
      this.events.push(`${d}`);

      year = new Date(this.events[0]).getFullYear();
      month = new Date(this.events[0]).getMonth() + 1;
      day = new Date(this.events[0]).getDate();

      this.newPublishD = year + "-" + month + "-" + day;
    }

    if (this.enddt != undefined) {

      this.events = [];
      var d = new Date(this.enddt);
      this.events.push(`${d}`);

      year = new Date(this.events[0]).getFullYear();
      month = new Date(this.events[0]).getMonth() + 1;
      day = new Date(this.events[0]).getDate();

      this.newEndD = year + "-" + month + "-" + day;
    }

    this.nameStatus = this.updateForm.get('nameStatus').value;
    this.keywordVal = this.updateForm.get('kataKunci').value;

    if (this.newPublishD != undefined || this.newPublishD != null) {
      this.getFilterListC(this.pageCount, this.pageSize, this.keywordVal, this.nameStatus, this.newPublishD);
    }

    else if (this.newPublishD == undefined || this.newPublishD == null) {
      this.getCategoryCodeC(this.languageId);
      
    }

    
    
    
    
    
  }

  clearDate() {
    this.newPublishD = undefined;
    this.newEndD = undefined;
    this.publishdt = undefined;
    this.enddt = undefined;
    this.disableSearch = false;
    this.updateForm.get('publish').setValue(null);
    this.updateForm.get('endD').setValue(null);
  }

  paginatorL(page) {
    this.getRecordListC(page - 1, this.pageSize, this.catCode, this.languageId);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getRecordListC(page + 1, this.pageSize, this.catCode, this.languageId);
  }

  add() {
    this.router.navigate(['content/add']);
    this.commonservice.pageModeChange(false);
  }

  updateRow(row) {
    this.router.navigate(['content/', row]);
    this.commonservice.pageModeChange(true);
  }

  deleteRow(id) {

    this.loading = true;
    this.commonservice.delete(id, 'content/creator/delete/').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function () {

          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getRecordListC(this.pageCount, this.pageSize, this.catCode, this.languageId);
          this.selectedItem = [];

        }).bind(this));
        this.loading = false;
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
    this.getRecordListC(this.pageCount, event.value, this.catCode, this.languageId);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  getCategoryC(lng) {

    this.loading = true;
    this.subscriptionCategoryC = this.commonservice.readProtected('content/creator/dropdown/' + this.commonservice.contentCategoryCode, '', '', '', lng)
      .subscribe(data => {

        this.commonservice.errorHandling(data, (function () {

          this.categoryData = data["list"];
          let arrCatEn = [];
          let arrCatBm = [];

          for (let i = 0; i < this.categoryData.length; i++) {

            if (this.categoryData[i].list.length === 2) {
              arrCatEn.push({

                id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                value: this.categoryData[i].list[0].categoryId,
                refCode: this.categoryData[i].refCode,
                parent: this.categoryData[i].list[0].parentId,
                text: this.categoryData[i].list[0].categoryName,
                checked: false,
                children: []
              });

              arrCatBm.push({
                id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                value: this.categoryData[i].list[1].categoryId,
                refCode: this.categoryData[i].refCode,
                parent: this.categoryData[i].list[1].parentId,
                checked: false,
                text: this.categoryData[i].list[1].categoryName,
                children: []
              });

            }

          }

          if (this.languageId == 1) {
            this.treeEn = this.getNestedChildrenEn(arrCatEn, -1);
          } else if (this.languageId == 2) {
            this.treeEn = this.getNestedChildrenBm(arrCatBm, -2);
          } else {
            this.treeEn = this.getNestedChildrenEn(arrCatEn, -1);
          }

          this.itemEn = this.treeEn;

        }).bind(this));
        this.loading = false;
      },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });

    return this.subscriptionCategoryC;
  }

  getNestedChildrenEn(arr, parent) {
    var out = []
    var children = []

    for (var i in arr) {

      if (arr[i].parent == parent) {
        children = this.getNestedChildrenEn(arr, arr[i].value)

        if (children.length) {
          arr[i].children = children
        }
        out.push(arr[i])
      }
    }
    return out
  }

  getNestedChildrenBm(arr, parent) {
    var out = []
    var children = []

    for (var i in arr) {

      if (arr[i].parent == parent) {
        children = this.getNestedChildrenBm(arr, arr[i].value)

        if (children.length) {
          arr[i].children = children
        }
        out.push(arr[i])
      }

    }
    return out
  }

  keysFilter() {

    this.catCode = undefined;
    this.getCategoryCodeC(this.languageId);
    

    let keysVal = this.updateForm.get('keys');
    this.updateForm.get('kataKunci').setValue('');

    if (keysVal.value == true) {

      this.valkey = true;
      this.kataKunci.enable();
      this.parentsEn.disable();
    }

    else {
      this.valkey = false;
      this.kataKunci.disable();
      this.parentsEn.enable();
    }
  }

  onChange(ele) {

    this.catCode = ele.refCode;
    this.getRecordListC(this.pageCount, this.pageSize, this.catCode, this.languageId);
  }

  deleteAll() {
    let deletedCodes = this.selectedItem.join(',');

    
    
    this.commonservice.delete('', `content/delete/multiple/${deletedCodes}`).subscribe(
      data => {

        this.commonservice.errorHandling(data, (function () {
          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getRecordListC(this.pageCount, this.pageSize, this.catCode, this.languageId);

        }).bind(this));
        this.selectedItem = [];
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.selectedItem = [];
        this.loading = false;
      });
  }

  detailHistory(id) {
    

    this.loading = true;
    this.commonservice.readProtected('content/history/' + id).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function () {

          this.listHistory = data;
          let config = new MatDialogConfig();
          config.width = '800px';
          config.height = '600px';
          let dialogRef = this.dialog.open(DialogResultExampleDialog, config);

          let displayTilte = "";
          if (this.languageId == 1) {
            displayTilte = "<h3>HISTORY</h3>"
            displayTilte += '<table class="table"><tr class="tableHistory"><td width="40%">Name</td>';
            displayTilte += '<td width="20%">Activity</td>';
            displayTilte += '<td width="40%">Time</td></tr>';
          } else {
            displayTilte = "<h3>SEJARAH</h3>";
            displayTilte += '<table class="table"><tr class="tableHistory"><td width="40%">Nama</td>';
            displayTilte += '<td width="20%">Aktiviti</td>';
            displayTilte += '<td width="40%">Masa</td></tr>';
          }
          let display: any;

          for (let i = 0; i < this.listHistory.list.length; i++) {

            let newDate = new Date(this.listHistory.list[i].revisionDate);
            displayTilte += '<tr><td>' + this.listHistory.list[i].user.firstName;
            displayTilte += '<br>(' + this.listHistory.list[i].user.email + ')</td>';
            displayTilte += '<td>' + this.listHistory.list[i].type + '</td>';
            displayTilte += '<td>' + newDate + '</td></tr>';
          }

          displayTilte += '</table>';

          // displayTilte += '<mat-table #table2 [dataSource]="dataSourceH">';          
          // displayTilte += '<ng-container matColumnDef="names">';
          // displayTilte += '<mat-header-cell class="text-align-left" style="flex: 0 0 60%;" *matHeaderCellDef> {{ "common.tableHeader.name" | translate }}</mat-header-cell>';
          // displayTilte += '<mat-cell class="text-align-left" style="flex: 0 0 60%;" *matCellDef="let element; let i = index;">';
          // displayTilte += '{{element.user.firstName }}<br>({{element.user.email}})';
          // displayTilte += '</mat-cell>';
          // displayTilte += '</ng-container>';
          // displayTilte += '<ng-container matColumnDef="actions">';
          // displayTilte += '<mat-header-cell class="text-align-left" style="flex: 0 0 20%;" *matHeaderCellDef> {{ "common.tableHeader.activity" | translate }} </mat-header-cell>';
          // displayTilte += '<mat-cell class="text-align-left" style="flex: 0 0 20%;" *matCellDef="let element; let i = index;">';
          // displayTilte += '{{element.type }}';
          // displayTilte += '</mat-cell>';
          // displayTilte += '</ng-container>';


          // displayTilte += '<ng-container matColumnDef="time">';
          // displayTilte += '<mat-header-cell class="text-align-Left" style="flex: 0 0 20%;" *matHeaderCellDef> {{ "common.tableHeader.time" | translate }} </mat-header-cell>';
          // displayTilte += '<mat-cell class="text-align-Left" style="flex: 0 0 20%;" *matCellDef="let element">';
          // displayTilte += '{{element.revisionDate }}';
          // displayTilte += '</mat-cell>';
          // displayTilte += '</ng-container> ';

          // displayTilte += '<mat-header-row *matHeaderRowDef="displayedColumnsH"></mat-header-row>';
          // displayTilte += '<mat-row *matRowDef="let row; columns: displayedColumnsH;"></mat-row>';
          // displayTilte += '</mat-table>';

          dialogRef.componentInstance.content = `${displayTilte}`;
          display = dialogRef.componentInstance.content;

          if (this.listHistory.list.length > 0) {
            this.dataSourceH.data = this.listHistory.list;
          }

        }).bind(this));
        this.loading = false;
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });

  }

  isChecked(event) {

    if (event.checked) {
      this.selectedItem.push(event.source.value);
    } else {
      let index = this.selectedItem.indexOf(event.source.value);
      this.selectedItem.splice(index, 1);
    }

    return false;
  }
}