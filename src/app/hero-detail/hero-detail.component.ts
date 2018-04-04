import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{

  loading: boolean;
  @Input() hero: Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) 
  { 

  }

  ngOnInit(){
    this.getHero();
  }

  getHero(): void{
    //Plus sign makes sure to return the numeric representation of the string object.
    let id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.heroService.getHero(id).subscribe(hero => 
      {
        this.hero = hero;
        this.loading = false;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save()
  {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

}
