import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { AsiShowroomCommonModule } from '../common/asi-showroom-common.module';

const viewsRouter: Routes = [
  { path: 'home', component: HomePageComponent },
  {
    path: 'asi-ngtools',
    loadChildren: () => import('src/app/views/showroom/asi-ngtools/asi-ngtools.module').then(m => {
      return m.AsiNgToolsPresentationModule
    })
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }];

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    RouterModule.forRoot(viewsRouter),
    AsiShowroomCommonModule,
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  entryComponents: []
})

export class ViewsRoutingModule { }
