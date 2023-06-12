import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '../anime-services/anime-search.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  AnimeDetailsModel,
  Media,
  MediaTrailer,
  Studios,
} from './model/anime-detail.model';
import { isEmpty, isNil, map } from 'lodash';
import { AnimeDetailService } from './anime-details.service';

@Component({
  selector: 'anime-details-component',
  templateUrl: './anime-details.html',
  styleUrls: ['./anime-details.component.scss'],
})
export class AnimeDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  animeTitle: string = 'blank';
  anime: AnimeDetailsModel;
  animeRecs: Media[] = [];
  aniID: any;
  param: any;
  routeSubscribe: Subscription;
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private animeSearchService: AnimeService,
    private animeDetailService: AnimeDetailService
  ) {}

  ngOnInit() {
    this.isLoading = true;
  }

  ngAfterViewInit(): void {
    this.routeSubscribe = this.getRouterParamsSubscription();
  }

  ngOnDestroy(): void {
    this.routeSubscribe.unsubscribe();
  }
  private getRouterParamsSubscription(): Subscription {
    return this.route.params.subscribe((routeParams) => {
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
            this.animeRecs = this.animeDetailService.getRandomRecs(animeRecsMap, 10);
          }

          // tslint:disable-next-line:max-line-length
          this.anime.averageScore = this.anime.averageScore / 10;
          // tslint:disable-next-line:max-line-length
          this.anime.description = this.anime.description.replace(
            /(<|&lt;)br\s*\/*(>|&gt;)|(<|&lt;)i\s*\/*(>|&gt;)|(<|&lt;)\s*\/*br(>|&gt;)|(<|&lt;)\s*\/*i(>|&gt;)|(<|&lt;)<|<\/b>|\s*\/*(>&gt;)|(<|&lt;)<|<b>|\s*\/*(>&gt;)/g,
            ''
          );
        });
      this.isLoading = false;
    });
  }


}
