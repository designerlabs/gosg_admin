import { Component, OnInit, ViewEncapsulation, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { CommonService } from '../../service/common.service';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-feedbacktbl',
  templateUrl: './feedbacktbl.component.html',
  styleUrls: ['./feedbacktbl.component.css']
})
export class FeedbacktblComponent implements OnInit {
  fbList: null;


  displayedColumns = ['fbId','fbMs','fbCode']


  dataSource = new MatTableDataSource<object>(this.fbList);
  
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, private service: CommonService, private router: Router) { }

  ngOnInit() {
    this.getFeedbackType();
  }


  getFeedbackType() {
  this.service.getFeedbackType().subscribe(
    data => {
      if(data.statusCode == "S001"){
        console.log("success calling");
        console.log(data.feedbackTypeList);
        this.fbList = data.feedbackTypeList;
        this.dataSource.data = data.feedbackTypeList;

      }
      else{
      }
  });
}
}
