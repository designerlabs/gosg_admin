import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { DialogsService } from '../../../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../../../nav/nav.service';

@Component({
  selector: 'app-mediatypetbl',
  templateUrl: './mediatypetbl.component.html',
  styleUrls: ['./mediatypetbl.component.css']
})
export class MediatypetblComponent implements OnInit, OnDestroy {

  mediaList = null;
  noPrevData = true;
  noNextData = false;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;
  lang:any;
  languageId: any;
  public loading = false;
  displayedColumns = ['no', 'mediaType', 'catName',  'status', 'action'];
  private subscriptionLang: ISubscription;

  dataSource = new MatTableDataSource<object>(this.mediaList);

  constructor(public commonservice: CommonService, private navservice: NavService, private router: Router, private toastr: ToastrService,private http: HttpClient, private dialogsService: DialogsService, private translate: TranslateService) { 
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
        // alert(this.languageId + ',' + this.localeVal)
      }
    });
    
    if(this.navservice.flagLang){
      this.getMediaList(this.languageId);
      this.commonservice.getModuleId();
    }

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getMediaList(this.languageId);
      this.commonservice.getModuleId();
    }
    
  }

  ngOnInit() {

    this.commonservice.getInitialMessage();

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }
    this.getMediaList(this.languageId);
    this.commonservice.getModuleId();
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  getMediaList(lng) {
    this.loading = true;
    // return this.commonservice.getMediaType()
    this.commonservice.readProtected('mediatype', '', '', '', lng)
       .subscribe(resStateData => {
        this.commonservice.errorHandling(resStateData, (function(){ 
            this.seqPageNum = 1;
            this.seqPageSize = 10;
            this.mediaList = resStateData['mediaTypes'];  
            this.dataSource.data = this.mediaList;      
          }).bind(this));
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');     
          
       });
  }

  add(){    
      this.router.navigate(['media/type' , 'add']);
  }

  editGroup(mtId) {
    
    this.router.navigate(['media/type', mtId]);
  }

  deleteRow(id) {    
    this.loading = true;
      // this.commonservice.delMediaType(id).subscribe(
        this.commonservice.delete(id,'mediatype/id/').subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
            this.getMediaList();
          }).bind(this));
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');    
          
        });
   
  }

}
