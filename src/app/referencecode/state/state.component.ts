import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  recordList = null;
  // displayedColumns = ['no','stateName', 'stateId'];
  displayedColumns: any;
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  viewSeq: any; /* View Page Sequence Based on Discussion {1,2} */
  isEdit: boolean;
  sliderData: Object;
  sliderForm: FormGroup
  titleEn: FormControl
  titleBm: FormControl
  complete: boolean;
  active: FormControl
  pageMode: String;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;

  dataUrl: any;
  languageId: any;
  public loading = false;

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
    private commonservice: CommonService, private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data: any) => {
          let getLang = data.list;
          let myLangData = getLang.filter(function (val) {
            if (val.languageCode == translate.currentLang) {
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getRecordList(this.pageCount, this.pageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
      this.getRecordList(this.pageCount, this.pageSize);
      this.commonservice.getModuleId();
    }

  }

  ngOnInit() {
    this.commonservice.getModuleId();
    this.getRecordList(this.pageCount, this.pageSize);
    this.viewSeq = 1;
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.displayedColumns = ['no', 'stateName', 'stateId'];

    this.titleEn = new FormControl()
    this.titleBm = new FormControl()
    this.active = new FormControl()

    this.sliderForm = new FormGroup({
      titleEn: this.titleEn,
      // descEn: this.descEn,
      // imgEn: this.imgEn,
      titleBm: this.titleBm,
      // descBm: this.descBm,
      // imgBm: this.imgBm,
      active: this.active,
      // copyImg: this.copyImg
    });

  }

  getRecordList(page, size) {

    //this.dataUrl = this.appConfig.urlCommon + '/announcement/category/list';
    this.dataUrl = this.appConfig.urlStateList;
    this.loading = true;

    this.commonservice.readPortal('state', page, size)
      .subscribe(data => {
        this.commonservice.errorHandling(data, (function () {
          this.recordList = data;

          console.log("data");
          console.log(data);

          this.seqPageNum = this.recordList.pageNumber;
          this.seqPageSize = this.recordList.pageSize;

          this.dataSource.data = this.recordList.stateList;
          this.commonservice.recordTable = this.recordList;
          this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

        }).bind(this));
        this.loading = false;
      },
        error => {

          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
          console.log(error);
        });
  }

  addBtn() {
    this.viewSeq = 2;
    // console.log(this.viewSeq);
    // this.router.navigate(['slider', "add"]);
  }

  checkReqValues() {
    let titleEn = "titleEn";
    // let descEn = "descEn";
    // let imgEn = "imgEn";
    let titleBm = "titleBm";
    // let descBm = "descBm";
    // let imgBm = "imgBm";
    let active = "active";

    // let reqVal: any = [titleEn, descEn, imgEn, titleBm, descBm, imgBm, active];
    let reqVal: any = [titleEn, titleBm, active];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.sliderForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
      // this.toastr.error(this.translate.instant('pagery error!'), '');
    }

  }

  navigateBack() {
    this.viewSeq = 1;
    this.router.navigate(['reference/state']);
  }

  updateRow(row) {

    this.router.navigate(['reference/state', row]);
    this.viewSeq = 2;
    // alert("Update Slider id: " + row);
    this.isEdit = true;
    this.changePageMode(this.isEdit);

    // Update Slider Service
    return this.http.get(this.appConfig.urlSlides + '/' + row + '/').subscribe(
      Rdata => {

        this.sliderData = Rdata;
        let dataEn = this.sliderData['slideList'][0];
        let dataBm = this.sliderData['slideList'][1];

        // console.log(this.sliderData['slideList'])

        // populate data
        this.sliderForm.get('titleEn').setValue(dataEn.slideTitle);
        // this.sliderForm.get('descEn').setValue(dataEn.slideDescription);
        // this.sliderForm.get('imgEn').setValue(dataEn.slideImage);
        this.sliderForm.get('titleBm').setValue(dataBm.slideTitle);
        // this.sliderForm.get('descBm').setValue(dataBm.slideDescription);
        // this.sliderForm.get('imgBm').setValue(dataBm.slideImage);
        this.sliderForm.get('active').setValue(dataEn.slideActiveFlag);
        // this.slideCode = this.sliderData['slideCode'];
        // this.slideIdEn = dataEn.slideId;
        // this.slideIdBm = dataBm.slideId;
        // this.copyImg
      });

  }

  changePageMode(isEdit) {
    if (isEdit == false) {
      this.pageMode = "Add";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
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
