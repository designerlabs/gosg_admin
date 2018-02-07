import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../../service/common.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-subcategorytbl',
  templateUrl: './subcategorytbl.component.html',
  styleUrls: ['./subcategorytbl.component.css']
})
export class SubcategorytblComponent implements OnInit {
  subcategoryPageCount = 1;
  subcategoryPageSize = 10;
  subcategoryList = null;
  noPrevData = true;
  noNextData = false;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;

  displayedColumns = ['no', 'subcategoryTitle_bm', 'subcategoryTitle_en', 'action'];

  dataSource = new MatTableDataSource<object>(this.subcategoryList);

  constructor(private commonservice: CommonService, private router: Router) { 
    this.getSubCategoryList(this.subcategoryPageCount, this.subcategoryPageSize);
  }

  ngOnInit() {
    this.getSubCategoryList(this.subcategoryPageCount, this.subcategoryPageSize);
  }

  getSubCategoryList(count, size) {
    // getFaqData
      return this.commonservice.getSubCategoryData()
       .subscribe(resStateData => {
          this.seqPageNum = resStateData.pageNumber;
          this.seqPageSize = resStateData.pageSize;
          this.subcategoryList = resStateData.subcategoryCodeList;  
          this.dataSource.data = this.subcategoryList;      
        },
        Error => {
        //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
        console.log('Error in Sub Category');
       });
  }

  add(){    
      this.router.navigate(['subcategory' , 'add']);
  }

  editGroup(fId) {
    console.log(fId);
    this.router.navigate(['subcategory', fId]);
  }

  paginatorL(page) {
    this.getSubCategoryList(page - 1, this.subcategoryPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getSubCategoryList(page + 1, this.subcategoryPageSize);
  }

  pageChange(event, totalPages) {
    this.getSubCategoryList(this.subcategoryPageCount, event.value);
    this.subcategoryPageSize = event.value;
    this.noPrevData = true;
  }

}
