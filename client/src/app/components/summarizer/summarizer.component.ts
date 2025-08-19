import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SummaryService } from '../../core/services/summary.service';
import { StreamsummaryService } from '../../core/services/streamsummary.service';

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
  selectedFile: File | null = null;
  constructor(private summaryService: SummaryService,private streamService:StreamsummaryService) {
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }
  
  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.selectedFile) return;

    this.summaryText = '';
    this.loading = true;

    try {
      await this.streamService.streamFile(this.selectedFile, (chunk: string) => {
        this.summaryText += chunk; // append text progressively
      });
    } catch (err) {
      console.error(err);
    }

    this.loading = false;
  }

}