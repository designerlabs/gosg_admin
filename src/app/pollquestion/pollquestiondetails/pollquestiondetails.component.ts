import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-pollquestiondetails',
  templateUrl: './pollquestiondetails.component.html',
  styleUrls: ['./pollquestiondetails.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PollquestiondetailsComponent implements OnInit {

  updateForm: FormGroup
  pollEng: FormControl  
  pollMalay: FormControl

  displayedColumns = ['optionEn', 'optionBm', 'action'];

  //dataSource = new MatTableDataSource<object>(this.rolesList);
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  constructor() { }

  ngOnInit() {
    this.pollEng = new FormControl();
    this.pollMalay = new FormControl();

    this.updateForm = new FormGroup({   
      pollEng: this.pollEng,
      pollMalay: this.pollMalay,
    });

  }

}

export interface Element {
  optionPoll: string;
}

const ELEMENT_DATA: Element[] = [
  {optionPoll: 'Option 1'},
  {optionPoll: 'Option 2'},
  {optionPoll: 'Option 3'},
  {optionPoll: 'Option 4'},
  {optionPoll: 'Option 4'}
];
