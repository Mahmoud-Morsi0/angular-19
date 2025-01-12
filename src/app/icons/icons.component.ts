import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      [innerHTML]="sanitizedIcon"
      [class]="class"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none">
    </svg>
  `,
})
export class IconComponent implements OnChanges {
  @Input() name!: string;
  @Input() size: number = 24;
  @Input() class: string = '';

  sanitizedIcon: SafeHtml = '';

  private icons: { [key: string]: string } = {
    dashboard: `<path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" fill="currentColor"/>`,
    // Add more icons here
  };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name']) {
      this.updateIcon();
    }
  }

  private updateIcon(): void {
    const icon = this.icons[this.name];
    if (!icon) {
      console.warn(`Icon "${this.name}" not found.`);
      this.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml('');
    } else {
      this.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(icon);
    }
  }
}
