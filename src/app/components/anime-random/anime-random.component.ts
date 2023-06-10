import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AnimeService } from '../anime-services/anime-search.service';
import { Subscription } from 'rxjs';
import { isEmpty, isNil, map } from 'lodash';
import {
  AnimeDetailsModel,
  Media,
  MediaTrailer,
  Studios,
} from '../anime-details/model/anime-detail.model';
import { finalize } from 'rxjs/operators';
import { MediaType } from '../anime-services/model/anime.model';

@Component({
  selector: 'anime-random-component',
  templateUrl: './anime-random.html',
  styleUrls: ['../anime-details/anime-details.component.scss'],
})
export class AnimeRandomComponent implements OnInit, OnDestroy, AfterViewInit {
  animeTitle: string = 'blank';
  anime: AnimeDetailsModel;
  animeRecs: Media[] = [];
  aniID: any;
  param: any;
  animeSubscribe: Subscription;
  isLoading = false;
  constructor(private animeSearchService: AnimeService) {
  }

  ngOnInit() {
    // pipe
    this.isLoading = true;

    
  }

  ngAfterViewInit(): void {
    try {
      const page = this.randomInteger(1, 345);
      this.animeSubscribe = this.animeSearchService
        .getRandomAnime(page)
        .subscribe((res: any) => {
          console.log('Response: ' + res.data.Page.media);
          const medias = res.data.Page.media;
          this.anime = medias[this.randomInteger(0, 49)];
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
          this.anime.description = this.anime?.description
            ? this.anime?.description.replace(
                /(<|&lt;)br\s*\/*(>|&gt;)|(<|&lt;)i\s*\/*(>|&gt;)|(<|&lt;)\s*\/*br(>|&gt;)|(<|&lt;)\s*\/*i(>|&gt;)|(<|&lt;)<|<\/b>|\s*\/*(>&gt;)|(<|&lt;)<|<b>|\s*\/*(>&gt;)/g,
                ''
              )
            : '';
        });
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }
  ngOnDestroy(): void {
    this.animeSubscribe.unsubscribe();
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

  randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
