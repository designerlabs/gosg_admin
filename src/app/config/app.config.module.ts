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
    urlGetMinistry: string;
    urlAgency: string;
    urlGetAgency: string;
    urlAgencyApp: string;
    urlGetAgencyApp: string;
    urlGallery: string;
    urlMenu: string;
    urlCommon: string;
    baseURL: string;
    urlColor: string;
    urlGetColor: string;
    urlFont: string;
    urlGetFont: string;
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
    urlReligion: string;
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
    urlAddressTypeGet: string;
    urlAccountStatus: string;
    urlLanguage: string;
    urlAdminUserList:string;
    urlFeedbackType: string;
    urlFeedbackSubject: string;
    urlFeedbackTypeGet: string;
    urlFeedbackSubjectGet: string;
    urlSubCategoryList: string;
    urlMainCategoryList: string;
    urlSearchbyEmail: string;
    urlSearchbyAgency: string;
    urlSearchbyMinistry: string;

    urlUserTypeList: string;
    urlUserTypeDelete: string;
    urlAdminUserListUpdate: string;
    urlMediaType: string;
    urlMediaFileUpload: string;

    urlIdentificationTypeList: string;
    urlIdentificationType: string;
    urlSystemSettings: string;
    urlModule:string;
    urlModuleGroupList:string;

    urlFaqList:string;
    urlAdminUserPermission:string;

    urlFooterCategory: string;
    urlFooterContent: string;
    lang: string;
    urlAdminUserFind: string;

    urlImageList: string;
    urlCategory: string;
    urlGetUser: string;
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: '',
    urlMenu: commonURL + 'menu',
    urlColor: commonURL + 'color',
    urlGetColor: serviceURL + 'color',
    urlFont: commonURL + 'font',
    urlGetFont: serviceURL + 'font',
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
    urlModule: commonURL + 'authorization/module',
    urlModuleList: commonURL + 'authorization/module/moduleList',
    urlModuleGroupList: commonURL + 'authorization/module/group',
    urlGroupModuleList: mockApiURL + 'groupList',
    // urlGroupList: './app/apidata/groupslist.json',
    urlGroupList: commonURL + 'authorization/module/groupListView',
    urlMinistry: commonURL + 'ministry',
    urlGetMinistry: serviceURL + 'ministry',
    urlAgency: commonURL + 'agency/type',
    urlGetAgency: serviceURL + 'agency/type',
    urlAgencyApp: commonURL + 'agency/application',
    urlGetAgencyApp: serviceURL + 'agency/application',
    urlGallery: commonURL+'gallery',
    urlGetUser: commonURL+'adminuser/detail',
    urlAdminUserFind: commonURL+'adminuser',
    urlAdminUserList: commonURL+'adminuser/userList',
    urlAdminUserListUpdate: commonURL + 'adminuser/assignAdminUserToModuleGroup/',
    urlAdminUserPermission: commonURL + 'adminuser/assignAdminUserToModulePermission',
    urlSearchbyEmail: mockApiURL+'searchByEmailIC',
    urlSearchbyAgency: serviceURL+'agency/type/search/',
    urlSearchbyMinistry: serviceURL+'ministry/search/',
    urlCountryList: serviceURL + 'country',
    urlStateList: serviceURL + 'state',
    urlCityList: serviceURL + 'city',
    urlReligion: serviceURL + 'religion',
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
    urlFooterCategory: commonURL + 'footer',
    urlFooterContent: commonURL + 'footercontent',
    
    urlPoll: commonURL + 'polls', 
    urlFeedback: commonURL + 'feedback',
    urlPostcode: serviceURL + 'postcode/city/',
    urlFaq: './app/apidata/faq.json',
    urlImageList: commonURL + 'media/category/name/Article',
    // urlAnnounceList: './app/apidata/announce.json',
    urlAnnounceList: commonURL + 'announcement/code',
    // urlCategoryList: './app/apidata/category.json',
    urlCategoryList: commonURL + 'announcement/category',
    urlCategory: commonURL + 'content/category',
    urlAddressType: commonURL + 'addresstype',
    urlAddressTypeGet: serviceURL + 'addresstype',
    urlAccountStatus: commonURL + 'accountstatus',
    urlFeedbackType: commonURL + 'feedback/type',
    urlFeedbackSubject: commonURL + 'feedback/subject',
    urlFeedbackTypeGet: serviceURL + 'feedback/type',
    urlFeedbackSubjectGet: serviceURL + 'feedback/subject',
    urlSubCategoryList: './app/apidata/subcategory.json',
    urlMainCategoryList: './app/apidata/maincategory.json',
    urlMediaType: commonURL + 'mediatype',
    urlMediaFileUpload: commonURL + 'media',
    urlSystemSettings: commonURL + 'systemsettings',
    lang: 'language='+localStorage.getItem('langID')
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule {}
