import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from './components/anime-shared/star-rating-components/star-rating.component';
import { BarRatingComponent } from './components/anime-shared/bar-rating-components/bar-rating.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    StarRatingComponent,
    BarRatingComponent,
  ],
  exports: [
    BarRatingComponent,
    StarRatingComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
