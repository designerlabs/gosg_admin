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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.moduleList);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

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
              }
            }.bind(this));
          })
        });
      });
      if(!this.languageId){
        this.languageId = localStorage.getItem('langID');
        this.getModuleData(this.pageCount, this.modulePageSize);
      }
  
      /* LANGUAGE FUNC */ }

  ngOnInit() {
    this.displayedColumns = ['no','moduleName', 'moduleDesc', 'moduleUrl', 'moduleActiveStatus', 'moduleAction'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get module Data 
  getModuleData(count, size) {

    this.http.get(this.appConfig.urlModule + '?page=' + count + '&size=' + size).subscribe(
      data => {
        this.moduleList = data['moduleList'];
        console.log(this.moduleList)
        this.dataSource.data = this.moduleList;
        this.seqPageNum = this.moduleList.pageNumber;
        this.seqPageSize = this.moduleList.pageSize;
        this.commonservice.recordTable = this.moduleList;
        this.noNextData = this.moduleList.pageNumber === this.moduleList.totalPages;
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

    let txt;

      this.commonservice.delModMenu(moduleId).subscribe(
        data => {
          txt = "Module deleted successfully!";
          console.log(data)
          this.toastr.success(txt, '');   
          this.getModuleData(this.pageCount, this.modulePageSize);
        },
        error => {
          console.log("No Data")
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
