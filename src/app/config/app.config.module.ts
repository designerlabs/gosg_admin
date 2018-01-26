import { NgModule, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

const baseURL = 'http://localhost/locale-api/';
// const baseURL = 'http://10.1.17.12:3000/';

// // common service
// let portalBaseURL = 'http://localhost:8020/portal/';
// let protectedBaseURL = 'http://localhost:8021/portal-protected/';
const commonURL = 'http://10.1.70.148:8080/service-admin-protected/';
// let publicURL = 'http://10.1.70.148:8080/gosg-service-public/';

// let baseLocalURL = './app/apidata/';
// let searchServiceURL = 'https://www.malaysia.gov.my/public/';

export class AppConfig {
    apiEndpoint: string;
    urlMenu: string;
    urlCommon: string;
    baseURL: string;
    urlUsers: string;
    urlUserList: string;
    urlFbTypeList: string;
    urlGroup: string;
    urlGroupList: string;
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: '',
    urlMenu: commonURL + 'menu/list?',
    urlCommon: 'http://10.1.70.148:8080/service-admin-protected/',
    baseURL: 'http://localhost/locale-api/',
    urlUsers: baseURL + 'users/',
    urlGroup: baseURL + 'groups/',
    urlUserList: commonURL + 'usermanagement',
    urlFbTypeList : commonURL + 'feedback/',
    urlGroupList: './app/apidata/groupslist.json'
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule {}
