import { Component, OnInit, AfterViewInit, ElementRef, Inject } from '@angular/core';
import * as $ from 'jquery';
// multiSelect()
// import * as multiSelect from 'multiSelect';
// compMultiSelect.multiSelect()

@Component({
  selector: 'app-groupsedit',
  templateUrl: './groupsedit.component.html',
  styleUrls: ['./groupsedit.component.css']  
})
export class GroupseditComponent implements OnInit {
  elementRef: ElementRef;

  constructor(@Inject(ElementRef) elementRef: ElementRef) { 
    this.elementRef = elementRef;
   
  }

  ngOnInit() {
    
    // $(function (){
    //   alert('hi');  
    // });
   // $('#my-select').jQuery.fn.multiSelect();
   
    
  }

  ngAfterContentChecked(){

  }

  loadSelect() {
    $('#my-select').multiSelect();
  }

}
