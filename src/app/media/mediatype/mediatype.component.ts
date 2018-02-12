import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mediatype',
  templateUrl: './mediatype.component.html',
  styleUrls: ['./mediatype.component.css']
})
export class MediatypeComponent implements OnInit {

  objImage = ["jpg","jpeg","png","gif","tiff","bmp"];
  objAudio = ["MP3","WAV"];
  objVideo = ["AVI","FLV","WMV","MOV","MP4"];
  objDoc = ["doc","docx","pdf","xls","xlsx","txt"];
  objUnit = ["MB","KB"];
  objFileExtn = [];
  mediaTypeData: Object;
  mediaTypeForm: FormGroup;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;

  mediaTypeId: any;
  mediatype: FormControl;
  filesize: FormControl;
  filetype: FormControl; 
  fileunit: FormControl;
  active: FormControl;
 
  resetMsg = this.resetMsg;

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // this.isEdit = false;
    // this.changePageMode(this.isEdit); 

    let refCode = this.router.url.split('/')[2];

    this.mediatype = new FormControl();
    this.filesize = new FormControl();
    this.filetype = new FormControl();
    this.fileunit = new FormControl();
    this.active = new FormControl();

    this.mediaTypeForm = new FormGroup({
      mediatype: this.mediatype,
      filetype: this.filetype,
      filesize: this.filesize,
      fileunit: this.fileunit,
      active: this.active
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
      this.mediaTypeForm.get('active').setValue(true);
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }
  }

  back(){
    this.router.navigate(['mediatype']);
  }

  // get, add, update, delete
  getRow(row) {

    return this.http.get(this.appConfig.urlMediaType + '/id/' + row).subscribe(
      Rdata => {
        this.mediaTypeData = Rdata;
        console.log(this.mediaTypeData);
        let data = this.mediaTypeData['mediaType'];

      // populate file extensions list
      if(data.mediaType === "Image") {
        this.objFileExtn = this.objImage;
      } else if(data.mediaType === "Video"){
        this.objFileExtn = this.objVideo;
      } else if(data.mediaType === "Audio"){
        this.objFileExtn = this.objAudio;
      } else if(data.mediaType === "Document"){
        this.objFileExtn = this.objDoc;
      }

      // populate data
      this.mediaTypeId = data.mediaTypeId;
      this.mediaTypeForm.get('mediatype').setValue(data.mediaType);
      this.mediaTypeForm.get('filetype').setValue(data.supportedFileExtensions.split(','));// supposed to loop
      this.mediaTypeForm.get('filesize').setValue(data.maxFileSize);
      this.mediaTypeForm.get('fileunit').setValue(data.maxFileSizeUnits);
      this.mediaTypeForm.get('active').setValue(data.enabled);
      this.checkReqValues();
    });    
  }


  checkReqValues() {
    let mediatype = "mediatype";
    let filetype = "filetype";
    let filesize = "filesize";
    let fileunit = "fileunit";
    // let active = "active";

    let reqVal: any = [mediatype, filetype, filesize, fileunit];
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
    if(this.isEdit) {
    let body = [
      {
        "mediaTypeId": null,
        "mediaType": null,
        "supportedFileExtensions": null,
        "maxFileSize": null,
        "maxFileSizeUnits": null,
        "enabled": false
      }
    ];

    body[0].mediaTypeId = this.mediaTypeId;
    body[0].mediaType = formValues.mediatype;
    body[0].supportedFileExtensions = formValues.filetype.toString();
    body[0].maxFileSize = formValues.filesize;
    body[0].maxFileSizeUnits = formValues.fileunit;
    body[0].enabled = formValues.active;
    console.log(body);

    // Update Media Type Service
    this.commonservice.updateMediaType(body[0]).subscribe(
      data => {
        this.toastr.success('Media Type Updated successfully!', ''); 
        this.router.navigate(['mediatype']);
      },
      error => {
        console.log("No Data")
      });

    }else {
      let body = [
        {          
          "mediaType": null,
          "supportedFileExtensions": null,
          "maxFileSize": null,
          "maxFileSizeUnits": null,
          "enabled": false
        }
      ];
  
      body[0].mediaType = formValues.mediatype;
      body[0].supportedFileExtensions = formValues.filetype.toString();
      body[0].maxFileSize = formValues.filesize;
      body[0].maxFileSizeUnits = formValues.fileunit;
      body[0].enabled = formValues.active;
      console.log(body);
  
      // Add Media Type Service
      this.commonservice.addMediaType(body[0]).subscribe(
        data => {
          this.toastr.success('Media Type Added successfully!', ''); 
          this.router.navigate(['mediatype']);
        },
        error => {
          console.log("No Data")
        });

    } 

  }

  
  

}
