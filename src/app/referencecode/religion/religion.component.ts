// import { Component, OnInit } from '@angular/core';
// import { MatPaginator, MatTableDataSource } from '@angular/material';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { debug } from 'util';

// @Component({
//   selector: 'app-religion',
//   templateUrl: './religion.component.html',
//   styleUrls: ['./religion.component.css']
// })
// export class ReligionComponent implements OnInit {

  

//   constructor(private http: HttpClient,) { }

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
import { DialogsService } from './../../dialogs/dialogs.service';


@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ReligionComponent implements OnInit {

  updateForm: FormGroup;
  
  public religionEng: FormControl;  
  public religionMy: FormControl;

  // public active: FormControl

  public dataUrl: any;  
  public recordList: any;

  public getReligionIdEng: any;
  public getReligionIdMy: any;
  public getReligionCodeMy: any;
  public getReligionCodeEng: any;
  // public getRaceActive: any;

  complete: boolean;
  public languageId: any;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService,
  private translate: TranslateService,
  private dialogsService: DialogsService) { 
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              // this.getRecordList(this.pageCount, this.pageSize);
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      // this.getRecordList(this.pageCount, this.pageSize);
    }
  }

  ngOnInit() {
  
    this.religionEng = new FormControl();
    this.religionMy = new FormControl();
    // this.active = new FormControl();

    this.updateForm = new FormGroup({   
      religionEng: this.religionEng,
      religionMy: this.religionMy,
      // active: this.active,

      
    });     
    
    let urlEdit = this.router.url.split('/')[3];
    
    if (urlEdit === 'add'){
      this.commonservice.pageModeChange(false);
      // this.updateForm.get('active').setValue(true);
    }
    else{
      this.commonservice.pageModeChange(true);
      this.getData();
    }
  }

  getData() {

    let _getRefID = this.router.url.split('/')[3];
    // this.appConfig.urlRaceList
    // this.dataUrl = this.appConfig.urlReligionList + '/code/'+ _getRefID;
    this.dataUrl = this.appConfig.urlReligionList + '/'+ _getRefID + "?language=" + this.languageId;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log(data);

      this.updateForm.get('religionMy').setValue(this.recordList.religionList[1].religion);
      this.updateForm.get('religionEng').setValue(this.recordList.religionList[0].religion); 
      

      this.getReligionIdMy = this.recordList.religionList[1].religionId;
      this.getReligionCodeMy = this.recordList.religionList[1].religionCode;

      this.getReligionIdEng = this.recordList.religionList[0].religionId;
      this.getReligionCodeEng = this.recordList.religionList[0].religionCode;
      // this.getRaceActive = this.recordList.raceList[0].active;

    });
  }

  back(){
    this.router.navigate(['reference/religion']);
  }

  submit(formValues: any) {
    let txt = "";
    
    // let flag = false;

    // if(formValues.active == null){
    //   flag = false;
    // }

    // else{
    //   flag = formValues.active;
    // }

    let urlEdit = this.router.url.split('/')[3];

    // add form
    if(urlEdit === 'add'){

      let body = [
        {
          "religion": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        },
        {
          "religion": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[1].religion = formValues.religionMy;
      body[1].language.languageId = 2;
      // body[0].active = formValues.active;

      body[0].religion = formValues.religionEng; 
      body[0].language.languageId = 1;
      // body[1].active = formValues.active;

      console.log(body);

      this.commonservice.addReligion(body).subscribe(
        data => {

          let errMsg = data.statusCode.toLowerCase();

          if(errMsg == "error"){
            this.commonservice.errorResponse(data);
          }
          
          else{
            txt = "Record added successfully!"
            this.toastr.success(txt, '');  
            this.router.navigate(['reference/religion']);
          }               
        },
        error => {

          txt = "Server is down."
          this.toastr.error(txt, '');  
          console.log(error);

        //   console.log(JSON.stringify(body))
        //   console.log(body)
        //   // alert('Record added successfully!')

        //   let txt = "Record added successfully!";
        //   this.toastr.success(txt, '');  

        //   this.router.navigate(['reference/religion']);
        //   // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        // },
        // error => {
        //   console.log("No Data")
        //   // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }

    // update form
    else{

      let body = [
        {
          "religion": null,
          "religionId": null,
          "religionCode": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        },
        {
          "religion": null,
          "religionId": null,
          "religionCode": null,
          // "active": false,
          "language": {
              "languageId": null
          }
        }
      ]    


      body[1].religion = formValues.religionMy;
      body[1].religionId = this.getReligionIdMy;
      body[1].religionCode = this.getReligionCodeMy;
      body[1].language.languageId = 2;

      // body[0].active = formValues.active;

      body[0].religion = formValues.religionEng; 
      body[0].religionId = this.getReligionIdEng; 
      body[0].religionCode = this.getReligionCodeEng; 
      body[0].language.languageId = 1;

      // body[1].active = formValues.active;

      console.log(body);

      this.commonservice.updateReligion(body).subscribe(
        data => {

          let errMsg = data.statusCode.toLowerCase();

          if(errMsg == "error"){
            this.commonservice.errorResponse(data);
          }
          
          else{
            txt = "Record added successfully!"
            this.toastr.success(txt, '');  
            this.router.navigate(['reference/religion']);
          }               
        },
        error => {

          txt = "Server is down."
          this.toastr.error(txt, '');  
          console.log(error);

        //   console.log(JSON.stringify(body))
        //   console.log(body)
        //   // alert('Record updated successfully!')

        //   let txt = "Record updated successfully!";
        //   this.toastr.success(txt, ''); 

        //   this.router.navigate(['reference/religion']);
        //   // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        // },
        // error => {
        //   console.log("No Data")
        //   // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["religionEng", "religionMy"];
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

    this.updateForm.reset();
    this.checkReqValues(); 

    // var txt;
    // var r = confirm("Are you sure to reset the form?");
    // if (r == true) {
    //     txt = "You pressed OK!";
    //     this.toastr.success(txt, ''); 
    //     this.updateForm.reset();
    //     this.checkReqValues();
    // } else {
    //     txt = "You pressed Cancel!";
    //     this.toastr.success(txt, '');
    // }
  }

}



