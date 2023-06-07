import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '../anime-services/anime-search.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  AnimeDetailsModel,
  CharacterNodes,
  Media,
  MediaTrailer,
  Studios,
} from './model/anime-detail.model';
import { isEmpty, isNil, map } from 'lodash';

@Component({
  selector: 'anime-details-component',
  templateUrl: './anime-details.html',
  styleUrls: ['./anime-details.component.scss'],
})
export class AnimeDetailsComponent implements OnInit, OnDestroy {
  animeTitle: string = 'blank';
  anime: AnimeDetailsModel;
  animeRecs: Media[] = [];
  aniID: any;
  param: any;
  mysub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animeSearchService: AnimeService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      this.animeSearchService
        .getAnimeByID(routeParams.id)
        .subscribe((res: any) => {
          console.log('Response: ' + res.data.Media);
          this.anime = res.data.Media;
          if (
            !isNil(this.anime.recommendations.nodes) &&
            this.anime.recommendations.nodes.length > 0
          ) {
            const animeRecsMap = map(
              this.anime.recommendations.nodes,
              (node) => {
                return node.mediaRecommendation;
              }
            );
            this.animeRecs = this.getRandomRecs(animeRecsMap, 10);
          }

          // tslint:disable-next-line:max-line-length
          this.anime.averageScore = this.anime.averageScore / 10;
          // tslint:disable-next-line:max-line-length
          this.anime.description = this.anime.description.replace(
            /(<|&lt;)br\s*\/*(>|&gt;)|(<|&lt;)i\s*\/*(>|&gt;)|(<|&lt;)\s*\/*br(>|&gt;)|(<|&lt;)\s*\/*i(>|&gt;)|(<|&lt;)<|<\/b>|\s*\/*(>&gt;)|(<|&lt;)<|<b>|\s*\/*(>&gt;)/g,
            ''
          );
        });

      console.log('routeParams' + JSON.stringify(routeParams.id));
      console.log(
        'routeParamsresult' +
          JSON.stringify(this.animeSearchService.getAnimeByID(routeParams.id))
      );
    });
  }

  ngOnDestroy(): void {}

  animelist() {
    console.log('array' + JSON.stringify(this.anime));
    console.log('param' + this.param);
  }

  getAnimeStudiosName(studios: Studios) {
    if (!isEmpty(studios.nodes)) {
      const studioMap = map(studios.nodes, (node) => {
        return node.name;
      });

      return studioMap.toString();
    }
  }

  getAnimeGenres(genres: string[]) {
    if (!isEmpty(genres)) {
      const genresMap = map(genres, (genre) => {
        return genre;
      });

      return genresMap.toString();
    }
  }

  getAnimeTrailer(trailer: MediaTrailer) {
    if (!isNil(trailer) && !isNil(trailer.id)) {
      return `https://youtube.com/watch?v=${trailer.id}`;
    }
  }

  goToTrailerLink(trailerLink: string) {
    window.open(trailerLink, '_blank');
  }

  getRandomRecs(medias: Media[], maxRecs: number) {

    let len = medias.length;

    if (maxRecs > len) {
      maxRecs = medias.length;
    }

    let result: Media[] = new Array(maxRecs);
    const taken = new Array(len);

    while (maxRecs--) {
      var x = Math.floor(Math.random() * len);
      result[maxRecs] = medias[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  getMonthAsText(month: number) {
    switch (month) {
      case 1: {
        return 'January';
      }
      case 2: {
        return 'February';
      }
      case 3: {
        return 'March';
      }
      case 4: {
        return 'April';
      }
      case 5: {
        return 'May';
      }
      case 6: {
        return 'June';
      }
      case 7: {
        return 'July';
      }
      case 8: {
        return 'August';
      }
      case 9: {
        return 'September';
      }
      case 10: {
        return 'October';
      }
      case 11: {
        return 'November';
      }
      case 12: {
        return 'December';
      }
    }
  }
}
