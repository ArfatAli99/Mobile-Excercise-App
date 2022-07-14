import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllNewsPage } from './all-news.page';
import { CoreComponentsModule } from '../../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: AllNewsPage
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
  declarations: [AllNewsPage]
})
export class AllNewsPageModule {}
