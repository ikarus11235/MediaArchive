import { Component } from '@angular/core';
import { MediaDataServiceService } from '../../services/media-data-service.service';
import { Header } from '../../interface/header';

@Component({
  selector: 'app-show-headers',
  standalone: false,
  templateUrl: './show-headers.component.html',
  styleUrl: './show-headers.component.scss'
})
export class ShowHeadersComponent {

  constructor(private mediaService: MediaDataServiceService){

  }

  testData(): Header[] {
    let dataset = this.mediaService.getTestHeader();
    //console.log(dataset);
    return dataset;
  }

}
