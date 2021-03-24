import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = true;
  authStateSubscription: Subscription;

  isAuthorized = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authStateSubscription = this.authService.authState.subscribe({
      next: (state) => {
        if (state !== null) {
          this.isAuthorized = true;
        } else {
          this.isAuthorized = false;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }
}
