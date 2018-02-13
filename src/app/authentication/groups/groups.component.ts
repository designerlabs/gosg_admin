import { Component, OnInit, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    this.statusTitle = "Update";
    this.isUpdate = true;
    this.commonservice.getModuleList( this.route.snapshot.params.id).subscribe(
      data => {
        this.groupName = data.moduleGroupName;
        this.groupDescription = data.moduleGroupDescription;
        this.activeStatus = data.active;
        this.moduleList = data.data[0];
        this.selectedItems = data.data[1];
        this.groupModule.get('groupmodulename').setValue(this.groupName);
        this.groupModule.get('active').setValue(this.activeStatus);
        this.groupModule.get('groupmoduledesc').setValue(this.groupDescription);
        
      });
    }else{
      this.statusTitle = "Add";
      this.isUpdate = false;
      this.commonservice.getModuleListAll().subscribe(
        data => {
          this.moduleList = data.data[0];
          this.selectedItems = data.data[1];
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

    this.commonservice.updateModuleList(this.updateData).subscribe(
      data => {
        this.toastr.success('success');
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

    this.commonservice.addModuleGroup(this.addData).subscribe(
      data => {
        this.toastr.success('success');
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
