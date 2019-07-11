import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';
import { AuthenticationGuard } from '../core/guards/authentification.guards';
import { IsAdminGuard } from '../core/guards/isAdmin.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
      {
        path: 'users',
        loadChildren: '../user-management/user-management.module#UserManagementModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: '',
        loadChildren: '../spots/spots.module#SpotsModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'admin',
        loadChildren: '../admin-management/admin-management.module#AdminManagementModule',
        canActivate: [IsAdminGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule {}
