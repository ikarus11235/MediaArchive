import { inject, Injectable } from '@angular/core';
import { Header } from '../interface/header';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  firstname: string;
  lastname: string;
  birthday: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class MediaDataServiceService {
  
  private http = inject(HttpClient);

  testHeader : Header[] = [{
    id: 1,
    title: 'TestTitle',
    thumbNail: 'TestThumbNail',
    logo: 'TestLogo'
  },
  {
    id: 2,
    title: 'FakeTitle',
    thumbNail: 'FakeThumbNail',
    logo: 'FakeLogo'
  },
  {
    id: 3,
    title: 'DummyTitle',
    thumbNail: 'DummyThumbNail',
    logo: 'DummyLogo'
  }]


  constructor() { }

   getTestData(): Header[] {
    return this.testHeader;
   }

  getMockData(): Observable<User>{
    return this.http.get<User>('https://6561036783aba11d99d1cff0.mockapi.io/api/test');
  }
   
}
