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
  testVariable : number = 3;

  constructor(private mediaService: MediaDataServiceService){

  }

  greet(): number {
    console.log('Test message...');    
    return 0;
  }

  testData(): Header[] {
    let dataset = this.mediaService.getTestData();
    console.log(dataset);
    return dataset;
  }

}
