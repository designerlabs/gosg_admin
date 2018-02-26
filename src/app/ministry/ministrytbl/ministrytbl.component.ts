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
  selector: 'app-ministrytbl',
  templateUrl: './ministrytbl.component.html',
  styleUrls: ['./ministrytbl.component.css']
})
export class MinistrytblComponent implements OnInit {
  getDataT: any;
  refModuleId: any;

  agencyData: Object;
  ministryList = null;
  displayedColumns: any;
  agencyPageSize = 10;
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
  seqPageSize = 0 ;
  lang:any;
  languageId: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<object>(this.ministryList);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(
    private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getMinistryData(this.pageCount, this.agencyPageSize);
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.getMinistryData(this.pageCount, this.agencyPageSize);
    }

    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    this.displayedColumns = ['no','ministryNameEn', 'ministryNameBm', 'ministryAction'];
    this.getModuleId();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // get ministry Data 
  getMinistryData(count, size) {
    this.dataUrl = this.appConfig.urlGetMinistry;
    console.log(this.dataUrl + '/?page=' + count + '&size=' + size)

    this.http.get(this.dataUrl + '/?page=' + count + '&size=' + size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.ministryList = data;
        console.log(this.ministryList)
        this.dataSource.data = this.ministryList.list;
        this.seqPageNum = this.ministryList.pageNumber;
        this.seqPageSize = this.ministryList.pageSize;
        this.commonservice.recordTable = this.ministryList;
        this.noNextData = this.ministryList.pageNumber === this.ministryList.totalPages;
      });
  }

  paginatorL(page) {
    this.getMinistryData(this.pageCount, this.agencyPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getMinistryData(page + 1, this.agencyPageSize);
  }

  pageChange(event, totalPages) {
    this.getMinistryData(this.pageCount, event.value);
    this.agencyPageSize = event.value;
    this.noPrevData = true;
  }

  addBtn() {
    this.isEdit = false;
    this.changePageMode(this.isEdit);
    this.router.navigate(['ministry', "add"]);
  }
  
  updateRow(row) {
    this.isEdit = true;
    // this.changePageMode(this.isEdit);
    this.router.navigate(['ministry', row]);
  }

  
  
  getUserData(){
    this.commonservice.getUsersDetails().subscribe(
      data => {

        if(data['adminUser']){
          if(data['adminUser'].superAdmin){
            
          }else{

            this.commonservice.getUserList(data['adminUser'].userId).subscribe((dataT:any) => {
              dataT => {
                this.getDataT = dataT.data[1].items;
                console.log(this.getDataT);
                debugger;
              }
              
            });
            
          }
        }else{
          
        }
        
      },
    error => {
      
      }
    )}

    getModuleId(){
      let urlRef = window.location.pathname.split('/')
      let urlSplit = urlRef.splice(0, 2);
      let urlJoin = urlRef.join('/');

      this.commonservice.requestUrl(urlJoin).subscribe(
        data => {
          this.refModuleId = data.moduleId;
          if(data.moduleId){
            this.getUserData();
          }
          
        },
        error => {
          
          })
    };

  deleteItem(refCode) {
    let txt;

      this.commonservice.delMinistry(refCode).subscribe(
        data => {
          console.log(data)
          txt = "Ministry deleted successfully!";
          this.toastr.success(txt, '');   
          this.getMinistryData(this.pageCount, this.agencyPageSize);
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

  navigateBack() {
    this.isEdit = false;
    this.router.navigate(['ministry']);
  }

  back(){
    this.router.navigate(['ministry']);
  }

}
