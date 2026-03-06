import { Routes } from '@angular/router';

export const routes: Routes = [

{
path:'',
redirectTo:'login',
pathMatch:'full'
},

{
path:'login',
loadComponent:() =>
import('./pages/login/login.page').then(m=>m.LoginPage)
},


{
path:'tasks',
loadComponent:() =>
import('./pages/tasks/tasks.page').then(m=>m.TasksPage)
}

];