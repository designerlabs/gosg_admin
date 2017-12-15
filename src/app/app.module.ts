import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { NavComponent } from './nav/nav.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { RightcontentComponent } from './rightcontent/rightcontent.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AddtemplateComponent } from './addtemplate/addtemplate.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LeftmenuComponent,
    MaincontentComponent,
    RightcontentComponent,
    ErrorComponent,
    AddtemplateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
