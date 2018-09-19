import { Component, OnInit, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
// multiSelect()
// import * as multiSelect from 'multiSelect';
// compMultiSelect.multiSelect()

@Component({
  selector: 'app-groupsedit',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']  
})
export class GroupsComponent implements OnInit {
  statusTitle: string;
  addData: { "moduleGroupName": any; "moduleGroupDescription": any; "active": any; "modules": any; };
  groupDescription: any;
  updateData: {"moduleGroupId":any; "moduleGroupName": any; "moduleGroupDescription": any; "active": any; "modules": any; };
  activeStatus: any;
  groupName: any;
  moduleListSelected: any;
  selectedItems: any;
  target: any;
  isUpdate: any;
  moduleList: any;
  elementRef: ElementRef;
  groupModule: FormGroup;
  groupmodulename: FormControl;
  active: FormControl;
  groupmoduledesc: FormControl;
  public loading = false;
  public languageId: any;
  constructor(
    @Inject(ElementRef) elementRef: ElementRef,
    public commonservice:CommonService,
    private http:HttpClient,
    private router:Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private route:ActivatedRoute
  ) {
    /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.commonservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.commonservice.getModuleId();
              //this.getUsersData(this.pageCount, this.pageSize);
            }

            if(this.route.snapshot.params.id){

              if(this.languageId == 1){
                this.statusTitle = "Update";
              }
              else{
                this.statusTitle = "Kemaskini";
              }
            }

            else{
              if(this.languageId == 1){
                this.statusTitle = "Add";
              }
              else{
                this.statusTitle = "Tambah";
              }
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      this.commonservice.getModuleId();
      //this.getData();
    }
    /* LANGUAGE FUNC */

    this.elementRef = elementRef;
    
  }
  
  ngOnInit() {

    this.commonservice.getInitialMessage();
    this.commonservice.getModuleId();
    this.isUpdate = false;
    this.route.snapshot.params.id;
    this.groupmodulename = new FormControl()
    this.active = new FormControl();
    this.groupmoduledesc = new FormControl();
    this.groupModule = new FormGroup({
      groupmodulename: this.groupmodulename,
      active: this.active,
      groupmoduledesc: this.groupmoduledesc
    });

    this.getModuleData();
  }


  ngAfterContentChecked(){

  }

  getModuleData() {
    if(this.route.snapshot.params.id){

      if(this.languageId == 1){
        this.statusTitle = "Update";
      }
      else{
        this.statusTitle = "Kemaskini";
      }

    this.isUpdate = true;
    this.loading = true;
    this.commonservice.getModuleList( this.route.snapshot.params.id).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.groupName = data.moduleGroupName;
          this.groupDescription = data.moduleGroupDescription;
          this.activeStatus = data.active;
          this.moduleList = data.data[0];
          this.selectedItems = data.data[1];
          this.groupModule.get('groupmodulename').setValue(this.groupName);
          this.groupModule.get('active').setValue(this.activeStatus);
          this.groupModule.get('groupmoduledesc').setValue(this.groupDescription);
        }).bind(this));
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    }else{
      if(this.languageId == 1){
        this.statusTitle = "Add";
      }
      else{
        this.statusTitle = "Tambah";
      }
      this.isUpdate = false;
      this.loading = true;
      this.commonservice.getModuleListAll().subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            this.moduleList = data.data[0];
            this.selectedItems = data.data[1];
          }).bind(this));
          this.loading = false;
        }, err => {
          this.loading = false;
        }
      )
    }
  }

  updateModuleData(){
    this.updateData = {
      "moduleGroupId": this.route.snapshot.params.id,
      "moduleGroupName": this.groupModule.get('groupmodulename').value,
      "moduleGroupDescription":this.groupModule.get('groupmoduledesc').value,
      "active": this.groupModule.get('active').value ? true : false,
      "modules": this.selectedItems.items
    };
    this.loading = true;
    this.commonservice.update(this.updateData, 'authorization/module/moduleList/update').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.updated'), 'success');
          this.router.navigate(['groupmodule']);
        }).bind(this));
        this.loading = false;

      }, err => {
        this.loading = false;
      }
    );
  }

  addModuleData(){

    this.addData = {
      "moduleGroupName": this.groupModule.get('groupmodulename').value,
      "moduleGroupDescription":this.groupModule.get('groupmoduledesc').value,
      "active": this.groupModule.get('active').value ? true : false,
      "modules": this.selectedItems.items
    };
    this.loading = true;
    this.commonservice.create(this.addData,'authorization/module/group').subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success(this.translate.instant('common.success.added'), 'success');
          this.router.navigate(['groupmodule']);
          
        }).bind(this));
        this.loading = false;
      }, err => {
        this.loading = false;
      }
    );
    
  }

  remove(array, element) {
      const index = array.indexOf(element);
      array.splice(index, 1);
  }

  moveItem(e){
    this.selectedItems.items.push(e);
    this.remove(this.moduleList.items, e);
  }

  moveItemR(e){
    this.moduleList.items.push(e);
    this.remove(this.selectedItems.items, e);
  }

  submit(){
      
  }

  back(){
    this.router.navigate(['groupmodule']);
    this.toastr.success('successfully backed', '');   
  }
}
