import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivityPage } from './activity.page';
import { CoreComponentsModule } from '../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: ActivityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActivityPage]
})
export class ActivityPageModule {}
