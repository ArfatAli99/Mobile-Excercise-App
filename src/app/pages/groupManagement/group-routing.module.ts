import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CommentsViewerPageModule } from './comments-viewer/comments-viewer.module';

const routes: Routes = [
  { 
    path: 'my-groups', 
    loadChildren: './my-groups/my-groups.module#MyGroupsPageModule' 
  },
  { 
  	path: 'group/:groupId', 
  	loadChildren: './group-home/group-home.module#GroupHomePageModule' },
  { 
  	path: 'group-documents/:groupId', 
  	loadChildren: './group-documents/group-documents.module#GroupDocumentsPageModule' },
  { 
  	path: 'group-posts/:groupId', 
  	loadChildren: './group-posts/group-posts.module#GroupPostsPageModule' },

  { path: 'group-meetings/:groupId', 
    loadChildren: './group-meetings/group-meetings.module#GroupMeetingsPageModule' },

  { path: 'group-activities/:groupId', 
    loadChildren: './group-activities/group-activities.module#GroupActivitiesPageModule' },

  { path: 'pending-groups', 
    loadChildren: './pending-groups/pending-groups.module#PendingGroupsPageModule' },
    { path: 'group-posts/:groupId/:messageId', 
    loadChildren: './comments-viewer/comments-viewer.module#CommentsViewerPageModule' }

];


@NgModule({
  imports: [
  // CommentsViewerPageModule,
  RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
