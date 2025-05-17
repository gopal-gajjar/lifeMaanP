import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FileListComponent } from './file-list/file-list.component';
import { FileEditComponent } from './file-edit/file-edit.component';
import { FileSizePipe } from './file-size.pipe';

const routes: Routes = [
  { path: '', component: FileListComponent },
  { path: 'new', component: FileEditComponent },
  { path: ':id', component: FileEditComponent }
];

@NgModule({
  declarations: [
    FileListComponent,
    FileEditComponent,
    FileSizePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class FilesModule { } 