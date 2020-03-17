import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private router: Router,
  ) {}

  navigateTab2() {
    console.log('Navigate to Tab2');
    this.router.navigate(['']);
  }

}
