import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../services/message.service';
import { Album } from '../types/art-work-album';

@Injectable()
export class ArtWorkAlbumService {

  
  // private worksUrl = 'api/works';

  // sanity api key: skIgrXCNujRThrjUHWDYQIz36xGRfxjWM0OfUAYK9MzhVOwNccJZcqwyGBq9UsGuke54ZkGtXUymjSmqlpYuFRe0i88LGAqefGB0gqNM72y6a0CcEAWv4BzRHOiRkiBvvDSj9nVhabGq8b5ZD5gbQyzA47PeQrbp6D9AeJ0yVJEXQVvOM2pC

  private worksUrl = "https://qwmluuy0.api.sanity.io/v1/data/query/production/?query=*"

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Get Work from the server */
  getWorks (): Observable<Album[]> {
    // const options = { params: new HttpParams().set('archive', 'false') };
    const newUrl = `${this.worksUrl}[_type%20==%20$type]&$type="artwork"`;

    return this.http.get<Album[]>(newUrl)
      .pipe(
        tap(work => this.log(`fetched work`)),
        catchError(this.handleError('getWorks', []))
      );
  }

  /** Get Work from the server */
  getWorksByType (category: string): Observable<Album[]> {
    if (!category) {
      // if not search term, return empty hero array.
      return of([]);
    }
    category = category.trim();
    const options = category ?
    { params: new HttpParams().set('type', category).append('archive', 'false') } : {};
 
    return this.http.get<Album[]>(this.worksUrl, options)
      .pipe(
        tap(work => this.log(`fetched work`)),
        catchError(this.handleError('getWork', []))
      );
  }

  /** GET work by id. Return `undefined` when id not found */
  getWorkNo404<Data>(id: number): Observable<Album> {
    const url = `${this.worksUrl}/?id=${id}`;
    return this.http.get<Album[]>(url)
      .pipe(
        map(works => works[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} work id=${id}`);
        }),
        catchError(this.handleError<Album>(`getWork id=${id}`))
      );
  }

  getWorkByPermalink(permalink:string): Observable<Album[]> {
    if (!permalink) {
      // if not search term, return empty hero array.
      return of([]);
    }
    permalink = permalink.trim();
    const options = permalink ?
    { params: new HttpParams().set('permalink', permalink) } : {};
    return this.http.get<Album[]>(this.worksUrl, options)
      .pipe(
        tap(_ => this.log(`fetched permalink=${permalink}`)),
        catchError(this.handleError<Album[]>('getByPermalink', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getAlbumById(id: String): Observable<any> {
    const url = `${this.worksUrl}[_id%20==%20$id]&$id="${id}"`;

    return this.http.get<any>(url).pipe(
      map(album => album.result[0]),
      tap(_ => this.log(`fetched work id=${id}`)),
      catchError(this.handleError<any>(`getHero id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('WorkService: ' + message);
  }

}
