import { Component, Inject, ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';
import { RightcontentComponent } from './rightcontent/rightcontent.component';
import { AddtemplateComponent } from './addtemplate/addtemplate.component';
import { ArticletblComponent } from './articletbl/articletbl.component';
import { FeedbacktblComponent } from './feedbackMod/feedbacktbl/feedbacktbl.component';
import { NavRouterActivatorService } from './service/nav-router-activator.service';
import { UserComponent } from './user/user.component';
import { RolesComponent } from './roles/roles.component';
import { GroupsviewComponent } from './authentication/groups/groupsview/groupsview.component';
import { UsertblComponent } from './authentication/usertbl/usertbl.component';
import { PollquestionComponent } from './pollquestion/pollquestion.component';
import { PollquestiondetailsComponent } from './pollquestion/pollquestiondetails/pollquestiondetails.component';
import { PollresultComponent } from './pollresult/pollresult.component';
import { SliderComponent } from './slider/slider.component';
import { GroupseditComponent } from './authentication/groups/groupsedit/groupsedit.component';
import { FeedbacktypeComponent } from './feedbackTypeMod/feedbacktype/feedbacktype.component';
import { FeedbacktypetblComponent } from './feedbackTypeMod/feedbacktypetbl/feedbacktypetbl.component';


export const appRoutes: Routes = [
{path: 'index', component: RightcontentComponent},
{path: '', redirectTo: 'index', pathMatch: 'full'},
{path: 'addtemplate', component: AddtemplateComponent},
{path: 'articletbl/:id', component: ArticletblComponent, canActivate: [NavRouterActivatorService]},
{path: 'feedback', component: FeedbacktblComponent},
{path: 'feedbacktype', component: FeedbacktypetblComponent},
{path: 'feedbacktype/:id', component: FeedbacktypeComponent},
{path: '404', component: ErrorComponent},
{path: 'user/:id', component: UserComponent},
{path: 'roles', component: RolesComponent},
{path: 'userlist', component: UsertblComponent},
{path: 'groups' , component: GroupsviewComponent},
{path: 'groups/:id', component: GroupseditComponent},
{path: 'pollquestion', component: PollquestionComponent},
{path: 'pollquestion/:id', component: PollquestiondetailsComponent},
{path: 'pollresult', component: PollresultComponent},
{path: 'slider', component: SliderComponent},
{path: 'slider/:id', component: SliderComponent},




// {path: '**', component: ErrorComponent},
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
