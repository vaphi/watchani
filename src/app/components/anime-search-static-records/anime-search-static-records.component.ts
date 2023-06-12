import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AnimeService } from '../anime-services/anime-search.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { isNil } from 'lodash';
import { Router } from '@angular/router';
@Component({
  templateUrl: './anime-search-static-records.html',
  styleUrls: ['../anime-search/anime-search.component.scss'],
})
export class AnimeSearchStaticRecordsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading = false;
  resultsLength = 0;
  errorMessage = '';
  animes: any = [];
  displayedColumns: string[] = ['cover', 'desc', 'rating'];
  searchTerm: string = null;
  dataSource = new MatTableDataSource<any>();
  animeSearchSubscribe: Subscription;

  constructor(
    private animeSearchService: AnimeService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.animesSearch();
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.animes;
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 20;
  }

  ngOnDestroy(): void {
    this.animeSearchSubscribe.unsubscribe();
  }

  initGrid(): boolean {
    return this.animes === undefined ? true : false;
  }

  getRating(score: any): any {
    return score === 0 ? 'No Rating' : score;
  }

  goToAnime(animeId: number) {
    this.router.navigate([`/animeSearch/${animeId}`]);
  }

  async animesSearch() {
    this.isLoading = true;

    for (let i = 1; i <= 2; i++) {
      this.animeSearchSubscribe = this.animeSearchService
        .getTop100Animes(i)
        .subscribe((res: any) => {
          this.animes = [...this.animes, ...res.data.Page.media];

          if (this.animes.length === 100) {
            this.animes.forEach((anime: any) => {
              // tslint:disable-next-line:max-line-length
              if (!isNil(anime.description)) {
                anime.description = anime.description.replace(
                  /(<|&lt;)br\s*\/*(>|&gt;)|(<|&lt;)i\s*\/*(>|&gt;)|(<|&lt;)\s*\/*br(>|&gt;)|(<|&lt;)\s*\/*i(>|&gt;)|(<|&lt;)<|<\/b>|\s*\/*(>&gt;)|(<|&lt;)<|<b>|\s*\/*(>&gt;)/gm,
                  ''
                );
              }
              anime.avgScore = anime.averageScore / 10;
            });

            this.dataSource.data = this.animes;
            this.resultsLength += this.animes.length;
          }
          this.isLoading = false;
        });
    }
  }
}
