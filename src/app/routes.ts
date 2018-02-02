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
import { GroupsviewComponent } from './authentication/groups/groupsview.component';
import { UsertblComponent } from './authentication/usertbl/usertbl.component';
import { PollquestionComponent } from './pollquestion/pollquestion.component';
import { PollquestiondetailsComponent } from './pollquestion/pollquestiondetails/pollquestiondetails.component';
import { PollresultComponent } from './pollresult/pollresult.component';
import { SliderComponent } from './slider/slider.component';
import { FeedbacktblComponent } from './feedbackMod/view/feedbacktbl/feedbacktbl.component';
import { FeedbacktypeComponent } from './feedbackMod/type/feedbacktype/feedbacktype.component';
import { FeedbacktypetblComponent } from './feedbackMod/type/feedbacktypetbl/feedbacktypetbl.component';
import { GroupseditComponent } from './authentication/groups/groupsedit.component';
import { CountryComponent } from './referencecode/country/country.component';
import { StateComponent } from './referencecode/state/state.component';
import { CityComponent } from './referencecode/city/city.component';
import { EthnicityComponent } from './referencecode/ethnicity/ethnicity.component';
import { ReligionComponent } from './referencecode/religion/religion.component';

export const appRoutes: Routes = [
{path: 'index', component: RightcontentComponent},
{path: '', redirectTo: 'index', pathMatch: 'full'},
{path: 'addtemplate', component: AddtemplateComponent},
{path: 'articletbl/:id', component: ArticletblComponent, canActivate: [NavRouterActivatorService]},
{path: 'feedback/message/visitor', component: FeedbacktblComponent},
{path: 'feedback/message/admin', component: FeedbacktblComponent},
{path: 'feedback/type', component: FeedbacktypetblComponent},
{path: 'feedback/type/:id', component: FeedbacktypeComponent},
{path: '404', component: ErrorComponent},
{path: 'user/:id', component: UserComponent},
{path: 'roles', component: RolesComponent},
{path: 'userlist', component: UsertblComponent},
{path: 'groupmodule' , component: GroupsviewComponent},
{path: 'groups/:id', component: GroupseditComponent},
{path: 'poll/questions', component: PollquestionComponent},
{path: 'poll/questions/:id', component: PollquestiondetailsComponent},
{path: 'poll/questions/add', component: PollquestiondetailsComponent},
{path: 'poll/results', component: PollresultComponent},
{path: 'slider', component: SliderComponent},
{path: 'slider/:id', component: SliderComponent},
{path: 'reference/country', component: CountryComponent},
{path: 'reference/city', component: CityComponent},
{path: 'reference/state', component: StateComponent},
{path: 'reference/ethnicity', component: EthnicityComponent},
{path: 'reference/religion', component: ReligionComponent}




// {path: '**', component: ErrorComponent},
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
