import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './ethnicity.component.html',
  styleUrls: ['./ethnicity.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EthnicityComponent implements OnInit {

    constructor() { }
  
    ngOnInit() {
    }
  
  }




