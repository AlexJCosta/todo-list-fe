import { Routes } from '@angular/router';
import { AboutComponent } from 'src/app/pages/about/about.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'about',       component: AboutComponent }
];
