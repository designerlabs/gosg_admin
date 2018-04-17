import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../../config/app.config.module';
import { CommonService } from './../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogsService } from '../../dialogs/dialogs.service';

declare var System: any;
@Component({
  selector: 'app-lifeeventtbl',
  templateUrl: './lifeeventtbl.component.html',
  styleUrls: ['./lifeeventtbl.component.css']
})
export class LifeeventtblComponent implements OnInit {

  updateForm: FormGroup;
  public loading = false;
  recordList = null;
  displayedColumns = ['num','name', 'url', 'category','default_status', 'status', 'action'];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;

  itemEn: any;
  itemBm: any;
  public nameStatus: FormControl;
  public parentsEn: FormControl;
  public parentsBm: FormControl;
  public keys: FormControl;
  public kataKunci: FormControl;
  public parentsValEn : any;
  public parentsValBm : any;
  public treeEn: any;
  public treeBm: any;
  public categoryPlaceholder = "";
  public filterPlaceholder = "";

  dataUrl: any;  
  public languageId: any;
  leCategoryCode: any;
  countArticle = 0;
  catCode: any;
  catName: any;

  valkey = false;
  recordTable = null;
  showNoData = false;

  //nameStatus=1;
  keywordVal="";

  editor = {treeVal: '' };
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);

  applyFilter(e) {

    this.nameStatus = this.updateForm.get('nameStatus').value;
 
    if(e){
      this.getFilterList(this.pageCount, this.pageSize, e, this.nameStatus);
    }
    else{
      this.getCategoryCode();
    }
  }

  resetSearch() {
    this.updateForm.get('kataKunci').setValue('');
    this.updateForm.get('nameStatus').setValue(1);
    this.getCategoryCode();
  }

  filterStatus(e){

    this.keywordVal = this.updateForm.get('kataKunci').value;

    if(this.keywordVal != ""){
      this.getFilterList(this.pageCount, this.pageSize, this.keywordVal, e.value);
    }

    else{
      this.getCategoryCode();
    }
  }

  constructor(private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    public builder: FormBuilder) {

    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getCategoryCode();
              //this.getRecordList(this.pageCount, this.pageSize);
              this.commonservice.getModuleId();
              this.getCategory();
              
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      //this.getRecordList(this.pageCount, this.pageSize);
      this.commonservice.getModuleId();
      this.getCategory();
    }
    /* LANGUAGE FUNC */
  }

  ngOnInit() {
    //this.getRecordList(this.pageCount, this.pageSize);
    
    this.getCategoryCode();
    this.commonservice.getModuleId();
    this.parentsEn = new FormControl();
    this.parentsBm = new FormControl({disabled: true});
    this.keys = new FormControl();
    this.nameStatus = new FormControl();
    this.kataKunci = new FormControl({value: '', disabled: true});

    this.updateForm = new FormGroup({   
      
      nameStatus: this.nameStatus,
      parentsEn: this.parentsEn,
      parentsBm: this.parentsBm,
      keys: this.keys,
      kataKunci: this.kataKunci
    });

    this.updateForm.get('nameStatus').setValue(1);   
    this.getCategory();
    this.valkey = false;

  }

  getCategoryCode(){ 

    this.loading = true;
    return this.commonservice.readProtected('life/event/dropdown/'+this.commonservice.lifeEventCategoryCode)
      .subscribe(resCatData => {
        this.commonservice.errorHandling(resCatData, (function () {
          this.leCategoryCode = resCatData['list'];          
                    
          let setParentEn;

          for(let i=0; i<this.leCategoryCode.length; i++){     

            if(this.leCategoryCode[i].refCode == this.commonservice.lifeEventCategoryCode){
              
              // this.countArticle = this.leCategoryCode[i].list[0].articleCount;
              // this.catCode = this.leCategoryCode[i].refCode;

              if(this.languageId == 1){
                this.catName = this.leCategoryCode[i].list[0].categoryName;
                this.filterPlaceholder = this.commonservice.showFilterEn;

                setParentEn = {
                  "id": [this.leCategoryCode[i].list[0].categoryId,this.leCategoryCode[i].list[1].categoryId],
                  "text":this.leCategoryCode[i].list[0].categoryName,
                  "value": this.leCategoryCode[i].list[0].categoryName,
                  "refCode":this.leCategoryCode[i].refCode 
                };
              }

              else{
                this.catName = this.leCategoryCode[i].list[1].categoryName;
                this.filterPlaceholder = this.commonservice.showFilterBm;

                setParentEn = {
                  "id": [this.leCategoryCode[i].list[0].categoryId,this.leCategoryCode[i].list[1].categoryId],
                  "text":this.leCategoryCode[i].list[0].categoryName,
                  "value": this.leCategoryCode[i].list[1].categoryName,
                  "refCode":this.leCategoryCode[i].refCode 
                };
              }
            }
          }        
          
          if (this.catCode == undefined || this.catCode == ""){
            
            this.catCode = this.commonservice.lifeEventCategoryCode;
            this.categoryPlaceholder = this.catName;
          }

       
          this.updateForm.get('parentsEn').setValue(setParentEn);  
          this.categoryPlaceholder = this.catName;

          this.getRecordList(this.pageCount, this.pageSize, this.catCode);

        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        console.log(error);
        this.loading = false;
      });
  }

  getRecordList(page, size, code) {  
  
    this.recordList = null;
    let nameStatus = this.updateForm.get('nameStatus').value;
    let generalUrl = ""

    if(nameStatus == 1){
      generalUrl = 'life/event/creator/state/all/';
    }

    else if(nameStatus == 2){
      generalUrl = 'life/event/creator/state/draft/';
    }

    else if(nameStatus == 3){
      generalUrl = 'life/event/creator/state/pending/';
    }

    else if(nameStatus == 4){
      generalUrl = 'life/event/creator/state/approved/';
    }
    
    if(code != undefined){
      this.loading = true;
      this.commonservice.readProtected(generalUrl+code, page, size).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
    
            this.recordList = data;
          
            if(this.recordList.list.length > 0){  
              this.dataSource.data = this.recordList.list;
              this.seqPageNum = this.recordList.pageNumber;
              this.seqPageSize = this.recordList.pageSize;
              this.recordTable = this.recordList;
              this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

              this.showNoData = false;
            }

            else{
              this.dataSource.data = []; 

              this.showNoData = true;
              this.seqPageNum = this.recordList.pageNumber;
              this.seqPageSize = this.recordList.pageSize;
              this.recordTable = this.recordList;
              this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
            }
          }).bind(this)); 
          this.loading = false;
        },
        error => {
    
          this.loading = false;
          this.toastr.error(JSON.parse(error._body).statusDesc, '');  
          console.log(error);
        });
    }

  }

  getFilterList(page, size, e, valStatus) {  

    this.recordList = null;
    let generalUrl = "";

    if(valStatus == 1){
      generalUrl = 'life/event/creator/search/state/all';
    }

    else if(valStatus == 2){
      generalUrl = 'life/event/creator/search/state/draft';
    }

    else if(valStatus == 3){
      generalUrl = 'life/event/creator/search/state/pending';
    }

    else if(valStatus == 4){
      generalUrl = 'life/event/creator/search/state/approved';
    }

    this.loading = true;
    this.commonservice.readProtected(generalUrl, page, size,e).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
  
          this.recordList = data;
          
          if(this.recordList.list.length > 0){  
            this.dataSource.data = this.recordList.list;
            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
            this.recordTable = this.recordList;
            this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

            this.showNoData = false;
          }

          else{
            this.dataSource.data = []; 

            this.showNoData = true;
            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
            this.recordTable = this.recordList;
            this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
          }
        }).bind(this)); 
        this.loading = false;
      },
      error => {
  
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
      });

  }

  paginatorL(page) {
    this.getRecordList(page - 1, this.pageSize, this.catCode);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getRecordList(page + 1, this.pageSize, this.catCode);
  }

  add() {
    this.router.navigate(['lifeevent/add']);
    this.commonservice.pageModeChange(false);
  }

  updateRow(row) {
    this.router.navigate(['lifeevent/', row]);
    this.commonservice.pageModeChange(true);
  }

  deleteRow(id) {

    this.loading = true;
    this.commonservice.delete(id,'life/event/creator/delete/').subscribe(
      data => {

        this.commonservice.errorHandling(data, (function(){

          this.toastr.success(this.translate.instant('common.success.deletesuccess'), '');
          this.getRecordList(this.pageCount, this.pageSize, this.catCode);
        }).bind(this)); 
        this.loading = false;
      },
      error => {

        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
    });
  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChange(event, totalPages) {
    this.getRecordList(this.pageCount, event.value, this.catCode);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  getCategory(){

    this.loading = true;
    return this.commonservice.readProtected('life/event/dropdown/'+this.commonservice.lifeEventCategoryCode)
     .subscribe(data => {
          
      this.commonservice.errorHandling(data, (function(){

          this.categoryData = data["list"];   
          let arrCatEn = [];      
          let arrCatBm = [];     

          for(let i=0; i<this.categoryData.length; i++){     
    
              if(this.categoryData[i].list.length === 2){
                arrCatEn.push({
                  
                      id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                      value:this.categoryData[i].list[0].categoryId,
                      refCode: this.categoryData[i].refCode,
                      parent: this.categoryData[i].list[0].parentId,
                      text: this.categoryData[i].list[0].categoryName,
                      checked: false,
                      children: []});      
                    
                arrCatBm.push({
                      id: [this.categoryData[i].list[0].categoryId, this.categoryData[i].list[1].categoryId],
                      value:this.categoryData[i].list[1].categoryId,
                      refCode: this.categoryData[i].refCode,
                      parent: this.categoryData[i].list[1].parentId,
                      checked: false,
                      text: this.categoryData[i].list[1].categoryName,
                      children: []}); 
                    
              }

          }
          
          if(this.languageId == 1){
            this.treeEn = this.getNestedChildrenEn(arrCatEn, -1);
          }else if(this.languageId == 2){
            this.treeEn = this.getNestedChildrenBm(arrCatBm, -2);
          }else{
            this.treeEn = this.getNestedChildrenEn(arrCatEn, -1);
          }
          
          this.itemEn = this.treeEn;
          
        }).bind(this));
        this.loading = false;
      },
      error => {

        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        this.loading = false;
        console.log(error);
    });
  }

  getNestedChildrenEn(arr, parent) {
    var out = []
    var children = []

    for(var i in arr) {
  
        if(arr[i].parent == parent) {
            children = this.getNestedChildrenEn(arr, arr[i].value)

            if(children.length) {
                 arr[i].children = children
            }
            out.push(arr[i])
        }      
    }    
    return out  
  }

  getNestedChildrenBm(arr, parent) {
    var out = []
    var children = []

    for(var i in arr) {
    
        if(arr[i].parent == parent) {
            children = this.getNestedChildrenBm(arr, arr[i].value)

            if(children.length) {
                 arr[i].children = children
            }
            out.push(arr[i])
        }
      
    }    
    return out  
  }

  keysFilter(){

    this.catCode = undefined;
    this.getCategoryCode();

    let keysVal = this.updateForm.get('keys');    
    this.updateForm.get('kataKunci').setValue('');
 
    if(keysVal.value == true){
      
      this.valkey = true;      
      this.kataKunci.enable();
      this.parentsEn.disable();
    }

    else{
      this.valkey = false;      
      this.kataKunci.disable();
      this.parentsEn.enable();
    }    
  }

  onChange(ele){    

    this.catCode = ele.refCode;
    this.getRecordList(this.pageCount, this.pageSize, this.catCode);   
  }
}
// System.import('http://www.google.com/jsapi')
//     .then(MyModule => {
//        debugger;
//     });