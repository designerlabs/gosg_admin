import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { DialogsService } from '../../../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-mediatypetbl',
  templateUrl: './mediatypetbl.component.html',
  styleUrls: ['./mediatypetbl.component.css']
})
export class MediatypetblComponent implements OnInit {

  mediaList = null;
  noPrevData = true;
  noNextData = false;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;
  lang:any;
  languageId: any;

  displayedColumns = ['no', 'mediaType', 'catName',  'status', 'action'];

  dataSource = new MatTableDataSource<object>(this.mediaList);

  constructor(private commonservice: CommonService, private router: Router, private toastr: ToastrService,private http: HttpClient, private dialogsService: DialogsService, private translate: TranslateService) { 
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getMediaList();
              this.commonservice.getModuleId();
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getMediaList();
      this.commonservice.getModuleId();
    }
    
  }

  ngOnInit() {
    this.getMediaList();
    this.commonservice.getModuleId();
  }

  getMediaList() {
    return this.commonservice.getMediaType()
       .subscribe(resStateData => {
        // this.commonservice.errorHandling(resStateData, (function(){
            this.seqPageNum = 1;
            this.seqPageSize = 10;
            this.mediaList = resStateData['mediaTypes'];  
            this.dataSource.data = this.mediaList;      
          // }).bind(this));
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');          
       });
  }

  add(){    
      this.router.navigate(['media/type' , 'add']);
  }

  editGroup(mtId) {
    console.log(mtId);
    this.router.navigate(['media/type', mtId]);
  }

  deleteRow(id) {    
      this.commonservice.delMediaType(id).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
            this.getMediaList();
          }).bind(this));
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');    
          console.log(error);
        });
   
  }

}
