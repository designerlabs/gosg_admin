import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import {map} from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, RouterModule, ParamMap } from '@angular/router';
import { ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
// Import RxJs required methods
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
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig, private route: ActivatedRoute, private router: Router) { }
  getMenuID(ID): Observable<any> {
    // tslint:disable-next-line:no-debugger
    debugger;
    console.log('This is from Common Service ,' + ID);
    if (!isNaN(ID)) {
      // ...using get request
    //  return this.http.get(this.appConfig.urlCommon + 'article/category/1')
     // ...and calling .json() on the response to return data
    //  .map((response: Response) => response.json());
    // .subscribe( response => this.dataTbl );
    return ID;
  }
}
getForecastData(forecastId): Observable<any> {
  return this.http.get<any>('/api/forecasts/' + forecastId + '/data');
}
getContact(id) {
  // tslint:disable-next-line:no-debugger
  debugger;
  return this.http.get(this.appConfig.urlCommon + 'article/category/1');
}

// triggerArticle(topicID) {
//   this.route.paramMap
//   .switchMap((params) => {
//      return this.getForecastData(params.get('id')
//       .do(null, err => console.log('getForecastData error: ' + err.message))
//   })
//   .subscribe();
// }

  triggerArticle(topicID) {
        if (!isNaN(topicID)) {
            return this.route.paramMap
            .switchMap((params: ParamMap) =>
            this.getMenuID(topicID))
            .subscribe(resSliderData => this.dataTbl = resSliderData);
        }
       }

  setMenuID(data) {
    this.subid = data.subMenu;
    this.subid = data.mainMenu;

    // this.route.params
    // .map(params => params['id'])
    // .switchMap(id => this.simpleGet(id))
    // .subscribe(contact => this.resultData = contact);

  }
  simpleGet(topicID) {
    return this.http.get(this.appConfig.urlCommon + 'article/category/1').subscribe(Rdata => {
      this.dataTbl = Rdata;
      console.log(this.dataTbl);
  });
  
  // return this.dataTbl;
  }



}


