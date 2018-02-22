import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule , HttpClient, HttpHeaders } from '@angular/common/http';
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

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }

  }

  back(){
    this.router.navigate(['media']);
  }

  fnLoadCateMediaType(){
    // Get MediaType
    this.commonservice.getMediaType()
    .subscribe(resStateData => {
       this.objMediaType = resStateData['mediaTypes'];  
     },
     Error => {
     console.log('Error in Media Type');
    });
    // Get Categories
    this.commonservice.getCategoryData()
    // this.http.get('./app/apidata/category.json')
    .subscribe(resStateData => {
       this.objCategory = resStateData['list'];  
     },
     Error => {
     console.log('Error in Media Type');
    });
  }

   getRow(row) {    

    return this.http.get(this.appConfig.urlMediaFileUpload + '/code/' + row).subscribe(
    // return this.http.get('./app/apidata/race.json').subscribe(
      Rdata => {
        this.mediaFileUpData = Rdata;
        console.log(this.mediaFileUpData);
        let data = this.mediaFileUpData['list'][0];
        let selCate = [];
        this.getData = data.list;
      // populate data
      if(data){
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

  fileChange(event,lan) {
    let files = event;
        if (files.length > 0) {
        let formData: FormData = new FormData();
        for (let file of files) {
             formData.append('files', file, file.name);
        }
        let headers = new Headers();
        headers.set('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        this.http.post(this.appConfig.urlMediaFileUpload, formData)            
            .subscribe(
              Rdata => {
                // Consume Files
                // ..
                console.log('uploaded and processed files');
            });
    }    
}
// curl -i -X POST 'http://localhost:8080/media' \
// -H 'Content-type:multipart/form-data' \
// -F 'mediaFiles=@<image-name>;type=image/png' \
// -F 'mediaFiles=@<image-name>;type=image/png' \
// -F 'medias=@<json-file>;type=application/json'

// curl -i -X PUT 'http://localhost:8080/media' \
// -H 'Content-type:multipart/form-data' \
// -F 'mediaFiles=@mibis-query.png;type=image/png' \
// -F 'medias=@MediaUpdate.json;type=application/json'

// Content-Disposition: form-data; name="DownTimeNotice.JPG"; filename="DownTimeNotice.JPG"
// Content-Type: image/jpeg

//dev server path: opt/media
filesSelectMy(selectedFiles: Ng4FilesSelected, lan): void {
  if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
    let  name = selectedFiles.files[0].name;
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
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
     
          this.selectedFilesMy = selectedFiles.files[0].name;
          console.log(this.selectedFilesMy);
       this.selFiles.push(selectedFiles);
  }
}
  filesSelectEn(selectedFiles: Ng4FilesSelected, lan): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      // let headers = new Headers();
      // headers.append('Content-Type', 'multipart/form-data');

      // const headers = new HttpHeaders()
      //        .set('content-type', 'multipart/form-data');
             

      //    const body = {
      //        email: 'myemail@xyz.com',
      //        user_password: 'mypasss',
      //        token: 'my token'
      //    }
      //    const curl = 'curl -i -X PUT ' + this.appConfig.urlMediaFileUpload + '\ '
      //    + '-H Content-type:multipart/form-data \ '
      //    + '-F mediaFiles=@'+selectedFiles.files[0].name+';type=image/png \ '
      //    + '-F medias=@'+body+';type=application/json'

      let  name = selectedFiles.files[0].name;
      let fileList = selectedFiles.files;
      if (selectedFiles.files.length > 0) {
        let file: File = fileList[0];
        let fileSize: number = fileList[0].size;
        if (fileSize <= 10485760) {
          let formData: FormData = new FormData();
          // formData.append('Document', file);
          // formData.append('ClientId', this.clientId);
          // formData.append('DocumentType', 'ClientContractDoc');
          // let opts = new RequestOptions();
          // opts.headers = headers;
        

          formData.append(selectedFiles.files[0].name, selectedFiles.files[0], selectedFiles.files[0].name);
          console.log(formData);
          // this.http.post(this.appConfig.urlMediaFileUpload, curl)            
          //   .subscribe(
          //     Rdata => {
          //       // Consume Files
          //       // ..
          //       console.log('uploaded and processed files');
          //   });
           
          // this.http.post('http://10.1.70.148:8080/service-admin-protected/mediatype', formData)
          //   .map((response: Response) => response.json());
            
        }
      }
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');      
        this.selectedFilesEn = selectedFiles.files[0].name;
        console.log(this.selectedFilesEn);      
        this.selFiles.push(selectedFiles);
    }
    // return this.http.post(Upload , this.selectedFiles, { headers: headers, method: 'POST' })
    //         .map((res: Response) => res.json());

  }

  updateMediaFileUpload(formValues: any){
    let mediaCate = [];
    if(this.isEdit) {
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
        },{
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
  
      // let filtrData = this.getData[0].mediaTypeCategories.filter(
      //   fdata => fdata.category.categoryName === formValues.catType);   
      // let filtrootCatId = this.objCategory.filter(
      //   filtrdata => filtrdata.categoryName === 'Media'
      // );
  
      // body[0].mediaTypeId = this.mediaTypeId;
      body[0].mediaId = this.getData[0].mediaId;// have to set form get data
      body[0].mediaTypeId = formValues.mediaTypeId;
      body[0].rootCategoryId = 1;
      body[0].mediaTitle = formValues.mediaTitleEn;  
      body[0].mediaFile = this.selectedFilesEn;      
      body[0].fileSize = this.selectedFilesEn;
      body[0].fileSizeUnits =  this.selectedFilesEn;
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
      body[1].fileSizeUnits =  this.selectedFilesMy;
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
      formData.append('medias', JSON.stringify(body));

      // const headers = new HttpHeaders()
      //        .set('content-type', 'multipart/form-data');
      // let opts = new RequestOptions();
      //     opts.body = body;
      //     opts.params = formData;
      //     opts.method = "PUT";
      //     opts.url = this.appConfig.urlMediaFileUpload;
      
      // solution 1
      let headers = new Headers();
      // headers.set('content-type', 'multipart/form-data');     
      headers.append('Content-Type', 'application/json; charset=UTF-8'); 
      // headers.set('file', 'mediaFiles=@'+this.selFiles[0].files[0].name+';'+this.selFiles[0].files[0].type);
      // headers.set('file', 'medias=@<'+ JSON.stringify(body) +'>;type=application/json');

      let options = new RequestOptions({ headers: headers });      
      options.method = "PUT";
      options.body = formData;
      // options.search = body;
      let options1 = new RequestOptions; 
          
      // options.url = this.appConfig.urlMediaFileUpload;
      let url = `${this.appConfig.urlMediaFileUpload}/put`;
      let search = new URLSearchParams();
      

      
      this.http.put(this.appConfig.urlMediaFileUpload, formData)
          .map(res => res)
          .catch(error => Observable.throw(error))
          .subscribe(
          data => {
              // Consume Files
              // ..
              console.log('uploaded and processed files');
          },
          error => console.log(error),
          () => {
            console.log("No Data");
          });

      // this.addMediaFileUpload(body,opts).subscribe(
      //   data => {
      //     this.toastr.success('Media Type Updated successfully!', ''); 
      //     this.router.navigate(['mediatype']);
      //   },
      //   error => {
      //     console.log("No Data")
      //   });
  
      }else {


      }
  }
  addMediaFileUpload(mediaFile,opts) {
    return this.http.post(this.appConfig.urlMediaFileUpload, opts)
    .map((response: Response) => response.json());
  }
}

// solution 1 https://stackoverflow.com/questions/37174759/how-do-you-post-a-formdata-object-in-angular-2
// let formData: FormData = new FormData();
// for (let file of files) {
//       formData.append('files', file, file.name);
// }
// let headers = new Headers();
// headers.set('Accept', 'application/json');
// let options = new RequestOptions({ headers: headers });
// this.http.post(uploadURL, formData, options)
//     .map(res => res.json())
//     .catch(error => Observable.throw(error))
//     .subscribe(
//     data => {
//         // Consume Files
//         // ..
//         console.log('uploaded and processed files');
//     },
//     error => console.log(error),
//     () => {
//         this.sleep(1000).then(() =>
//             // .. Post Upload Delayed Action
//         )
//     });

// Solution 2 : https://stackoverflow.com/questions/46000608/angular-2-send-request-with-json-data-formdata
// let data = {id: 1, name: 'test'};
// let formData = new FormData();
// formData.append('fileData', file); //file from inputfile

// let headers = new Headers();
// headers.append('Accept', 'application/json');

// let options =  new RequestOptions({ headers: headers });
// options.method = 'POST';
// options.body = data; //data is my object

// options.body.append('file', formData); // May be will work
// //options.formData= formData; //formData is my FormData with file data to upload

// this.http.request(url, options);