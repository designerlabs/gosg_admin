import { Component, Inject, ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';
import { RightcontentComponent } from './rightcontent/rightcontent.component';
import { AddtemplateComponent } from './addtemplate/addtemplate.component';
import { ArticletblComponent } from './articletbl/articletbl.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NavRouterActivatorService } from './service/nav-router-activator.service';
import { UserManagementComponent } from './user-management/user-management.component';

export const appRoutes: Routes = [
{path: 'index', component: RightcontentComponent},
{path: '', redirectTo: 'index', pathMatch: 'full'},
{path: 'addtemplate', component: AddtemplateComponent},
{path: 'articletbl/:id', component: ArticletblComponent,  canActivate: [NavRouterActivatorService] },
{path: 'feedback', component: FeedbackComponent},
{path: 'usermgmt', component: UserManagementComponent},
{path: '404', component: ErrorComponent},



// {path: '**', component: ErrorComponent},
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
