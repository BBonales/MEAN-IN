import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersComponent } from './components/users/users.component';
import { SpecificListComponent } from './components/specific-list/specific-list.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [ {
  path: '',
  redirectTo: '/signin',
  pathMatch: 'full'
},
{
  path: 'list-users',
  component: UsersComponent,
  canActivate: [AuthGuard]
},
{
  path: 'signin',
  component: SigninComponent
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'specific-list',
  component: SpecificListComponent,
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
