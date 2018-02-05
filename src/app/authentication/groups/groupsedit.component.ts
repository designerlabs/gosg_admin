import { Component, OnInit, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../service/common.service';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
// multiSelect()
// import * as multiSelect from 'multiSelect';
// compMultiSelect.multiSelect()

@Component({
  selector: 'app-groupsedit',
  templateUrl: './groupsedit.component.html',
  styleUrls: ['./groupsedit.component.css']  
})
export class GroupseditComponent implements OnInit {
  moduleListSelected: any;
  selectedItems: any;
  target: any;
  moduleList: any;
  elementRef: ElementRef;
  groupModule: FormGroup;
  groupmodulename: FormControl;
  
  constructor(
    @Inject(ElementRef) elementRef: ElementRef,
    private commonservice:CommonService,
    private http:HttpClient
  ) {
    this.elementRef = elementRef;
    
  }

  
  

  
  ngOnInit() {
    
    this.groupmodulename = new FormControl()
    this.groupModule = new FormGroup({
      groupmodulename: this.groupmodulename
    })
    this.getModuleData();
  }


  ngAfterContentChecked(){

  }

  getModuleData() {
    this.commonservice.getModuleList().subscribe(
      data => {
        this.moduleList = data.data[0];
        this.selectedItems = data.data[1];
      });
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
    debugger;
  }
}
