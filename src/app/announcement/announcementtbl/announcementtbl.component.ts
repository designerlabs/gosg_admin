import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-announcementtbl',
  templateUrl: './announcementtbl.component.html',
  styleUrls: ['./announcementtbl.component.css']
})
export class AnnouncementtblComponent implements OnInit {
  announcePageCount = 1;
  announcePageSize = 10;
  announceList = null;
  noPrevData = true;
  noNextData = false;
  displayedColumns = ['announceSort', 'announceTitle_bm', 'announceTitle_en', 'action'];

  dataSource = new MatTableDataSource<object>(this.announceList);

  constructor(private commonservice: CommonService, private router: Router) { }

  ngOnInit() {
    this.getAnnounceList(this.announcePageCount, this.announcePageSize);
  }

  getAnnounceList(count, size) {
    // debugger;
      return this.commonservice.getAnnounceData()
       .subscribe(resStateData => {
          this.announceList = resStateData;  
          this.dataSource.data = this.announceList;      
        },
        Error => {
        //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
        console.log('Error in State');
       });
  }

  add(){
    this.router.navigate(['announcement', 'add']);
  }

  editGroup(fId) {
    console.log(fId);
    this.router.navigate(['announcement', fId]);
  }

  paginatorL(page) {
    this.getAnnounceList(page - 1, this.announcePageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getAnnounceList(page + 1, this.announcePageSize);
  }

  pageChange(event, totalPages) {
    this.getAnnounceList(this.announcePageCount, event.value);
    this.announcePageSize = event.value;
    this.noPrevData = true;
  }

}
