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
  selector: 'app-modmenu',
  templateUrl: './modmenu.component.html',
  styleUrls: ['./modmenu.component.css']
})
export class ModmenuComponent implements OnInit {

  moduleData: Object;
  isActive: boolean;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  lang:any;
  languageId: any;
  moduleId: any;
  
  modulesForm: FormGroup
  moduleName: FormControl
  moduleDesc: FormControl
  moduleUrl: FormControl
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

    let refCode = this.router.url.split('/')[2];

    this.moduleName = new FormControl()
    this.moduleDesc = new FormControl()
    this.moduleUrl = new FormControl()
    this.active = new FormControl()

    this.modulesForm = new FormGroup({

      moduleName: this.moduleName,
      moduleDesc: this.moduleDesc,
      moduleUrl: this.moduleUrl,
      active: this.active

    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
      this.modulesForm.get('active').setValue(true);
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }

  }

  back(){
    this.router.navigate(['modmenu']);
  }

  // get, add, update, delete
  getRow(row) {

    // Update Slider Service
    return this.http.get(this.appConfig.urlModule + '/' + row).subscribe(
    // return this.http.get(this.appConfig.urlSlides + row + "/").subscribe(
      Rdata => {

        this.moduleData = Rdata['module'];
        console.log(this.moduleData)
        // console.log(this.appConfig.urlMenu + "/" + row)

      // populate data
      this.modulesForm.get('moduleName').setValue(this.moduleData['moduleName']);
      this.modulesForm.get('moduleDesc').setValue(this.moduleData['moduleDescription']);
      this.modulesForm.get('moduleUrl').setValue(this.moduleData['moduleUrl']);
      this.modulesForm.get('active').setValue(this.moduleData['active']);
      this.moduleId = this.moduleData['moduleId'];

      this.checkReqValues();
    });
    
  }

  checkReqValues() {

    let moduleName = "moduleName";
    let moduleDesc = "moduleDesc";
    let moduleUrl = "moduleUrl";
    let active = "active";

    let reqVal: any = [moduleName, moduleDesc, moduleUrl, active];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.modulesForm.get(reqData);

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

  updateModule(formValues: any) {
    
    if(!this.isEdit) {

    let body = {
        "moduleName": null,
        "moduleDescription": null,
        "active": false,
        "moduleUrl": null
    };
    
    // console.log(formValues)

    body.moduleName = formValues.moduleName;
    body.moduleDescription = formValues.moduleDesc;
    body.active = formValues.active;
    body.moduleUrl = formValues.moduleUrl;


    console.log(body)

    // Add ErrorMsg Service
    this.commonservice.addModMenu(body).subscribe(
      data => {
        this.toastr.success('Module added successfully!', ''); 
        this.router.navigate(['modmenu']);
      },
      error => {
        console.log("No Data")
      });

    } else {

      let body = {
          "moduleId": null,
          "moduleName": null,
          "moduleDescription": null,
          "active": false,
          "moduleUrl": null
      };
      
      // console.log(formValues)
  
      body.moduleId = this.moduleId;
      body.moduleName = formValues.moduleName;
      body.moduleDescription = formValues.moduleDesc;
      body.active = formValues.active;
      body.moduleUrl = formValues.moduleUrl;

    console.log(body);

    // Update ErrorMsg Service
    this.commonservice.updateModMenu(body).subscribe(
      data => {
        this.toastr.success('Module update successful!', '');   
        this.router.navigate(['modmenu']);
      },
      error => {
        console.log("No Data")
      });
    }
    
    }

}
