import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroComponentService, Quote } from './hero-component-service';
import { AboutComponent } from "../about-component/about-component";


@Component({
  selector: 'app-hero-component',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './hero-component.html',
  styleUrl: './hero-component.css',
})
export class HeroComponent implements OnInit{
  currentQuote: Quote | null = null;
  loading = false;
  constructor(private route: ActivatedRoute, private heroService:HeroComponentService) {}
    ngOnInit() {
    this.getNewQuote();
    setTimeout(() => {
      this.heroService.prefetchQuotes(5);
    }, 100);
  }

getNewQuote() {
    this.loading = true;

    this.heroService.getRandomQuote().subscribe({
      next: (quotes) => {
        this.currentQuote = quotes[0];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const el = document.getElementById(fragment);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 0); // wait for DOM to be ready
        }
      }
    });
  }


}
