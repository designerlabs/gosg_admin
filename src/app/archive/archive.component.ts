import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ValidateService } from '../common/validate.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  date = new Date();
  dateFormatExample = "dd/mm/yyyy h:i:s";
  pageMode: String;
  public loading = false;
  isEdit: boolean;
  archiveList: any = [];

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  selectedFile = '';

  titleEn: String;
  titleBm: String;
  descEn: String;
  descBm: String;
  textEn: String;
  textBm: String;
  keywordEn: String;
  keywordBm: String;
  urlEn: String;
  urlBm: String;
  cdt: number;
  pdt: number;
  mdt: number;
  edt: number;
  sort: number;
  image: any;
  forCitizen: boolean;
  forNonCitizen: boolean;
  code: any;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService,
    private translate: TranslateService,
    private validateService: ValidateService,
    private router: Router,
    private toastr: ToastrService) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data: any) => {
          let getLang = data.list;
          let myLangData = getLang.filter(function (val) {
            if (val.languageCode == translate.currentLang) {
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              // this.getMinistryData(this.pageCount, this.agencyPageSize);
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
      // this.getMinistryData(this.pageCount, this.agencyPageSize);
      this.commonservice.getModuleId();
    }
    /* LANGUAGE FUNC */
}

  ngOnInit() {

    let refCode = this.router.url.split('/')[2];
    this.commonservice.getModuleId();

    if (refCode == "view") {
      this.isEdit = false;
      this.pageMode = "View";
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }
  }

  // get, add, update, delete
  getRow(row) {

    this.loading = true;
    // Update event Service
    return this.commonservice.readProtectedById('archive/', row).subscribe(
      // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function () {

          this.archiveList = Rdata;
          console.log(this.archiveList) 
          let dataEn = this.archiveList['contentEntityList'][0];
          let dataBm = this.archiveList['contentEntityList'][1];

          // populate data
          this.code = dataEn.contentCode;
          this.titleEn = this.valueChecker(dataEn.contentTitle);
          this.titleBm = this.valueChecker(dataBm.contentTitle);
          this.descEn = this.valueChecker(dataEn.contentDescription);
          this.descBm = this.valueChecker(dataBm.contentDescription);
          this.textEn = this.valueChecker(dataEn.contentText);
          this.textBm = this.valueChecker(dataBm.contentText);
          this.keywordEn = this.valueChecker(dataEn.contentKeyword);
          this.keywordBm = this.valueChecker(dataBm.contentKeyword);
          this.urlEn = this.valueChecker(dataEn.contentUrl);
          this.urlBm = this.valueChecker(dataBm.contentUrl);
          this.pdt = dataEn.publishDate;
          this.edt = dataEn.endDate;
          this.cdt = dataEn.createdDate;
          this.mdt = dataEn.modifiedDate;
          this.sort = this.valueChecker(dataEn.contentSort);

          if(dataEn.contentImage)
            this.image = dataEn.contentImage.mediaFile;
            
          this.forCitizen = dataEn.lifeEventCitizenFlag;
          this.forNonCitizen = dataEn.lifeEventNonCitizenFlag;

        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        console.log(error);
        this.loading = false;
      });

  }

  revertItem(refCode) {
    this.loading = true;
      this.commonservice.update(null, 'archive/revert/'+refCode).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            // this.getArchiveData(this.pageCount, this.pageSize);
            this.toastr.success(this.translate.instant('common.success.updatesuccess'), 'success');
          }).bind(this));  
         this.loading = false;
         this.back()
        },
        error => {
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        });

  }

  deleteItem(refCode) {
    // alert(refCode)
    this.loading = true;
      this.commonservice.delete(refCode,'archive/delete/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            // this.getArchiveData(this.pageCount, this.pageSize);
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), 'success');
          }).bind(this));  
         this.loading = false;
         this.back()
        },
        error => {
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        });

  }

  valueChecker(val) {
    let res;

    if(val == "" || val == null || val == 0)
      res = "-"
    else
      res = val

    return res;
  }

  back() {
    this.router.navigate(['archive']);
  }

}
