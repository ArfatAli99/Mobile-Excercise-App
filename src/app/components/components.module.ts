import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Modules
import { CoreActivityComponent} from './core-activity/core-activity.component'
import { ThumbnailListItemComponent } from './thumbnail-list-item/thumbnail-list-item.component';
import { DocsListItemComponent } from './docs-list-item/docs-list-item.component';
import { ModulesGridComponent } from './modules-grid/modules-grid.component';

import  { GridViewPipe } from '../pipes/grid-view.pipe';
const components =[
	CoreActivityComponent,
	ThumbnailListItemComponent,
	DocsListItemComponent,
	ModulesGridComponent,
	GridViewPipe
];

@NgModule({
	declarations: components,
	imports: [
		IonicModule,
		CommonModule,
	],
    exports: [
        ...components,
    ],
    entryComponents: []
})
export class CoreComponentsModule {}
