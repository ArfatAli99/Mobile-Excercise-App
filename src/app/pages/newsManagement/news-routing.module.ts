import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsViewerPageModule } from './news-viewer/news-viewer.module';
import { CreateNewsPageModule } from './create-news/create-news.module';

const routes: Routes = [
  { 
    path: 'all-news/:id', 
    loadChildren: './all-news/all-news.module#AllNewsPageModule' 
  }
];


@NgModule({
  imports: [
    NewsViewerPageModule,
    CreateNewsPageModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
