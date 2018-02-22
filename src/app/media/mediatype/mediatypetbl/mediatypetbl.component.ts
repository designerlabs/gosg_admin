import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mediatypetbl',
  templateUrl: './mediatypetbl.component.html',
  styleUrls: ['./mediatypetbl.component.css']
})
export class MediatypetblComponent implements OnInit {

  mediaList = null;
  noPrevData = true;
  noNextData = false;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;

  displayedColumns = ['no', 'mediaType', 'catName',  'status', 'action'];

  dataSource = new MatTableDataSource<object>(this.mediaList);

  constructor(private commonservice: CommonService, private router: Router, private toastr: ToastrService,private http: HttpClient, ) { 
    this.getMediaList();
  }

  ngOnInit() {
    this.getMediaList();
  }

  getMediaList() {
    return this.commonservice.getMediaType()
       .subscribe(resStateData => {
        this.commonservice.errorHandling(resStateData, (function(){
            this.seqPageNum = 1;
            this.seqPageSize = 10;
            this.mediaList = resStateData['mediaTypes'];  
            this.dataSource.data = this.mediaList;      
          }).bind(this));
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');          
       });
  }

  add(){    
      this.router.navigate(['media/type' , 'add']);
  }

  editGroup(mtId) {
    console.log(mtId);
    this.router.navigate(['media/type', mtId]);
  }

  deleteRow(id) {
    let txt;
    let r = confirm("Are you sure to delete " + id + "?");
    if (r == true) {
      this.commonservice.delMediaType(id).subscribe(
        data => {
          this.commonservice.errorHandling(data, (function(){
            txt = "Media Type deleted successfully!";
            this.toastr.success(txt, '');   
            this.getMediaList();
          }).bind(this));
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');    
        });
    } else {
      txt = "Delete Cancelled!";
    }
  }

}
