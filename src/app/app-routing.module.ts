import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'reports',
        loadChildren: () => import('./main-layout/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./main-layout/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'files',
        loadChildren: () => import('./main-layout/files/files.module').then(m => m.FilesModule)
      },
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
