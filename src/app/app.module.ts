import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.modules';
import { AnimeSearchModule } from './anime-search.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { MovieService } from './components/anime-services/movie.Search.service';
import { NavBarComponent } from './components/anime-navbar/page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'home', component: HomePageComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    AnimeSearchModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
