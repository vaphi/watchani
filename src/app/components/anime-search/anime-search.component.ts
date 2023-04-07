import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnimeService } from '../anime-services/anime-search.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { isNil } from 'lodash';

@Component({
  templateUrl: './anime-search.html',
  styleUrls: ['./anime-search.component.scss']
})

export class AppAnimeSearchComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public searchSub$ = new Subject<string>();

  isLoading = false;
  resultsLength = 0;

  title = 'AnimeDB';
  errorMessage = '';
  animes: any = [];

  displayedColumns: string[] = ['cover', 'desc', 'rating'];

  private anime: any;
  private searchTerm: string;

  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {

    // this.searchSub$.pipe(
    //   debounceTime(500), // discard emitted values that take less than the specified time between output
    //   distinctUntilChanged() // only emit when value has changed
    // ).subscribe(word => {
    //   this.searchTerm = word;
    // });
  }

  ngAfterViewInit(): void {

    this.dataSource.data = this.animes;
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 25;
  }

  ngOnDestroy(): void {
    // this.searchSub$.unsubscribe();
  }

  initGrid(): boolean {
    return this.animes === undefined ? true : false;
  }

  constructor(private httpClient: HttpClient,
    private animeSearchService: AnimeService) { }

  getRating(score: any): any {

    return score === 0 ? "No Rating" : score;
  }

  async animesSearch() {

    this.isLoading = true;

    const data = await this.animeSearchService.getAnimePages(this.searchTerm);

    // if (data.pageInfo.total > 50) {
    //   this.animes = data.media;

    //   for (let i = 2; i <= data.pageInfo.lastPage; i++) {

    //     const data = await this.getAnime(i);
    //     this.animes = this.animes.concat(data.media);
    //   }
    // } else {
      this.animes = data.media;
    // }

    this.animes.forEach((anime: any) => {
      // tslint:disable-next-line:max-line-length
      if (!isNil(anime.description)) {
        anime.description = anime.description.replace(/(<|&lt;)br\s*\/*(>|&gt;)|(<|&lt;)i\s*\/*(>|&gt;)|(<|&lt;)\s*\/*br(>|&gt;)|(<|&lt;)\s*\/*i(>|&gt;)/gm, '');
      }

      anime.avgScore = (anime.averageScore / 10);
    });

    this.dataSource.data = this.animes;
    this.resultsLength = this.animes.length;

    this.isLoading = false;
  }

  searchChange(event: any) {

    if(event){
      this.searchTerm = event.target.value
    }
  }

  onEnterSearch(event: any) {

    this.animesSearch();
  }

  private async getAnime(page: number) {
    return await this.animeSearchService.getAnimePages(this.searchTerm, page);
  }

  animeSearchID(id: number) {
    this.anime = this.animeSearchService.getAnimeByID(567);
    console.log(this.anime);
  }
}