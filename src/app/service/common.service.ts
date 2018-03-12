import { Injectable, Inject } from '@angular/core';
import {Http, Request, RequestOptionsArgs, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import {map} from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, RouterModule, ParamMap } from '@angular/router';
import { ObservableInput } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import "rxjs/add/observable/throw";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/retry';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable()
export class CommonService {
  isAdmin: boolean;
  getDataT: any;
  userID: any;
  refModuleId: any;
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
  strLang: String = "language=";
  
  pageMode: String;

  isDelete:boolean;
  isRead:boolean;
  isWrite:boolean;
  isUpdate:boolean;

  icon = {
    update: 'fa fa-edit',
    check: 'fa fa-check',
    times: 'fa fa-times',
    trash: 'fa fa-trash',
    plus: 'fa fa-plus',
    arrLeft: 'fa fa-angle-left',
    arrRight: 'fa fa-angle-right',
    refresh: 'fa fa-refresh',
    view: 'fa fa-eye'
  }


  pageSize =  [
    {"id": 1, "size": 10},
    {"id": 2, "size": 25},
    {"id": 3, "size": 50}
  ];
  defaultPageSize = this.pageSize[0].size;

  // tslint:disable-next-line:max-line-length
  constructor(
    public http: Http,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {

       /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.readPortal('language/all').subscribe((data:any) => {
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
      if(localStorage.getItem('langID')){
        this.languageId = localStorage.getItem('langID');
      }else{
        this.languageId = 1;
      }
      
    }

    /* LANGUAGE FUNC */
     }
  lang = this.lang;
  private usersUrl: string = this.appConfig.urlUsers;
  // private errMsgUrl: string = this.appConfig.urlErrorMsg;
  private slidersUrl: string = this.appConfig.urlSlides;
  private stateUrl: string = this.appConfig.urlStateList;
  private cityUrl: string = this.appConfig.urlCityList;
  // private postcodeUrl:string = this.appConfig.urlPostcode;
  private getUserUrl: string = this.appConfig.urlGetUser;

  
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

  getUsersDetails(): Observable<any[]> {
    if(!environment.staging){
      return this.http.get(this.getUserUrl+'?langId='+this.languageId)
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }
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

    return this.http.put(this.appConfig.urlUserList + '/' + user.userId + '?language='+this.languageId, user)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateUserStatus(userId, accStatusId) {

    return this.http.put(this.appConfig.urlUserList + '/status/' + userId + '/'+accStatusId, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  // Color

  // addColor(Color) {
    
  //   return this.http.post(this.appConfig.urlColor + '?language='+this.languageId, Color)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateColor(Color) {

  //   return this.http.put(this.appConfig.urlColor + '?language='+this.languageId, Color)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delColor(ColorId) {

  //   // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
  //   return this.http.delete(this.appConfig.urlColor + '/' + ColorId+ '?language='+this.languageId, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
  // Color END

  // FONT

  // addFont(font) {
    
  //   return this.http.post(this.appConfig.urlFont + '?language='+this.languageId, font)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateFont(font) {

  //   return this.http.put(this.appConfig.urlFont + '?language='+this.languageId, font)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delFont(fontId) {
   
  //   return this.http.delete(this.appConfig.urlFont + '/id/' + fontId+ '?language='+this.languageId, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
  // FONT END

  // MODULE
  getModMenuBySearch(keyword) {
    return this.http.get(this.appConfig.urlModule+'/menu/search?keyword='+keyword+'&language='+this.languageId)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getModMenuLocalBySearch(keyword) {
    return this.http.get(this.appConfig.urlModule+'/menu/localhost/search?keyword='+keyword+'&language='+this.languageId)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getModMenu() {
    return this.http.get(this.appConfig.urlModule+'/menu?language='+this.languageId)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getModMenuLocal() {
    return this.http.get(this.appConfig.urlModule+'/menu/localhost?language='+this.languageId)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  // addModMenu(modmenu) {

    // console.log(this.appConfig.urlSlides)
    // console.log(ministry)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
  //   return this.http.post(this.appConfig.urlModule + '?language='+this.languageId, modmenu)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateModMenu(modmenu) {

  //   return this.http.put(this.appConfig.urlModule + '?language='+this.languageId, modmenu)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delModMenu(modmenuId) {

  //   // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
  //   return this.http.delete(this.appConfig.urlModule + '/' + modmenuId+ '?language='+this.languageId, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
  // MODULE END

  getModuleList(id){
    return this.http.get(this.appConfig.urlModuleList+'/'+id+'?language='+this.languageId)
    .map((response: Response) => response.json()[0])
    .catch(this.handleError);
  }

  // deleteModuleList(id){
  //   return this.http.delete(this.appConfig.urlModule+'/'+id+'?language='+this.languageId)
  //   .map((response: Response) => response.json()[0])
  //   .catch(this.handleError);
  // }

  getModuleListAll(){
    return this.http.get(this.appConfig.urlModuleList+'/all?language='+this.languageId)
    .map((response: Response) => response.json()[0])
    .catch(this.handleError);
  }

  // updateModuleList(data){
  //   return this.http.put(this.appConfig.urlModuleList+'/update?language='+this.languageId, data)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }


  // addModuleGroup(data){
  //   return this.http.post(this.appConfig.urlModuleGroupList+'?language='+this.languageId, data)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }


  // deleteModuleGroup(id){
  //   return this.http.delete(this.appConfig.urlModuleGroupList+'/'+id+'?language='+this.languageId)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  getUserList(id){
    return this.http.get(this.appConfig.urlCommon+'adminuser/'+id+'?language='+this.languageId)
    .map((response: Response) => response.json().adminUserDetails)
    .catch(this.handleError);
  }

  getAllUserList(){
    return this.http.get(this.appConfig.urlCommon+'usermanagement')
    .map((response: Response) => response.json().userList)
    .catch(this.handleError);
  }

  requestUrl(url){
    return this.http.post(this.appConfig.urlModuleRef+'?requestUrl='+url,'')
    .map((response: Response) => response.json())
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


  updateUserPermission(id, data, val){
    return this.http.put(this.appConfig.urlAdminUserPermission+'/'+id+'?language='+this.languageId+'&isSuperAdmin='+val, data)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }


  updateSuperAdmin(id,val){
    return this.http.put(this.appConfig.urlAdminUserFind+'/'+id+'?isSuperAdmin='+val+'&language='+this.languageId,'')
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

  // getFaqData() {
  //   console.log(this.appConfig.urlFaq);
  //   return this.http.get(this.appConfig.urlFaq)
  //   .map((response: Response) => response.json().faqCodeList)
  //   .catch(this.handleError);
  // }

  getCategoryData() {
    console.log(this.appConfig.urlCategory);
    return this.http.get(this.appConfig.urlCategory + '?language='+this.languageId)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getImageList() {
    console.log(this.appConfig.urlImageList);
    return this.http.get(this.appConfig.urlImageList)
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

  // getFeedbackType(){
  //   return this.http.get(this.appConfig.urlFbTypeList + 'type/?language='+this.languageId)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

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
  console.log(this.appConfig.urlMediaType + '?language='+this.languageId);
  return this.http.get(this.appConfig.urlMediaType)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

addMediaType(mediaTypeId, mediaTypeVal) {
  return this.http.post(this.appConfig.urlMediaType + "/" + mediaTypeId, mediaTypeVal)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

updateMediaType(mediaTypeId,mediaTypeVal) {
  return this.http.put(this.appConfig.urlMediaType + "/" + mediaTypeId, mediaTypeVal)
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

UpdateMediaFileUpload(mediaFile) {
  return this.http.put(this.appConfig.urlMediaFileUpload, mediaFile)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

addMediaFileUpload(mediaFile) {
  return this.http.post(this.appConfig.urlMediaFileUpload, mediaFile)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

delMediaFileUpload(mediaFile) {
  return this.http.delete(this.appConfig.urlMediaFileUpload + "/id/" + mediaFile)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

getMediaByCateId(id){
  return this.http.delete(this.appConfig.urlMediaFileUpload + "/category/id/" + id)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

// Media File upload ends

// Get Category List
getCategoryList1() {
  console.log(this.appConfig.urlMediaFileUpload);
  return this.http.get(this.appConfig.urlMediaFileUpload)
  .map((response: Response) => response.json())
  .catch(this.handleError);
}

  // SLIDER
  // getSlider(code) {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    // return this.http.get(this.appConfig.urlSlides + '/' + code+ '?language='+this.languageId).subscribe(
    //   Rdata => {
    //   this.dataTbl = Rdata;
      // this.router.navigate(['user', code]);
  //   });
  // }

  // addSlider(slider) {

    // console.log(this.appConfig.urlSlides)
    // console.log(slider)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
  //   return this.http.post(this.appConfig.urlSlides+ '?language='+this.languageId, slider)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateSlider(slider) {

    // console.log(this.appConfig.urlUsers + user.userId)
    // console.log(slider)
    // debugger;
    // return this.http.put(this.appConfig.urlUsers + user.userId, user) 
  //   return this.http.put(this.appConfig.urlSlides+ "/multiple/update"+ '?language='+this.languageId, slider)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delSlider(enId, bmId) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
  //   return this.http.delete(this.appConfig.urlSlides + "/delete/selected?id=" + enId + "," +bmId+ '?language='+this.languageId, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
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
    
    return this.http.post(this.appConfig.urlSlides+ '?language='+this.languageId, gallery)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateGallery(gallery) {

    // console.log(this.appConfig.urlUsers + user.userId)
    // console.log(slider)
    // debugger;
    // return this.http.put(this.appConfig.urlUsers + user.userId, user) 
    return this.http.put(this.appConfig.urlSlides+ "/multiple/update"+ '?language='+this.languageId, gallery)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delGallery(enId, bmId) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlSlides + "/delete/selected?id=" + enId + "," +bmId+ '?language='+this.languageId, null)
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
  // getErrorMsg(errMsgId) {
  //   // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
  //   return this.http.get(this.appConfig.urlErrorMsg + '/' + errMsgId).subscribe(
  //     Rdata => {
  //     this.dataTbl = Rdata;
  //     // this.router.navigate(['user', code]);
  //   });
  // }

  // addErrorMsg(errormsg) {
    
  //   return this.http.post(this.appConfig.urlErrorMsg, errormsg)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateErrorMsg(errormsg) {

  //   return this.http.put(this.appConfig.urlErrorMsg+ "/multiple/update", errormsg)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delErrorMsg(refCode) {

  //   // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
  //   return this.http.delete(this.appConfig.urlErrorMsg + "/delete/" + refCode, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
  // ERROR MESSAGE END

  // MINISTRY TYPE

  addMinistry(ministry) {

    // console.log(this.appConfig.urlSlides)
    // console.log(ministry)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.post(this.appConfig.urlMinistry + "/add/multiple"+ '?language='+this.languageId, ministry)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateMinistry(ministry) {

    // console.log(this.appConfig.urlUsers + user.userId)
    // return this.http.put(this.appConfig.urlUsers + user.userId, user) 
    return this.http.put(this.appConfig.urlMinistry + "/update/multiple"+ '?language='+this.languageId, ministry)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delMinistry(refCode) {

    // return this.http.put(this.appConfig.urlUsers + user.userId, user)
    
    return this.http.delete(this.appConfig.urlMinistry + "/delete/code/" + refCode+ '?language='+this.languageId, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // MINISTRY END

  // AGENCY TYPE
  getAgency(code) {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlAgency + '/' + code+ '?language='+this.languageId).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      // this.router.navigate(['user', code]);
    });
  }

  // addAgency(agency) {

  //   return this.http.post(this.appConfig.urlAgency+ '?language='+this.languageId, agency)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateAgency(agency) {

  //   console.log(this.appConfig.urlAgency)
  //   console.log(agency)
    
  //   // return this.http.put(this.appConfig.urlUsers + user.userId, user) 
  //   return this.http.put(this.appConfig.urlAgency+ '?language='+this.languageId, agency)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delAgency(refCode) {

  //   // return this.http.put(this.appConfig.urlUsers + user.userId, user)
  //   console.log(this.appConfig.urlAgency + "/" + refCode+ '?language='+this.languageId)
    
  //   return this.http.delete(this.appConfig.urlAgency + "/" + refCode+ '?language='+this.languageId, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
  // AGENCY END

  // AGENCY APP
  getAgencyApp(code) {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlAgencyApp + '/' + code+ '?language='+this.languageId).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
      // this.router.navigate(['user', code]);
    });
  }

  addAgencyApp(agencyapp) {
    return this.http.post(this.appConfig.urlAgencyApp+ '/add?language='+this.languageId, agencyapp)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateAgencyApp(agencyapp) {
    return this.http.put(this.appConfig.urlAgencyApp+ '/update?language='+this.languageId, agencyapp)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delAgencyApp(refCode) {

    return this.http.delete(this.appConfig.urlAgencyApp + "/" + refCode+ '?language='+this.languageId, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // AGENCY APP END

  // LANGUAGE
  getAllLanguage() {
    // return this.http.get(this.appConfig.urlUserList + '/' + code + '?langId=1').subscribe(
    return this.http.get(this.appConfig.urlGetLanguage + '/all')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  // addLanguage(language) {

  //   return this.http.post(this.appConfig.urlLanguage + '?language='+this.languageId, language)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateLanguage(language) {

  //   return this.http.put(this.appConfig.urlLanguage + '?language='+this.languageId, language)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delLanguage(langId) {

  //   return this.http.delete(this.appConfig.urlLanguage + "/" + langId + "?language="+this.languageId, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
  // LANGUAGE END

  // Start Poll Question - N
  // addRecord(record) {
  //   let fullUrl = this.appConfig.urlPoll + "/question?language=" +this.languageId;
  
  //   return this.http.post(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delRecord(enId, bmId) {
  //   let fullUrl = this.appConfig.urlPoll + "/question/delete/selected?id=" + enId + "," +bmId + "&language=" +this.languageId;

  //   return this.http.delete(fullUrl, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateRecord(record) {
  //   let fullUrl = this.appConfig.urlPoll + "/question/multiple/update?language=" +this.languageId;

  //   return this.http.put(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
  // End Poll Question - N

  // addRace(record) {
  //   let fullUrl = this.appConfig.urlRace + "?language=" + this.languageId;
  //   console.log(fullUrl)
  //   console.log(record)

  //   return this.http.post(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateRace(record) {
  //   let fullUrl = this.appConfig.urlRace + "?language=" + this.languageId ;
    
  //   return this.http.put(fullUrl, record)
  //       .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
    
  // delRace(refCode) {
  //   let fullUrl = this.appConfig.urlRaceDelete + refCode + "?language=" + this.languageId;
    
  //   return this.http.delete(fullUrl, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // addReligion(record) {
  //   let fullUrl = this.appConfig.urlReligionList + "?language=" + this.languageId;
  //   console.log(fullUrl)
  //   console.log(record)

  //   return this.http.post(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateReligion(record) {
  //   let fullUrl = this.appConfig.urlReligionList + "?language=" + this.languageId;
    
  //   return this.http.put(fullUrl, record)
  //       .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
    
  // delReligion(refCode) {
  //   let fullUrl = this.appConfig.urlReligionList + '/' + refCode + "?language=" + this.languageId;
    
  //   return this.http.delete(fullUrl, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // addUserType(record) {
  //   let fullUrl = this.appConfig.urlUserTypeList + "?language=" + this.languageId;
  //   console.log(fullUrl)
  //   console.log(record)

  //   return this.http.post(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateUserType(record) {
  //   let fullUrl = this.appConfig.urlUserTypeList + "?language=" + this.languageId ;
    
  //   return this.http.put(fullUrl, record)
  //       .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
    
  // delUserType(refCode) {
  //   let fullUrl = this.appConfig.urlUserTypeDelete + refCode  + "?language=" + this.languageId;
    
  //   return this.http.delete(fullUrl, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

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

  // addFooterCategory(record) {
  //   let fullUrl = this.appConfig.urlFooterCategory + "?language=" + this.languageId ;
    // let fullUrl = this.appConfig.urlFooterCategory + "?" + this.lang ;
  //   console.log(fullUrl)
  //   console.log(record)

  //   return this.http.post(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateFooterCategory(record) {
  //   let fullUrl = this.appConfig.urlFooterCategory + "?language=" + this.languageId;
    
  //   return this.http.put(fullUrl, record)
  //       .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
    
  // delFooterCategory(refCode) {
  //   let fullUrl = this.appConfig.urlFooterCategory + '/' + refCode + "?language=" + this.languageId;
    
  //   return this.http.delete(fullUrl, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

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
  // addRecordAddType(record) {
  //   let fullUrl = this.appConfig.urlAddressType + '?language='+this.languageId;

  //   return this.http.post(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delRecordAddType(refCode) {
  //   let fullUrl = this.appConfig.urlAddressType  + "/" + refCode + '?language='+this.languageId;

  //   return this.http.delete(fullUrl, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateRecordAddType(record) {
  //   let fullUrl = this.appConfig.urlAddressType + '?language='+this.languageId;

  //   return this.http.put(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
  // End Address Type - N

  // Start Account Status - N
  // addRecordAccStatus(record) {
  //   let fullUrl = this.appConfig.urlAccountStatus + '?language='+this.languageId;
 
  //   return this.http.post(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delRecordAccStatus(refCode) {
  //   let fullUrl = this.appConfig.urlAccountStatus + "/" + refCode + '?language='+this.languageId;

  //   return this.http.delete(fullUrl, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateRecordAccStatus(record) {
  //   let fullUrl = this.appConfig.urlAccountStatus + '?language='+this.languageId;

  //   return this.http.put(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
  // // End Account Status - N

  // Start Feedback Type - N
  // addRecordFeedbackType(record) {
  //   let fullUrl = this.appConfig.urlFeedbackType + '?language='+this.languageId;
 
  //   return this.http.post(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delRecordFeedbackType(refCode) {
  //   let fullUrl = this.appConfig.urlFeedbackType  + "/code/" + refCode + "?language="+this.languageId;

  //   return this.http.delete(fullUrl, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateRecordFeedbackType(record) {
  //   let fullUrl = this.appConfig.urlFeedbackType + '?language='+this.languageId;

  //   return this.http.put(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
  // End Feedback Type - N

  // Start Feedback Subject - N
  // addRecordFeedbackSubject(record) {
  //   let fullUrl = this.appConfig.urlFeedbackSubject + '?language='+this.languageId;
 
  //   return this.http.post(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delRecordFeedbackSubject(refCode) {
  //   let fullUrl = this.appConfig.urlFeedbackSubject  + "/code/" + refCode + '?language='+this.languageId;

  //   return this.http.delete(fullUrl, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateRecordFeedbackSubject(record) {
  //   let fullUrl = this.appConfig.urlFeedbackSubject + '?language='+this.languageId;

  //   return this.http.put(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
  // End Feedback Subject - N

  // Start System Settings - N
  // addRecordSysSettings(record) {
  //   let fullUrl = this.appConfig.urlSystemSettings + '?language='+this.languageId;
 
  //   return this.http.post(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delRecordSysSettings(key) {
  //   let fullUrl = this.appConfig.urlSystemSettings + "/" + key + '?language='+this.languageId;

  //   return this.http.delete(fullUrl, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // updateRecordSysSettings(record) {
  //   let fullUrl = this.appConfig.urlSystemSettings + '?language='+this.languageId;

  //   return this.http.put(fullUrl, record)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }
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


  // Start Category - N
  addCategory(record) {
    let fullUrl = this.appConfig.urlCategory + '/post?language='+this.languageId;
 
    return this.http.post(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delCategory(id) {
    let fullUrl = this.appConfig.urlCategory + "/delete/selected/" + id + '?language='+this.languageId;

    return this.http.delete(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateCategory(record) {
    let fullUrl = this.appConfig.urlCategory + '/update?language='+this.languageId;

    return this.http.put(fullUrl, record)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // End Start Category - N

  
  public handleError = (error: Response) => {
    return Observable.throw(error);
  }

  // getStateData(): Observable<any[]> {
  //   //  console.log(this.countryUrl);
  //   return this.http.get(this.stateUrl + '/all?language='+this.languageId)
  //     .map((response: Response) => response.json())
  //     .retry(5)
  //     .catch(this.handleError);

  // }

  errorHandling(err, callback){
    if(err.statusCode){
      let statusCode = err.statusCode.toLowerCase();
      if(statusCode == 'error'){
        this.toastr.error(err.statusDesc, 'Error');
      }else{
        callback()
      }
   }else{
     callback()
    }
  }

  // getCitiesbyState(code): Observable<any[]> {
  //   return this.http.get(this.cityUrl + '/state/' + code + '?language='+this.languageId)
  //     .map((response: Response) => response.json())
  //     .retry(5)
  //     .catch(this.handleError);

  // }

  // getPostCodeData(code): Observable<any[]> {
  //   //  console.log(this.countryUrl);
  //   return this.http.get(this.postcodeUrl+ code + '?language='+this.languageId)
  //     .map((response: Response) => response.json())
  //     .retry(5)
  //     .catch(this.handleError);
  // }

  getCategoryList(){
    let fullUrl = this.appConfig.urlCategory + '?language=' + this.languageId;
    return this.http.get(fullUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getAdminUser(): Observable<any[]> {
    return this.http.get(this.appConfig.urlAdminUserList)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }


  // NEW
  
  readPortal(moduleName, page?, size?, keyword?): Observable<any[]> {
    let readUrl;
    
    if(!keyword && page) {
      readUrl = this.appConfig.urlService + moduleName + '?page=' + page + '&size=' + size  + '&language='+this.languageId;
    } else if(keyword) {
      readUrl = this.appConfig.urlService + moduleName + '?keyword='+keyword+'&page=' + page + '&size=' + size  + '&language='+this.languageId;
    } else {
      readUrl = this.appConfig.urlService + moduleName + '?language='+this.languageId;
    }

    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }
  
  readProtected(moduleName, page?, size?, keyword?): Observable<any[]> {
    let readUrl;
    
    if(!keyword && page) {
      readUrl = this.appConfig.urlCommon + moduleName + '?page=' + page + '&size=' + size  + '&language='+this.languageId;
    } else if(keyword) {
      readUrl = this.appConfig.urlCommon + moduleName + '?keyword='+keyword+'&page=' + page + '&size=' + size  + '&language='+this.languageId;
    } else {
      readUrl = this.appConfig.urlCommon + moduleName + '?language='+this.languageId;
    }

    console.log(readUrl)

    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }
  
  readPortalById(moduleName, id): Observable<any[]> {
    let readUrl = this.appConfig.urlService + moduleName + id + '?language='+this.languageId;
    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }
  
  readProtectedById(moduleName, id): Observable<any[]> {
    let readUrl = this.appConfig.urlCommon + moduleName + id + '?language='+this.languageId;
    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }
    
  create(data, moduleName) {
    let createUrl = this.appConfig.urlCommon   + moduleName + '?language='+this.languageId;
  
    return this.http.post(createUrl, data)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  update(data,moduleName) {
    let updateUrl = this.appConfig.urlCommon  + moduleName +'?language='+this.languageId;

    return this.http.put(updateUrl, data)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delete(id,moduleName) {
    let deleteUrl = this.appConfig.urlCommon  + moduleName + id+ '?language='+this.languageId;
    console.log(deleteUrl)

    return this.http.delete(deleteUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  // END NEW

  errorResponse(data){
      this.toastr.error(data.statusDesc, ''); 
  }

  getLanguageId() {
    this.readPortal('language/all').subscribe((data:any) => {
      let getLang = data.list;
      let myLangData =  getLang.filter(function(val) {
        if(val.isDefault == true){
          if(!localStorage.getItem('langID')) {
            debugger;
            // return val.languageId
          } else {
            debugger;
            // return localStorage.getItem('langID');
          }
        }
      }.bind(this));
    })
  }


  getModuleId(){

    if(environment.staging){
      this.isDelete = true;
      this.isRead = true;
      this.isWrite = true;
      this.isUpdate = true;
    }else{
      let urlRef = window.location.pathname.split('/')
      let urlSplit = urlRef.splice(0, 2);
      let urlJoin = urlRef.join('/');

      this.requestUrl(urlJoin).subscribe(
        data => {
          this.refModuleId = data.moduleId;
        },
        error => {
          
        },() => {
            this.getUserData();
          
        })
    }
    
  };


  getUserData(){
  
    this.getUsersDetails().subscribe(
      dataC => {

        if(dataC['adminUser']){
          if(dataC['adminUser'].superAdmin){
            this.isAdmin = true;
            this.isDelete = true;
            this.isRead = true;
            this.isWrite = true;
            this.isUpdate = true;
          }else{
            this.isAdmin = false;
           this.userID = dataC['adminUser'].userId;
            
          }
        }else{
          
        }
        
      },
    error => {
      
      },() => {
        if(!this.isAdmin){
          this.getUserList(this.userID).subscribe(
            dataT => {
              
              this.getDataT = dataT.data[1].items;
  
              let firstLvlFltr =  this.getDataT.filter(function(fdata) {
                
                fdata.modules.filter(function(second){
                  if(second.moduleId == this.refModuleId){
                    this.isDelete = second.permission.isDelete;
                    this.isRead = second.permission.isRead;
                    this.isWrite = second.permission.isWrite;
                    this.isUpdate = second.permission.isUpdate;
                  }
            
                }.bind(this))
              }.bind(this));
  
            }, error => {
              
            }
          );
        }
       
      }
    )}
}


