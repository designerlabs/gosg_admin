import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
// import { AppConfig } from './config/app.config.modules';
import { AppConfigModule } from './config/app.config.module';
import { NavComponent } from './nav/nav.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { RightcontentComponent } from './rightcontent/rightcontent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AddtemplateComponent } from './addtemplate/addtemplate.component';
import { ArticletblComponent } from './articletbl/articletbl.component';
import { CommonService } from './service/common.service';
import { NavRouterActivatorService } from './service/nav-router-activator.service';
import { UserComponent } from './user/user.component';
import { UsertblComponent } from './authentication/user/usertbl/usertbl.component';
import { RolesComponent } from './roles/roles.component';
import { FeedbackadminComponent } from './feedback/feedbackadmin/feedbackadmin.component';
import { FeedbackadmintblComponent } from './feedback/feedbackadmin/feedbackadmintbl/feedbackadmintbl.component';
import { FeedbacktypeComponent } from './feedback/feedbacktype/feedbacktype.component';
import { FeedbacktypetblComponent } from './feedback/feedbacktype/feedbacktypetbl/feedbacktypetbl.component';
import { GroupstblComponent } from './authentication/groups/groupstbl/groupstbl.component';
import { PollquestiontblComponent } from './poll/pollquestion/pollquestiontbl/pollquestiontbl.component';
import { PollquestionComponent } from './poll/pollquestion/pollquestion.component';
import { PollresultComponent } from './poll/pollresult/pollresult.component';
import { SliderComponent } from './slider/slider.component';
import { GroupsComponent } from './authentication/groups/groups.component';
import { CountryComponent } from './referencecode/country/country.component';
import { CityComponent } from './referencecode/city/city.component';
import { StateComponent } from './referencecode/state/state.component';
import { EthnicityComponent } from './referencecode/ethnicity/ethnicity.component';
import { ReligionComponent } from './referencecode/religion/religion.component';
import { PostcodeComponent } from './referencecode/postcode/postcode.component';
import { EthnicitytblComponent } from './referencecode/ethnicity/ethnicitytbl/ethnicitytbl.component';
import { FaqComponent } from './faq/faq.component';
import { FaqtblComponent } from './faq/faqtbl/faqtbl.component';
import { NgxEditorModule } from 'ngx-editor';
import { EditorComponent } from './editor/editor.component';
import { FeedbacksubjectComponent } from './feedback/feedbacksubject/feedbacksubject.component';
import { FeedbacksubjecttblComponent } from './feedback/feedbacksubject/feedbacksubjecttbl/feedbacksubjecttbl.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementtblComponent } from './announcement/announcementtbl/announcementtbl.component';
import { CategorytblComponent } from './categories/category/categorytbl/categorytbl.component';

import { SlidertblComponent } from './slider/slidertbl/slidertbl.component';
import { ToastrModule } from 'ngx-toastr';
import { AddresstypeComponent } from './addresstype/addresstype.component';
import { AddresstypetblComponent } from './addresstype/addresstypetbl/addresstypetbl.component';
import { ReligiontblComponent } from './referencecode/religion/religiontbl/religiontbl.component';
import { ErrormessageComponent } from './errormessage/errormessage.component';
import { ErrormessagetblComponent } from './errormessage/errormessagetbl/errormessagetbl.component';
import { AgencyComponent } from './agency/agency.component';
import { AgencytblComponent } from './agency/agencytbl/agencytbl.component';
import { AccountstatusComponent } from './accountstatus/accountstatus.component';
import { AccountstatustblComponent } from './accountstatus/accountstatustbl/accountstatustbl.component';
import { LanguageComponent } from './language/language.component';
import { LanguagetblComponent } from './language/languagetbl/languagetbl.component';
import { MaincategoryComponent } from './categories/maincategory/maincategory.component';
import { MaincategorytblComponent } from './categories/maincategory/maincategorytbl/maincategorytbl.component';
import { SubcategoryComponent } from './categories/subcategory/subcategory.component';
import { SubcategorytblComponent } from './categories/subcategory/subcategorytbl/subcategorytbl.component';
import { CategoryComponent } from './categories/category/category.component';
import { UserpermissionComponent } from './authentication/user/userpermission.component';
import { AgencytypeComponent } from './agency/agencytype/agencytype.component';
import { AgencytypetblComponent } from './agency/agencytype/agencytypetbl/agencytypetbl.component';
import { AgencyapptypeComponent } from './agency/agencyapptype/agencyapptype.component';
import { AgencyapptypetblComponent } from './agency/agencyapptype/agencyapptypetbl/agencyapptypetbl.component';
import { GenderComponent } from './referencecode/gender/gender.component';
import { CitizentypeComponent } from './referencecode/citizentype/citizentype.component';
import { CitizentypetblComponent } from './referencecode/citizentype/citizentypetbl/citizentypetbl.component';
import { FeedbackvisitorComponent } from './feedback/feedbackvisitor/feedbackvisitor.component';
import { FeedbackvisitortblComponent } from './feedback/feedbackvisitor/feedbackvisitortbl/feedbackvisitortbl.component';
import { MediatypeComponent } from './media/mediatype/mediatype.component';
import { MediafileuploadComponent } from './media/mediafileupload/mediafileupload.component';
import { MediatypetblComponent } from './media/mediatype/mediatypetbl/mediatypetbl.component';
import { SystemsettingsComponent } from './systemsettings/systemsettings.component';
import { SystemsettingstblComponent } from './systemsettings/systemsettingstbl/systemsettingstbl.component';
import { IdentificationtypeComponent } from './referencecode/identificationtype/identificationtype.component';
import { IdentificationtypetblComponent } from './referencecode/identificationtype/identificationtypetbl/identificationtypetbl.component';
import { ExtlinksComponent } from './extlinks/extlinks.component';
import { ExtlinkstblComponent } from './extlinks/extlinkstbl/extlinkstbl.component';
import { MinistryComponent } from './ministry/ministry.component';
import { MinistrytblComponent } from './ministry/ministrytbl/ministrytbl.component';
import { ContactusComponent } from './footer/contactus/contactus.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LeftmenuComponent,
    RightcontentComponent,
    ErrorComponent,
    AddtemplateComponent,
    ArticletblComponent,
    UserComponent,
    UsertblComponent,
    GroupstblComponent,
    RolesComponent,    
    PollquestiontblComponent,
    PollquestionComponent,
    PollresultComponent,
    SliderComponent,
    GroupsComponent,    
    FeedbackadminComponent,
    FeedbackadmintblComponent,
    FeedbacktypeComponent,
    FeedbacktypetblComponent,
    CountryComponent,
    CityComponent,
    StateComponent,
    EthnicityComponent,
    ReligionComponent,
    PostcodeComponent,
    FeedbacksubjectComponent,
    FeedbacksubjecttblComponent,
    FaqComponent,
    FaqtblComponent,
    EditorComponent,
    EthnicitytblComponent,
    AnnouncementComponent,
    AnnouncementtblComponent,
    CategorytblComponent,
    SlidertblComponent,
    AddresstypeComponent,
    AddresstypetblComponent,
    ReligiontblComponent,
    ErrormessageComponent,
    ErrormessagetblComponent,
    AgencyComponent,
    AgencytblComponent,
    AccountstatusComponent,
    AccountstatustblComponent,
    LanguageComponent,
    LanguagetblComponent,
    MaincategoryComponent,
    MaincategorytblComponent,
    SubcategoryComponent,
    SubcategorytblComponent,
    CategoryComponent,
    UserpermissionComponent,
    AgencytypeComponent,
    AgencytypetblComponent,
    AgencyapptypeComponent,
    AgencyapptypetblComponent,
    GenderComponent,
    CitizentypeComponent,
    CitizentypetblComponent,
    FeedbackvisitorComponent,
    FeedbackvisitortblComponent,
    MediatypeComponent,
    MediafileuploadComponent,
    MediatypetblComponent,
    SystemsettingsComponent,
    SystemsettingstblComponent,
    IdentificationtypeComponent,
    IdentificationtypetblComponent,
    ExtlinksComponent,
    ExtlinkstblComponent,
    MinistryComponent,
    MinistrytblComponent,
    ContactusComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppConfigModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxEditorModule
    // FroalaEditorModule.forRoot(),
    // FroalaViewModule.forRoot()
    ],
  providers: [CommonService, NavRouterActivatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
