import { Component, OnInit, AfterViewInit, ElementRef, Inject, AfterContentInit } from '@angular/core';
import * as $ from 'jquery';
// import { multiSelect } from '../../../../node_modules/multiselect/js/jquery.multi-select';
// multiSelect()
import * as multiSelect from 'multiSelect';
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
    // $('#my-select').multiSelect();
    // $(function (){
    //   alert('hi');  
    // });
   // $('#my-select').jQuery.fn.multiSelect();
   
    
  }
  ngAfterContentInit() {
    debugger;
    // $('#my-select').multiSelect();
    //$(this.elementRef.nativeElement).find("#my-select").multiSelect();
    // $('#my-select').multiSelect();
    }
  loadSelect() {
    $('#my-select').multiSelect();
  }

}
