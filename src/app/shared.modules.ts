import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from './components/anime-shared/star-rating-components/star-rating.component';
import { BarRatingComponent } from './components/anime-shared/bar-rating-components/bar-rating.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator/';
import { MatTableModule } from '@angular/material/table';
import { LoadingIconComponent } from './components/anime-shared/loading-icon/loading-icon.component';
import { MatButtonModule } from '@angular/material/button';
import { AnimeRandomComponent } from './components/anime-random/anime-random.component';
import { AnimeSearchStaticRecordsComponent } from './components/anime-search-static-records/anime-search-static-records.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatTableModule
  ],
  declarations: [
    StarRatingComponent,
    BarRatingComponent,
    LoadingIconComponent,
    AnimeRandomComponent,
    AnimeSearchStaticRecordsComponent,
  ],
  exports: [
    BarRatingComponent,
    StarRatingComponent,
    LoadingIconComponent,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    AnimeRandomComponent,
    AnimeSearchStaticRecordsComponent,
  ],
})
export class SharedModule {}
