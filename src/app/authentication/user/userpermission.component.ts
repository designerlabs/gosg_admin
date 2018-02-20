import { Component, OnInit, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userpermission',
  templateUrl: './userpermission.component.html',
  styleUrls: ['./userpermission.component.css']
})
export class UserpermissionComponent implements OnInit {
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
  groupmoduledesc: FormControl;
  statusTitle: any;
  
  constructor(
    @Inject(ElementRef) elementRef: ElementRef,
    private commonservice:CommonService,
    private http:HttpClient,
    private router:Router,
    private toastr: ToastrService,
    private route:ActivatedRoute
  ) {
    this.elementRef = elementRef;
   }

  ngOnInit() {

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
    this.statusTitle = "Update";
    this.commonservice.getUserList(this.route.snapshot.params.id).subscribe(
      data => {
        this.username = data.username;
        this.icno =data.icNo;
        this.activeStatus = data.isActive;
        this.moduleList = data.data[0];
        this.selectedItems = data.data[1];
        this.groupModule.get('active').setValue(this.active);
        
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

  submit(){

    this.commonservice.updateUserPermission(this.route.snapshot.params.id, this.selectedItems.items).subscribe(
      data => {
        this.toastr.success('updated successfully', '');   
      });
  }

  back(){
    this.router.navigate(['admin']);
  }

}
