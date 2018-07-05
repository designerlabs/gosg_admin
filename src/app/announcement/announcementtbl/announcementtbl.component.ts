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
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;
  public loading = false;

  displayedColumns = ['no', 'announcementTitle', 'announcementDescription', 'isActive', 'action'];

  dataSource = new MatTableDataSource<object>(this.announceList);

  constructor(public commonservice: CommonService, private router: Router) { }

  ngOnInit() {
    this.getAnnounceList(this.announcePageCount, this.announcePageSize);
  }

  getAnnounceList(count, size) {
    
      this.loading = true;
      return this.commonservice.getAnnounceTblData()
       .subscribe(resStateData => {
        this.commonservice.errorHandling(resStateData, (function(){
          this.seqPageNum = resStateData.pageNumber;
          this.seqPageSize = resStateData.pageSize;
          this.announceList = resStateData.list;  
          this.dataSource.data = this.announceList;      
        }).bind(this));  
        this.loading = false;
        },
        Error => {
        //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
        
        this.loading = false;
       });
  }

  add(){
    this.router.navigate(['announcement', 'add']);
  }

  editGroup(fId) {
    
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
