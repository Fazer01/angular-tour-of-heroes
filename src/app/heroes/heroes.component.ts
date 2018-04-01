import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {MessageService} from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit{

  private heroes: Hero[];  

  constructor(private heroService: HeroService, private messageService: MessageService) {     
  }

  ngOnInit()
  {
    this.getHeroes();
  }

  getHeroes(): void
  {
    //Async operations... notice the subscribe
    this.heroService.getHeroes().subscribe
      (
        results => 
          { 
            this.heroes = results;
          }
      );
  }  

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero)
  {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
