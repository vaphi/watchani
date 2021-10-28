import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './page-header.html',
  styleUrls: ['../anime-search/anime-search.component.scss']
})

export class NavBarComponent {
  pageTitle = 'AnimeDB';
  title = 'AnimeDB';
}
