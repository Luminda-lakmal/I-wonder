import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = `${environment.backendUrl}`;
  constructor(private http: HttpClient) { }

  getGreeting(name: string){
    const params = new HttpParams().set('name',name);
    return this.http.get<any>(this.baseUrl, {params});
  }

  getNasaImageUrl(){
    return this.http.get<any>(`${this.baseUrl}/nasa`);
  }
}
