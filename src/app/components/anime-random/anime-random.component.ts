import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AnimeService } from '../anime-services/anime-search.service';
import { Subscription } from 'rxjs';
import { isNil, map } from 'lodash';
import {
  AnimeDetailsModel,
  Media,
} from '../anime-details/model/anime-detail.model';
import { AnimeDetailService } from '../anime-details/anime-details.service';
import { Router } from '@angular/router';

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

  constructor(
    private animeSearchService: AnimeService,
    private animeDetailService: AnimeDetailService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
  }

  ngOnDestroy(): void {
    this.animeSubscribe.unsubscribe();
  }

  ngAfterViewInit(): void {
    try {
      this.getAnimeDetail();
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }

  private getAnimeDetail() {
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
          const animeRecsMap = map(this.anime.recommendations.nodes, (node) => {
            return node.mediaRecommendation;
          });
          this.animeRecs = this.animeDetailService.getRandomRecs(
            animeRecsMap,
            10
          );
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
  }

  goToAnime(recId: number) {
    this.router.navigate([`/animeSearch/${recId}`]);
  }

  randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}