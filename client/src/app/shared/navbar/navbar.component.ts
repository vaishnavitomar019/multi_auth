import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user: any = null;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (res: any) => {
        this.user = res.user; // assuming backend returns user {name, email, etc}
        console.log(this.user)
      },
      error: () => {
        this.router.navigate(['/login']); // if token is invalid
      }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
