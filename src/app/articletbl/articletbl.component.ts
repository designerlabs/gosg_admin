import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    private location: Location) { }

  ngOnInit() {
    // tslint:disable-next-line:no-debugger
    debugger;

    this.menus = this.commonservice.ObjMenuid;
    // tslint:disable-next-line:radix
    this.topicID = parseInt(this.router.url.split('/')[2]);
    // this.menuid = this.commonservice.subid;
    // console.log(this.route.params.id);
    // this.getid();
    // this.commonservice.triggerArticle(this.topicID);

    // this.route.params
    //  .switchMap((params: Params) => this.commonservice.triggerArticle(this.topicID))
    //  .subscribe(data => this.resultData = data);

    this.route.params
    .map(params => params['id'])
    .switchMap(id => this.commonservice.getContact(id))
    .subscribe(contact => this.resultData = contact);

    console.log(this.resultData);
}

  goBack(): void {
      this.location.back();
  }


}
