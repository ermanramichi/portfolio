import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  readonly links: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);
  readonly active = signal('home');

  private observer?: IntersectionObserver;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.onScroll();
    this.watchSections();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.setBodyLock(false);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.scrolled.set(window.scrollY > 24);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) this.closeMenu();
  }

  toggleMenu(): void {
    const next = !this.menuOpen();
    this.menuOpen.set(next);
    this.setBodyLock(next);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.setBodyLock(false);
  }

  goTo(event: Event, id: string): void {
    event.preventDefault();
    this.closeMenu();
    if (!this.isBrowser) return;

    const target = document.getElementById(id);
    if (!target) return;

    // Wait a frame so the menu overlay has released the scroll lock first.
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.active.set(id);
    });
  }

  /** Highlights whichever section currently owns the middle of the viewport. */
  private watchSections(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) this.active.set(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    for (const link of this.links) {
      const el = document.getElementById(link.id);
      if (el) this.observer.observe(el);
    }
  }

  private setBodyLock(locked: boolean): void {
    if (!this.isBrowser) return;
    document.body.style.overflow = locked ? 'hidden' : '';
  }
}
