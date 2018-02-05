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
import 'rxjs/add/operator/retry';

@Injectable()
export class CommonService {
  ObjMenuid: object;
  dataTbl: object;
  data: object;
  mainid;
  subid;
  uid;
  userInfo: object;
  userTable: object;
  sliderTable: object;
  recordTable: object;
  temp = null;

  pageMode: String;

  // tslint:disable-next-line:max-line-length
  constructor(private http: Http, @Inject(APP_CONFIG) private appConfig: AppConfig, private route: ActivatedRoute, private router: Router) { }

  private usersUrl: string = this.appConfig.urlUsers;
  private slidersUrl: string = this.appConfig.urlSlides;
  private stateUrl: string = this.appConfig.urlStateList;
  private cityUrl: string = this.appConfig.urlCityList;
  private postcodeUrl:string = this.appConfig.urlPostcode;
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
  
  getSlidersData(): Observable<any[]> {
    return this.http.get(this.slidersUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  getUsersDataByID(uid): Observable<any[]> {
    return this.http.get(this.usersUrl + uid)
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
      return this.http.get(this.appConfig.urlCommon + 'article/category/1')
      .subscribe(Rdata => {
        this.dataTbl = Rdata;
        // console.log(this.dataTbl);
        this.router.navigate(['articletbl', topicID]);
      });
    }else if (this.mainid === 1 && topicID === 4) {
      return this.http.get(this.appConfig.urlUserList + '?page=1&size=10')
      .subscribe(Rdata => {
        this.dataTbl = Rdata;
        this.router.navigate(['userlist']);
        // console.log(this.dataTbl);
      });
    }else {
      this.dataTbl = [];
    }
  }

  GetUser(userId) {
    return this.http.get(this.appConfig.urlUserList + '/' + userId + '?langId=1').subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      this.router.navigate(['user', userId]);
    });
  }

  updateUser(user) {

    // console.log(this.appConfig.urlUsers + user.userId)
    // console.log(user)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    return this.http.put(this.appConfig.urlUserList + '/' + user.userId + '?langId=1', user)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getModuleList(){
    return this.http.get(this.appConfig.urlModuleList)
    .map((response: Response) => response.json()[0])
    .catch(this.handleError);
  }

  getGroupList(){
    return this.http.get(this.appConfig.urlGroupModuleList)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getGroupsData() {
    console.log(this.appConfig.urlGroup)
    return this.http.get(this.appConfig.urlGroup)
    .map((response: Response) => response.json().groupList)
    .catch(this.handleError);
  }

  getFeedbackType(){
    return this.http.get(this.appConfig.urlFbTypeList + 'type/?langId=1')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  pageModeChange(isEdit: boolean) {
    if(isEdit === true)
      this.pageMode = "Update"
    else
      this.pageMode = "Add"

    return this.pageMode;
  }

  // SLIDER
  getSlider(code) {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlSlides + '/' + code).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      // this.router.navigate(['user', code]);
    });
  }

  addSlider(slider) {

    console.log(this.appConfig.urlSlides)
    console.log(slider)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.post(this.appConfig.urlSlides, slider)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateSlider(slider) {

    // console.log(this.appConfig.urlUsers + user.userId)
    console.log(slider)
    // debugger;
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    return this.http.put(this.appConfig.urlSlides + '/' + slider[0].slideCode, slider)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delSlider(enId, bmId) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlSlides + "/delete/selected?id=" + enId + "," +bmId, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  addRecord(record) {
    let fullUrl = this.appConfig.urlPoll + "/question";
    console.log(fullUrl)
    console.log(record)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delRecord(enId, bmId) {
    
    return this.http.delete(this.appConfig.urlSlides + "/delete/selected?id=", enId + "," +bmId)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = `Status code ${error.status} on url ${error.url}`;
    console.error(msg);
    return Observable.throw(msg);

  }

  getStateData(): Observable<any[]> {
    //  console.log(this.countryUrl);
    return this.http.get(this.stateUrl)
      .map((response: Response) => response.json().stateList)
      .retry(5)
      .catch(this.handleError);

  }

  getCitiesbyState(code): Observable<any[]> {
    return this.http.get(this.cityUrl + '/state/' + code)
      .map((response: Response) => response.json().cityList)
      .retry(5)
      .catch(this.handleError);

  }

  getPostCodeData(code): Observable<any[]> {
    //  console.log(this.countryUrl);
    return this.http.get(this.postcodeUrl+ code)
      .map((response: Response) => response.json().postcodeList)
      .retry(5)
      .catch(this.handleError);
  }



}


