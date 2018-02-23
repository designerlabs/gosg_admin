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
  lang:any;
  languageId: any;
  colorId: any;
  
  colorForm: FormGroup
  colorName: FormControl
  colorCode: FormControl
  default: FormControl
  active: FormControl

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private dialogsService: DialogsService,
    private translate: TranslateService,
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
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {

    let refId = this.router.url.split('/')[2];

    this.colorName = new FormControl()
    this.colorCode = new FormControl()
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

  back(){
    this.router.navigate(['color']);
  }

  // get, add, update, delete
  getRow(row) {

    // Update Slider Service
    return this.http.get(this.appConfig.urlGetColor + '/id/' + row).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {

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

  }

  updatecolor(formValues: any) {
    
    if(!this.isEdit) {

    let body = {
        "colorName": null,
        "colorCodeription": null,
        "active": false,
        "default": false
    };
    
    // console.log(formValues)

    body.colorName = formValues.colorName;
    body.colorCodeription = formValues.colorCode;
    body.active = formValues.active;
    body.default = formValues.default;

    console.log(body)

    // Add ErrorMsg Service
    this.commonservice.addColor(body).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
        }).bind(this));  
        this.router.navigate(['color']);
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
      });

    } else {

      let body = {
          "colorId": null,
          "colorName": null,
          "colorCodeription": null,
          "active": false,
          "default": null
      };
      
      // console.log(formValues)
  
      body.colorId = this.colorId;
      body.colorName = formValues.colorName;
      body.colorCodeription = formValues.colorCode;
      body.active = formValues.active;
      body.default = formValues.default;

    console.log(JSON.stringify(body));

    // Update ErrorMsg Service
    this.commonservice.updateColor(body).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
        }).bind(this));  
        this.router.navigate(['color']);
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });
    }
    
    }

}
