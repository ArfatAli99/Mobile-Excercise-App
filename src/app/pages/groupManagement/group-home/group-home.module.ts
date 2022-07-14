import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { GroupHomePage } from './group-home.page';
import { CoreComponentsModule } from '../../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: GroupHomePage
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
  declarations: [ GroupHomePage],
  exports: [ ]
})
export class GroupHomePageModule {}
