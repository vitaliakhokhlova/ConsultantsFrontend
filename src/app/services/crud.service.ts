import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Resource } from '../classes';

import { Observable, of} from "rxjs";
import { environment } from "../../environments/environment";
import { tap, catchError, map } from "rxjs/operators";
import { MessageService } from "../services/message.service";
import { Injectable } from '@angular/core';

export class CrudService <T extends Resource> {

  private startpoint = environment.appUrl;
  protected urlcomplete : string;

  constructor(    
      protected httpClient: HttpClient,
      private endpoint: string
      ,private tType:   (new () => T)
      ) {
        this.urlcomplete = `${this.startpoint}/${endpoint}`; 
      }
      
  
    public create(item: T): Observable<T> {
      console.log("creating "+this.urlcomplete);
      return this.httpClient.post<T>(this.urlcomplete, item)
      .pipe(
        tap(_ => this.log(`created ${this.endpoint} id=${item.id}`)),
        catchError(this.handleError<any>('create id=${id}'))
      );
    }

    public read(id: number): Observable<T> {
      return this.httpClient.get<T>(`${this.urlcomplete}/${id}`).pipe(
        // map(result => (new this.tType).deserialize(result)),
        tap(_ => this.log(`fetched ${this.endpoint} id=${id}`)),
        catchError(this.handleError<any>('read id=${id}'))
      );
    }

    public update(item: T): Observable<T> {
      console.log("updating on "+this.urlcomplete);
      console.log(item);
      return this.httpClient.put<T>(this.urlcomplete, item)
      .pipe(
        tap(_ => this.log(`updated ${this.endpoint} id=${item.id}`)),
        catchError(this.handleError<any>('update id=${id}'))
      );
    }

    delete(id: number) {
      return this.httpClient.delete(`${this.urlcomplete}/${id}`)
      .pipe(
        tap(_ => this.log(`deleted ${this.endpoint} id=${id}`)),
        catchError(this.handleError<any>('delete id=${id}'))
      );
    }   

    public getAll(): Observable<T[]>{     
      return this.httpClient.get<T[]>(`${this.urlcomplete}/all`)
      .pipe(
        tap(_ => this.log(`fetched all ${this.endpoint}s from server`)),
        catchError(this.handleError('getAll', []))
      );
    }

    public getAllOrdered(column: string): Observable<T[]>{     
      return this.httpClient.get<T[]>(`${this.urlcomplete}/all_ordered_by_${column}`)
      .pipe(
        // map(result => {
        //   return result.map(
        //     item=> {return (new this.tType).deserialize(item);}
        //   );}),
        tap(_ => this.log(`fetched all ${this.endpoint}s from server`)),
        catchError(this.handleError('getAll', []))
      );
    }

    public searchBySubstring(propertyName:string, propertyValue: string): Observable<T[]>{
      return this.httpClient.get<T[]>(`${this.urlcomplete}/search_by_${propertyName}/${propertyValue}`);
    } 

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }

    private log(message: string) {
      // this.messageService.add(`CrudService: ${message}`);
    }
}