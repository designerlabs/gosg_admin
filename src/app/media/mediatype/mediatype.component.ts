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
  objCategory = ["Slider","Gallery","Highlights"];
  objFileExtn = [];
  mediaTypeData: Object;
  mediaTypeForm: FormGroup;
  isEdit: boolean;
  complete: boolean;
  pageMode: String;

  mediaTypeId: any;
  imgfilesize: FormControl;
  imgfiletype: FormControl; 
  imgfileunit: FormControl;
  active: FormControl;
  catType: FormControl;
  imgmediatype: FormControl;
  imgminwidth: FormControl;
  imgmaxwidth: FormControl;
  imgminheigth: FormControl;
  imgmaxheigth: FormControl;
  imgchkactive: FormControl;
  
  docfilesize: FormControl;
  docfiletype: FormControl; 
  docfileunit: FormControl;
  docmediatype: FormControl;
  docminwidth: FormControl;
  docmaxwidth: FormControl;
  docminheigth: FormControl;
  docmaxheigth: FormControl;
  docchkactive: FormControl;
  
  audiofilesize: FormControl;
  audiofiletype: FormControl; 
  audiofileunit: FormControl;
  audiominwidth: FormControl;
  audiomaxwidth: FormControl;
  audiominheigth: FormControl;
  audiomaxheigth: FormControl;
  audiochkactive: FormControl;
 
  videofilesize: FormControl;
  videofiletype: FormControl; 
  videofileunit: FormControl;
  videominwidth: FormControl;
  videomaxwidth: FormControl;
  videominheigth: FormControl;
  videomaxheigth: FormControl;
  videochkactive: FormControl;

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
    let refCode = this.router.url.split('/')[3];
    this.imgfilesize = new FormControl();
    this.imgfiletype = new FormControl();
    this.imgfileunit = new FormControl();
    this.active = new FormControl();
    this.catType = new FormControl();
    this.imgminwidth = new FormControl();
    this.imgmaxwidth = new FormControl();
    this.imgminheigth = new FormControl();
    this.imgmaxheigth = new FormControl();
    this.imgchkactive = new FormControl();

    this.docfilesize = new FormControl();
    this.docfiletype = new FormControl();
    this.docfileunit = new FormControl();
    this.docminwidth = new FormControl();
    this.docmaxwidth = new FormControl();
    this.docminheigth = new FormControl();
    this.docmaxheigth = new FormControl();
    this.docchkactive = new FormControl();

    this.audiofilesize = new FormControl();
    this.audiofiletype = new FormControl();
    this.audiofileunit = new FormControl();
    this.audiominwidth = new FormControl();
    this.audiomaxwidth = new FormControl();
    this.audiominheigth = new FormControl();
    this.audiomaxheigth = new FormControl();
    this.audiochkactive = new FormControl();

    this.videofilesize = new FormControl();
    this.videofiletype = new FormControl();
    this.videofileunit = new FormControl();
    this.videominwidth = new FormControl();
    this.videomaxwidth = new FormControl();
    this.videominheigth = new FormControl();
    this.videomaxheigth = new FormControl();
    this.videochkactive = new FormControl();

    this.mediaTypeForm = new FormGroup({
      // mediatype: this.mediatype,
      imgfiletype: this.imgfiletype,
      imgfilesize: this.imgfilesize,
      imgfileunit: this.imgfileunit,
      active: this.active,
      catType: this.catType,
      imgminwidth: this.imgminwidth,
      imgmaxwidth: this.imgmaxwidth,
      imgminheigth: this.imgminheigth,
      imgmaxheigth: this.imgmaxheigth,
      imgchkactive: this.imgchkactive,

      docfiletype: this.docfiletype,
      docfilesize: this.docfilesize,
      docfileunit: this.docfileunit,
      docminwidth: this.docminwidth,
      docmaxwidth: this.docmaxwidth,
      docminheigth: this.docminheigth,
      docmaxheigth: this.docmaxheigth,
      docchkactive: this.docchkactive,

      audiofiletype: this.audiofiletype,
      audiofilesize: this.audiofilesize,
      audiofileunit: this.audiofileunit,      
      audiominwidth: this.audiominwidth,
      audiomaxwidth: this.audiomaxwidth,
      audiominheigth: this.audiominheigth,
      audiomaxheigth: this.audiomaxheigth,
      audiochkactive: this.audiochkactive,

      videofiletype: this.videofiletype,
      videofilesize: this.videofilesize,
      videofileunit: this.videofileunit,
      videominwidth: this.videominwidth,
      videomaxwidth: this.videomaxwidth,
      videominheigth: this.videominheigth,
      videomaxheigth: this.videomaxheigth,
      videochkactive: this.videochkactive,
    });

    if(refCode == "add") {
      this.isEdit = false;
      this.pageMode = "Add";
      this.mediaTypeForm.get('imgchkactive').setValue(false);
      this.mediaTypeForm.get('docchkactive').setValue(false);
      this.mediaTypeForm.get('audiochkactive').setValue(false);
      this.mediaTypeForm.get('videochkactive').setValue(false);
    } else {
      this.isEdit = true;
      this.pageMode = "Update";
      this.getRow(refCode);
    }
  }

  back(){
    this.router.navigate(['media/type']);
  }

  // get, add, update, delete
  getRow(row) {

    return this.http.get(this.appConfig.urlMediaType + '/id/' + row).subscribe(
      Rdata => {
        this.mediaTypeData = Rdata;
        console.log(this.mediaTypeData);
        let data = this.mediaTypeData['mediaType'];

      // populate data
      if(data){
        this.mediaTypeId = data.mediaTypeId;
        this.mediaTypeForm.get('imgmediatype').setValue(data.mediaType);
        this.mediaTypeForm.get('imgfiletype').setValue(data.supportedFileExtensions.split(','));// supposed to loop
        this.mediaTypeForm.get('imgfilesize').setValue(data.maxFileSize);
        this.mediaTypeForm.get('imgfileunit').setValue(data.maxFileSizeUnits);
        this.mediaTypeForm.get('active').setValue(data.enabled);
        this.checkReqValues();
      }
    });    
  }

  chkActive(from,event){
    
    let imgfiletype = "imgfiletype";
    let imgfilesize = "imgfilesize";
    let imgfileunit = "imgfileunit";
    let imgminwidth = "imgminwidth";
    let imgmaxwidth = "imgmaxwidth";
    let imgminheigth = "imgminheigth";
    let imgmaxheigth = "imgmaxheigth";

    let docfiletype = "docfiletype";
    let docfilesize = "docfilesize";
    let docfileunit = "docfileunit";
    let docminwidth = "docminwidth";
    let docmaxwidth = "docmaxwidth";
    let docminheigth = "docminheigth";
    let docmaxheigth = "docmaxheigth";

    let audiofiletype = "audiofiletype";
    let audiofilesize = "audiofilesize";
    let audiofileunit = "audiofileunit";
    let audiominwidth = "audiominwidth";
    let audiomaxwidth = "audiomaxwidth";
    let audiominheigth = "audiominheigth";
    let audiomaxheigth = "audiomaxheigth";

    let videofiletype = "videofiletype";
    let videofilesize = "videofilesize";
    let videofileunit = "videofileunit";
    let videominwidth = "videominwidth";
    let videomaxwidth = "videomaxwidth";
    let videominheigth = "videominheigth";
    let videomaxheigth = "videomaxheigth";
    
    if(event.checked){
      if(from === 'img'){
        this.imgreqVal = [imgfiletype, imgfilesize, imgfileunit, imgminwidth, imgmaxwidth, imgminheigth, imgmaxheigth];
      }
      if(from === 'doc'){
        this.docreqVal = [docfiletype, docfilesize, docfileunit, docminwidth, docmaxwidth, docminheigth, docmaxheigth];
      }
      if(from === 'aud'){
        this.audioreqVal = [audiofiletype, audiofilesize, audiofileunit, audiominwidth, audiomaxwidth, audiominheigth, audiomaxheigth];
      }
      if(from === 'vid'){
        this.videoreqVal = [videofiletype, videofilesize, videofileunit, videominwidth, videomaxwidth, videominheigth, videomaxheigth];
      }
    } else{
      if(from === 'img'){
        this.mediaTypeForm.controls.imgfiletype.reset();
        this.mediaTypeForm.controls.imgfilesize.reset();
        this.mediaTypeForm.controls.imgfileunit.reset();
        this.mediaTypeForm.controls.imgminwidth.reset();
        this.mediaTypeForm.controls.imgmaxwidth.reset();
        this.mediaTypeForm.controls.imgminheigth.reset();
        this.mediaTypeForm.controls.imgmaxheigth.reset();
        this.imgreqVal = [];
      }
      if(from === 'doc'){
        this.mediaTypeForm.controls.docfiletype.reset();
        this.mediaTypeForm.controls.docfilesize.reset();
        this.mediaTypeForm.controls.docfileunit.reset();
        this.mediaTypeForm.controls.docminwidth.reset();
        this.mediaTypeForm.controls.docmaxwidth.reset();
        this.mediaTypeForm.controls.docminheigth.reset();
        this.mediaTypeForm.controls.docmaxheigth.reset();
        this.docreqVal = [];
      }
      if(from === 'aud'){
        this.mediaTypeForm.controls.audiofiletype.reset();
        this.mediaTypeForm.controls.audiofilesize.reset();
        this.mediaTypeForm.controls.audiofileunit.reset();
        this.mediaTypeForm.controls.audiominwidth.reset();
        this.mediaTypeForm.controls.audiomaxwidth.reset();
        this.mediaTypeForm.controls.audiominheigth.reset();
        this.mediaTypeForm.controls.audiomaxheigth.reset();
        this.audioreqVal = [];
      }
      if(from === 'vid'){
        this.mediaTypeForm.controls.videofiletype.reset();
        this.mediaTypeForm.controls.videofilesize.reset();
        this.mediaTypeForm.controls.videofileunit.reset();
        this.mediaTypeForm.controls.videominwidth.reset();
        this.mediaTypeForm.controls.videomaxwidth.reset();
        this.mediaTypeForm.controls.videominheigth.reset();
        this.mediaTypeForm.controls.videomaxheigth.reset();
        this.videoreqVal = [];
      }
    }   
    this.checkReqValues();
  }  


  checkReqValues() {
    debugger;
    let catType = "catType";
    let nullPointers: any = [];
    
    if(this.imgreqVal.length>0 || this.docreqVal.length>0 || this.audioreqVal.length>0 || this.videoreqVal.length>0){
      this.reqVal = [catType];
      this.reqVal = [...this.reqVal,...this.imgreqVal,...this.docreqVal,...this.audioreqVal,...this.videoreqVal];

      for (var reqData of this.reqVal) {
        if(reqData){
          let elem = this.mediaTypeForm.get(reqData);  
          if (elem.value == "" || elem.value == null) {
            elem.setValue(null);
            nullPointers.push(null);
          }
        }        
      }

    }else{
      nullPointers.push(null);
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

//   addSeperator(nStr) {
//     nStr += '';
//     let x = nStr.split('.');
//     let x1 = x[0];
//     let x2 = x.length > 1 ? '.' + x[1] : '';
//     let rgx = /(\d+)(\d{3})/;
//     while (rgx.test(x1)) {
//         x1 = x1.replace(rgx, '$1' + '.' + '$2');
//     }
//     return x1 + x2;
// }

// rangeInputChangeEventHandler(e){
//   var rangeGroup = $(this).attr('name'),
//       minBtn = $(this).parent().children('.min'),
//       maxBtn = $(this).parent().children('.max'),
//       range_min = $(this).parent().children('.range_min'),
//       range_max = $(this).parent().children('.range_max'),
//       minVal = parseInt($(minBtn).val()),
//       maxVal = parseInt($(maxBtn).val()),
//       origin = $(this).context.className;

//   if(origin === 'min' && minVal > maxVal-5){
//       $(minBtn).val(maxVal-5);
//   }
//   var minVal = parseInt($(minBtn).val());
//   $(range_min).html(addSeperator(minVal*1000) + ' €');


//   if(origin === 'max' && maxVal-5 < minVal){
//       $(maxBtn).val(5+ minVal);
//   }
//   var maxVal = parseInt($(maxBtn).val());
//   $(range_max).html(addSeperator(maxVal*1000) + ' €');
// }

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
    body[0].mediaType = formValues.imgmediatype;
    body[0].supportedFileExtensions = formValues.imgfiletype.toString();
    body[0].maxFileSize = formValues.imgfilesize;
    body[0].maxFileSizeUnits = formValues.imgfileunit;
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
