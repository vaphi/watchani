import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../anime-services/movie.Search.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './anime-details.html',
  styleUrls: ['./anime-details.component.scss']
})

export class AnimeDetailsComponent implements OnInit, OnDestroy {
  movieTitle: string = 'blank';
  anime: any;
  aniID: any;
  param: any;
  mysub: Subscription;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private movieSearchService: MovieService,
              private http: HttpClient) {
              }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
    this.movieSearchService.getAnimeByID(routeParams.id).subscribe((res: any) => {
      console.log('Response: ' + res.data.Media);
      this.anime = res.data.Media;
      // tslint:disable-next-line:max-line-length
      this.anime.avgScore = (this.anime.averageScore / 10);
      // tslint:disable-next-line:max-line-length
      this.anime.summary = this.anime.description.replace(/(<|&lt;)br\s*\/*(>|&gt;)|(<|&lt;)i\s*\/*(>|&gt;)|(<|&lt;)\s*\/*br(>|&gt;)|(<|&lt;)\s*\/*i(>|&gt;)/g, '');
  });

    console.log("routeParams" + JSON.stringify(routeParams.id));
    console.log("routeParamsresult" + JSON.stringify(this.movieSearchService.getAnimeByID(routeParams.id)));
  });
  }

  ngOnDestroy(): void {
  }

  animelist() {
    console.log("array" + JSON.stringify(this.anime));
    console.log("param" + this.param);

  }

}
