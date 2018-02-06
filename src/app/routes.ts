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
import { UsertblComponent } from './authentication/usertbl/usertbl.component';
import { PollquestiontblComponent } from './poll/pollquestion/pollquestiontbl/pollquestiontbl.component';
import { PollquestionComponent } from './poll/pollquestion/pollquestion.component';
import { PollresultComponent } from './poll/pollresult/pollresult.component';
import { SliderComponent } from './slider/slider.component';
import { FeedbacktblComponent } from './feedback/view/feedbacktbl/feedbacktbl.component';
import { FeedbacktypeComponent } from './feedback/type/feedbacktype/feedbacktype.component';
import { FeedbacktypetblComponent } from './feedback/type/feedbacktypetbl/feedbacktypetbl.component';
import { GroupstblComponent } from './authentication/groups/groupstbl/groupstbl.component';
import { CountryComponent } from './referencecode/country/country.component';
import { StateComponent } from './referencecode/state/state.component';
import { CityComponent } from './referencecode/city/city.component';
import { EthnicityComponent } from './referencecode/ethnic/ethnicity/ethnicity.component';
// import { EthnicitytblComponent } from './referencecode/ethnic/ethnicitytbl/ethnicitytbl.component';
import { ReligionComponent } from './referencecode/religion/religion.component';
import { PostcodeComponent } from './referencecode/postcode/postcode.component';
import { FeedbacksubjecttblComponent } from './feedback/subject/feedbacksubjecttbl/feedbacksubjecttbl.component';
import { FeedbacksubjectComponent } from './feedback/subject/feedbacksubject/feedbacksubject.component';
import { FaqComponent } from './faq/faq.component';
import { EditorComponent } from './editor/editor.component';
import { SlidertblComponent } from './slider/slidertbl/slidertbl.component';

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
{path: 'user/:id', component: UserComponent},
{path: 'roles', component: RolesComponent},
{path: 'userlist', component: UsertblComponent},
<<<<<<< HEAD
{path: 'groupmodule' , component: GroupstblComponent},
{path: 'groups/add' , component: GroupsComponent},
{path: 'groups/:id', component: GroupsComponent},
{path: 'poll/questions', component: PollquestionComponent},
{path: 'poll/questions/:id', component: PollquestiondetailsComponent},
{path: 'poll/questions/add', component: PollquestiondetailsComponent},
=======
{path: 'groupmodule' , component: GroupsviewComponent},
{path: 'groupmodule/add' , component: GroupseditComponent},
{path: 'groups/:id', component: GroupseditComponent},
{path: 'poll/questions', component: PollquestiontblComponent},
{path: 'poll/questions/:id', component: PollquestionComponent},
{path: 'poll/questions/add', component: PollquestionComponent},
>>>>>>> 4d68827d894c114c148f878a70086c2ffdab6e47
{path: 'poll/results', component: PollresultComponent},
{path: 'slider', component: SlidertblComponent},
{path: 'slider/add', component: SliderComponent},
{path: 'slider/:id', component: SliderComponent},
{path: 'reference/country', component: CountryComponent},
{path: 'reference/city', component: CityComponent},
{path: 'reference/state', component: StateComponent},
{path: 'reference/ethnicity', component: EthnicityComponent},
// {path: 'reference/ethnic/ethnicitytbl', component: EthnicitytblComponent},
{path: 'reference/religion', component: ReligionComponent},
{path: 'reference/postcode', component: PostcodeComponent},
{path: 'faq', component: FaqComponent},
{path: 'editor', component: EditorComponent}




// {path: '**', component: ErrorComponent},
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
