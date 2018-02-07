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
    urlAgencyType: string;
    urlMenu: string;
    urlCommon: string;
    baseURL: string;
    urlUsers: string;
    urlSlides: string;
    urlErrorMsg: string;
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
    urlFaq: string;
    urlRaceList: string;
    urlRace: string;
    urlRaceDelete: string;
    urlAnnounceList: string;
    urlCategoryList: string;
    urlAddressType: string;
    urlAccountStatus: string;
    urlFeedbackType: string;
    urlFeedbackSubject: string;

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
    // urlSlides: baseURL + 'slide/',
    urlSlides: commonURL + 'slide',
    urlErrorMsg: commonURL + 'errormessage',
    urlModuleList: commonURL + 'authorization/module/moduleList',
    
    urlGroupModuleList: mockApiURL + 'groupList',
    // urlGroupList: './app/apidata/groupslist.json',
    urlGroupList: commonURL + 'authorization/module/groupListView',
    urlAgencyType: commonURL + 'authorization/agency/type',
    


    urlCountryList: serviceURL + 'country',
    urlStateList: serviceURL + 'state',
    urlCityList: serviceURL + 'city',
    urlReligionList: serviceURL + 'religion',
    urlRaceList: serviceURL + 'race',
    urlRace: commonURL + 'race',
    urlRaceDelete: commonURL + 'race/',
    urlPoll: commonURL + 'polls', 
    urlFeedback: serviceURL,
    urlPostcode: serviceURL + 'postcode/city/',
    urlFaq: './app/apidata/faq.json',
    urlAnnounceList: './app/apidata/announce.json',
    urlCategoryList: './app/apidata/category.json',
    urlAddressType: commonURL + 'addresstype',
    urlAccountStatus: commonURL + 'accountstatus',
    urlFeedbackType: commonURL + 'feedbacktype',
    urlFeedbackSubject: commonURL + 'feedbacksubject',
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule {}
