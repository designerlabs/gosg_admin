import { Component, OnInit, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';

@Component({
  selector: 'app-userpermission',
  templateUrl: './userpermission.component.html',
  styleUrls: ['./userpermission.component.css']
})
export class UserpermissionComponent implements OnInit {
  languageId: any;
  icno: any;
  username: any;
  activeStatus: any;
  groupName: any;
  moduleListSelected: any;
  selectedItems: any;
  target: any;
  moduleList: any;
  elementRef: ElementRef;
  groupModule: FormGroup;
  groupmodulename: FormControl;
  active: FormControl;
  superAdmin: FormControl;
  isAdminSuper =  false;
  groupmoduledesc: FormControl;
  statusTitle: any;
  public loading = false;
  
  constructor(
    @Inject(ElementRef) elementRef: ElementRef,
    private commonservice:CommonService,
    private http:HttpClient,
    private router:Router,
    private toastr: ToastrService,
    private route:ActivatedRoute,
    private translate:TranslateService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
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
                  this.commonservice.getModuleId();
                }
              }.bind(this));
            })
          });
        });
        if(!this.languageId){
          this.languageId = localStorage.getItem('langID');
          this.commonservice.getModuleId();
        }
    
        /* LANGUAGE FUNC */

    this.elementRef = elementRef;
   }

  ngOnInit() {
    this.commonservice.getModuleId();
    this.route.snapshot.params.id;
    this.groupmodulename = new FormControl()
    this.active = new FormControl();
    this.superAdmin = new FormControl();
    this.groupmoduledesc = new FormControl();
    this.groupModule = new FormGroup({
      groupmodulename: this.groupmodulename,
      active: this.active,
      superAdmin: this.superAdmin,
      groupmoduledesc: this.groupmoduledesc
    });

    this.getModuleData();
  }

  ngAfterContentChecked(){

  }

  getModuleData() {
    if(this.route.snapshot.params.id){
    this.statusTitle = "Update";
    this.loading = true;
    this.commonservice.getUserList(this.route.snapshot.params.id).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.username = data.username;
          this.icno =data.icNo;
          this.activeStatus = data.isActive;
          this.superAdminStatus = data.isSuperAdmin;
          this.isAdminSuper = data.isSuperAdmin;
          this.moduleList = data.data[0];
          this.selectedItems = data.data[1];
          this.groupModule.get('active').setValue(this.active);
          this.groupModule.get('superAdmin').setValue(data.isSuperAdmin);
        }).bind(this));
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    }else{
      this.statusTitle = "Add";
    }
  }




  remove(array, element) {
      const index = array.indexOf(element);
      array.splice(index, 1);
  }

  moveItem(e){
    this.selectedItems.items.push(e);
    this.remove(this.moduleList.items, e);
  }

  moveItemR(e, event){
    event.stopPropagation();
    this.moduleList.items.push(e);
    this.moduleList.items.filter(function(val){
      if(val.moduleGroupId == e.moduleGroupId){
        val.modules.filter(function(val1){
          val1.permission['isRead'] = false;
          val1.permission['isWrite'] = false;
          val1.permission['isUpdate'] = false;
          val1.permission['isDelete'] = false;
        });
      }
    });


    this.remove(this.selectedItems.items, e);
  }

  isChecked(event, moduleGroup, modules) {

    this.selectedItems.items.filter(function(val){
      if(val.moduleGroupId == moduleGroup.moduleGroupId){
        val.modules.filter(function(val1){
          if(val1.moduleId == modules.moduleId){
            let getVal = event.source.name;
            if(event.source.name != 'isRead'){
              val1.permission['isRead'] = true;
            }else{
              val1.permission['isWrite'] = false;
              val1.permission['isUpdate'] = false;
              val1.permission['isDelete'] = false;
            }
            val1.permission[getVal] = event.checked
          }
        });
      }
    });


    if(event.checked){

      //this.mailboxId.push(event.source.value);
    }else{
      
      // let index = this.mailboxId.indexOf(event.source.value);
      // this.mailboxId.splice(index, 1);
    }
    return false;
  }


  isSuperAdmin(e) {

    if(e.checked){
      this.isAdminSuper = true;
    }else{
      this.isAdminSuper = false;
    }
  }



  updateAsSuperAdmin(){
    this.loading = true;
    this.commonservice.updateSuperAdmin(this.route.snapshot.params.id, this.isAdminSuper).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success('updated successfully', '');
        }).bind(this));   
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }


  submit(){
      this.loading = true;
      this.commonservice.updateUserPermission(this.route.snapshot.params.id, this.selectedItems.items, this.isAdminSuper).subscribe(
      data => {
        this.commonservice.errorHandling(data, (function(){
          this.toastr.success('updated successfully', '');
        }).bind(this));   
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

  back(){
    this.router.navigate(['admin']);
  }

}
