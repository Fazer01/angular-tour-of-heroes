import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Hero } from '../hero';
import {
  debounceTime, distinctUntilChanged, switchMap, distinct
} from 'rxjs/operators';
import { HeroService } from '../hero.service';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private heroService: HeroService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    console.log(`Searchterm: ${term}`);
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //wait 300 ms
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )

  }

}
