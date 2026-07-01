import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowHeadersComponent } from './mainMenu/show-headers/show-headers.component';

const routes: Routes = [
  {
    path: 'headers',
    component: ShowHeadersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
