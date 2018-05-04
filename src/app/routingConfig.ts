import {  Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
export const approut: Routes = [
     {
         path : 'register',
component: RegisterComponent
},
{
path: '',
component: LoginComponent
},
{
    path: 'forget',
    component: ForgetComponent
},
{
path: 'dashboard',
component : DashboardComponent
},
{
    path: 'logout',
    component : LogoutComponent
}
 ];
