import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private commonservice: CommonService, private router: Router) { 
    this.getMediaList();
  }

  ngOnInit() {
    this.getMediaList();
  }

  getMediaList() {
    debugger;
    return this.commonservice.getMediaList()
       .subscribe(resStateData => {
        this.seqPageNum = resStateData.pageNumber;
        this.seqPageSize = resStateData.pageSize;
          this.mediaList = resStateData.mediaList;  
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

}
