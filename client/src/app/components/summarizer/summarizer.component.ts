import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SummaryService } from '../../core/services/summary.service';

@Component({
  selector: 'app-summarizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './summarizer.component.html',
  styleUrl: './summarizer.component.css'
})
export class SummarizerComponent {
  inputText: string = '';
  summaryText: string = '';
  loading: boolean = false;

  constructor(private summaryService: SummaryService) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.loading = true;
      this.summaryService.uploadFile(file).subscribe({
        next: (res) => {
          this.summaryText = res.summary;
          this.loading = false;
        },
        error: (err) => {
          console.error('Upload error', err);
          this.loading = false;
        }
      });
    } else {
   
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.inputText = e.target.result;
      };
      reader.readAsText(file);
    }
  }

  summarizeText() {
    if (!this.inputText.trim()) return;

    this.loading = true;
    this.summaryService.summarizeText(this.inputText).subscribe({
      next: (res) => {
        this.summaryText = res.summary;
        this.loading = false;
      },
      error: (err) => {
        console.error('Summary error', err);
        this.loading = false;
      }
    });
  }
}