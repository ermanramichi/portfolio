import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type TabId = 'stack' | 'projects' | 'experience';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

interface Skill {
  name: string;
  icon: string;
  level: number;
  blurb: string;
}

interface Project {
  name: string;
  tagline: string;
  blurb: string;
  tags: string[];
}

interface Role {
  title: string;
  company: string;
  period: string;
  current: boolean;
  blurb: string;
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
    { id: 'stack', label: 'Technologies', icon: 'fa-solid fa-layer-group' },
    { id: 'projects', label: 'Projects', icon: 'fa-solid fa-diagram-project' },
    { id: 'experience', label: 'Experience', icon: 'fa-solid fa-briefcase' },
  ];

  readonly active = signal<TabId>('stack');

  // Levels are self-assessed — easy to tweak in this array.
  readonly skills: Skill[] = [
    {
      name: 'Angular',
      icon: 'fa-brands fa-angular',
      level: 85,
      blurb: 'Scalable front-ends with reactive data binding, routing and backend integration.',
    },
    {
      name: 'JavaScript / TypeScript',
      icon: 'fa-brands fa-js',
      level: 85,
      blurb: 'Interactivity and dynamic behaviour through DOM work and typed application logic.',
    },
    {
      name: 'HTML5',
      icon: 'fa-brands fa-html5',
      level: 92,
      blurb: 'Structured, semantic markup that supports accessibility and rich media.',
    },
    {
      name: 'CSS & Tailwind',
      icon: 'fa-brands fa-css3-alt',
      level: 90,
      blurb: 'Responsive, visually engaging interfaces built on a consistent design system.',
    },
    {
      name: 'Java',
      icon: 'fa-brands fa-java',
      level: 72,
      blurb: 'OOP fundamentals and CRUD services for robust, maintainable backends.',
    },
    {
      name: 'Git',
      icon: 'fa-brands fa-git-alt',
      level: 80,
      blurb: 'Version control, clean history and smooth collaboration across branches.',
    },
  ];

  readonly projects: Project[] = [
    {
      name: 'Automatik',
      tagline: 'Price comparison platform',
      blurb:
        'Helps users find the best products at the best prices by comparing offers from multiple sources in real time. Advanced search, filtering and price tracking make product discovery effortless while maximising savings.',
      tags: ['Angular', 'TypeScript', 'REST API', 'Tailwind'],
    },
    {
      name: 'Pagomatik',
      tagline: 'Point-of-sale system',
      blurb:
        'A POS application designed around fast, intuitive operation for restaurants and retail. Generates daily and monthly reports per table, per user and overall, enabling better performance tracking and data-driven decisions.',
      tags: ['Angular', 'Java', 'Reporting', 'UI/UX'],
    },
  ];

  readonly roles: Role[] = [
    {
      title: 'Web Administrator',
      company: 'Neptun MK',
      period: 'Nov 2024 — Present',
      current: true,
      blurb:
        'Promoted from retail to manage and optimise the company’s online presence. Built engaging, interactive landing pages that raised product visibility, kept content accurate and on-brand, and used web analytics to improve user experience and lift traffic and conversions.',
    },
    {
      title: 'Retail Salesman',
      company: 'Neptun MK',
      period: 'Jul 2022 — Oct 2024',
      current: false,
      blurb:
        'Developed strong communication and customer service skills, reading client needs and tailoring recommendations. Built problem-solving ability, comfort working under pressure, and an understanding of the sales strategies that drive customer satisfaction and growth.',
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
