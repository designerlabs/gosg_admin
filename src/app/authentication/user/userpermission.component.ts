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
    
    this.commonservice.getUserList( this.route.snapshot.params.id).subscribe(
      data => {
        this.groupName = data.moduleGroupName;
        this.activeStatus = data.isActive;
        this.moduleList = data.data[0];
        this.selectedItems = data.data[1];
        this.groupModule.get('groupmodulename').setValue(this.groupName);
        this.groupModule.get('active').setValue(this.activeStatus);
        this.groupModule.get('groupmoduledesc').setValue('a');
        
      });
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

  moveItemR(e){
    this.moduleList.items.push(e);
    this.remove(this.selectedItems.items, e);
  }


  submit(){
      
  }

  back(){
    this.router.navigate(['admin']);
    this.toastr.success('successfully backed', '');   
  }

}
