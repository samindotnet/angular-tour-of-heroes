import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  heroes: Hero[] = [];
  constructor(private heroService:HeroService){}
  ngOnInit(): void{
    this.getHeroes();
  }
  getHeroes(): void{
    this.heroService.getHeroes()
    .subscribe(heroes=> this.heroes = heroes.slice(1,5))
  }
}
