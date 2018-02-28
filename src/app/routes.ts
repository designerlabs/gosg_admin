import { Component, Inject, ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';
import { RightcontentComponent } from './rightcontent/rightcontent.component';
import { AddtemplateComponent } from './addtemplate/addtemplate.component';
import { ArticletblComponent } from './articletbl/articletbl.component';
import { NavRouterActivatorService } from './service/nav-router-activator.service';
import { UserComponent } from './user/user.component';
import { RolesComponent } from './roles/roles.component';
import { GroupsComponent } from './authentication/groups/groups.component';
import { UsertblComponent } from './authentication/user/usertbl/usertbl.component';
import { PollquestiontblComponent } from './poll/pollquestion/pollquestiontbl/pollquestiontbl.component';
import { PollquestionComponent } from './poll/pollquestion/pollquestion.component';
import { PollresultComponent } from './poll/pollresult/pollresult.component';
import { SliderComponent } from './slider/slider.component';
import { GroupstblComponent } from './authentication/groups/groupstbl/groupstbl.component';
import { CountryComponent } from './referencecode/country/country.component';
import { StateComponent } from './referencecode/state/state.component';
import { CityComponent } from './referencecode/city/city.component';
import { ReligionComponent } from './referencecode/religion/religion.component';
import { ReligiontblComponent } from './referencecode/religion/religiontbl/religiontbl.component';
import { PostcodeComponent } from './referencecode/postcode/postcode.component';
import { EthnicityComponent } from './referencecode/ethnicity/ethnicity.component';
import { EthnicitytblComponent } from './referencecode/ethnicity/ethnicitytbl/ethnicitytbl.component';
import { FaqComponent } from './faq/faq.component';
import { FaqtblComponent } from './faq/faqtbl/faqtbl.component';
import { AnnouncementtblComponent } from './announcement/announcementtbl/announcementtbl.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { FeedbackadminComponent } from './feedback/feedbackadmin/feedbackadmin.component';
import { FeedbackadmintblComponent } from './feedback/feedbackadmin/feedbackadmintbl/feedbackadmintbl.component';
import { FeedbacktypeComponent } from './feedback/feedbacktype/feedbacktype.component';
import { FeedbacktypetblComponent } from './feedback/feedbacktype/feedbacktypetbl/feedbacktypetbl.component';
import { FeedbacksubjecttblComponent } from './feedback/feedbacksubject/feedbacksubjecttbl/feedbacksubjecttbl.component';
import { FeedbacksubjectComponent } from './feedback/feedbacksubject/feedbacksubject.component';
import { EditorComponent } from './editor/editor.component';
import { SlidertblComponent } from './slider/slidertbl/slidertbl.component';
import { AddresstypeComponent } from './addresstype/addresstype.component';
import { AddresstypetblComponent } from './addresstype/addresstypetbl/addresstypetbl.component';
import { ErrormessageComponent } from './errormessage/errormessage.component';
import { ErrormessagetblComponent } from './errormessage/errormessagetbl/errormessagetbl.component';
import { AccountstatustblComponent } from './accountstatus/accountstatustbl/accountstatustbl.component';
import { AccountstatusComponent } from './accountstatus/accountstatus.component';
import { LanguagetblComponent } from './language/languagetbl/languagetbl.component';
import { LanguageComponent } from './language/language.component';
import { UserpermissionComponent } from './authentication/user/userpermission.component';
import { AgencyapptblComponent } from './agency/agencyapp/agencyapptbl/agencyapptbl.component';
import { AgencyappComponent } from './agency/agencyapp/agencyapp.component';
import { GenderComponent } from './referencecode/gender/gender.component';
import { CitizentypeComponent } from './referencecode/citizentype/citizentype.component';
import { CitizentypetblComponent } from './referencecode/citizentype/citizentypetbl/citizentypetbl.component';
import { FeedbackvisitorComponent } from './feedback/feedbackvisitor/feedbackvisitor.component';
import { FeedbackvisitortblComponent } from './feedback/feedbackvisitor/feedbackvisitortbl/feedbackvisitortbl.component';
import { MediatypetblComponent } from './media/mediatype/mediatypetbl/mediatypetbl.component';
import { MediatypeComponent } from './media/mediatype/mediatype.component';
import { SystemsettingstblComponent } from './systemsettings/systemsettingstbl/systemsettingstbl.component';
import { SystemsettingsComponent } from './systemsettings/systemsettings.component';
import { IdentificationtypeComponent } from './referencecode/identificationtype/identificationtype.component';
import { IdentificationtypetblComponent } from './referencecode/identificationtype/identificationtypetbl/identificationtypetbl.component';
import { MinistryComponent } from './ministry/ministry.component';
import { MinistrytblComponent } from './ministry/ministrytbl/ministrytbl.component';
import { AgencyComponent } from './agency/agency.component';
import { AgencytblComponent } from './agency/agencytbl/agencytbl.component';

import { FootercategoryComponent } from './footer/footercategory/footercategory.component';
import { FootercategorytblComponent } from './footer/footercategory/footercategorytbl/footercategorytbl.component';

import { FootercontentComponent } from './footer/footercontent/footercontent.component';
import { FootercontenttblComponent } from './footer/footercontent/footercontenttbl/footercontenttbl.component';
import { GallerytblComponent } from './gallery/gallerytbl/gallerytbl.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MediafileuploadComponent } from './media/mediafileupload/mediafileupload.component';
import { MediafileuploadtblComponent } from './media/mediafileupload/mediafileuploadtbl/mediafileuploadtbl.component';
import { ContenttblComponent } from './content/contenttbl/contenttbl.component';
import { ContentComponent } from './content/content.component';
import { CategorytblComponent } from './category/categorytbl/categorytbl.component';
import { CategoryComponent } from './category/category.component';
import { ModmenuComponent } from './modmenu/modmenu.component';
import { ModmenutblComponent } from './modmenu/modmenutbl/modmenutbl.component';
import { FonttblComponent } from './font/fonttbl/fonttbl.component';
import { FontComponent } from './font/font.component';
import { ColortblComponent } from './color/colortbl/colortbl.component';
import { ColorComponent } from './color/color.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendartblComponent } from './calendar/calendartbl/calendartbl.component';

export const appRoutes: Routes = [
{path: 'index', component: RightcontentComponent},
{path: '', redirectTo: 'index', pathMatch: 'full'},
{path: 'addtemplate', component: AddtemplateComponent},
{path: 'media/type', component: MediatypetblComponent},
{path: 'media/type/add', component: MediatypeComponent},
{path: 'media/type/:id', component: MediatypeComponent},
{path: 'media', component: MediafileuploadtblComponent},
{path: 'media/add', component: MediafileuploadComponent},
{path: 'media/:id', component: MediafileuploadComponent},
{path: 'articletbl/:id', component: ArticletblComponent, canActivate: [NavRouterActivatorService]},

//Feedback: N
{path: 'feedback/message/visitor', component: FeedbackvisitortblComponent},
{path: 'feedback/message/visitor/:id', component: FeedbackvisitorComponent},
{path: 'feedback/message/admin', component: FeedbackadmintblComponent},
{path: 'feedback/message/admin/:id', component: FeedbackadminComponent},
{path: 'feedback/type', component: FeedbacktypetblComponent},
{path: 'feedback/type/:id', component: FeedbacktypeComponent},
{path: 'feedback/type/add', component: FeedbacktypeComponent},
{path: 'feedback/subject', component: FeedbacksubjecttblComponent},
{path: 'feedback/subject/:id', component: FeedbacksubjectComponent},
{path: 'feedback/subject/add', component: FeedbacksubjectComponent},

{path: '404', component: ErrorComponent},
{path: 'errormessage/add', component: ErrormessageComponent},
{path: 'errormessage/:id', component: ErrormessageComponent},
{path: 'errormessage', component: ErrormessagetblComponent},
{path: 'calendar/add', component: CalendarComponent},
{path: 'calendar/:id', component: CalendarComponent},
{path: 'calendar', component: CalendartblComponent},
{path: 'language/add', component: LanguageComponent},
{path: 'language/:id', component: LanguageComponent},
{path: 'language', component: LanguagetblComponent},
{path: 'modmenu/add', component: ModmenuComponent},
{path: 'modmenu/:id', component: ModmenuComponent},
{path: 'modmenu', component: ModmenutblComponent},
{path: 'ministry/add', component: MinistryComponent},
{path: 'ministry/:id', component: MinistryComponent},
{path: 'ministry', component: MinistrytblComponent},
{path: 'agency/add', component: AgencyComponent},
{path: 'agency/:id', component: AgencyComponent},
{path: 'agency', component: AgencytblComponent},
{path: 'agencyapp/add', component: AgencyappComponent},
{path: 'agencyapp/:id', component: AgencyappComponent},
{path: 'agencyapp', component: AgencyapptblComponent},
{path: 'user/:id', component: UserComponent},
{path: 'roles', component: RolesComponent},
{path: 'userlist', component: UsertblComponent},
{path: 'groupmodule' , component: GroupstblComponent},
{path: 'groups/add' , component: GroupsComponent},
{path: 'groups/:id', component: GroupsComponent},

// Poll: N
{path: 'poll/questions', component: PollquestiontblComponent},
{path: 'poll/questions/:id', component: PollquestionComponent},
{path: 'poll/questions/add', component: PollquestionComponent},
{path: 'poll/results', component: PollresultComponent},

{path: 'slider', component: SlidertblComponent},
{path: 'slider/add', component: SliderComponent},
{path: 'slider/:id', component: SliderComponent},
{path: 'gallery', component: GallerytblComponent},
{path: 'gallery/add', component: GalleryComponent},
{path: 'gallery/:id', component: GalleryComponent},
{path: 'reference/country', component: CountryComponent},
{path: 'reference/city', component: CityComponent},
{path: 'reference/state', component: StateComponent},
{path: 'reference/religion', component: ReligiontblComponent},
{path: 'reference/religion/:id', component: ReligionComponent},
{path: 'reference/religion/add', component: ReligionComponent},
{path: 'reference/postcode', component: PostcodeComponent},
{path: 'reference/ethnicity', component: EthnicitytblComponent},
{path: 'reference/ethnicity/:id', component: EthnicityComponent},
{path: 'reference/ethnicity/add', component: EthnicityComponent},
{path: 'reference/citizentype', component: CitizentypetblComponent},
{path: 'reference/citizentype/:id', component: CitizentypeComponent},
{path: 'reference/citizentype/add', component: CitizentypeComponent},
{path: 'reference/gender', component: GenderComponent},

{path: 'reference/identificationtype', component: IdentificationtypetblComponent},
{path: 'reference/identificationtype/:id', component: IdentificationtypeComponent},
{path: 'reference/identificationtype/add', component: IdentificationtypeComponent},

{path: 'footer/footercategory', component: FootercategorytblComponent},
{path: 'footer/footercategory/:id', component: FootercategoryComponent},
{path: 'footer/footercategory/add', component: FootercategoryComponent},

{path: 'footer/footercontent', component: FootercontenttblComponent},
{path: 'footer/footercontent/:id', component: FootercontentComponent},
{path: 'footer/footercontent/add', component: FootercontentComponent},

{path: 'faq', component: FaqtblComponent},
{path: 'faq/:id', component: FaqComponent},
{path: 'faq/add', component: FaqComponent},
{path: 'editor', component: EditorComponent},

//System Settings: N
{path: 'systemsettings',component: SystemsettingstblComponent},
{path: 'systemsettings/:id',component: SystemsettingsComponent},
{path: 'systemsettings/add',component: SystemsettingsComponent},

//Theme Settings
{path: 'color',component: ColortblComponent},
{path: 'color/:id',component: ColorComponent},
{path: 'color/add',component: ColorComponent},
{path: 'font',component: FonttblComponent},
{path: 'font/:id',component: FontComponent},
{path: 'font/add',component: FontComponent},

// Article and Announcement Category
{path: 'admin', component: UsertblComponent},
{path: 'admin/permission/:id', component: UserpermissionComponent},
{path: 'announcement', component: AnnouncementtblComponent},
{path: 'announcement/:id', component: AnnouncementComponent},
{path: 'announcement/add', component: AnnouncementComponent},

//Address Type: N
{path: 'address/type', component: AddresstypetblComponent},
{path: 'address/type/:id', component: AddresstypeComponent},
{path: 'address/type/add', component: AddresstypeComponent},

//Account Status: N
{path: 'account', component: AccountstatustblComponent},
{path: 'account/:id', component: AccountstatusComponent},
{path: 'account/add', component: AccountstatusComponent},

// Category & Content: N
{path: 'category', component: CategorytblComponent},
{path: 'category/:id', component: CategoryComponent},
{path: 'category/add', component: CategoryComponent},
{path: 'content', component: ContenttblComponent},
{path: 'content/:id', component: ContentComponent},
{path: 'content/add', component: ContentComponent},

{path: '**', component: ErrorComponent}, // put at the last row
// All Category

// {path: '**', component: ErrorComponent},
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
