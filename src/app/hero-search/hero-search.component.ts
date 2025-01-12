import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-search',
  standalone: false,
  
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent {
  heroes$!: Observable<Hero[]>
  private searchTerms = new Subject<string>()
  constructor(private heroService: HeroService){}

  search(term:string): void{
    this.searchTerms.next(term)
  }

  ngOnInit():void{
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string) => this.heroService.searchHeroes(term)),
    )
  }
}
