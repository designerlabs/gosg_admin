import { NgModule, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

const baseURL = environment.baseURL;
const mockApiURL = environment.mockApiURL;

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
    urlMinistry: string;
    urlAgency: string;
    urlAgencyApp: string;
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
    urlGenderList: string;
    urlAnnounceList: string;
    urlCategoryList: string;
    urlAddressType: string;
    urlAccountStatus: string;
    urlLanguage: string;
    urlAdminUserList:string;
    urlFeedbackType: string;
    urlFeedbackSubject: string;
    urlSubCategoryList: string;
    urlMainCategoryList: string;
    urlSearchbyEmail: string;

    urlUserTypeList: string;
    urlUserTypeDelete: string;
    urlAdminUserListUpdate: string;
    urlMediaType: string;

    urlIdentificationTypeList: string;
    urlIdentificationType: string;
    urlSystemSettings: string;
    urlModuleGroupList:string;

    urlFaqList:string;
    urlAdminUserPermission:string;
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
    urlLanguage: commonURL + 'language',  
    urlErrorMsg: commonURL + 'errormessage',
    urlModuleList: commonURL + 'authorization/module/moduleList',
    urlModuleGroupList: commonURL + 'authorization/module/group',
    urlGroupModuleList: mockApiURL + 'groupList',
    // urlGroupList: './app/apidata/groupslist.json',
    urlGroupList: commonURL + 'authorization/module/groupListView',
    urlMinistry: commonURL + 'ministry',
    urlAgency: commonURL + 'agency/type',
    urlAgencyApp: commonURL + 'agency/application',
    

    urlAdminUserList: commonURL+'adminuser/userList',
    urlAdminUserListUpdate: commonURL + 'adminuser/assignAdminUserToModuleGroup/',
    urlAdminUserPermission: commonURL + 'adminuser/assignAdminUserToModulePermission',
    urlSearchbyEmail: mockApiURL+'searchByEmailIC',
    urlCountryList: serviceURL + 'country',
    urlStateList: serviceURL + 'state',
    urlCityList: serviceURL + 'city',
    urlReligionList: commonURL + 'religion',
    urlRaceList: serviceURL + 'race',
    urlRace: commonURL + 'race',
    urlRaceDelete: commonURL + 'race/',
    urlGenderList : serviceURL + 'gender/all',

    urlUserTypeList: commonURL + 'usertype',
    urlUserTypeDelete: commonURL + 'usertype/',

    urlIdentificationTypeList: commonURL + 'identificationtype/code',
    urlIdentificationType: commonURL + 'identificationtype',

    urlFaqList: commonURL + 'faq',
    
    urlPoll: commonURL + 'polls', 
    urlFeedback: commonURL + 'feedback',
    urlPostcode: serviceURL + 'postcode/city/',
    urlFaq: './app/apidata/faq.json',
    // urlAnnounceList: './app/apidata/announce.json',
    urlAnnounceList: commonURL + 'announcement/code',
    // urlCategoryList: './app/apidata/category.json',
    urlCategoryList: commonURL + 'announcement/category',
    urlAddressType: commonURL + 'addresstype',
    urlAccountStatus: commonURL + 'accountstatus',
    urlFeedbackType: commonURL + 'feedback/type',
    urlFeedbackSubject: commonURL + 'feedback/subject',
    urlSubCategoryList: './app/apidata/subcategory.json',
    urlMainCategoryList: './app/apidata/maincategory.json',
    urlMediaType: commonURL + 'mediatype',
    urlSystemSettings: commonURL + 'systemsettings',
    
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule {}
