import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Headers, RequestOptions } from '@angular/http';
import { debug } from 'util';
import {
  Ng4FilesService,
  Ng4FilesConfig,
  Ng4FilesStatus,
  Ng4FilesSelected
} from '../../ng4-files';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-mediafileupload',
  templateUrl: './mediafileupload.component.html',
  styleUrls: ['./mediafileupload.component.css']
})
export class MediafileuploadComponent implements OnInit {

  // objCategory = ["Slider","Article","Gallery"];
  // objMediaType = ["Images","Documents","Videos","Audios"];
  objMediaType: object;
  objCategory;
  mediaFileUpForm: FormGroup;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;
  selFiles = [];
  getData = [];

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
  // formdata: FileList;
  clientId;
  networkContract: any;

  private sharedConfig: Ng4FilesConfig = {
    acceptExtensions: ['jpg'],
    maxFilesCount: 5
  };

  private namedConfig: Ng4FilesConfig = {
    acceptExtensions: ['js', 'doc', 'mp4'],
    maxFilesCount: 5,
    maxFileSize: 512000,
    totalFilesSize: 1012000
  };

  constructor(
    private ng4FilesService: Ng4FilesService, private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private commonservice: CommonService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.ng4FilesService.addConfig(this.sharedConfig);
    // this.ng4FilesService.addConfig(this.namedConfig, 'another-config');

    let refCode = this.router.url.split('/')[2];
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
    this.fnLoadCateMediaType();

    if (refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }

  }

  back() {
    this.router.navigate(['media']);
  }

  fnLoadCateMediaType() {
    // Get MediaType
    this.commonservice.getMediaType()
      .subscribe(resStateData => {
        this.commonservice.errorHandling(resStateData, (function () {
          this.objMediaType = resStateData['mediaTypes'];
        }).bind(this));
      },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
        });
    // Get Categories
    this.commonservice.getCategoryData()
      // this.http.get('./app/apidata/category.json')
      .subscribe(resStateData => {
        this.commonservice.errorHandling(resStateData, (function () {
          this.objCategory = resStateData['list'];
        }).bind(this));
      },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
        });
  }

  getRow(row) {
    return this.http.get(this.appConfig.urlMediaFileUpload + '/code/' + row).subscribe(
      Rdata => {
        this.commonservice.errorHandling(Rdata, (function(){
          this.mediaFileUpData = Rdata;
          console.log(this.mediaFileUpData);
          let data = this.mediaFileUpData['list'][0];
          let selCate = [];
          this.getData = data.list;
          // populate data
          if (data) {
            // this.mediaTypeId = data.mediaTypeId;
            for (let itm of data.list[0].mediaCategories) {
              console.log(itm.categoryId);
              selCate.push(itm.categoryId);
            }
            //   for (let itm of data.list[0].mediaCategories) {
            //     console.log(itm.categoryName);
            //     selCate.push(itm.categoryName);
            // }
            this.mediaFileUpForm.get('mediatype').setValue(data.list[0].mediaTypeId);
            this.mediaFileUpForm.get('catType').setValue(selCate);
            // this.mediaFileUpForm.get('filetype').setValue(data[0].supportedFileExtensions.split(','));
            this.mediaFileUpForm.get('mediaTitleEn').setValue(data.list[0].mediaTitle);
            this.mediaFileUpForm.get('mediaFileEn').setValue(data.list[0].mediaFile);
            this.mediaFileUpForm.get('mediaTitleMy').setValue(data.list[0].mediaTitle); // data.list[0]
            this.mediaFileUpForm.get('mediaFileMy').setValue(data.list[0].mediaFile); // data.list[0]
            this.mediaFileUpForm.get('active').setValue(data.enabled);
            this.checkReqValues();
          }
        }).bind(this));
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');          
      });
    
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
 
  //dev server path: opt/media
  filesSelectMy(selectedFiles: Ng4FilesSelected, lan): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      let name = selectedFiles.files[0].name;
      let fileList = selectedFiles.files;
      if (selectedFiles.files.length > 0) {
        let file: File = fileList[0];
        let fileSize: number = fileList[0].size;
        if (fileSize <= 10485760) {
          let formData: FormData = new FormData();
          formData.append(selectedFiles.files[0].name, selectedFiles.files[0], selectedFiles.files[0].name);
          console.log(formData);
        }
      }
      

      this.selectedFilesMy = selectedFiles.files[0].name;
      if(!this.isEdit){
        this.mediaFileUpForm.controls.mediaFileMy.setValue(this.selectedFilesMy);
      }
      console.log(this.selectedFilesMy);
      this.selFiles.push(selectedFiles);
    }
  }
  filesSelectEn(selectedFiles: Ng4FilesSelected, lan): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      let name = selectedFiles.files[0].name;
      let fileList = selectedFiles.files;
      if (selectedFiles.files.length > 0) {
        let file: File = fileList[0];
        let fileSize: number = fileList[0].size;
        if (fileSize <= 10485760) {
          let formData: FormData = new FormData();
          formData.append(selectedFiles.files[0].name, selectedFiles.files[0], selectedFiles.files[0].name);
          console.log(formData);
        }
      }
      
      this.selectedFilesEn = selectedFiles.files[0].name;
      if(!this.isEdit){
        this.mediaFileUpForm.controls.mediaFileEn.setValue(this.selectedFilesEn);
      }
      console.log(this.selectedFilesEn);
      this.selFiles.push(selectedFiles);
    }
  }

  updateMediaFileUpload(formValues: any) {
    let mediaCate = [];
    if (this.isEdit) {
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
      let ObjCate = {
        "categoryId": null,
        "categoryName": null,
        "categoryDescription": null,
        "parentId": null,
        "language": null
      }
      for (var selCate of formValues.catType) {
        let filtrData = this.objCategory.filter(fdata => fdata.list[0].categoryId === selCate);
        // ObjCate.categoryId = filtrData[0].categoryId;
        // ObjCate.categoryName = filtrData[0].categoryName;
        // ObjCate.categoryDescription = filtrData[0].categoryDescription;
        // ObjCate.parentId = filtrData[0].parentId? filtrData[0].parentId : 0;
        // ObjCate.language = langEn;
        mediaCate.push(filtrData);
      }

      let body = [
        {
          "mediaId": 0,
          "rootCategoryId": 1,
          "language": {
            "languageId": null,
            "languageCode": null,
            "languageName": null,
            "languageDescription": "English language"
          },
          "mediaTypeId": 508,
          "mediaTitle": "MIBISQuery",
          "mediaFile": "mibis-query.png",
          "fileSize": 4,
          "fileSizeUnits": "MB",
          "fileDimensions": "200*500",
          "enabled": true,
          "mediaCodeRunningNo": 40,
          "mediaCategories": mediaCate
        }, {
          "mediaId": 0,
          "rootCategoryId": 1,
          "language": {
            "languageId": null,
            "languageCode": null,
            "languageName": null,
            "languageDescription": null
          },
          "mediaTypeId": 508,
          "mediaTitle": "MIBISQuery",
          "mediaFile": "mibis-query.png",
          "fileSize": 4,
          "fileSizeUnits": "MB",
          "fileDimensions": "200*500",
          "enabled": true,
          "mediaCodeRunningNo": 40,
          "mediaCategories": mediaCate
        }
      ];

      body[0].mediaId = this.getData[0].mediaId;// have to set form get data
      body[0].mediaTypeId = formValues.mediaTypeId;
      body[0].rootCategoryId = 1;
      body[0].mediaTitle = formValues.mediaTitleEn;
      body[0].mediaFile = this.selectedFilesEn;
      body[0].fileSize = this.selectedFilesEn;
      body[0].fileSizeUnits = this.selectedFilesEn;
      body[0].fileDimensions = this.selectedFilesEn;
      body[0].enabled = formValues.active;
      body[0].mediaCodeRunningNo = this.getData[0].mediaCodeRunningNo;
      body[0].language.languageId = 1;
      body[0].language.languageCode = "en";
      body[0].language.languageName = "ENGLISH";
      body[0].language.languageDescription = "English language";
      // body[0].mediaCategories[0].language.languageId = 1;
      // body[0].mediaCategories[0].language.languageCode = "en";
      // body[0].mediaCategories[0].language.languageName = "ENGLISH";
      // body[0].mediaCategories[0].language.languageDescription = "English language";

      body[1].mediaId = this.getData[0].mediaId;// have to set form get data
      body[1].mediaTypeId = formValues.mediaTypeId;
      body[1].rootCategoryId = 1;
      body[1].mediaTitle = formValues.mediaTitleMy;
      body[1].mediaFile = this.selectedFilesMy;
      body[1].fileSize = this.selectedFilesMy;
      body[1].fileSizeUnits = this.selectedFilesMy;
      body[1].fileDimensions = this.selectedFilesMy;
      body[1].enabled = formValues.active;
      body[1].mediaCodeRunningNo = this.getData[0].mediaCodeRunningNo;
      body[1].language.languageId = 2;
      body[1].language.languageCode = "ms";
      body[1].language.languageName = "BAHASA MALAYSIA";
      body[1].language.languageDescription = "Bahasa Malaysia";
      // body[1].mediaCategories[0].language.languageId = 2;
      // body[1].mediaCategories[0].language.languageCode = "ms";
      // body[1].mediaCategories[0].language.languageName = "BAHASA MALAYSIA";
      // body[1].mediaCategories[0].language.languageDescription = "Bahasa Malaysia";

      console.log(body);
      // Update Media file upload Service
      debugger;
      let formData: FormData = new FormData();
      for (let file of this.selFiles) {
        formData.append('mediaFiles', file.files[0], file.files[0].name);
      }
      formData.append('strMedias', JSON.stringify(body));
      this.commonservice.addMediaFileUpload(formData).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function () {
            this.toastr.success('Media Type Updated successfully!', '');
            this.router.navigate(['mediatype']);
          }).bind(this));
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
        });

    } else {


    }
  }

}

