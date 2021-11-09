import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from './components/anime-shared/star-rating-components/star-rating.component';
import { BarRatingComponent } from './components/anime-shared/bar-rating-components/bar-rating.component';
import { HttpClientModule } from '@angular/common/http'
import { MatPaginatorModule } from '@angular/material/paginator/';
import { MatTableModule } from '@angular/material/table';
import { LoadingIconComponent } from './components/anime-shared/loading-icon/loading-icon.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    StarRatingComponent,
    BarRatingComponent,
    LoadingIconComponent
  ],
  exports: [
    BarRatingComponent,
    StarRatingComponent,
    LoadingIconComponent,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    MatTableModule
  ]
})
export class SharedModule { }
