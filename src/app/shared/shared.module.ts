import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import { MatButtonModule } from '@angular/material';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatInputModule} from '@angular/material/input';
// import { MatMenuModule } from '@angular/material/menu';
// import {MatIconModule} from '@angular/material/icon';
// import {MatCardModule} from '@angular/material/card';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatSelectModule} from '@angular/material/select';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import {MatExpansionModule} from '@angular/material/expansion';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatPaginator, MatTableModule} from '@angular/material';
import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatNativeDateModule,
  MatSortModule,
  MatPaginatorModule,
} from '@angular/material';

import { LeftmenuComponent } from '../leftmenu/leftmenu.component';
import { RightcontentComponent } from '../rightcontent/rightcontent.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule,
],
declarations: [
  // LeftmenuComponent,
  // RightcontentComponent
],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule,
    // LeftmenuComponent,
    // RightcontentComponent
],
  providers: []
})

export class SharedModule { }
