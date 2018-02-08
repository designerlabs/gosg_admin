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
import { FeedbacktblComponent } from './feedback/view/feedbacktbl/feedbacktbl.component';
import { FeedbacktypeComponent } from './feedback/feedbacktype/feedbacktype.component';
import { FeedbacktypetblComponent } from './feedback/feedbacktype/feedbacktypetbl/feedbacktypetbl.component';
import { GroupstblComponent } from './authentication/groups/groupstbl/groupstbl.component';
import { CountryComponent } from './referencecode/country/country.component';
import { StateComponent } from './referencecode/state/state.component';
import { CityComponent } from './referencecode/city/city.component';
import { ReligionComponent } from './referencecode/religion/religion.component';
import { ReligiontblComponent } from './referencecode/religion/religiontbl/religiontbl.component';
import { PostcodeComponent } from './referencecode/postcode/postcode.component';
import { EthnicityComponent } from './referencecode/ethnicity/ethnicity.component';
import { EthnicitytblComponent } from './referencecode/ethnicity/ethnicitytbl/ethnicitytbl.component';
import { FaqtblComponent } from './faq/faqtbl/faqtbl.component';
import { AnnouncementtblComponent } from './announcement/announcementtbl/announcementtbl.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { FeedbacksubjecttblComponent } from './feedback/feedbacksubject/feedbacksubjecttbl/feedbacksubjecttbl.component';
import { FeedbacksubjectComponent } from './feedback/feedbacksubject/feedbacksubject.component';
import { FaqComponent } from './faq/faq.component';
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
import { MaincategoryComponent } from './categories/maincategory/maincategory.component';
import { MaincategorytblComponent } from './categories/maincategory/maincategorytbl/maincategorytbl.component';
import { SubcategoryComponent } from './categories/subcategory/subcategory.component';
import { SubcategorytblComponent } from './categories/subcategory/subcategorytbl/subcategorytbl.component';
import { CategoryComponent } from './categories/category/category.component';
import { CategorytblComponent } from './categories/category/categorytbl/categorytbl.component';
import { UserpermissionComponent } from './authentication/user/userpermission.component';
import { AgencytypetblComponent } from './agency/agencytype/agencytypetbl/agencytypetbl.component';
import { AgencytypeComponent } from './agency/agencytype/agencytype.component';
import { AgencyapptypetblComponent } from './agency/agencyapptype/agencyapptypetbl/agencyapptypetbl.component';
import { AgencyapptypeComponent } from './agency/agencyapptype/agencyapptype.component';

export const appRoutes: Routes = [
{path: 'index', component: RightcontentComponent},
{path: '', redirectTo: 'index', pathMatch: 'full'},
{path: 'addtemplate', component: AddtemplateComponent},
{path: 'articletbl/:id', component: ArticletblComponent, canActivate: [NavRouterActivatorService]},
{path: 'feedback/message/visitor', component: FeedbacktblComponent},
{path: 'feedback/message/admin', component: FeedbacktblComponent},
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
{path: 'language/add', component: LanguageComponent},
{path: 'language/:id', component: LanguageComponent},
{path: 'language', component: LanguagetblComponent},
{path: 'agencytype/add', component: AgencytypeComponent},
{path: 'agencytype/:id', component: AgencytypeComponent},
{path: 'agencytype', component: AgencytypetblComponent},
{path: 'agencyapptype/add', component: AgencyapptypeComponent},
{path: 'agencyapptype/:id', component: AgencyapptypeComponent},
{path: 'agencyapptype', component: AgencyapptypetblComponent},
{path: 'user/:id', component: UserComponent},
{path: 'roles', component: RolesComponent},
{path: 'userlist', component: UsertblComponent},
{path: 'groupmodule' , component: GroupstblComponent},
{path: 'groups/add' , component: GroupsComponent},
{path: 'groups/:id', component: GroupsComponent},
{path: 'poll/questions', component: PollquestiontblComponent},
{path: 'poll/questions/:id', component: PollquestionComponent},
{path: 'poll/questions/add', component: PollquestionComponent},
{path: 'poll/results', component: PollresultComponent},
{path: 'slider', component: SlidertblComponent},
{path: 'slider/add', component: SliderComponent},
{path: 'slider/:id', component: SliderComponent},
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
{path: 'maincategory', component: MaincategorytblComponent},
{path: 'subcategory', component: SubcategorytblComponent},
{path: 'category', component: CategorytblComponent},
{path: 'maincategory/add', component: MaincategoryComponent},
{path: 'subcategory/add', component: SubcategoryComponent},
{path: 'category/add', component: CategoryComponent},
{path: 'maincategory/:id', component: MaincategoryComponent},
{path: 'subcategory/:id', component: SubcategoryComponent},
{path: 'category/:id', component: CategoryComponent},
{path: 'faq', component: FaqComponent},
{path: 'editor', component: EditorComponent},
{path: 'faq', component: FaqtblComponent},
{path: 'faq/:id', component: FaqComponent},
{path: 'faq/add', component: FaqComponent},
{path: 'editor', component: EditorComponent},

// Article and Announcement Category
{path: 'admin', component: UsertblComponent},
{path: 'admin/permission', component: UserpermissionComponent},
{path: 'announcement', component: AnnouncementtblComponent},
{path: 'announcement/:id', component: AnnouncementComponent},
{path: 'announcement/add', component: AnnouncementComponent},
{path: 'address/type', component: AddresstypetblComponent},
{path: 'address/type/:id', component: AddresstypeComponent},
{path: 'address/type/add', component: AddresstypeComponent},
{path: 'account', component: AccountstatustblComponent},
{path: 'account/:id', component: AccountstatusComponent},
{path: 'account/add', component: AccountstatusComponent},
{path: '**', component: ErrorComponent}, // put at the last row
// All Category

// {path: '**', component: ErrorComponent},
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
