import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './../config/app.config.module';
import { CommonService } from './../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-pollquestion',
  templateUrl: './pollquestion.component.html',
  styleUrls: ['./pollquestion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PollquestionComponent implements OnInit {

  updateForm: FormGroup

  rolespermission = ['admin | log entry | Can add log entry', 'admin | log entry | Can change log entry', 
  'admin | log entry | Can delete log entry', 'announcement | announcement | Can change announcement', 
  'announcement | announcement | Can delete announcement', 'announcement | announcement category | Can add announcement category'];

  permission: FormControl

  rolesList = null;
  displayedColumns = ['num', 'pq_en', 'pq_bm', 'status', 'action'];
  pollquestionList = null;
  userPageSize = 10;
  userPageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  isEdit: boolean;
  isComplete: boolean = true;
  pageMode: String;

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

  // getPQList(count, size) { //'?page=1&size=10'
  // // console.log(this.appConfig.urlUserList + '/?page=' + count + '&size=' + size)
  //   this.http.get(this.appConfig.urlUserList + '/?page=' + count + '&size=' + size)
  //   .subscribe(data => {
  //     this.userList = data;
  //     this.dataSource.data = this.userList.userList;
  //     this.commonservice.userTable = this.userList;
  //     this.noNextData = this.userList.pageNumber === this.userList.totalPages;
  //   });
  // }

  
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, 
  private commonservice: CommonService, private router: Router) { }

  ngOnInit() {

    this.pageModeChange();
    this.permission = new FormControl()

    this.updateForm = new FormGroup({   
      permission: this.permission
    });
  }

  clickEdit(e){
    debugger;
    alert("Click Edit: "+e.modules);
    
    this.router.navigate(['pollquestion/', '8']);
   
    
  }

  pageModeChange() {
    if(this.isEdit)
      this.pageMode = "Update"
    else
      this.pageMode = "Create"
  }

  navigateBack() {
    history.back();
  }

}

export interface Element {
  modules: string;
}

const ELEMENT_DATA: Element[] = [
  {modules: 'Question 1'},
  {modules: 'Question 2'},
  {modules: 'Question 3'},
  {modules: 'Question 4'}
];
