import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-faqtbl',
  templateUrl: './faqtbl.component.html',
  styleUrls: ['./faqtbl.component.css']
})
export class FaqtblComponent implements OnInit {
  faqPageCount = 1;
  faqPageSize = 10;
  faqList = null;
  noPrevData = true;
  noNextData = false;
  displayedColumns = ['faqSort', 'faqTitle_bm', 'faqTitle_en', 'action'];

  dataSource = new MatTableDataSource<object>(this.faqList);


  constructor(private commonservice: CommonService, private router: Router) { 

  }

  ngOnInit() {
    this.getFaqList(this.faqPageCount, this.faqPageSize);
  }

  getFaqList(count, size) {
    // getFaqData
      return this.commonservice.getFaqData()
       .subscribe(resStateData => {
          this.faqList = resStateData;  
          this.dataSource.data = this.faqList;      
        },
        Error => {
        //  this.toastr.error(this.translate.instant('common.err.servicedown'), '');  
        console.log('Error in State');
       });
  }

  add(){
    this.router.navigate(['faq', 'add']);
  }

  editGroup(fId) {
    console.log(fId);
    this.router.navigate(['faq', fId]);
  }

  paginatorL(page) {
    this.getFaqList(page - 1, this.faqPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    // this.noNextData = pageInc === totalPages;
    this.getFaqList(page + 1, this.faqPageSize);
  }

  pageChange(event, totalPages) {
    this.getFaqList(this.faqPageCount, event.value);
    this.faqPageSize = event.value;
    this.noPrevData = true;
  }

}
