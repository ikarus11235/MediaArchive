import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowHeadersComponent } from './mainMenu/show-headers/show-headers.component';
import { ShowSeasonsComponent } from './mainMenu/show-seasons/show-seasons.component';

const routes: Routes = [
  {
    path: 'headers',
    component: ShowHeadersComponent
  },
  {
    path: 'season/:id',
    component: ShowSeasonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
