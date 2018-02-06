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
import { UsertblComponent } from './authentication/usertbl/usertbl.component';
import { RolesComponent } from './roles/roles.component';
import { FeedbackComponent } from './feedback/view/feedback/feedback.component';
import { FeedbacktblComponent } from './feedback/view/feedbacktbl/feedbacktbl.component';
import { FeedbacktypeComponent } from './feedback/type/feedbacktype/feedbacktype.component';
import { FeedbacktypetblComponent } from './feedback/type/feedbacktypetbl/feedbacktypetbl.component';
import { GroupsviewComponent } from './authentication/groups/groupsview.component';
import { PollquestionComponent } from './poll/question/pollquestion/pollquestion.component';
import { PollquestiondetailsComponent } from './poll/question/pollquestiondetails/pollquestiondetails.component';
import { PollresultComponent } from './poll/result/pollresult/pollresult.component';
import { SliderComponent } from './slider/slider.component';
import { GroupseditComponent } from './authentication/groups/groupsedit.component';
import { CountryComponent } from './referencecode/country/country.component';
import { CityComponent } from './referencecode/city/city.component';
import { StateComponent } from './referencecode/state/state.component';
import { EthnicityComponent } from './referencecode/ethnicity/ethnicity.component';
import { ReligionComponent } from './referencecode/religion/religion.component';
import { PostcodeComponent } from './referencecode/postcode/postcode.component';
import { FeedbacksubjectComponent } from './feedback/subject/feedbacksubject/feedbacksubject.component';
import { FeedbacksubjecttblComponent } from './feedback/subject/feedbacksubjecttbl/feedbacksubjecttbl.component';
import { EthnicitytblComponent } from './referencecode/ethnicity/ethnicitytbl/ethnicitytbl.component';


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
    RolesComponent,
    PollquestionComponent,
    GroupsviewComponent,
    PollquestiondetailsComponent,
    PollresultComponent,
    SliderComponent,
    GroupseditComponent,    
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
    EthnicitytblComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppConfigModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
    // FroalaEditorModule.forRoot(),
    // FroalaViewModule.forRoot()
    ],
  providers: [CommonService, NavRouterActivatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
