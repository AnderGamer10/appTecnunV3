import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SMRWebv3';
  constructor() {
    $(document).ready(function () {
      $('html').animate({ scrollTop: 0 }, 'slow');
      $('body').animate({ scrollTop: 0 }, 'slow');
    });
  }
}
