import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowHeadersComponent } from './mainMenu/show-headers/show-headers.component';
import { ShowSeasonsComponent } from './mainMenu/show-seasons/show-seasons.component';
import { ShowVideoComponent } from './mainMenu/show-video/show-video.component';
import { ShowGalleryComponent } from './mainMenu/show-gallery/show-gallery.component';
import { LoginComponent } from './login/login/login.component';
import { authenticationGuardGuard } from './guards/authentication-guard.guard';

const routes: Routes = [
  {
    path: 'headers',
    component: ShowHeadersComponent,
    canActivate: [authenticationGuardGuard]
  },
  {
    path: 'season/:id',
    component: ShowSeasonsComponent,
    canActivate: [authenticationGuardGuard]
  },
  {
    path: 'episode/:id',
    component: ShowVideoComponent,
    canActivate: [authenticationGuardGuard]
  },
  {
    path: 'gallery/:id',
    component: ShowGalleryComponent,
    canActivate: [authenticationGuardGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/headers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
