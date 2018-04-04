import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {MessageService} from 'primeng/components/common/messageservice';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { Router } from '@angular/router';


@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit{

  heroes: Hero[];  
  loading: boolean; 

  constructor(private heroService: HeroService, 
              private route: Router,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService) {     
  }

  ngOnInit()
  {
    this.getHeroes();
  }

  getHeroes(): void
  {
    this.loading = true;
    //Async operations... notice the subscribe
    this.heroService.getHeroes().subscribe
      (
        results => 
          { 
            this.heroes = results;
            this.loading = false;
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
  goDetails(hero: Hero)
  {
    console.log(`Navigate to hero: ${hero.name}`)
    this.route.navigate(['/detail', hero.id]);
  }

  delete(hero: Hero)
  {
    console.log('Blaat');
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {          
          this.heroes = this.heroes.filter(h => h !== hero);
          this.heroService.deleteHero(hero).subscribe();
          this.messageService.add({severity:'info', summary:'Confirmed', detail:`Hero: ${hero.name} is deleted`});
      },
      reject: () => {
        this.messageService.add({severity:'info', summary:'Rejected', detail:'You have rejected'});
      }
    }); 
  }
}
