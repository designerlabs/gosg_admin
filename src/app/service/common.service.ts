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
  errorMsgTable: object;
  languageTable: object;
  recordTable: object;
  temp = null;

  pageMode: String;

  // tslint:disable-next-line:max-line-length
  constructor(private http: Http, @Inject(APP_CONFIG) private appConfig: AppConfig, private route: ActivatedRoute, private router: Router) { }

  private usersUrl: string = this.appConfig.urlUsers;
  private errMsgUrl: string = this.appConfig.urlErrorMsg;
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

  getModuleList(id){
    return this.http.get(this.appConfig.urlModuleList+'/'+id)
    .map((response: Response) => response.json()[0])
    .catch(this.handleError);
  }

  getGroupList(){
    return this.http.get(this.appConfig.urlGroupModuleList)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getGroupsData() {
    console.log(this.appConfig.urlGroup);
    return this.http.get(this.appConfig.urlGroup)
    .map((response: Response) => response.json().groupList)
    .catch(this.handleError);
  }

  getFaqData() {
    console.log(this.appConfig.urlFaq);
    return this.http.get(this.appConfig.urlFaq)
    .map((response: Response) => response.json().faqCodeList)
    .catch(this.handleError);
  }

  getAnnounceData() {
    console.log(this.appConfig.urlAnnounceList);
    return this.http.get(this.appConfig.urlAnnounceList)
    .map((response: Response) => response.json().announceCodeList)
    .catch(this.handleError);
  }

  getCategoryData() {
    console.log(this.appConfig.urlCategoryList);
    return this.http.get(this.appConfig.urlCategoryList)
    .map((response: Response) => response.json().categoryCodeList)
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

    // console.log(this.appConfig.urlSlides)
    // console.log(slider)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.post(this.appConfig.urlSlides, slider)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateSlider(slider) {

    // console.log(this.appConfig.urlUsers + user.userId)
    // console.log(slider)
    // debugger;
    // return this.http.put(this.appConfig.urlUsers + user.userId, user) 
    return this.http.put(this.appConfig.urlSlides+ "/multiple/update", slider)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delSlider(enId, bmId) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlSlides + "/delete/selected?id=" + enId + "," +bmId, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // SLIDER END

  // ERROR MESSAGE
  getErrorMsg(errMsgId) {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlErrorMsg + '/' + errMsgId).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      // this.router.navigate(['user', code]);
    });
  }

  addErrorMsg(errormsg) {
    
    return this.http.post(this.appConfig.urlErrorMsg + '/add', errormsg)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateErrorMsg(errormsg) {

    return this.http.put(this.appConfig.urlErrorMsg+ "/update", errormsg)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delErrorMsg(errorMsgId) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlErrorMsg + "/delete/" + errorMsgId, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // ERROR MESSAGE END

  // AGENCY TYPE
  getAgencyType(code) {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlAgencyType + '/' + code).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      // this.router.navigate(['user', code]);
    });
  }

  addAgencyType(agencytype) {

    // console.log(this.appConfig.urlSlides)
    // console.log(agencytype)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.post(this.appConfig.urlAgencyType, agencytype)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateAgencyType(agencytype) {

    // console.log(this.appConfig.urlUsers + user.userId)
    // console.log(agencytype)
    // debugger;
    // return this.http.put(this.appConfig.urlUsers + user.userId, user) 
    return this.http.put(this.appConfig.urlAgencyType+ "/multiple/update", agencytype)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delAgencyType(enId, bmId) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlAgencyType + "/delete/selected?id=" + enId + "," +bmId, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // AGENCY END

  // LANGUAGE
  getAllLanguage() {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlLanguage + '/all').subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      // this.router.navigate(['user', code]);
    });
  }

  addLanguage(language) {

    // console.log(this.appConfig.urlSlides)
    // console.log(agencytype)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.post(this.appConfig.urlLanguage, language)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateLanguage(language) {

    // console.log(this.appConfig.urlUsers + user.userId)
    // console.log(agencytype)
    // debugger;
    // return this.http.put(this.appConfig.urlUsers + user.userId, user) 
    return this.http.put(this.appConfig.urlLanguage, language)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delLanguage(languageId) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlLanguage + "/" + languageId, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // LANGUAGE END

  addRecord(record) {
    let fullUrl = this.appConfig.urlPoll + "/question";
  
    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delRecord(enId, bmId) {
    let fullUrl = this.appConfig.urlPoll + "/question";

    return this.http.delete(fullUrl + "/delete/selected?id=" + enId + "," +bmId, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRecord(record) {
    let fullUrl = this.appConfig.urlPoll + "/question/multiple/update";

    return this.http.put(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  addRace(record) {
    let fullUrl = this.appConfig.urlRace;
    console.log(fullUrl)
    console.log(record)

    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRace(record) {
    let fullUrl = this.appConfig.urlRace ;
    
    return this.http.put(fullUrl, record)
        .map((response: Response) => response.json())
    .catch(this.handleError);
  }
    
  delRace(refCode) {
    let fullUrl = this.appConfig.urlRaceDelete;
    
    return this.http.delete(fullUrl + refCode)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  addRecordAddType(record) {
    let fullUrl = this.appConfig.urlAddressType;

    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delRecordAddType(refCode) {
    let fullUrl = this.appConfig.urlAddressType;

    return this.http.delete(fullUrl + "/" + refCode, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRecordAddType(record) {
    let fullUrl = this.appConfig.urlAddressType;

    return this.http.put(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  addRecordAccStatus(record) {
    let fullUrl = this.appConfig.urlAccountStatus;
 
    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delRecordAccStatus(refCode) {
    let fullUrl = this.appConfig.urlAccountStatus;

    return this.http.delete(fullUrl + "/" + refCode, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRecordAccStatus(record) {
    let fullUrl = this.appConfig.urlAccountStatus;

    return this.http.put(fullUrl, record)
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


