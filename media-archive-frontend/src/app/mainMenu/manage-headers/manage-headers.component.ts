import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-headers',
  standalone: false,
  templateUrl: './manage-headers.component.html',
  styleUrl: './manage-headers.component.scss'
})
export class ManageHeadersComponent {
  router = inject(Router);

  backToHeaders(){
    this.router.navigate(['/headers']);
  }

}
