import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { DetailedViewComponent } from './components/detailed-view/detailed-view.component';
import { TeamBuilderViewComponent } from './components/team-builder-view/team-builder-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login-view', component: LoginViewComponent },
  { path: 'list-view', component: ListViewComponent, canActivate : [AuthGuard] },
  { path: 'detailed-view/:id', component: DetailedViewComponent, canActivate : [AuthGuard] },
  { path: 'team-builder-view', component: TeamBuilderViewComponent, canActivate : [AuthGuard] },
  { path: 'user-view', component: UserViewComponent, canActivate : [AuthGuard] },
  { path: '', redirectTo: 'login-view', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [],
  bootstrap: [RouterModule]
})
export class AppRoutingModule { }
