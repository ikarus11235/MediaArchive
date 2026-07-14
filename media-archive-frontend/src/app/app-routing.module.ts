import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowHeadersComponent } from './mainMenu/show-headers/show-headers.component';
import { ShowSeasonsComponent } from './mainMenu/show-seasons/show-seasons.component';
import { ShowVideoComponent } from './mainMenu/show-video/show-video.component';
import { ShowGalleryComponent } from './mainMenu/show-gallery/show-gallery.component';

const routes: Routes = [
  {
    path: 'headers',
    component: ShowHeadersComponent
  },
  {
    path: 'season/:id',
    component: ShowSeasonsComponent
  },
  {
    path: 'episode/:id',
    component: ShowVideoComponent
  },
  {
    path: 'gallery/:id',
    component: ShowGalleryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
