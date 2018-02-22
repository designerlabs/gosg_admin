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
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable()
export class CommonService {
  languageId: any;
  ObjMenuid: object;
  dataTbl: object;
  data: object;
  mainid;
  subid;
  uid;
  userInfo: object;
  userTable: object;
  recordTable: object;
  temp = null;
  
  pageMode: String;

  // tslint:disable-next-line:max-line-length
  constructor(
    private http: Http, @Inject(APP_CONFIG) private appConfig: AppConfig,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {

       /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.getAllLanguage().subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
              this.getUsersData(this.pageCount, this.pageSize);
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }

    /* LANGUAGE FUNC */
     }
  lang = this.lang;
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
      return this.http.get(this.appConfig.urlCommon + 'article/category/1?language='+this.languageId)
      .subscribe(Rdata => {
        this.dataTbl = Rdata;
        // console.log(this.dataTbl);
        this.router.navigate(['articletbl', topicID]);
      });
    }else if (this.mainid === 1 && topicID === 4) {
      return this.http.get(this.appConfig.urlUserList + '?page=1&size=10&language='+this.languageId)
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
    return this.http.get(this.appConfig.urlUserList + '/' + userId + '?language='+this.languageId).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      this.router.navigate(['user', userId]);
    });
  }

  updateUser(user) {

    // console.log(this.appConfig.urlUsers + user.userId)
    // console.log(user)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    return this.http.put(this.appConfig.urlUserList + '/' + user.userId + '?language='+this.languageId, user)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getModuleList(id){
    return this.http.get(this.appConfig.urlModuleList+'/'+id)
    .map((response: Response) => response.json()[0])
    .catch(this.handleError);
  }

  getModuleListAll(){
    return this.http.get(this.appConfig.urlModuleList+'/all?language='+this.languageId)
    .map((response: Response) => response.json()[0])
    .catch(this.handleError);
  }

  updateModuleList(data){
    return this.http.put(this.appConfig.urlModuleList+'/update?language='+this.languageId, data)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }


  addModuleGroup(data){
    return this.http.post(this.appConfig.urlModuleGroupList, data)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getUserList(id){
    return this.http.get(this.appConfig.urlCommon+'adminuser/'+id+'?language='+this.languageId)
    .map((response: Response) => response.json().adminUserDetails)
    .catch(this.handleError);
  }

  addUserList(id){
    return this.http.post(this.appConfig.urlCommon+'adminuser/'+id+'?language='+this.languageId,'')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  deleteUserList(id){
    return this.http.delete(this.appConfig.urlCommon+'adminuser/'+id+'?language='+this.languageId,'')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }


  updateUserPermission(id, data){
    return this.http.put(this.appConfig.urlAdminUserPermission+'/'+id+'?language='+this.languageId, data)
    .map((response: Response) => response.json())
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

  getCategoryData() {
    console.log(this.appConfig.urlCategory);
    return this.http.get(this.appConfig.urlCategory + '/code?page=1&size=100&language=1')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getSubCategoryData() {
    console.log(this.appConfig.urlSubCategoryList);
    return this.http.get(this.appConfig.urlSubCategoryList)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getMainCategoryData() {
    console.log(this.appConfig.urlMainCategoryList);
    return this.http.get(this.appConfig.urlMainCategoryList)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getFeedbackType(){
    return this.http.get(this.appConfig.urlFbTypeList + 'type/?language='+this.languageId)
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
  // Media Starts 
  getMediaList() {
    // console.log(this.appConfig.urlMediaType);
    // return this.http.get(this.appConfig.urlMediaType)
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }


  // Media Ends
// Media Types starts
getMediaType() {
  console.log(this.appConfig.urlMediaType);
  return this.http.get(this.appConfig.urlMediaType)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

addMediaType(mediaType) {
  return this.http.post(this.appConfig.urlMediaType, mediaType)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

updateMediaType(mediaType) {
  return this.http.put(this.appConfig.urlMediaType, mediaType)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

delMediaType(mediaTypeId) {
  return this.http.delete(this.appConfig.urlMediaType + "/id/" + mediaTypeId)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

// Media Types ends urlMediaFileUpload

// Media File upload starts
getMediaFileUpload() {
  console.log(this.appConfig.urlMediaFileUpload);
  return this.http.get(this.appConfig.urlMediaFileUpload)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

addMediaFileUpload(mediaFile) {
  debugger;
  return this.http.post(this.appConfig.urlMediaFileUpload, mediaFile)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

// Media File upload ends

// Get Category List
getCategoryList() {
  console.log(this.appConfig.urlMediaFileUpload);
  return this.http.get(this.appConfig.urlMediaFileUpload)
  .map((response: Response) => response.json())
  .catch(this.handleError);
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

  // GALLERY
  getGallery(code) {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlSlides + '/' + code).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      // this.router.navigate(['user', code]);
    });
  }

  addGallery(gallery) {

    // console.log(this.appConfig.urlSlides)
    // console.log(slider)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.post(this.appConfig.urlSlides, gallery)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateGallery(gallery) {

    // console.log(this.appConfig.urlUsers + user.userId)
    // console.log(slider)
    // debugger;
    // return this.http.put(this.appConfig.urlUsers + user.userId, user) 
    return this.http.put(this.appConfig.urlSlides+ "/multiple/update", gallery)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delGallery(enId, bmId) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlSlides + "/delete/selected?id=" + enId + "," +bmId, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // GALLERY END

  //ANNOUNCEMENT STARTS

  getAnnounceTblData() { //For view table
    console.log(this.appConfig.urlAnnounceList);
    return this.http.get(this.appConfig.urlAnnounceList)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getAnnounce(code) {
    return this.http.get(this.appConfig.urlAnnounceList + '/' + code).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
    });
  }

  addAnnounce(ValAnnounce) {
    return this.http.post(this.appConfig.urlAnnounceList +'/add/all', ValAnnounce)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateAnnounce(ValAnnounce) {
    return this.http.put(this.appConfig.urlAnnounceList + '/multiple/update', ValAnnounce)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delAnnounce(refCode) {
    return this.http.delete(this.appConfig.urlAnnounceList + '/' + refCode)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  //ANNOUNCEMENT ENDS

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
    
    return this.http.post(this.appConfig.urlErrorMsg, errormsg)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateErrorMsg(errormsg) {

    return this.http.put(this.appConfig.urlErrorMsg+ "/multiple/update", errormsg)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delErrorMsg(refCode) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlErrorMsg + "/delete/" + refCode, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // ERROR MESSAGE END

  // MINISTRY TYPE
  getMinistry(code) {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlAgency + '/' + code).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      // this.router.navigate(['user', code]);
    });
  }

  addMinistry(ministry) {

    // console.log(this.appConfig.urlSlides)
    // console.log(ministry)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.post(this.appConfig.urlMinistry + "/add/multiple", ministry)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateMinistry(ministry) {

    // console.log(this.appConfig.urlUsers + user.userId)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user) 
    return this.http.put(this.appConfig.urlMinistry + "/update/multiple", ministry)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delMinistry(refCode) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlMinistry + "/delete/code/" + refCode, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // MINISTRY END

  // AGENCY TYPE
  getAgency(code) {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlAgency + '/' + code).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      // this.router.navigate(['user', code]);
    });
  }

  addAgency(agency) {

    console.log(this.appConfig.urlAgency)
    console.log(agency)
    
    return this.http.post(this.appConfig.urlAgency, agency)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateAgency(agency) {

    console.log(this.appConfig.urlAgency)
    console.log(agency)
    
    // return this.http.put(this.appConfig.urlUsers + user.userId, user) 
    return this.http.put(this.appConfig.urlAgency, agency)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delAgency(refCode) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlAgency + "/" + refCode, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // AGENCY END

  // AGENCY APP TYPE
  getAgencyApp(code) {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlAgencyApp + '/' + code).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      // this.router.navigate(['user', code]);
    });
  }

  addAgencyApp(Agency) {
    return this.http.post(this.appConfig.urlAgencyApp, Agency)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateAgencyApp(Agency) {
    return this.http.put(this.appConfig.urlAgencyApp, Agency)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delAgencyApp(refCode) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlAgencyApp + "/" + refCode, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // AGENCY APP END

  // LANGUAGE
  getAllLanguage() {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlLanguage + '/all')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  addLanguage(language) {

    // console.log(this.appConfig.urlSlides)
    // console.log(Agency)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.post(this.appConfig.urlLanguage, language)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateLanguage(language) {

    // console.log(this.appConfig.urlUsers + user.userId)
    // console.log(Agency)
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

  // Start Poll Question - N
  addRecord(record) {
    let fullUrl = this.appConfig.urlPoll + "/question?language=" +this.languageId;
  
    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delRecord(enId, bmId) {
    let fullUrl = this.appConfig.urlPoll + "/question/delete/selected?id=" + enId + "," +bmId + "&language=" +this.languageId;

    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRecord(record) {
    let fullUrl = this.appConfig.urlPoll + "/question/multiple/update?language=" +this.languageId;

    return this.http.put(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // End Poll Question - N

  addRace(record) {
    let fullUrl = this.appConfig.urlRace + "?language=" + this.languageId;
    console.log(fullUrl)
    console.log(record)

    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRace(record) {
    let fullUrl = this.appConfig.urlRace + "?language=" + this.languageId ;
    
    return this.http.put(fullUrl, record)
        .map((response: Response) => response.json())
    .catch(this.handleError);
  }
    
  delRace(refCode) {
    let fullUrl = this.appConfig.urlRaceDelete + refCode + "?language=" + this.languageId;
    
    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  addReligion(record) {
    let fullUrl = this.appConfig.urlReligionList + "?language=" + this.languageId;
    console.log(fullUrl)
    console.log(record)

    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateReligion(record) {
    let fullUrl = this.appConfig.urlReligionList + "?language=" + this.languageId;
    
    return this.http.put(fullUrl, record)
        .map((response: Response) => response.json())
    .catch(this.handleError);
  }
    
  delReligion(refCode) {
    let fullUrl = this.appConfig.urlReligionList + '/' + refCode + "?language=" + this.languageId;
    
    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  addUserType(record) {
    let fullUrl = this.appConfig.urlUserTypeList + "?language=" + this.languageId;
    console.log(fullUrl)
    console.log(record)

    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateUserType(record) {
    let fullUrl = this.appConfig.urlUserTypeList + "?language=" + this.languageId ;
    
    return this.http.put(fullUrl, record)
        .map((response: Response) => response.json())
    .catch(this.handleError);
  }
    
  delUserType(refCode) {
    let fullUrl = this.appConfig.urlUserTypeDelete + refCode  + "?language=" + this.languageId;
    
    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  addIdentificationType(record) {
    let fullUrl = this.appConfig.urlIdentificationType + '/add/multiple' + "?language=" + this.languageId;
    console.log(fullUrl)
    console.log(record)

    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateIdentificationType(record) {
    let fullUrl = this.appConfig.urlIdentificationType + '/update/multiple' + "?language=" + this.languageId ;
    
    return this.http.put(fullUrl, record)
        .map((response: Response) => response.json())
    .catch(this.handleError);
  }
    
  delIdentificationType(refCode) {
    let fullUrl = this.appConfig.urlIdentificationType + '/delete/multiple/' + refCode  + "?language=" + this.languageId;
    
    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  addFaq(record) {
    let fullUrl = this.appConfig.urlFaqList + "?language=" + this.languageId ;
    console.log(fullUrl)
    console.log(record)

    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateFaq(record) {
    let fullUrl = this.appConfig.urlFaqList + "?language=" + this.languageId;
    
    return this.http.put(fullUrl, record)
        .map((response: Response) => response.json())
    .catch(this.handleError);
  }
    
  delFaq(refCode) {
    let fullUrl = this.appConfig.urlFaqList + '/' + refCode + "?language=" + this.languageId;
    
    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  addFooterCategory(record) {
    let fullUrl = this.appConfig.urlFooterCategory + "?language=" + this.languageId ;
    // let fullUrl = this.appConfig.urlFooterCategory + "?" + this.lang ;
    console.log(fullUrl)
    console.log(record)

    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateFooterCategory(record) {
    let fullUrl = this.appConfig.urlFooterCategory + "?language=" + this.languageId;
    
    return this.http.put(fullUrl, record)
        .map((response: Response) => response.json())
    .catch(this.handleError);
  }
    
  delFooterCategory(refCode) {
    let fullUrl = this.appConfig.urlFooterCategory + '/' + refCode + "?language=" + this.languageId;
    
    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getFooterCategoryList(){
    let fullUrl = this.appConfig.urlFooterCategory + '?active=true' + "&language=" + this.languageId;
    return this.http.get(fullUrl, null)
    .map((response: Response) => response.json().list)
    .catch(this.handleError);
  }

  addFooterContent(record) {
    let fullUrl = this.appConfig.urlFooterContent + "?language=" + this.languageId;
    // let fullUrl = this.appConfig.urlFooterCategory + "?" + this.lang ;
    console.log(fullUrl)
    console.log(record)

    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateFooterContent(record) {
    let fullUrl = this.appConfig.urlFooterContent  + "?language=" + this.languageId ;
    
    return this.http.put(fullUrl, record)
        .map((response: Response) => response.json())
    .catch(this.handleError);
  }
    
  delFooterContent(refCode) {
    let fullUrl = this.appConfig.urlFooterContent + '/' + refCode + "?language=" + this.languageId;
    
    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  // Start Address Type - N
  addRecordAddType(record) {
    let fullUrl = this.appConfig.urlAddressType + '?language='+this.languageId;

    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delRecordAddType(refCode) {
    let fullUrl = this.appConfig.urlAddressType  + "/" + refCode + '?language='+this.languageId;

    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRecordAddType(record) {
    let fullUrl = this.appConfig.urlAddressType + '?language='+this.languageId;

    return this.http.put(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // End Address Type - N

  // Start Account Status - N
  addRecordAccStatus(record) {
    let fullUrl = this.appConfig.urlAccountStatus + '?language='+this.languageId;
 
    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delRecordAccStatus(refCode) {
    let fullUrl = this.appConfig.urlAccountStatus + "/" + refCode + '?language='+this.languageId;

    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRecordAccStatus(record) {
    let fullUrl = this.appConfig.urlAccountStatus + '?language='+this.languageId;

    return this.http.put(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // End Account Status - N

  // Start Feedback Type - N
  addRecordFeedbackType(record) {
    let fullUrl = this.appConfig.urlFeedbackType + '?language='+this.languageId;
 
    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delRecordFeedbackType(refCode) {
    let fullUrl = this.appConfig.urlFeedbackType  + "/code/" + refCode + "?language="+this.languageId;

    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRecordFeedbackType(record) {
    let fullUrl = this.appConfig.urlFeedbackType + '?language='+this.languageId;

    return this.http.put(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // End Feedback Type - N

  // Start Feedback Subject - N
  addRecordFeedbackSubject(record) {
    let fullUrl = this.appConfig.urlFeedbackSubject + '?language='+this.languageId;
 
    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delRecordFeedbackSubject(refCode) {
    let fullUrl = this.appConfig.urlFeedbackSubject  + "/code/" + refCode + '?language='+this.languageId;

    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRecordFeedbackSubject(record) {
    let fullUrl = this.appConfig.urlFeedbackSubject + '?language='+this.languageId;

    return this.http.put(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // End Feedback Subject - N

  // Start System Settings - N
  addRecordSysSettings(record) {
    let fullUrl = this.appConfig.urlSystemSettings + '?language='+this.languageId;
 
    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delRecordSysSettings(key) {
    let fullUrl = this.appConfig.urlSystemSettings + "/" + key + '?language='+this.languageId;

    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRecordSysSettings(record) {
    let fullUrl = this.appConfig.urlSystemSettings + '?language='+this.languageId;

    return this.http.put(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // End System Settings - N

  // Start Feedback Visitor/Admin - N
  delRecordFeedback(id) {
    let fullUrl = this.appConfig.urlFeedback + "/" + id + "?language="+this.languageId;

    return this.http.delete(fullUrl , null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRecordFeedbackDraft(record) {
    let fullUrl = this.appConfig.urlFeedback + "/saveasdraft?language="+this.languageId;

    return this.http.put(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateRecordFeedbackReply(record) {
    let fullUrl = this.appConfig.urlFeedback + "/submitreply?language="+this.languageId;

    return this.http.put(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // End Feedback Visitor/Admin - N

  
  private handleError(error: Response) {
    const msg = `Status code ${error.status} on url ${error.url}`;
    console.error(msg);
    return Observable.throw(msg);

  }

  getStateData(): Observable<any[]> {
    //  console.log(this.countryUrl);
    return this.http.get(this.stateUrl + '?language='+this.languageId)
      .map((response: Response) => response.json().stateList)
      .retry(5)
      .catch(this.handleError);

  }

  getCitiesbyState(code): Observable<any[]> {
    return this.http.get(this.cityUrl + '/state/' + code + '?language='+this.languageId)
      .map((response: Response) => response.json().cityList)
      .retry(5)
      .catch(this.handleError);

  }

  getPostCodeData(code): Observable<any[]> {
    //  console.log(this.countryUrl);
    return this.http.get(this.postcodeUrl+ code + '?language='+this.languageId)
      .map((response: Response) => response.json().postcodeList)
      .retry(5)
      .catch(this.handleError);
  }

  getAdminUser(): Observable<any[]> {
    return this.http.get(this.appConfig.urlAdminUserList)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  errorResponse(data){
      this.toastr.error(data.statusDesc, ''); 
  }
}


