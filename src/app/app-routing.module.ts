import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './myComponent/users/log-in/log-in.component';
import { RegisterComponent } from './myComponent/users/register/register.component';
import { HomeComponent } from './myComponent/home/home.component';
import { AuthService } from './_Guard/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent,canActivate: [ AuthService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
