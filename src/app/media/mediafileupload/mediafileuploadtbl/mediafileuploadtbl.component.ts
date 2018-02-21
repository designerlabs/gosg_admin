import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mediafileuploadtbl',
  templateUrl: './mediafileuploadtbl.component.html',
  styleUrls: ['./mediafileuploadtbl.component.css']
})
export class MediafileuploadtblComponent implements OnInit {

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
    // return this.commonservice.getMediaType()
    return this.http.get('./app/apidata/race.json')
       .subscribe(resStateData => {
         debugger;
        this.seqPageNum = 1;
        this.seqPageSize = 10;
          this.mediaList = resStateData['mediaTypes'];  
          this.dataSource.data = this.mediaList;      
        },
        Error => {
        //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
        console.log('Error in State');
       });
  }

  add(){    
      this.router.navigate(['media/' , 'add']);
  }

  editGroup(mtId) {
    console.log(mtId);
    this.router.navigate(['media/', mtId]);
  }

  deleteRow(id) {
    let txt;
    let r = confirm("Are you sure to delete " + id + "?");
    if (r == true) {
      this.commonservice.delMediaType(id).subscribe(
        data => {
          txt = "Media Type deleted successfully!";
          // this.router.navigate(['slider']);
          this.toastr.success(txt, '');   
          this.getMediaList();
        },
        error => {
          console.log("No Data")
        });

      // this.sliderForm.reset();
    } else {
      txt = "Delete Cancelled!";
      // alert(txt)
    }
  }
}
