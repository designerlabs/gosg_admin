import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { CommonService } from '../service/common.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-articletbl',
  templateUrl: './articletbl.component.html',
  styleUrls: ['./articletbl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticletblComponent implements OnInit {
  menus: object;
  menuid;
  topicID;
  resultData: object;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private commonservice: CommonService,
    private location: Location,
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig) {
      this.route.params.subscribe( params => console.log(params.id));
    }

  ngOnInit() {
    this.menus = this.commonservice.ObjMenuid;
    // tslint:disable-next-line:radix
    this.topicID = parseInt(this.router.url.split('/')[2]);
    this.commonservice.GetList(this.topicID);

    console.log(this.resultData);
}

  goBack(): void {
      this.location.back();
  }


}
