import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowHeadersComponent } from './mainMenu/show-headers/show-headers.component';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HeaderTileComponent } from './templates/header-tile/header-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowHeadersComponent,
    HeaderTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
