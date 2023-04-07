import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { AppAnimeSearchComponent } from './components/anime-search/anime-search.component';
import { AnimeService } from './components/anime-services/anime-search.service';
import { AnimeDetailsGuard } from './components/anime-shared/anime.details.component.guard';
import { ConvertToSpacesPipe } from './convert-to-space-pipe';
import { SharedModule } from './shared.modules';


@NgModule({
    declarations: [
      AnimeDetailsComponent,
      AppAnimeSearchComponent,
      ConvertToSpacesPipe
    ],
    imports: [
      BrowserModule,
      SharedModule,
      RouterModule.forChild([
        { path: 'animeSearch', component: AppAnimeSearchComponent},
        { path: 'animeSearch/:id',
             component: AnimeDetailsComponent,
             canActivate: [AnimeDetailsGuard]},
      ])
    ],
    providers: [
      AnimeService
    ]
    ,
    bootstrap: [AnimeDetailsComponent]
  })
export class AnimeSearchModule { }
