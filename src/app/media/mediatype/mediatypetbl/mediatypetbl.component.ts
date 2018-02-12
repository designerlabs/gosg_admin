import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  displayedColumns = ['no', 'mediaName', 'mediaDes', 'status', 'action'];

  dataSource = new MatTableDataSource<object>(this.mediaList);

  constructor(private commonservice: CommonService, private router: Router, private toastr: ToastrService) { 
    this.getMediaList();
  }

  ngOnInit() {
    this.getMediaList();
  }

  getMediaList() {
    return this.commonservice.getMediaType()
       .subscribe(resStateData => {
        this.seqPageNum = 1;
        this.seqPageSize = 10;
          this.mediaList = resStateData.mediaTypes;  
          this.dataSource.data = this.mediaList;      
        },
        Error => {
        //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
        console.log('Error in State');
       });
  }

  add(){    
      this.router.navigate(['mediatype' , 'add']);
  }

  editGroup(mtId) {
    console.log(mtId);
    this.router.navigate(['mediatype', mtId]);
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
