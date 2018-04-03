import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/api';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {MessageService} from 'primeng/components/common/messageservice';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/*
  The @Injectable() decorator tells Angular that this service might itself have injected dependencies. 
  It doesn't have dependencies now but it will soon. 
  Whether it does or it doesn't, it's good practice to keep the decorator. 
*/
@Injectable()
export class HeroService {
  
  private heroesUrl = 'api/heroes';

  constructor(private messageService: MessageService, private httpClient: HttpClient) { }   
 
 /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.logSuccess(`Fetched ${heroes.length} heroes!`)),
        catchError(this.handleError('getHeroes', []))
      );
  }
  /** GET hero by id from the server */
  getHero(id: number): Observable<Hero>{    
    let url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.logSuccess(`Fetched hero with id: ${id}`)), 
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  /** PUT Update hero with new information */
  updateHero(hero: Hero): Observable<any>{   
    return this.httpClient.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.logSuccess(`Updated heroid=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {    
    return this.httpClient.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => 
        { 
          this.logSuccess(`Added hero: ${hero.name} id: ${hero.id}`);
        }),
      catchError(this.handleError<Hero>('addHero',))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero): Observable<Hero> {
    //let id = typeof hero === 'number' ? hero : hero.id;
    let url = `${this.heroesUrl}/${hero.id}`;  
    
    return this.httpClient.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.logInfo(`Deleted hero with id=${hero.id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim())
    {
      return of([]) //return observable of empty array of heroes
    }
    return this.httpClient.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(heroes => this.logSuccess(`Found ${heroes.length} heroes matching term: ${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )
  }


  private logInfo(msgDetail: string)
  {
    this.messageService.add({severity:'info', summary:'Info', detail:msgDetail});
  }
  
  private logWarning(msgDetail: string)
  {
    this.messageService.add({severity:'warn', summary:'Warning', detail:msgDetail});
  }

  private logSuccess(msgDetail: string)
  {
    this.messageService.add({severity:'success', summary:'Success', detail:msgDetail});
  }

  private logError(msgDetail: string)
  {
    this.messageService.add({severity:'error', summary:'Error', detail:msgDetail});
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
    this.logError(`Operation: ${operation} failed. Errormsg: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
