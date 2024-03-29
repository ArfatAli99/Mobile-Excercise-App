import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoreComponentsModule } from '../../../components/components.module';

import { MailPage } from './mail.page';

const routes: Routes = [
  {
    path: '',
    component: MailPage
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
  declarations: [MailPage]
})
export class MailPageModule {}
