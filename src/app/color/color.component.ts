import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { ValidateService } from '../common/validate.service';

@Component({
  selector: 'app-colour',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colorData: Object;
  isActive: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;

  isRead: boolean;
  isCreate: boolean;
  isWrite: boolean;
  isDelete: boolean;
  languageId: any;
  
  colorId: any;
  maskColorCode: (string | RegExp)[];
  
  colorForm: FormGroup
  colorName: FormControl
  colorCode: FormControl
  default: FormControl
  active: FormControl

  defStatus: any;
  public loading = false;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private validateService: ValidateService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.commonservice.getModuleId();
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    let refId = this.router.url.split('/')[2];
    this.commonservice.getModuleId();
    this.maskColorCode = this.validateService.getMask().colorcode;

    this.colorName = new FormControl()
    this.colorCode = new FormControl('', [Validators.pattern(this.validateService.getPattern(6,6).colorCode)])
    this.default = new FormControl()
    this.active = new FormControl()

    this.colorForm = new FormGroup({

      colorName: this.colorName,
      colorCode: this.colorCode,
      default: this.default,
      active: this.active

    });

    if(refId == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
      this.colorForm.get('active').setValue(true);
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refId);
    }

  }

  ngInitAfterView() {
    this.maskColorCode = this.validateService.getMask().colorcode;
  }

  back(){
    this.router.navigate(['color']);
  }

  // get, add, update, delete
  getRow(row) {

    // Update Slider Service
    this.loading = true;
    return this.http.get(this.appConfig.urlGetColor + '/id/' + row).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
          this.colorData = Rdata['color'];
          console.log(this.colorData)
          // console.log(this.appConfig.urlMenu + "/" + row)

        // populate data
          this.colorForm.get('colorName').setValue(this.colorData['colorName']);
          this.colorForm.get('colorCode').setValue(this.colorData['colorCode']);
          this.colorForm.get('default').setValue(this.colorData['defaultColor']);
          this.colorForm.get('active').setValue(this.colorData['enabled']);
          this.colorId = this.colorData['colorId'];

          this.checkReqValues();
        }).bind(this));  
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    
  }

  checkReqValues() {

    let colorName = "colorName";
    let colorCode = "colorCode";

    let reqVal: any = [colorName, colorCode];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.colorForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

      // console.log(nullPointers)

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

    //active is auto check when default status is true
    // this.checkDefaultStatus()

  }

  checkDefaultStatus() {
    let def = this.colorForm.get('default');
    let active = this.colorForm.get('active');

    if(def.value == true) {
      active.setValue(true)
    } else if(def.value == true && active.value == true) {
      def.setValue(false)
      active.setValue(false)
    } else if(def.value == true && active.value == false) {
      def.setValue(false)
      active.setValue(false)
    }
  }

  validateCtrlChk(ctrl: FormControl) {
      // return ctrl.valid || ctrl.untouched
      return this.validateService.validateCtrl(ctrl);
  }

  updateColor(formValues: any) {
    
    if(!this.isEdit) {

      let body = {
          "colorName": null,
          "colorCode": null,
          "enabled": false,
          "defaultColor": false
      };
      
      // console.log(formValues)

      body.colorName = formValues.colorName;
      body.colorCode = formValues.colorCode;
      body.enabled = formValues.active;
      body.defaultColor = formValues.default;

      console.log(body)

      // Add Color Service
      this.loading = true;
      this.commonservice.addColor(body).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.added'), 'success');
          }).bind(this));  
          this.router.navigate(['color']);
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
          this.loading = false;
        });

    } 
    else {

      let body = {
          "colorId": null,
          "colorName": null,
          "colorCode": null,
          "enabled": false,
          "defaultColor": null
      };
      
      // console.log(formValues)
  
      body.colorId = this.colorId;
      body.colorName = formValues.colorName;
      body.colorCode = formValues.colorCode;
      body.enabled = formValues.active;
      body.defaultColor = formValues.default;

      console.log(JSON.stringify(body));

      // Update ErrorMsg Service
      this.loading = true;
      this.commonservice.updateColor(body).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.updated'), 'success');
          }).bind(this));  
          this.router.navigate(['color']);
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });
    }
      
  }

  myFunction() {
    this.colorForm.reset();
    this.checkReqValues();   
  }

}


