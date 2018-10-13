import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
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
import { CommonService } from './service/common.service';
import { NavRouterActivatorService } from './service/nav-router-activator.service';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { UserComponent } from './user/user.component';
import { UserdetailstblComponent } from './user/userdetailstbl/userdetailstbl.component';
import { UsertblComponent } from './authentication/user/usertbl/usertbl.component';
import { UserpermissionComponent } from './authentication/user/userpermission.component';
import { GroupstblComponent } from './authentication/groups/groupstbl/groupstbl.component';
import { GroupsComponent } from './authentication/groups/groups.component';

import { FeedbackadminComponent } from './feedback/feedbackadmin/feedbackadmin.component';
import { FeedbackadmintblComponent } from './feedback/feedbackadmin/feedbackadmintbl/feedbackadmintbl.component';
import { FeedbacktypeComponent } from './feedback/feedbacktype/feedbacktype.component';
import { FeedbacktypetblComponent } from './feedback/feedbacktype/feedbacktypetbl/feedbacktypetbl.component';
import { FeedbacksubjectComponent } from './feedback/feedbacksubject/feedbacksubject.component';
import { FeedbacksubjecttblComponent } from './feedback/feedbacksubject/feedbacksubjecttbl/feedbacksubjecttbl.component';
import { FeedbackvisitorComponent } from './feedback/feedbackvisitor/feedbackvisitor.component';
import { FeedbackvisitortblComponent } from './feedback/feedbackvisitor/feedbackvisitortbl/feedbackvisitortbl.component';

import { PollquestiontblComponent } from './poll/pollquestion/pollquestiontbl/pollquestiontbl.component';
import { PollquestionComponent } from './poll/pollquestion/pollquestion.component';
import { PollresultComponent } from './poll/pollresult/pollresult.component';
import { PollresultdetailComponent } from './poll/pollresultdetail/pollresultdetail.component';

import { MinistryComponent } from './ministry/ministry.component';
import { MinistrytblComponent } from './ministry/ministrytbl/ministrytbl.component';

import { SliderComponent } from './slider/slider.component';
import { SlidertblComponent } from './slider/slidertbl/slidertbl.component';
import { SliderpublisherComponent } from './sliderpublisher/sliderpublisher.component';
import { SliderpublishertblComponent } from './sliderpublisher/sliderpublishertbl/sliderpublishertbl.component';
import { ContentComponent } from './content/content.component';
import { ContenttblComponent } from './content/contenttbl/contenttbl.component';
import { ContentpublishertblComponent } from './contentpublisher/contentpublishertbl/contentpublishertbl.component';
import { ContentpublisherComponent } from './contentpublisher/contentpublisher.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GallerytblComponent } from './gallery/gallerytbl/gallerytbl.component';
import { GallerypublisherComponent } from './gallerypublisher/gallerypublisher.component';
import { GallerypublishertblComponent } from './gallerypublisher/gallerypublishertbl/gallerypublishertbl.component';
import { LifeeventComponent, DialogResultExampleDialog } from './lifeevent/lifeevent.component';
import { LifeeventtblComponent } from './lifeevent/lifeeventtbl/lifeeventtbl.component';
import { LifeeventpublishertblComponent } from './lifeeventpublisher/lifeeventpublishertbl/lifeeventpublishertbl.component';
import { LifeeventpublisherComponent } from './lifeeventpublisher/lifeeventpublisher.component';
import { ParticipationComponent } from './participation/participation.component';
import { ParticipationtblComponent } from './participation/participationtbl/participationtbl.component';
import { ParticipationpublisherComponent } from './participationpublisher/participationpublisher.component';
import { ParticipationpublishertblComponent } from './participationpublisher/participationpublishertbl/participationpublishertbl.component';

import { GenderComponent } from './referencecode/gender/gender.component';
import { CountryComponent } from './referencecode/country/country.component';
import { CountrytblComponent } from './referencecode/country/countrytbl/countrytbl.component';
import { CityComponent } from './referencecode/city/city.component';
import { CitytblComponent } from './referencecode/city/citytbl/citytbl.component';
import { StateComponent } from './referencecode/state/state.component';
import { StatetblComponent } from './referencecode/state/statetbl/statetbl.component';
import { EthnicityComponent } from './referencecode/ethnicity/ethnicity.component';
import { EthnicitytblComponent } from './referencecode/ethnicity/ethnicitytbl/ethnicitytbl.component';
import { ReligionComponent } from './referencecode/religion/religion.component';
import { ReligiontblComponent } from './referencecode/religion/religiontbl/religiontbl.component';
import { PostcodeComponent } from './referencecode/postcode/postcode.component';
import { PostcodetblComponent } from './referencecode/postcode/postcodetbl/postcodetbl.component';
import { CitizentypeComponent } from './referencecode/citizentype/citizentype.component';
import { CitizentypetblComponent } from './referencecode/citizentype/citizentypetbl/citizentypetbl.component';
import { IdentificationtypeComponent } from './referencecode/identificationtype/identificationtype.component';
import { IdentificationtypetblComponent } from './referencecode/identificationtype/identificationtypetbl/identificationtypetbl.component';

import { DServiceComponent } from './dservice/dservice.component';
import { DServicetblComponent } from './dservice/dservicetbl/dservicetbl.component';
import { DServicedetailsComponent } from './dservice/dservicedetails/dservicedetails.component';
import { DServicedetailstblComponent } from './dservice/dservicedetails/dservicedetailstbl/dservicedetailstbl.component';
import { DServicetypeComponent } from './dservice/dservicetype/dservicetype.component';
import { DServicetypetblComponent } from './dservice/dservicetype/dservicetypetbl/dservicetypetbl.component';
import { DServicegroupComponent } from './dservice/dservicegroup/dservicegroup.component';
import { DServicegrouptblComponent } from './dservice/dservicegroup/dservicegrouptbl/dservicegrouptbl.component';

import { FootercategoryComponent } from './footer/footercategory/footercategory.component';
import { FootercategorytblComponent } from './footer/footercategory/footercategorytbl/footercategorytbl.component';
import { FootercontentComponent } from './footer/footercontent/footercontent.component';
import { FootercontenttblComponent } from './footer/footercontent/footercontenttbl/footercontenttbl.component';

import { CategoryComponent } from './category/category.component';
import { CategorytblComponent } from './category/categorytbl/categorytbl.component';

import { InboxComponent } from './inbox/inbox.component';
import { InboxtblComponent } from './inbox/inboxtbl/inboxtbl.component';
import { InboxsentComponent } from './inboxsent/inboxsent.component';
import { InboxsenttblComponent } from './inboxsent/inboxsenttbl/inboxsenttbl.component';

import { MediatypeComponent } from './media/mediatype/mediatype.component';
import { MediatypetblComponent } from './media/mediatype/mediatypetbl/mediatypetbl.component';
import { MediafileuploadComponent } from './media/mediafileupload/mediafileupload.component';
import { MediafileuploadtblComponent } from './media/mediafileupload/mediafileuploadtbl/mediafileuploadtbl.component';

import { FaqComponent } from './faq/faq.component';
import { FaqtblComponent } from './faq/faqtbl/faqtbl.component';
import { SystemsettingsComponent } from './systemsettings/systemsettings.component';
import { SystemsettingstblComponent } from './systemsettings/systemsettingstbl/systemsettingstbl.component';
import { ColorComponent } from './color/color.component';
import { ColortblComponent } from './color/colortbl/colortbl.component';
import { FontComponent } from './font/font.component';
import { FonttblComponent } from './font/fonttbl/fonttbl.component';
import { AddresstypeComponent } from './addresstype/addresstype.component';
import { AddresstypetblComponent } from './addresstype/addresstypetbl/addresstypetbl.component';
import { AccountstatusComponent } from './accountstatus/accountstatus.component';
import { AccountstatustblComponent } from './accountstatus/accountstatustbl/accountstatustbl.component';

import { AgencyComponent } from './agency/agency.component';
import { AgencytblComponent } from './agency/agencytbl/agencytbl.component';
import { AgencyappComponent } from './agency/agencyapp/agencyapp.component';
import { AgencyapptblComponent } from './agency/agencyapp/agencyapptbl/agencyapptbl.component';

import { NgxEditorModule } from 'ngx-editor';
import { EditorComponent } from './editor/editor.component';

import { ToastrModule } from 'ngx-toastr';

import { ErrormessageComponent } from './errormessage/errormessage.component';
import { ErrormessagetblComponent } from './errormessage/errormessagetbl/errormessagetbl.component';
import { LanguageComponent } from './language/language.component';
import { LanguagetblComponent } from './language/languagetbl/languagetbl.component';

import { TextMaskModule } from 'angular2-text-mask';
import { ValidateService } from './common/validate.service';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

import { DialogsService } from './dialogs/dialogs.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Ng4FilesModule } from './ng4-files';

import { ModmenuComponent } from './modmenu/modmenu.component';
import { ModmenutblComponent } from './modmenu/modmenutbl/modmenutbl.component';

import { LoadingModule } from 'ngx-loading';
import { TruncatePipe } from './pipe/truncate.pipe';
import { EventcalendarComponent } from './eventcalendar/eventcalendar.component';
import {NgxTreeSelectModule} from 'ngx-tree-select';
import { EventcalendartblComponent } from './eventcalendar/eventcalendartbl/eventcalendartbl.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EventcalendarextComponent } from './eventcalendar/eventcalendarext/eventcalendarext.component';
import { EventcalendarexttblComponent } from './eventcalendar/eventcalendarext/eventcalendarexttbl/eventcalendarexttbl.component';

// import { JoditAngularModule } from 'jodit-angular';
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SitemapComponent } from './sitemap/sitemap.component';
import { SitemaptblComponent } from './sitemap/sitemaptbl/sitemaptbl.component';
import { ArchiveComponent } from './archive/archive.component';
import { ArchivetblComponent } from './archive/archivetbl/archivetbl.component';

import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptiontblComponent } from './subscription/subscriptiontbl/subscriptiontbl.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { SchedulertblComponent } from './scheduler/schedulertbl/schedulertbl.component';
import { NavService } from './nav/nav.service';
import { ViewreportComponent } from './viewreport/viewreport.component';
import { ActmonComponent } from './actmon/actmon.component';
import { ActmontblComponent } from './actmon/actmontbl/actmontbl.component';
import { DatePipe } from '../../node_modules/@angular/common';
import { UsersunregisterComponent } from './usersunregister/usersunregister.component';
import { GareportsComponent } from './gareports/gareports.component';
// import { AnnouncementComponent } from './announcement/announcement.component';
// import { AnnouncementtblComponent } from './announcement/announcementtbl/announcementtbl.component';
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
    GareportsComponent,
    UserComponent,
    UserdetailstblComponent,
    GroupstblComponent,
    GroupsComponent,
    UserpermissionComponent,
    UsertblComponent,

    PollquestiontblComponent,
    PollquestionComponent,
    PollresultComponent,
    PollresultdetailComponent,

    FeedbackadminComponent,
    FeedbackadmintblComponent,
    FeedbacktypeComponent,
    FeedbacktypetblComponent,
    FeedbacksubjectComponent,
    FeedbacksubjecttblComponent,
    FeedbackvisitorComponent,
    FeedbackvisitortblComponent,

    MinistryComponent,
    MinistrytblComponent,

    SliderComponent,
    SlidertblComponent,
    SliderpublisherComponent,
    SliderpublishertblComponent,
    GalleryComponent,
    GallerytblComponent,
    GallerypublisherComponent,
    GallerypublishertblComponent,
    LifeeventComponent,
    LifeeventtblComponent,
    LifeeventpublishertblComponent,
    LifeeventpublisherComponent,
    ContentComponent,
    ContenttblComponent,
    ContentpublishertblComponent,
    ContentpublisherComponent,
    ParticipationComponent,
    ParticipationtblComponent,
    ParticipationpublisherComponent,
    ParticipationpublishertblComponent,
    DialogResultExampleDialog,

    GenderComponent,
    CityComponent,
    CitytblComponent,
    StateComponent,
    StatetblComponent,
    CountrytblComponent,
    CountryComponent,
    EthnicityComponent,
    EthnicitytblComponent,
    ReligionComponent,
    ReligiontblComponent,
    PostcodeComponent,
    PostcodetblComponent,
    CitizentypeComponent,
    CitizentypetblComponent,
    IdentificationtypeComponent,
    IdentificationtypetblComponent,

    DServiceComponent,
    DServicetblComponent,
    DServicedetailsComponent,
    DServicedetailstblComponent,
    DServicetypeComponent,
    DServicetypetblComponent,
    DServicegroupComponent,
    DServicegrouptblComponent,

    FootercategoryComponent,
    FootercategorytblComponent,
    FootercontentComponent,
    FootercontenttblComponent,

    CategoryComponent,
    CategorytblComponent,

    InboxComponent,
    InboxtblComponent,
    InboxsentComponent,
    InboxsenttblComponent,

    MediatypeComponent,
    MediatypetblComponent,
    MediafileuploadComponent,
    MediafileuploadtblComponent,

    FaqComponent,
    FaqtblComponent,
    SystemsettingsComponent,
    SystemsettingstblComponent,
    ColorComponent,
    ColortblComponent,
    FontComponent,
    FonttblComponent,
    AddresstypeComponent,
    AddresstypetblComponent,
    AccountstatusComponent,
    AccountstatustblComponent,

    AgencyComponent,
    AgencytblComponent,
    AgencyappComponent,
    AgencyapptblComponent,

    EditorComponent,

    ErrormessageComponent,
    ErrormessagetblComponent,
    LanguageComponent,
    LanguagetblComponent,
    ConfirmDialogComponent,
    ModmenuComponent,
    ModmenutblComponent,

    TruncatePipe,
    EventcalendarComponent,
    EventcalendartblComponent,
    EventcalendarextComponent,
    EventcalendarexttblComponent,

    SitemapComponent,
    SitemaptblComponent,
    ArchiveComponent,
    ArchivetblComponent,

    SubscriptionComponent,
    SubscriptiontblComponent,
    SchedulerComponent,
    SchedulertblComponent,
    ViewreportComponent,
    ActmonComponent,
    ActmontblComponent,
    UsersunregisterComponent,
    // AnnouncementComponent,
    // AnnouncementtblComponent,
  ],
  entryComponents: [DialogResultExampleDialog],
  imports: [
    BrowserModule,
    // JoditAngularModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),

    NgxTreeSelectModule.forRoot({
      allowFilter: true,
      expandMode: 'None',
      filterPlaceholder: 'Type your filter here...',
      idField: 'value',
      childrenField: 'children'
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    Ng4FilesModule,
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
    ModalModule.forRoot(),
    LoadingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    Ng2GoogleChartsModule

    // FroalaEditorModule.forRoot(),
    // FroalaViewModule.forRoot()
    ],
  providers: [CommonService, NavRouterActivatorService, ValidateService, BsModalService, DialogsService, DatePipe, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
