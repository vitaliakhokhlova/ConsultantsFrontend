import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { Resource } from "./classes";
import { Serializer } from "./serializer";
import { tap, catchError, map } from "rxjs/operators";
import { MessageService } from "./message.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CRUDService<T extends Resource> {

  private url = 'http://localhost:4200/api/RESTful/rest';
  private endpoint : string;
  private serializer: Serializer;
  private urlcomplete = `${this.url}/${this.endpoint}`;

  constructor(    
      private httpClient: HttpClient,
      private messageService: MessageService, 
      enpoint: string,
      serializer: Serializer) {
        this.endpoint = this.endpoint;
        this.serializer = serializer;
      }
  
    public create(item: T): Observable<T> {
      return this.httpClient
        .post<T>(this.urlcomplete, this.serializer.toJson(item))
        .pipe(
          map(data => this.serializer.fromJson(data) as T),
          tap(_ => this.log(`added ${this.endpoint} id=${item.id}`)),
          catchError(this.handleError<any>('add'))
        );
    }

    public read(id: number): Observable<T> {
      return this.httpClient
        .get(`${this.urlcomplete}/${id}`)
        .pipe(
          map((data: any) => this.serializer.fromJson(data) as T),
          tap(_ => this.log(`fetched ${this.endpoint} id=${id}`)),
          catchError(this.handleError<any>(`get id=${id}`))
          );
    }
  
    public update(item: T): Observable<T> {
      return this.httpClient
        .put<T>(`${this.urlcomplete}/${item.id}`,
          this.serializer.toJson(item))
        .pipe(
          map(data => this.serializer.fromJson(data) as T),
          tap(_ => this.log(`updated ${this.endpoint} id=${item.id}`)),
          catchError(this.handleError<any>('update id=${id}'))
        );
    }

    delete(id: number) {
      return this.httpClient
        .delete(`${this.urlcomplete}/${id}`)
        .pipe(
          tap(_ => this.log(`deleted ${this.endpoint} id=${id}`)),
          catchError(this.handleError<any>('delete id=${id}'))
        );
    } 

    private log(message: string) {
      this.messageService.add(`CRUDservice: ${message}`);
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }

    public readAll(): Observable<T[]>{     
      return this.httpClient.get<T[]>(this.urlcomplete)
      .pipe(
        tap(_ => this.log(`fetched all ${this.endpoint}s from server`)),
        catchError(this.handleError('getAll', []))
      );
    }

    public readProperty(propertyName:string, propertyValue: string): Observable<T[]>{
      return this.httpClient.get<T[]>(`${this.urlcomplete}/${propertyName}/${propertyValue}`)
      .pipe(
        tap(_ => this.log(`fetched ${this.endpoint}s ${propertyName}=${propertyValue}`)),
        catchError(this.handleError('get', []))
      );
    }
  
  }