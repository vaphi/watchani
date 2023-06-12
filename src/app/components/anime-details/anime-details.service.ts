import { Injectable } from '@angular/core';
import { isEmpty, isNil, map } from 'lodash';
import { Media, MediaTrailer, Studios } from './model/anime-detail.model';

@Injectable({
  providedIn: 'root',
})
export class AnimeDetailService {
  constructor() {}

  getAnimeTrailer(trailer: MediaTrailer) {
    if (!isNil(trailer) && !isNil(trailer.id)) {
      return `https://youtube.com/watch?v=${trailer.id}`;
    }
  }

  goToTrailerLink(trailerLink: string) {
    window.open(trailerLink, '_blank');
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
