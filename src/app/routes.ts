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

import { UsertblComponent } from './authentication/usertbl/usertbl.component';

export const appRoutes: Routes = [
{path: 'index', component: RightcontentComponent},
{path: '', redirectTo: 'index', pathMatch: 'full'},
{path: 'addtemplate', component: AddtemplateComponent},
{path: 'articletbl/:id', component: ArticletblComponent, canActivate: [NavRouterActivatorService]},
{path: 'feedback', component: FeedbacktblComponent},
{path: '404', component: ErrorComponent},
{path: 'user/:id', component: UserComponent},
{path: 'roles', component: RolesComponent},
{path: 'userlist', component: UsertblComponent}



// {path: '**', component: ErrorComponent},
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
