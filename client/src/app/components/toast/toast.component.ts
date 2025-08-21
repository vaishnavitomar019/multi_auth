import { Component } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
toasts: any[] = [];

  constructor(private toastService:ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState.subscribe(toast => {
      this.toasts.push(toast);
      console.log("going to service");
      setTimeout(() => this.toasts.shift(), 3000); // auto hide after 3s
    });
  }
}
