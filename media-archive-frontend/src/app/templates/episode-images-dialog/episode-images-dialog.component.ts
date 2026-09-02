import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-episode-images-dialog',
  standalone: false,
  templateUrl: './episode-images-dialog.component.html',
  styleUrl: './episode-images-dialog.component.scss'
})
export class EpisodeImagesDialogComponent {
  selectedFiles: File[] = [];

  @Output()
  cancel = new EventEmitter<void>();

  @Output()
  save = new EventEmitter<File[]>();

  onFilesSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }

  }

  onSave(): void {
    const normalizedFiles = this.selectedFiles.map((file) => new File([file], `/personal/images/${file.name}`, { type: file.type }));
    this.save.emit(normalizedFiles);
  }
}
