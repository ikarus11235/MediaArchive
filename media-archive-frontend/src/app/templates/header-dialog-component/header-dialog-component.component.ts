import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-dialog-component',
  standalone: false,
  templateUrl: './header-dialog-component.component.html',
  styleUrl: './header-dialog-component.component.scss'
})
export class HeaderDialogComponentComponent {

  title = '';
  thumbNailPath = '';

  @Output()
  cancel = new EventEmitter<void>();

  @Output()
  save = new EventEmitter<{
    title: string;
    thumbNailPath: string;
  }>();

  onSave() {

    if (!this.selectedFile) {
      return;
    }

    const fileName = this.selectedFile.name;
    const publicPath = `/personal/images/${fileName}`;

    this.save.emit({
      title: this.title,
      thumbNailPath: publicPath
    });

  }

  selectedFile?: File;

onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
        this.selectedFile = input.files[0];
    }

}

}
