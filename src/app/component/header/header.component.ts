import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {}

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

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }
}
