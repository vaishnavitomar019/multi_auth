import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = false;

  constructor(private authService:AuthService, private router: Router) {};
  

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }


}
