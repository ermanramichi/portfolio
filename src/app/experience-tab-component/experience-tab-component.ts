import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type TabId = 'stack' | 'projects' | 'experience';

interface Tab {
  id: TabId;
  label: string;
}

interface Skill {
  name: string;
  icon: string;
  role: string;
  blurb: string;
}

interface Project {
  name: string;
  tagline: string;
  year: string;
  url?: string;
  blurb: string;
  tags: string[];
}

interface Role {
  title: string;
  subtitle?: string;
  company: string;
  period: string;
  current: boolean;
  blurb: string[];
}

@Component({
  selector: 'app-experience-tab-component',
  standalone: true,
  imports: [],
  templateUrl: './experience-tab-component.html',
  styleUrl: './experience-tab-component.css',
})
export class ExperienceTabComponent {
  readonly tabs: Tab[] = [
    { id: 'stack', label: 'Technologies' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
  ];

  readonly active = signal<TabId>('stack');

  readonly skills: Skill[] = [
    {
      name: 'Angular',
      icon: 'fa-brands fa-angular',
      role: 'Framework',
      blurb: 'Scalable front-ends with reactive data binding, routing and backend integration.',
    },
    {
      name: 'TypeScript',
      icon: 'fa-brands fa-js',
      role: 'Language',
      blurb: 'Typed application logic, interactivity and dynamic behaviour in the browser.',
    },
    {
      name: 'HTML5',
      icon: 'fa-brands fa-html5',
      role: 'Markup',
      blurb: 'Structured, semantic documents that support accessibility and rich media.',
    },
    {
      name: 'CSS & Tailwind',
      icon: 'fa-brands fa-css3-alt',
      role: 'Styling',
      blurb: 'Responsive, visually considered interfaces built on a consistent design system.',
    },
    {
      name: 'Java',
      icon: 'fa-brands fa-java',
      role: 'Backend',
      blurb: 'OOP fundamentals and CRUD services for robust, maintainable server-side work.',
    },
    {
      name: 'Git',
      icon: 'fa-brands fa-git-alt',
      role: 'Tooling',
      blurb: 'Version control, clean history and smooth collaboration across branches.',
    },
  ];

  readonly projects: Project[] = [
    {
      name: 'irenadhristov.mk',
      tagline: 'Client management & storefront',
      year: '2026 — ongoing',
      url: 'https://irenadhristov.mk',
      blurb:
        'A web application for managing and displaying clients, built as the foundation for a full storefront. Payment processing is the next milestone, which will take it from a client directory to a complete e-commerce platform.',
      tags: ['Java', 'Angular', 'Tailwind'],
    },
  ];

  readonly roles: Role[] = [
    {
      title: 'Web Administrator & PPO OCE',
      subtitle: 'Platform Product Owner — Omni Channel Engine',
      company: 'Neptun MK',
      period: 'Nov 2024 — Present',
      current: true,
      blurb: [
        'Managing and optimising the company’s online presence. Building engaging, interactive landing pages that raise product visibility, keeping content accurate and on-brand, and using web analytics to improve user experience and lift traffic and conversions.',
        'As Platform Product Owner for the Omni Channel Engine, I’m part of the implementation team delivering the company’s omnichannel integration — bringing the webshop and the retail stores onto one platform so the sales channels operate as a single system.',
      ],
    },
  ];

  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  select(id: TabId): void {
    this.active.set(id);
  }

  /** Left/right arrow keys move between tabs, as expected of a tablist. */
  onTabKey(event: KeyboardEvent, index: number): void {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;

    event.preventDefault();
    const next = (index + step + this.tabs.length) % this.tabs.length;
    this.select(this.tabs[next].id);

    if (!this.isBrowser) return;
    document.getElementById(`tab-${this.tabs[next].id}`)?.focus();
  }
}
