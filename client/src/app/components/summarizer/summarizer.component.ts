import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-summarizer',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './summarizer.component.html',
  styleUrl: './summarizer.component.css'
})
export class SummarizerComponent {
  inputText: string = '';
  summaryText: string = '';
  loading: boolean = false;

  summarizeText() {
    this.loading = true;
    
    setTimeout(() => {
      this.summaryText = 'This is a sample summary of the input text.';
      this.loading = false;
    }, 2000);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      // Handle PDF parsing later
      alert('PDF uploading supported (parsing coming soon)');
    } else {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.inputText = e.target.result;
      };
      reader.readAsText(file);
    }
  }
}