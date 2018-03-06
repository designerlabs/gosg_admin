import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { debug } from 'util';

@Component({
  selector: 'app-mediatype',
  templateUrl: './mediatype.component.html',
  styleUrls: ['./mediatype.component.css']
})
export class MediatypeComponent implements OnInit {

  objImage = ["jpg", "jpeg", "png", "gif", "tiff", "bmp"];
  objAudio = ["MP3", "WAV"];
  objVideo = ["AVI", "FLV", "WMV", "MOV", "MP4"];
  objDoc = ["doc", "docx", "pdf", "xls", "xlsx", "txt"];
  objUnit = ["MB", "KB"];
  // objCategory = ["Slider", "Article", "Gallery"];
  // objMediaType = ["Images", "Documents", "Videos", "Audios"];
  objMediaType: any;
  objFileExtn = [];
  objCategory: any;
  getData;
  displaymediaTypeName;
  languageId: any;
  mediaTypeData: any;
  mediaTypeForm: FormGroup;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  selCategory: any;
  selmediaTypeCategoryId;
  catType: FormControl;
  mediatype: FormControl;
  filetype: FormControl;
  filesize: FormControl;
  fileunit: FormControl;
  minwidth: FormControl;
  maxwidth: FormControl;
  minheigth: FormControl;
  maxheigth: FormControl;

  active: FormControl;

  resetMsg = this.resetMsg;
  imgchk = false;

  reqVal = [];
  imgreqVal = [];
  docreqVal = [];
  audioreqVal = [];
  videoreqVal = [];

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService,
    private router: Router,
    private translate: TranslateService,
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
  }

  ngOnInit() {
    debugger;
    this.commonservice.getModuleId();
    let refCode = this.router.url.split('/')[2];
    this.mediatype = new FormControl();
    this.catType = new FormControl();
    this.filetype = new FormControl();
    this.filesize = new FormControl();
    this.fileunit = new FormControl();
    this.minwidth = new FormControl();
    this.maxwidth = new FormControl();
    this.minheigth = new FormControl();
    this.maxheigth = new FormControl();
    this.active = new FormControl();
    
    this.mediaTypeForm = new FormGroup({
      catType: this.catType,
      mediatype: this.mediatype,
      filetype: this.filetype,
      filesize: this.filesize,
      fileunit: this.fileunit,
      minwidth: this.minwidth,
      maxwidth: this.maxwidth,
      minheigth: this.minheigth,
      maxheigth: this.maxheigth,
      active: this.active,
    });
    this.loadMedia();    
    if (refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
      this.loadCate();
       // Add media type will have all category
      // this.mediaTypeForm.get('imgchkactive').setValue(false);     
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode); // Edit media type will have only selected category
      }
  }//10.1.22.50:8080/mediatype


  back() {
    this.router.navigate(['mediatype']);
  }

  loadMedia() {
    //Get Media Type
    this.commonservice.getMediaType()
    .subscribe(resStateData => {
     // this.commonservice.errorHandling(resStateData, (function(){            
         this.objMediaType = resStateData['mediaTypes'];              
     },
     error => {
       this.toastr.error(JSON.parse(error._body).statusDesc, '');          
    });
  }

  loadCate(){
    // Get Categories
    this.commonservice.getCategoryData()
    .subscribe(resStateData => {
      this.commonservice.errorHandling(resStateData, (function () {
        this.objCategory = resStateData['list'];
      }).bind(this));
    },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });
      
}  // get, add, update, delete
  getRow(row) {

    this.commonservice.getMediaType()
    .subscribe(resStateData => {
    //  this.commonservice.errorHandling(resStateData, (function(){            
         this.objMediaType = resStateData['mediaTypes'];    
         this.http.get(this.appConfig.urlMediaType + '/id/' + row).subscribe(
          Rdata => {
            this.commonservice.errorHandling(Rdata, (function () {
              this.mediaTypeData = Rdata;
              console.log(this.mediaTypeData);
              let data = this.mediaTypeData['mediaType'];
              this.getData = data;
              // populate data
              if (data) {
                // this.mediaTypeId = data.mediaTypeId;
                this.mediaTypeForm.get('mediatype').setValue(data.mediaTypeId);
    
                // if (data.mediaTypeName == "Images") {
                //   this.objFileExtn = this.objImage;
                // } else if (data.mediaTypeName == "Documents") {
                //   this.objFileExtn = this.objDoc;
                // } else if (data.mediaTypeName == "Videos") {
                //   this.objFileExtn = this.objVideo;
                // } else if (data.mediaTypeName == "Audios") {
                //   this.objFileExtn = this.objAudio;
                // }
                var fltr = this.objMediaType.filter(fdata => fdata.mediaTypeId == data.mediaTypeId);
                this.objFileExtn = fltr[0].supportedFileExtensions.split(',');
                this.displaymediaTypeName = data.mediaTypeName;
                this.objCategory = data.mediaTypeCategories;
    
                this.selCategory = data.mediaTypeCategories[0].category;
                this.selmediaTypeCategoryId = data.mediaTypeCategories[0].mediaTypeCategoryId;
                this.mediaTypeForm.get('catType').setValue(data.mediaTypeCategories[0].category.categoryId);
                this.mediaTypeForm.get('filetype').setValue(data.mediaTypeCategories[0].fileExtensions.split(','));
    
                this.mediaTypeForm.get('filesize').setValue(data.mediaTypeCategories[0].fileThresholdSize);
                this.mediaTypeForm.get('fileunit').setValue(data.mediaTypeCategories[0].fileThresholdSizeUnits);
                this.mediaTypeForm.get('minheigth').setValue(data.mediaTypeCategories[0].minH);
                this.mediaTypeForm.get('minwidth').setValue(data.mediaTypeCategories[0].minW);
                this.mediaTypeForm.get('maxheigth').setValue(data.mediaTypeCategories[0].maxH);
                this.mediaTypeForm.get('maxwidth').setValue(data.mediaTypeCategories[0].maxW);
    
                this.mediaTypeForm.get('active').setValue(data.enabled);
                this.checkReqValues();
              }
            }).bind(this));
            
          },
          error => {
            this.toastr.error(JSON.parse(error._body).statusDesc, '');          
          });              
     },
     error => {
       this.toastr.error(JSON.parse(error._body).statusDesc, '');          
    });   
    
  }

  selMediaType(event) {
    var fltr = this.objMediaType.filter(fdata => fdata.mediaTypeId == event.value);
    this.objFileExtn = fltr[0].supportedFileExtensions.split(',');
    this.displaymediaTypeName = fltr[0].mediaTypeName;
    // if (event.value == "Images") {
    //   this.objFileExtn = this.objImage;
    // } else if (event.value == "Documents") {
    //   this.objFileExtn = this.objDoc;
    // } else if (event.value == "Videos") {
    //   this.objFileExtn = this.objVideo;
    // } else if (event.value == "Audios") {
    //   this.objFileExtn = this.objAudio;
    // }

    this.checkReqValues();
  }

  selCateType(event) {
    
    if (this.isEdit) {  
      let filtrData = this.objCategory.filter(
        fdata => fdata.category.categoryId === event.value);
        this.selCategory = filtrData[0].category;
        this.selmediaTypeCategoryId = filtrData[0].mediaTypeCategoryId;
      console.log(this.getData);      
      if (filtrData.length > 0) {
        this.mediaTypeForm.get('filesize').setValue(filtrData[0].fileThresholdSize);
        this.mediaTypeForm.get('fileunit').setValue(filtrData[0].fileThresholdSizeUnits);
        this.mediaTypeForm.get('minheigth').setValue(filtrData[0].minH);
        this.mediaTypeForm.get('minwidth').setValue(filtrData[0].minW);
        this.mediaTypeForm.get('maxheigth').setValue(filtrData[0].maxH);
        this.mediaTypeForm.get('maxwidth').setValue(filtrData[0].maxW);
      } else {
        
        this.mediaTypeForm.controls.filesize.reset();
        this.mediaTypeForm.controls.fileunit.reset();
        this.mediaTypeForm.controls.minheigth.reset();
        this.mediaTypeForm.controls.minwidth.reset();
        this.mediaTypeForm.controls.maxheigth.reset();
        this.mediaTypeForm.controls.maxwidth.reset();
      }
    }else {
      let filtrData = this.objCategory.filter(
        fdata => fdata.list[0].categoryId === event.value);
        this.selCategory = filtrData[0].list[0];
    }
    this.checkReqValues();
  }

  checkReqValues() {
    let mediatype = "mediatype";
    let catType = "catType";
    let filetype = "filetype";

    let filesize = "filesize";
    let fileunit = "fileunit";
    let minwidth = "minwidth";
    let maxwidth = "maxwidth";
    let minheigth = "minheigth";
    let maxheigth = "maxheigth";

    let reqVal: any = [mediatype, catType, filetype, filesize, fileunit, minwidth, maxwidth, minheigth, maxheigth];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.mediaTypeForm.get(reqData);

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

  myFunction() {
    let txt;
    let r = confirm("Are you sure to reset the form?");
    if (r == true) {
      txt = "You pressed OK!";
      this.mediaTypeForm.reset();
      this.mediaTypeForm.get('active').setValue(true);
    } else {
      txt = "You pressed Cancel!";
    }
  }

  // updateMediaType
  updateMediaType(formValues: any) {
    if (this.isEdit) {
      // let body = [
      //   {
                  
      //     "mediaTypeCategories": [{
      //       "mediaTypeCategoryId": null,
      //       "category": {
      //         "categoryId": null,
      //         "categoryName": ""
      //       },
      //       "minH": "",
      //       "minW": "",
      //       "maxH": "",
      //       "maxW": "",
      //       "fileThresholdSize": "",
      //       "fileThresholdSizeUnits": "",
      //       "fileExtensions": "",
      //     }],
      //     "enabled": true
      //   }
      // ];

      let body = [{
        "category": {
          "categoryId": null,
          "categoryName": null
        },
        "mediaTypeCategoryId" : null,
        "minH": null,
        "minW": null,
        "maxH": null,
        "maxW": null,
        "fileThresholdSize": null,
        "fileThresholdSizeUnits": null,
        "fileExtensions": null
      }];
    
      // body[0].mediaTypeId = this.mediaTypeData.mediaType.mediaTypeId;
      // body[0].mediaTypeName = this.mediaTypeData.mediaType.mediaTypeName;
      // body[0].supportedFileExtensions = this.mediaTypeData.supportedFileExtensions;
      // body[0].mediaTypeCategories[0].mediaTypeCategoryId = this.selmediaTypeCategoryId;
      // body[0].mediaTypeCategories[0].category.categoryName = this.selCategory.categoryName;
      // body[0].mediaTypeCategories[0].category.categoryId = formValues.catType;

      // body[0].mediaTypeCategories[0].minH = formValues.minheigth;
      // body[0].mediaTypeCategories[0].minW = formValues.minwidth;
      // body[0].mediaTypeCategories[0].maxH = formValues.maxheigth;
      // body[0].mediaTypeCategories[0].maxW = formValues.maxwidth;
      // body[0].mediaTypeCategories[0].fileThresholdSize = formValues.filesize;
      // body[0].mediaTypeCategories[0].fileThresholdSizeUnits = formValues.fileunit;
      // body[0].mediaTypeCategories[0].fileExtensions = formValues.filetype.toString();
      // body[0].enabled = true;

      body[0].category.categoryId = formValues.catType;
      body[0].category.categoryName = this.selCategory.categoryName;
      body[0].mediaTypeCategoryId =  this.selmediaTypeCategoryId;
      body[0].minH = formValues.minheigth;
      body[0].maxH = formValues.maxheigth;
      body[0].minW = formValues.minwidth;
      body[0].maxW = formValues.maxwidth;
      body[0].fileThresholdSize = formValues.filesize;
      body[0].fileThresholdSizeUnits = formValues.fileunit;
      body[0].fileExtensions = formValues.filetype.toString();

      console.log(body);

      // Update Media Type Service
      this.commonservice.updateMediaType(this.mediaTypeData.mediaType.mediaTypeId, body[0]).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success('Media Type Updated successfully!', '');
            this.router.navigate(['mediatype']);
          }).bind(this));
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
        });

    } else {
      // let body = [
      //   {
      //     "mediaTypeId": null,  
      //     "mediaTypeName": null,
      //     "supportedFileExtensions": null,       
      //     "mediaTypeCategories": [{
      //       "category": {
      //         "categoryId": null,
      //         "categoryName": ""
      //       },     
      //       "minH": "",
      //       "minW": "",
      //       "maxH": "",
      //       "maxW": "",
      //       "fileThresholdSize": "",
      //       "fileThresholdSizeUnits": "",
      //       "fileExtensions": "",
      //     }],
      //     "enabled": true
      //   }
      // ];
      let body = [{
        "category": {
          "categoryId": null,
          "categoryName": null
        },
        "minH": null,
        "minW": null,
        "maxH": null,
        "maxW": null,
        "fileThresholdSize": null,
        "fileThresholdSizeUnits": null,
        "fileExtensions": null
      }];
      var fltr = this.objMediaType.filter(fdata => fdata.mediaTypeId == formValues.mediatype);
      // // body[0].mediaTypeId = this.mediaTypeId;
      // body[0].mediaTypeId = formValues.mediatype;
      // body[0].mediaTypeName = fltr[0].mediaTypeName;
      // // body[0].mediaTypeName = formValues.mediatype;
      // body[0].supportedFileExtensions = fltr[0].supportedFileExtensions;
      // body[0].mediaTypeCategories[0].category.categoryId = formValues.catType;
      // body[0].mediaTypeCategories[0].category.categoryName = this.selCategory.categoryName;

      // body[0].mediaTypeCategories[0].minH = formValues.minheigth;
      // body[0].mediaTypeCategories[0].minW = formValues.minwidth;
      // body[0].mediaTypeCategories[0].maxH = formValues.maxheigth;
      // body[0].mediaTypeCategories[0].maxW = formValues.maxwidth;
      // body[0].mediaTypeCategories[0].fileThresholdSize = formValues.filesize;
      // body[0].mediaTypeCategories[0].fileThresholdSizeUnits = formValues.fileunit;
      // body[0].mediaTypeCategories[0].fileExtensions = formValues.filetype.toString()
      // body[0].enabled = true;
      body[0].category.categoryId = formValues.catType;
      body[0].category.categoryName = this.selCategory.categoryName;
      body[0].minH = formValues.minheigth;
      body[0].maxH = formValues.maxheigth;
      body[0].minW = formValues.minwidth;
      body[0].maxW = formValues.maxwidth;
      body[0].fileThresholdSize = formValues.filesize;
      body[0].fileThresholdSizeUnits = formValues.fileunit;
      body[0].fileExtensions = formValues.filetype.toString();
      console.log(body);

      // Update Media Type Service
      this.commonservice.addMediaType(formValues.mediatype, body[0]).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success('Media Type Updated successfully!', '');
            this.router.navigate(['mediatype']);
          }).bind(this));
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
        });
    }
  }


}
