import { NgModule, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

const baseURL = 'http://localhost/locale-api/';
const mockApiURL = 'http://10.1.22.34:3000/';

// const baseURL = 'http://10.1.17.12:3000/';

// // common service
// let portalBaseURL = 'http://localhost:8020/portal/';
// let protectedBaseURL = 'http://localhost:8021/portal-protected/';
const commonURL = 'http://10.1.70.148:8080/service-admin-protected/';
const serviceURL = 'http://10.1.70.148:8080/service/';
// let publicURL = 'http://10.1.70.148:8080/gosg-service-public/';

// let baseLocalURL = './app/apidata/';
// let searchServiceURL = 'https://www.malaysia.gov.my/public/';

export class AppConfig {
    apiEndpoint: string;
    urlMenu: string;
    urlCommon: string;
    baseURL: string;
    urlUsers: string;
    urlSlides: string;
    urlUserList: string;
    urlFbTypeList: string;
    urlGroup: string;
    urlGroupList: string;
    urlCountryList: string;
    urlStateList: string;
    urlCityList: string;
    urlReligionList: string;
    urlModuleList: string;
    urlGroupModuleList: string;
    urlPostcode:string;
    urlPoll: string;
    urlFeedback: string;
    urlRaceList: string;

}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: '',
    urlMenu: commonURL + 'menu/list?',
    urlCommon: commonURL,
    baseURL: 'http://localhost/locale-api/',
    urlUsers: baseURL + 'users/',
    urlGroup: baseURL + 'groups/',
    urlUserList: commonURL + 'usermanagement',
    urlFbTypeList : commonURL + 'feedback/',
    urlSlides: commonURL + 'slide',
    urlModuleList: mockApiURL + 'moduleList',
    urlGroupModuleList: mockApiURL + 'groupList',
    // urlGroupList: './app/apidata/groupslist.json',
    urlGroupList: mockApiURL + 'groupListView',


    urlCountryList: serviceURL + 'country',
    urlStateList: serviceURL + 'state',
    urlCityList: serviceURL + 'city',
    urlReligionList: serviceURL + 'religion',
    urlRaceList: serviceURL + 'race',
    urlPoll: commonURL + 'polls', 
    urlFeedback: serviceURL,
    urlPostcode: serviceURL + 'postcode/city/'
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule {}
