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
  displayedColumns = ['num','name', 'url', 'default_status', 'status', 'action'];
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
  public parentsEn: FormControl;
  public parentsBm: FormControl;
  public keys: FormControl;
  public parentsValEn : any;
  public parentsValBm : any;
  public treeEn: any;
  public treeBm: any;
  public categoryPlaceholder = "";

  dataUrl: any;  
  public languageId: any;
  leCategoryCode: any;
  countArticle = 0;
  catCode: any;
  catName: any;

  valkey = false;

  recordTable = null;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<object>(this.recordList);

  // applyFilter(e) {
  //   console.log(e);
  //   if(e){
  //     this.getFilterList(this.pageCount, this.sliderPageSize, e);
  //   }
  //   else{
  //     this.getSlidersData(this.pageCount, this.sliderPageSize);
  //   }
  // }

  // resetSearch() {
  //   this.getSlidersData(this.pageCount, this.sliderPageSize);
  // }

  constructor(private http: HttpClient, 
    @Inject(APP_CONFIG) private appConfig: AppConfig, 
    private commonservice: CommonService, 
    private router: Router, 
    private toastr: ToastrService,
    private translate: TranslateService,
    private dialogsService: DialogsService) {

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
    this.parentsBm = new FormControl();
    this.keys = new FormControl();

    this.updateForm = new FormGroup({   
      
      parentsEn: this.parentsEn,
      parentsBm: this.parentsBm,
      keys: this.keys,
    });

    this.getCategory();
    this.valkey = false;

  }


//   onLoad(){
//     var options = {
//         sourceLanguage: 'en',
//         destinationLanguage: ['hi'],
//         shortcutKey: 'ctrl+m',
//         transliterationEnabled: true
//     };

//     // Create an instance on TransliterationControl with the required
//     // options.
//     var control =
//     this.google.elements.transliteration.TransliterationControl(options);
//     // Enable transliteration in the textfields with the given ids.
//     var ids = [ "language" ];
//     control.makeTransliteratable(ids);
//     // Show the transliteration control which can be used to toggle between
//     // English and Hindi and also choose other destination language.
//     control.showControl('translControl');
// }

  getCategoryCode(){ 
    this.loading = true;
    return this.commonservice.readProtected('life/event/dropdown/643')
      .subscribe(resCatData => {
        this.commonservice.errorHandling(resCatData, (function () {
          this.leCategoryCode = resCatData['list'];          

          let countFlag = false;

          for(let i=0; i<this.leCategoryCode.length; i++){     

            if(countFlag == false && this.leCategoryCode[i].list[0].articleCount > 0){
              countFlag = true;
              this.countArticle = this.leCategoryCode[i].list[0].articleCount;
              this.catCode = this.leCategoryCode[i].refCode;

              if(this.languageId == 1){
                this.catName = this.leCategoryCode[i].list[0].categoryName;
              }

              else{
                this.catName = this.leCategoryCode[i].list[1].categoryName;
              }
            }
          }

          this.categoryPlaceholder = this.catName;

          this.getRecordList(this.pageCount, this.pageSize, this.catCode);

          console.log(this.categoryPlaceholder);
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

    this.loading = true;
    this.commonservice.readProtected('life/event/'+code, page, size).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
  
          this.recordList = data;
          console.log("data");
          console.log(data);
          
          this.dataSource.data = this.recordList.list;
          this.seqPageNum = this.recordList.pageNumber;
          this.seqPageSize = this.recordList.pageSize;
          this.recordTable = this.recordList;
          this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
        }).bind(this)); 
        this.loading = false;
      },
      error => {
  
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        console.log(error);
      });

  }

  searchCode(formValues: any){

    console.log("OOOOOOOO");
    this.catCode = formValues.parentsEn.refCode;
    this.getRecordList(this.pageCount, this.pageSize, this.catCode);
    console.log(this.catCode);
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
    console.log(row);
    this.router.navigate(['lifeevent/', row]);
    this.commonservice.pageModeChange(true);
  }

  deleteRow(id) {

    console.log(id);
    this.loading = true;
    this.commonservice.delete(id,'life/event/delete/').subscribe(
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
    return this.commonservice.readProtected('life/event/dropdown/643')
     .subscribe(data => {
  
      console.log("GET CATEGORY: ");
      console.log(data);
        
      this.commonservice.errorHandling(data, (function(){

          this.categoryData = data["list"];   
          console.log(this.categoryData);    
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
          console.log(this.itemEn);
          
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

    let keysVal = this.updateForm.get('keys');
    //alert(keysVal.value);

    if(keysVal.value == true){
      this.valkey = true;
    }

    else{
      this.valkey = false;
    }    
  }


}
// System.import('http://www.google.com/jsapi')
//     .then(MyModule => {
//        debugger;
//     });