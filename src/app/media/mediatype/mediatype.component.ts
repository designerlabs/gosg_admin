import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debug } from 'util';

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
  getData = [];
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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    debugger;
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
    return this.http.get(this.appConfig.urlMediaType + '/id/' + row).subscribe(
    // return this.http.get('./app/apidata/race.json').subscribe(
      Rdata => {
        // debugger;
        this.mediaTypeData = Rdata;
        console.log(this.mediaTypeData);
        let data = this.mediaTypeData['mediaType'];
        this.getData = data;
      // populate data
      if(data){
        // this.mediaTypeId = data.mediaTypeId;
        this.mediaTypeForm.get('mediatype').setValue(data[0].mediaTypeName);

        if(data[0].mediaTypeName == "Images"){
          this.objFileExtn = this.objImage;
          }else if(data[0].mediaTypeName == "Documents"){
            this.objFileExtn = this.objDoc;
          }else if(data[0].mediaTypeName == "Videos"){
            this.objFileExtn = this.objVideo;
          }else if(data[0].mediaTypeName == "Audios"){
            this.objFileExtn = this.objAudio;
          }          
          this.mediaTypeForm.get('catType').setValue(data[0].mediaTypeCategories[0].category.categoryName);
          this.mediaTypeForm.get('filetype').setValue(data[0].supportedFileExtensions.split(','));
          
          this.mediaTypeForm.get('filesize').setValue(data[0].mediaTypeCategories[0].fileThresholdSize);
          this.mediaTypeForm.get('fileunit').setValue(data[0].mediaTypeCategories[0].fileThresholdSizeUnits);
          this.mediaTypeForm.get('minheigth').setValue(data[0].mediaTypeCategories[0].minH);
          this.mediaTypeForm.get('minwidth').setValue(data[0].mediaTypeCategories[0].minW);
          this.mediaTypeForm.get('maxheigth').setValue(data[0].mediaTypeCategories[0].maxH);
          this.mediaTypeForm.get('maxwidth').setValue(data[0].mediaTypeCategories[0].maxW);
          
          this.mediaTypeForm.get('active').setValue(data[0].enabled); 
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

  selCateType(event){
    if(this.isEdit) {
    console.log(this.getData);
    let filtrData = this.getData[0].mediaTypeCategories.filter(
          fdata => fdata.category.categoryName === event.value);    
      if(filtrData.length > 0){
        this.mediaTypeForm.get('filesize').setValue(filtrData[0].fileThresholdSize);
        this.mediaTypeForm.get('fileunit').setValue(filtrData[0].fileThresholdSizeUnits);
        this.mediaTypeForm.get('minheigth').setValue(filtrData[0].minH);
        this.mediaTypeForm.get('minwidth').setValue(filtrData[0].minW);
        this.mediaTypeForm.get('maxheigth').setValue(filtrData[0].maxH);
        this.mediaTypeForm.get('maxwidth').setValue(filtrData[0].maxW);
      }else{
        this.mediaTypeForm.controls.filesize.reset();
        this.mediaTypeForm.controls.fileunit.reset();
        this.mediaTypeForm.controls.minheigth.reset();
        this.mediaTypeForm.controls.minwidth.reset();
        this.mediaTypeForm.controls.maxheigth.reset();
        this.mediaTypeForm.controls.maxwidth.reset();
      }    
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
        "mediaTypeName": "",
        "supportedFileExtensions": "",
        "mediaTypeCategories": [{
          "category": {
              "categoryId": "",
              "categoryName": "",
              "categoryDescription": "",
              "parentId": "",
              "languageId": "",
              "contents": null
          },
          "minH": "",
          "minW": "",
          "maxH": "",
          "maxW": "",
          "fileThresholdSize": "",
          "fileThresholdSizeUnits": ""
      }],
      "enabled": true
      }
    ];

    let filtrData = this.getData[0].mediaTypeCategories.filter(
      fdata => fdata.category.categoryName === formValues.catType);    

    // body[0].mediaTypeId = this.mediaTypeId;
    body[0].mediaTypeName = formValues.mediatype;
    body[0].supportedFileExtensions = formValues.filetype.toString();
    body[0].mediaTypeCategories[0].category.categoryName = formValues.catType;  
    body[0].mediaTypeCategories[0].category.categoryId = filtrData[0].category.categoryId;      
    body[0].mediaTypeCategories[0].category.categoryDescription = filtrData[0].category.categoryDescription;
    body[0].mediaTypeCategories[0].category.parentId =  filtrData[0].category.parentId;
    body[0].mediaTypeCategories[0].category.languageId = filtrData[0].category.languageId;
    body[0].mediaTypeCategories[0].category.contents = filtrData[0].category.contents;

    body[0].mediaTypeCategories[0].minH = formValues.minheigth;
    body[0].mediaTypeCategories[0].minW = formValues.minwidth;
    body[0].mediaTypeCategories[0].maxH = formValues.maxheigth;
    body[0].mediaTypeCategories[0].maxW = formValues.maxwidth;
    body[0].mediaTypeCategories[0].fileThresholdSize = formValues.filesize;
    body[0].mediaTypeCategories[0].fileThresholdSizeUnits = formValues.fileunit;
    // body[0].enabled = formValues.active;
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
          "mediaTypeName": "",
          "supportedFileExtensions": "",
          "mediaTypeCategories": [{
            "category": {
                "categoryId": "",
                "categoryName": "",
                "categoryDescription": "",
                "parentId": "",
                "languageId": "",
                "contents": null
            },
            "minH": "",
            "minW": "",
            "maxH": "",
            "maxW": "",
            "fileThresholdSize": "",
            "fileThresholdSizeUnits": ""
        }],
        "enabled": true
        }
      ];
  
      // body[0].mediaTypeId = this.mediaTypeId;
    body[0].mediaTypeName = formValues.mediatype;
    body[0].supportedFileExtensions = formValues.filetype.toString();
    body[0].mediaTypeCategories[0].category.categoryId = "12";
    body[0].mediaTypeCategories[0].category.categoryName = formValues.catType;    
    body[0].mediaTypeCategories[0].category.categoryDescription = '';
    body[0].mediaTypeCategories[0].category.parentId = "2";
    body[0].mediaTypeCategories[0].category.languageId = "1";
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
    } 
  }
  

}
