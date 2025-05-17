import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportEditComponent } from './report-edit/report-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  { path: '', component: ReportListComponent },
  { path: 'new', component: ReportEditComponent },
  { path: ':id', component: ReportEditComponent }
];

@NgModule({
  declarations: [
    ReportListComponent,
    ReportEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class ReportsModule { } 