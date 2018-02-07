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
import { FeedbackComponent } from './feedback/view/feedback/feedback.component';
import { FeedbacktblComponent } from './feedback/view/feedbacktbl/feedbacktbl.component';
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
import { NgxEditorModule } from 'ngx-editor';
import { EditorComponent } from './editor/editor.component';
import { FeedbacksubjectComponent } from './feedback/feedbacksubject/feedbacksubject.component';
import { FeedbacksubjecttblComponent } from './feedback/feedbacksubject/feedbacksubjecttbl/feedbacksubjecttbl.component';
import { FaqtblComponent } from './faq/faqtbl/faqtbl.component';
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
import { MaincategoryComponent } from './categories/maincategory/maincategory.component';
import { MaincategorytblComponent } from './categories/maincategory/maincategorytbl/maincategorytbl.component';
import { SubcategoryComponent } from './categories/subcategory/subcategory.component';
import { SubcategorytblComponent } from './categories/subcategory/subcategorytbl/subcategorytbl.component';
import { CategoryComponent } from './categories/category/category.component';
import { UserpermissionComponent } from './authentication/user/userpermission.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LeftmenuComponent,
    RightcontentComponent,
    ErrorComponent,
    AddtemplateComponent,
    ArticletblComponent,
    FeedbackComponent,
    UserComponent,
    UsertblComponent,
    GroupstblComponent,
    RolesComponent,    
    PollquestiontblComponent,
    PollquestionComponent,
    PollresultComponent,
    SliderComponent,
    GroupsComponent,    
    FeedbacktblComponent,
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
    EditorComponent,
    EthnicitytblComponent,
    FaqtblComponent,
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
    MaincategoryComponent,
    MaincategorytblComponent,
    SubcategoryComponent,
    SubcategorytblComponent,
    CategoryComponent,
    UserpermissionComponent,
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
