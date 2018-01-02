import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import {map} from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, RouterModule, ParamMap } from '@angular/router';
import { ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class CommonService {
 ObjMenuid: object;
 dataTbl: object;
 data: object;
 mainid;
 subid;
 uid;
 
  // tslint:disable-next-line:max-line-length
  constructor(private http: Http, @Inject(APP_CONFIG) private appConfig: AppConfig, private route: ActivatedRoute, private router: Router) { }
  
  private usersUrl: string = this.appConfig.urlUsers;
  // getMenuID(ID): Observable<any> {
  //   // tslint:disable-next-line:no-debugger
  //   debugger;
  //   console.log('This is from Common Service ,' + ID);
  //   if (!isNaN(ID)) {
  //   return ID;
  // }
  // }

  // triggerArticle(topicID) {
  //       if (!isNaN(topicID)) {
  //           return this.route.paramMap
  //           .switchMap((params: ParamMap) =>
  //           this.getMenuID(topicID))
  //           .subscribe(resSliderData => this.dataTbl = resSliderData);
  //       }
  //      }
  getUsersData(): Observable<any[]> {
    return this.http.get(this.usersUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  getUsersDataByID(uid): Observable<any[]> {
    return this.http.get(this.usersUrl+uid)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  getMenuID(data) {
    this.subid = data.subMenu;
    this.mainid = data.mainMenu;
    this.GetList(data.subMenu);
  }

  GetList(topicID) {
    if (this.mainid === 1 && topicID === 3) {
      return this.http.get(this.appConfig.urlCommon + 'article/category/1').subscribe(Rdata => {
        this.dataTbl = Rdata;
        console.log(this.dataTbl);
      });
    }
  }

  private handleError(error: Response) {
    let msg = `Status code ${error.status} on url ${error.url}`;
    console.error(msg);
    return Observable.throw(msg);

  }

}


