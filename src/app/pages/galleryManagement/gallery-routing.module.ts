import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoViewerPageModule } from './photo-viewer/photo-viewer.module';
import { VideoViewerPageModule } from './video-viewer/video-viewer.module';

const routes: Routes = [

  { path: 'albums/:id', loadChildren: './albums/albums.module#AlbumsPageModule' },
  { path: 'photos', loadChildren: './photos/photos.module#PhotosPageModule' },
  { path: 'videos/:id', loadChildren: './videos/videos.module#VideosPageModule' }

];

@NgModule({
  imports: [
  	PhotoViewerPageModule,
    VideoViewerPageModule,
  	RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
