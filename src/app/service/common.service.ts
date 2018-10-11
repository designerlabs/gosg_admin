import { Injectable, Inject, OnDestroy } from '@angular/core';
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
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/retry';
import { ToastrService } from 'ngx-toastr';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable()
export class CommonService{

  showPlaceHolderEn = "Category Parents";
  showPlaceHolderBm = "Induk Kategori";
  showFilterEn = "Type your filter here...";
  showFilterBm = "Taip tapisan di sini...";

  mampuIdEn = 203;
  mampuIdBm = 196;
  mampuCode = 101;

  sliderCategoryCode = 4;
  galleryCategoryCode = 39;
  lifeEventCategoryCode = 643;
  contentCategoryCode = 675;
  participationCategoryCode = 658;

  sliderContentCategoryIdEn = 15;
  sliderContentCategoryIdBm = 16;

  galleryContentCategoryIdEn = 2;
  galleryContentCategoryIdBm = 10;

  participationContentCategoryIdEn = 665;
  participationContentCategoryIdBm = 666;

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
  messageSuccess:any;

  pageMode: String;

  isDelete:boolean;
  isRead:boolean;
  isWrite:boolean;
  isUpdate:boolean;

  icon = {
    update: 'fa fa-edit',
    undo: 'fa fa-undo',
    check: 'fa fa-check',
    times: 'fa fa-times',
    trash: 'fa fa-trash',
    plus: 'fa fa-plus',
    plusSquare: 'fa fa-plus-square',
    arrLeft: 'fa fa-angle-left',
    arrRight: 'fa fa-angle-right',
    refresh: 'fa fa-refresh',
    view: 'fa fa-eye',
    archive: 'fa fa-archive',
    search: 'fa fa-search',
    history: 'fa fa-history',
    forward: 'fa fa-share'
  }

  pageSize =  [
    {"id": 1, "size": 10},
    {"id": 2, "size": 25},
    {"id": 3, "size": 50}
  ];
  defaultPageSize = this.pageSize[0].size;

  valueContent = [
    {"id": 1, "text": "Slider"},
    {"id": 2, "text": "Gallery"},
    {"id": 3, "text": "Life Event"},
    {"id": 4, "text": "Content"}
  ];
  defaultValContent = this.valueContent[0].id;

  listStatusPublisher = [
    {"id": 1, "textEn": "All", "textBm": "Semua"},
    {"id": 2, "textEn": "Draft", "textBm": "Draf"},
    {"id": 3, "textEn": "Pending for Approval", "textBm": "Menunggu untuk Kelulusan"},
    {"id": 4, "textEn": "Approved", "textBm": "Telah Lulus"}
  ];
  defaultStatusPublisher = this.listStatusPublisher[0].id;

  listStatusCreator = [
    {"id": 1, "textEn": "All", "textBm": "Semua"},
    {"id": 2, "textEn": "Draft", "textBm": "Draf"},
    {"id": 3, "textEn": "Pending for Approval", "textBm": "Menunggu untuk Kelulusan"},
    {"id": 4, "textEn": "Approved", "textBm": "Telah Lulus"}
  ]
  defaultStatusCreator = this.listStatusCreator[0].id;
  textVal: string;


  // tslint:disable-next-line:max-line-length
  constructor(
    public http: Http,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {

       /* LANGUAGE FUNC */

        const myLang = translate.currentLang;

        if (myLang == 'en') {
            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.languageId = 1;
            });

        }
        if (myLang == 'ms') {
            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.languageId = 2;
            });
        }

    });

    if(!this.languageId){
      if(localStorage.getItem('langID')){
        this.languageId = localStorage.getItem('langID');
      }else{
        this.languageId = 1;
      }

    }
    // translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   translate.get('HOME').subscribe((res: any) => {
    //     this.readPortal('language/all').subscribe((data:any) => {
    //       let getLang = data.list;
    //       let myLangData =  getLang.filter(function(val) {
    //         if(val.languageCode == translate.currentLang){
    //           this.lang = val.languageCode;
    //           this.languageId = val.languageId;
    //           this.getUsersData(this.pageCount, this.pageSize);
    //         }
    //       }.bind(this));
    //     })
    //   });
    // });
    // if(!this.languageId){
    //   if(localStorage.getItem('langID')){
    //     this.languageId = localStorage.getItem('langID');
    //   }else{
    //     this.languageId = 1;
    //   }

    // }

    /* LANGUAGE FUNC */
          // var that = this; // no need of this line


     }
  lang = this.lang;
  private usersUrl: string = this.appConfig.urlUsers;
  private slidersUrl: string = this.appConfig.urlSlides;
  private getUserUrl: string = this.appConfig.urlGetUser;


  getInitialMessage(){

    this.messageSuccess = "";

    setTimeout(()=>{
      this.messageSuccess = `<span class="alert alert-secondary">${this.translate.instant('common.msg.waitmsg')}</span>`;
    },500);

    setTimeout(()=>{    //<<<---    using ()=> syntax
          this.messageSuccess = `<span class="alert alert-danger">${this.translate.instant('common.msg.unauthorized')}</span>`;

    }, 5000);
  }


  getUsersData(): Observable<any[]> {
    return this.http.get(this.usersUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getUsersDetails(): Observable<any[]> {
    if(!environment.staging){
      return this.http.get(this.getUserUrl+'?language='+this.languageId)
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
        this.router.navigate(['articletbl', topicID]);
      });
    }else if (this.mainid === 1 && topicID === 4) {
      return this.http.get(this.appConfig.urlUserList + '?page=1&size=10&language='+this.languageId)
      .subscribe(Rdata => {
        this.dataTbl = Rdata;
        this.router.navigate(['userlist']);
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


  getModuleList(id){
    return this.http.get(this.appConfig.urlModuleList+'/'+id+'?language='+this.languageId)
    .map((response: Response) => response.json()[0])
    .catch(this.handleError);
  }

  getModuleListAll(){
    return this.http.get(this.appConfig.urlModuleList+'/all?language='+this.languageId)
    .map((response: Response) => response.json()[0])
    .catch(this.handleError);
  }


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


  getCategoryData() {
    return this.http.get(this.appConfig.urlCategory + '?language='+this.languageId)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }


  pageModeChange(isEdit: boolean) {
    if(isEdit === true){
      if(this.languageId == 1){
        this.pageMode = "Update"
      }
      else{
        this.pageMode = "Kemaskini"
      }
    }
    else{
      if(this.languageId == 1){
        this.pageMode = "Add"
      }
      else{
        this.pageMode = "Tambah"
      }
    }
    return this.pageMode;
  }

  // Media Ends
// Media Types starts
getMediaType() {
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

  // GALLERY
  getGallery(code) {
    return this.http.get(this.appConfig.urlSlides + '/' + code).subscribe(
      Rdata => {
      this.dataTbl = Rdata;
    });
  }

  addGallery(gallery) {

    return this.http.post(this.appConfig.urlSlides+ '?language='+this.languageId, gallery)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateGallery(gallery) {
    return this.http.put(this.appConfig.urlSlides+ "/multiple/update"+ '?language='+this.languageId, gallery)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delGallery(enId, bmId) {

    return this.http.delete(this.appConfig.urlSlides + "/delete/selected?id=" + enId + "," +bmId+ '?language='+this.languageId, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  // GALLERY END
  //ANNOUNCEMENT STARTS

  getAnnounceTblData() { //For view table
    return this.http.get(this.appConfig.urlAnnounceList)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }


  // LANGUAGE
  getAllLanguage() {
    return this.http.get(this.appConfig.urlGetLanguage + '/all')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }


  getFooterCategoryList(){
    let fullUrl = this.appConfig.urlFooterCategory + '?active=true' + "&language=" + this.languageId;
    return this.http.get(fullUrl, null)
    .map((response: Response) => response.json().list)
    .catch(this.handleError);
  }



  public handleError = (error: Response) => {
    return Observable.throw(error);
  }


  errorHandling(err, callback){
    if(err.statusCode){
      let statusCode = err.statusCode.toLowerCase();
      if(statusCode == 'error'){
        this.toastr.error(err.statusDesc, '');
      }else{
        callback()
      }
   }else{
     callback()
    }
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


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

  readPortal(moduleName, page?, size?, keyword?, lng?): Observable<any[]> {
    let readUrl;
    if(!keyword && page) {
      readUrl = this.appConfig.urlService + moduleName + '?page=' + page + '&size=' + size  + '&language='+lng;
    } else if(keyword) {
      readUrl = this.appConfig.urlService + moduleName + '?keyword='+keyword+'&page=' + page + '&size=' + size  + '&language='+lng;
    } else {
      readUrl = this.appConfig.urlService + moduleName + '?language='+lng;
    }

    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  readProtected(moduleName, page?, size?, keyword?, lng?): Observable<any[]> {
    let readUrl;

    if(!keyword && page) {
      readUrl = this.appConfig.urlCommon + moduleName + '?page=' + page + '&size=' + size  + '&language='+lng;
    } else if(keyword) {
      readUrl = this.appConfig.urlCommon + moduleName + '?keyword='+keyword+'&page=' + page + '&size=' + size  + '&language='+lng;
    } else {
      readUrl = this.appConfig.urlCommon + moduleName + '?language='+lng;
    }

    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  readPortalById(moduleName, id, lng?): Observable<any[]> {
    let readUrl = this.appConfig.urlService + moduleName + id + '?language='+lng;
    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  readProtectedById(moduleName, id, lng?): Observable<any[]> {
    let readUrl = this.appConfig.urlCommon + moduleName + id + '?language='+lng;
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

  updateParam(data,moduleName, param) {
    let updateUrl = this.appConfig.urlCommon  + moduleName +'?language='+this.languageId+param;

    return this.http.put(updateUrl, data)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delete(id,moduleName) {
    let deleteUrl = this.appConfig.urlCommon  + moduleName + id+ '?language='+this.languageId;

    return this.http.delete(deleteUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getlistReport(){
    let readUrl = this.appConfig.urlmibis+"mibis/widget/list/REPORT";
    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  getViewReport(id){
    let readUrl = this.appConfig.urlmibis+"mibis/widget/url/get/"+id+"/without-param";
    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
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
            // return val.languageId
          } else {
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
    };
    this.defaultPageSize = 10;

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

            });
        }

      }
    )}
}
