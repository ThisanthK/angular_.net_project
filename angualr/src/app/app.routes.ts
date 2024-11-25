import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { RecordsComponent } from './page/records/records.component';
import { ContactComponent } from './page/contact/contact.component';
import { EmployeeformComponent } from './page/records/employeeform/employeeform.component';

export const routes: Routes = [
    {
        path:"", 
        component:HomeComponent
    },
    {
        path:"home", 
        component:HomeComponent
    },
    {   
        path:'login',
        component:LoginComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'records',
        component:RecordsComponent
    },
    {
        path:'edit/:id',
        component:EmployeeformComponent
    },
    {
        path:'contact',
        component:ContactComponent
    }
];
