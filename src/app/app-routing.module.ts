import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./page/page.module").then(m => m.PageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
