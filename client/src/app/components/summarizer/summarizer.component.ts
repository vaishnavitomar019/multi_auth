import { CommonModule, NgClass } from '@angular/common';
import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SummaryService } from '../../core/services/summary.service';
import { StreamsummaryService } from '../../core/services/streamsummary.service';
import { MarkdownModule } from 'ngx-markdown';
import { ToastService } from '../../core/services/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { HighlightDirective } from '../../core/Directive/highlight.directive';
@Component({
  selector: 'app-summarizer',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule, ToastComponent, HighlightDirective],
  templateUrl: './summarizer.component.html',
  styleUrl: './summarizer.component.css'
})

export class SummarizerComponent {
  inputText: string = '';
  summaryText: string = '';
  htmlContent: any;
  loading: boolean = false;
  selectedFile: File | null = null;

  constructor(private summaryService: SummaryService, private streamService: StreamsummaryService, private toastService: ToastService) {
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

  copySummary() {
    navigator.clipboard.writeText(this.summaryText)
      .then(() => {
        this.toastService.show("Copied Sucessfully", 'success');
        console.log("Copied  Sucessfully..")
      })
      .catch(err => console.error('Copy failed:', err));
  }

}