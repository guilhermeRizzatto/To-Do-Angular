import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RouterOutlet } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { loginAuthGuard } from './loginauth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [loginAuthGuard]},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterOutlet],
  exports: [RouterModule]
})
export class AppRoutingModule { }
