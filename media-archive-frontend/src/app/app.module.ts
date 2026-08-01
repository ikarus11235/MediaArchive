import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowHeadersComponent } from './mainMenu/show-headers/show-headers.component';
import { RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { HeaderTileComponent } from './templates/header-tile/header-tile.component';
import { ShowSeasonsComponent } from './mainMenu/show-seasons/show-seasons.component';
import { EpisodeTileComponent } from './templates/episode-tile/episode-tile.component';
import { ShowVideoComponent } from './mainMenu/show-video/show-video.component';
import { ShowGalleryComponent } from './mainMenu/show-gallery/show-gallery.component';
import { HeaderDialogComponentComponent } from './templates/header-dialog-component/header-dialog-component.component';
import { FormsModule } from '@angular/forms';
import { SeasonDialogComponent } from './templates/season-dialog/season-dialog.component';
import { EpisodeImagesDialogComponent } from './templates/episode-images-dialog/episode-images-dialog.component';
import { LoginComponent } from './login/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ShowHeadersComponent,
    HeaderTileComponent,
    ShowSeasonsComponent,
    EpisodeTileComponent,
    ShowVideoComponent,
    ShowGalleryComponent,
    HeaderDialogComponentComponent,
    SeasonDialogComponent,
    EpisodeImagesDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    FormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },
  provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
