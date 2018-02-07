import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-maincategorytbl',
  templateUrl: './maincategorytbl.component.html',
  styleUrls: ['./maincategorytbl.component.css']
})
export class MaincategorytblComponent implements OnInit {

  maincategoryPageCount = 1;
  maincategoryPageSize = 10;
  maincategoryList = null;
  noPrevData = true;
  noNextData = false;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;

  displayedColumns = ['no', 'maincategoryTitle_bm', 'maincategoryTitle_en', 'action'];

  dataSource = new MatTableDataSource<object>(this.maincategoryList);

  constructor(private commonservice: CommonService, private router: Router) { 
    this.getMainCategoryList(this.maincategoryPageCount, this.maincategoryPageSize);
  }

  ngOnInit() {
    this.getMainCategoryList(this.maincategoryPageCount, this.maincategoryPageSize);
  }

  getMainCategoryList(count, size) {
    // getFaqData
      return this.commonservice.getMainCategoryData()
       .subscribe(resStateData => {
          this.seqPageNum = resStateData.pageNumber;
          this.seqPageSize = resStateData.pageSize;
          this.maincategoryList = resStateData.maincategoryCodeList;  
          this.dataSource.data = this.maincategoryList;      
        },
        Error => {
        //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
        console.log('Error in Main category');
       });
  }

  add(){    
      this.router.navigate(['maincategory' , 'add']);
  }

  editGroup(fId) {
    console.log(fId);
    this.router.navigate(['maincategory', fId]);
  }

  paginatorL(page) {
    this.getMainCategoryList(page - 1, this.maincategoryPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getMainCategoryList(page + 1, this.maincategoryPageSize);
  }

  pageChange(event, totalPages) {
    this.getMainCategoryList(this.maincategoryPageCount, event.value);
    this.maincategoryPageSize = event.value;
    this.noPrevData = true;
  }


}
