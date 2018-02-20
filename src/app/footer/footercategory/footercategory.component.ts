// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-footercategory',
//   templateUrl: './footercategory.component.html',
//   styleUrls: ['./footercategory.component.css']
// })
// export class FootercategoryComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }




import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-footercategory',
  templateUrl: './footercategory.component.html',
  styleUrls: ['./footercategory.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FootercategoryComponent implements OnInit {

  updateForm: FormGroup;
  
  public catEng: FormControl;
  public descEng: FormControl;

  public catMy: FormControl;
  public descMy: FormControl;

  public active: FormControl;

  public dataUrl: any;  
  public recordList: any;

  // public getIdentificationType: any;

  public getFooterIdEng: any;
  public getFooterIdMy: any;

  public getRefCode: any;



  complete: boolean;
  public languageId: any;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService) {
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
   }

  ngOnInit() {

    this.catEng = new FormControl();
    this.descEng = new FormControl();

    this.catMy = new FormControl();
    this.descMy = new FormControl();

    this.active = new FormControl();

    this.updateForm = new FormGroup({   

      catEng: this.catEng,
      catMy: this.catMy,

      descEng: this.descEng,
      descMy: this.descMy,

      active: this.active,

      
    });     
    
    let urlEdit = this.router.url.split('/')[3];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      this.updateForm.get('active').setValue(true);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }
  }

  getData() {

    let _getRefID = this.router.url.split('/')[3];
    // this.appConfig.urlRaceList
    this.dataUrl = this.appConfig.urlFooterCategory + "/" + _getRefID + "?language=" + this.languageId;;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log(data);

      this.updateForm.get('catEng').setValue(this.recordList.list[0].name);
      this.updateForm.get('descEng').setValue(this.recordList.list[0].description);
      this.updateForm.get('active').setValue(this.recordList.active);

      this.updateForm.get('catMy').setValue(this.recordList.list[1].name);
      this.updateForm.get('descMy').setValue(this.recordList.list[1].description);

      this.getRefCode = this.recordList.refCode;
      this.getFooterIdEng = this.recordList.list[0].id;
      this.getFooterIdMy = this.recordList.list[1].id;
      
      // this.getFaqCodeEng = this.recordList.faqList[0].faqCode;
      // this.getFaqIdEng = this.recordList.faqList[0].faqId;
      
      // this.getFaqCodeMy = this.recordList.faqList[1].faqCode;
      // this.getFaqIdMy = this.recordList.faqList[1].faqId;

      this.checkReqValues();

    });
  }

  back(){
    this.router.navigate(['footer/footercategory']);
  }

  submit(formValues: any) {
    
    let flag = false;
    let txt = "";

    if(formValues.active == null){
      flag = false;
    }

    else{
      flag = formValues.active;
    }

    let urlEdit = this.router.url.split('/')[3];

    // add form
    if(urlEdit === 'add'){

      let body = [
        {
          "name": null,
          "description": null,
          "enabled": false,
          "language": {
              "languageId": null
          }
        },
        {
          "name": null,
          "description": null,
          "enabled": false,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].name = formValues.catEng;
      body[0].description = formValues.descEng;
      body[0].enabled = formValues.active;
      body[0].language.languageId = 1;

      body[1].name = formValues.catMy;
      body[1].description = formValues.descMy;
      body[1].enabled = formValues.active;
      body[1].language.languageId = 2;

      console.log(body);

      this.commonservice.addFooterCategory(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          // alert('Record added successfully!')

          if(data.statusCode == "ERROR"){
            this.commonservice.errorResponse(data);
          }
          
          else{
            txt = "Record added successfully!"
            this.toastr.success(txt, '');  
            this.router.navigate(['footer/footercategory']);
          }               
        },
        error => {

          txt = "Server is down."
          this.toastr.error(txt, '');  
          console.log(error);
      });
    }

    // update form
    else{

      let body = [
        {
          "id": null,
          "name": null,
          "description": null,
          "enabled": false,
          "footerCode": null,
          "language": {
              "languageId": null
          }
        },
        {
          "id": null,
          "name": null,
          "description": null,
          "enabled": false,
          "footerCode": null,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].id = this.getFooterIdEng;
      body[0].name = formValues.catEng;
      body[0].description = formValues.descEng;
      body[0].enabled = formValues.active;
      body[0].footerCode = this.getRefCode;
      body[0].language.languageId = 1;

      body[1].id = this.getFooterIdMy;
      body[1].name = formValues.catMy;
      body[1].description = formValues.descMy;
      body[1].enabled = formValues.active;
      body[1].footerCode = this.getRefCode;
      body[1].language.languageId = 2;

      console.log(body);

      this.commonservice.updateFooterCategory(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          // alert('Record updated successfully!')

          if(data.statusCode == "ERROR"){
            this.commonservice.errorResponse(data);
          }
          
          else{
            txt = "Record updated successfully!"
            this.toastr.success(txt, '');  
            this.router.navigate(['footer/footercategory']);
          }               
        },
        error => {

          txt = "Server is down."
          this.toastr.error(txt, '');  
          console.log(error);
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["catEng", "catMy", "descEng", "descMy"];
    let nullPointers:any = [];

    for (var reqData of reqVal) {
      let elem = this.updateForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }
      
    if(nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  myFunction() {
    var txt;
    var r = confirm("Are you sure to reset the form?");
    if (r == true) {
        txt = "You pressed OK!";
        this.toastr.success(txt, ''); 
        this.updateForm.reset();
        this.checkReqValues();
    } else {
        txt = "You pressed Cancel!";
        this.toastr.success(txt, '');
    }
  }

}


