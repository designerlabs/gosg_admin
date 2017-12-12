import { Component, Inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';

export const appRoutes: Routes = [
{path: '404', component: ErrorComponent},
{path: 'index', component: AppComponent},
{path: '', redirectTo: 'index', pathMatch: 'full'},
{path: '**', component: ErrorComponent}
];
