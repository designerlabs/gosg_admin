import { NgModule, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

const baseURL = environment.baseURL;
const mockApiURL = environment.mockApiURL;
let mediaURL = environment.mediaURL;

// const baseURL = 'http://10.1.17.12:3000/';

// // common service
// let portalBaseURL = 'http://localhost:8020/portal/';
// let protectedBaseURL = 'http://localhost:8021/portal-protected/';

const devURL = environment.uapURL;
const commonURL = devURL + 'service-admin-protected/';
const serviceURL = devURL + 'service/';


// let publicURL = 'http://10.1.70.148:8080/gosg-service-public/';

// let baseLocalURL = './app/apidata/';
// let searchServiceURL = 'https://www.malaysia.gov.my/public/';

export class AppConfig {
    apiEndpoint: string;
    urlCommon: string;
    urlService: string;
    urlMenu: string;
    baseURL: string;
    urlUsers: string;
    urlSlides: string;
    urlUserList: string;
    urlGroup: string;
    urlGroupList: string;
    urlModuleList: string;
    urlGroupModuleList: string;
    urlAnnounceList: string;
    urlGetLanguage: string;
    urlAdminUserList:string;
    urlSubCategoryList: string;
    urlAdminUserListUpdate: string;
    urlMediaType: string;
    urlMediaFileUpload: string;
    urlModule:string;
    urlModuleGroupList:string;
    urlAdminUserPermission:string;
    urlFooterCategory: string;
    lang: string;
    urlAdminUserFind: string;
    urlImageList: string;
    urlCategory: string;
    urlGetUser: string;
    urlModuleRef: string;
    externalMediaURL: string;
    urlHtmlParse: string;
    
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: '',
    urlCommon: commonURL,
    urlService: serviceURL,
    urlMenu: commonURL + 'menu',
    baseURL: 'http://localhost/locale-api/',
    urlUsers: baseURL + 'users/',
    urlGroup: baseURL + 'groups/',
    urlUserList: commonURL + 'usermanagement',
    urlSlides: commonURL + 'slide',  
    urlGetLanguage: serviceURL + 'language',  
    urlModule: commonURL + 'authorization/module',
    urlModuleRef: commonURL + 'authorization/module/url',
    urlModuleList: commonURL + 'authorization/module/moduleList',
    urlModuleGroupList: commonURL + 'authorization/module/group',
    urlGroupModuleList: mockApiURL + 'groupList',
    urlGroupList: commonURL + 'authorization/module/groupListView',
    urlGetUser: commonURL+'adminuser/detail',
    urlAdminUserFind: commonURL+'adminuser',
    urlAdminUserList: commonURL+'adminuser/userList',
    urlAdminUserListUpdate: commonURL + 'adminuser/assignAdminUserToModuleGroup/',
    urlAdminUserPermission: commonURL + 'adminuser/assignAdminUserToModulePermission',
    externalMediaURL: mediaURL+"media",
    urlFooterCategory: commonURL + 'footer',
    urlImageList: commonURL + 'media/category/name/Article',
    urlAnnounceList: commonURL + 'announcement/code',
    urlCategory: commonURL + 'content/category',
    urlSubCategoryList: './app/apidata/subcategory.json',
    urlMediaType: commonURL + 'mediatype',
    urlMediaFileUpload: commonURL + 'media',
    lang: 'language='+localStorage.getItem('langID'),
    urlHtmlParse: commonURL + 'htmlcontent/formathtml',
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule {}
