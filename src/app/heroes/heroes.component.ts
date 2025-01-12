import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { NgFor, NgIf, UpperCasePipe,} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-heroes',
  standalone: true,
  imports:[NgFor,FormsModule,RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService){}
  
  ngOnInit(): void{
    this.getHeroes();
  }
  
  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void{
    name = name.trim()
    if(!name) {return}
    this.heroService.addHero({name} as Hero).subscribe(hero => {this.heroes.push(hero)})
  }

  delete(hero:Hero):void{
    this.heroes = this.heroes.filter(h=>h!==hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }
}
