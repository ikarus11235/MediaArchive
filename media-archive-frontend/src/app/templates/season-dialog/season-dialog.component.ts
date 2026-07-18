import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-season-dialog',
  standalone: false,
  templateUrl: './season-dialog.component.html',
  styleUrl: './season-dialog.component.scss'
})
export class SeasonDialogComponent {

  title = '';

  selectedFiles: File[] = [];

  @Output()
  cancel = new EventEmitter<void>();

  @Output()
  save = new EventEmitter<{
    title: string;
    episodes: File[];
  }>();

  onFilesSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }

  }

  onSave(): void {

    this.save.emit({
      title: this.title,
      episodes: this.selectedFiles
    });

  }

  

}
