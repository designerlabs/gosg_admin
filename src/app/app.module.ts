import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // replaces previous Http service
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
import { AgencyappComponent } from './agency/agencyapp/agencyapp.component';
import { AgencyapptblComponent } from './agency/agencyapp/agencyapptbl/agencyapptbl.component';
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
import { FootercategoryComponent } from './footer/footercategory/footercategory.component';
import { FootercategorytblComponent } from './footer/footercategory/footercategorytbl/footercategorytbl.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ValidateService } from './common/validate.service';
import { FootercontentComponent } from './footer/footercontent/footercontent.component';
import { FootercontenttblComponent } from './footer/footercontent/footercontenttbl/footercontenttbl.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GallerytblComponent } from './gallery/gallerytbl/gallerytbl.component';
import { DialogsService } from './dialogs/dialogs.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CategorymanagementComponent } from './categorymanagement/categorymanagement.component';
import { CategorymanagementtblComponent } from './categorymanagement/categorymanagementtbl/categorymanagementtbl.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
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
    AgencyappComponent,
    AgencyapptblComponent,
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
    FootercategoryComponent,
    FootercategorytblComponent,
    FootercontentComponent,
    FootercontenttblComponent,
    GalleryComponent,
    GallerytblComponent,
    ConfirmDialogComponent,
    CategorymanagementComponent,
    CategorymanagementtblComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),

    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),

    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppConfigModule,
    SharedModule,
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxEditorModule,
    ModalModule.forRoot()
    // FroalaEditorModule.forRoot(),
    // FroalaViewModule.forRoot()
    ],
  providers: [CommonService, NavRouterActivatorService, ValidateService, BsModalService, DialogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
