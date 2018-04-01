import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private heroes: Hero[];
  private loading: boolean;
  constructor(private heroService: HeroService) { }

  
  ngOnInit() {

    this.getHeroes();
  }

  getHeroes()
  {
    this.loading = true;
    this.heroService.getHeroes().subscribe( results =>
      {
        this.heroes = results.slice(1, 5);
        this.loading = false;
      }
    );
  }

}
