import { Component, OnInit } from '@angular/core';
import { MediaDataServiceService } from '../../services/media-data-service.service';
import { Header } from '../../interface/header';

@Component({
  selector: 'app-show-headers',
  standalone: false,
  templateUrl: './show-headers.component.html',
  styleUrl: './show-headers.component.scss'
})
export class ShowHeadersComponent implements OnInit {

  displayedHeaders: Header[] | any = null;

  constructor(private mediaService: MediaDataServiceService){
    
  }

  ngOnInit(): void {
    this.getHeader();
  }

  testData(): Header[] {
    let dataset = this.mediaService.getTestHeader();
    return dataset;
  }

  getHeader(): void {
    let dataset = this.mediaService.getApiHeader();
    dataset.subscribe(headers => {
      this.displayedHeaders = headers;
    })
  }

}
