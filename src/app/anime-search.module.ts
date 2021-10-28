import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { AppMovieSearchComponent } from './components/anime-search/anime-search.component';
import { MovieService } from './components/anime-services/movie.Search.service';
import { MovieDetailsGuard } from './components/anime-shared/movie.details.component.guard';
import { ConvertToSpacesPipe } from './convert-to-space-pipe';


@NgModule({
    declarations: [
      AnimeDetailsComponent,
      AppMovieSearchComponent,
      ConvertToSpacesPipe
    ],
    imports: [
      BrowserModule,
      RouterModule.forChild([
        { path: 'animeSearch', component: AppMovieSearchComponent},
        { path: 'animeSearch/:id',
             component: AnimeDetailsComponent,
             canActivate: [MovieDetailsGuard]},
      ])
    ],
    providers: [
      MovieService
    ]
    ,
    bootstrap: [AnimeDetailsComponent]
  })
export class AnimeSearchModule { }
