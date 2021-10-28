import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pm-bar',
  templateUrl: './bar-rating.html',
  styleUrls: ['./bar-rating.component.scss']
})
export class BarRatingComponent implements OnChanges {
  ratingPercent = 0;
  barColor = 'bg-success';
  @Input() rating = 0;
  @Output() ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnChanges(): void {
    this.ratingPercent = this.rating * 10;
    if (this.ratingPercent <= 49) {
      this.barColor = 'bg-danger';
    } else if (this.ratingPercent > 49 && this.ratingPercent <= 69) {
      this.barColor = 'bg-warning';
    } else {
      this.barColor = 'bg-success';
    }
  }

  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }
}
