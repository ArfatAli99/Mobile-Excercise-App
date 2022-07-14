import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
 
  { 
    path: 'dashboard', 
    loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' 
  },
  
  { 
    path: 'activity', 
    loadChildren: './pages/activity/activity.module#ActivityPageModule' 
  },
  
  { 
    path: 'allmeetings', 
    loadChildren: './pages/all-meetings/all-meetings.module#AllMeetingsPageModule' 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
