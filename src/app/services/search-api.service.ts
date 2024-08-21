import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  constructor(private http: HttpClient) {}

  getSearchResults(state): Observable<any> {
    return this.http.get('http://localhost:3000' + state);
  }
}
