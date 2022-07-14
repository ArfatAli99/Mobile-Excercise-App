import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollViewerPageModule } from './poll-viewer/poll-viewer.module';
const routes: Routes = [
  { path: 'polls/:id', loadChildren: './polls/polls.module#PollsPageModule' },
  

];


@NgModule({
  imports: [
    PollViewerPageModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PollsRoutingModule { }
