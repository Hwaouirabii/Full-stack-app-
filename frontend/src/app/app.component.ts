import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/">Home</a> |
      <a routerLink="/cart">Cart</a>
    </nav>
    <router-outlet></router-outlet>
    <!-- This is where routed components will be rendered -->
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
