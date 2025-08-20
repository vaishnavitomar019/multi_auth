import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SummaryService } from '../../core/services/summary.service';
import { StreamsummaryService } from '../../core/services/streamsummary.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-summarizer',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule],
  templateUrl: './summarizer.component.html',
  styleUrl: './summarizer.component.css'
})

export class SummarizerComponent {
  inputText: string = '';
  summaryText: string = '';
  htmlContent: any;
  loading: boolean = false;
  selectedFile: File | null = null;

  constructor(private summaryService: SummaryService, private streamService: StreamsummaryService) {
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.selectedFile) return;

    this.summaryText = '';
    this.htmlContent = '';
    this.loading = true;

    try {
      await this.streamService.streamFile(this.selectedFile, (chunk: string) => {
        this.loading = false;
        this.summaryText += chunk;
        // this.htmlContent = marked(this.summaryText);
      });
    } catch (err) {
      console.error(err);
    }
  }

}