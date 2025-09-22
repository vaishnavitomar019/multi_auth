import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const blocks = this.el.nativeElement.querySelectorAll('pre code');
    blocks.forEach((block: HTMLElement) => {
      // Wrap <pre> for styling
      const wrapper = document.createElement('div');
      wrapper.classList.add('code-block');

      block.parentElement?.parentElement?.replaceChild(wrapper, block.parentElement!);
      wrapper.appendChild(block.parentElement!);

      // Add copy button
      const copyBtn = document.createElement('button');
      copyBtn.innerText = 'Copy';
      copyBtn.classList.add('copy-btn');
      wrapper.appendChild(copyBtn);

      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(block.innerText);
        copyBtn.innerText = 'Copied!';
        setTimeout(() => (copyBtn.innerText = 'Copy'), 2000);
      });
    });
  }
}