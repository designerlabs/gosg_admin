// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-footercontent',
//   templateUrl: './footercontent.component.html',
//   styleUrls: ['./footercontent.component.css']
// })
// export class FootercontentComponent implements OnInit {

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

@Component({
  selector: 'app-footercontent',
  templateUrl: './footercontent.component.html',
  styleUrls: ['./footercontent.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FootercontentComponent implements OnInit {

  updateForm: FormGroup;
  
  public nameEng: FormControl;
  public descEng: FormControl;
  public iconEng: FormControl;
  public imgEng: FormControl;
  public urlEng: FormControl;
  public seqEng: FormControl;

  public nameMy: FormControl;
  public descMy: FormControl;
  public iconMy: FormControl;
  public imgMy: FormControl;
  public urlMy: FormControl;
  public seqMy: FormControl;

  public active: FormControl;
  public copyImg: FormControl;

  public dataUrl: any;  
  public recordList: any;

  // public getIdentificationType: any;

  public getFaqIdEng: any;
  public getFaqCodeEng: any;

  public getFaqIdMy: any;
  public getFaqCodeMy: any;

  public getRefCode: any;



  complete: boolean;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig,
  private commonservice: CommonService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.nameEng = new FormControl();
    this.descEng = new FormControl();
    this.iconEng = new FormControl();
    this.imgEng = new FormControl();
    this.urlEng = new FormControl();
    this.seqEng = new FormControl();

    this.nameMy = new FormControl();
    this.descMy = new FormControl();
    this.iconMy = new FormControl();
    this.imgMy = new FormControl();
    this.urlMy = new FormControl();
    this.seqMy = new FormControl();

    this.active = new FormControl();
    this.copyImg = new FormControl();

    this.updateForm = new FormGroup({   

      nameEng: this.nameEng,
      descEng: this.descEng,
      iconEng: this.iconEng,
      imgEng: this.imgEng,
      urlEng: this.iconEng,
      seqEng: this.imgEng,

      nameMy: this.nameMy,
      descMy: this.descMy,
      iconMy: this.iconMy,
      imgMy: this.imgMy,
      urlMy: this.iconMy,
      seqMy: this.imgMy,

      active: this.active,
      copyImg: this.copyImg,

      
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
    this.dataUrl = this.appConfig.urlFooterCategory + '/code/' +  _getRefID;

    this.http.get(this.dataUrl)
    .subscribe(data => {
      this.recordList = data;

      console.log(data);

      this.updateForm.get('nameEng').setValue(this.recordList.faqList[0].facQuestion);
      this.updateForm.get('descEng').setValue(this.recordList.faqList[0].facAnswer);
      this.updateForm.get('iconEng').setValue(this.recordList.faqList[0].facAnswer);
      this.updateForm.get('imgEng').setValue(this.recordList.faqList[0].facAnswer);
      this.updateForm.get('urlEng').setValue(this.recordList.faqList[0].facAnswer);
      this.updateForm.get('seqEng').setValue(this.recordList.faqList[0].facAnswer);

      this.updateForm.get('active').setValue(this.recordList.faqList[0].faqActiveFlag);
      this.updateForm.get('copyImg').setValue(this.recordList.faqList[0].faqActiveFlag);
      this.updateForm.get('isSameImg').setValue(this.recordList.faqList[0].faqActiveFlag);

      this.updateForm.get('nameMy').setValue(this.recordList.faqList[1].facQuestion);
      this.updateForm.get('descMy').setValue(this.recordList.faqList[1].facAnswer);
      this.updateForm.get('iconMy').setValue(this.recordList.faqList[1].facAnswer);
      this.updateForm.get('imgMy').setValue(this.recordList.faqList[1].facAnswer);
      this.updateForm.get('urlMy').setValue(this.recordList.faqList[1].facAnswer);
      this.updateForm.get('seqMy').setValue(this.recordList.faqList[1].facAnswer);
      
      this.getFaqCodeEng = this.recordList.faqList[0].faqCode;
      this.getFaqIdEng = this.recordList.faqList[0].faqId;
      
      this.getFaqCodeMy = this.recordList.faqList[1].faqCode;
      this.getFaqIdMy = this.recordList.faqList[1].faqId;

      this.getRefCode = this. recordList.refCode;

    });
  }

  back(){
    this.router.navigate(['footer/footercontent']);
  }

  submit(formValues: any) {
    
    let flag = false;

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
          "desc": null,
          "enabled": false,
          "icon": null,
          "image": null,
          "url": null,
          "seq": null,
          "language": {
              "languageId": null
          }
        },
        {
          "name": null,
          "desc": null,
          "enabled": false,
          "icon": null,
          "image": null,
          "url": null,
          "seq": null,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].name = formValues.catEng;
      body[0].desc = formValues.descEng;
      body[0].icon = formValues.iconEng;
      body[0].image = formValues.imgEng;
      body[0].url = formValues.urlEng;
      body[0].seq = formValues.seqEng;
      body[0].enabled = formValues.active;
      body[0].language.languageId = 1;

      body[1].name = formValues.catMy;
      body[1].desc = formValues.descMy;
      body[1].icon = formValues.iconMy;
      body[1].image = formValues.imgMy;
      body[1].url = formValues.urlMy;
      body[1].seq = formValues.seqMy;
      body[1].enabled = formValues.active;
      body[1].language.languageId = 2;

      console.log(body);

      this.commonservice.addFooterCategory(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          // alert('Record added successfully!')

          let txt = "Record added successfully!";
          this.toastr.success(txt, '');  

          this.router.navigate(['footer/footercontent']);
          // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        },
        error => {
          console.log("No Data")
          // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }

    // update form
    else{

      let body = [
        {
          "name": null,
          "desc": null,
          "icon": null,
          "image": null,
          "active": false,
          "refCode": null,
          "url": null,
          "seq": null,
          "language": {
              "languageId": null
          }
        },
        {
          "name": null,
          "desc": null,
          "icon": null,
          "image": null,
          "active": false,
          "refCode": null,
          "url": null,
          "seq": null,
          "language": {
              "languageId": null
          }
        }
      ]   
 
      body[0].name = formValues.catEng;
      body[0].desc = formValues.descEng;
      body[0].icon = formValues.iconEng;
      body[0].image = formValues.imgEng;
      body[0].url = formValues.urlEng;
      body[0].seq = formValues.seqEng;
      body[0].active = formValues.active;
      body[0].refCode = 1;
      body[0].language.languageId = 1;

      body[1].name = formValues.catMy;
      body[1].desc = formValues.descMy;
      body[1].icon = formValues.iconMy;
      body[1].image = formValues.imgMy;
      body[1].url = formValues.iconMy;
      body[1].seq = formValues.imgMy;
      body[1].active = formValues.active;
      body[1].refCode = 1;
      body[1].language.languageId = 2;

      console.log(body);

      this.commonservice.updateFooterCategory(body).subscribe(
        data => {
          console.log(JSON.stringify(body))
          console.log(body)
          // alert('Record updated successfully!')

          let txt = "Record updated successfully!";
          this.toastr.success(txt, ''); 

          this.router.navigate(['footer/footercontent']);
          // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        },
        error => {
          console.log("No Data")
          // this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
      });
    }
  }

  checkReqValues() {

    let reqVal:any = ["nameEng", "nameMy"];
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

  isSameImg(imgEng,imgMy) {

    console.log(imgEng)
    if(imgEng != null && imgEng == imgMy) {
      this.updateForm.get('copyImg').setValue(true);
    } else {
      this.updateForm.get('copyImg').setValue(false);
    }
  }

  isChecked(e) {

    if (e.checked) {
      this.updateForm.get("imgMy").setValue(this.imgEng.value);
    } else {
      this.updateForm.get("imgMy").setValue("");
    }
    this.copyImg = e.checked;
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


