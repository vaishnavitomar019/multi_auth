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

  menuItems = [
  { label: 'Dashboard', icon: 'bi bi-grid-fill', route: '/dashboard' },
  { label: 'AI Summarizer', icon: 'bi bi-robot', route: '/summarizer' },
  { label: 'Text Translation', icon: 'bi bi-translate', route: '/translation' },
  { label: 'Grammar Correction', icon: 'bi bi-pencil-square', route: '/correction' },
  { label: 'Code Explanation', icon: 'bi bi-code-slash', route: '/code-explanation' },
  { label: 'Resume/JD Matcher', icon: 'bi bi-file-earmark-person', route: '/resume-matcher' },
  { label: 'User', icon: 'bi bi-person-circle', route: '/user' },
];

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

}
