import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../config/app.config.module';
import { CommonService } from './../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RolesComponent implements OnInit {

  updateForm: FormGroup

  rolespermission = ['admin | log entry | Can add log entry', 'admin | log entry | Can change log entry', 
  'admin | log entry | Can delete log entry', 'announcement | announcement | Can change announcement', 
  'announcement | announcement | Can delete announcement', 'announcement | announcement category | Can add announcement category'];

  rolesname: FormControl  
  permission: FormControl

  rolesList = null;
  displayedColumns = ['select', 'modules', 'viewCol', 'addCol', 'updateCol', 'deleteCol', 'allCol'];
  userPageSize = 10;
  userPageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;

  //dataSource = new MatTableDataSource<object>(this.rolesList);
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor() {  
  }

  ngOnInit() {
    
    this.rolesname = new FormControl()
    this.permission = new FormControl()

    this.updateForm = new FormGroup({   

      rolesname: this.rolesname,
      permission: this.permission,
    });
  }

}

export interface Element {
  modules: string;
}
const ELEMENT_DATA: Element[] = [
  {modules: 'Email'},
  {modules: 'Feedback'},
  {modules: 'Login'},
  {modules: 'Announcement'},
];
