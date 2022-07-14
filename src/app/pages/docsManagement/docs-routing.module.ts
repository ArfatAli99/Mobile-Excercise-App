import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentViewerPageModule } from './document-viewer/document-viewer.module';

const routes: Routes = [
  { 
    path: 'my-documents', 
    loadChildren: './my-documents/my-documents.module#MyDocumentsPageModule'
  },
  { 
    path: 'document-details', 
    loadChildren: './document-details/document-details.module#DocumentDetailsPageModule'
  }

];

@NgModule({
  imports: [
  	DocumentViewerPageModule,
  	RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
