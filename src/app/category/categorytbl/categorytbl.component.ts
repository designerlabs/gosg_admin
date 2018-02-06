import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-categorytbl',
  templateUrl: './categorytbl.component.html',
  styleUrls: ['./categorytbl.component.css']
})
export class CategorytblComponent implements OnInit {
  categoryPageCount = 1;
  categoryPageSize = 10;
  categoryList = null;
  noPrevData = true;
  noNextData = false;
  displayedColumns = ['categorySort', 'categoryTitle_bm', 'categoryTitle_en', 'action'];

  dataSource = new MatTableDataSource<object>(this.categoryList);

  constructor(private commonservice: CommonService, private router: Router) { }

  ngOnInit() {
    this.getCategoryList(this.categoryPageCount, this.categoryPageSize);
  }

  getCategoryList(count, size) {
    // getFaqData
      return this.commonservice.getCategoryData()
       .subscribe(resStateData => {
          this.categoryList = resStateData;  
          this.dataSource.data = this.categoryList;      
        },
        Error => {
        //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
        console.log('Error in State');
       });
  }

  add(){
    this.router.navigate(['category', 'add']);
  }

  editGroup(fId) {
    console.log(fId);
    this.router.navigate(['category', fId]);
  }

  paginatorL(page) {
    this.getCategoryList(page - 1, this.categoryPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getCategoryList(page + 1, this.categoryPageSize);
  }

  pageChange(event, totalPages) {
    this.getCategoryList(this.categoryPageCount, event.value);
    this.categoryPageSize = event.value;
    this.noPrevData = true;
  }


}
