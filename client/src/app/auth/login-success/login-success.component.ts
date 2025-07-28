import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [],
  templateUrl: './login-success.component.html',
  styleUrl: './login-success.component.css'
})
export class LoginSuccessComponent {
   loading = true;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
           setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else {
        // If token is missing, navigate to login
        this.router.navigate(['/login']);
      }
    });
  }
}
