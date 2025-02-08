import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'login'

    },
    {
        path:'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register-user/register-user.component').then(c => c.RegisterUserComponent)
    },
    {
        path: 'service-list',
        loadComponent: () => import('./service-list/service-list.component').then(c => c.ServiceListComponent)
    },  
];
