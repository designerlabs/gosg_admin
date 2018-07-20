import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from './../nav/nav.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-viewreport',
  templateUrl: './viewreport.component.html',
  styleUrls: ['./viewreport.component.css']
})
export class ViewreportComponent implements OnInit, OnDestroy {

  updateForm: FormGroup
  report: FormControl

  lang: any;
  languageId: any;
  loading = false;
  complete: boolean;
  listreport: any;

  private subscriptionLang: ISubscription;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private translate: TranslateService,
    private navservice: NavService,
    private router: Router,
    private toastr: ToastrService
  ) {

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
        this.commonservice.getModuleId();
      }

    });
    /* LANGUAGE FUNC */ 
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.commonservice.getModuleId();    
   
    this.report = new FormControl()
    this.updateForm = new FormGroup({

      report: this.report,
    });
    
    //this.listreport = {"widgets":[{"id":"12","label":"Hello","name":"Hello","height":400,"engineType":"REPORT","description":"Hello","dataSourceId":1},{"id":"13","label":"test-report","name":"test-report","height":400,"engineType":"REPORT","description":"test-report","dataSourceId":1},{"id":"14","label":"test chart","name":"test chart","height":400,"engineType":"REPORT","description":"test chart","dataSourceId":1},{"id":"15","label":"Hot Topic","name":"Hot Topic","height":400,"engineType":"REPORT","description":"Hot Topic","dataSourceId":1},{"id":"18","label":"Report B month","name":"Statistik pendaftaran (bulan)","height":400,"engineType":"REPORT","description":"Statistik pendaftaran (bulan)","dataSourceId":1},{"id":"20","label":"tedt","name":"test","height":400,"engineType":"REPORT","description":"test","dataSourceId":1},{"id":"19","label":"test","name":"test","height":400,"engineType":"REPORT","description":"aaa","dataSourceId":1},{"id":"21","label":"report-c-1","name":"report-c-1","height":400,"engineType":"REPORT","description":"report-c-1","dataSourceId":1}]};
    this.getData();
    
  }

  getData() {
    this.loading = true;
    
    return this.commonservice.getlistReport().subscribe(
    Rdata => {

      this.commonservice.errorHandling(Rdata, (function () {
  
        this.listreport = Rdata;
        this.checkReqValues();

      }).bind(this));
      this.loading = false;
    });
      // error => {
      //   this.toastr.error(JSON.parse(error._body).statusDesc, '');
      //   this.loading = false;
      // });

  }
    

  myFunction() {
    this.updateForm.reset();
    this.updateForm.get('report').setValue("");
  }

  checkReqValues() {

    let reqVal: any = ["report"];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }
  
  submit(formValues: any) {  

    let rptId = formValues.report;
    this.loading = true;
    
    return this.commonservice.getViewReport(rptId).subscribe(
    Rdata => {
      console.log("TEST");
      console.log(Rdata);
      this.commonservice.errorHandling(Rdata, (function () {
        
        let viewR = Rdata;
        window.open(viewR.url);

      }).bind(this));
      this.loading = false;
    });
  }
}
