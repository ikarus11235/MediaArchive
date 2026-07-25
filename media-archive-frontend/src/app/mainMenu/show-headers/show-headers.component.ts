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

  showDialog = false;

openDialog() {
  this.showDialog = true;
}

closeDialog() {
  this.showDialog = false;
}

createHeader(event: { title: string; thumbNailPath: string }) {

  const newHeader: Header = {
    id: 0,
    title: event.title,
    thumbNailPath: event.thumbNailPath,
    logo: ''
  };


  console.log(newHeader);

  this.mediaService.postApiHeaders(newHeader).subscribe({
    next: (createdHeader) => {
      console.log('Header erstellt', createdHeader);

      // Liste neu laden
      this.getHeader();

      this.closeDialog();
    },
    error: (err) => {
      console.error(err);
    }
  });


  // später:
  // this.mediaService.createHeader(event).subscribe(...);

  // let header = new Headers( {
  //   title = event.headerTitle,
  //   thumbNailPath = event.thumbNailPath,
  // });

  this.closeDialog();
}

}
