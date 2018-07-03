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
  updateForm: FormGroup;
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
  public loading = false;
  lang: string;
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService
  ) { 
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
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

    });
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.commonservice.getModuleId();
    let refCode = this.router.url.split('/')[3];
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
    
    this.updateForm = new FormGroup({
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
      this.pageMode = 'common.add';
      this.loadCate();
       // Add media type will have all category
      // this.updateForm.get('imgchkactive').setValue(false);     
    } else {
      this.isEdit = true;
      this.pageMode = 'common.update'; 
      this.getRow(refCode); // Edit media type will have only selected category
      }

    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.updateForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.updateForm.disable();
    }    
  }

  back() {
    this.router.navigate(['media/type']);
  }

  loadMedia() {
    this.loading = true;
    //Get Media Type
    // this.commonservice.getMediaType()
    this.commonservice.readProtected('mediatype','', '', '', this.languageId)
    .subscribe(resStateData => {
     this.commonservice.errorHandling(resStateData, (function(){            
         this.objMediaType = resStateData['mediaTypes'];   
        }).bind(this));
         this.loading = false;           
     },
     error => {
      this.loading = false;
       this.toastr.error(JSON.parse(error._body).statusDesc, '');          
    });
  }

  loadCate(){
    this.loading = true;
    // Get Categories
    // this.commonservice.getCategoryData()
    this.commonservice.readProtected('content/category')
    .subscribe(resStateData => {
      this.commonservice.errorHandling(resStateData, (function () {
        this.objCategory = resStateData['list'];
      }).bind(this));
      this.loading = false;
    },
      error => {
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });
      
}  // get, add, update, delete
  getRow(row) {
    this.loading = true;
    this.commonservice.readProtected('mediatype','', '', '', this.languageId)
    .subscribe(resStateData => {
      this.commonservice.errorHandling(resStateData, (function(){            
         this.objMediaType = resStateData['mediaTypes'];    
        //  this.http.get(this.appConfig.urlMediaType + '/id/' + row)
          this.commonservice.readProtectedById('mediatype/id/', row, this.languageId)
          .subscribe(Rdata => {
            this.commonservice.errorHandling(Rdata, (function () {
              this.mediaTypeData = Rdata;
              
              let data = this.mediaTypeData['mediaType'];
              this.getData = data;
              // populate data
              if (data) {
                // this.mediaTypeId = data.mediaTypeId;
                this.updateForm.get('mediatype').setValue(data.mediaTypeId);
    
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
                this.updateForm.get('catType').setValue(data.mediaTypeCategories[0].category.categoryId);
                this.updateForm.get('filetype').setValue(data.mediaTypeCategories[0].fileExtensions.split(','));
    
                this.updateForm.get('filesize').setValue(data.mediaTypeCategories[0].fileThresholdSize);
                this.updateForm.get('fileunit').setValue(data.mediaTypeCategories[0].fileThresholdSizeUnits);
                this.updateForm.get('minheigth').setValue(data.mediaTypeCategories[0].minH);
                this.updateForm.get('minwidth').setValue(data.mediaTypeCategories[0].minW);
                this.updateForm.get('maxheigth').setValue(data.mediaTypeCategories[0].maxH);
                this.updateForm.get('maxwidth').setValue(data.mediaTypeCategories[0].maxW);
    
                this.updateForm.get('active').setValue(data.enabled);
                this.checkReqValues();
              }
            }).bind(this));
            this.loading = false;
          },
          error => {
            this.loading = false;
            this.toastr.error(JSON.parse(error._body).statusDesc, '');          
          }); 
        }).bind(this));
        this.loading = false;              
     },
     error => {
      this.loading = false;
       this.toastr.error(JSON.parse(error._body).statusDesc, '');          
    });       
  }

  selMediaType(event) {
    var fltr = this.objMediaType.filter(fdata => fdata.mediaTypeId == event.value);
    this.objFileExtn = fltr[0].supportedFileExtensions.split(',');
    this.displaymediaTypeName = fltr[0].mediaTypeName;    
    this.checkReqValues();
  }

  selCateType(event) {
    
    if (this.isEdit) {  
      let filtrData = this.objCategory.filter(
        fdata => fdata.category.categoryId === event.value);
        this.selCategory = filtrData[0].category;
        this.selmediaTypeCategoryId = filtrData[0].mediaTypeCategoryId;
      
      if (filtrData.length > 0) {
        this.updateForm.get('filesize').setValue(filtrData[0].fileThresholdSize);
        this.updateForm.get('fileunit').setValue(filtrData[0].fileThresholdSizeUnits);
        this.updateForm.get('minheigth').setValue(filtrData[0].minH);
        this.updateForm.get('minwidth').setValue(filtrData[0].minW);
        this.updateForm.get('maxheigth').setValue(filtrData[0].maxH);
        this.updateForm.get('maxwidth').setValue(filtrData[0].maxW);
      } else {        
        this.updateForm.controls.filesize.reset();
        this.updateForm.controls.fileunit.reset();
        this.updateForm.controls.minheigth.reset();
        this.updateForm.controls.minwidth.reset();
        this.updateForm.controls.maxheigth.reset();
        this.updateForm.controls.maxwidth.reset();
      }
    }else {
      let filtrData = this.objCategory.filter(
        fdata => fdata.list[0].categoryId === event.value);
        this.selCategory = filtrData[0].list[0];
    }
    this.checkReqValues();
  }

  myFunction() {
    this.updateForm.reset();
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

  // updateMediaType
  updateMediaType(formValues: any) {
    if (this.isEdit) {
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

      

      // Update Media Type Service
      this.commonservice.update(body[0],'mediatype/' + this.mediaTypeData.mediaType.mediaTypeId)
      .subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success('Media Type Updated successfully!', '');
            this.router.navigate(['media/type']);
          }).bind(this));
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
        });

    } else {     
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
      body[0].category.categoryId = formValues.catType;
      body[0].category.categoryName = this.selCategory.categoryName;
      body[0].minH = formValues.minheigth;
      body[0].maxH = formValues.maxheigth;
      body[0].minW = formValues.minwidth;
      body[0].maxW = formValues.maxwidth;
      body[0].fileThresholdSize = formValues.filesize;
      body[0].fileThresholdSizeUnits = formValues.fileunit;
      body[0].fileExtensions = formValues.filetype.toString();
      

      // Update Media Type Service
      // this.commonservice.addMediaType(formValues.mediatype, body[0]).subscribe(
        this.commonservice.create(body[0],'mediatype/' + formValues.mediatype)
        .subscribe(data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success('Media Type Updated successfully!', '');
            this.router.navigate(['media/type']);
          }).bind(this));
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
        });
    }
  }


}
