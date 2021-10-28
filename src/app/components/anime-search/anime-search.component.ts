import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime } from './model/anime.model';
import { MovieService } from '../anime-services/movie.Search.service';


@Component({
  templateUrl: './anime-search.html',
  styleUrls: ['./anime-search.component.scss']
})

export class AppMovieSearchComponent implements OnInit {
  title = 'MovieDB';
  errorMessage = '';
  private searchTerm: string;
  animes: any = [];
  private movie: any;

  searchChangeHandler(word) {
    const boundObject = this;
    this.searchTerm = word;
    boundObject.animesSearch(this.searchTerm);
    console.log(this.searchTerm);
  }

  constructor(private httpClient: HttpClient,
              private movieSearchService: MovieService) { }

  animesSearch(searchTerm) {
    this.animes = this.movieSearchService.getAnimes(this.searchTerm).subscribe((res: any) => {

      this.animes = res.data.Page.media;

      if(this.animes.length > 0){
        this.animes.forEach((anime) => {
          // tslint:disable-next-line:max-line-length
          anime.summary = anime.description ? anime.description.replace(/(<|&lt;)br\s*\/*(>|&gt;)|(<|&lt;)i\s*\/*(>|&gt;)|(<|&lt;)\s*\/*br(>|&gt;)|(<|&lt;)\s*\/*i(>|&gt;)/g, '') : "";
          anime.avgScore = (anime.averageScore / 10);
      });
      }
  });
  }

  animeSearchID(id: number) {
    this.movie = this.movieSearchService.getAnimeByID(567);
    console.log(this.movie);
  }

  ngOnInit(): void {
  }

}

// two way binding 
  //@Output() searchTermChange = new EventEmitter<string>();

  //@Input()
  //get searchValue() {
    //return this.searchTerm;
  //}

  //set searchValue(value) {
    //this.searchTerm = value;
    //this.searchTermChange.emit(this.searchTerm);
  //}