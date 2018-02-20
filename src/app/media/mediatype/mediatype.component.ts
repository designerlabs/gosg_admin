import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  objCategory = ["Slider","Article","Gallery"];
  objMediaType = ["Images","Documents","Videos","Audios"];
  objFileExtn = [];
  mediaTypeData: Object;
  mediaTypeForm: FormGroup;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;

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

  reqVal=[];
  imgreqVal=[];
  docreqVal=[];
  audioreqVal=[];
  videoreqVal=[];

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
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
      
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
      // this.mediaTypeForm.get('imgchkactive').setValue(false);     
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }
  }//10.1.22.50:8080/mediatype


  back(){
    this.router.navigate(['media/type']);
  }

  // get, add, update, delete
  getRow(row) {
    // return this.http.get(this.appConfig.urlMediaType + '/id/' + row).subscribe(
    return this.http.get('http://10.1.22.50:8080/mediatype/id/' + row).subscribe(
      Rdata => {
        debugger;
        this.mediaTypeData = Rdata;
        console.log(this.mediaTypeData);
        let data = this.mediaTypeData['mediaType'];

      // populate data
      if(data){
        // this.mediaTypeId = data.mediaTypeId;
        if(data.mediaTypeName === "Images"){
          this.mediaTypeForm.get('imgchkactive').setValue(true);
          this.mediaTypeForm.get('imgfiletype').setValue(data.supportedFileExtensions.split(','));
          this.mediaTypeForm.get('imgfilesize').setValue(data.supportedFileExtensions.split(','));
          this.mediaTypeForm.get('imgfileunit').setValue(data.maxFileSize);
          this.mediaTypeForm.get('imgminwidth').setValue(data.maxFileSizeUnits);
          this.mediaTypeForm.get('imgmaxwidth').setValue(data.maxFileSizeUnits);
          this.mediaTypeForm.get('imgminheigth').setValue(data.maxFileSizeUnits);
          this.mediaTypeForm.get('imgmaxheigth').setValue(data.maxFileSizeUnits);
        }        
        this.checkReqValues();
      }
    });    
  }

  selMediaType(event){
    if(event.value == "Images"){
      this.objFileExtn = this.objImage;
      }else if(event.value == "Documents"){
        this.objFileExtn = this.objDoc;
      }else if(event.value == "Videos"){
        this.objFileExtn = this.objVideo;
      }else if(event.value == "Audios"){
        this.objFileExtn = this.objAudio;
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
    if(this.isEdit) {
    let body = [
      {
        "mediaTypeName": null,
        "supportedFileExtensions": null,
        "mediaTypeCategories": [{
          "category": {
              "categoryId": 2,
              "categoryName": "Gallery",
              "categoryDescription": "Gallery Category",
              "parentId": 1,
              "languageId": 1,
              "contents": null
          },
          "minH": 200,
          "minW": 300,
          "maxH": 500,
          "maxW": 600,
          "fileThresholdSize": 5,
          "fileThresholdSizeUnits": "MB"
      }],
      "enabled": true
      }
    ];

    // body[0].mediaTypeId = this.mediaTypeId;
    body[0].mediaTypeName = formValues.mediatype;
    body[0].supportedFileExtensions = formValues.filetype.toString();
    body[0].mediaTypeCategories[0].category.categoryId = 12;
    body[0].mediaTypeCategories[0].category.categoryName = formValues.catType;    
    body[0].mediaTypeCategories[0].category.categoryDescription = '';
    body[0].mediaTypeCategories[0].category.parentId = 2;
    body[0].mediaTypeCategories[0].category.languageId = 1;
    body[0].mediaTypeCategories[0].category.contents = '';

    body[0].mediaTypeCategories[0].minH = formValues.minheigth;
    body[0].mediaTypeCategories[0].minW = formValues.minwidth;
    body[0].mediaTypeCategories[0].maxH = formValues.maxheigth;
    body[0].mediaTypeCategories[0].maxW = formValues.maxwidth;
    body[0].mediaTypeCategories[0].fileThresholdSize = formValues.filesize;
    body[0].mediaTypeCategories[0].fileThresholdSizeUnits = formValues.fileunit;

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
  
      body[0].mediaType = formValues.imgmediatype;
      body[0].supportedFileExtensions = formValues.imgfiletype.toString();
      body[0].maxFileSize = formValues.imgfilesize;
      body[0].maxFileSizeUnits = formValues.imgfileunit;
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
