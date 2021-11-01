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
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      { path: 'home', component: HomePageComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ], { relativeLinkResolution: 'legacy' }),
    AnimeSearchModule,
    BrowserAnimationsModule,
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
