import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Resource } from '../classes';

import { Observable} from "rxjs";
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


export class CrudService <T extends Resource> {

  startpoint= environment.appUrl;
  protected endpoint : string;
  protected urlcomplete : string;

  constructor(    
      protected httpClient: HttpClient,
      endpoint: string) {
        this.endpoint = endpoint;
        this.urlcomplete = `${this.startpoint}/${this.endpoint}`;
      }
      
  
    public create(item: T): Observable<T> {
      console.log("creating "+this.urlcomplete);
      return this.httpClient.post<T>(this.urlcomplete, item);
    }

    public read(id: number): Observable<T> {
      return this.httpClient.get<T>(`${this.urlcomplete}/${id}`);
    }

    public update(item: T): Observable<T> {
      console.log("updating on "+this.urlcomplete);
      return this.httpClient.put<T>(this.urlcomplete, item);
    }

    delete(id: number) {
      return this.httpClient.delete(`${this.urlcomplete}/${id}`);
    }   

    public readAll(): Observable<T[]>{     
      return this.httpClient.get<T[]>(`${this.urlcomplete}/all`);
    }

    public searchBySubstring(propertyName:string, propertyValue: string): Observable<T[]>{
      return this.httpClient.get<T[]>(`${this.urlcomplete}/${propertyName}/${propertyValue}`);
    } 
}