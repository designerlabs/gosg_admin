import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../../dialogs/dialogs.service';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-modmenutbl',
  templateUrl: './modmenutbl.component.html',
  styleUrls: ['./modmenutbl.component.css']
})
export class ModmenutblComponent implements OnInit {

  moduleData: Object;
  moduleList = null;
  displayedColumns: any;
  modulePageSize = 10;
  modulePageCount = 1;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  dataUrl: any;
  date = new Date();
  pageMode: String;
  isEdit: boolean;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;
  lang:any;
  languageId: any;
  public loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.moduleList);

  // applyFilter(val) {   

  //   console.log(val);
    
  //   if(val){
  //     this.getModuleData(this.pageCount, this.pageSize, val, this.filterTypeVal);
  //   }
  //   else{
  //     this.getModuleData(this.pageCount, this.pageSize);
  //   }
  
  // }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService) {
    
      /* LANGUAGE FUNC */
      translate.onLangChange.subscribe((event: LangChangeEvent) => {
        translate.get('HOME').subscribe((res: any) => {
          this.commonservice.getAllLanguage().subscribe((data:any) => {
            let getLang = data.list;
            let myLangData =  getLang.filter(function(val) {
              if(val.languageCode == translate.currentLang){
                this.lang = val.languageCode;
                this.languageId = val.languageId;
                this.getModuleData(this.pageCount, this.modulePageSize);
                this.commonservice.getModuleId();
              }
            }.bind(this));
          })
        });
      });
      if(!this.languageId){
        this.languageId = localStorage.getItem('langID');
        this.getModuleData(this.pageCount, this.modulePageSize);
        this.commonservice.getModuleId();
      }
  
      /* LANGUAGE FUNC */ }

  ngOnInit() {
    this.displayedColumns = ['no','moduleName', 'moduleDesc', 'moduleUrl', 'moduleActiveStatus', 'moduleAction'];
    this.commonservice.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get module Data 
  getModuleData(count, size) {

    this.loading = true;
    this.http.get(this.appConfig.urlModule + '?page=' + count + '&size=' + size+'&language='+this.languageId).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.moduleList = data;
          console.log(this.moduleList)
          this.dataSource.data = this.moduleList['moduleList'];
          this.seqPageNum = this.moduleList.pageNumber;
          this.seqPageSize = this.moduleList.pageSize;
          this.commonservice.recordTable = this.moduleList;
          this.noNextData = this.moduleList.pageNumber === this.moduleList.totalPages;
            
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');   
        console.log(error);  
        this.loading = false;
      });
      
  }

  paginatorL(page) {
    this.getModuleData(this.pageCount, this.modulePageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    this.getModuleData(page + 1, this.modulePageSize);
  }

  pageChange(event, totalPages) {
    this.getModuleData(this.pageCount, event.value);
    this.modulePageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['modmenu', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    this.router.navigate(['modmenu', row]);
  }

  deleteItem(moduleId) {

      this.commonservice.delModMenu(moduleId).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.toastr.success(this.translate.instant('common.success.deletesuccess'), 'success');
          }).bind(this));  
          this.getModuleData(this.pageCount, this.modulePageSize);
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');    
        });

  }

  changePageMode(isEdit) {
    if (isEdit == false) {
      this.pageMode = "Add";
    } else if (isEdit == true) {
      this.pageMode = "Update";
    }
  }

  back(){
    this.router.navigate(['modmenu']);
  }

}
