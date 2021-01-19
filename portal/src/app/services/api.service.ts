import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {
    return this.http.get("https://my-json-server.typicode.com/galvarenga/testeAngular/dadosFinanceiros")
  }
}
