import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './page-header.html',
  styleUrls: ['./page-header.component.scss'],
})
export class NavBarComponent {
  firstTitle = 'Ani';
  secondTitle = 'Info';

  constructor(private router: Router) {}
  refreshPage() {
    this.router.navigate(['/random']).then(() => {
      window.location.reload();
    });
  }
}
