import { Component, OnInit, Inject, ElementRef, OnDestroy } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Headers, RequestOptions } from '@angular/http';
import { debug } from 'util';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import {
  Ng4FilesService,
  Ng4FilesConfig,
  Ng4FilesStatus,
  Ng4FilesSelected
} from '../../ng4-files';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from './../../nav/nav.service';

@Component({
  selector: 'app-mediafileupload',
  templateUrl: './mediafileupload.component.html',
  styleUrls: ['./mediafileupload.component.css']
})
export class MediafileuploadComponent implements OnInit, OnDestroy {

  // objCategory = ["Slider","Article","Gallery"];
  // objMediaType = ["Images","Documents","Videos","Audios"];
  objMediaType: any;
  objCategory;
  AllobjCategory;
  mediaFileUpForm: FormGroup;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  selFilesEn = [];
  selFilesMy = [];
  getData = [];
  chkUploadFile : any;
  addconfig: boolean;
  showMediaTypeName: string;
  showImgEn = false;
  showImgMy = false;
  mediaPath: string;

  catType: FormControl;
  mediatype: FormControl;
  mediaFileEn: FormControl;
  mediaFileMy: FormControl;
  mediaTitleEn: FormControl;
  mediaTitleMy: FormControl;
  mediaFileUploadEn: FormControl;
  mediaFileUploadMy: FormControl;
  active: FormControl;

  mediaFileUpData: Object;
  selectedFilesEn;
  selectedFilesMy;
  selectedFiles;
  filesResult : any;
  languageId: any;
  lang: any;
  // formdata: FileList;
  clientId;
  networkContract: any;
  public loading = false;
  resFileExtn = [];

  private subscriptionLang: ISubscription;
  private subscriptionContentCreator: ISubscription;
  private subscriptionCategoryC: ISubscription;
  private subscriptionRecordListC: ISubscription;

  private sharedConfig: Ng4FilesConfig = {
    acceptExtensions: ['jpg'],
    maxFilesCount: 1
  };

  constructor(
    private ng4FilesService: Ng4FilesService, private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public commonservice: CommonService,
    private router: Router,
    private toastr: ToastrService,
    private navservice: NavService,
    private translate: TranslateService,
    private el:ElementRef
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
    // this.subscriptionContentCreator.unsubscribe();
    // this.subscriptionCategoryC.unsubscribe();
    // this.subscriptionRecordListC.unsubscribe();
  }

  ngOnInit() {

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
    } else {
      this.languageId = 1;
    }

    this.commonservice.getModuleId();
    this.addconfig = false;
    let refCode = this.router.url.split('/')[3];
 
    this.mediatype = new FormControl();
    this.catType = new FormControl();
    this.mediaTitleEn = new FormControl();
    this.mediaTitleMy = new FormControl();
    this.mediaFileEn = new FormControl();
    this.mediaFileMy = new FormControl();
    this.active = new FormControl();
    this.mediaFileUploadEn = new FormControl();
    this.mediaFileUploadMy = new FormControl();

    this.mediaFileUpForm = new FormGroup({
      catType: this.catType,
      mediatype: this.mediatype,
      mediaTitleEn: this.mediaTitleEn,
      mediaTitleMy: this.mediaTitleMy,
      mediaFileEn: this.mediaFileEn,
      mediaFileMy: this.mediaFileMy,
      active: this.active,
      mediaFileUploadEn: this.mediaFileUploadEn,
      mediaFileUploadMy: this.mediaFileUploadMy,
    });
    this.fnLoadCateMediaType(refCode);
    if (refCode == "add") {
      this.isEdit = false;
      this.pageMode = 'common.add';
      this.showImgEn = false;
      this.showImgMy = false;
      // this.mediatype = new FormControl();
    } else {
      this.isEdit = true;
      this.pageMode = 'common.update'; 
      this.showImgEn = true;
      this.showImgMy = true;
      // this.getRow(refCode);  
      // this.mediatype = new FormControl({disabled: true});
    }
    
    this.filesResult = {
      en : {
        size :0,
        fileDimensions:""
      },
      my: {
        size :0,
        fileDimensions:""
      }
    }

    this.chkUploadFile = {
      allowedFormat : null,
      maxSize: null,
      minH: null,
      maxH: null,
      minW: null,
      maxW: null
    }

    // #### for disable non update user ---1
    if(!this.commonservice.isUpdate && this.commonservice.isWrite){
      this.mediaFileUpForm.enable();
    }else if(!this.commonservice.isUpdate){
      this.mediaFileUpForm.disable();
    }

  }

  back() {
    this.router.navigate(['media/upload']);
  }
  

  fnLoadCateMediaType(refData) {
    // Get MediaType
      this.loading = true;
    this.commonservice.readProtected('mediatype','','','', this.languageId)
      .subscribe(resStateData => {
        this.commonservice.errorHandling(resStateData, (function () {
          this.objMediaType = resStateData['mediaTypes'];          
        }).bind(this));    
        this.loading = false;    
      },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });
         
    // Get Categories // no need to load first
    this.commonservice.readProtected('content/category', '', '', '', this.languageId)
      .subscribe(resStateData => {
        this.commonservice.errorHandling(resStateData, (function () {
          this.AllobjCategory = resStateData['list'];
          if(this.router.url.split('/')[3] !== "add"){
            this.getRow(refData);
          }
        }).bind(this));
        this.loading = false;
      },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });
  }  

  getRow(row) {
    this.commonservice.readProtectedById('media/code/', row, this.languageId)
    .subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
          this.mediaFileUpData = Rdata;
          
          let data = this.mediaFileUpData['list'][0];
          let selCate = [];
          this.getData = data.list;
          this.filesResult.my.size = data.list[1].fileSize;
          this.filesResult.en.size = data.list[0].fileSize;
          
          this.selectedFilesEn = data.list[0].mediaFile;
          this.mediaFileUpForm.controls.mediaFileEn.setValue(this.selectedFilesEn);

          this.filesResult.my.fileDimensions = data.list[1].fileDimensions; 
          this.filesResult.en.fileDimensions = data.list[0].fileDimensions;
          this.selectedFilesMy = data.list[1].mediaFile;
          this.mediaFileUpForm.controls.mediaFileEn.setValue(this.selectedFilesEn);
          // populate data
          if (data) {
            // this.mediaTypeId = data.mediaTypeId;
            for (let itm of data.list[0].mediaCategories) {
              
              selCate.push(itm.categoryId);
            }

            let resMT = this.objMediaType.filter(fmt => fmt.mediaTypeId===data.list[0].mediaTypeId);

            if(resMT[0].mediaTypeName === "Images"){
              this.mediaPath = "images";
            }else if(resMT[0].mediaTypeName === "Documents"){
              this.mediaPath = "documents";
            }else if(resMT[0].mediaTypeName === "Videos"){
              this.mediaPath = "videos";
            }else if(resMT[0].mediaTypeName === "Audios"){
              this.mediaPath = "audios";
            }
            this.objCategory = resMT[0].mediaTypeCategories;
            this.showMediaTypeName = resMT[0].mediaTypeName;
            this.mediaFileUpForm.get('mediatype').setValue(data.list[0].mediaTypeId);
            this.mediaFileUpForm.get('catType').setValue(data.list[0].mediaCategories[0].categoryId);
            // this.mediaFileUpForm.get('filetype').setValue(data[0].supportedFileExtensions.split(','));
            this.mediaFileUpForm.get('mediaTitleEn').setValue(data.list[0].mediaTitle);
            this.mediaFileUpForm.get('mediaFileEn').setValue(data.list[0].mediaFile);
            this.mediaFileUpForm.get('mediaTitleMy').setValue(data.list[1].mediaTitle); // data.list[0]
            this.mediaFileUpForm.get('mediaFileMy').setValue(data.list[1].mediaFile); // data.list[0]
            this.mediaFileUpForm.get('active').setValue(data.enabled);
            this.checkReqValues();
          }
        }).bind(this));
        this.checkFileSize();
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');          
      });
    
  }

  selMediaType(event){
    let resMT = this.objMediaType.filter(fmt => fmt.mediaTypeId === this.mediaFileUpForm.controls.mediatype.value);
    this.objCategory = resMT[0].mediaCategories;
      console.log(this.objCategory)
    if(resMT[0].mediaTypeName === "Images"){
      this.mediaPath = "images";
    }else if(resMT[0].mediaTypeName === "Documents"){
      this.mediaPath = "documents";
    }else if(resMT[0].mediaTypeName === "Videos"){
      this.mediaPath = "videos";
    }else if(resMT[0].mediaTypeName === "Audios"){
      this.mediaPath = "audios";
    }
    
    this.checkReqValues();
  }
  selCateType(event) {   
      this.checkFileSize();
      this.checkReqValues();
      this.selFilesMy = [];
      this.selFilesEn = [];
  }
  myFunction() {
    this.mediaFileUpForm.reset();
    this.selectedFilesEn ="";
    this.selectedFilesMy ="";
    this.checkReqValues();   
  }
  checkReqValues() {
    let mediatype = "mediatype";
    let catType = "catType";
    let mediaTitleEn = "mediaTitleEn";
    let mediaFileEn = "mediaFileEn";
    let mediaTitleMy = "mediaTitleMy";
    let mediaFileMy = "mediaFileMy";
    let mediaFileUploadEn = "mediaFileUploadEn";
    let mediaFileUploadMy = "mediaFileUploadMy";

    let reqVal: any = [mediatype, catType, mediaTitleEn, mediaFileEn, mediaTitleMy, mediaFileMy];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.mediaFileUpForm.get(reqData);

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

  checkFileSize(){
    // kb=*1024 mb=*1048576
    let resMT = this.objMediaType.filter(fmt => fmt.mediaTypeId===this.mediaFileUpForm.controls.mediatype.value);
    let fileConfig = resMT[0].mediaTypeCategories.filter(fDcon => 
      fDcon.category.categoryId === this.mediaFileUpForm.controls.catType.value
    );

    let maxFileSize;
    if(fileConfig.length > 0){
      if(fileConfig[0].fileThresholdSizeUnits === "KB"){
        maxFileSize = fileConfig[0].fileThresholdSize * 1024
      }else if(fileConfig[0].fileThresholdSizeUnits === "MB"){
        maxFileSize = fileConfig[0].fileThresholdSize * 1048576
      }
      this.chkUploadFile.maxSize =  maxFileSize;
      let filextnLCase = fileConfig[0].fileExtensions.toLowerCase();
   
      this.chkUploadFile.allowedFormat = fileConfig[0].fileExtensions;
      this.chkUploadFile.minH = fileConfig[0].minH;
      this.chkUploadFile.maxH = fileConfig[0].maxH;
      this.chkUploadFile.minW = fileConfig[0].minW;
      this.chkUploadFile.maxW = fileConfig[0].maxW;
      this.sharedConfig.acceptExtensions =  filextnLCase.split(',');   
      this.sharedConfig.maxFileSize = maxFileSize;
      this.resFileExtn = filextnLCase.split(',');
    }else{
      this.toastr.error('Can not find Category under "' + resMT[0].mediaTypeName + '" Media Type');
    }
   
    // if(!this.addconfig){
    //   this.ng4FilesService.addConfig(this.sharedConfig); 
    //   this.addconfig = true;
    // } else{
    //   // this.ng4FilesService.configs.shared.acceptExtensions = this.sharedConfig.acceptExtensions;
    // }
  }
 
  //dev server path: opt/media
  filesSelectMy(selectedFiles: Ng4FilesSelected, lan): void {
    this.el.nativeElement.offsetHeight;
    this.el.nativeElement.offsetWidth;
    let mFileSize = this.chkUploadFile.maxSize;
    let fileExtn = selectedFiles.files[0].name.split('.')[1];
      let chkFileExtn = this.resFileExtn.filter(fData => fData === fileExtn.toLowerCase());
    if (selectedFiles.status === Ng4FilesStatus.STATUS_SUCCESS) {      
      if (selectedFiles.files.length > 0 && mFileSize) {
        if (selectedFiles.files[0].size <= mFileSize) {
          // Check File extn
          if (chkFileExtn.length > 0){
            this.filesResult.my.size = selectedFiles.files[0].size;
            this.selectedFilesMy = selectedFiles.files[0].name; 
            this.mediaFileUpForm.controls.mediaFileMy.setValue(this.selectedFilesMy);
            
            this.selFilesMy = [];
            this.selFilesMy.push(selectedFiles);
            this.checkReqValues();            
            this.showImgMy = false;
           } else{
            this.toastr.error('File Extension not match');
           }          
        }else{
          this.toastr.error('File Size Exceed maximum file size');
        }         
      }
    }else if(selectedFiles.status === Ng4FilesStatus.STATUS_MAX_FILES_COUNT_EXCEED){
      this.toastr.error('Maximum files count exceed.Please upload one file');
    }else if(selectedFiles.status === Ng4FilesStatus.STATUS_MAX_FILE_SIZE_EXCEED){
      this.toastr.error('Maximum files size exceed');
    }else if(selectedFiles.status === Ng4FilesStatus.STATUS_NOT_MATCH_EXTENSIONS){
      this.toastr.error('File Extension not match');
    }

    var fileReader = new FileReader();
    var image = new Image();
    var images = [];
    fileReader.onload = function (event) {
      // var uri = event.target.result;
                    image.src;
                    image.onload = function(k){
                        
                    };
    }


  }

  filesSelectEn(selectedFiles: Ng4FilesSelected, lan): void {    

    
    let mFileSize = this.chkUploadFile.maxSize;
    
    let fileExtn = selectedFiles.files[0].name.split('.')[1];
    let chkFileExtn = this.resFileExtn.filter(fData => fData === fileExtn.toLowerCase());
    // console.log(selectedFiles);
    // console.log(fileExtn);

    if (selectedFiles.status === Ng4FilesStatus.STATUS_SUCCESS) {      
      if (selectedFiles.files.length > 0 && mFileSize) {        
        if (selectedFiles.files[0].size <= mFileSize) {
          // Check File extn  
          if (chkFileExtn.length > 0){
            this.filesResult.en.size = selectedFiles.files[0].size;
            this.selectedFilesEn = selectedFiles.files[0].name;
            this.mediaFileUpForm.controls.mediaFileEn.setValue(this.selectedFilesEn);
            
            this.selFilesEn = [];
            this.selFilesEn.push(selectedFiles);
            this.checkReqValues();
            this.showImgEn = false;
           }else {
            this.toastr.error('File Extension not match');
           }    
        }else{
          this.toastr.error('File Size Exceed maximum file size');
        }
      }      
    }else if(selectedFiles.status === Ng4FilesStatus.STATUS_MAX_FILES_COUNT_EXCEED){
      this.toastr.error('Maximum files count exceed.Please upload one file');
    }else if(selectedFiles.status === Ng4FilesStatus.STATUS_MAX_FILE_SIZE_EXCEED){
      this.toastr.error('Maximum files size exceed');
    }else if(selectedFiles.status === Ng4FilesStatus.STATUS_NOT_MATCH_EXTENSIONS){
      this.toastr.error('File Extension not match');
    }
    
  }

  updateMediaFileUpload(formValues: any) {
    let mediaCate = [], mediaCateEn :any, mediaCateMy:any, rootary: any,rootCatIdEn, rootCatIdMy;
    let langEn = {
      "languageId": 1,
      "languageCode": "en",
      "languageName": "ENGLISH",
      "languageDescription": "English Language"
    }
    let langMs = {
      "languageId": 2,
      "languageCode": "ms",
      "languageName": "BAHASA MALAYSIA",
      "languageDescription": "Bahasa Malaysia"
    }
    mediaCate = [];
    mediaCate = this.AllobjCategory.filter(fdata => fdata.list[0].categoryId === formValues.catType);
    mediaCateEn = mediaCate[0].list.filter(fData => fData.language.languageId ===1);
    mediaCateMy = mediaCate[0].list.filter(fData => fData.language.languageId ===2);
    rootary = this.AllobjCategory.filter(fData => fData.list[0].categoryName ==="Media");
    rootCatIdEn = rootary[0].list.filter(fData => fData.language.languageId ===1);
    rootCatIdMy = rootary[0].list.filter(fData => fData.language.languageId ===2);

    if (this.isEdit) { // Update PUT request
     
      // for (var selCate of formValues.catType) {
      //   let filtrData = this.objCategory.filter(fdata => fdata.list[0].categoryId === selCate);
      //   mediaCate.push(filtrData);
      // }
      this.loading = true;
      let body = [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        {
          "mediaId": null,
          "rootCategoryId": null,
          "language": {
            "languageId": null,
            "languageCode": null,
            "languageName": null,
            "languageDescription": null
          },
          "mediaTypeId": null,
          "mediaTitle": null,
          "mediaFile": null,
          "fileSize": null,
          "fileSizeUnits": null,
          "fileDimensions": null,
          "enabled": null,
          "mediaCodeRunningNo": null,
          "mediaCategories": [{
            "categoryId": null,
            "categoryName": null,		
            "categoryDescription": null,
            "parentId": null,
            "language": {
              "languageId": null,
              "languageCode": null,
              "languageName": null,
              "languageDescription": null
            }
          }]
        }, {
          "mediaId": null,
          "rootCategoryId": null,
          "language": {
            "languageId": null,
            "languageCode": null,
            "languageName": null,
            "languageDescription": null
          },
          "mediaTypeId": null,
          "mediaTitle": null,
          "mediaFile": null,
          "fileSize": null,
          "fileSizeUnits": null,
          "fileDimensions": null,
          "enabled": null,
          "mediaCodeRunningNo": null,
          "mediaCategories": [{
            "categoryId": null,
            "categoryName": null,		
            "categoryDescription": null,
            "parentId": null,
            "language": {
              "languageId": null,
              "languageCode": null,
              "languageName": null,
              "languageDescription": null
            }
          }]
        }
      ];

      body[0].mediaId = this.getData[0].mediaId;// have to set form get data
      body[0].mediaTypeId = formValues.mediatype;
      body[0].rootCategoryId = rootCatIdEn[0].categoryId;
      body[0].mediaTitle = formValues.mediaTitleEn;
      body[0].mediaFile = this.selectedFilesEn;
      body[0].fileSize = this.filesResult.en.size;
      body[0].fileSizeUnits = "Byte";
      body[0].fileDimensions = "200*300";
      body[0].enabled = true;
      body[0].mediaCodeRunningNo = this.getData[0].mediaCodeRunningNo;
      body[0].language.languageId = 1;
      body[0].language.languageCode = "en";
      body[0].language.languageName = "ENGLISH";
      body[0].language.languageDescription = "English language";
      // body[0].mediaCategories = mediaCate[0][0].list.filter(fData => fData.language.languageId ===1);   
      body[0].mediaCategories[0].categoryId = mediaCateEn[0].categoryId;
      body[0].mediaCategories[0].categoryName = mediaCateEn[0].categoryName;
      body[0].mediaCategories[0].categoryDescription = mediaCateEn[0].categoryDescription;
      body[0].mediaCategories[0].parentId = mediaCateEn[0].parentId;
      body[0].mediaCategories[0].language = langEn;

      body[1].mediaId = this.getData[1].mediaId;// have to set form get data
      body[1].mediaTypeId = formValues.mediatype;
      body[1].rootCategoryId = rootCatIdMy[0].categoryId;
      body[1].mediaTitle = formValues.mediaTitleMy;
      body[1].mediaFile = this.selectedFilesMy;
      body[1].fileSize = this.filesResult.my.size;
      body[1].fileSizeUnits = "Byte";
      body[1].fileDimensions = "200*300";
      body[1].enabled = true;
      body[1].mediaCodeRunningNo = this.getData[1].mediaCodeRunningNo;
      body[1].language.languageId = 2;
      body[1].language.languageCode = "ms";
      body[1].language.languageName = "BAHASA MALAYSIA";
      body[1].language.languageDescription = "Bahasa Malaysia";
      // body[1].mediaCategories = mediaCate[0][0].list.filter(fData => fData.language.languageId === 2); 
      body[1].mediaCategories[0].categoryId = mediaCateMy[0].categoryId;
      body[1].mediaCategories[0].categoryName = mediaCateMy[0].categoryName;
      body[1].mediaCategories[0].categoryDescription = mediaCateMy[0].categoryDescription;
      body[1].mediaCategories[0].parentId = mediaCateMy[0].parentId;
      body[1].mediaCategories[0].language = langMs;
 
      
      // Update Media file upload Service
      let formData: FormData = new FormData();
      for (let file of this.selFilesEn) {
        formData.append('mediaFiles', file.files[0], file.files[0].name);
      }
      for (let file of this.selFilesMy) {
        formData.append('mediaFiles', file.files[0], file.files[0].name);
      }
      formData.append('strMedias', JSON.stringify(body));
      this.commonservice.update(formData, 'media').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.updated'), '');
            this.router.navigate(['media/upload']);
          }).bind(this));
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
        });

    } else { // Add Post Request

      
      // for (var selCate of formValues.catType) {
      //   let filtrData = this.objCategory.filter(fdata => fdata.list[0].categoryId === selCate);
      //   mediaCate.push(filtrData);
      // }
      this.loading = true;
      let body = [
        {          
          "rootCategoryId": null,
          "language": {
            "languageId": null,
            "languageCode": null,
            "languageName": null,
            "languageDescription":null
          },
          "mediaTypeId": null,
          "mediaTitle": null,
          "mediaFile": null,
          "fileSize": null,
          "fileSizeUnits": null,
          "fileDimensions": null,
          "enabled": null,
          "mediaCategories": [{
            "categoryId": null,
            "categoryName": null,		
            "categoryDescription": null,
            "parentId": null,
            "language": {
              "languageId": null,
              "languageCode": null,
              "languageName": null,
              "languageDescription": null
            }
          }]
        }, {
          "rootCategoryId": null,
          "language": {
            "languageId": null,
            "languageCode": null,
            "languageName": null,
            "languageDescription": null
          },
          "mediaTypeId": null,
          "mediaTitle": null,
          "mediaFile": null,
          "fileSize": null,
          "fileSizeUnits": null,
          "fileDimensions": null,
          "enabled": null,
          "mediaCategories": [{
            "categoryId": null,
            "categoryName": null,		
            "categoryDescription": null,
            "parentId": null,
            "language": {
              "languageId": null,
              "languageCode": null,
              "languageName": null,
              "languageDescription": null
            }
          }]
        }
      ];

      body[0].mediaTypeId = formValues.mediatype;
      body[0].rootCategoryId = rootCatIdEn[0].categoryId;;
      body[0].mediaTitle = formValues.mediaTitleEn;
      body[0].mediaFile = this.selectedFilesEn;
      body[0].fileSize = this.filesResult.en.size;
      body[0].fileSizeUnits = "Byte";
      body[0].fileDimensions = "200*300";
      body[0].enabled = true;
      body[0].language.languageId = 1;
      body[0].language.languageCode = "en";
      body[0].language.languageName = "ENGLISH";
      body[0].language.languageDescription = "English language";  
      body[0].mediaCategories[0].categoryId = mediaCateEn[0].categoryId;
      body[0].mediaCategories[0].categoryName = mediaCateEn[0].categoryName;
      body[0].mediaCategories[0].categoryDescription = mediaCateEn[0].categoryDescription;
      body[0].mediaCategories[0].parentId = mediaCateEn[0].parentId;
      body[0].mediaCategories[0].language = langEn;  

      body[1].mediaTypeId = formValues.mediatype;
      body[1].rootCategoryId = rootCatIdMy[0].categoryId;;
      body[1].mediaTitle = formValues.mediaTitleMy;
      body[1].mediaFile = this.selectedFilesMy;
      body[1].fileSize = this.filesResult.my.size;
      body[1].fileSizeUnits = "Byte";
      body[1].fileDimensions = "200*300";
      body[1].enabled = true;
      body[1].language.languageId = 2;
      body[1].language.languageCode = "ms";
      body[1].language.languageName = "BAHASA MALAYSIA";
      body[1].language.languageDescription = "Bahasa Malaysia";
      body[1].mediaCategories[0].categoryId = mediaCateMy[0].categoryId;
      body[1].mediaCategories[0].categoryName = mediaCateMy[0].categoryName;
      body[1].mediaCategories[0].categoryDescription = mediaCateMy[0].categoryDescription;
      body[1].mediaCategories[0].parentId = mediaCateMy[0].parentId;
      body[1].mediaCategories[0].language = langMs;
 
      
      // Add Media file upload Service
      let formData: FormData = new FormData();
      for (let file of this.selFilesEn) {
        formData.append('mediaFiles', file.files[0], file.files[0].name);
      }
      for (let file of this.selFilesMy) {
        formData.append('mediaFiles', file.files[0], file.files[0].name);
      }
      formData.append('strMedias', JSON.stringify(body));

      console.log(formData);
      
      this.commonservice.create(formData,'media').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success(this.translate.instant('common.success.added'), '');
            this.router.navigate(['media/upload']);
          }).bind(this));
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
        });
    }
  }

}

