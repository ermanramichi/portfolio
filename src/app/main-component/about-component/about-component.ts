import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeroComponentService, Quote } from '../hero-component/hero-component-service';

interface Fact {
  icon: string;
  label: string;
  value: string;
  note: string;
}

@Component({
  selector: 'app-about-component',
  standalone: true,
  imports: [],
  templateUrl: './about-component.html',
  styleUrl: './about-component.css',
})
export class AboutComponent implements OnInit {
  readonly facts: Fact[] = [
    {
      icon: 'fa-solid fa-graduation-cap',
      label: 'Education',
      value: 'Software Engineering',
      note: 'SS. Cyril and Methodius University — final year',
    },
    {
      icon: 'fa-solid fa-briefcase',
      label: 'Currently',
      value: 'Web Administrator',
      note: 'Neptun MK — since November 2024',
    },
    {
      icon: 'fa-solid fa-location-dot',
      label: 'Based in',
      value: 'Skopje, MK',
      note: 'Open to remote and on-site roles',
    },
    {
      icon: 'fa-solid fa-code',
      label: 'Focus',
      value: 'Front-end & UI',
      note: 'Angular, TypeScript, Tailwind, Java',
    },
  ];

  readonly quote = signal<Quote | null>(null);
  readonly loading = signal(false);

  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private readonly quotes: HeroComponentService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Browser only — no need to block the prerender on a third-party call.
    if (this.isBrowser) this.nextQuote();
  }

  nextQuote(): void {
    this.loading.set(true);
    this.quotes.getRandomQuote().subscribe({
      next: (result) => {
        if (result?.length) this.quote.set(result[0]);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
