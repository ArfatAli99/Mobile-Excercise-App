import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PollsPage } from './polls.page';
import { CoreComponentsModule } from '../../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: PollsPage
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
  declarations: [PollsPage]
})
export class PollsPageModule {}
