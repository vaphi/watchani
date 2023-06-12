import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.modules';
import { AnimeSearchModule } from './anime-search.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { AnimeService } from './components/anime-services/anime-search.service';
import { NavBarComponent } from './components/anime-navbar/page-header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AnimeRandomComponent } from './components/anime-random/anime-random.component';
import { AnimeSearchStaticRecordsComponent } from './components/anime-search-static-records/anime-search-static-records.component';

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    SharedModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    RouterModule.forRoot(
      [
        { path: 'home', component: HomePageComponent },
        { path: 'random', component: AnimeRandomComponent },
        { path: 'top100Anime', component: AnimeSearchStaticRecordsComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: '**', redirectTo: 'home', pathMatch: 'full' },
      ],
      { relativeLinkResolution: 'legacy' }
    ),
    AnimeSearchModule,
    BrowserAnimationsModule,
  ],
  providers: [AnimeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
